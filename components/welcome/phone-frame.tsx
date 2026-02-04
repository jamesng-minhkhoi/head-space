// Phone Frame Component - Device mockup container
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeIn, Easing } from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

interface PhoneFrameProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export function PhoneFrame({ children, style }: PhoneFrameProps) {
    return (
        <Animated.View
            entering={FadeIn.duration(600).easing(Easing.out(Easing.ease))}
            style={[styles.container, style]}
        >
            {/* Device frame */}
            <View style={styles.frame}>
                {/* Status bar area */}
                <View style={styles.statusBar}>
                    <View style={styles.speaker} />
                    <View style={styles.camera} />
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
        width: Spacing.phoneFrameWidth,
        height: Spacing.phoneFrameHeight,
        alignItems: 'center',
        justifyContent: 'center',
        // Removed scale transform to ensure 1:1 absolute sizing
    },
    frame: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        borderRadius: Spacing.phoneFrameBorderRadius,
        borderCurve: 'continuous',
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(0, 0, 0, 0.08)',
    },
    statusBar: {
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 6,
    },
    speaker: {
        width: 42,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.18)',
    },
    camera: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 12,
        overflow: 'hidden',
    },
});
