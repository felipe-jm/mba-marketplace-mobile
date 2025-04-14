import { FlatList, SafeAreaView } from "react-native";
import { useEffect, useRef, useState } from "react";
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
import { ToastMessage } from "@/components/toast-message";
import { useToast } from "@/components/ui/toast";
import { Loading } from "@/components/loading";

import { useAuth } from "@/hooks/useAuth";
import { ProductDTO } from "@/dtos/product-dto";
import { api } from "@/services/api";
import { AppError } from "@/utils/app-error";

export default function ProductsScreen() {
  const { user } = useAuth();

  const toast = useToast();

  const filterBottomSheetRef = useRef<FilterBottomSheetRefProps>(null);

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [filters, setFilters] = useState<FilterData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function handleOpenFiltersModal() {
    filterBottomSheetRef.current?.open();
  }

  function handleOpenProfile() {
    router.push("/(tabs)/profile");
  }

  function handleApplyFilters(filters: FilterData) {
    setFilters(filters);
  }

  function handleSearch(text: string) {
    setSearchQuery(text);
  }

  async function fetchProducts() {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      if (filters) {
        if (filters.minValue) {
          params.append("minPrice", filters.minValue);
        }

        if (filters.maxValue) {
          params.append("maxPrice", filters.maxValue);
        }

        if (filters.categories && filters.categories.length > 0) {
          filters.categories.forEach((categoryId: string) => {
            params.append("categoryId", categoryId);
          });
        }
      }

      const query = params.toString() ? `?${params.toString()}` : "";
      const response = await api.get(`/products${query}`);

      setProducts(response.data.products);
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

  useEffect(() => {
    fetchProducts();
  }, [filters, searchQuery]);

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
                <Input
                  placeholder="Pesquisar"
                  iconLeft={Search}
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
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

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={products}
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
        )}

        <FilterBottomSheet
          ref={filterBottomSheetRef}
          onApplyFilters={handleApplyFilters}
        />
      </Box>
    </SafeAreaView>
  );
}
