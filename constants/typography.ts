// Typography System - Hanken Grotesk

export const Typography = {
    // Welcome Screen
    welcomeTitle: {
        fontFamily: 'HankenGrotesk-Bold',
        fontSize: 32,
        lineHeight: 40,
    },
    welcomeSubtitle: {
        fontFamily: 'HankenGrotesk-Regular',
        fontSize: 17,
        lineHeight: 24,
    },

    // Paywall Screen
    paywallTitle: {
        fontFamily: 'HankenGrotesk-Bold',
        fontSize: 28,
        lineHeight: 34,
    },
    paywallSubtitle: {
        fontFamily: 'HankenGrotesk-Regular',
        fontSize: 15,
        lineHeight: 22,
    },

    // Timeline
    timelineTitle: {
        fontFamily: 'HankenGrotesk-SemiBold',
        fontSize: 16,
        lineHeight: 22,
    },
    timelineDescription: {
        fontFamily: 'HankenGrotesk-Regular',
        fontSize: 14,
        lineHeight: 20,
    },

    // Buttons
    buttonPrimary: {
        fontFamily: 'HankenGrotesk-SemiBold',
        fontSize: 17,
    },
    buttonSecondary: {
        fontFamily: 'HankenGrotesk-Medium',
        fontSize: 17,
    },

    // Links
    link: {
        fontFamily: 'HankenGrotesk-Medium',
        fontSize: 14,
    },

    // Toggle
    toggleActive: {
        fontFamily: 'HankenGrotesk-SemiBold',
        fontSize: 14,
    },
    toggleInactive: {
        fontFamily: 'HankenGrotesk-Medium',
        fontSize: 14,
    },

    // Checkbox label
    checkboxLabel: {
        fontFamily: 'HankenGrotesk-Regular',
        fontSize: 13,
        lineHeight: 18,
    },
} as const;

export type TypographyKey = keyof typeof Typography;
