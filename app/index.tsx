import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { SearchIcon } from "@hugeicons/core-free-icons";

import Logo from "@/assets/images/logo.svg";

export default function Index() {
  return (
    <Box className="bg-custom-shape-white flex-1 items-center justify-center">
      <Logo />
      <Text className="font-poppins text-3xl">Sign In</Text>
      <HugeiconsIcon icon={SearchIcon} />
    </Box>
  );
}
