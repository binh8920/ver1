import React from 'react';
import { StyleSheet, View, Text, CheckBox } from 'react-native';

const CSChoices = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stop Over Status</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={props.initialValue}
                    onValueChange={props.onSelect}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Maybe Accepting Guest</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={props.initialValue}
                    onValueChange={props.onSelect}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Not Accepting Guest</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={props.initialValue}
                    onValueChange={props.onSelect}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Accepting Guest</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        marginBottom: 10
    },
    container: {
        margin: 10
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        fontFamily: 'open-sans'
    },
});

export default CSChoices;