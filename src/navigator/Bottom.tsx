/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import {BottomNavigation, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          // @ts-ignore
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Records"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Records',
          tabBarIcon: ({color, size}) => {
            return <Icon name="card-text" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
