import { Link } from "expo-router";

import { Product } from "@/dtos/product";

import { Box } from "./ui/box";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { HStack } from "./ui/hstack";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="flex-1 w-1/2 mb-4">
      <Box className="w-full bg-white rounded-3xl p-2">
        <Image
          source={{ uri: product.image }}
          className="w-full h-36 rounded-xl mb-2"
          resizeMode="cover"
          alt={product.name}
        />
        <VStack className="p-2">
          <Text className="text-custom-gray-400 text-md mb-1">
            {product.name}
          </Text>
          <HStack className="items-baseline">
            <Text className="text-xs text-custom-gray-500">R$ </Text>
            <Text className="font-dmsans text-lg text-custom-gray-500">
              {product.price.toFixed(2).replace(".", ",")}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
}
