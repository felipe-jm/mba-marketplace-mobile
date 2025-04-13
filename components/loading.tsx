import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";

export function Loading() {
  return (
    <Center className="flex-1">
      <Spinner size="large" className="color-white" />
    </Center>
  );
}
