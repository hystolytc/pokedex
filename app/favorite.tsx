import { CardPokemon } from "@/components/CardPokemon";
import { EmptyPokedex } from "@/components/EmptyPokedex";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { useData } from "@/context/DataContext";
import { commonStyles } from "@/styles/global";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoriteScreen() {
  const { pokemons } = useData()

  return (
    <SafeAreaView style={commonStyles.safearea}>
      <HeaderNavigation
        title="Favorite Pokemon"
        onPress={router.back}
      />

      {pokemons.length === 0 ?
        <EmptyPokedex
          text="You have no favorite pokemon yet." />
        :
        <FlashList
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          horizontal={false}
          numColumns={2}
          data={pokemons}
          renderItem={({ item, index }) => (
            <CardPokemon
              index={index + 1}
              id={item.id}
              name={item.name}
              onPress={() => router.push({ pathname: '/detail/[id]', params: { id: item.id } })}
            />
          )}
          estimatedItemSize={220}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      }
    </SafeAreaView>
  )
}
