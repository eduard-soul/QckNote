import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UnderConstruction = (props) => {
    return (
        <View style={[styles.underConstructionWrapper,
            {
                opacity: props.isDarkModeActive ? 0.05 : 0.1,
            }
        ]}>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'yellow',transform: 'rotate(45deg)'}}></View>
            <View style={{top: '-10%', left: '-20%', height: '180%', width: '6%', marginLeft: '1%', backgroundColor: 'black',transform: 'rotate(45deg)'}}></View>
        </View>
    );
};

const styles = StyleSheet.create({    
    underConstructionWrapper: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        left: '-15%',
        top: '8%'
    }
});

export default UnderConstruction;
