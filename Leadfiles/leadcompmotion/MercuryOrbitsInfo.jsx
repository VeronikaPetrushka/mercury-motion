import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, Animated, Easing } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { commonMotion, yellowGradient } from "../leadconstmercury/leadstylesmotion";
import { twoPlanets } from "../leadconstmercury/leadimagesmotion";
import { useState, useEffect, useRef } from "react";
import motionInfo from "../leadconstmercury/motionInfo";

const MercuryOrbitsInfo = () => {
    const navigation = useNavigation();
    const [orbitSlideIdx, setOrbitSlideIdx] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const imageFadeAnim = useRef(new Animated.Value(0)).current;
    const textFadeAnim = useRef(new Animated.Value(0)).current;
    const buttonFadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(imageFadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            Animated.timing(textFadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.ease
            }).start(() => {
                if (orbitSlideIdx < motionInfo.length - 1) {
                    setOrbitSlideIdx(orbitSlideIdx + 1);
                } else {
                    clearInterval(timer);
                    setShowButton(true);
                    Animated.timing(buttonFadeAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }).start();
                }
                Animated.timing(textFadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.ease
                }).start();
            });
        }, 3000);

        return () => clearInterval(timer);
    }, [orbitSlideIdx, textFadeAnim, buttonFadeAnim]);

    return (
        <View style={commonMotion.container}>
            <Animated.View style={{ opacity: imageFadeAnim, width: '100%' }}>
                <Image 
                    source={twoPlanets} 
                    style={{ 
                        width: '100%', 
                        height: 500, 
                        resizeMode: 'contain', 
                        marginBottom: 20 
                    }} 
                />
            </Animated.View>
            
            <Animated.View style={{ opacity: textFadeAnim }}>
                <Text style={commonMotion.title}>{motionInfo[orbitSlideIdx].orbittitle.toUpperCase()}</Text>
                <Text style={commonMotion.textWhite}>{motionInfo[orbitSlideIdx].orbittext}</Text>
            </Animated.View>

            {showButton && (
                <Animated.View style={{ opacity: buttonFadeAnim, width: '100%', marginTop: 30 }}>
                    <TouchableOpacity
                        style={commonMotion.button}
                        onPress={() => navigation.navigate('MercuryDailyOrbitmotion')}
                    >
                        <LinearGradient
                            colors={yellowGradient}
                            style={commonMotion.gradient}
                        >
                            <Text style={commonMotion.buttonText}>Begin Orbit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
};

export default MercuryOrbitsInfo;