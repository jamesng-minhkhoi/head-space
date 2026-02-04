// Orange Character Component with Breathing Animation
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
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
    const scale = useSharedValue(0.95);

    useEffect(() => {
        const minScale = 0.95;
        const maxScale = 1.06;
        const duration = Duration.ambientBreathing * 1.5;

        scale.value = minScale;
        scale.value = withRepeat(
            withTiming(maxScale, {
                duration,
                easing: Easing.inOut(Easing.sin),
            }),
            -1,
            true
        );
    }, [scale]);

    // Breathing animation - gentle scale pulse
    const breathingStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
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
