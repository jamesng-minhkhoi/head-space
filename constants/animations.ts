// Animation Constants - Calmness Philosophy
import { Easing } from 'react-native-reanimated';

// Spring presets for calm, gentle animations
export const CALM_SPRING = {
    damping: 20,
    stiffness: 150,
    mass: 1,
};

export const GENTLE_SPRING = {
    damping: 25,
    stiffness: 100,
    mass: 1,
};

export const BUTTON_SPRING = {
    damping: 18,
    stiffness: 200,
    mass: 0.8,
};

// Duration presets (ms)
export const Duration = {
    buttonPress: 150,
    stateChange: 400,
    screenTransition: 500,
    microInteraction: 250,
    ambientBreathing: 4000,
    floatingIcon: 5000,
    exitMultiplier: 0.5, // Exit at 50% of enter duration
} as const;

// Easing presets
export const CalmEasing = {
    enter: Easing.out(Easing.ease),
    exit: Easing.in(Easing.ease),
    inOut: Easing.inOut(Easing.ease),
} as const;

// Stagger delays for list animations
export const StaggerDelay = {
    listItem: 80,
    floatingIcon: 100,
    timelineItem: 100,
} as const;

// Screen intro sequences (delays in ms)
export const WelcomeIntroDelays = {
    phoneFrame: 0,
    character: 200,
    floatingIcons: 300,
    contentArea: 400,
    title: 600,
    subtitle: 700,
    checkbox: 800,
    primaryButton: 900,
    secondaryButton: 1000,
} as const;

export const PaywallIntroDelays = {
    sunCharacter: 0,
    closeButton: 200,
    title: 300,
    pricingText: 400,
    toggle: 500,
    timelineStart: 600,
    restoreLink: 900,
    ctaButton: 1000,
} as const;
