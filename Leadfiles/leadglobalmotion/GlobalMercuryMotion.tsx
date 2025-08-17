import { ImageBackground, View, ImageSourcePropType } from "react-native"
import MercuryPanelMotion from "./MercuryPanelMotion.js"
import { mercurybackground } from "../leadconstmercury/leadimagesmotion";

interface GlobalMercuryMotionProps {
    ismotion: boolean;
    motioncomp: React.ReactNode;
}

const GlobalMercuryMotion: React.FC<GlobalMercuryMotionProps> = ({ ismotion, motioncomp }) => {
    return (
        <ImageBackground source={mercurybackground as ImageSourcePropType} style={{flex: 1, backgroundColor: '#0F2767'}}>
            <View style={{flex: 1}}>
                <View style={{width: '100%', 
                        height: '100%'}}>{motioncomp}</View>
                {
                    ismotion && (
                        <View
                            style={{
                                width: '100%', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                position: 'absolute', 
                                alignSelf: 'center', 
                                bottom: 40
                            }}>
                            <MercuryPanelMotion />
                        </View>
                    )
                }
            </View>
        </ImageBackground>
    )
};

export default GlobalMercuryMotion;