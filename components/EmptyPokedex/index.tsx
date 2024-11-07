import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Dimensions } from "react-native";
const pokeballGray = require('../../assets/images/pokeball-gray.png')

interface Props {
  text?: string
}

const { height } = Dimensions.get('window')

export const EmptyPokedex: React.FC<Props> = (props) => (
  <View style={[styles.container, { height: height - 50 }]}>
    <Image
      style={styles.img}
      source={pokeballGray}
      contentFit="contain"
    />
    {props.text &&
      <Text style={styles.txt}>{props.text}</Text>
    }
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24
  },
  img: {
    height: 150,
    width: 150
  },
  txt: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.text.tertiary
  }
})