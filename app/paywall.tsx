// Paywall Screen - Trial/Subscription flow
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, { FadeIn, FadeInUp, FadeOut, Easing } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { Toggle, type BillingCycle } from '@/components/ui/toggle';
import { SunsetHeader } from '@/components/paywall/sunset-header';
import { Timeline } from '@/components/paywall/timeline';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { PaywallIntroDelays, Duration, CalmEasing } from '@/constants/animations';

// Pricing configuration
const pricing = {
    annual: { total: '$69.99', perMonth: '$5.83/month', period: 'year' },
    monthly: { total: '$12.99', perMonth: '$12.99/month', period: 'month' },
};

export default function PaywallScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');

    const handleClose = () => {
        router.back();
    };

    const handleStartTrial = () => {
        // TODO: Initiate purchase flow
        console.log('Starting trial with', billingCycle, 'billing');
    };

    const handleRestorePurchase = () => {
        // TODO: Restore purchases
        console.log('Restore purchase');
    };

    const currentPricing = pricing[billingCycle];

    return (
        <View style={styles.container}>
            {/* Sunset Header with close button */}
            <SunsetHeader onClose={handleClose} />

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + Spacing.paywallButtonBottomMargin },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <Animated.Text
                    entering={FadeIn.delay(PaywallIntroDelays.title).duration(400)}
                    style={styles.title}
                >
                    How your trial works
                </Animated.Text>

                {/* Pricing text with animation on toggle change */}
                <Animated.View
                    key={billingCycle}
                    entering={FadeIn.duration(Duration.stateChange).easing(CalmEasing.enter)}
                    exiting={FadeOut.duration(200)}
                    style={styles.pricingContainer}
                >
                    <Animated.Text
                        entering={FadeIn.delay(PaywallIntroDelays.pricingText).duration(400)}
                        style={styles.pricingText}
                    >
                        First 14 days free, then {currentPricing.total}{' '}
                        <Text style={styles.pricingPeriod}>
                            ({currentPricing.perMonth})
                        </Text>
                    </Animated.Text>
                </Animated.View>

                {/* Billing Toggle */}
                <Animated.View
                    entering={FadeIn.delay(PaywallIntroDelays.toggle).duration(300)}
                    style={styles.toggleContainer}
                >
                    <Toggle value={billingCycle} onChange={setBillingCycle} />
                </Animated.View>

                {/* Timeline */}
                <View style={styles.timelineContainer}>
                    <Timeline />
                </View>

                {/* Restore Purchase Link */}
                <Animated.View
                    entering={FadeIn.delay(PaywallIntroDelays.restoreLink).duration(300)}
                    style={styles.restoreLinkContainer}
                >
                    <Pressable onPress={handleRestorePurchase}>
                        {({ pressed }) => (
                            <Text
                                style={[
                                    styles.restoreLink,
                                    pressed && styles.restoreLinkPressed,
                                ]}
                            >
                                Restore Purchase
                            </Text>
                        )}
                    </Pressable>
                </Animated.View>

                {/* CTA Button */}
                <Animated.View
                    entering={FadeInUp.delay(PaywallIntroDelays.ctaButton).duration(400)}
                    style={styles.ctaContainer}
                >
                    <Button variant="primary" onPress={handleStartTrial}>
                        Start my free trial
                    </Button>
                </Animated.View>

                {/* Terms footer */}
                <Text style={styles.termsText}>
                    By tapping "Start my free trial", you agree to our{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text>
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Spacing.screenHorizontal,
        paddingTop: Spacing.paywallContentPaddingTop,
    },
    title: {
        ...Typography.paywallTitle,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    pricingContainer: {
        marginTop: Spacing.paywallTitleToSubtitle,
    },
    pricingText: {
        ...Typography.paywallSubtitle,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    pricingPeriod: {
        color: Colors.textSecondary,
    },
    toggleContainer: {
        marginTop: Spacing.paywallSubtitleToToggle,
    },
    timelineContainer: {
        marginTop: Spacing.paywallToggleToTimeline,
    },
    restoreLinkContainer: {
        marginTop: Spacing.paywallRestoreLinkMarginTop,
        alignItems: 'center',
    },
    restoreLink: {
        ...Typography.link,
        color: Colors.blueLink,
    },
    restoreLinkPressed: {
        color: Colors.bluePressed,
        textDecorationLine: 'underline',
    },
    ctaContainer: {
        marginTop: 24,
    },
    termsText: {
        ...Typography.checkboxLabel,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 16,
    },
    termsLink: {
        color: Colors.blueLink,
    },
});
