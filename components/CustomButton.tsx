import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, containerStyles, textStyles }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-blue-500 rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
    >
      <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
