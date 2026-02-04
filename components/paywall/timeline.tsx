// Timeline Component for Paywall Trial Steps
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { PaywallIntroDelays, StaggerDelay } from '@/constants/animations';

interface TimelineItem {
    id: string;
    icon: string;
    iconColor: string;
    iconBackground: string;
    title: string;
    description: string;
}

const timelineItems: TimelineItem[] = [
    {
        id: 'today',
        icon: 'lock.open',
        iconColor: Colors.white,
        iconBackground: Colors.timelineBlue,
        title: 'Today',
        description: 'Full access to the complete Headspace library.',
    },
    {
        id: 'reminder',
        icon: 'bell',
        iconColor: Colors.white,
        iconBackground: Colors.timelineOrange,
        title: 'In 12 days:',
        description: 'We\'ll send you a reminder that your trial is almost over.',
    },
    {
        id: 'billing',
        icon: 'star.fill',
        iconColor: Colors.white,
        iconBackground: Colors.timelineYellow,
        title: 'In 14 days:',
        description: 'Billing starts. Cancel anytime before.',
    },
];

interface TimelineItemRowProps {
    item: TimelineItem;
    index: number;
    isLast: boolean;
}

function TimelineItemRow({ item, index, isLast }: TimelineItemRowProps) {
    return (
        <Animated.View
            entering={FadeInLeft.delay(PaywallIntroDelays.timelineStart + index * StaggerDelay.timelineItem).duration(400)}
            style={styles.itemContainer}
        >
            {/* Icon column with connecting line */}
            <View style={styles.iconColumn}>
                <View style={[styles.iconCircle, { backgroundColor: item.iconBackground }]}>
                    <SymbolView
                        name={item.icon}
                        tintColor={item.iconColor}
                        size={18}
                        weight="medium"
                    />
                </View>
                {!isLast && <View style={styles.connectingLine} />}
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </Animated.View>
    );
}

export function Timeline() {
    return (
        <View style={styles.container}>
            {timelineItems.map((item, index) => (
                <TimelineItemRow
                    key={item.id}
                    item={item}
                    index={index}
                    isLast={index === timelineItems.length - 1}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.paywallTimelineItemGap,
    },
    itemContainer: {
        flexDirection: 'row',
        gap: Spacing.timelineIconToContent,
    },
    iconColumn: {
        alignItems: 'center',
        width: Spacing.timelineIconSize,
    },
    iconCircle: {
        width: Spacing.timelineIconSize,
        height: Spacing.timelineIconSize,
        borderRadius: Spacing.timelineIconSize / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectingLine: {
        width: Spacing.timelineLineWidth,
        flex: 1,
        backgroundColor: Colors.timelineLine,
        marginTop: 4,
        marginBottom: -4,
        borderRadius: Spacing.timelineLineWidth / 2,
    },
    content: {
        flex: 1,
        paddingTop: 4,
    },
    title: {
        ...Typography.timelineTitle,
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    description: {
        ...Typography.timelineDescription,
        color: Colors.textSecondary,
    },
});
