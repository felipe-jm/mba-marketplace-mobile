import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/utils/cn";

type WrapperProps = {
  backgroundColor?: string;
  children: React.ReactNode;
};

export function Wrapper({
  children,
  backgroundColor = "bg-custom-shape-white",
}: WrapperProps) {
  return (
    <SafeAreaView className={cn("flex-1 font-poppins", backgroundColor)}>
      {children}
    </SafeAreaView>
  );
}
