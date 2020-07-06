/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import KeepAwake from 'react-native-keep-awake';
import { initializeSounds } from './src/containers/PerformRoutineScreen/helper';

const Main = () => {
  useEffect(() => {
    initializeSounds();

    KeepAwake.activate();

    return KeepAwake.deactivate();
  }, []);

  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
