import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View, Dimensions, Keyboard, useWindowDimensions, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { BlurView } from 'expo-blur';

// REACT NATIVE APP

export default function App() {
    const DARK_BACKGROUD = '#222120';
    const LIGHT_BACKGROUND = '#FFF9F3';

    const DARK_CARD = '#101010';
    const LIGHT_CARD = '#ECECEC';

    const DARK_LOGO = '#0085FF';
    const LIGHT_LOGO = '#001AFF';

    const DARK_NOTE_TITLE = '#E6E6E6';
    const LIGHT_NOTE_TITLE = '#1C1C1C';

    const DARK_NOTE_TITLE_PLACEHOLDER = '#F2F2F2';
    const LIGHT_NOTE_TITLE_PLACEHOLDER = '#D6D6D6';

    const DARK_NOTE_TEXT_PLACEHOLDER = '#E6E6E6'
    const LIGHT_NOTE_TEXT_PLACEHOLDER = '#5F5F5F'

    const DARK_NOTE_TEXT = '#E6E6E6'
    const LIGHT_NOTE_TEXT = '#1C1C1C'

    const DARK_DONE_BUTTON_CHECKMARK = '#D4FFD0'
    const LIGHT_DONE_BUTTON_CHECKMARK = '#222B21'

    const DARK_BACKGROUND_DONE_BUTTON = '#222B21'
    const LIGHT_BACKGROUND_DONE_BUTTON = '#F3F8F2'

    const DARK_SETTINGS_BACK_BUTTON_ICON = '#444444'
    const LIGHT_SETTINGS_BACK_BUTTON_ICON = '#E2E2E2'

    const DARK_BACKGROUND_SETTINGS_BACK_BUTTON = '#444444'
    const LIGHT_BACKGROUND_SETTINGS_BACK_BUTTON = '#F3F3F3'

    const DARK_SETTINGS_BACKGROUND_CONTAINER = '#0F0F0F'
    const LIGHT_SETTINGS_BACKGROUND_CONTAINER = '#FAFAFA'

    const DARK_SETTINGS_CONTAINER_TEXT = '#DBDADA'
    const LIGHT_SETTINGS_CONTAINTER_TEXT = '#292929'

    const DARK_SETTINGS_HEADER = '#292929'
    const LIGHT_SETTINGS_HEADER = '#DBDADA'

    const DARK_BACKGROUND_NOTE_DONE = '#0C0C0C';
    const LIGHT_BACKGROUND_NOTE_DONE = '#F3F8F2';

    const LIGHT_SPACER  = '#F2F2F6';
    const DARK_SPACER = '#151515';

    const [isDarkModeActive, setIsDarkModeActive] = useState(false);

    const {height, width} = useWindowDimensions();
    const [logoWrapperWrapperHeight, setLogoWrapperHeight] = useState(height * 0.125);
    const [noteTitleAndButtonHeight, setNoteTitleAndButtonHeight] = useState(height * 0.08);
    const [spacerWrapperHeight, setSpacerWrapperHeight] = useState(height * 0.03)


    //setStatusBarBackgroundColor('rgba(255,255,255,0.5)');
    // listen to dimension change
    useEffect(() => {
    }, []);

    return (
        <View style={[styles.appContainer, {
            backgroundColor: isDarkModeActive ? '#222120' : '#FFF9F3',
            overflow: 'hidden'
        }]}>
                <View style={[styles.logoWrapperWrapper, {
                        height: logoWrapperWrapperHeight,
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }]}>
                    <View style={[styles.logoWrapper, {
                        height: logoWrapperWrapperHeight * (Platform.OS === 'ios' ? 0.38 : 0.47),
                    }]}>
                        <Text style={[styles.logoText, {
                            opacity: 0.05,
                            color: isDarkModeActive ? DARK_LOGO : LIGHT_LOGO,
                        }]}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                        >QckNote</Text>
                    </View>
                    <BlurView intensity={Platform.OS === 'ios' ? 8 : 4} style={[styles.blurLogoText,{
                            // If there is lag, check this BlurView
                    }]}>
                    </BlurView>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'}
                    style={[styles.cardWrapper,
                    {
                        height: '87.5%',
                        width: '100%',
                    }
                ]}>
                    <View
                        style={[styles.card, {
                            height: '90%',
                            backgroundColor: isDarkModeActive ? DARK_CARD : LIGHT_CARD,
                        }]}>
                        <View style={[styles.noteTitleAndButtonWrapper, {
                            height: noteTitleAndButtonHeight,
                        }]}>
                            <View style={[styles.noteTitleWrapper, {
                            }]}>
                                <TextInput placeholder='Optional title..' 
                                    placeholderTextColor={isDarkModeActive ? DARK_NOTE_TITLE_PLACEHOLDER : LIGHT_NOTE_TITLE_PLACEHOLDER} 
                                    style={[styles.noteTitle, {
                                        marginTop: '5%',
                                        height: '100%',
                                        fontSize: noteTitleAndButtonHeight * 0.36,
                                        left: '-1%',
                                        color: isDarkModeActive ? DARK_NOTE_TITLE : LIGHT_NOTE_TITLE,
                                    }]}
                                ></TextInput>
                            </View>
                            <View style={[styles.settingsButtonWrapper,
                                {
                                }
                            ]}>
                                <Pressable style={[styles.settingsButton,
                                    {
                                    }
                                ]}>
                                    <Image source={require('./assets/SettingsIcon.png')} style={[styles.settingsButtonIcon, {
                                    }]}></Image>
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.spacerWrapper,
                            {
                                height: spacerWrapperHeight,
                            }
                        ]}>
                            <View style={[styles.spacer,
                                {
                                    backgroundColor: isDarkModeActive ? DARK_SPACER : LIGHT_SPACER,
                                }
                            ]}>
                            </View>
                        </View>
                        <View style={[styles.noteTextWrapper, {
                        }]}
                        >
                            <TextInput placeholderTextColor={isDarkModeActive ? DARK_NOTE_TEXT_PLACEHOLDER : LIGHT_NOTE_TEXT_PLACEHOLDER} 
                                placeholder='Just start typing..' multiline={true}
                                style={[styles.noteText,
                                    {
                                        fontSize: 20, //need to fix this
                                        color: isDarkModeActive ? DARK_NOTE_TEXT : LIGHT_NOTE_TEXT,
                                    }
                                ]}
                            >
                            </TextInput>
                        </View>
                        <View style={[
                            {
                                position: 'absolute',
                                width: '100%',
                                height: '10%',
                                top: '90%',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                            }
                        ]}>
                            <Pressable style={[styles.validateButtonWrapperWrapper, {
                                // need to fix this
                                height: 90,
                                width: 90,
                            }]}>
                                <View  style={[styles.validateButtonWrapper,
                                    {
                                        borderRadius: 20,
                                        height: '80%',
                                        width: '80%',
                                        backgroundColor: isDarkModeActive ? DARK_BACKGROUND_DONE_BUTTON : LIGHT_BACKGROUND_DONE_BUTTON,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    } 
                                ]}>
                                    {isDarkModeActive ? 
                                        <Image source={require('./assets/DarkButtonCheckmark.png')}
                                            style={[styles.validateButton]}
                                        >
                                        </Image>:
                                        <Image source={require('./assets/WhiteButtonCheckmark.png')}
                                            style={[styles.validateButton]}
                                        >
                                        </Image>
                                    }
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    cardWrapper: {
        alignItems: 'center',
    },
    card: {
        width: '90%',
        borderRadius: 20,
        alignItems: 'center',
    },
    logoWrapperWrapper: {
        width: '100%',
    },
    logoWrapper: {
        marginBottom: '2%',
        width: '100%',
    },
    logoText: {
        fontStyle: 'italic',
        fontSize: 1000,
        textAlign: 'center',
    },
    blurLogoText: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    noteTitleAndButtonWrapper: {
        flexDirection: 'row',
        height: '10%',
        width: '90%',
    },
    noteTitleWrapper: {
        height: '100%',
        width: '80%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    settingsButtonWrapper: {
        marginTop: '2%',
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    settingsButton: {
        left: '5%',
        height: '60%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsButtonIcon: { 
        height: '90%',
        width: '90%',
        opacity: 0.8,
    },
    spacerWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacer: {
        width: '86%',
        height: '20%',
        borderRadius: 10,
    },
    noteTextWrapper: {
        marginTop: '4%',
        height: '60%',
        width: '90%',
    },
    noteText: {
        width: '100%',
    },
    validateButton: {
        height: '42%',
        width: '42%',
        resizeMode: 'contain',
    }
});
