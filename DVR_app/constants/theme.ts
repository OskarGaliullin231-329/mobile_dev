/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#1e40af'; // Темно-синий для корпоративного стиля
const tintColorDark = '#3b82f6'; // Светло-синий для темной темы

export const Colors = {
  light: {
    text: '#1f2937', // Темно-серый текст
    background: '#f8fafc', // Светло-серый фон
    tint: tintColorLight,
    icon: '#6b7280', // Серый для иконок
    tabIconDefault: '#9ca3af',
    tabIconSelected: tintColorLight,
    card: '#ffffff', // Белые карточки
    border: '#e5e7eb', // Светло-серые границы
  },
  dark: {
    text: '#f9fafb', // Светло-серый текст
    background: '#111827', // Темно-серый фон
    tint: tintColorDark,
    icon: '#d1d5db', // Светло-серые иконки
    tabIconDefault: '#6b7280',
    tabIconSelected: tintColorDark,
    card: '#1f2937', // Темно-серые карточки
    border: '#374151', // Темно-серые границы
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
