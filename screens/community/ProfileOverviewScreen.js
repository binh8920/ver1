import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProfileItem from '../../components/profile/ProfileItem';


const ProfileOverviewScreen = props => {
    const profiles = useSelector(state => state.profile.allProfile);

    return (
        <FlatList
            data={profiles}
            renderItem={itemData => (
                <ProfileItem
                    keyExtractor={item => item.id}
                    image={itemData.item.imgURL}
                    name={itemData.item.name}
                    address={itemData.item.address}
                    couchStatus={itemData.item.couchStatus}
                    references={itemData.item.references}
                    languages={itemData.item.languages}
                    onSelect={() => {
                        props.navigation.navigate('Profile', {
                            profileId: itemData.item.id
                        });
                    }}
                />
            )}
        />
    );
};

export default ProfileOverviewScreen;