import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AcceptItem from '../../components/accept/AcceptItem';

const AcceptScreen = props => {
    const acceptances = useSelector(state => state.accept.acceptances);

    return (
        <FlatList
            data={acceptances}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <AcceptItem
                    amount={itemData.item.totalRequest}
                    date={itemData.item.readableDate}
                    requests={itemData.item.requests}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({

});

export default AcceptScreen;