// Custom Checkbox Component with Animation
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    ZoomIn,
    ZoomOut,
} from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';

interface CheckboxProps {
    checked: boolean;
    onToggle: (checked: boolean) => void;
    label: React.ReactNode;
    disabled?: boolean;
}

export function Checkbox({
    checked,
    onToggle,
    label,
    disabled = false,
}: CheckboxProps) {
    const handlePress = () => {
        if (!disabled) {
            Haptics.selectionAsync();
            onToggle(!checked);
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                disabled && styles.disabled,
            ]}
        >
            <View
                style={[
                    styles.checkbox,
                    checked ? styles.checkboxChecked : styles.checkboxUnchecked,
                ]}
            >
                {checked && (
                    <Animated.View
                        entering={ZoomIn.duration(150).springify()}
                        exiting={ZoomOut.duration(100)}
                    >
                        <SymbolView
                            name="checkmark"
                            tintColor={Colors.white}
                            size={14}
                            weight="bold"
                        />
                    </Animated.View>
                )}
            </View>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

// Link component for use inside checkbox label
interface LinkTextProps {
    children: string;
    onPress: () => void;
}

export function LinkText({ children, onPress }: LinkTextProps) {
    return (
        <Pressable onPress={onPress}>
            {({ pressed }) => (
                <Text
                    style={[
                        styles.link,
                        pressed && styles.linkPressed,
                    ]}
                >
                    {children}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Spacing.checkboxToLabel,
    },
    disabled: {
        opacity: Colors.disabled,
    },
    checkbox: {
        width: Spacing.checkboxSize,
        height: Spacing.checkboxSize,
        borderRadius: Spacing.checkboxBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: 'continuous',
    },
    checkboxUnchecked: {
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: Colors.checkboxBorder,
    },
    checkboxChecked: {
        backgroundColor: Colors.checkboxChecked,
    },
    label: {
        ...Typography.checkboxLabel,
        color: Colors.textSecondary,
        flex: 1,
    },
    link: {
        ...Typography.link,
        color: Colors.blueLink,
    },
    linkPressed: {
        color: Colors.bluePressed,
        textDecorationLine: 'underline',
    },
});
