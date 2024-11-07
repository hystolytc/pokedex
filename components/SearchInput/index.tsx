import { Colors } from "@/constants/Colors"
import { useEffect, useState } from "react"
import { StyleSheet, TextInput } from "react-native"

interface Props {
  onSearch: (keyword: string) => void
}

export const SearchInput: React.FC<Props> = (props) => {
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const debounce = setTimeout(() => {
      props.onSearch(keyword.toLowerCase())
    }, 300)

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword])

  const onChangeKeyword = (text: string) => {
    setKeyword(text)
  }

  return (
    <TextInput
      style={styles.input}
      value={keyword}
      onChangeText={onChangeKeyword}
      placeholder="Search by name..."
      placeholderTextColor={Colors.light.text.tertiary}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.light.border.secondary,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8
  }
})