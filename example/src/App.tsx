import * as React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { VideoScreen } from './video-screen';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <VideoScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
