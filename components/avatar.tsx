import { Box } from "./ui/box";
import { Image } from "./ui/image";

export function Avatar() {
  return (
    <Box className="w-16 h-16 rounded-lg bg-custom-shape-shape">
      <Image
        source={{
          uri: "https://github.com/felipe-jm.png",
        }}
        className="w-full h-full rounded-lg"
      />
    </Box>
  );
}
