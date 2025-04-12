import { ScrollView } from "react-native";
import { router } from "expo-router";

import {
  Eye,
  KeyRound,
  Mail,
  ArrowRight,
  User,
  Phone,
} from "lucide-react-native";

import Logo from "@/assets/images/logo.svg";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/input";
import { VStack } from "@/components/ui/vstack";
import { Button } from "@/components/button";
import { Wrapper } from "@/components/wrapper";
import { AvatarUpload } from "@/components/avatar-upload";

export default function SignUp() {
  function handleNavigateToSignIn() {
    router.push("/");
  }

  return (
    <Wrapper>
      <ScrollView>
        <Box className="p-10 flex-1 items-center justify-between">
          <VStack className="w-full items-center">
            <Logo />

            <VStack className="my-12 gap-2 items-center">
              <Text className="font-dmsans text-custom-gray-500 text-3xl">
                Crie sua conta
              </Text>
              <Text className="text-custom-gray-300 text-sm">
                Informe os seus dados pessoais e de acesso
              </Text>
            </VStack>

            <AvatarUpload />

            <VStack className="w-full gap-6 mt-12">
              <Input
                label="Nome"
                placeholder="Seu nome completo"
                iconLeft={User}
              />
              <Input
                label="Telefone"
                placeholder="(00) 00000-0000"
                iconLeft={Phone}
              />

              <VStack className="w-full gap-2">
                <Text className="font-dmsans text-custom-gray-500 text-md mb-2">
                  Acesso
                </Text>

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

                <Input
                  label="Confirmar senha"
                  placeholder="Confirme sua senha"
                  iconLeft={KeyRound}
                  iconRight={Eye}
                />
              </VStack>

              <Button
                title="Entrar"
                className="mt-5"
                showBoxShadow
                iconRight={ArrowRight}
              />
            </VStack>
          </VStack>

          <VStack className="w-full gap-6 mt-16">
            <Text className="text-custom-gray-300 text-md">
              Já tem uma conta?
            </Text>
            <Button
              title="Acessar"
              variant="outline"
              iconRight={ArrowRight}
              onPress={handleNavigateToSignIn}
            />
          </VStack>
        </Box>
      </ScrollView>
    </Wrapper>
  );
}
