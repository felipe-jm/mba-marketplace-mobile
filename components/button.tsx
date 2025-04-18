import { ComponentProps } from "react";

import {
  Button as GluestackButton,
  ButtonText,
  ButtonSpinner,
} from "@/components/ui/button";

import { cn } from "@/utils/cn";

import { Icon } from "./ui/icon";

type Props = ComponentProps<typeof GluestackButton> & {
  title?: string;
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
  // Determine if button has any icons
  const hasIcons = !!iconLeft || !!iconRight;

  return (
    <GluestackButton
      {...rest}
      className={cn(
        "w-full rounded-xl h-16",
        // Use justify-between only when there are icons and not loading
        hasIcons && !isLoading ? "justify-between" : "justify-center",
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
      {/* Show left icon only if not loading */}
      {!isLoading && iconLeft && (
        <Icon
          as={iconLeft}
          className={cn(
            "w-6 h-6",
            variant === "outline" ? "text-custom-orange-base" : "text-white"
          )}
        />
      )}

      {!title ? null : isLoading ? (
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

      {/* Show right icon only if not loading */}
      {!isLoading && iconRight && (
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
