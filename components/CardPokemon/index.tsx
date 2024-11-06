import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  id: number
  index: number
  imgUrl: string
  name: string
  onPress?: () => void
}

export const CardPokemon: React.FC<Props> = (props) => (
  <Pressable
    style={[styles.card, { marginLeft: props.index % 2 !== 0 ? 0 : 8, marginRight: props.index % 2 === 0 ? 0 : 8 }]}
    onPress={props.onPress}
  >
    <Image
      style={styles.img}
      source={props.imgUrl}
      contentFit="contain"
      transition={300}
    />
    <Text style={styles.name}>{props.name}</Text>
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