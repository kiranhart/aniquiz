import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const Character = () => {
  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <ScrollView className="h-full w-full px-4">
        <View className="bg-secondary-100 rounded-lg py-6 px-4">
          <Text className="text-white text-center text-2xl font-psemibold">
            Pick Quiz Mode
          </Text>
          <CustomButton title={"Popular Characters"} containerStyles={"mt-4"} handlePress={() => router.push('/(quiz)/popular-characters')} />
          <CustomButton title={"Release Year (Coming Soon)"} containerStyles={"mt-4"} />
          <CustomButton title={"Gender (Coming Soon)"} containerStyles={"mt-4"} />
          <CustomButton title={"Birthday (Today) (Coming Soon)"} containerStyles={"mt-4"} />
        </View>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default Character;
