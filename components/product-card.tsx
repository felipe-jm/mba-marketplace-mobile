import { Product } from "@/dtos/product";
import { Box } from "./ui/box";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { HStack } from "./ui/hstack";

type ProductCardProps = {
  product: Product;
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sofá",
    price: 1200.9,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "2",
    name: "Camiseta masculina",
    price: 35.89,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    id: "3",
    name: "Kit utensílios",
    price: 86.79,
    image:
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "4",
    name: "Kit de cremes",
    price: 159.9,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
  },
  {
    id: "5",
    name: "Caderno de desenho",
    price: 56.0,
    image:
      "https://images.unsplash.com/photo-1598620617148-c9e8ddee6711?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "6",
    name: "Carro de brinquedo",
    price: 24.6,
    image:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
];

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Box className="w-1/2 bg-white rounded-3xl p-2 mb-4">
      <Image
        source={{ uri: product.image }}
        className="w-full h-36 rounded-xl mb-2"
        resizeMode="cover"
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
  );
}
