import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import Card from '../UI/Card';
import Colors from '../../constants/Colors';

const ProfileItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.profile}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.name}>{props.name}</Text>
                            <Text style={styles.address}>{props.address}</Text>
                            <Text style={styles.couchStatus}>{props.couchStatus}</Text>
                            <View style={styles.speaks}>
                                <MaterialIcons name="messenger" size={18} color={Colors.darkGrey} />
                                <Text style={styles.textDetail}>{props.languages}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    profile: {
        height: 300,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        height: '17%',
        padding: 10
    },
    textDetail: {
        fontFamily: 'open-sans',
        color: Colors.darkGrey,
        fontSize: 12,
        marginLeft: 5
    },
    name: {
        fontFamily: 'open-sans-bold',
        color: Colors.black,
        fontSize: 18
    },
    speaks: {
        flexDirection: 'row',
        marginBottom: 5
    }
});

export default ProfileItem;