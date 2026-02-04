import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withTiming,
    interpolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { BUTTON_SPRING } from '@/constants/animations';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
    children: string;
    onPress: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
}

export function Button({
    children,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
}: ButtonProps) {
    const scale = useSharedValue(1);
    const disabledAnim = useSharedValue(disabled || loading ? 1 : 0);

    useEffect(() => {
        disabledAnim.value = withTiming(disabled || loading ? 1 : 0, { duration: 300 });
    }, [disabled, loading]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: interpolate(disabledAnim.value, [0, 1], [1, Colors.disabled]),
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.97, BUTTON_SPRING);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, BUTTON_SPRING);
    };

    const handlePress = () => {
        if (!disabled && !loading) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress();
        }
    };

    const isPrimary = variant === 'primary';

    return (
        <AnimatedPressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            style={[
                styles.button,
                isPrimary ? styles.primaryButton : styles.secondaryButton,
                animatedStyle,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? Colors.white : Colors.textPrimary} />
            ) : (
                <Text
                    style={[
                        styles.text,
                        isPrimary ? styles.primaryText : styles.secondaryText,
                    ]}
                >
                    {children}
                </Text>
            )}
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: Spacing.buttonHeight,
        borderRadius: Spacing.buttonBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.buttonPaddingHorizontal,
    },
    primaryButton: {
        backgroundColor: Colors.bluePrimary,
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
    },
    secondaryButton: {
        backgroundColor: Colors.grayLight,
    },
    text: {
        ...Typography.buttonPrimary,
    },
    primaryText: {
        color: Colors.white,
    },
    secondaryText: {
        color: Colors.textPrimary,
        ...Typography.buttonSecondary,
    },
});
