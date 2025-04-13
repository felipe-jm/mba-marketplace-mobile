import React from "react";

import { Link, Stack } from "expo-router";

import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Box>
        <Text>Esta tela não existe.</Text>

        <Link href="/">
          <Text>Voltar para a tela inicial</Text>
        </Link>
      </Box>
    </>
  );
}
