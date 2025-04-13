import { useState } from "react";

import { TouchableOpacity } from "react-native";
import { Image as ImageIcon } from "lucide-react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { Box } from "./ui/box";
import { Icon } from "./ui/icon";
import { Image } from "./ui/image";
import { useToast } from "./ui/toast";
import { ToastMessage } from "./toast-message";

import { api } from "@/services/api";
import { cn } from "@/utils/cn";
import { AppError } from "@/utils/app-error";

type AvatarUploadProps = {
  className?: string;
  avatarUrl?: string;
  onUploadSuccess?: (avatarId: string) => void;
};

export function AvatarUpload({
  className,
  avatarUrl,
  onUploadSuccess,
}: AvatarUploadProps) {
  const [avatar, setAvatar] = useState<string | null>(avatarUrl || null);
  const [isUploading, setIsUploading] = useState(false);

  const toast = useToast();

  async function uploadImageToServer(uri: string): Promise<string> {
    try {
      setIsUploading(true);

      const fileInfo = await FileSystem.getInfoAsync(uri);

      if (!fileInfo.exists) {
        throw new Error("File does not exist");
      }

      // Get file extension
      const fileExtension = uri.split(".").pop();

      // Create form data for upload
      const formData = new FormData();
      formData.append("file", {
        uri,
        name: `avatar.${fileExtension}`,
        type: `image/${fileExtension}`,
      } as any);

      const response = await api.post("/attachments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.attachmentId;
    } catch (error) {
      console.error("Upload error:", error);

      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Erro ao fazer upload da imagem";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });

      throw error;
    } finally {
      setIsUploading(false);
    }
  }

  async function handleAvatarUpload() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      if (result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setAvatar(imageUri);

        // If we need to upload and notify parent component
        if (onUploadSuccess) {
          const avatarId = await uploadImageToServer(imageUri);
          onUploadSuccess(avatarId);
        }
      }
    } catch (error) {
      console.log(error);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Não foi possível selecionar a imagem"
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  }

  return (
    <TouchableOpacity onPress={handleAvatarUpload} disabled={isUploading}>
      <Box
        className={cn(
          "w-36 h-36 items-center justify-center rounded-lg bg-custom-shape-white",
          isUploading && "opacity-70",
          className
        )}
      >
        {avatar ? (
          <Image
            source={{ uri: avatar }}
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
