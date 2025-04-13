import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/utils/cn";

type WrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export function Wrapper({ children, className }: WrapperProps) {
  return (
    <SafeAreaView
      className={cn("flex-1 font-poppins", "bg-custom-shape-white", className)}
    >
      {children}
    </SafeAreaView>
  );
}
