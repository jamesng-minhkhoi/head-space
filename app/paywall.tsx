// Paywall Screen - Trial/Subscription flow
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, {
    FadeIn,
    FadeInUp,
    FadeOut,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSequence,
    interpolateColor
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { SunsetHeader } from '@/components/paywall/sunset-header';
import { Timeline } from '@/components/paywall/timeline';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { PaywallIntroDelays, Duration, CalmEasing } from '@/constants/animations';

// Pricing configuration
type BillingCycle = 'annual' | 'monthly';

const billingOptions = [
    { label: 'Annual', value: 'annual' },
    { label: 'Monthly', value: 'monthly' },
] as const;

const pricing = {
    annual: { total: '$69.99', perMonth: '$5.83/month', period: 'year' },
    monthly: { total: '$12.99', perMonth: '$12.99/month', period: 'month' },
};

export default function PaywallScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
    const colorAnim = useSharedValue(0);

    useEffect(() => {
        if (billingCycle === 'annual') {
            // Flash green to highlight savings when switching to annual
            // 0 -> 1 (green) -> wait -> 0 (normal)
            colorAnim.value = 0; // Reset first
            colorAnim.value = withSequence(
                withTiming(1, { duration: 300 }),
                withDelay(500, withTiming(0, { duration: 300 }))
            );
        } else {
            // Reset to normal deeply immediately if switching to monthly
            colorAnim.value = withTiming(0, { duration: 200 });
        }
    }, [billingCycle]);

    const animatedPriceStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(
                colorAnim.value,
                [0, 1],
                [Colors.textSecondary, '#4CAF50'] // Normal -> Green
            ),
        };
    });

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

            {/* Curved white card - visual layer */}
            <View style={styles.curvedCard} />

            {/* Main Content - positioned on top of curved card */}
            <View style={styles.contentContainer}>
                {/* Title */}
                <Animated.Text
                    entering={FadeIn.delay(PaywallIntroDelays.title).duration(400)}
                    style={styles.title}
                >
                    How your trial works
                </Animated.Text>

                {/* Pricing text with animation on toggle change */}
                <Animated.View
                    entering={FadeIn.duration(Duration.stateChange).easing(CalmEasing.enter)}
                    style={styles.pricingContainer}
                >
                    <Text style={styles.pricingText}>
                        First 14 days free, then{' '}
                        <Animated.Text
                            key={billingCycle}
                            style={animatedPriceStyle}
                            entering={FadeIn.duration(400)}
                        >
                            {currentPricing.total}{' '}
                            <Animated.Text style={[styles.pricingPeriod, animatedPriceStyle]}>
                                ({currentPricing.perMonth})
                            </Animated.Text>
                        </Animated.Text>
                    </Text>
                </Animated.View>

                {/* Billing Toggle */}
                <Animated.View
                    entering={FadeIn.delay(PaywallIntroDelays.toggle).duration(300)}
                    style={styles.toggleContainer}
                >
                    <Toggle
                        options={billingOptions}
                        value={billingCycle}
                        onChange={setBillingCycle}
                    />
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
            </View>

            {/* Bottom CTA - Fixed at bottom */}
            <View style={[
                styles.bottomContainer,
                { paddingBottom: insets.bottom + 16 }
            ]}>
                <Animated.View
                    entering={FadeInUp.delay(PaywallIntroDelays.ctaButton).duration(400)}
                >
                    <Button variant="primary" onPress={handleStartTrial}>
                        Start my free trial
                    </Button>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    curvedCard: {
        position: 'absolute',
        top: 120, // Position below the sun character
        left: '50%',
        width: 900,
        height: 900,
        marginLeft: -450,
        backgroundColor: Colors.white,
        borderRadius: 450,
        transform: [{ translateX: 10 }],
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: Spacing.screenHorizontal,
        paddingTop: 40, // Space below the curved header
        zIndex: 10, // Above the curved card
    },
    title: {
        ...Typography.paywallTitle,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    pricingContainer: {
        marginTop: 12,
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
        marginTop: 24,
        alignItems: 'center',
    },
    timelineContainer: {
        marginTop: 32,
    },
    restoreLinkContainer: {
        marginTop: 24,
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
    bottomContainer: {
        paddingHorizontal: Spacing.screenHorizontal,
        paddingTop: 16,
        backgroundColor: Colors.white,
        zIndex: 10, // Above the curved card
    },
});
