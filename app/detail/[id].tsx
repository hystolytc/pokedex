import { commonStyles } from "@/styles/global";
import { Pressable, StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather'
import { Colors } from '@/constants/Colors';
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={commonStyles.safearea}>
      <HeaderNavigation
        title="Pokemon Detail"
        onPress={router.back}
      />

      <ScrollView>
        <View style={styles.hero}>
          <Image
            style={styles.heroImage}
            source={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${1}.png`}
            contentFit="contain"
            placeholder={{ blurhash }}
            transition={1000}
          />
        </View>

        <View style={styles.detailSection}>
          <View style={styles.nameContainer}>
            <Text style={styles.txtName}>Ditto {id}</Text>
            <Pressable>
              <Feather name="heart" size={20} />
            </Pressable>
          </View>
          <Text style={styles.sectionTitle}>Sprites Gallery</Text>

          <View style={{ width: '100%' }}>
            <FlashList
              contentContainerStyle={{ paddingBottom: 16 }}
              horizontal={false}
              numColumns={2}
              data={DATA}
              renderItem={({ item, index }) => (
                <SpriteCard
                  index={index + 1}
                  imgUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                />
              )}
              estimatedItemSize={115}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
          </View>

          <Text style={styles.sectionTitle}>Abiliteis</Text>
          {ABILITIES.map((v: any, i: number) => <Text key={i} style={styles.txtAbility}>Abilities ${i}</Text>)}
        </View>
      </ScrollView>
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
    alignItems: 'center',
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

interface Props {
  index: number
  imgUrl: string
}

export const SpriteCard: React.FC<Props> = (props) => (
  <View
    style={{ height: 115, flex: 1, padding: 16, borderRadius: 5, borderWidth: 1, borderColor: Colors.light.border.primary, marginLeft: props.index % 2 !== 0 ? 0 : 8, marginRight: props.index % 2 === 0 ? 0 : 8 }}
  >
    <Image
      style={{ flex: 1, borderTopRightRadius: 5 }}
      source={props.imgUrl}
      contentFit="contain"
      placeholder={{ blurhash }}
      transition={1000}
    />
  </View>
)

const DATA = Array(10).fill(0).map((v: any, i: number) => ({
  id: i + 1,
  name: `Name ${i}`,
  url: 'https://pokeapi.co/api/v2/pokemon/1/'
}))

const ABILITIES = Array(5).fill(0).map(v => ({}))