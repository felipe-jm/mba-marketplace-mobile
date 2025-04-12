import { ComponentProps } from "react";

import {
  Button as GluestackButton,
  ButtonText,
  ButtonSpinner,
} from "@/components/ui/button";

import { cn } from "@/utils/cn";

import { Icon } from "./ui/icon";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  variant?: "solid" | "outline";
  isLoading?: boolean;
  showBoxShadow?: boolean;
  iconLeft?: React.ElementType;
  iconRight?: React.ElementType;
};

export function Button({
  title,
  isLoading = false,
  variant = "solid",
  showBoxShadow = false,
  iconLeft,
  iconRight,
  className,
  ...rest
}: Props) {
  return (
    <GluestackButton
      {...rest}
      className={cn(
        "w-full rounded-xl h-16 justify-between",
        variant === "outline"
          ? "bg-transparent border border-custom-orange-base"
          : "bg-custom-orange-base",
        className
      )}
      disabled={isLoading}
      style={{
        boxShadow: showBoxShadow
          ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          : "none",
      }}
    >
      {iconLeft && (
        <Icon
          as={iconLeft}
          className={cn(
            "w-6 h-6",
            variant === "outline" ? "text-custom-orange-base" : "text-white"
          )}
        />
      )}

      {isLoading ? (
        <ButtonSpinner
          size="small"
          className={cn(
            "text-white",
            variant === "outline" ? "text-custom-orange-base" : "text-white"
          )}
        />
      ) : (
        <ButtonText
          className={cn(
            "text-white text-xl font-poppins-medium",
            variant === "outline" ? "text-custom-orange-base" : "text-white"
          )}
        >
          {title}
        </ButtonText>
      )}

      {iconRight && (
        <Icon
          as={iconRight}
          className={cn(
            "w-6 h-6",
            variant === "outline" ? "text-custom-orange-base" : "text-white"
          )}
        />
      )}
    </GluestackButton>
  );
}
