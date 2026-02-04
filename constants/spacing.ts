// Spacing System

export const Spacing = {
    // Screen padding
    screenHorizontal: 24,
    screenVertical: 16,

    // Welcome Screen
    welcomeHeroHeight: '55%',
    welcomeContentPaddingTop: 40,
    welcomeTitleToSubtitle: 8,
    welcomeSubtitleToCheckbox: 48,
    welcomeCheckboxToButtons: 24,
    welcomeButtonGap: 12,
    welcomeButtonBottomMargin: 48,

    // Paywall Screen
    paywallHeaderHeight: 220,
    paywallContentPaddingTop: 24,
    paywallTitleToSubtitle: 8,
    paywallSubtitleToToggle: 20,
    paywallToggleToTimeline: 28,
    paywallTimelineItemGap: 20,
    paywallRestoreLinkMarginTop: 24,
    paywallButtonBottomMargin: 40,

    // Button
    buttonHeight: 56,
    buttonBorderRadius: 28,
    buttonPaddingHorizontal: 24,

    // Toggle
    toggleHeight: 40,
    toggleBorderRadius: 20,
    togglePadding: 4,
    toggleItemPaddingHorizontal: 24,

    // Checkbox
    checkboxSize: 22,
    checkboxBorderRadius: 6,
    checkboxToLabel: 12,

    // Timeline
    timelineIconSize: 36,
    timelineLineWidth: 3,
    timelineIconToContent: 16,

    // Character
    characterSize: 100,

    // Phone Frame
    phoneFrameWidth: 240,
    phoneFrameHeight: 420,
    phoneFrameBorderRadius: 32,
} as const;

export type SpacingKey = keyof typeof Spacing;
