import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Title,
    Caption,
} from 'react-native-paper';

const ConditionSection = props => {
    return (
        <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox, { borderRightColor: '#dddddd', borderRightWidth: 1 }]}>
                <Title>Guests</Title>
                <Caption>Up to {props.maxGuest}</Caption>
            </View>
            <View style={styles.infoBox}>
                <Title>Place</Title>
                <Caption>{props.sleepingArrangement}</Caption>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ConditionSection;