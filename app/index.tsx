// Welcome Screen - Main onboarding entry point
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import Animated, {
    FadeIn,
    FadeInUp,
    SlideInDown,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Character } from '@/components/welcome/character';
import { PhoneFrame } from '@/components/welcome/phone-frame';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { StaggerDelay } from '@/constants/animations';

import CloudRain from '@/assets/images/cloud-rain.svg';
import Moon from '@/assets/images/moon.svg';
import Flower from '@/assets/images/flower.svg';
import Rainbow from '@/assets/images/rainbow.svg';
import Note from '@/assets/images/note.svg';
import FastForward from '@/assets/images/fast-forward.svg';
import PlaySparkle from '@/assets/images/play-sparkle.svg';
import Sparkle from '@/assets/images/sparkle.svg';

const AnimatedCloudRain = Animated.createAnimatedComponent(CloudRain);
const AnimatedMoon = Animated.createAnimatedComponent(Moon);
const AnimatedFlower = Animated.createAnimatedComponent(Flower);
const AnimatedRainbow = Animated.createAnimatedComponent(Rainbow);
const AnimatedNote = Animated.createAnimatedComponent(Note);
const AnimatedFastForward = Animated.createAnimatedComponent(FastForward);
const AnimatedPlaySparkle = Animated.createAnimatedComponent(PlaySparkle);
const AnimatedSparkle = Animated.createAnimatedComponent(Sparkle);

const HERO_WIDTH = Spacing.phoneFrameWidth + 170;
const HERO_HEIGHT = Spacing.phoneFrameHeight + 160;
const FRAME_OFFSET_Y = -36;
const FRAME_LEFT = (HERO_WIDTH - Spacing.phoneFrameWidth) / 2;
const FRAME_TOP = (HERO_HEIGHT - Spacing.phoneFrameHeight) / 2 + FRAME_OFFSET_Y;
const FRAME_RIGHT = FRAME_LEFT + Spacing.phoneFrameWidth;
const ICON_GAP = 6;
const ICON_SIZES = {
    sparkle: 24,
    flower: 46,
    cloud: 72,
    moon: 52,
    fastForward: 40,
    playSparkle: 54,
    rainbow: 86,
    sparkleSmall: 22,
    note: 46,
} as const;

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

type FloatingSvgConfig = {
    floatDuration: number;
    rotateDuration?: number;
    scale?: number;
    floatDistance?: number;
};

