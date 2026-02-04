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

import SmileyFace from '@/assets/images/smilie-face.svg';

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

    return (
        <Animated.View style={[styles.container, { width: size, height: size }, breathingStyle]}>
            <SmileyFace width={size} height={size} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // Optional shadow for the whole SVG if desired, but SVG might have it
        // boxShadow: '0 8px 24px rgba(255, 107, 53, 0.3)', 
    },
});
