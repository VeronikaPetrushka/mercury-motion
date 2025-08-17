import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Animated, Easing, ScrollView } from "react-native";
import { commonMotion, yellowGradient } from "../leadconstmercury/leadstylesmotion";
import { twoPlanets } from "../leadconstmercury/leadimagesmotion";
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useRef } from "react";

const MercuryReadyCatch = () => {
    const navigation = useNavigation();
    
    const fadeAnim1 = useRef(new Animated.Value(0)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;
    const fadeAnim3 = useRef(new Animated.Value(0)).current;
    const buttonAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        const buttonAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(buttonAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(buttonAnim, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        const entryAnimation = Animated.sequence([
            Animated.timing(fadeAnim1, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim2, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim3, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]);

        entryAnimation.start(() => {
            buttonAnimation.start();
        });

        return () => {
            entryAnimation.stop();
            buttonAnimation.stop();
        };
    }, []);

    const buttonTranslateY = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10]
    });

    return (
        <View style={commonMotion.container}>
            <ScrollView style={{width: '100%'}}>

                <Animated.Image 
                    source={twoPlanets} 
                    style={[
                        commonMotion.twoPlanetsImage,
                        { 
                            opacity: fadeAnim1,
                            transform: [{
                                scale: fadeAnim1.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.9, 1]
                                })
                            }]
                        }]} 
                />
                
                <Animated.View style={{ opacity: fadeAnim2 }}>
                    <Text style={[commonMotion.title, { textAlign: 'center' }]}>
                        Ready to Catch the Light?
                    </Text>
                </Animated.View>
                
                <Animated.View style={{ opacity: fadeAnim3, marginTop: 16 }}>
                    <Text style={[commonMotion.textBlue, { textAlign: 'center' }]}>
                        You have 60 seconds.
                    </Text>
                    <Text style={[commonMotion.textBlue, { textAlign: 'center', marginTop: 8 }]}>
                        Missed beams fade — caught ones build your motion score.
                    </Text>
                </Animated.View>

                <Animated.View style={{ 
                    transform: [{ translateY: buttonTranslateY }],
                    width: '100%',
                    marginTop: 30 
                }}>
                    <TouchableOpacity
                        style={commonMotion.button}
                        onPress={() => navigation.navigate('MercuryCatchShinemotion')}
                    >
                        <LinearGradient
                            colors={yellowGradient}
                            style={commonMotion.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={commonMotion.buttonText}>Start Orbit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                <View style={{height: 350}} />
            </ScrollView>
        </View>
    );
};

export default MercuryReadyCatch;