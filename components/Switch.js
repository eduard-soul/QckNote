import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const Switch = () => {
    const [isOn, setIsOn] = useState(false);

    const handlePress = () => {
        setIsOn(!isOn);
    };

    return (
        <TouchableOpacity style={{
            overflow: 'hidden',
        }} onPress={handlePress}>
            <View style={{
                height: 34,
                width: 64,
                borderRadius: 30,
                backgroundColor: '#D9D9D9',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={[styles.container, isOn ? styles.containerOn : null]}>
                    <View style={[styles.circle, isOn ? styles.circleOn : null]} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 58,
        height: 28,
        borderRadius: 30,
        backgroundColor: '#AEAEAE',
        justifyContent: 'center',
        alignItems: 'flex-start',
        outlineColor: 'blue',
        outlineWidth: 10,
        //borderWidth: 10,
    },
    containerOn: {
        backgroundColor: '#4cd964',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: '#fff',
    },
    circleOn: {
        transform: [{ translateX: 28 }],
    },
});

export default Switch;
