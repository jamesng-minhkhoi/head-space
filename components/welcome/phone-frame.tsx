// Phone Frame Component - Device mockup container
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn, Easing } from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { WelcomeIntroDelays } from '@/constants/animations';

interface PhoneFrameProps {
    children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
    return (
        <Animated.View
            entering={FadeIn.duration(600).easing(Easing.out(Easing.ease))}
            style={styles.container}
        >
            {/* Device frame */}
            <View style={styles.frame}>
                {/* Status bar area */}
                <View style={styles.statusBar}>
                    <View style={styles.notch} />
                </View>

                {/* Screen content */}
                <View style={styles.screen}>
                    {children}
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: 0.95 }], // Slightly scaled for visual appeal
    },
    frame: {
        width: Spacing.phoneFrameWidth,
        height: Spacing.phoneFrameHeight,
        backgroundColor: Colors.white,
        borderRadius: Spacing.phoneFrameBorderRadius,
        borderCurve: 'continuous',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.08)',
    },
    statusBar: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 12,
    },
    notch: {
        width: 80,
        height: 24,
        backgroundColor: Colors.textPrimary,
        borderRadius: 12,
        borderCurve: 'continuous',
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
});
