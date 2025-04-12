import { useLocalSearchParams, router } from "expo-router";

import { ArrowLeft, ChartNoAxesCombined } from "lucide-react-native";

import { Wrapper } from "@/components/wrapper";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/link";

import { PRODUCTS } from "@/data/products";

export default function Product() {
  const { id } = useLocalSearchParams();

  const handleGoBack = () => {
    router.push("/(tabs)");
  };

  const product = PRODUCTS.find((product) => product.id === id);

  return (
    <Wrapper className="bg-custom-shape-shape p-6">
      <VStack className="flex-1">
        <Link
          title="Voltar"
          className="w-12 h-12 rounded-xl justify-center items-center"
          iconLeft={ArrowLeft}
          onPress={handleGoBack}
        />

        <Image
          source={{ uri: product?.image }}
          className="w-full h-60 rounded-xl my-8"
          resizeMode="cover"
          alt={product?.name}
        />

        <VStack className="flex-1 gap-6">
          <HStack className="justify-between">
            <Text className="font-dmsans text-xl  text-custom-gray-400">
              {product?.name}
            </Text>
            <HStack className="items-baseline">
              <Text className="text-xs text-custom-gray-500">R$ </Text>
              <Text className="font-dmsans text-xl text-custom-gray-500">
                {product?.price.toFixed(2).replace(".", ",")}
              </Text>
            </HStack>
          </HStack>

          <Text className="text-sm text-custom-gray-400">
            {product?.description}
          </Text>

          <VStack className="gap-2">
            <Text className="text-sm font-dmsans text-custom-gray-500">
              Categoria
            </Text>
            <Text className="text-sm text-custom-gray-400">Móvel</Text>
          </VStack>

          <HStack className="gap-2 bg-custom-blue-light rounded-xl p-4 ">
            <Box className="w-9 h-9 rounded-xl bg-custom-blue-dark items-center justify-center">
              <Icon as={ChartNoAxesCombined} color="white" />
            </Box>
            <Text className="text-sm flex-1">
              <Text className="font-poppins-medium text-custom-gray-500">
                24 pessoas{" "}
              </Text>
              visualizaram este produto nos últimos 7 dias
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Wrapper>
  );
}
