import { commonStyles } from "@/styles/global";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign'
import { Colors } from '@/constants/Colors';
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { pokemonKey } from "@/constants/QueryKey";
import { getPokemon } from "@/services/pokemon";
import { CardSprite } from "@/components/CardSprite";
import { upperCaseFirstLetter } from "@/utils/textTransform";
import { useData } from "@/context/DataContext";
import { ErrorPokedex } from "@/components/ErrorPokemon";
import { Snackbar } from 'react-native-paper';
import { useState } from "react";

const BASE_IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_BASE_URL

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const { actions } = useData()
  const { data, isLoading, isError } = useQuery([pokemonKey, id], () => getPokemon(id as string))
  const [message, setMessage] = useState('')
  const spritesKeyList = Object.keys(data?.sprites || {}).filter(key => data?.sprites[key] !== null && key !== 'other' && key !== 'versions') || []

  const favoritePokemon = () => {
    actions.setPokemon({ id: parseInt(id as string), name: data!.name })
  }

  const removeFavoritePokemon = (id: number) => {
    actions.removePokemon(id)
  }

  const onFavorite = () => {
    let numberedId = parseInt(id as string)

    if (actions.isPokemonExist(numberedId)) {
      setMessage('You unfavorite this pokemon')
      return removeFavoritePokemon(numberedId)
    }

    setMessage('You favorite this pokemon')
    favoritePokemon()
  }

  const onDismissSnackbar = () => setMessage('')

  return (
    <SafeAreaView style={commonStyles.safearea}>
      <HeaderNavigation
        title="Pokemon Detail"
        onPress={router.back}
      />

      {isError ?
        <ErrorPokedex />
        :
        isLoading ? null :
          <ScrollView>
            <View style={styles.hero}>
              <Image
                style={styles.heroImage}
                source={`${BASE_IMAGE_URL}/${id}.png`}
                contentFit="contain"
              />
            </View>

            <View style={styles.detailSection}>
              <View style={styles.nameContainer}>
                <Text style={styles.txtName}>{upperCaseFirstLetter(data!.name)}</Text>
                <Pressable onPress={onFavorite}>
                  <AntDesign
                    name={actions.isPokemonExist(parseInt(id as string)) ? 'heart' : 'hearto'}
                    size={28}
                    color={actions.isPokemonExist(parseInt(id as string)) ? Colors.light.like : Colors.light.unlike} />
                </Pressable>
              </View>
              <Text style={styles.sectionTitle}>Sprites Gallery</Text>

              <View style={{ width: '100%' }}>
                <FlashList
                  contentContainerStyle={{ paddingBottom: 16 }}
                  horizontal={false}
                  numColumns={2}
                  data={spritesKeyList}
                  renderItem={({ item, index }) => (
                    <CardSprite
                      index={index + 1}
                      imgUrl={data?.sprites[item]}
                    />
                  )}
                  estimatedItemSize={115}
                  ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
              </View>

              <Text style={styles.sectionTitle}>Abiliteis</Text>
              {data?.abilities.map((ability) => (
                <Text
                  key={ability.ability.name}
                  style={styles.txtAbility}>
                  {upperCaseFirstLetter(ability.ability.name)}
                </Text>
              ))}
            </View>
          </ScrollView>
      }
      <Snackbar
        visible={message.length > 0}
        onDismiss={onDismissSnackbar}
        duration={3000}
      >
        {message}
      </Snackbar>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    height: 236,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border.tertiary
  },
  heroImage: {
    flex: 1
  },
  nameContainer: {
    paddingVertical: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    gap: 16
  },
  txtName: {
    fontWeight: "700",
    fontSize: 36,
    color: Colors.light.text.primary
  },
  detailSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 16,
    color: Colors.light.text.primary
  },
  txtAbility: {
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 16,
    color: Colors.light.text.secondary
  }
})
