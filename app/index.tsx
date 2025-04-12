import Logo from "@/assets/images/logo.svg";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/input";
import { Icon } from "@/components/ui/icon";

import Mail02Icon from "@/assets/icons/mail-02.svg";
import ViewOffIcon from "@/assets/icons/view-off.svg";
import View from "@/assets/icons/view.svg";
import { VStack } from "@/components/ui/vstack";

export default function Index() {
  return (
    <Box className="bg-custom-shape-white flex-1 p-10 items-center justify-center">
      <Logo />
      <Text className="font-poppins text-3xl">Sign In</Text>

      <VStack className="w-full gap-4">
        <Input
          label="Label"
          placeholder="Placeholder"
          iconLeft={Mail02Icon}
          iconRight={View}
        />

        <Input
          label="Invalid Input"
          placeholder="Invalid Input"
          isInvalid
          iconLeft={Mail02Icon}
          iconRight={ViewOffIcon}
        />

        <Input
          label="Error Input"
          placeholder="Error Input"
          errorMessage="Error Message"
          iconLeft={Mail02Icon}
          iconRight={ViewOffIcon}
        />
      </VStack>
    </Box>
  );
}
