import { Pressable, StyleSheet, Text, View } from "react-native";
import Feather from '@expo/vector-icons/Feather'
import { Colors } from '@/constants/Colors';

interface Props {
  title?: string,
  onPress?: () => void
}

export const HeaderNavigation: React.FC<Props> = (props) => (
  <View style={styles.header}>
    <View style={styles.btnBack}>
      <Pressable onPress={props.onPress}>
        <Feather name="arrow-left" size={24} color={Colors.light.text.secondary} />
      </Pressable>
    </View>
    <Text style={styles.txtHeader}>{props.title}</Text>
  </View>
)

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
  btnBack: {
    position: 'absolute',
    left: 16
  }
})