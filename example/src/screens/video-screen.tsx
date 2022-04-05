import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import {
  Dimensions,
  Image,
  ImageStyle,
  PixelRatio,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Text, ThemeView } from '../components';
import { palette } from '../theme/palette';
import VideoPlayer, { ExpoAvPlayerRef } from 'expo-av-player';
import { Icon } from '../components/icon';

const sliderTranslateY = 6;
const px2dp = (px: number) => PixelRatio.roundToNearestPixel(px);
const { width, height } = Dimensions.get('window');
const VIDEO_DEFAULT_HEIGHT = width * (9 / 16);
const videoInfo = {
  title: 'Billie Eilish - Bad Guy - When We All Fall Asleep, Where Do We Go?',
  author: 'Billie Eilish',
  avatar: require('../assets/avatar.jpeg'),
  source: require('../assets/video-demo.mp4'),
  desc: `A react native video player components demo, this is desc`,
  createTime: '2 years ago',
};
const flexRow: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
const Avatar = ({
  size,
  style,
}: {
  size: number;
  style?: StyleProp<ImageStyle>;
}) => (
  <Image
    source={videoInfo.avatar}
    style={[{ width: size, height: size, borderRadius: size }, style]}
  />
);

export const VideoScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors, dark } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const fullViewHeight = height - VIDEO_DEFAULT_HEIGHT - insets.top;
  const index = useRef(0);
  const indexValue = useSharedValue(0);
  const videoHeight = useSharedValue(VIDEO_DEFAULT_HEIGHT);
  const isFullScreen = useSharedValue(false);
  const videoPlayerRef = useRef<ExpoAvPlayerRef>(null);
  const onOpen = () => {
    videoPlayerRef.current?.setPause();
    bottomSheetModalRef.current?.present();
  };
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.8}
        {...props}
      />
    ),
    []
  );
  const getDividerStyle = (): ViewStyle => {
    return {
      borderBottomWidth: px2dp(0.5),
      borderColor: colors.border,
    };
  };
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'top']}>
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
      <View
        style={[
          {
            backgroundColor: colors.background,
          },
          styles.sliderTranslate,
        ]}
      />
      <BottomSheetModalProvider>
        <View style={[{ backgroundColor: colors.background }, styles.body]}>
          <ScrollView contentContainerStyle={styles.full}>
            <TouchableHighlight
              underlayColor={dark ? palette.G5(0.6) : palette.G2(0.6)}
              onPress={onOpen}
            >
              <View style={[styles.titleContainer, getDividerStyle()]}>
                <Text h4 tx={videoInfo?.title} style={styles.title} />
                <Icon
                  name="a-ic_chevrondown_16"
                  size={16}
                  color={colors.text}
                />
              </View>
            </TouchableHighlight>
            <View style={[flexRow, styles.authors, getDividerStyle()]}>
              <View style={flexRow}>
                <Avatar size={40} style={{ marginRight: 12 }} />
                <View>
                  <Text tx={videoInfo.author} t1 />
                  <Text>
                    <Text
                      tx={`44.7M `}
                      t4
                      color={dark ? palette.G3(1) : palette.G5(1)}
                    />
                    <Text
                      tx={`subscribers`}
                      t5
                      color={dark ? palette.G3(1) : palette.G5(1)}
                    />
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  tx={`SUBSCRIBED`}
                  h5
                  color={dark ? palette.G3(1) : palette.G5(1)}
                />
              </View>
            </View>
          </ScrollView>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={index.current}
            snapPoints={[fullViewHeight]}
            backdropComponent={renderBackdrop}
            animatedIndex={indexValue}
            backgroundStyle={{ backgroundColor: colors.background }}
            handleStyle={{
              backgroundColor: 'red',
            }}
            handleComponent={() => (
              <ThemeView style={styles.modalHeader}>
                <View style={styles.header}>
                  <View
                    style={[
                      styles.block,
                      { backgroundColor: dark ? palette.G5(1) : palette.G2(1) },
                    ]}
                  />
                </View>
                <View style={[styles.handleTitle, getDividerStyle()]}>
                  <Text
                    tx="Description"
                    h3
                    color={dark ? palette.W(1) : palette.G9(1)}
                  />
                  <Text
                    tx={videoInfo.createTime}
                    t3
                    color={dark ? palette.W(1) : palette.G9(1)}
                  />
                </View>
              </ThemeView>
            )}
          >
            <BottomSheetScrollView
              contentContainerStyle={[
                styles.desc,
                {
                  paddingBottom: insets.bottom + 44,
                  backgroundColor: colors.background,
                },
              ]}
            >
              <Text tx={videoInfo.title} t3 tBold style={{ marginTop: 12 }} />

              <View style={[styles.descInfo, getDividerStyle()]}>
                <Avatar size={20} style={styles.avatar} />
                <Text tx={videoInfo.author} t3 tBold />
              </View>
              <Text tx={videoInfo.desc} h4 style={{ marginVertical: 12 }} />
            </BottomSheetScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  authors: {
    justifyContent: 'space-between',
    marginTop: 12,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  avatar: {
    marginRight: 6,
  },
  boards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    backgroundColor: palette.B(1),
    flex: 1,
    overflow: 'hidden',
  },
  desc: {
    paddingHorizontal: 20,
  },
  descInfo: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    paddingBottom: 12,
  },
  full: {
    flex: 1,
  },
  handleTitle: {
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  options: {
    justifyContent: 'space-between',
    marginTop: 32,
  },

  title: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  view: {
    overflow: 'hidden',
    width,
  },
  header: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    width,
  },
  block: {
    borderRadius: 2,
    height: 3,
    width: 40,
  },
  sliderTranslate: {
    height: sliderTranslateY,
    zIndex: -1,
    elevation: -1,
  },
  body: {
    flex: 1,
  },
});
