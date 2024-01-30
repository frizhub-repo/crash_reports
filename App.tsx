import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import { AppState } from 'react-native';
import { startBackgroundLocationSync } from './LocationService';

const APP_STATE = {
  ACTIVE: 'active',
  BACKGROUND: 'background',
  INACTIVE: 'inactive',
};

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [active, setActive] = useState(false);

  const handleAppStateChange = (nextAppState:any) => {
    setAppState(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      //@ts-ignore
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      
      if (foregroundStatus === 'granted' && backgroundStatus === 'granted' && appState === APP_STATE.ACTIVE) {
        setActive(true);
      }
    })();
  }, [appState]);

  useEffect(() => {
    if (active && appState === APP_STATE.ACTIVE) {
      startBackgroundLocationSync();
    }
  }, [active, appState]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
