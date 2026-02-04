// Welcome Screen - Main onboarding entry point
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, { FadeIn, FadeInUp, Easing } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { Checkbox, LinkText } from '@/components/ui/checkbox';
import { Character } from '@/components/welcome/character';
import { FloatingIcons } from '@/components/welcome/floating-icons';
import { PhoneFrame } from '@/components/welcome/phone-frame';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { WelcomeIntroDelays, Duration, CalmEasing } from '@/constants/animations';

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
            {/* Yellow Hero Section */}
            <View style={styles.heroSection}>
                {/* Floating icons in background */}
                <FloatingIcons />

                {/* Phone frame with character */}
                <PhoneFrame>
                    <Animated.View
                        entering={FadeIn.delay(WelcomeIntroDelays.character).duration(500)}
                    >
                        <Character size={120} />
                    </Animated.View>
                </PhoneFrame>
            </View>

            {/* White Content Section */}
            <Animated.View
                entering={FadeInUp.delay(WelcomeIntroDelays.contentArea).duration(500).easing(Easing.out(Easing.ease))}
                style={[styles.contentSection, { paddingBottom: insets.bottom + Spacing.welcomeButtonBottomMargin }]}
            >
                {/* Title */}
                <Animated.Text
                    entering={FadeIn.delay(WelcomeIntroDelays.title).duration(400)}
                    style={styles.title}
                >
                    Welcome to Headspace
                </Animated.Text>

                {/* Subtitle */}
                <Animated.Text
                    entering={FadeIn.delay(WelcomeIntroDelays.subtitle).duration(400)}
                    style={styles.subtitle}
                >
                    Support for all of life's moments
                </Animated.Text>

                {/* Checkbox with Terms */}
                <Animated.View
                    entering={FadeIn.delay(WelcomeIntroDelays.checkbox).duration(300)}
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
                        entering={FadeInUp.delay(WelcomeIntroDelays.primaryButton).duration(400)}
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
                        entering={FadeInUp.delay(WelcomeIntroDelays.secondaryButton).duration(400)}
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
        height: Spacing.welcomeHeroHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentSection: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderCurve: 'continuous',
        paddingHorizontal: Spacing.screenHorizontal,
        paddingTop: Spacing.welcomeContentPaddingTop,
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
        marginTop: Spacing.welcomeSubtitleToCheckbox,
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
