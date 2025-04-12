import { FlatList, SafeAreaView } from "react-native";

import { router } from "expo-router";

import { ArrowRight, Search, SlidersVertical } from "lucide-react-native";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Avatar } from "@/components/avatar";
import { Link } from "@/components/link";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { ProductCard, PRODUCTS } from "@/components/product-card";

export default function ProductsScreen() {
  function handleOpenFiltersModal() {
    router.push("/modal");
  }

  return (
    <SafeAreaView className="flex-1 bg-custom-shape-white">
      <Box className="flex-1 bg-custom-shape-shape">
        <Box className="p-6 bg-custom-shape-white rounded-b-3xl items-center">
          <HStack className="w-full gap-4">
            <Avatar />

            <VStack className="gap-2">
              <Text className="font-dmsans text-custom-gray-500 text-md">
                Olá, Felipe!
              </Text>
              <Link href="/profile" title="Ver perfil" iconRight={ArrowRight} />
            </VStack>
          </HStack>

          <VStack className="w-full mt-8">
            <Text className="text-sm text-custom-gray-500">
              Explore produtos
            </Text>

            <HStack className="w-full gap-2 mt-4 items-center">
              <Box className="flex-1">
                <Input
                  placeholder="Pesquisar"
                  iconLeft={Search}
                  onPress={handleOpenFiltersModal}
                />
              </Box>

              <Button
                className="w-12 h-12 rounded-xl justify-center items-center"
                iconRight={SlidersVertical}
                variant="outline"
              />
            </HStack>
          </VStack>
        </Box>

        <FlatList
          data={PRODUCTS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 16 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            gap: 8,
          }}
          className="flex-1 px-4"
        />
      </Box>
    </SafeAreaView>
  );
}
