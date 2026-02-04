// Welcome Screen - Main onboarding entry point
import { View, Text, StyleSheet, Linking, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, {
    FadeIn,
    FadeInUp,
    SlideInDown,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Character } from '@/components/welcome/character';
import { FloatingIcons } from '@/components/welcome/floating-icons';
import { PhoneFrame } from '@/components/welcome/phone-frame';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Animation timing - Orange bg + illustration visible first, then white card slides up
const ANIMATION_DELAYS = {
    // Phase 1: Orange bg + illustration (already visible)
    heroVisible: 0,
    floatingIcons: 200,
    character: 300,

    // Phase 2: White card slides up from bottom
    whiteCard: 600,

    // Phase 3: Content fades in after card settles
    title: 1000,
    subtitle: 1100,
    checkbox: 1200,
    primaryButton: 1300,
    secondaryButton: 1400,
};

export default function WelcomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleCreateAccount = () => {
        router.push('/paywall');
    };

    const handleLogin = () => {
        // TODO: Navigate to login screen
        console.log('Login pressed');
    };

    const handleTermsPress = () => {
        Linking.openURL('https://example.com/terms');
    };

    const handlePrivacyPress = () => {
        Linking.openURL('https://example.com/privacy');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Yellow/Orange Hero Section - Visible immediately */}
            <View style={styles.heroSection}>
                {/* Floating icons animate in */}
                <FloatingIcons />

                {/* Phone frame with character */}
                <PhoneFrame>
                    <Animated.View
                        entering={FadeIn.delay(ANIMATION_DELAYS.character).duration(500)}
                    >
                        <Character size={120} />
                    </Animated.View>
                </PhoneFrame>
            </View>

            {/* Curved White Card - Position absolute, visual layer only */}
            <Animated.View
                entering={SlideInDown
                    .delay(ANIMATION_DELAYS.whiteCard)
                    .duration(700)
                    .easing(Easing.out(Easing.cubic))
                }
                style={styles.curvedCard}
                pointerEvents="none"
            />

            {/* Content Layer - Separate from card, properly centered */}
            <View style={[
                styles.contentLayer,
                {
                    paddingBottom: insets.bottom + Spacing.welcomeButtonBottomMargin,
                    paddingLeft: insets.left + Spacing.screenHorizontal,
                    paddingRight: insets.right + Spacing.screenHorizontal,
                }
            ]}>
                {/* Top Content - Title & Subtitle, positioned relative to curve */}
                <View style={styles.topContent}>
                    {/* Title */}
                    <Animated.Text
                        entering={FadeIn.delay(ANIMATION_DELAYS.title).duration(400).easing(Easing.out(Easing.ease))}
                        style={styles.title}
                    >
                        Welcome to Headspace
                    </Animated.Text>

                    {/* Subtitle */}
                    <Animated.Text
                        entering={FadeIn.delay(ANIMATION_DELAYS.subtitle).duration(400).easing(Easing.out(Easing.ease))}
                        style={styles.subtitle}
                    >
                        Support for all of life's moments
                    </Animated.Text>
                </View>

                {/* Bottom Content - Checkbox & Buttons, positioned at bottom */}
                <View style={styles.bottomContent}>
                    {/* Checkbox with Terms */}
                    <Animated.View
                        entering={FadeInUp.delay(ANIMATION_DELAYS.checkbox).duration(400).easing(Easing.out(Easing.ease))}
                        style={styles.checkboxContainer}
                    >
                        <Checkbox
                            checked={termsAccepted}
                            onToggle={setTermsAccepted}
                            label={
                                <Text style={styles.checkboxLabel}>
                                    By checking this box, I agree to the{' '}
                                    <Text style={styles.link} onPress={handleTermsPress}>
                                        Terms & Conditions
                                    </Text>
                                    {' '}and{' '}
                                    <Text style={styles.link} onPress={handlePrivacyPress}>
                                        Privacy Policy
                                    </Text>
                                </Text>
                            }
                        />
                    </Animated.View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <Animated.View
                            entering={FadeInUp.delay(ANIMATION_DELAYS.primaryButton).duration(400).easing(Easing.out(Easing.ease))}
                        >
                            <Button
                                variant="primary"
                                onPress={handleCreateAccount}
                                disabled={!termsAccepted}
                            >
                                Create an account
                            </Button>
                        </Animated.View>

                        <Animated.View
                            entering={FadeInUp.delay(ANIMATION_DELAYS.secondaryButton).duration(400).easing(Easing.out(Easing.ease))}
                        >
                            <Button variant="secondary" onPress={handleLogin}>
                                Log in
                            </Button>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.yellowBackground,
    },
    heroSection: {
        height: '45%', // Adjusted for better balance
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    curvedCard: {
        // This is a HUGE circle positioned absolute - visual layer only
        position: 'absolute',
        bottom: -320, // Push down so only top arc is visible (higher = more arc visible)
        left: '50%',
        width: 900, // Very wide
        height: 900, // Same as width = perfect circle
        marginLeft: -450, // Center it (half of width)
        backgroundColor: Colors.white,
        borderRadius: 450, // Half of width = perfect circle
        transform: [{ translateX: 15 }], // Slight offset for skew effect
        zIndex: 2,
    },
    contentLayer: {
        // Content layer - positioned relative to where curve appears
        position: 'absolute',
        top: '45%', // Align with where the curved card arc starts
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        paddingTop: 40, // Space from top of content area (below the curve arc)
        justifyContent: 'space-between', // Push top and bottom content apart
    },
    topContent: {
        // Title and subtitle - stays at top of content area
    },
    bottomContent: {
        // Checkbox and buttons - pushed to bottom
    },
    title: {
        ...Typography.welcomeTitle,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    subtitle: {
        ...Typography.welcomeSubtitle,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: Spacing.welcomeTitleToSubtitle,
    },
    checkboxContainer: {
        paddingHorizontal: 8,
    },
    checkboxLabel: {
        ...Typography.checkboxLabel,
        color: Colors.textSecondary,
    },
    link: {
        ...Typography.link,
        color: Colors.blueLink,
    },
    buttonContainer: {
        marginTop: Spacing.welcomeCheckboxToButtons,
        gap: Spacing.welcomeButtonGap,
    },
});
