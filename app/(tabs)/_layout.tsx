import React from "react";
import { Tabs } from "expo-router";
import { Icon } from "@/components/ui/icon";
import { Store, User } from "lucide-react-native";

export default function TabLayout() {
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
