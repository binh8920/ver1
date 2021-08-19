import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import RequestItem from '../request/RequestItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const AcceptItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.acceptItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>Total Request: {props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                color={Colors.mango}
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {props.requests.map(requestItem => (
                        <RequestItem
                            key={requestItem.profileId}
                            name={requestItem.profileName}
                            age={requestItem.profileAge}
                            gender={requestItem.profileGender}
                            address={requestItem.profileAddress}
                        />
                    ))}
                </View>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    acceptItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});

export default AcceptItem;