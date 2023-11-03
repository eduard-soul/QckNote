import React, { useEffect, useState, memo } from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

const Switch = (props, onChange) => {

    const handlePress = () => {
        props.onChange(!props.isActive)
    };

    return (
        <Pressable style={{
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
                <View style={[styles.container, props.isActive ? styles.containerOn : null]}>
                    <View style={[styles.circle, props.isActive ? styles.circleOn : null]} />
                </View>
            </View>
        </Pressable>
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

export default memo(Switch);
