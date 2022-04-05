import * as React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import VideoPlayer from 'expo-av-player';
import { videoInfo } from './constants';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const { width } = Dimensions.get('window');
const VIDEO_DEFAULT_HEIGHT = width * (9 / 16);

export const VideoScreen = () => {
  const videoHeight = useSharedValue(VIDEO_DEFAULT_HEIGHT);
  const isFullScreen = useSharedValue(false);
  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayer
        source={videoInfo.source}
        headerBarTitle={`${videoInfo.author} - ${videoInfo.title}`}
        onToggleAutoPlay={(state: boolean) => {
          console.log(`onToggleAutoPlay state: ${state}`);
        }}
        videoDefaultHeight={VIDEO_DEFAULT_HEIGHT}
        videoHeight={videoHeight}
        resizeMode="cover"
        isFullScreen={isFullScreen}
        onTapBack={() => {
          console.log('onTapBack');
        }}
        onTapMore={() => {
          console.log('onTapMore');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
