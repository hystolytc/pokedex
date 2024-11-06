import { CardPokemon } from "@/components/CardPokemon";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { commonStyles } from "@/styles/global";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoriteScreen() {
  return (
    <SafeAreaView style={commonStyles.safearea}>
      <HeaderNavigation
        title="Favorite Pokemon"
        onPress={router.back}
      />
      <FlashList
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        horizontal={false}
        numColumns={2}
        data={DATA}
        renderItem={({ item, index }) => (
          <CardPokemon
            index={index + 1}
            id={item.id}
            imgUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            name={item.name}
          />
        )}
        estimatedItemSize={220}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </SafeAreaView>
  )
}

const DATA = Array(101).fill(0).map((v: any, i: number) => ({
  id: i + 1,
  name: `Name ${i}`,
  url: 'https://pokeapi.co/api/v2/pokemon/1/'
}))