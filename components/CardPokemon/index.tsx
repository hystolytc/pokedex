import { Colors } from "@/constants/Colors";
import { upperCaseFirstLetter } from "@/utils/textTransform";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  id: number
  index: number
  name: string
  onPress?: () => void
}

const BASE_IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_BASE_URL

export const CardPokemon: React.FC<Props> = (props) => (
  <Pressable
    style={[styles.card, { marginLeft: props.index % 2 !== 0 ? 0 : 8, marginRight: props.index % 2 === 0 ? 0 : 8 }]}
    onPress={props.onPress}
  >
    <Image
      style={styles.img}
      source={`${BASE_IMAGE_URL}/${props.id}.png`}
      contentFit="contain"
    />
    <Text style={styles.name}>{upperCaseFirstLetter(props.name)}</Text>
  </Pressable>
)


const styles = StyleSheet.create({
  card: {
    height: 220,
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border.primary
  },
  img: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  name: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16
  }
})