import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

export default function FiltersModalScreen() {
  console.log("FiltersModalScreen");

  return (
    <Box className="flex-1 bg-custom-shape-white">
      <Box className="p-6 bg-custom-shape-white rounded-b-3xl items-center">
        <Text>Filtros</Text>
      </Box>
    </Box>
  );
}
