// Orange Character Component with Breathing Animation
import { View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Duration, CalmEasing } from '@/constants/animations';

interface CharacterProps {
    size?: number;
}

export function Character({ size = Spacing.characterSize }: CharacterProps) {
    // Breathing animation - gentle scale pulse
    const breathingStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withRepeat(
                    withSequence(
                        withTiming(1.03, {
                            duration: Duration.ambientBreathing / 2,
                            easing: Easing.inOut(Easing.ease),
                        }),
                        withTiming(1.0, {
                            duration: Duration.ambientBreathing / 2,
                            easing: Easing.inOut(Easing.ease),
                        })
                    ),
                    -1, // Infinite repeat
                    false
                ),
            },
        ],
    }));

    // Sparkle animation - opacity pulse
    const sparkleStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(
            withSequence(
                withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            false
        ),
        transform: [
            {
                scale: withRepeat(
                    withSequence(
                        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                        withTiming(0.8, { duration: 1000, easing: Easing.inOut(Easing.ease) })
                    ),
                    -1,
                    false
                ),
            },
        ],
    }));

    return (
        <Animated.View style={[styles.container, { width: size, height: size }, breathingStyle]}>
            {/* Main orange circle with gradient effect using layered views */}
            <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
                {/* Face - closed eyes (curved lines) */}
                <View style={styles.face}>
                    <View style={[styles.eye, styles.eyeLeft]} />
                    <View style={[styles.eye, styles.eyeRight]} />
                </View>

                {/* Sparkle */}
                <Animated.View style={[styles.sparkle, sparkleStyle]} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        backgroundColor: Colors.orangeCharacter,
        alignItems: 'center',
        justifyContent: 'center',
        // Gradient effect approximation with shadow
        boxShadow: '0 8px 24px rgba(255, 107, 53, 0.3)',
    },
    face: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginTop: -10,
    },
    eye: {
        width: 30,
        height: 4,
        backgroundColor: Colors.textPrimary,
        borderRadius: 2,
        // Curved eye effect
        transform: [{ rotate: '0deg' }],
    },
    eyeLeft: {
        transform: [{ rotate: '-8deg' }],
    },
    eyeRight: {
        transform: [{ rotate: '8deg' }],
    },
    sparkle: {
        position: 'absolute',
        bottom: '25%',
        right: '20%',
        width: 12,
        height: 12,
        backgroundColor: Colors.white,
        borderRadius: 6,
        boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
    },
});
