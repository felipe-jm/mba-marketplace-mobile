import { useState } from "react";

import { TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { Box } from "./ui/box";
import { Icon } from "./ui/icon";
import { Image } from "./ui/image";

import { Image as ImageIcon } from "lucide-react-native";

export function AvatarUpload() {
  const [avatar, setAvatar] = useState<string | null>(null);

  async function handleAvatarUpload() {
    console.log("Avatar upload");

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled) {
        return;
      }

      if (result.assets[0]) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableOpacity onPress={handleAvatarUpload}>
      <Box className="w-36 h-36 items-center justify-center rounded-lg bg-custom-shape-white">
        {avatar ? (
          <Image
            source={{ uri: avatar || "https://github.com/felipe-jm.png" }}
            className="w-full h-full rounded-lg"
            alt="Avatar"
          />
        ) : (
          <Icon as={ImageIcon} className="w-6 h-6 text-custom-orange-base" />
        )}
      </Box>
    </TouchableOpacity>
  );
}
