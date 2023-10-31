import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Keyboard } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useFonts } from 'expo-font';

// I AM BUILDING A APP FOR IOS/ANDROID 
// THE ROLE OF THE APP : MINIMIZE THE MORE POSSIBLE THE FRICTION TO WRITE AN IDEA/A THOUGHT

import { KeyboardAvoidingView } from 'react-native';

export default function App() {
  const [loaded] = useFonts({
    GeistVF: require('./assets/fonts/GeistVF.ttf'),
    GeistBlack: require('./assets/fonts/Geist-Black.otf'),
    GeistBold: require('./assets/fonts/Geist-Bold.otf'),
    GeistLight: require('./assets/fonts/Geist-Light.otf'),
    GeistMedium: require('./assets/fonts/Geist-Medium.otf'),
    GeistRegular: require('./assets/fonts/Geist-Regular.otf'),
    GeistSemiBold: require('./assets/fonts/Geist-SemiBold.otf'),
    GeistThin: require('./assets/fonts/Geist-Thin.otf'),
    GeistUltraBlack: require("./assets/fonts/Geist-UltraBlack.otf"),
    GeistUltraLight: require("./assets/fonts/Geist-UltraLight.otf"),
  })

  const [noteText, setNoteText] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [headerHeight, setHeaderHeight] = useState(Dimensions.get(Platform.OS === 'web' ? "window" : "screen").height * 0.1);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  })

  function buttonAnimation() {
    scale.value = withSpring(1);
  }

  return (
    <View style={styles.appContainer}>
        <View style={[styles.headerSettingsButtonWrapper, 
              {height: headerHeight,
                backgroundColor: 'transparent',
                alignItems: 'center',
              },
              {marginTop: Platform.OS === 'web' ? '0%' : '11%'}
        ]}>
          <TextInput 
            style={[
              styles.inputHeader, 
              Platform.OS === 'web' ? {outlineStyle: 'none'} : {},
              {
                borderStyle: 'solid',
                borderColor: 'rgba(0,0,100,0.1)',
                borderWidth: 1.5,
                borderRadius: 10,
                fontFamily: 'GeistSemiBold',
              }
            ]}
            value={headerText}
            onChangeText={setHeaderText}
            placeholder='Optional title'
            placeholderTextColor={'rgba(0,0,0,0.2)'}
          ></TextInput>
      </View>
      <View style={{
          height: '90%',
          width: '100%',
      }}>
        <KeyboardAvoidingView style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }} behavior='height'>
          <View style={{
            marginBottom: '5%',
            height: '9%',
            width: '90%',
            backgroundColor: 'transparent', 
            flexDirection: 'row',
            display: 'none',
          }}>
            <Text style={{
                fontSize: 17,
                color: 'rgba(0,0,0,0.2)',
                marginRight: '1%',
            }}>keywordOne +</Text>
            <Text style={{
                fontSize: 17,
                color: 'rgba(0,0,0,0.2)',
                marginRight: '1%',
            }}>keywordTwo+</Text>
            <Text style={{
                fontSize: 17,
                color: 'rgba(0,0,0,0.2)',
                marginRight: '1%',
            }}>keywordThree +</Text>
          </View>
          <View style={{
            height: '62.5%',
            width: '90%',
            //backgroundColor: 'red',
            flexDirection: 'column',
            borderStyle: 'solid',
            borderColor: 'rgba(0,0,100,0.1)',
            borderWidth: 2,
            borderRadius: 10,
          }}>
            <TextInput 
              style={[
                styles.inputNote,
                Platform.OS === 'web' ? {outlineStyle: 'none'} : {},
                {
                  backgroundColor: 'transparent',
                  textAlignVertical: 'bottom',
                  marginBottom: '2.5%',
                  padding: 8.5,
                  fontFamily: 'GeistRegular',
              },
              ]}
              value={noteText}
              placeholder='Just start typing...'
              placeholderTextColor={'#909090'}
              onChangeText={setNoteText}
              autoFocus={true}
              multiline={true} 
            >
            </TextInput>
            <Animated.View style={[animatedStyle, {
              marginTop: '1%',
              height: '10%',
              width: '103%',
              alignItems: 'flex-end',
            }]}>
              <Pressable onPress={buttonAnimation} style={[{
                  width: '15%',
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'rgba(90, 245, 90, 0.25)',
              }]}>
                <Text style={{
                  fontSize: 18,
                  color: 'rgba(10, 10, 10, 0.7)'
                }}>{'\u2714'}</Text>
              </Pressable>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  headerSettingsButtonWrapper: {
    flexDirection: 'row',
    height: '10%',
    width: '90%',
    marginbottom: '5%',
  },
  inputHeader: {
    height: '70%',
    width: '80%',
    fontSize: 20,
    borderWidth: 0,
    padding: 8.5,
  },
  inputNote: {
    height: '100%',
    width: '96%',
    fontSize: 18,
  },
});
