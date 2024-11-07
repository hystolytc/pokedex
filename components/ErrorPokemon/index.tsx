import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Dimensions } from "react-native";
const pokeballBrokenGray = require('../../assets/images/pokeball-broken-gray.png')

const { height } = Dimensions.get('window')

export const ErrorPokedex: React.FC = () => (
  <View style={[styles.container, { height: height - 50 }]}>
    <Image
      style={styles.img}
      source={pokeballBrokenGray}
      contentFit="contain"
    />
    <Text style={styles.txt}>
      Oops, Something when wrong.
    </Text>
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