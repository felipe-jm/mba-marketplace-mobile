import { useState } from "react";
import { router } from "expo-router";

import { Eye, KeyRound, Mail, ArrowRight } from "lucide-react-native";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Logo from "@/assets/images/logo.svg";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Wrapper } from "@/components/wrapper";
import { ToastMessage } from "@/components/toast-message";

import { useAuth } from "@/hooks/useAuth";
import { AppError } from "@/utils/app-error";

type SignInFormData = {
  email: string;
  password: string;
};

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function Index() {
  const { signIn } = useAuth();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleNavigateToSignUp() {
    router.push("/(tabs)");
  }

  async function handleSignIn({ email, password }: SignInFormData) {
    try {
      setIsLoading(true);

      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível acessar. Tente novamente mais tarde.";

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
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="E-mail"
                  placeholder="mail@exemplo.br"
                  iconLeft={Mail}
                  iconRight={Eye}
                  errorMessage={errors.email?.message}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Senha"
                  placeholder="Sua senha"
                  iconLeft={KeyRound}
                  iconRight={Eye}
                  errorMessage={errors.password?.message}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Button
              title="Entrar"
              className="mt-5"
              showBoxShadow
              isLoading={isLoading}
              iconRight={ArrowRight}
              onPress={handleSubmit(handleSignIn)}
            />
          </VStack>
        </VStack>

        <VStack className="w-full gap-6">
          <Text className="text-custom-gray-300 text-md">
            Ainda não tem uma conta?
          </Text>
          <Button
            title="Cadastrar"
            variant="outline"
            iconRight={ArrowRight}
            onPress={handleNavigateToSignUp}
          />
        </VStack>
      </Box>
    </Wrapper>
  );
}
