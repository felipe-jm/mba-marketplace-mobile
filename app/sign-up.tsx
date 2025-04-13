import { useState } from "react";
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

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Logo from "@/assets/images/logo.svg";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/input";
import { VStack } from "@/components/ui/vstack";
import { Button } from "@/components/button";
import { Wrapper } from "@/components/wrapper";
import { AvatarUpload } from "@/components/avatar-upload";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@/components/toast-message";

import { useAuth } from "@/hooks/useAuth";

import { api } from "@/services/api";
import { saveUserStorage } from "@/storage/user";
import { AppError } from "@/utils/app-error";

type SignUpFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().min(1, "Telefone é obrigatório"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    password_confirm: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "As senhas não coincidem",
    path: ["password_confirm"],
  });

export default function SignUp() {
  const { signIn } = useAuth();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [avatarId, setAvatarId] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirm: "",
    },
  });

  function handleNavigateToSignIn() {
    router.push("/");
  }

  function handleAvatarUploadSuccess(id: string) {
    setAvatarId(id);
  }

  async function handleSignUp({
    name,
    email,
    phone,
    password,
    password_confirm,
  }: SignUpFormData) {
    try {
      setIsLoading(true);

      const response = await api.post("/sellers", {
        name,
        email,
        phone,
        password,
        passwordConfirmation: password_confirm,
        avatarId: avatarId,
      });

      await saveUserStorage(response.data);

      await signIn(email, password);

      router.push("/(tabs)");
    } catch (error) {
      console.log(error);

      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Erro ao criar usuário";

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

            <AvatarUpload
              className="bg-custom-shape-shape"
              onUploadSuccess={handleAvatarUploadSuccess}
            />

            <VStack className="w-full gap-6 mt-12">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Nome"
                    placeholder="Seu nome completo"
                    iconLeft={User}
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    iconLeft={Phone}
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />

              <VStack className="w-full gap-6">
                <Text className="font-dmsans text-custom-gray-500 text-md mb-2">
                  Acesso
                </Text>

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="E-mail"
                      placeholder="mail@exemplo.br"
                      autoCapitalize="none"
                      iconLeft={Mail}
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.email?.message}
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
                      secureTextEntry
                      autoCapitalize="none"
                      iconLeft={KeyRound}
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.password?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password_confirm"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Confirmar senha"
                      placeholder="Confirme a senha"
                      secureTextEntry
                      autoCapitalize="none"
                      iconLeft={KeyRound}
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.password_confirm?.message}
                    />
                  )}
                />
              </VStack>

              <Button
                title="Cadastrar"
                className="mt-5"
                showBoxShadow
                iconRight={ArrowRight}
                onPress={handleSubmit(handleSignUp)}
                isLoading={isLoading}
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
