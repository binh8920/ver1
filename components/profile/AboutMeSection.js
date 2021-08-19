import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { Title, } from 'react-native-paper';

import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Chip } from 'react-native-elements';
import Colors from '../../constants/Colors';

const AboutMeSection = props => {

    return (
        <View style={styles.additionInfoSection}>
            <Title>About me</Title>
            <View style={styles.row}>
                <FontAwesome5 name="language" size={18} color={Colors.redOrange} />
                <Text style={{ color: Colors.darkGrey, marginLeft: 15 }}>{props.languages}</Text>
            </View>
            <View style={styles.row}>
                <MaterialIcons name="work" size={18} color={Colors.redOrange} />
                <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>{props.occupation}</Text>
            </View>
            <View style={styles.row}>
                <Ionicons name="school" size={18} color={Colors.redOrange} />
                <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>{props.education}</Text>
            </View>
            <View style={styles.row}>
                <FontAwesome5 name="baby" size={18} color={Colors.redOrange} />
                <Text style={{ color: Colors.darkGrey, marginLeft: 20 }}>{props.hometown}</Text>
            </View>
            <View style={styles.row}>
                <MaterialIcons name="favorite" size={18} color={Colors.redOrange} />
                {props.interest.split(',').map(i => (
                    <View style={{ marginLeft: 10 }}>
                        <Chip
                            key={i}
                            title={i}
                            type='outline'
                            style={{ color: Colors.darkGrey, marginLeft: 20 }}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    additionInfoSection: {
        paddingHorizontal: 20,
        marginTop: 10,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
});

export default AboutMeSection;