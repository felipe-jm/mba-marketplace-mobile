import { useState } from "react";

import { User, Eye, KeyRound, Mail, Phone, LogOut } from "lucide-react-native";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";

import { AvatarUpload } from "@/components/avatar-upload";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Wrapper } from "@/components/wrapper";
import { HStack } from "@/components/ui/hstack";
import { useToast } from "@/components/ui/toast";

import { ToastMessage } from "@/components/toast-message";

import { AppError } from "@/utils/app-error";
import { api } from "@/services/api";

type ProfileFormDataProps = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  current_password?: string;
  confirm_password?: string;
};

const profileSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Formato de email inválido"),
    phone: z.string().min(1, "Telefone é obrigatório"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .optional()
      .or(z.literal("")),
    current_password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .optional()
      .or(z.literal("")),
    confirm_password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => !data.password || data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  })
  .refine(
    (data) => {
      return !data.password || (!!data.password && !!data.current_password);
    },
    {
      message: "Informe a senha antiga para definir uma nova senha",
      path: ["current_password"],
    }
  );

export default function ProfileScreen() {
  const toast = useToast();

  const { user, updateUserProfile, signOut } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormDataProps>({
    mode: "onChange",
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
    resolver: zodResolver(profileSchema),
  });

  const [isUpdating, setIsUpdating] = useState(false);

  async function handleProfileUpdate(data: ProfileFormDataProps) {
    try {
      setIsUpdating(true);

      const updatedUser = user;
      updatedUser.name = data.name;

      await api.put("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        current_password: data.current_password,
      });

      await updateUserProfile(updatedUser);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Perfil atualizado com sucesso!"
            onClose={() => toast.close(id)}
          />
        ),
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Erro ao atualizar perfil";

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
      setIsUpdating(false);
    }
  }

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
              <Button variant="outline" iconLeft={LogOut} onPress={signOut} />
            </Box>
          </HStack>

          <VStack className="w-full gap-6 mt-12">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  placeholder="Seu nome completo"
                  iconLeft={User}
                  errorMessage={errors.name?.message}
                  onChangeText={onChange}
                  value={value}
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
                  errorMessage={errors.phone?.message}
                  onChangeText={onChange}
                  value={value}
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
                name="current_password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Senha atual"
                    placeholder="Sua senha"
                    iconLeft={KeyRound}
                    iconRight={Eye}
                    errorMessage={errors.current_password?.message}
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
                    label="Nova senha"
                    placeholder="Sua nova senha"
                    iconLeft={KeyRound}
                    iconRight={Eye}
                    errorMessage={errors.password?.message}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </VStack>

            <Button
              title="Atualizar cadastro"
              className="mt-5"
              showBoxShadow
              isLoading={isUpdating}
              onPress={handleSubmit(handleProfileUpdate)}
            />
          </VStack>
        </VStack>
      </Box>
    </Wrapper>
  );
}
