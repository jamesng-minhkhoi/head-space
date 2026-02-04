// Billing Toggle Component (Annual/Monthly) with Animated Indicator
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
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

export type BillingCycle = 'annual' | 'monthly';

interface ToggleProps {
    value: BillingCycle;
    onChange: (value: BillingCycle) => void;
}

export function Toggle({ value, onChange }: ToggleProps) {
    const [segmentWidth, setSegmentWidth] = useState(0);
    const translateX = useSharedValue(0);

    useEffect(() => {
        if (segmentWidth > 0) {
            translateX.value = withSpring(
                value === 'annual' ? 0 : segmentWidth,
                CALM_SPRING
            );
        }
    }, [value, segmentWidth]);

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        width: segmentWidth,
    }));

    const handlePress = (newValue: BillingCycle) => {
        if (newValue !== value) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onChange(newValue);
        }
    };

    return (
        <View style={styles.container}>
            {/* Sliding indicator */}
            <Animated.View style={[styles.indicator, indicatorStyle]} />

            {/* Annual segment */}
            <Pressable
                onLayout={(e) => setSegmentWidth(e.nativeEvent.layout.width)}
                onPress={() => handlePress('annual')}
                style={({ pressed }) => [
                    styles.segment,
                    pressed && value !== 'annual' && styles.segmentPressed,
                ]}
            >
                <Text
                    style={[
                        styles.segmentText,
                        value === 'annual' ? styles.activeText : styles.inactiveText,
                    ]}
                >
                    Annual
                </Text>
            </Pressable>

            {/* Monthly segment */}
            <Pressable
                onPress={() => handlePress('monthly')}
                style={({ pressed }) => [
                    styles.segment,
                    pressed && value !== 'monthly' && styles.segmentPressed,
                ]}
            >
                <Text
                    style={[
                        styles.segmentText,
                        value === 'monthly' ? styles.activeText : styles.inactiveText,
                    ]}
                >
                    Monthly
                </Text>
            </Pressable>
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
        width: 100, // Fixed width for consistent pill shape
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
