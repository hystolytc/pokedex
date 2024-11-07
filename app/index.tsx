import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list"
import { Colors } from '@/constants/Colors';
import Feather from '@expo/vector-icons/Feather'
import { commonStyles } from "@/styles/global";
import { CardPokemon } from "@/components/CardPokemon";
import { router } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { pokemonsKey } from "@/constants/QueryKey";
import { getAllPokemon } from "@/services/pokemon";
import { ErrorPokedex } from "@/components/ErrorPokemon";
import { EmptyPokedex } from "@/components/EmptyPokedex";

export default function HomeScreen() {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isError
  } = useInfiniteQuery([pokemonsKey], ({ pageParam = 0 }) => getAllPokemon({ limit: 20, offset: pageParam }), {
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flat().length;
      return totalLoaded < lastPage.count ? totalLoaded : undefined;
    },
  })
  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];

  function extractId(url: string) {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1], 10) : 0;
  }

  return (
    <SafeAreaView style={commonStyles.safearea}>
      <View style={styles.header}>
        <Text style={styles.txtHeader}>Pokedex</Text>
        <View style={styles.btnFavorite}>
          <Pressable onPress={() => router.push({ pathname: '/favorite' })}>
            <Feather name="heart" size={24} />
          </Pressable>
        </View>
      </View>

      <View style={styles.commonPadding}>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.light.border.secondary,
            fontSize: 16,
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
          placeholder="Search by name..."
          placeholderTextColor={Colors.light.text.tertiary}
        />
      </View>

      {isError ?
        <ErrorPokedex />
        :
        isLoading ?
          null
          :
          <FlashList
            contentContainerStyle={styles.commonPadding}
            horizontal={false}
            numColumns={2}
            data={pokemons}
            renderItem={({ item, index }) => {
              const id = extractId(item.url)
              return (
                <CardPokemon
                  index={index + 1}
                  id={id}
                  name={item.name}
                  onPress={() => router.push({ pathname: '/detail/[id]', params: { id: id } })}
                />
              )
            }}
            estimatedItemSize={220}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
          />
      }

      {pokemons.length === 0 ? <EmptyPokedex text="No pokemon was found!" /> : null}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border.tertiary
  },
  txtHeader: {
    fontSize: 20,
    fontWeight: '700'
  },
  btnFavorite: {
    position: 'absolute',
    right: 16
  },
  commonPadding: {
    paddingHorizontal: 16,
    paddingBottom: 16
  }
})
