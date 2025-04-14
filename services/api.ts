import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getAuthToken, storageAuthToken } from "@/storage/auth-token";
import { AppError } from "@/utils/app-error";

type SignOut = () => void;

type IPromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type IAPIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://localhost:3333",
}) as IAPIInstanceProps;

let failedQueued: IPromiseType[] = [];
let isRefreshing = false;

const getRefreshToken = (originalRequestConfig: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    failedQueued.push({
      onSuccess: (token: string) => {
        originalRequestConfig.headers = { Authorization: `Bearer ${token}` };
        resolve(api(originalRequestConfig));
      },
      onFailure: (error: AxiosError) => {
        reject(error);
      },
    });
  });
};

api.registerInterceptTokenManager = (singOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await getAuthToken();

          if (!refresh_token) {
            singOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            getRefreshToken(originalRequestConfig);
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh", {
                refreshToken: refresh_token,
              });

              await storageAuthToken({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
              });

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              };
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              failedQueued.forEach((request) => {
                request.onSuccess(data.token);
              });

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              console.log(error);

              failedQueued.forEach((request) => {
                request.onFailure(error);
              });

              singOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueued = [];
            }
          });
        }

        singOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