const useFloatingSvgStyle = ({
    floatDuration,
    rotateDuration = 0,
    scale = 1,
    floatDistance = 10,
}: FloatingSvgConfig) => {
    const translateY = useSharedValue(0);
    const rotate = useSharedValue(0);

    useEffect(() => {
        translateY.value = withRepeat(
            withTiming(-floatDistance, {
                duration: floatDuration / 2,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );

        if (rotateDuration > 0) {
            rotate.value = withRepeat(
                withTiming(1, {
                    duration: rotateDuration / 2,
                    easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true
            );
        } else {
            rotate.value = 0;
        }
    }, [floatDistance, floatDuration, rotateDuration, rotate, translateY]);

    return useAnimatedStyle(
        () => ({
            transform: [
                { translateY: translateY.value },
                { rotate: rotateDuration > 0 ? `${rotate.value * 8}deg` : '0deg' },
                { scale },
            ],
        }),
        [rotateDuration, scale]
    );
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

    const sparkleTopLeftStyle = useFloatingSvgStyle({ floatDuration: 4200, scale: 1 });
    const flowerStyle = useFloatingSvgStyle({ floatDuration: 4600, rotateDuration: 5200, scale: 1 });
    const cloudStyle = useFloatingSvgStyle({ floatDuration: 5200, scale: 1 });
    const moonStyle = useFloatingSvgStyle({ floatDuration: 5600, scale: 1 });
    const fastForwardStyle = useFloatingSvgStyle({ floatDuration: 4200, rotateDuration: 5200, scale: 1 });
    const playSparkleStyle = useFloatingSvgStyle({ floatDuration: 5600, scale: 1 });
    const rainbowStyle = useFloatingSvgStyle({ floatDuration: 4800, scale: 1 });
    const sparkleMidRightStyle = useFloatingSvgStyle({ floatDuration: 4200, scale: 1 });
    const noteStyle = useFloatingSvgStyle({ floatDuration: 6000, rotateDuration: 5200, scale: 1 });

    const iconEnter = (index: number) =>
        FadeIn.delay(ANIMATION_DELAYS.floatingIcons + index * StaggerDelay.floatingIcon).duration(400);

    const characterSlideX = useSharedValue(-60);
    useEffect(() => {
        characterSlideX.value = withDelay(
            ANIMATION_DELAYS.character,
            withTiming(0, { duration: 550, easing: Easing.out(Easing.cubic) })
        );
    }, [characterSlideX]);

    const characterSlideStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: characterSlideX.value }, { rotate: '30deg' }],
    }));

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Yellow/Orange Hero Section - Visible immediately */}
            <View style={styles.heroSection}>
                <View style={styles.heroIllustration}>
                    {/* Floating icons - Positioned relative to phone frame */}
                    <View style={styles.iconsLayer} pointerEvents="none">
                        {/* Top Left Area */}
                        <Animated.View
                            entering={iconEnter(0)}
                            style={[
                                styles.icon,
                                { top: FRAME_TOP - 8, left: FRAME_LEFT - ICON_GAP - ICON_SIZES.sparkle },
                            ]}
                        >
                            <AnimatedSparkle width={ICON_SIZES.sparkle} height={ICON_SIZES.sparkle} style={sparkleTopLeftStyle} />
                        </Animated.View>
                        <Animated.View
                            entering={iconEnter(1)}
                            style={[
                                styles.icon,
                                { top: FRAME_TOP + 6, left: FRAME_LEFT - ICON_GAP - ICON_SIZES.flower },
                            ]}
                        >
                            <AnimatedFlower width={ICON_SIZES.flower} height={ICON_SIZES.flower} style={flowerStyle} />
                        </Animated.View>

                        {/* Left Center Area */}
                        <Animated.View
                            entering={iconEnter(2)}
                            style={[
                                styles.icon,
                                { top: FRAME_TOP + 78, left: FRAME_LEFT - ICON_GAP - ICON_SIZES.cloud },
                            ]}
                        >
                            <AnimatedCloudRain width={ICON_SIZES.cloud} height={54} style={cloudStyle} />
                        </Animated.View>

                        {/* Bottom Left Area */}
                        <Animated.View
                            entering={iconEnter(3)}
                            style={[
                                styles.icon,
                                { top: FRAME_TOP + 150, left: FRAME_LEFT - ICON_GAP - ICON_SIZES.moon },
                            ]}
                        >
                            <AnimatedMoon width={ICON_SIZES.moon} height={ICON_SIZES.moon} style={moonStyle} />
                        </Animated.View>
                        <Animated.View
                            entering={iconEnter(4)}
                            style={[
                                styles.icon,
                                { top: FRAME_TOP + 198, left: FRAME_LEFT - ICON_GAP - ICON_SIZES.fastForward },
                            ]}
                        >
                            <AnimatedFastForward width={ICON_SIZES.fastForward} height={ICON_SIZES.fastForward} style={fastForwardStyle} />
                        </Animated.View>

                        {/* Top Right Area */}
                        <Animated.View
                            entering={iconEnter(5)}
                            style={[
                                styles.icon,
                                { top: FRAME_TOP + 6, left: FRAME_RIGHT + ICON_GAP },
                            ]}
                        >
                            <AnimatedPlaySparkle width={ICON_SIZES.playSparkle} height={ICON_SIZES.playSparkle} style={playSparkleStyle} />
                        </Animated.View>

                        {/* Right Center Area */}
                        <Animated.View
                            entering={iconEnter(6)}
                            style={[
                                styles.icon,
                                { top: FRAME_TOP + 72, left: FRAME_RIGHT + ICON_GAP },
                            ]}
                        >
                            <AnimatedRainbow width={ICON_SIZES.rainbow} height={ICON_SIZES.rainbow} style={rainbowStyle} />
                        </Animated.View>

                        {/* Bottom Right Area */}
                        <Animated.View
                            entering={iconEnter(7)}
                            style={[
                                styles.icon,
                                { top: FRAME_TOP + 132, left: FRAME_RIGHT + ICON_GAP },
                            ]}
                        >
                            <AnimatedSparkle width={ICON_SIZES.sparkleSmall} height={ICON_SIZES.sparkleSmall} style={sparkleMidRightStyle} />
                        </Animated.View>
                        <Animated.View
                            entering={iconEnter(8)}
                            style={[
                                styles.icon,
                                { top: FRAME_TOP + 186, left: FRAME_RIGHT + ICON_GAP },
                            ]}
                        >
                            <AnimatedNote width={ICON_SIZES.note} height={ICON_SIZES.note} style={noteStyle} />
                        </Animated.View>
                    </View>

                    {/* Phone frame with character */}
                    <PhoneFrame style={styles.phoneFrame}>
                        <Animated.View
                            entering={FadeIn.delay(ANIMATION_DELAYS.character).duration(250)}
                            style={[styles.characterWrap, characterSlideStyle]}
                        >
                            <Character size={150} />
                        </Animated.View>
                    </PhoneFrame>
                </View>
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
        // Remove padding to allow icons to flow to edges if needed
    },
    heroIllustration: {
        width: HERO_WIDTH,
        height: HERO_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    iconsLayer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    icon: {
        position: 'absolute',
    },
    phoneFrame: {
        zIndex: 2,
        transform: [{ translateY: FRAME_OFFSET_Y }],
    },
    characterWrap: {
        position: 'absolute',
        left: -26,
        top: 36,
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
