import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Image, Text, ScrollView, TextInput, Modal } from "react-native";
import { blueGradient, commonMotion, formMotion, yellowGradient } from "../leadconstmercury/leadstylesmotion";
import { backMotion, calendarArrow } from "../leadconstmercury/leadimagesmotion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { Calendar } from 'react-native-calendars';
import { useState } from "react";

const MercuryWriteReflection = () => {
    const navigation = useNavigation();
    
    const [motionTask, setMotionTask] = useState("");
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    
    const [showCalendar, setShowCalendar] = useState(false);
    
    const formatDisplayDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleDateSelect = (day) => {
        setStartDate(day.dateString)
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
        
        try {
            const storedTasks = await AsyncStorage.getItem('SAVED_REFLECTIONS_MOTION');
            const tasks = storedTasks ? JSON.parse(storedTasks) : [];

            const newTask = {
                id: Date.now().toString(),
                title: motionTask.trim(),
                startDate,
                createdAt: new Date().toISOString()
            };

            const updatedTasks = [...tasks, newTask];
            await AsyncStorage.setItem('SAVED_REFLECTIONS_MOTION', JSON.stringify(updatedTasks));
            
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
            <Text style={commonMotion.heading}>Write Reflection</Text>

            <ScrollView 
                style={{ width: '100%', marginTop: 20 }}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text style={formMotion.motionLabel}>What would help you stay in motion today?</Text>
                <TextInput
                    value={motionTask}
                    onChangeText={setMotionTask}
                    style={formMotion.motionInput}
                    placeholder="Enter your task"
                    placeholderTextColor="#818181"
                    autoFocus
                />

                <Text style={formMotion.motionLabel}>Write what’s on your mind</Text>
                <TextInput
                    value={motionTask}
                    onChangeText={setMotionTask}
                    style={[formMotion.motionInput, { height: 155, borderRadius: 20}]}
                    placeholder="Enter your task"
                    placeholderTextColor="#818181"
                    autoFocus
                />

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
                    style={[commonMotion.button, { marginTop: 40 }]}
                    onPress={handleSaveTask}
                >
                    <LinearGradient
                        colors={(motionTask) ? yellowGradient : blueGradient}
                        style={commonMotion.gradient}
                    >
                        <Text style={commonMotion.buttonText}>Add Task</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>

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

export default MercuryWriteReflection;