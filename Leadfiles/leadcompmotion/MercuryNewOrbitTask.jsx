import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Image, Text, ScrollView, TextInput, Modal } from "react-native";
import { blueGradient, commonMotion, formMotion, yellowGradient } from "../leadconstmercury/leadstylesmotion";
import { backMotion, calendarArrow } from "../leadconstmercury/leadimagesmotion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { Calendar } from 'react-native-calendars';
import { useState } from "react";

const MercuryNewOrbitTask = () => {
    const navigation = useNavigation();
    
    const [motionTask, setMotionTask] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Select Category");
    const [selectedFrequency, setSelectedFrequency] = useState("Select Frequency");
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    
    const [showCategory, setShowCategory] = useState(false);
    const [showFrequency, setShowFrequency] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarType, setCalendarType] = useState("");
    
    const categories = ["Focus", "Habit", "Self-care", "Study", "Freeform"];
    const frequencies = ["Daily", "Weekly", "Monthly"];

    const formatDisplayDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleDateSelect = (day) => {
        if (calendarType === 'start') {
            setStartDate(day.dateString);
        } else {
            setEndDate(day.dateString);
        }
        setShowCalendar(false);
    };

    const handleSaveTask = async () => {
        if (!motionTask.trim() || 
            selectedCategory === "Select Category" || 
            selectedFrequency === "Select Frequency") {
            alert("Please fill all required fields");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (endDate < today) {
            alert("End date cannot be in the past");
            return;
        }
        
        if (end < start) {
            alert("End date must be after start date");
            return;
        }

        try {
            const storedTasks = await AsyncStorage.getItem('MOTION_TASKS_ORBIT');
            const tasks = storedTasks ? JSON.parse(storedTasks) : [];

            const newTask = {
                id: Date.now().toString(),
                title: motionTask.trim(),
                category: selectedCategory,
                frequency: selectedFrequency,
                startDate,
                endDate,
                completed: false,
                createdAt: new Date().toISOString()
            };

            const updatedTasks = [...tasks, newTask];
            await AsyncStorage.setItem('MOTION_TASKS_ORBIT', JSON.stringify(updatedTasks));
            
            console.log("Task saved successfully:", newTask);
            navigation.goBack();
        } catch (error) {
            console.error("Error saving task:", error);
            alert("Failed to save task. Please try again.");
        }
    };

    return (
        <View style={commonMotion.container}>

            <TouchableOpacity
                style={{position: 'absolute', top: 0, left: 0}}
                onPress={() => navigation.goBack()}
            >
                <Image source={backMotion} style={commonMotion.backBtn} />
            </TouchableOpacity>
            <Text style={commonMotion.heading}>New Orbit Task</Text>

            <ScrollView 
                style={{ width: '100%', marginTop: 20 }}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text style={formMotion.motionLabel}>What's your task?</Text>
                <TextInput
                    value={motionTask}
                    onChangeText={setMotionTask}
                    style={formMotion.motionInput}
                    placeholder="Enter your task"
                    placeholderTextColor="#818181"
                    autoFocus
                />

                <TouchableOpacity 
                    style={[commonMotion.setBtn, {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 20, marginBottom: 12}]}
                    onPress={() => setShowCategory(true)}
                >
                    <Text style={commonMotion.textBlue}>Category</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={commonMotion.textBlue}>{selectedCategory}</Text>
                        <Image 
                            source={calendarArrow} 
                            style={{width: 24, height: 24, resizeMode: 'contain', transform: [{ rotate: '180deg' }]}} 
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[commonMotion.setBtn, {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 20, marginBottom: 12}]}
                    onPress={() => {
                        setCalendarType('start');
                        setShowCalendar(true);
                    }}
                >
                    <Text style={commonMotion.textBlue}>Start Date</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={commonMotion.textBlue}>{formatDisplayDate(startDate)}</Text>
                        <Image 
                            source={calendarArrow} 
                            style={{width: 24, height: 24, resizeMode: 'contain', transform: [{ rotate: '180deg' }]}} 
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[commonMotion.setBtn, {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 20, marginBottom: 12}]}
                    onPress={() => {
                        setCalendarType('end');
                        setShowCalendar(true);
                    }}
                >
                    <Text style={commonMotion.textBlue}>End Date</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={commonMotion.textBlue}>{formatDisplayDate(endDate)}</Text>
                        <Image 
                            source={calendarArrow} 
                            style={{width: 24, height: 24, resizeMode: 'contain', transform: [{ rotate: '180deg' }]}} 
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[commonMotion.setBtn, {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 20, marginBottom: 12}]}
                    onPress={() => setShowFrequency(true)}
                >
                    <Text style={commonMotion.textBlue}>Frequency</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={commonMotion.textBlue}>{selectedFrequency}</Text>
                        <Image 
                            source={calendarArrow} 
                            style={{width: 24, height: 24, resizeMode: 'contain', transform: [{ rotate: '180deg' }]}} 
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[commonMotion.button, { marginTop: 40 }]}
                    onPress={handleSaveTask}
                >
                    <LinearGradient
                        colors={(motionTask && selectedCategory !== "Select Category" && selectedFrequency !== "Select Frequency") ? yellowGradient : blueGradient}
                        style={commonMotion.gradient}
                    >
                        <Text style={commonMotion.buttonText}>Add Task</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={showCategory}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowCategory(false)}
            >
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'
                }}>
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: '#0D1F58',
                        borderRadius: 24,
                        padding: 20
                    }}>
                        <Text style={commonMotion.title}>Select Category</Text>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    selectedCategory === category ? { borderRadius: 100, borderColor: '#F4DF13', borderWidth: 1, marginVertical: 5, padding: 10, paddingHorizontal: 20 }
                                        :  { borderRadius: 100, borderColor: '#4D9EFF', borderWidth: 1, marginVertical: 5, padding: 10, paddingHorizontal: 20 }
                                ]}
                                onPress={() => {
                                    setSelectedCategory(category);
                                    setShowCategory(false);
                                }}
                            >
                                <Text style={commonMotion.textBlue}>{category}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={{padding: 10, marginTop: 10}}
                            onPress={() => setShowCategory(false)}
                        >
                            <Text style={[commonMotion.textBlue, {fontWeight: '800', color: '#FCB401', textAlign: 'center'}]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showFrequency}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowFrequency(false)}
            >
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'
                }}>
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: '#0D1F58',
                        borderRadius: 24,
                        padding: 20
                    }}>
                        <Text style={commonMotion.title}>Select Frequency</Text>
                        {frequencies.map((frequency) => (
                            <TouchableOpacity
                                key={frequency}
                                style={[
                                    selectedFrequency === frequency ? { borderRadius: 100, borderColor: '#F4DF13', borderWidth: 1, marginVertical: 5, padding: 10, paddingHorizontal: 20 }
                                        :  { borderRadius: 100, borderColor: '#4D9EFF', borderWidth: 1, marginVertical: 5, padding: 10, paddingHorizontal: 20 }
                                ]}
                                onPress={() => {
                                    setSelectedFrequency(frequency);
                                    setShowFrequency(false);
                                }}
                            >
                                <Text style={commonMotion.textBlue}>{frequency}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={{padding: 10, marginTop: 10}}
                            onPress={() => setShowFrequency(false)}
                        >
                            <Text style={[commonMotion.textBlue, {fontWeight: '800', color: '#FCB401', textAlign: 'center'}]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showCalendar}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowCalendar(false)}
            >
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'
                }}>
                    <View style={{
                        width: '90%',
                        backgroundColor: '#0D1F58',
                        borderRadius: 24,
                        padding: 20,
                    }}>
                        <Calendar
                            current={calendarType === 'start' ? startDate : endDate}
                            onDayPress={handleDateSelect}
                            markedDates={{
                                [calendarType === 'start' ? startDate : endDate]: {
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
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default MercuryNewOrbitTask;