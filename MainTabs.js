import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from './Dashboard';
import Notes from './Notes';
import FocusMode from './FocusMode';
import Chat from './Chat';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0A0A0F', borderTopWidth: 0 },
        tabBarActiveTintColor: '#3A6DFF',
        tabBarInactiveTintColor: '#777',
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Notes" component={Notes} />
      <Tab.Screen name="Focus" component={FocusMode} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}
