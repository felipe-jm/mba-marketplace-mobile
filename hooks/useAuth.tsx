import { createContext, useState, useEffect, useContext } from "react";

import { UserDTO } from "@/dtos/user-dto";
import { api } from "@/services/api";

import {
  removeUserStorage,
  saveUserStorage,
  getUserStorage,
} from "@/storage/user";
import {
  getAuthToken,
  removeAuthToken,
  storageAuthToken,
} from "@/storage/auth-token";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updatedUser: UserDTO) => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function updateUserAndTokenStorage(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndToken(
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      setIsLoadingUserStorageData(true);

      await storageAuthToken({ token, refresh_token });
      await saveUserStorage(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token && data.refresh_token) {
        await storageUserAndToken(data.user, data.token, data.refresh_token);
        updateUserAndTokenStorage(data.user, data.token);
      }
    } catch (err) {
      throw err;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as UserDTO);
      await removeUserStorage();
      await removeAuthToken();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(updatedUser: UserDTO) {
    try {
      setUser(updatedUser);

      await saveUserStorage(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const loggedUser = await getUserStorage();
      const { token } = await getAuthToken();

      if (loggedUser.id && token) {
        updateUserAndTokenStorage(loggedUser, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        updateUserProfile,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
