import { Colors } from "@/constants/Colors"
import { Image } from "expo-image"
import { StyleSheet, View } from "react-native"

interface Props {
  index: number
  imgUrl: string
}

export const CardSprite: React.FC<Props> = (props) => (
  <View
    style={[styles.card, { marginLeft: props.index % 2 !== 0 ? 0 : 8, marginRight: props.index % 2 === 0 ? 0 : 8 }]}
  >
    <Image
      style={styles.img}
      source={props.imgUrl}
      contentFit="contain"
    />
  </View>
)

const styles = StyleSheet.create({
  card: {
    height: 115,
    flex: 1,
    padding: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.light.border.primary
  },
  img: {
    flex: 1,
    borderTopRightRadius: 5
  }
})
