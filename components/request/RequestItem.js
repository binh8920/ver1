import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const RequestItem = props => {
    return (
        <View style={styles.requestItem}>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>{props.name}</Text>
                <Text style={styles.subText}>{props.age}, </Text>
                <Text style={styles.subText}>{props.gender}</Text>
            </View>
            <View style={styles.itemData}>
                {props.deletable && (
                    <TouchableOpacity
                        onPress={props.onRemove}
                        style={styles.deleteButton}
                    >
                        <AntDesign
                            name="deleteuser"
                            size={23}
                            color={Colors.redOrange}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    requestItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        marginRight: 15
    },
    subText: {
        fontFamily: 'open-sans',
        color: Colors.darkGrey,
        fontSize: 14
    }
});

export default RequestItem;