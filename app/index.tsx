import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex items-center justify-center h-full px-4">
          <Text className="text-7xl text-blue-500 font-black">
            Ani<Text className="text-white">Quiz</Text>
          </Text>
          <Text className="text-white font-pmedium text-lg">
            Test your anime knowledge
          </Text>
          <CustomButton
            title="Test Knowledge"
            handlePress={() => router.push("/character")}
            containerStyles="w-2/3 mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default App;
