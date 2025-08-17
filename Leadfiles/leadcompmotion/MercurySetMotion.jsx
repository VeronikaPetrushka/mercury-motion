import { View, Text, Switch, TouchableOpacity, Alert, Animated, Share, Linking } from "react-native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonMotion, reflectionMotion } from "../leadconstmercury/leadstylesmotion";

const MercurySetMotion = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const slideAnimations = useRef([]);
    const appUrl = "https://yourappstorelink.com";
    const privacyUrl = "https://yourwebsite.com/privacy";

    useEffect(() => {
        slideAnimations.current = Array(4).fill().map((_, i) => new Animated.Value(-100));
        const animations = slideAnimations.current.map((anim, index) => 
            Animated.timing(anim, {
                toValue: 0,
                duration: 500,
                delay: index * 150,
                useNativeDriver: true
            })
        );
        Animated.stagger(150, animations).start();
    }, []);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const value = await AsyncStorage.getItem('@notificationsEnabled');
                if (value !== null) {
                    setNotificationsEnabled(JSON.parse(value));
                }
            } catch (e) {
                console.error('Failed to load settings');
            }
        };
        loadSettings();
    }, []);

    const toggleNotifications = async (value) => {
        try {
            setNotificationsEnabled(value);
            await AsyncStorage.setItem('@notificationsEnabled', JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save setting');
        }
    };

    const handleShareApp = async () => {
        try {
            await Share.share({
                message: `Check out this amazing app: ${appUrl}`,
                url: appUrl,
                title: 'Share App'
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to share app');
        }
    };

    const handleClearStorage = () => {
        Alert.alert(
            'Confirm Reset',
            'Are you sure you want to reset all data? This cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                { 
                    text: 'Reset', 
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            Alert.alert('Success', 'All data has been reset');
                        } catch (e) {
                            Alert.alert('Error', 'Failed to clear data');
                        }
                    } 
                }
            ]
        );
    };

    const handleOpenPolicy = () => {
        Linking.openURL(privacyUrl).catch(() => 
            Alert.alert('Error', 'Could not open the privacy policy')
        );
    };

    const items = [
        {
            title: "Notifications",
            component: (
                <Switch
                    value={notificationsEnabled}
                    onValueChange={toggleNotifications}
                    trackColor={{ false: "#767577", true: "#F4DF13" }}
                    thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
                />
            ),
            onPress: null
        },
        {
            title: "Share the app",
            component: null,
            onPress: handleShareApp
        },
        {
            title: "Reset all data",
            component: null,
            onPress: handleClearStorage
        },
        {
            title: "Terms of use",
            component: null,
            onPress: handleOpenPolicy
        }
    ];

    return (
        <View style={commonMotion.container}>

            <Text style={[commonMotion.heading, {marginBottom: 30}]}>Settings</Text>

            {items.map((item, index) => (
                <Animated.View
                    key={index}
                    style={[
                        reflectionMotion.customContainer,
                        { 
                            transform: [{ 
                                translateX: slideAnimations.current[index] || 0 
                            }],
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 50,
                            paddingVertical: 21 
                        }
                    ]}
                >
                    <TouchableOpacity 
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                        onPress={item.onPress}
                        disabled={!item.onPress}
                    >
                        <Text style={commonMotion.textWhite}>{item.title}</Text>
                        {item.component}
                    </TouchableOpacity>
                </Animated.View>
            ))}
        </View>
    );
};

export default MercurySetMotion;