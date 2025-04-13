import { FlatList, SafeAreaView } from "react-native";
import { useRef } from "react";
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
import { ProductCard } from "@/components/product-card";
import {
  FilterBottomSheet,
  FilterBottomSheetRefProps,
  FilterData,
} from "@/components/filter-bottom-sheet";

import { PRODUCTS } from "@/data/products";

import { useAuth } from "@/hooks/useAuth";

export default function ProductsScreen() {
  const { user } = useAuth();

  const filterBottomSheetRef = useRef<FilterBottomSheetRefProps>(null);

  function handleOpenFiltersModal() {
    filterBottomSheetRef.current?.open();
  }

  function handleOpenProfile() {
    router.push("/(tabs)/profile");
  }

  function handleApplyFilters(filters: FilterData) {
    console.log("Aplicando filtros:", filters);
    // Implementar lógica para aplicar os filtros
  }

  return (
    <SafeAreaView className="flex-1 bg-custom-shape-white">
      <Box className="flex-1 bg-custom-shape-background">
        <Box className="p-6 bg-custom-shape-white rounded-b-3xl items-center">
          <HStack className="w-full gap-4">
            <Avatar />

            <VStack className="gap-2">
              <Text className="font-dmsans text-custom-gray-500 text-md">
                Olá, {user.name}!
              </Text>
              <Link
                title="Ver perfil"
                iconRight={ArrowRight}
                onPress={handleOpenProfile}
              />
            </VStack>
          </HStack>

          <VStack className="w-full mt-8">
            <Text className="text-sm text-custom-gray-500">
              Explore produtos
            </Text>

            <HStack className="w-full gap-2 mt-4 items-center">
              <Box className="flex-1">
                <Input placeholder="Pesquisar" iconLeft={Search} />
              </Box>

              <Button
                className="w-12 h-12 rounded-xl justify-center items-center"
                iconRight={SlidersVertical}
                variant="outline"
                onPress={handleOpenFiltersModal}
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

        <FilterBottomSheet
          ref={filterBottomSheetRef}
          onApplyFilters={handleApplyFilters}
        />
      </Box>
    </SafeAreaView>
  );
}
