export const upperCaseFirstLetter = (v: string) => {
  return v.split(' ').map((word: string) => word[0].toUpperCase() + word.substring(1)).join(' ')
}