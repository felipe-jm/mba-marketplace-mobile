import { Eye, Mail } from "lucide-react-native";

import Logo from "@/assets/images/logo.svg";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/input";
import { VStack } from "@/components/ui/vstack";
import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Checkbox } from "@/components/checkbox";

export default function Index() {
  return (
    <Box className="bg-custom-shape-white flex-1 p-10 items-center justify-center">
      <Logo />
      <Text className="font-poppins text-3xl">Sign In</Text>

      <VStack className="w-full gap-4">
        <Input
          label="Label"
          placeholder="Placeholder"
          iconLeft={Mail}
          iconRight={Eye}
        />

        <Input
          label="Invalid Input"
          placeholder="Invalid Input"
          isInvalid
          iconLeft={Mail}
          iconRight={Eye}
        />

        <Input
          label="Error Input"
          placeholder="Error Input"
          errorMessage="Error Message"
          iconLeft={Mail}
          iconRight={Eye}
        />

        <Button title="Button" iconLeft={Mail} iconRight={Eye} />

        <Button
          title="Button"
          variant="outline"
          iconLeft={Mail}
          iconRight={Eye}
        />

        <Link title="Link" iconLeft={Mail} iconRight={Eye} />

        <Checkbox label="Checkbox" value="checkbox" />
      </VStack>
    </Box>
  );
}
