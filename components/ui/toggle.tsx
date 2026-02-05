// Generic Toggle Component with Animated Indicator
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { CALM_SPRING } from '@/constants/animations';

export type ToggleOption<T extends string | number> = {
    label: string;
    value: T;
};

interface ToggleProps<T extends string | number> {
    options: ToggleOption<T>[];
    value: T;
    onChange: (value: T) => void;
}

const SEGMENT_WIDTH = 100;

export function Toggle<T extends string | number>({ options, value, onChange }: ToggleProps<T>) {
    const activeIndex = Math.max(
        0,
        options.findIndex((option) => option.value === value)
    );
    const translateX = useSharedValue(0);

    useEffect(() => {
        if (options.length === 0) {
            return;
        }

        translateX.value = withSpring(
            activeIndex * SEGMENT_WIDTH,
            CALM_SPRING
        );
    }, [activeIndex, options.length, translateX]);

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        width: SEGMENT_WIDTH,
    }));

    const handlePress = (newValue: T) => {
        if (newValue !== value) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onChange(newValue);
        }
    };

    if (options.length === 0) {
        return null;
    }

    return (
        <View
            style={[
                styles.container,
                { width: SEGMENT_WIDTH * options.length + Spacing.togglePadding * 2 },
            ]}
        >
            {/* Sliding indicator */}
            <Animated.View style={[styles.indicator, indicatorStyle]} />

            {options.map((option) => {
                const isActive = option.value === value;

                return (
                    <Pressable
                        key={`${option.value}`}
                        onPress={() => handlePress(option.value)}
                        style={({ pressed }) => [
                            styles.segment,
                            pressed && !isActive && styles.segmentPressed,
                        ]}
                    >
                        <Text
                            style={[
                                styles.segmentText,
                                isActive ? styles.activeText : styles.inactiveText,
                            ]}
                        >
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: Spacing.toggleHeight,
        backgroundColor: Colors.toggleBackground,
        borderRadius: Spacing.toggleBorderRadius,
        padding: Spacing.togglePadding,
        position: 'relative',
    },
    indicator: {
        position: 'absolute',
        top: Spacing.togglePadding,
        left: Spacing.togglePadding,
        height: Spacing.toggleHeight - Spacing.togglePadding * 2,
        backgroundColor: Colors.toggleActive,
        borderRadius: Spacing.toggleBorderRadius - Spacing.togglePadding,
        borderCurve: 'continuous',
    },
    segment: {
        width: SEGMENT_WIDTH, // Fixed width for consistent pill shape
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    segmentPressed: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: Spacing.toggleBorderRadius - Spacing.togglePadding,
    },
    segmentText: {
        ...Typography.toggleActive,
    },
    activeText: {
        color: Colors.white,
    },
    inactiveText: {
        color: Colors.textSecondary,
        ...Typography.toggleInactive,
    },
});
