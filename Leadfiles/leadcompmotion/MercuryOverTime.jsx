import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonMotion } from "../leadconstmercury/leadstylesmotion";
import { calendarOvertime, completedOvertime, decorationPlanets, goalsOvertime, reflectionsOvertime } from "../leadconstmercury/leadimagesmotion";
import { useState, useCallback } from "react";
import { BarChart } from "react-native-chart-kit";

const MercuryOverTime = () => {
    const [tasks, setTasks] = useState([]);
    const [reflectionsCount, setReflectionsCount] = useState(0);
    const [stats, setStats] = useState({
        daysWithTasks: 0,
        totalTasksCompleted: 0,
        totalTasks: 0
    });
    const [chartData, setChartData] = useState(null);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const storedTasks = await AsyncStorage.getItem('MOTION_TASKS_ORBIT');
                    let allTasks = [];
                    if (storedTasks !== null) {
                        allTasks = JSON.parse(storedTasks);
                        setTasks(allTasks);
                    }

                    const storedReflections = await AsyncStorage.getItem('SAVED_REFLECTIONS_MOTION');
                    let allReflections = [];
                    if (storedReflections !== null) {
                        allReflections = JSON.parse(storedReflections);
                        setReflectionsCount(allReflections.length);
                    }

                    processActivityData(allTasks, allReflections);

                } catch (error) {
                    console.error('Error loading data:', error);
                }
            };

            fetchData();
        }, [])
    );

    const processActivityData = (tasks, reflections) => {
        const taskDates = {};
        const reflectionDates = {};
        
        tasks.forEach(task => {
            const date = new Date(task.startDate).toDateString();
            taskDates[date] = (taskDates[date] || 0) + 1;
            
            if (task.completed) {
                const completedDate = new Date(task.completedDate).toDateString();
                taskDates[completedDate] = (taskDates[completedDate] || 0) + 1;
            }
        });
        
        reflections.forEach(reflection => {
            const date = new Date(reflection.date).toDateString();
            reflectionDates[date] = (reflectionDates[date] || 0) + 1;
        });
        
        const allDates = new Set([
            ...Object.keys(taskDates),
            ...Object.keys(reflectionDates)
        ]);
        
        const sortedDates = Array.from(allDates)
            .map(date => new Date(date))
            .sort((a, b) => b - a) // Sort newest first
            .reverse(); // Reverse to show oldest first
        
        const labels = sortedDates.map(date => {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            return `${day} ${month}`;
        });
        
        const taskData = sortedDates.map(date => {
            const dateStr = date.toDateString();
            return taskDates[dateStr] || 0;
        });
        
        const reflectionData = sortedDates.map(date => {
            const dateStr = date.toDateString();
            return reflectionDates[dateStr] || 0;
        });
        
        const combinedData = sortedDates.map(date => {
            const dateStr = date.toDateString();
            return (taskDates[dateStr] && reflectionDates[dateStr]) ? 
                Math.min(taskDates[dateStr], reflectionDates[dateStr]) : 0;
        });
        
        setStats({
            daysWithTasks: Object.keys(taskDates).length,
            totalTasksCompleted: tasks.filter(t => t.completed).length,
            totalTasks: tasks.length
        });
        
        setChartData({
            labels,
            datasets: [
                {
                    data: taskData,
                    colors: Array(taskData.length).fill((opacity = 1) => `rgba(77, 158, 255, ${opacity})`) // #4D9EFF
                },
                {
                    data: reflectionData,
                    colors: Array(reflectionData.length).fill((opacity = 1) => `rgba(255, 204, 58, ${opacity})`) // #FFCC3A
                },
                {
                    data: combinedData,
                    colors: Array(combinedData.length).fill((opacity = 1) => `rgba(128, 199, 171, ${opacity})`) // #80C7AB
                }
            ]
        });
    };
    
    return (
        <View style={commonMotion.container}>
            <Text style={commonMotion.heading}>Your orbit in motion over time</Text>

            <ScrollView style={{width: '100%'}}>
                {tasks.length === 0 ? (
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Image source={decorationPlanets} style={commonMotion.twoPlanetsImage} />
                        <Text style={commonMotion.title}>{'🌌 No Data Yet'.toUpperCase()}</Text>
                        <Text style={[commonMotion.textBlue, {textAlign: 'center', marginBottom: 30}]}>
                            Your orbit hasn't begun — yet. Once you start completing tasks, writing reflections, and reaching your goals, this space will come alive with your motion.
                        </Text>
                    </View>
                ) : (
                    <ScrollView style={{ width: '100%' }}>
                        {/* Stats cards remain the same */}
                        <View style={[commonMotion.row, {width: '100%', justifyContent: 'space-between'}]}>
                            <View style={[commonMotion.setBtn, { marginBottom: 20, padding: 20, borderRadius: 20, width: '48%', alignItems: 'flex-start', height: 140, justifyContent: 'space-between' }]}>
                                <View style={[commonMotion.row, {marginBottom: 15}]}>
                                    <Image source={calendarOvertime} style={{width: 30, height: 30, resizeMode: 'contain', marginRight: 10}} />
                                    <Text style={[commonMotion.title, {fontWeight: '800'}]}>
                                        {stats.daysWithTasks}
                                    </Text>
                                </View>
                                <Text style={[commonMotion.textWhite, { textAlign: 'left'}]}>
                                    Active days
                                </Text>
                            </View>

                            <View style={[commonMotion.setBtn, { marginBottom: 20, padding: 20, borderRadius: 20, width: '48%', alignItems: 'flex-start', height: 140, justifyContent: 'space-between' }]}>
                                <View style={[commonMotion.row, {marginBottom: 15}]}>
                                    <Image source={completedOvertime} style={{width: 30, height: 30, resizeMode: 'contain', marginRight: 10}} />
                                    <Text style={[commonMotion.title, { fontWeight: '800' }]}>
                                        {stats.totalTasksCompleted} / {stats.totalTasks}
                                    </Text>
                                </View>
                                <Text style={[commonMotion.textWhite, { textAlign: 'left'}]}>
                                    Tasks Completed
                                </Text>
                            </View>

                            <View style={[commonMotion.setBtn, { padding: 20, borderRadius: 20, width: '48%', alignItems: 'flex-start', height: 140, justifyContent: 'space-between' }]}>
                                <View style={[commonMotion.row, {marginBottom: 15}]}>
                                    <Image source={goalsOvertime} style={{width: 30, height: 30, resizeMode: 'contain', marginRight: 10}} />
                                    <Text style={[commonMotion.title, {fontWeight: '800'}]}>
                                        {calculateCurrentStreak(tasks)}
                                    </Text>
                                </View>
                                <Text style={[commonMotion.textWhite, { textAlign: 'left'}]}>
                                    Tasks Streak
                                </Text>
                            </View>

                            <View style={[commonMotion.setBtn, { padding: 20, borderRadius: 20, width: '48%', alignItems: 'flex-start', height: 140, justifyContent: 'space-between' }]}>
                                <View style={[commonMotion.row, {marginBottom: 15}]}>
                                    <Image source={reflectionsOvertime} style={{width: 30, height: 30, resizeMode: 'contain', marginRight: 10}} />
                                    <Text style={[commonMotion.title, {fontWeight: '800'}]}>
                                        {reflectionsCount}
                                    </Text>
                                </View>
                                <Text style={[commonMotion.textWhite, { textAlign: 'left'}]}>
                                    Reflections saved
                                </Text>
                            </View>
                        </View>
                    
                        <Text style={[commonMotion.heading, {marginTop: 40, marginBottom: 25}]}>Daily Orbit Activity</Text>
                        
                        {chartData && (
                            <>
                                <ScrollView 
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingVertical: 10 }}
                                >
                                    <BarChart
                                        data={chartData}
                                        width={Math.max(Dimensions.get('window').width, chartData.labels.length * 60)} // Dynamic width
                                        height={220}
                                        yAxisLabel=""
                                        chartConfig={{
                                            backgroundColor: '#0D1F58',
                                            backgroundGradientFrom: '#0D1F58',
                                            backgroundGradientTo: '#0D1F58',
                                            decimalPlaces: 0,
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "4",
                                                strokeWidth: "2",
                                                stroke: "#0D1F58"
                                            },
                                            barPercentage: 0.5,
                                            propsForBackgroundLines: {
                                                stroke: '#1A2D6E'
                                            }
                                        }}
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16,
                                        }}
                                        fromZero
                                        showBarTops={false}
                                        withCustomBarColorFromData={true}
                                        flatColor={true}
                                    />
                                </ScrollView>
                                
                                <View style={[commonMotion.row, { justifyContent: 'center', marginTop: 20 }]}>
                                    <View style={[commonMotion.row, { alignItems: 'center', marginRight: 15 }]}>
                                        <View style={{ width: 12, height: 12, backgroundColor: '#4D9EFF', marginRight: 5 }} />
                                        <Text style={commonMotion.textWhite}>Tasks</Text>
                                    </View>
                                    <View style={[commonMotion.row, { alignItems: 'center', marginRight: 15 }]}>
                                        <View style={{ width: 12, height: 12, backgroundColor: '#FFCC3A', marginRight: 5 }} />
                                        <Text style={commonMotion.textWhite}>Reflections</Text>
                                    </View>
                                    <View style={[commonMotion.row, { alignItems: 'center' }]}>
                                        <View style={{ width: 12, height: 12, backgroundColor: '#80C7AB', marginRight: 5 }} />
                                        <Text style={commonMotion.textWhite}>Both</Text>
                                    </View>
                                </View>
                            </>
                        )}

                        <Text style={[commonMotion.textWhite, { textAlign: 'center', marginTop: 20 }]}>
                            Discipline is building under the surface
                        </Text>

                        <View style={{height: 250}} />
                    </ScrollView>
                )}
            </ScrollView>
        </View>
    );
};

const calculateCurrentStreak = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    
    const completedDates = new Set();
    tasks.forEach(task => {
        if (task.completed && task.completedDate) {
            const date = new Date(task.completedDate).toDateString();
            completedDates.add(date);
        }
    });
    
    const sortedDates = Array.from(completedDates)
        .map(date => new Date(date))
        .sort((a, b) => b - a);
    
    if (sortedDates.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();
    
    if (!completedDates.has(todayStr) && !completedDates.has(yesterdayStr)) {
        return 0;
    }
    
    for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i - 1]);
        const currentDate = new Date(sortedDates[i]);
        
        const diffTime = prevDate - currentDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        if (diffDays === 1) {
            streak++;
        } else if (diffDays > 1) {
            break;
        }
    }
    
    return streak;
};

export default MercuryOverTime;