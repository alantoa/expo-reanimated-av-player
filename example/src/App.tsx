import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { VideoScreen } from './screens';
export type RootParamList = {
  Example: undefined;
};
export type CustomTheme = Theme & {
  transparent: string;
  Main: (opacity: number) => string;
  ActiveMain: (opacity: number) => string;
  Danger: (opacity: number) => string;
  Warning: (opacity: number) => string;
  Info: (opacity: number) => string;
  Success: (opacity: number) => string;
  W: (opacity: number) => string;
  G1: (opacity: number) => string;
  G2: (opacity: number) => string;
  G3: (opacity: number) => string;
  G4: (opacity: number) => string;
  G5: (opacity: number) => string;
  G6: (opacity: number) => string;
  G7: (opacity: number) => string;
  G8: (opacity: number) => string;
  B: (opacity: number) => string;
};

const Stack = createNativeStackNavigator<RootParamList>();

const App = gestureHandlerRootHOC(() => {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Example"
            options={{
              title: 'Example',
              headerShown: false,
            }}
            component={VideoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
});
export default App;
