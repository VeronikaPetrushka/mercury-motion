import { useNavigation } from "@react-navigation/native";
import { commonMotion } from "../leadconstmercury/leadstylesmotion";
import { View, Animated } from "react-native";
import WebView from 'react-native-webview';
import { useEffect, useRef, useState } from "react";

const MercuryMotion = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [htmlContent, setHtmlContent] = useState(orbitLoaderAnimation(false));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        const hoverTimer = setTimeout(() => {
            setHtmlContent(orbitLoaderAnimation(true));
        }, 2000);

        const navigateTimer = setTimeout(() => {
            navigation.navigate("MercuryOrbitsInfomotion");
        }, 5000);

        return () => {
            clearTimeout(hoverTimer);
            clearTimeout(navigateTimer);
        };
    }, [fadeAnim, navigation]);

    return (
        <View style={[commonMotion.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <Animated.View style={{ opacity: fadeAnim, width: '100%', height: '100%' }}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
                    style={{ flex: 1, backgroundColor: 'transparent' }}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                />
            </Animated.View>
        </View>
    );
};

const orbitLoaderAnimation = (showHoverState) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: transparent;
                }
                
                .solar-system-container {
                    perspective: 2000px;  /* Increased from 1500px */
                    width: 300px;         /* Increased from 200px */
                    height: 300px;        /* Increased from 200px */
                }

                .solar-system {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                    transition: all 0.5s ease-out;
                    animation: rotate-center 6s linear infinite;
                    ${showHoverState ? 'animation-play-state: paused; transform: rotateX(45deg) rotateY(-45deg);' : ''}
                }

                .sun {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 75px;          /* Increased from 50px */
                    height: 75px;         /* Increased from 50px */
                    background: radial-gradient(circle at 30% 30%, #fff, #ffd700, #ffa500);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) translateZ(0);
                    box-shadow: 0 0 30px #ffd700;  /* Increased from 20px */
                    transition: all 0.5s ease-out;
                    ${showHoverState ? 'transform: translate(-50%, -50%) translateZ(150px); box-shadow: 0 0 60px #ffd700;' : ''}
                }

                .earth-orbit {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 225px;         /* Increased from 150px */
                    height: 225px;        /* Increased from 150px */
                    border: 2px dashed rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) translateZ(-75px);  /* Increased from -50px */
                    transform-style: preserve-3d;
                    transition: all 0.5s ease-out;
                    ${showHoverState ? 'transform: translate(-50%, -50%) translateZ(-150px) rotateX(75deg); border-color: rgba(255, 255, 255, 0.2);' : ''}
                }

                .earth {
                    position: absolute;
                    top: -15px;          /* Adjusted from -10px */
                    left: 50%;
                    width: 30px;          /* Increased from 20px */
                    height: 30px;         /* Increased from 20px */
                    background: radial-gradient(circle at 30% 30%, #4b9cd3, #1b4f72);
                    border-radius: 50%;
                    transform: translateX(-50%) translateZ(0);
                    transform-style: preserve-3d;
                    transition: all 0.5s ease-out;
                    ${showHoverState ? 'transform: translateX(-50%) translateZ(30px); box-shadow: 0 0 22px rgba(75, 156, 211, 0.8);' : ''}
                }

                .moon-orbit {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 75px;          /* Increased from 50px */
                    height: 75px;         /* Increased from 50px */
                    border: 1px dashed rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) translateZ(-15px);  /* Increased from -10px */
                    animation: rotate-orbit 2s linear infinite;
                    transform-style: preserve-3d;
                    transition: all 0.5s ease-out;
                    ${showHoverState ? 'transform: translate(-50%, -50%) translateZ(-180px) rotateX(75deg); border-color: rgba(255, 255, 255, 0.2);' : ''}
                }

                .moon {
                    position: absolute;
                    top: -4.5px;          /* Adjusted from -3px */
                    left: 50%;
                    width: 9px;           /* Increased from 6px */
                    height: 9px;          /* Increased from 6px */
                    background: radial-gradient(circle at 30% 30%, #fff, #ccc);
                    border-radius: 50%;
                    transform: translateX(-50%) translateZ(0);
                    transition: all 0.5s ease-out;
                    ${showHoverState ? 'transform: translateX(-50%) translateZ(15px); box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);' : ''}
                }

                @keyframes rotate-orbit {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }

                @keyframes rotate-center {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            </style>
        </head>
        <body>
            <div class="solar-system-container">
                <div class="solar-system">
                    <div class="sun"></div>
                    <div class="earth-orbit">
                        <div class="earth">
                            <div class="moon-orbit">
                                <div class="moon"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
`;
};

export default MercuryMotion;