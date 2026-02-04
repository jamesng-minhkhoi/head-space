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

            {/* White Content Card - Slides up from bottom with curved top, slight right skew */}
            <Animated.View
                entering={SlideInDown
                    .delay(ANIMATION_DELAYS.whiteCard)
                    .duration(700)
                    .easing(Easing.out(Easing.cubic))
                }
                style={[
                    styles.contentSection,
                    { paddingBottom: insets.bottom + Spacing.welcomeButtonBottomMargin }
                ]}
            >
                {/* Title - fades in after card settles */}
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

                {/* Buttons - slide up with stagger */}
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
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.yellowBackground,
    },
    heroSection: {
        height: '50%', // Reduced to give more space to white card
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentSection: {
        flex: 1,
        backgroundColor: Colors.white,
        // Very curved top corners with asymmetric feel (right slightly more)
        borderTopLeftRadius: 48,
        borderTopRightRadius: 56,  // Slightly more curved on right for skew effect
        borderCurve: 'continuous',
        paddingHorizontal: Spacing.screenHorizontal,
        paddingTop: Spacing.welcomeContentPaddingTop + 8,
        // Subtle shadow for depth
        boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.08)',
        // Slight rotation for organic/skew feel
        transform: [{ rotate: '-0.5deg' }],
        // Compensate for rotation with extra width
        marginHorizontal: -4,
        paddingHorizontal: Spacing.screenHorizontal + 4,
    },
    title: {
        ...Typography.welcomeTitle,
        color: Colors.textPrimary,
        textAlign: 'center',
        // Counter-rotate to keep text straight
        transform: [{ rotate: '0.5deg' }],
    },
    subtitle: {
        ...Typography.welcomeSubtitle,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: Spacing.welcomeTitleToSubtitle,
        transform: [{ rotate: '0.5deg' }],
    },
    checkboxContainer: {
        marginTop: Spacing.welcomeSubtitleToCheckbox,
        paddingHorizontal: 8,
        transform: [{ rotate: '0.5deg' }],
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
        transform: [{ rotate: '0.5deg' }],
    },
});
