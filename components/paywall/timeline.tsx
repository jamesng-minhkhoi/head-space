// Timeline Component for Paywall Trial Steps
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    FadeIn
} from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { PaywallIntroDelays, StaggerDelay } from '@/constants/animations';

// Timeline orange color matching design
const TIMELINE_ORANGE = '#F5A623';
const LINE_PEACH = '#FFD4A8';
const LINE_GREEN = '#A8E6CF';

interface TimelineItem {
    id: string;
    icon: any; // SF Symbol name
    title: string;
    description: string;
}

const timelineItems: TimelineItem[] = [
    {
        id: 'today',
        icon: 'lock.open.fill',
        title: 'Today',
        description: 'Unlock our library of meditations, sleep sounds, and more.',
    },
    {
        id: 'reminder',
        icon: 'bell.fill',
        title: 'In 12 days',
        description: "We'll send you a reminder that your trial is ending soon.",
    },
    {
        id: 'billing',
        icon: 'star.fill',
        title: 'In 14 days',
        description: "You'll be charged on September 1, cancel anytime before.",
    },
];

export function Timeline() {
    const lineProgress = useSharedValue(0);

    const lineStyle = useAnimatedStyle(() => ({
        height: `${lineProgress.value}%`,
    }));

    useEffect(() => {
        // Animate line to full height over the course of the item reveals
        lineProgress.value = withTiming(100, {
            duration: 1200, // Syncs with total stagger time (0 + 400 + 800 roughly)
            easing: Easing.out(Easing.quad),
        });
    }, []);

    return (
        <View style={styles.container}>
            {/* Wrapper defines the full possible height */}
            <View style={styles.lineContainer}>
                {/* Animated inner line growing from top */}
                <Animated.View style={[styles.lineInner, lineStyle]}>
                    <LinearGradient
                        colors={[LINE_PEACH, LINE_GREEN, 'rgba(168, 230, 207, 0)']}
                        locations={[0, 0.7, 1]}
                        style={styles.lineGradient}
                    />
                </Animated.View>
            </View>

            {/* Timeline items */}
            {timelineItems.map((item, index) => (
                <Animated.View
                    key={item.id}
                    // Use simple FadeIn to avoid horizontal translation breaks
                    entering={FadeIn.delay(PaywallIntroDelays.timelineStart + index * StaggerDelay.timelineItem).duration(600)}
                    style={styles.itemContainer}
                >
                    {/* Icon */}
                    <View style={styles.iconCircle}>
                        <SymbolView
                            name={item.icon}
                            tintColor={Colors.white}
                            size={20}
                            weight="medium"
                        />
                    </View>

                    {/* Content */}
                    <View style={styles.content}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                </Animated.View>
            ))}
        </View>
    );
}

const ICON_SIZE = 44;
const LINE_WIDTH = 12; // Thicker line
const ITEM_GAP = 24;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    lineContainer: {
        position: 'absolute',
        left: ICON_SIZE / 2 - LINE_WIDTH / 2, // Center line under icons
        top: ICON_SIZE / 2, // Start from center of first icon
        bottom: 0, // Extend past the last icon slightly for fade effect
        width: LINE_WIDTH,
        borderRadius: LINE_WIDTH / 2,
        overflow: 'hidden', // Clip the animated line
    },
    lineInner: {
        width: '100%',
        overflow: 'hidden', // Ensure gradient is clipped if needed
    },
    lineGradient: {
        flex: 1,
        width: '100%',
    },
    itemContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: ITEM_GAP,
    },
    iconCircle: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        borderRadius: ICON_SIZE / 2,
        backgroundColor: TIMELINE_ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2, // Above the line
    },
    content: {
        flex: 1,
        paddingTop: 8,
    },
    title: {
        ...Typography.timelineTitle,
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    description: {
        ...Typography.timelineDescription,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
});
