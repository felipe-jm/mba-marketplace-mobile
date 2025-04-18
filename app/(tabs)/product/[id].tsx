import { useState, useEffect } from "react";
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
import { ToastMessage } from "@/components/toast-message";
import { useToast } from "@/components/ui/toast";
import { Loading } from "@/components/loading";

import { ProductDTO } from "@/dtos/product-dto";
import { api } from "@/services/api";
import { AppError } from "@/utils/app-error";

export default function Product() {
  const { id } = useLocalSearchParams();

  const toast = useToast();

  const [product, setProduct] = useState<ProductDTO | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleGoBack = () => {
    router.push("/(tabs)");
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);

        const response = await api.get(`/products/${id}`);

        setProduct(response.data.product);
      } catch (error) {
        const isAppError = error instanceof AppError;

        const title = isAppError ? error.message : "Erro ao carregar produtos.";

        toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="error"
              title={title}
              onClose={() => toast.close(id)}
            />
          ),
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return (
    <Wrapper className="bg-custom-shape-shape p-6">
      {isLoading ? (
        <Loading />
      ) : (
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
            alt={product?.title || "Imagem do produto"}
          />

          <VStack className="flex-1 gap-6">
            <HStack className="justify-between">
              <Text className="font-dmsans text-xl  text-custom-gray-400">
                {product?.title}
              </Text>
              <HStack className="items-baseline">
                <Text className="text-xs text-custom-gray-500">R$ </Text>
                <Text className="font-dmsans text-xl text-custom-gray-500">
                  {((product?.priceInCents ?? 0) / 100)
                    .toFixed(2)
                    .replace(".", ",")}
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
      )}
    </Wrapper>
  );
}
