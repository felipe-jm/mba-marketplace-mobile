import { X } from "lucide-react-native";

import { Toast, ToastDescription, ToastTitle } from "./ui/toast";
import { VStack } from "./ui/vstack";
import { Pressable } from "./ui/pressable";
import { Icon } from "./ui/icon";

type Props = {
  id: string;
  title: string;
  description?: string;
  action?: "error" | "success";
  onClose: () => void;
};

export function ToastMessage({
  id,
  title,
  description,
  action = "success",
  onClose,
}: Props) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      className={`${
        action === "success" ? "bg-brand-green-500" : "bg-brand-red-500"
      } mt-10 w-full`}
    >
      <VStack space="xs">
        <Pressable className="self-end" onPress={onClose}>
          <Icon as={X} className="text-typography-white" size="md" />
        </Pressable>

        <ToastTitle className="text-typography-white font-heading">
          {title}
        </ToastTitle>

        {description && (
          <ToastDescription className="text-typography-white font-body">
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  );
}
