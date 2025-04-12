import { SafeAreaView } from "react-native-safe-area-context";

type WrapperProps = {
  children: React.ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <SafeAreaView className="flex-1 font-poppins bg-custom-shape-white">
      {children}
    </SafeAreaView>
  );
}
