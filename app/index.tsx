import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
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
import { SearchInput } from "@/components/SearchInput";
import { useState } from "react";

export default function HomeScreen() {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isError
  } = useInfiniteQuery([pokemonsKey], ({ pageParam = 0 }) => getAllPokemon({ limit: 20, offset: pageParam }), {
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flat().length * 20;
      return totalLoaded < lastPage.count ? totalLoaded : undefined;
    },
  })
  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];
  const [searchedPokemons, setSearchedPokemons] = useState<{ name: string, url: string }[] | undefined>(undefined)

  const extractId = (url: string) => {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1], 10) : 0;
  }

  const onSearch = (keyword: string) => {
    if (keyword === '') return setSearchedPokemons(undefined)
    setSearchedPokemons(pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(keyword.trim())))
  }

  const EmptyState = () => {
    if (isLoading) return null

    if ((searchedPokemons && searchedPokemons.length === 0) || pokemons.length === 0) {
      return <EmptyPokedex text="There is no pokemon found!" />
    }

    return null
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

      <View style={styles.searchContainer}>
        <SearchInput onSearch={onSearch} />
      </View>

      {isError ?
        <ErrorPokedex />
        :
        isLoading ?
          null
          :
          <FlashList
            contentContainerStyle={styles.flashList}
            horizontal={false}
            numColumns={2}
            data={searchedPokemons || pokemons}
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

      <EmptyState />

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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  flashList: {
    paddingHorizontal: 16,
    paddingBottom: 16
  }
})
