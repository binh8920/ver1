import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
} from 'react-native-paper';

const AvatarSection = props => {
    return (
        <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                    source={{ uri: props.image, }}
                    size={80}
                />
                <View style={{ marginLeft: 20 }}>
                    <Title style={[styles.title, { marginTop: 15, marginBottom: 5, }]}>
                        {props.name}
                    </Title>
                    <Caption style={styles.caption}>{props.age}, {props.gender}</Caption>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
});

export default AvatarSection;