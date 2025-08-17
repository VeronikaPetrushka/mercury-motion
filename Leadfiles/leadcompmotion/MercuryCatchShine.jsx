import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Animated, PanResponder, Alert, Dimensions } from "react-native";
import { commonMotion, styles } from "../leadconstmercury/leadstylesmotion";
import { shine, moon } from "../leadconstmercury/leadimagesmotion";
import { useEffect, useRef, useState } from "react";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MercuryCatchShine = () => {
    const navigation = useNavigation();
    const [caughtCount, setCaughtCount] = useState(0);
    const [missedCount, setMissedCount] = useState(0);
    const [gameActive, setGameActive] = useState(true);
    const [shines, setShines] = useState([]);
    const moonRef = useRef(null);
    const moonPosition = useRef({ 
        x: screenWidth/2 - 50,
        y: screenHeight - 150,
        width: 100,
        height: 100
    }).current;
    
    const caughtCountRef = useRef(0);
    const missedCountRef = useRef(0);
    
    const progressAnim = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                const newX = Math.max(0, Math.min(
                    gestureState.moveX - moonPosition.width / 2,
                    screenWidth - moonPosition.width
                ));
                const newY = Math.max(0, Math.min(
                    gestureState.moveY - moonPosition.height / 2,
                    screenHeight - moonPosition.height
                ));
                
                moonPosition.x = newX;
                moonPosition.y = newY;
                
                moonRef.current.setNativeProps({
                    style: {
                        left: newX,
                        top: newY
                    }
                });
            },
        })
    ).current;

    // Game timer
    useEffect(() => {
        if (!gameActive) return;

        const timer = setTimeout(() => {
            endGame();
        }, 20000);

        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 20000,
            useNativeDriver: false,
        }).start();

        return () => clearTimeout(timer);
    }, [gameActive]);

    // Generate shines
    useEffect(() => {
        if (!gameActive) return;

        const shineInterval = setInterval(() => {
            const newShine = {
                id: Date.now() + Math.random(),
                x: Math.random() * (screenWidth - 150),
                y: 0,
                opacity: new Animated.Value(1),
                translateY: new Animated.Value(0),
                image: shine,
                caught: false,
                currentY: 0,
            };

            newShine.listenerId = newShine.translateY.addListener(({ value }) => {
                newShine.currentY = value;
            });

            setShines(prev => [...prev, newShine]);

            Animated.timing(newShine.translateY, {
                toValue: screenHeight,
                duration: 3000 + Math.random() * 2000,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished && !newShine.caught) {
                    setMissedCount(prev => {
                        const newCount = prev + 1;
                        missedCountRef.current = newCount;
                        return newCount;
                    });
                    removeShine(newShine.id);
                }
            });
        }, 800);

        return () => clearInterval(shineInterval);
    }, [gameActive]);

    // Check collisions
    useEffect(() => {
        let animationFrameId;
        const caughtShines = new Set();
        
        const checkCollision = () => {
            shines.forEach(shine => {
                if (shine.caught || caughtShines.has(shine.id)) return;
                
                const shineBounds = {
                    x: shine.x,
                    y: shine.currentY,
                    width: 150,
                    height: 150
                };

                if (checkCollisionBetween(moonPosition, shineBounds)) {
                    shine.caught = true;
                    caughtShines.add(shine.id);
                    setCaughtCount(prev => {
                        const newCount = prev + 1;
                        caughtCountRef.current = newCount;
                        return newCount;
                    });
                    removeShine(shine.id);
                }
            });

            if (gameActive) {
                animationFrameId = requestAnimationFrame(checkCollision);
            }
        };

        if (gameActive) {
            animationFrameId = requestAnimationFrame(checkCollision);
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [gameActive, shines]);

    const checkCollisionBetween = (obj1, obj2) => {
        return (
            obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y
        );
    };

    const removeShine = (id) => {
        setShines(prev => prev.filter(shine => {
            if (shine.id === id) {
                shine.translateY.removeListener(shine.listenerId);
                if (!shine.caught) {
                    Animated.timing(shine.opacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                }
                return false;
            }
            return true;
        }));
    };

    const endGame = () => {
        setGameActive(false);
        Alert.alert(
            "Motion Complete",
            `You caught ${caughtCountRef.current} beams of light\nand missed ${missedCountRef.current}. Your orbit leaves a trace — every moment counts.`,
            [
                { text: "Try Again", onPress: resetGame },
                { text: "Go Back", onPress: () => navigation.goBack() },
            ]
        );
    };

    const resetGame = () => {
        shines.forEach(shine => {
            shine.translateY.removeListener(shine.listenerId);
        });
        
        setShines([]);
        setCaughtCount(0);
        setMissedCount(0);
        caughtCountRef.current = 0;
        missedCountRef.current = 0;
        setGameActive(true);
        progressAnim.setValue(0);
        moonPosition.x = screenWidth/2 - 50;
        moonPosition.y = screenHeight - 150;
        moonRef.current?.setNativeProps({
            style: {
                left: moonPosition.x,
                top: moonPosition.y
            }
        });
    };

    return (
        <View style={commonMotion.container} collapsable={false}>

            {/* Progress bar */}
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                    <Animated.View 
                        style={[
                            styles.progressBarFill,
                            {
                                width: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                }),
                            }
                        ]}
                    />
                </View>
                <Text style={styles.scoreText}>Caught: {caughtCount}</Text>
            </View>

            {/* Shines */}
            {shines.map(shine => (
                <Animated.Image
                    key={shine.id}
                    source={shine.image}
                    style={[
                        styles.shine,
                        {
                            left: shine.x,
                            transform: [{ translateY: shine.translateY }],
                            opacity: shine.opacity,
                        },
                    ]}
                />
            ))}

            {/* Moon */}
            <View
                ref={moonRef}
                style={[
                    styles.moonContainer,
                    {
                        left: moonPosition.x,
                        top: moonPosition.y,
                    }
                ]}
                {...panResponder.panHandlers}
            >
                <Image source={moon} style={styles.moon} />
            </View>
        </View>
    );
};

export default MercuryCatchShine;