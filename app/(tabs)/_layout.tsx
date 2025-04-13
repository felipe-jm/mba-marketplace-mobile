import { Redirect, Tabs } from "expo-router";
import { Store, User } from "lucide-react-native";

import { Icon } from "@/components/ui/icon";

import { useAuth } from "@/hooks/useAuth";

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "PRODUTOS",
          // TODO: Get color from theme
          tabBarActiveTintColor: "#F24D0D",
          tabBarInactiveTintColor: "#ADADAD",
          tabBarIcon: ({ color }) => <Icon as={Store} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "PERFIL",
          // TODO: Get color from theme
          tabBarActiveTintColor: "#F24D0D",
          tabBarInactiveTintColor: "#ADADAD",
          tabBarIcon: ({ color }) => <Icon as={User} color={color} />,
        }}
      />

      <Tabs.Screen
        name="product"
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Tabs>
  );
}
