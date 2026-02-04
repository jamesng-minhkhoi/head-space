// Floating Icons Component with Ambient Animation
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    Easing,
    FadeIn,
} from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import { StaggerDelay, WelcomeIntroDelays } from '@/constants/animations';

// Icon position type
interface IconPosition {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

// Icon config with position and animation timing
const floatingIconsConfig: Array<{
    id: string;
    symbol: any; // SF Symbol name
    color: string;
    position: IconPosition;
    floatDuration: number;
    rotateDuration: number;
}> = [
        { id: 'cloud', symbol: 'cloud.rain', color: '#87CEEB', position: { top: 40, left: 20 }, floatDuration: 5000, rotateDuration: 7000 },
        { id: 'heart', symbol: 'heart.fill', color: '#FF6B6B', position: { top: 60, right: 40 }, floatDuration: 4500, rotateDuration: 6000 },
        { id: 'star', symbol: 'star.fill', color: '#FFD700', position: { top: 140, left: 32 }, floatDuration: 6000, rotateDuration: 5500 },
        { id: 'moon', symbol: 'moon.fill', color: '#C9B1FF', position: { top: 160, right: 20 }, floatDuration: 5500, rotateDuration: 6500 },
        { id: 'sun', symbol: 'sun.max.fill', color: '#FFA500', position: { top: 220, left: 48 }, floatDuration: 4000, rotateDuration: 8000 },
        { id: 'sparkle', symbol: 'sparkle', color: '#FFE4B5', position: { top: 200, right: 60 }, floatDuration: 4800, rotateDuration: 5000 },
    ];

interface FloatingIconProps {
    symbol: any;
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
                <View
                    key={icon.id}
                    style={[styles.iconWrapper, icon.position as ViewStyle]}
                >
                    <FloatingIcon
                        symbol={icon.symbol}
                        color={icon.color}
                        floatDuration={icon.floatDuration}
                        rotateDuration={icon.rotateDuration}
                        index={index}
                    />
                </View>
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
