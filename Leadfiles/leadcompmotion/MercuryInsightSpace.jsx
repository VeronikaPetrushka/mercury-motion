import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, TouchableOpacity, Image, Text, ScrollView, Animated, Easing, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonMotion } from "../leadconstmercury/leadstylesmotion";
import { Calendar } from 'react-native-calendars';
import { useState, useCallback, useEffect, useRef } from "react";
import { addPlanet, calendarArrow, decorationPlanets } from "../leadconstmercury/leadimagesmotion";

const MercuryDailyOrbit = () => {
    const navigation = useNavigation();
    const [showOrbitCalendar, setShowOrbitCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [dailyOrbitTasks, setDailyOrbitTasks] = useState([]);
    const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
    
    const calendarOpacity = useRef(new Animated.Value(0)).current;
    const calendarTranslateY = useRef(new Animated.Value(20)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;
    const taskItemOpacity = useRef(new Animated.Value(0)).current;
    const taskItemScale = useRef(new Animated.Value(0.9)).current;
    const planetsOpacity = useRef(new Animated.Value(0)).current;
    const planetsScale = useRef(new Animated.Value(0.5)).current;
    
    const todaysDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (showOrbitCalendar) {
            Animated.parallel([
                Animated.timing(calendarOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(calendarTranslateY, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.out(Easing.back(1.5)),
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(calendarOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(calendarTranslateY, {
                    toValue: 20,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [showOrbitCalendar]);

    useEffect(() => {
        taskItemOpacity.setValue(0);
        taskItemScale.setValue(0.9);
        
        Animated.stagger(100, tasksForSelectedDate.map((_, index) => 
            Animated.parallel([
                Animated.timing(taskItemOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(taskItemScale, {
                    toValue: 1,
                    friction: 7,
                    useNativeDriver: true,
                })
            ])
        )).start();
    }, [tasksForSelectedDate]);

    useEffect(() => {
        if (tasksForSelectedDate.length === 0) {
            Animated.sequence([
                Animated.delay(300),
                Animated.parallel([
                    Animated.timing(planetsOpacity, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.spring(planetsScale, {
                        toValue: 1,
                        friction: 5,
                        useNativeDriver: true,
                    })
                ])
            ]).start();
        } else {
            planetsOpacity.setValue(0);
            planetsScale.setValue(0.5);
        }
    }, [tasksForSelectedDate]);

    useFocusEffect(
        useCallback(() => {
            const fetchTasks = async () => {
                try {
                    const storedTasks = await AsyncStorage.getItem('SAVED_REFLECTIONS_MOTION');
                    if (storedTasks !== null) {
                        const allTasks = JSON.parse(storedTasks);
                        setDailyOrbitTasks(allTasks);
                        
                        const filteredTasks = allTasks.filter(task => {
                            const selected = new Date(selectedDate);
                            const start = new Date(task.startDate);
                            const end = new Date(task.endDate);
                            return selected >= start && selected <= end;
                        });
                        setTasksForSelectedDate(filteredTasks);
                    } else {
                        setDailyOrbitTasks([]);
                        setTasksForSelectedDate([]);
                    }
                } catch (error) {
                    console.error('Error loading tasks from storage:', error);
                }
            };

            fetchTasks();
        }, [selectedDate])
    );

    const handleDateSelect = (day) => {
        setSelectedDate(day.dateString);
        setShowOrbitCalendar(false);
        
        const filteredTasks = dailyOrbitTasks.filter(task => {
            const selected = new Date(day.dateString);
            const start = new Date(task.startDate);
            const end = new Date(task.endDate);
            return selected >= start && selected <= end;
        });
        setTasksForSelectedDate(filteredTasks);
    };

    const formatDisplayDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <View style={commonMotion.container}>

            <Text style={commonMotion.heading}>Insight Space</Text>

            <TouchableOpacity
                style={[
                    commonMotion.setBtn,
                    {
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        marginBottom: 12, 
                        paddingVertical: 16, 
                        paddingHorizontal: 20,
                        zIndex: 5
                    }
                ]}
                onPress={() => setShowOrbitCalendar(prev => !prev)}
                activeOpacity={0.7}
            >
                <Image
                    source={calendarArrow}
                    style={{ width: 24, height: 24, resizeMode: 'contain' }}
                />
                <Text style={commonMotion.textBlue}>{formatDisplayDate(selectedDate)}</Text>
                <Image
                    source={calendarArrow}
                    style={{ width: 24, height: 24, resizeMode: 'contain', transform: [{ rotate: '180deg' }] }}
                />
            </TouchableOpacity>

                <View 
                    style={{
                        width: '100%',
                        backgroundColor: '#0D1F58',
                        borderRadius: 24,
                        overflow: 'hidden',
                        position: 'absolute',
                        top: 190,
                        alignSelf: 'center',
                        zIndex: 10,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        opacity: calendarOpacity,
                        transform: [{ translateY: calendarTranslateY }]
                    }}
                >
                    {showOrbitCalendar && (
                        <Calendar
                            current={selectedDate}
                            onDayPress={handleDateSelect}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true, 
                                    selectedColor: '#F4DF13',
                                    selectedTextColor: '#0D1F58'
                                },
                                [new Date().toISOString().split('T')[0]]: {
                                    marked: true,
                                    dotColor: '#F4DF13'
                                }
                            }}
                            theme={{
                                backgroundColor: '#0D1F58',
                                calendarBackground: '#0D1F58',
                                textSectionTitleColor: '#4D9EFF',
                                selectedDayBackgroundColor: '#F4DF13',
                                selectedDayTextColor: '#0D1F58',
                                todayTextColor: '#F4DF13',
                                dayTextColor: '#FFFFFF',
                                textDisabledColor: '#555',
                                arrowColor: '#4D9EFF',
                                monthTextColor: '#FFFFFF',
                                textDayFontFamily: 'Montserrat',
                                textMonthFontFamily: 'Montserrat',
                                textDayHeaderFontFamily: 'Montserrat',
                                textDayFontWeight: '600',
                                textMonthFontWeight: '600',
                                textDayHeaderFontWeight: '600',
                                textDayFontSize: 12,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 12,
                            }}
                            style={{
                                borderWidth: 0,
                                margin: 0,
                                padding: 0,
                            }}
                        />
                    )}
                </View>

                 <ScrollView 
                        style={{ width: '100%' }}
                    >
                    {tasksForSelectedDate.length > 0 ? (
                        <View style={{width: '100%', marginBottom: 30}}>
                            {tasksForSelectedDate.map((task, index) => (
                                <View></View>
                            ))}
                        </View>
                ) : (
                        <Animated.View 
                            style={{
                                width: '100%',
                                opacity: planetsOpacity,
                                transform: [{ scale: planetsScale }]
                            }}
                        >
                            <Image source={decorationPlanets} style={commonMotion.twoPlanetsImage} />
                            <Text style={commonMotion.title}>{'🪐 No reflection yet today'.toUpperCase()}</Text>
                            <Text style={[commonMotion.textBlue, {textAlign: 'center', marginBottom: 30}]}>
                                Take a moment to pause and align with your Mercury path. Your thoughts are the first step toward clarity.
                            </Text>
                        </Animated.View>
                )}

                <TouchableOpacity
                    style={{alignSelf: 'center'}}
                    onPress={() => navigation.navigate('MercuryWriteReflectionmotion')}
                    activeOpacity={0.7}
                >
                    <Image source={addPlanet} style={commonMotion.yellowActBtn} />
                </TouchableOpacity>

                <View style={{height: 300}} />
            </ScrollView>

        </View>
    );
};

export default MercuryDailyOrbit;