import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@/dtos/user-dto";

import { USER_STORAGE } from "./config";

export async function saveUserStorage(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function getUserStorage() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: UserDTO = storage ? JSON.parse(storage) : {};

  return user;
}

export async function removeUserStorage() {
  await AsyncStorage.removeItem(USER_STORAGE);
}
