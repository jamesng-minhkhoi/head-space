// Design System Colors - Extracted from Headspace screenshots

export const Colors = {
    // Welcome Screen Background
    yellowBackground: '#FFCE00', // Yellow 500

    // Paywall Screen - Sunset Gradient
    sunsetTop: '#FFCE00',    // Yellow 500
    sunsetYellow: '#FFCE00', // Yellow 500
    sunsetOrange: '#FF7E1D', // Orange 500
    sunsetDeep: '#E1894B',   // Orange 700

    // UI Colors
    bluePrimary: '#0C6FF9',  // Blue 500
    bluePressed: '#0850FD',  // Blue Dark 500
    blueLink: '#0C6FF9',     // Blue 500

    // Backgrounds
    white: '#FFFFFF',
    cream: '#FEFEFE',
    grayLight: '#F3F4F6',
    grayPressed: '#E5E7EB',

    // Text
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',

    // Character
    orangeCharacter: '#FF7E1D', // Orange 500
    orangeCharacterDark: '#E1894B', // Orange 700

    // Timeline Icons
    timelineBlue: '#0C6FF9',   // Blue 500
    timelineOrange: '#FF7E1D', // Orange 500
    timelineYellow: '#FFCE00', // Yellow 500
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
