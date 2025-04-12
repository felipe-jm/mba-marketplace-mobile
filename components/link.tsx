import { ComponentProps } from "react";

import { Link as GluestackLink, LinkText } from "@/components/ui/link";

import { cn } from "@/utils/cn";

import { Icon } from "./ui/icon";

type Props = ComponentProps<typeof GluestackLink> & {
  title: string;
  iconLeft?: React.ElementType;
  iconRight?: React.ElementType;
};

export function Link({ title, iconLeft, iconRight, ...rest }: Props) {
  return (
    <GluestackLink {...rest} className="flex-row items-center gap-4">
      {iconLeft && (
        <Icon
          as={iconLeft}
          className={cn("w-6 h-6", "text-custom-orange-base")}
        />
      )}

      <LinkText
        className={cn("text-white", "text-custom-orange-base no-underline")}
      >
        {title}
      </LinkText>

      {iconRight && (
        <Icon
          as={iconRight}
          className={cn("w-6 h-6", "text-custom-orange-base")}
        />
      )}
    </GluestackLink>
  );
}
