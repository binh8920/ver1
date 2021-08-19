import React from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as requestActions from '../../store/actions/request';
import * as acceptActions from '../../store/actions/accept';
import Card from '../../components/UI/Card';
import RequestItem from '../../components/request/RequestItem';

const RequestScreen = props => {
    const totalRequest = useSelector(state => state.request.totalRequest);
    const requestItems = useSelector(state => {
        const transformedRequestItems = [];
        for (const key in state.request.requests) {
            transformedRequestItems.push({
                profileId: key,
                profileName: state.request.requests[key].profileName,
                profileGender: state.request.requests[key].profileGender,
                profileAge: state.request.requests[key].profileAge,
                profileAddress: state.request.requests[key].profileAddress
            });
        }
        return transformedRequestItems;
    });

    const dispatch = useDispatch();
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total Request:{' '}
                    <Text style={styles.amount}>
                        {totalRequest}
                    </Text>
                </Text>
                <Button
                    color={Colors.mango}
                    title="Accept Now"
                    disabled={requestItems.length === 0}
                    onPress={() => {
                        dispatch(acceptActions.acceptUser(requestItems, totalRequest));
                    }}
                />
            </Card>
            <FlatList
                data={requestItems}
                keyExtractor={item => item.profileId}
                renderItem={itemData => (
                    <RequestItem
                        name={itemData.item.profileName}
                        gender={itemData.item.profileGender}
                        age={itemData.item.profileAge}
                        deletable
                        onRemove={() => {
                            dispatch(requestActions.removeRequest(itemData.item.profileId));
                        }}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default RequestScreen;