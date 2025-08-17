import GlobalMercuryMotion from "./GlobalMercuryMotion";

import MercuryCatchShine from "../leadcompmotion/MercuryCatchShine";
import MercuryDailyOrbit from "../leadcompmotion/MercuryDailyOrbit";
import MercuryInsightSpace from "../leadcompmotion/MercuryInsightSpace";
import MercuryMotion from "../leadcompmotion/MercuryMotion";
import MercuryNewOrbitTask from "../leadcompmotion/MercuryNewOrbitTask";
import MercuryOrbitsInfo from "../leadcompmotion/MercuryOrbitsInfo";
import MercuryOverTime from "../leadcompmotion/MercuryOverTime";
import MercuryReadInsightSpace from "../leadcompmotion/MercuryReadInsightSpace";
import MercuryReadyCatch from "../leadcompmotion/MercuryReadyCatch";
import MercurySetMotion from "../leadcompmotion/MercurySetMotion";
import MercuryWriteReflection from "../leadcompmotion/MercuryWriteReflection";

export const MercuryMotionmotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryMotion />}
        />
    )
};

export const MercuryOrbitsInfomotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryOrbitsInfo />}
        />
    )
};

export const MercuryDailyOrbitmotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryDailyOrbit />}
            ismotion
        />
    )
};

export const MercuryInsightSpacemotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryInsightSpace />}
            ismotion
        />
    )
};

export const MercuryOverTimemotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryOverTime />}
            ismotion
        />
    )
};

export const MercuryReadyCatchmotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryReadyCatch />}
            ismotion
        />
    )
};

export const MercurySetMotionmotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercurySetMotion />}
            ismotion
        />
    )
};

export const MercuryCatchShinemotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryCatchShine />}
        />
    )
};

export const MercuryWriteReflectionmotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryWriteReflection />}
        />
    )
};

export const MercuryNewOrbitTaskmotion = () => {
    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryNewOrbitTask />}
        />
    )
};

export const MercuryReadInsightSpacenmotion = ({ route }) => {
    const { insight } = route.params;

    return (
        <GlobalMercuryMotion
            motioncomp={<MercuryReadInsightSpace insight={insight} />}
        />
    )
};