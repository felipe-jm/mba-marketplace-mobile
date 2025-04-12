import { ComponentProps } from "react";

import {
  Input as GluestackInput,
  InputField,
  InputSlot,
} from "@/components/ui/input";

import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";

import { cn } from "@/utils/cn";
import { Icon } from "./ui/icon";

type Props = ComponentProps<typeof InputField> & {
  label: string;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  errorMessage?: string | null;
  iconLeft?: React.ElementType;
  iconRight?: React.ElementType;
};

export function Input({
  label,
  isReadOnly = false,
  isDisabled = false,
  isInvalid = false,
  errorMessage = null,
  className,
  iconLeft,
  iconRight,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} className="w-full">
      <FormControlLabel>
        <FormControlLabelText
          className={cn(
            "uppercase text-custom-gray-400",
            invalid && "text-custom-orange-base"
          )}
        >
          {label}
        </FormControlLabelText>
      </FormControlLabel>
      <GluestackInput
        className={cn("h-12", className)}
        variant="underlined"
        isInvalid={invalid}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
      >
        {iconLeft && (
          <InputSlot className="ml-2">
            <Icon as={iconLeft} className="w-6 h-6 text-custom-gray-200" />
          </InputSlot>
        )}
        <InputField className={cn("px-4 py-2", className)} {...rest} />
        {iconRight && (
          <InputSlot className="mr-2 text-custom-gray-300">
            <Icon as={iconRight} />
          </InputSlot>
        )}
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText className="text-custom-orange-base-200">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
