// Sunset Header Component with Gradient and Sun Character
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { PaywallIntroDelays } from '@/constants/animations';

import SmileyFace from '@/assets/images/smilie-face.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SunsetHeaderProps {
    onClose: () => void;
}

// Sun character with face and sparkles
function SunCharacter() {
    return (
        <View style={styles.sunContainer}>
            <SmileyFace width={100} height={100} />
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
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Orange/yellow gradient background layers */}
            <View style={styles.gradientBase} />
            <View style={styles.gradientYellow} />
            <View style={styles.gradientOrange} />

            {/* Cloud/wave decoration at bottom */}
            <View style={styles.waveDecoration} />

            {/* Close button - top right */}
            <Animated.View
                entering={FadeIn.delay(PaywallIntroDelays.closeButton).duration(300)}
                style={[styles.closeButtonContainer, { top: insets.top + 12 }]}
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
                        tintColor={Colors.textPrimary}
                        size={22}
                        weight="semibold"
                    />
                </Pressable>
            </Animated.View>

            {/* Sun character - centered */}
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
        height: 200,
        position: 'relative',
        overflow: 'hidden',
    },
    // Gradient layers
    gradientBase: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#F5A623', // Deep orange/yellow
    },
    gradientYellow: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '60%',
        backgroundColor: '#FFAA00', // Yellow-orange
    },
    gradientOrange: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
        backgroundColor: '#FF8C00', // Orange
    },
    waveDecoration: {
        position: 'absolute',
        bottom: 40,
        left: -20,
        right: -20,
        height: 60,
        backgroundColor: 'rgba(255, 200, 100, 0.4)',
        borderRadius: 100,
    },
    closeButtonContainer: {
        position: 'absolute',
        right: 16,
        zIndex: 10,
    },
    closeButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonPressed: {
        opacity: 0.5,
    },
    sunWrapper: {
        position: 'absolute',
        top: 40,
        alignSelf: 'center',
        zIndex: 5,
    },
    sunContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // Optional shadow
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
});
