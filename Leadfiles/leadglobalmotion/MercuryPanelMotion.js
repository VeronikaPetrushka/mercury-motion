import { useNavigation, useRoute } from "@react-navigation/native";
import { View, TouchableOpacity, Image, Animated } from "react-native";
import { motionPanel } from "../leadconstmercury/leadstylesmotion";
import leadpanelmotion from "../leadconstmercury/leadpanelmotion";
import { useEffect, useRef } from "react";

const MercuryPanelMotion = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const animationValues = useRef(leadpanelmotion.map(() => new Animated.Value(0))).current;
    
    const isActive = (routeName) => {
        return route.name === routeName;
    };

    useEffect(() => {
        Animated.stagger(
            100,
            animationValues.map(value => 
                Animated.spring(value, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true
                })
            )
        ).start();
    }, []);

    const handleNavigate = (routeName, index) => {
        Animated.sequence([
            Animated.timing(animationValues[index], {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(animationValues[index], {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start(() => {
            navigation.navigate(routeName);
        });
    };

    return (
        <View style={motionPanel.container}>
            {leadpanelmotion.map((lead, idx) => {
                const scale = animationValues[idx].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1]
                });
                
                const opacity = animationValues[idx].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                });

                return (
                    <Animated.View 
                        key={idx}
                        style={{
                            transform: [{ scale }],
                            opacity
                        }}
                    >
                        <TouchableOpacity
                            style={[
                                motionPanel.button, 
                                isActive(lead.motionMove) && {borderWidth: 1, borderColor: '#2D4FA5'}
                            ]}
                            onPress={() => handleNavigate(lead.motionMove, idx)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={lead.motionIcon}
                                style={motionPanel.icon}
                            />
                            {isActive(lead.motionMove) && (
                                <Animated.View 
                                    style={[
                                        motionPanel.indicator,
                                        {
                                            transform: [{
                                                scale: animationValues[idx].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0.8, 1.1]
                                                })
                                            }]
                                        }
                                    ]}
                                />
                            )}
                        </TouchableOpacity>
                    </Animated.View>
                );
            })}
        </View>
    );
};

export default MercuryPanelMotion;