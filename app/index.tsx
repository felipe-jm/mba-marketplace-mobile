import { Eye, KeyRound, Mail, ArrowRight } from "lucide-react-native";

import Logo from "@/assets/images/logo.svg";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/input";
import { VStack } from "@/components/ui/vstack";
import { Button } from "@/components/button";
import { Wrapper } from "@/components/wrapper";

export default function Index() {
  return (
    <Wrapper>
      <Box className="p-10 flex-1 items-center justify-between">
        <VStack className="w-full items-center">
          <Logo />

          <VStack className="mt-12 gap-2">
            <Text className="font-dmsans text-custom-gray-500 text-3xl">
              Acesse sua conta
            </Text>
            <Text className="text-custom-gray-300 text-sm">
              Informe seu e-mail e senha para entrar
            </Text>
          </VStack>

          <VStack className="w-full gap-6 mt-12">
            <Input
              label="E-mail"
              placeholder="mail@exemplo.br"
              iconLeft={Mail}
              iconRight={Eye}
            />
            <Input
              label="Senha"
              placeholder="Sua senha"
              iconLeft={KeyRound}
              iconRight={Eye}
            />

            <Button
              title="Entrar"
              className="mt-5"
              showBoxShadow
              iconRight={ArrowRight}
            />
          </VStack>
        </VStack>

        <VStack className="w-full gap-6">
          <Text className="text-custom-gray-300 text-md">
            Ainda não tem uma conta?
          </Text>
          <Button title="Cadastrar" variant="outline" iconRight={ArrowRight} />
        </VStack>
      </Box>
    </Wrapper>
  );
}
