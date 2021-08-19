import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Text } from 'react-native-paper';

import Colors from '../../constants/Colors';

const ExperienceSection = props => {
    const visitedCountriesHandler = () => {
        if (props.visitedCountries.length === 0) {
            return <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>Just in my country!</Text>;
        } else {
            return <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>{props.visitedCountries}</Text>;
        }
    };

    return (
        <View style={styles.additionInfoSection}>
            <Title>Experiences</Title>
            <View style={styles.experienceSection}>
                <Text style={styles.experience}>Why I'm on Stop Over?</Text>
                <Text style={styles.experienceInfo}>{props.reasonForCS}</Text>
            </View>
            <View style={styles.experienceSection}>
                <Text style={styles.experience}>What I can offer host?</Text>
                <Text style={styles.experienceInfo}>{props.hostOffer}</Text>
            </View>
            <View style={styles.experienceSection}>
                <Text style={styles.experience}>I've visited in:</Text>
                {visitedCountriesHandler()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    additionInfoSection: {
        paddingHorizontal: 20,
        marginTop: 10,
        borderBottomColor: '#dddddd',
    },
    experience: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'open-sans'
    },
    experienceInfo: {
        marginLeft: 20,
        marginBottom: 20,
        color: Colors.darkGrey
    },
    experienceSection: {
        marginTop: 10
    }
});

export default ExperienceSection;