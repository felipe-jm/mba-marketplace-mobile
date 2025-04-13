import { ComponentProps, useState } from "react";

import { CircleAlert, Eye, EyeOff } from "lucide-react-native";

import {
  Input as GluestackInput,
  InputField,
  InputSlot,
} from "@/components/ui/input";

import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";

import { cn } from "@/utils/cn";
import { Icon } from "./ui/icon";
import { Pressable } from "react-native";

type Props = ComponentProps<typeof InputField> & {
  label?: string;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  errorMessage?: string | null;
  iconLeft?: React.ElementType;
  iconRight?: React.ElementType;
  secureTextEntry?: boolean;
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
  secureTextEntry,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const invalid = !!errorMessage || isInvalid;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const PasswordIcon = isPasswordVisible ? Eye : EyeOff;

  return (
    <FormControl isInvalid={invalid} className="w-full">
      {label && (
        <FormControlLabel>
          <FormControlLabelText
            className={cn(
              "uppercase text-custom-gray-300",
              isFocused && "text-custom-orange-base"
            )}
          >
            {label}
          </FormControlLabelText>
        </FormControlLabel>
      )}
      <GluestackInput
        className={cn("h-12", className)}
        variant="underlined"
        isInvalid={invalid}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        style={{
          // TODO: get colors from theme
          borderBottomColor: isFocused ? "#3D3D3D" : "#666666",
          borderBottomWidth: 0.5,
        }}
      >
        {iconLeft && (
          <InputSlot className="ml-2">
            <Icon
              as={iconLeft}
              className={cn(
                "w-6 h-6 text-custom-gray-200",
                isFocused && "text-custom-orange-base",
                invalid && "text-custom-semantic-error"
              )}
            />
          </InputSlot>
        )}
        <InputField
          className={cn("px-4 py-2 font-poppins text-md", className)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...rest}
        />
        {secureTextEntry ? (
          <InputSlot className="mr-2">
            <Pressable onPress={togglePasswordVisibility}>
              <Icon
                as={PasswordIcon}
                className={cn("w-6 h-6 text-custom-gray-200")}
              />
            </Pressable>
          </InputSlot>
        ) : iconRight ? (
          <InputSlot className="mr-2">
            <Icon
              as={iconRight}
              className={cn("w-6 h-6 text-custom-gray-200")}
            />
          </InputSlot>
        ) : null}
      </GluestackInput>

      {errorMessage && (
        <FormControlError className="items-center justify-start gap-1">
          <FormControlErrorIcon
            className="w-4 h-4 text-custom-semantic-error"
            as={CircleAlert}
          />
          <FormControlErrorText className="text-custom-semantic-error">
            {errorMessage}
          </FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}
