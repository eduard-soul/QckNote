import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View, Dimensions, Keyboard, useWindowDimensions, Image,  } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import Switch from './components/Switch';

import { BlurView } from 'expo-blur'

// REACT NATIVE APP

export default function App() {
    const DARK_BACKGROUD = '#1F1F1F';
    const LIGHT_BACKGROUND = '#FFF9F3';

    const DARK_CARD = '#101010';
    const LIGHT_CARD = '#ECECEC';

    const DARK_LOGO = '#0085FF';
    const LIGHT_LOGO = '#001AFF';

    const DARK_NOTE_TITLE = '#E6E6E6';
    const LIGHT_NOTE_TITLE = '#1C1C1C';

    const DARK_NOTE_TITLE_PLACEHOLDER = '#282828';
    const LIGHT_NOTE_TITLE_PLACEHOLDER = '#D6D6D6';

    const DARK_NOTE_TEXT_PLACEHOLDER = '#868686'
    const LIGHT_NOTE_TEXT_PLACEHOLDER = '#5F5F5F'

    const DARK_NOTE_TEXT = '#E6E6E6'
    const LIGHT_NOTE_TEXT = '#1C1C1C'

    const DARK_DONE_BUTTON_CHECKMARK = '#D4FFD0'
    const LIGHT_DONE_BUTTON_CHECKMARK = '#222B21'

    const DARK_BACKGROUND_DONE_BUTTON = '#131313'
    const LIGHT_BACKGROUND_DONE_BUTTON = '#F3F8F2'

    const DARK_BACKGROUND_BACK_BUTTON = '#131313'
    const LIGHT_BACKGROUND_BACK_BUTTON = '#FAFAFA'

    const DARK_SETTINGS_BACK_BUTTON_ICON = '#444444'
    const LIGHT_SETTINGS_BACK_BUTTON_ICON = '#E2E2E2'

    const DARK_BACKGROUND_SETTINGS_BACK_BUTTON = '#444444'
    const LIGHT_BACKGROUND_SETTINGS_BACK_BUTTON = '#F3F3F3'

    const DARK_SETTINGS_BACKGROUND_CONTAINER = '#0F0F0F'
    const LIGHT_SETTINGS_BACKGROUND_CONTAINER = '#FAFAFA'

    const DARK_SETTINGS_CONTAINER_TEXT = '#DBDADA'
    const LIGHT_SETTINGS_CONTAINTER_TEXT = '#292929'

    const DARK_SETTINGS_HEADER = '#DBDADA'
    const LIGHT_SETTINGS_HEADER = '#4B4B4B'

    const DARK_BACKGROUND_NOTE_DONE = '#0C0C0C';
    const LIGHT_BACKGROUND_NOTE_DONE = '#F3F8F2';

    const LIGHT_SPACER  = '#F2F2F6';
    const DARK_SPACER = '#151515';

    const LIGHT_SETTINGS_BACKGROUND = '#EEEEEE';
    const DARK_SETTINGS_BACKGROUND = '#1A1A1A';

    const DARK_BACKGROUND_UPDATE_FOLDER_BUTTON = '#0F0F0F';
    const LIGHT_BACKGROUND_UPDATE_FOLDER_BUTTON = '#F2F3F8';
    
    const DARK_HEADER_UPDATE_FOLDER_BUTTON = '#303033'; 
    const LIGHT_HEADER_UPDATE_FOLDER_BUTTON = '#E8E7EF';

    const DARK_BACKGROUND_SETTINGS_BUTTONS = '#0F0F0F'
    const LIGHT_BACKGROUND_SETTINGS_BUTTONS = '#FAFAFA'

    const DARK_SETTINGS_BUTTONS_TEXT = '#DBDADA';
    const LIGHT_SETTINGS_BUTTONS_TEXT = '#292929';

    const [isDarkModeActive, setIsDarkModeActive] = useState(false);

    const [noteTitle, setNoteTitle] = useState('');
    const [note, setNote] = useState('');

    const {height, width} = useWindowDimensions();
    const [logoWrapperWrapperHeight, setLogoWrapperHeight] = useState(height * 0.125);
    const [noteTitleAndButtonHeight, setNoteTitleAndButtonHeight] = useState(height * 0.08);
    const [spacerWrapperHeight, setSpacerWrapperHeight] = useState(height * 0.03)

    const [isLanguageForced, setIsLanguageForced] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [isNoteBottom, setIsNoteBottom] = useState(false);

    const [isSettingsActive, setIsSettingsActive] = useState(false);

    const [permissions, setPermissions] = useState();

    const textInputRef = useRef();

    const saveNote = async () => {
        if (note.length) {
            let filename = 'qck_note.txt';

            if (noteTitle.length) {
                filename = noteTitle + '.txt';
            } else if (note.length > 10) {
                let temp = note.substring(0, 10) + '.txt';
                filename = temp.replace(/[^a-zA-Z0-9]/g, '');
                if (!filename) {
                    filename = 'qck_note.txt';
                }
            } 
            createFile(filename, note);
        }
        //const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const checkPermmisions = async () => {
         setPermissions(await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync());
    }
    
    const createFile = async (filename, content) => {
        try {
            const fileUri = FileSystem.documentDirectory + filename;
            await FileSystem.writeAsStringAsync(fileUri, content);

            if (Platform.OS === 'ios') {
                const share = await shareAsync(fileUri);
            } else if (Platform.OS === 'android') {
                let tempPermissions;

                if (!permissions) {
                    tempPermissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
                    setPermissions(tempPermissions);
                }
                else {
                    tempPermissions = permissions; 
                }
                if (tempPermissions.granted) {
                    const base64 = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
                    await FileSystem.StorageAccessFramework.createFileAsync(tempPermissions.directoryUri, filename, 'text/plain')
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                    })
                    .catch(e => console.log(e));
                } else {
                    shareAsync(uri);
                }
            }

        } catch (error) {
            console.error(`Error creating file ${filename}: ${error}`);
        }
    };

    useEffect(() => {
        //console.log('textInputRef', textInputRef.value);
    }, [textInputRef]);

    return (
        <View style={[styles.appContainer, {
            backgroundColor: isDarkModeActive ? DARK_BACKGROUD : LIGHT_BACKGROUND,
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
                    <BlurView intensity={Platform.OS === 'ios' ? 8 : 4} style={[styles.blurView,{
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
                    <Pressable
                        style={[styles.card, {
                            zIndex: 100,
                            height: '90%',
                            backgroundColor: isDarkModeActive ? DARK_CARD : LIGHT_CARD,
                        }]}>
                        <View style={[styles.topCardWrapper,
                            {
                                width: '100%',
                                height: '75%',
                                alignItems: 'center',
                            }
                        ]}>
                            <View style={[styles.noteTitleAndButtonWrapper, {
                                height: noteTitleAndButtonHeight,
                            }]}>
                                <View style={[styles.noteTitleWrapper, {
                                }]}>
                                    <TextInput 
                                        keyboardAppearance={isDarkModeActive && Platform.OS === 'ios' ? 'dark' : 'light'}
                                        value={noteTitle} onChangeText={(e) => {setNoteTitle(e)}}
                                        placeholder='Optional title..' 
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
                                    <Pressable onPress={() => {
                                        dismissKeyboard();
                                        setIsSettingsActive(!isSettingsActive);
                                    }}
                                    style={[styles.settingsButton,
                                        {
                                        }
                                    ]}>
                                        <Image source={isDarkModeActive ? require('./assets/DarkSettingsIcon.png') : require('./assets/WhiteSettingsIcon.png')}
                                        style={[styles.settingsButtonIcon, {
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
                            <Pressable style={[styles.noteTextWrapperWrapper,
                                    {
                                        width: '100%',
                                        height: '116%',
                                        alignItems: 'center',
                                    }
                                ]}
                                onPress={() => {
                                    if(Keyboard.isVisible()) {
                                        dismissKeyboard();
                                    } else {
                                        this.secondTextInput.focus();
                                    }
                                }}
                            >
                                <View style={[styles.noteTextWrapper, {
                                }]}
                                >
                                    <TextInput 
                                        blurOnSubmit={false}
                                        ref={(input) => { this.secondTextInput = input; }}
                                        //ref={(input) => {textInputRef.value = input}}
                                        keyboardAppearance={isDarkModeActive && Platform.OS === 'ios' ? 'dark' : 'light'}
                                        value={note} onChangeText={(e) => {setNote(e)}}
                                        placeholderTextColor={isDarkModeActive ? DARK_NOTE_TEXT_PLACEHOLDER : LIGHT_NOTE_TEXT_PLACEHOLDER} 
                                        placeholder='Just start typing..' 
                                        multiline autoFocus
                                        style={[styles.noteText,
                                            {
                                                textAlignVertical: isNoteBottom ? 'bottom' : 'top',
                                                marginBottom: Platform.OS === 'ios' ? '9.5%' : '10%',
                                                fontSize: 20,
                                                color: isDarkModeActive ? DARK_NOTE_TEXT : LIGHT_NOTE_TEXT,
                                            }
                                        ]}
                                    >
                                    </TextInput>
                                </View>
                            </Pressable>
                        </View>
                        <Pressable onPress={saveNote}
                        style={[styles.validateButtonWrapper, {
                                width: '23.5%',
                                aspectRatio: 1,
                                justifyContent: 'flex-start',
                        }]}>
                            <View  style={[styles.validateButton,
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
                                        style={[styles.validateButttonCheckmark]}
                                    >
                                    </Image>:
                                    <Image source={require('./assets/WhiteButtonCheckmark.png')}
                                        style={[styles.validateButttonCheckmark]}
                                    >
                                    </Image>
                                }
                            </View>
                        </Pressable>
                        <View style={[styles.settingsWrapper,
                            {
                                display: isSettingsActive ? 'flex' : 'none',
                                opacity: 1,
                                borderRadius: 20,
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                backgroundColor: isDarkModeActive ? DARK_SETTINGS_BACKGROUND : LIGHT_SETTINGS_BACKGROUND,
                                justifyContent: 'space-between'
                            }
                        ]}>
                            <View style={{
                                height: '80%',
                                width: '100%',
                                alignItems: 'center',
                            }}>
                                <View style={[styles.settingsTextWrapper,
                                    {
                                        height: noteTitleAndButtonHeight,
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }
                                ]}>
                                    <Text style={[styles.settingsText,
                                        {
                                            marginTop: '3%',
                                            fontSize: 30,         
                                            fontWeight: 700,
                                            color: isDarkModeActive ? DARK_SETTINGS_HEADER : LIGHT_SETTINGS_HEADER,
                                        }
                                    ]}>SETTINGS</Text>
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
                                <Pressable onPress={checkPermmisions}
                                style={[styles.updateFolderButtonWrapper, 
                                    {
                                        display: Platform.OS === 'android' ? 'flex' : 'none',
                                        borderRadius: 20,
                                        marginBottom: '3%',
                                        height: '14.3%',
                                        width: '86.18%',
                                        backgroundColor: isDarkModeActive ? DARK_BACKGROUND_UPDATE_FOLDER_BUTTON : LIGHT_BACKGROUND_UPDATE_FOLDER_BUTTON,
                                        marginTop: '5%',
                                    }
                                ]}>
                                    <View style={[
                                        {
                                            height: '27%',
                                            borderTopEndRadius: 20,
                                            borderTopStartRadius: 20,
                                            backgroundColor: isDarkModeActive ? DARK_HEADER_UPDATE_FOLDER_BUTTON : LIGHT_HEADER_UPDATE_FOLDER_BUTTON,
                                        }
                                    ]}>
                                    </View>
                                    <View style={[styles.updateFolderButton,
                                        {
                                            height: '77%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }
                                    ]}>
                                        <Text 
                                            style={[styles.updateButtonText,
                                            {
                                                color: isDarkModeActive ? DARK_SETTINGS_BUTTONS_TEXT : LIGHT_SETTINGS_BUTTONS_TEXT,
                                            }
                                        ]}>Update Destination Folder</Text>
                                    </View>
                                </Pressable>
                                <View style={[styles.buttonSettingsWrapper,
                                    {
                                        backgroundColor: isDarkModeActive ? DARK_BACKGROUND_SETTINGS_BUTTONS : LIGHT_BACKGROUND_SETTINGS_BUTTONS,
                                        marginTop: Platform.OS === 'android' ? '0%' : '5%',
                                        overflow: 'hidden',
                                    }
                                ]}>
                                    <Pressable onPress={() => {setIsLanguageForced(false)}}
                                     style={styles.settingsPressable}>
                                        <Text style={[styles.settingsPressableText,{
                                            //color: isDarkModeActive ? DARK_SETTINGS_BUTTONS_TEXT : LIGHT_SETTINGS_BUTTONS_TEXT,
                                            color: 'grey'
                                            }]}>
                                            System  
                                            Language
                                        </Text>
                                    </Pressable>
                                    <View style={[styles.settingsTogglePressable, {
                                        opacity: 0.35,
                                    }]}>
                                        <Switch
                                            onChange={() => {setIsLanguageForced(!isLanguageForced)}}
                                            whichSwitch={'language'}
                                            isActive={isLanguageForced}
                                        ></Switch>
                                    </View>
                                    <Pressable onPress={() => {setIsLanguageForced(true)}}
                                    style={styles.settingsPressable}>
                                        <Text style={[styles.settingsPressableText,{
                                            //color: isDarkModeActive ? DARK_SETTINGS_BUTTONS_TEXT : LIGHT_SETTINGS_BUTTONS_TEXT,
                                            color: 'grey'
                                        }]}>
                                            Force  English
                                        </Text>
                                    </Pressable>
                                    <View style={[styles.underConstructionWrapper,
                                        {
                                            position: 'absolute',
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 20,
                                            opacity: isDarkModeActive ? 0.05 : 0.1,
                                            flexDirection: 'row',
                                            left: '-5%',
                                        }
                                    ]}>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                    </View>
                                </View>
                                <View style={[styles.buttonSettingsWrapper,
                                    {
                                        backgroundColor: isDarkModeActive ? DARK_BACKGROUND_SETTINGS_BUTTONS : LIGHT_BACKGROUND_SETTINGS_BUTTONS,
                                        overflow: 'hidden',
                                    }
                                ]}>
                                    <Pressable onPress={() => {setIsHighContrast(false)}}
                                    style={styles.settingsPressable}>
                                        <Text style={[styles.settingsPressableText,{
                                            //color: isDarkModeActive ? DARK_SETTINGS_BUTTONS_TEXT : LIGHT_SETTINGS_BUTTONS_TEXT,
                                            color: 'grey',
                                        }]}>
                                            Low Contrast 
                                        </Text>
                                    </Pressable>
                                    <Pressable style={[styles.settingsTogglePressable, {
                                        opacity: 0.35,
                                    }]}>
                                        <Switch
                                            onChange={() => {setIsHighContrast(!isHighContrast)}}
                                            whichSwitch={'contrast'}
                                            isActive={isHighContrast}
                                        ></Switch> 
                                    </Pressable>
                                    <Pressable onPress={() => {setIsHighContrast(true)}}
                                    style={styles.settingsPressable}>
                                        <Text style={[styles.settingsPressableText,{
                                            //color: isDarkModeActive ? DARK_SETTINGS_BUTTONS_TEXT : LIGHT_SETTINGS_BUTTONS_TEXT
                                            color: 'grey',
                                            }]}>
                                            High Contrast 
                                        </Text>
                                    </Pressable>
                                    <View style={[styles.underConstructionWrapper,
                                        {
                                            position: 'absolute',
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 20,
                                            opacity: isDarkModeActive ? 0.05 : 0.1,
                                            flexDirection: 'row',
                                            left: '-5%',
                                        }
                                    ]}>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
                                        <View style={{top: '-10%', left: '-20%', height: '170%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
                                    </View>
                                </View>
                                <View style={[styles.buttonSettingsWrapper,
                                    {
                                        backgroundColor: isDarkModeActive ? DARK_BACKGROUND_SETTINGS_BUTTONS : LIGHT_BACKGROUND_SETTINGS_BUTTONS,
                                    }
                                ]}>
                                    <Pressable onPress={() => {setIsNoteBottom(false)}}
                                    style={styles.settingsPressable}>
                                        <Text style={[styles.settingsPressableText,{
                                            color: isDarkModeActive ? DARK_SETTINGS_BUTTONS_TEXT : LIGHT_SETTINGS_BUTTONS_TEXT,}]}>
                                            Note Text
                                            On Top 
                                        </Text>
                                    </Pressable>
                                    <Pressable style={styles.settingsTogglePressable}>
                                        <Switch
                                            onChange={() => {setIsNoteBottom(!isNoteBottom)}}
                                            whichSwitch={'topOrBottom'}
                                            isActive={isNoteBottom}
                                        ></Switch>
                                    </Pressable>
                                    <Pressable onPress={() => {setIsNoteBottom(true)}}
                                    style={styles.settingsPressable}>
                                        <Text style={[styles.settingsPressableText,{
                                            color: isDarkModeActive ? DARK_SETTINGS_BUTTONS_TEXT : LIGHT_SETTINGS_BUTTONS_TEXT,}]}>
                                            Note Text
                                            On Bottom 
                                        </Text>
                                    </Pressable>
                                </View>
                                <View style={[styles.buttonSettingsWrapper,
                                {
                                    backgroundColor: isDarkModeActive ? DARK_BACKGROUND_SETTINGS_BUTTONS : LIGHT_BACKGROUND_SETTINGS_BUTTONS,
                                }
                            ]}>
                                    <Pressable onPress={() => {
                                        setIsDarkModeActive(false);
                                    }}
                                        style={styles.settingsPressable}>
                                        <Text style={[styles.settingsPressableText,{
                                                color: isDarkModeActive ? DARK_SETTINGS_BUTTONS_TEXT : LIGHT_SETTINGS_BUTTONS_TEXT,}]}>
                                            {'Light\nMode'} 
                                        </Text>
                                    </Pressable>
                                    <Pressable style={styles.settingsTogglePressable}>
                                        <Switch 
                                            onChange={() => {setIsDarkModeActive(!isDarkModeActive)}}
                                            whichSwitch={'nightMode'}
                                            isActive={isDarkModeActive}
                                        ></Switch>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        setIsDarkModeActive(true);
                                    }}
                                    style={styles.settingsPressable}>
                                        <Text style={[styles.settingsPressableText,{
                                                color: isDarkModeActive ? DARK_SETTINGS_BUTTONS_TEXT : LIGHT_SETTINGS_BUTTONS_TEXT,}]}>
                                            {'Dark\nMode'} 
                                        </Text>
                                    </Pressable >
                                </View>
                            </View>
                            <Pressable style={[styles.backHomeButtonWrapper, {
                                    left: '76.5%',
                                    width: '23.5%',
                                    aspectRatio: 1,
                            }]} onPress={() => {setIsSettingsActive(!isSettingsActive)}}>
                                <View  style={[styles.backHomeButton,
                                    {
                                        borderRadius: 20,
                                        height: '80%',
                                        width: '80%',
                                        backgroundColor: isDarkModeActive ? DARK_BACKGROUND_BACK_BUTTON : LIGHT_BACKGROUND_BACK_BUTTON,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    } 
                                ]}>
                                    {isDarkModeActive ? 
                                        <Image source={require('./assets/WhiteBackHomeIcon.png')}
                                            style={[styles.backHomeButtonIcon]}
                                        >
                                        </Image>:
                                        <Image source={require('./assets/WhiteBackHomeIcon.png')}
                                            style={[styles.backHomeButtonIcon]}
                                        >
                                        </Image>
                                    }
                                </View>
                            </Pressable>
                        </View>
                    </Pressable>
                    <BlurView intensity={Platform.OS === 'ios' ? 8 : 4} style={[styles.blurView ,{
                            // If there is lag, check this BlurView
                    }]}>
                    </BlurView>
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
        alignItems: 'flex-end',
        justifyContent: 'space-between'
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
    blurView : {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    noteTitleAndButtonWrapper: {
        flexDirection: 'row',
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
    validateButttonCheckmark: {
        height: '42%',
        width: '42%',
        resizeMode: 'contain',
    },
    buttonSettingsWrapper: {
        borderRadius: 20,
        marginBottom: '3.3%',
        height: '12.5%',
        width: '86.18%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    settingsPressable: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    } ,
    settingsTogglePressable: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsPressableText: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 700,
        marginBottom: '8%',
    },
    backHomeButtonIcon: {
        height: '49%',
        width: '49%',
        resizeMode: 'contain',
    },
    updateButtonText: {
        fontWeight: 800,
        fontSize: 19,
        fontWeight: 600,
        marginTop: -5,
    }
});
