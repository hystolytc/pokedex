/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    text: {
      primary: '#1D1D1D',
      secondary: '#4B4B4B',
      tertiary: '#808080'
    },
    border: {
      primary: '#A8A8A8',
      secondary: '#BBBBBB',
      tertiary: '#F0F0F0'
    },
    like: '#ef4444',
    unlike: '#000'
  },
  dark: {
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    text: {
      primary: '#1D1D1D',
      secondary: '#4B4B4B',
      tertiary: '#808080'
    },
    border: {
      primary: '#A8A8A8',
      secondary: '#BBBBBB'
    },
    like: '#ef4444',
    unlike: '#000'
  },
};
