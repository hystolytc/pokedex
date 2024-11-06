import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list"
import { Colors } from '@/constants/Colors';
import Feather from '@expo/vector-icons/Feather'
import { commonStyles } from "@/styles/global";
import { CardPokemon } from "@/components/CardPokemon";
import { router } from "expo-router";

export default function HomeScreen() {
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

      <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
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

      <FlashList
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        horizontal={false}
        numColumns={2}
        data={DATA}
        renderItem={({ item, index }) => (
          <CardPokemon
            index={index + 1}
            id={item.id}
            imgUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            name={item.name}
            onPress={() => router.push({ pathname: '/detail/[id]', params: { id: item.id } })}
          />
        )}
        estimatedItemSize={220}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
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
  }
})


const DATA = Array(101).fill(0).map((v: any, i: number) => ({
  id: i + 1,
  name: `Name ${i}`,
  url: 'https://pokeapi.co/api/v2/pokemon/1/'
}))