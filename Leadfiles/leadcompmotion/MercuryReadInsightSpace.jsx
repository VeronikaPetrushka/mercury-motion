import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, TouchableOpacity, Share, Animated, Easing } from "react-native";
import { commonMotion, reflectionMotion } from "../leadconstmercury/leadstylesmotion";
import { backMotion, shareMotion } from "../leadconstmercury/leadimagesmotion";
import { useEffect, useRef } from "react";

const MercuryReadInsightSpace = ({ insight }) => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const shareMotionArticle = async () => {
        try {
            const shareOptions = {
                title: insight.title,
                message: `${insight.title}\n\n${insight.motionDesc.substring(0, 100)}...\n\nShare your insights!`,
            };
            
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();

            await Share.share(shareOptions);
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    const handleBackPress = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 50,
                duration: 400,
                useNativeDriver: true,
            })
        ]).start(() => navigation.goBack());
    };

    return (
        <Animated.View 
            style={[
                commonMotion.container,
                {
                    opacity: fadeAnim,
                    transform: [
                        { translateY: slideUpAnim },
                        { scale: scaleAnim }
                    ]
                }
            ]}
        >
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Animated.Image 
                        source={backMotion} 
                        style={[
                            commonMotion.backBtn, 
                            {position: 'static'},
                        ]} 
                    />
                </TouchableOpacity>
                
                <Animated.Text 
                    style={[
                        commonMotion.heading, 
                        {marginBottom: 0, opacity: fadeAnim}
                    ]}
                >
                    Insight Space
                </Animated.Text>
                
                <TouchableOpacity onPress={shareMotionArticle}>
                    <Animated.Image 
                        source={shareMotion} 
                        style={[
                            commonMotion.backBtn, 
                            {position: 'static'},
                            { transform: [{ scale: scaleAnim }] }
                        ]} 
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={{width: '100%'}}>
                <Animated.Image 
                    source={insight.leadingImg} 
                    style={[
                        reflectionMotion.poster, 
                        {marginBottom: 20},
                        {
                            opacity: fadeAnim,
                            transform: [
                                { translateY: slideUpAnim.interpolate({
                                    inputRange: [0, 50],
                                    outputRange: [0, 20]
                                })}
                            ]
                        }
                    ]}
                />
                
                <Animated.Text 
                    style={[
                        commonMotion.heading,
                        {
                            opacity: fadeAnim,
                            transform: [
                                { translateX: slideUpAnim.interpolate({
                                    inputRange: [0, 50],
                                    outputRange: [0, 10]
                                })}
                            ]
                        }
                    ]}
                >
                    {insight.title}
                </Animated.Text>
                
                <Animated.Text 
                    style={[
                        reflectionMotion.desc, 
                        {fontSize: 16},
                        {
                            opacity: fadeAnim,
                            transform: [
                                { translateY: slideUpAnim.interpolate({
                                    inputRange: [0, 50],
                                    outputRange: [0, 15]
                                })}
                            ]
                        }
                    ]}
                >
                    {insight.motionDesc}
                </Animated.Text>

                <View style={{height: 200}} />
            </ScrollView>
        </Animated.View>
    );
};

export default MercuryReadInsightSpace;