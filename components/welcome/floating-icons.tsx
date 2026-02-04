// Floating Icons Component with Ambient Animation
import { View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    Easing,
    FadeIn,
} from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import { Colors } from '@/constants/colors';
import { Duration, StaggerDelay, WelcomeIntroDelays } from '@/constants/animations';

// Icon config with position and animation timing
const floatingIconsConfig = [
    { id: 'cloud', symbol: 'cloud.rain', color: '#87CEEB', position: { top: '10%', left: '5%' }, floatDuration: 5000, rotateDuration: 7000 },
    { id: 'heart', symbol: 'heart.fill', color: '#FF6B6B', position: { top: '15%', right: '10%' }, floatDuration: 4500, rotateDuration: 6000 },
    { id: 'star', symbol: 'star.fill', color: '#FFD700', position: { top: '35%', left: '8%' }, floatDuration: 6000, rotateDuration: 5500 },
    { id: 'moon', symbol: 'moon.fill', color: '#C9B1FF', position: { top: '40%', right: '5%' }, floatDuration: 5500, rotateDuration: 6500 },
    { id: 'sun', symbol: 'sun.max.fill', color: '#FFA500', position: { bottom: '55%', left: '12%' }, floatDuration: 4000, rotateDuration: 8000 },
    { id: 'sparkle', symbol: 'sparkle', color: '#FFE4B5', position: { bottom: '50%', right: '15%' }, floatDuration: 4800, rotateDuration: 5000 },
];

interface FloatingIconProps {
    symbol: string;
    color: string;
    floatDuration: number;
    rotateDuration: number;
    index: number;
}

function FloatingIcon({ symbol, color, floatDuration, rotateDuration, index }: FloatingIconProps) {
    // Float up and down animation
    const floatStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withRepeat(
                    withSequence(
                        withTiming(-15, { duration: floatDuration / 2, easing: Easing.inOut(Easing.ease) }),
                        withTiming(0, { duration: floatDuration / 2, easing: Easing.inOut(Easing.ease) })
                    ),
                    -1,
                    false
                ),
            },
            {
                rotate: withRepeat(
                    withSequence(
                        withTiming('10deg', { duration: rotateDuration / 4, easing: Easing.inOut(Easing.ease) }),
                        withTiming('-10deg', { duration: rotateDuration / 2, easing: Easing.inOut(Easing.ease) }),
                        withTiming('0deg', { duration: rotateDuration / 4, easing: Easing.inOut(Easing.ease) })
                    ),
                    -1,
                    false
                ),
            },
        ],
    }));

    return (
        <Animated.View
            entering={FadeIn.delay(WelcomeIntroDelays.floatingIcons + index * StaggerDelay.floatingIcon).duration(400)}
            style={floatStyle}
        >
            <View style={styles.iconContainer}>
                <SymbolView
                    name={symbol}
                    tintColor={color}
                    size={28}
                    weight="regular"
                />
            </View>
        </Animated.View>
    );
}

export function FloatingIcons() {
    return (
        <View style={styles.container} pointerEvents="none">
            {floatingIconsConfig.map((icon, index) => (
                <Animated.View
                    key={icon.id}
                    style={[styles.iconWrapper, icon.position]}
                >
                    <FloatingIcon
                        symbol={icon.symbol}
                        color={icon.color}
                        floatDuration={icon.floatDuration}
                        rotateDuration={icon.rotateDuration}
                        index={index}
                    />
                </Animated.View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
    },
    iconWrapper: {
        position: 'absolute',
    },
    iconContainer: {
        padding: 8,
    },
});
