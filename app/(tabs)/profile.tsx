import { User, Eye, KeyRound, Mail, Phone, LogOut } from "lucide-react-native";

import { AvatarUpload } from "@/components/avatar-upload";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Wrapper } from "@/components/wrapper";
import { HStack } from "@/components/ui/hstack";

export default function ProfileScreen() {
  return (
    <Wrapper className="bg-custom-shape-background">
      <Box className="flex-1 p-6 rounded-b-3xl items-center">
        <VStack className="w-full gap-4">
          <HStack className="w-full items-center justify-between">
            <Box className="w-12 h-12" />

            <Box className="items-center">
              <AvatarUpload />
            </Box>

            <Box>
              <Button variant="outline" iconLeft={LogOut} />
            </Box>
          </HStack>

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

            <VStack className="w-full gap-6">
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
                label="Senha atual"
                placeholder="Sua senha"
                iconLeft={KeyRound}
                iconRight={Eye}
              />

              <Input
                label="Nova senha"
                placeholder="Sua nova senha"
                iconLeft={KeyRound}
                iconRight={Eye}
              />
            </VStack>

            <Button title="Atualizar cadastro" className="mt-5" showBoxShadow />
          </VStack>
        </VStack>
      </Box>
    </Wrapper>
  );
}
