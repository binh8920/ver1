import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';

import Colors from '../../constants/Colors';
import AvatarSection from '../../components/profile/AvatarSection';
import StatusSection from '../../components/profile/StatusSection';
import ConditionSection from '../../components/profile/ConditionSection';
import AboutMeSection from '../../components/profile/AboutMeSection';
import ExperienceSection from '../../components/profile/ExperienceSection';
import * as requestActions from '../../store/actions/request';

const ProfileDetailScreen = props => {
    const profileId = props.navigation.getParam('profileId');
    const selectedProfile = useSelector(state =>
        state.profile.allProfile.find(prod => prod.id === profileId)
    );
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

                <View style={{ alignItems: 'center', margin: 20 }}>
                    <Button
                        title="Request Host"
                        color={Colors.mango}
                        onPress={() => {
                            dispatch(requestActions.requestToHost(selectedProfile));
                        }}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ProfileDetailScreen;