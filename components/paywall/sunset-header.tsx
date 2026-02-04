// Sunset Header Component with Gradient and Sun Character
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeIn, Easing } from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { PaywallIntroDelays } from '@/constants/animations';

interface SunsetHeaderProps {
    onClose: () => void;
}

// Sun character for paywall (simpler version of Character)
function SunCharacter() {
    return (
        <View style={styles.sunContainer}>
            <View style={styles.sun}>
                {/* Simple face */}
                <View style={styles.sunFace}>
                    <View style={styles.sunEye} />
                    <View style={styles.sunEye} />
                </View>
            </View>

            {/* Sun rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
                <View
                    key={rotation}
                    style={[
                        styles.sunRay,
                        { transform: [{ rotate: `${rotation}deg` }, { translateY: -50 }] },
                    ]}
                />
            ))}
        </View>
    );
}

export function SunsetHeader({ onClose }: SunsetHeaderProps) {
    const insets = useSafeAreaInsets();

    const handleClose = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onClose();
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
            {/* Gradient layers (simulated since real gradients need New Arch) */}
            <View style={styles.gradientTop} />
            <View style={styles.gradientMiddle} />
            <View style={styles.gradientBottom} />

            {/* Close button */}
            <Animated.View
                entering={FadeIn.delay(PaywallIntroDelays.closeButton).duration(300)}
                style={styles.closeButtonContainer}
            >
                <Pressable
                    onPress={handleClose}
                    style={({ pressed }) => [
                        styles.closeButton,
                        pressed && styles.closeButtonPressed,
                    ]}
                >
                    <SymbolView
                        name="xmark"
                        tintColor={Colors.white}
                        size={18}
                        weight="medium"
                    />
                </Pressable>
            </Animated.View>

            {/* Sun character */}
            <Animated.View
                entering={FadeIn.delay(PaywallIntroDelays.sunCharacter).duration(500)}
                style={styles.sunWrapper}
            >
                <SunCharacter />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Spacing.paywallHeaderHeight,
        position: 'relative',
        overflow: 'hidden',
    },
    // Gradient simulation layers
    gradientTop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.sunsetTop,
    },
    gradientMiddle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '40%',
        bottom: 0,
        backgroundColor: Colors.sunsetYellow,
    },
    gradientBottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '70%',
        bottom: 0,
        backgroundColor: Colors.sunsetOrange,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 56,
        right: 16,
        zIndex: 10,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.closeBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonPressed: {
        backgroundColor: Colors.closeBackgroundPressed,
        transform: [{ scale: 0.9 }],
    },
    sunWrapper: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    sunContainer: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sun: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.orangeCharacter,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    sunFace: {
        flexDirection: 'row',
        gap: 12,
        marginTop: -4,
    },
    sunEye: {
        width: 16,
        height: 3,
        backgroundColor: Colors.textPrimary,
        borderRadius: 2,
    },
    sunRay: {
        position: 'absolute',
        width: 3,
        height: 12,
        backgroundColor: Colors.sunsetDeep,
        borderRadius: 2,
        zIndex: 1,
    },
});
