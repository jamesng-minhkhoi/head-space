// Design System Colors - Extracted from Headspace screenshots

export const Colors = {
    // Welcome Screen Background
    yellowBackground: '#FFAA00',

    // Paywall Screen - Sunset Gradient
    sunsetTop: '#B8D4A8',
    sunsetYellow: '#FFD966',
    sunsetOrange: '#FFB347',
    sunsetDeep: '#FF8C42',

    // UI Colors
    bluePrimary: '#2563EB',
    bluePressed: '#1D4ED8',
    blueLink: '#3B82F6',

    // Backgrounds
    white: '#FFFFFF',
    cream: '#FEFEFE',
    grayLight: '#F3F4F6',
    grayPressed: '#E5E7EB',

    // Text
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',

    // Character
    orangeCharacter: '#FF8C42',
    orangeCharacterDark: '#FF6B35',

    // Timeline Icons
    timelineBlue: '#3B82F6',
    timelineOrange: '#F97316',
    timelineYellow: '#FBBF24',
    timelineLine: '#D1FAE5',

    // Toggle
    toggleBackground: '#E5E7EB',
    toggleActive: '#1F2937',

    // Close button
    closeBackground: 'rgba(0,0,0,0.15)',
    closeBackgroundPressed: 'rgba(0,0,0,0.3)',

    // Checkbox
    checkboxBorder: '#2563EB',
    checkboxChecked: '#2563EB',
    checkboxUncheckedPressed: '#EFF6FF',

    // Disabled states
    disabled: 0.5, // opacity
} as const;

export type ColorKey = keyof typeof Colors;
