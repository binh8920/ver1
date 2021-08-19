import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import AvatarSection from '../../components/profile/AvatarSection';
import StatusSection from '../../components/profile/StatusSection';
import ConditionSection from '../../components/profile/ConditionSection';
import AboutMeSection from '../../components/profile/AboutMeSection';
import ExperienceSection from '../../components/profile/ExperienceSection';


const PrivateProfileScreen = props => {
    const selectedProfile = useSelector(state => state.profile.privateProfile);
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <AvatarSection
                    image={selectedProfile.imgURL}
                    name={selectedProfile.name}
                    age={selectedProfile.age}
                    gender={selectedProfile.gender}
                />

                <StatusSection
                    address={selectedProfile.address}
                    couchStatus={selectedProfile.couchStatus}
                    references={selectedProfile.references}
                />

                <ConditionSection
                    maxGuest={selectedProfile.maxGuest}
                    sleepingArrangement={selectedProfile.sleepingArrangement}
                />

                <AboutMeSection
                    languages={selectedProfile.languages}
                    occupation={selectedProfile.occupation}
                    education={selectedProfile.education}
                    hometown={selectedProfile.hometown}
                    interest={selectedProfile.interest}
                />

                <ExperienceSection
                    visitedCountries={selectedProfile.visitedCountries}
                    reasonForCS={selectedProfile.reasonForCS}
                    hostOffer={selectedProfile.hostOffer}
                />

            </SafeAreaView>
        </ScrollView>
    );
};

PrivateProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Profile',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add"
                    iconName='md-create'
                    onPress={(id) => {
                        navData.navigation.navigate('Edit', { profileId: id });
                    }}
                />
            </HeaderButtons>
        )

    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default PrivateProfileScreen;