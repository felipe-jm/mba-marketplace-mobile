import React, {
  forwardRef,
  useCallback,
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
import { Checkbox } from "./checkbox";

const CATEGORIES = [
  { id: "1", label: "Brinquedo" },
  { id: "2", label: "Móvel" },
  { id: "3", label: "Papelaria" },
  { id: "4", label: "Saúde & Beleza" },
  { id: "5", label: "Utensílio" },
  { id: "6", label: "Vestuário" },
];

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

    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
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
              {/* Filtro de Valor */}
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

              {/* Filtro de Categoria */}
              <VStack className="gap-3">
                <Text className="text-sm font-dmsans">Categoria</Text>

                <VStack className="gap-2">
                  {CATEGORIES.map((category) => (
                    <Checkbox
                      key={category.id}
                      value={category.id}
                      isChecked={selectedCategories.includes(category.id)}
                      onChange={() => handleSelectCategory(category.id)}
                      label={category.label}
                    />
                  ))}
                </VStack>
              </VStack>

              {/* Botões de ação */}
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
