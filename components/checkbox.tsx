import { ComponentProps } from "react";

import {
  Checkbox as GluestackCheckbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "./ui/checkbox";

import { Check } from "lucide-react-native";

type Props = ComponentProps<typeof GluestackCheckbox> & {
  label: string;
};

export function Checkbox({
  label,
  isInvalid = false,
  isDisabled = false,
  ...rest
}: Props) {
  return (
    <GluestackCheckbox
      size="md"
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      {...rest}
    >
      <CheckboxIndicator>
        <CheckboxIcon as={Check} className="bg-custom-orange-base" />
      </CheckboxIndicator>
      <CheckboxLabel className="text-custom-gray-400">{label}</CheckboxLabel>
    </GluestackCheckbox>
  );
}
