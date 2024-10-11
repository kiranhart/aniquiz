import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { gql, useLazyQuery } from "@apollo/client";
import { getRandomElement } from "@/app/utils";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        total
        lastPage
      }
      characters(isBirthday: false, sort: FAVOURITES_DESC) {
        id
        name {
          first
          last
        }
        image {
          large
        }
      }
    }
  }
`;

interface Character {
  id: number;
  name: {
    first?: string;
    last?: string;
  };
  image: {
    large: string;
  };
}

function getRandomCharacter(characters: Character[]): Character {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PopularCharacters = () => {
  const [wrong, setWrong] = useState(0);
  const [right, setRight] = useState(0);

  // used to track when needs refreshing
  const [page, setPage] = useState(1);
  const [timesDataUsed, setTimesDataUsed] = useState(0);

  const [selectedCharacter, setSelectedCharacter] = useState<Character>();
  const [characterOptions, setCharacterOptions] = useState<Character[]>();

  const [getCharacters, { loading, error, data }] =
    useLazyQuery(GET_CHARACTERS);

  useEffect(() => {
    console.log("Fetching");
    getCharacters({ variables: { page: page } });
  }, [page, getCharacters]);

  useEffect(() => {
    if (data) {
      const character = getRandomCharacter(data.Page.characters);
      setSelectedCharacter(character);

      // grab 3 random characters
      const listWithoutSelected = data.Page.characters.filter(
        (content) => content.id !== character.id
      );

      const randomEntries: Character[] = [];
      for (let i = 0; i < 3; i++) {
        randomEntries.push(getRandomCharacter(listWithoutSelected));
      }

      randomEntries.push(character);
      const shuffled = shuffleArray(randomEntries);
      setCharacterOptions(shuffled);
    }

    // shuffle
  }, [right, wrong, page, loading, data]);

  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <ScrollView className="h-full w-full px-4 -mt-8">
        <View className="bg-secondary-100 rounded-lg py-6 px-4 relative">
          <Text className="text-white text-center text-2xl font-psemibold">
            Who is this?
          </Text>
          <Image
            src={selectedCharacter?.image.large}
            className="w-2/3 mx-auto aspect-square object-contain my-4 rounded-md"
            contentFit="container"
          />
          <View className="flex flex-row justify-evenly items-center">
            <Text className="text-green-400 text-lg font-psemibold">
              Correct: {right}
            </Text>
            <Text className="text-red-500 text-lg font-psemibold">
              Incorrect: {wrong}
            </Text>
          </View>
        </View>
        <View className="mt-4">
          {characterOptions?.map((character, index) => {
            return (
              <CustomButton
                key={character.id + index}
                title={character.name.first}
                containerStyles={"bg-[#3DB4F2] my-2"}
                handlePress={() => {
                  if (character.id === selectedCharacter.id) {
                    setRight(right + 1);
                  } else {
                    setWrong(wrong + 1);
                  }

                  setTimesDataUsed(timesDataUsed + 1);
                  if (timesDataUsed > 30) {
                    setTimesDataUsed(0);
                    setPage(getRandomNumber(1, 99));
                  }

                  setSelectedCharacter(null);
                  setCharacterOptions([]);
                }}
              />
            );
          })}
        </View>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default PopularCharacters;
