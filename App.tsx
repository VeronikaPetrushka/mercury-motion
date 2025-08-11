import React, { JSX } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  MercuryCatchShinemotion,
  MercuryDailyOrbitmotion,
  MercuryInsightSpacemotion,
  MercuryMotionmotion,
  MercuryNewOrbitTaskmotion,
  MercuryOrbitsInfomotion,
  MercuryOverTimemotion,
  MercuryReadInsightSpacenmotion,
  MercuryReadyCatchmotion,
  MercurySetMotionmotion,
  MercuryWriteReflectionmotion
} from './Leadfiles/leadglobalmotion/MercuryCompMotion';

export type RootStackParamList = {
    MercuryCatchShinemotion: undefined,
    MercuryDailyOrbitmotion: undefined,
    MercuryInsightSpacemotion: undefined,
    MercuryMotionmotion: undefined,
    MercuryNewOrbitTaskmotion: undefined,
    MercuryOrbitsInfomotion: undefined,
    MercuryOverTimemotion: undefined,
    MercuryReadInsightSpacenmotion: undefined,
    MercuryReadyCatchmotion: undefined,
    MercurySetMotionmotion: undefined,
    MercuryWriteReflectionmotion: undefined
};

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {

  return (
      <NavigationContainer>
            <Stack.Navigator
                initialRouteName="MercuryMotionmotion"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="MercuryMotionmotion"
                    component={MercuryMotionmotion}
                />
                <Stack.Screen
                    name="MercuryCatchShinemotion"
                    component={MercuryCatchShinemotion}
                />
                <Stack.Screen
                    name="MercuryDailyOrbitmotion"
                    component={MercuryDailyOrbitmotion}
                />
                <Stack.Screen
                    name="MercuryInsightSpacemotion"
                    component={MercuryInsightSpacemotion}
                />
                <Stack.Screen
                    name="MercuryNewOrbitTaskmotion"
                    component={MercuryNewOrbitTaskmotion}
                />
                <Stack.Screen
                    name="MercuryOrbitsInfomotion"
                    component={MercuryOrbitsInfomotion}
                />
                <Stack.Screen
                    name="MercuryOverTimemotion"
                    component={MercuryOverTimemotion}
                />
                <Stack.Screen
                    name="MercuryReadInsightSpacenmotion"
                    component={MercuryReadInsightSpacenmotion}
                />
                <Stack.Screen
                    name="MercuryReadyCatchmotion"
                    component={MercuryReadyCatchmotion}
                /><Stack.Screen
                    name="MercurySetMotionmotion"
                    component={MercurySetMotionmotion}
                />
                <Stack.Screen
                    name="MercuryWriteReflectionmotion"
                    component={MercuryWriteReflectionmotion}
                />
            </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;