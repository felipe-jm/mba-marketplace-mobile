import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { X } from "lucide-react-native";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useToast } from "@/components/ui/toast";
import { Checkbox } from "./checkbox";

import { CategoryDTO } from "@/dtos/category-dto";
import { api } from "@/services/api";
import { ToastMessage } from "./toast-message";
import { AppError } from "@/utils/app-error";

export type FilterBottomSheetRefProps = {
  open: () => void;
  close: () => void;
};

type Props = {
  onApplyFilters?: (filters: FilterData) => void;
};

export type FilterData = {
  minValue: string;
  maxValue: string;
  categories: string[];
};

export const FilterBottomSheet = forwardRef<FilterBottomSheetRefProps, Props>(
  ({ onApplyFilters }, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = ["60%"];

    const toast = useToast();

    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleOpen = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleClose = useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        close: handleClose,
      }),
      [handleOpen, handleClose]
    );

    function handleSelectCategory(categoryId: string) {
      setSelectedCategories((prev) => {
        if (prev.includes(categoryId)) {
          return prev.filter((id) => id !== categoryId);
        } else {
          return [...prev, categoryId];
        }
      });
    }

    function handleClearFilters() {
      setMinValue("");
      setMaxValue("");
      setSelectedCategories([]);
    }

    function handleApplyFilters() {
      if (onApplyFilters) {
        onApplyFilters({
          minValue,
          maxValue,
          categories: selectedCategories,
        });
      }
      handleClose();
    }

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    useEffect(() => {
      async function fetchCategories() {
        try {
          const response = await api.get("/categories");

          setCategories(response.data.categories);
        } catch (error) {
          const isAppError = error instanceof AppError;

          const title = isAppError
            ? error.message
            : "Erro ao carregar produtos.";

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
        }
      }

      fetchCategories();
    }, []);

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "white" }}
        handleIndicatorStyle={{ backgroundColor: "#ccc", width: 50 }}
      >
        <Box className="p-6">
          <HStack className="items-center justify-between mb-4">
            <Text className="text-xl font-dmsans text-custom-gray-900">
              Filtrar anúncios
            </Text>
            <Pressable onPress={handleClose}>
              <Icon as={X} size="lg" color="#666666" />
            </Pressable>
          </HStack>

          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            <VStack className="gap-6">
              <VStack className="gap-3">
                <Text className="text-sm font-dmsans">Valor</Text>

                <HStack className="gap-4">
                  <Box className="flex-1">
                    <Input
                      placeholder="De"
                      value={minValue}
                      onChangeText={setMinValue}
                      keyboardType="numeric"
                    />
                  </Box>
                  <Box className="flex-1">
                    <Input
                      placeholder="Até"
                      value={maxValue}
                      onChangeText={setMaxValue}
                      keyboardType="numeric"
                    />
                  </Box>
                </HStack>
              </VStack>

              <VStack className="gap-3">
                <Text className="text-sm font-dmsans">Categoria</Text>

                <VStack className="gap-2">
                  {categories.map((category) => (
                    <Checkbox
                      key={category.id}
                      value={category.id}
                      isChecked={selectedCategories.includes(category.id)}
                      onChange={() => handleSelectCategory(category.id)}
                      label={category.title}
                    />
                  ))}
                </VStack>
              </VStack>

              <HStack className="gap-4 mt-4 mb-2">
                <Button
                  title="Limpar filtro"
                  variant="outline"
                  onPress={handleClearFilters}
                  className="flex-1"
                />
                <Button
                  title="Filtrar"
                  onPress={handleApplyFilters}
                  className="flex-1"
                />
              </HStack>
            </VStack>
          </BottomSheetScrollView>
        </Box>
      </BottomSheetModal>
    );
  }
);
