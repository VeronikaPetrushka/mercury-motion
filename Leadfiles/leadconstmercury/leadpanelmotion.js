import {
    motionCatchLight,
    motionInsightSpace,
    motionDailyOrbit,
    motionOverTime,
    motionSet
} from "./leadimagesmotion";

const leadpanelmotion = [
    {
        motionMove: 'MercuryDailyOrbitmotion',
        motionIcon: motionDailyOrbit
    },
    {
        motionMove: 'MercuryOverTimemotion',
        motionIcon: motionOverTime
    },
    {
        motionMove: 'MercuryInsightSpacemotion',
        motionIcon: motionInsightSpace
    },
    {
        motionMove: 'MercuryReadyCatchmotion',
        motionIcon: motionCatchLight
    },
    {
        motionMove: 'MercurySetMotionmotion',
        motionIcon: motionSet
    }
];

export default leadpanelmotion;