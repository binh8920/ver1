import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigators } from 'react-navigation-tabs';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import ProfileOverviewScreen from '../screens/community/ProfileOverviewScreen';
import FilterHostScreen from '../screens/community/FilterHostScreen';
import RequestScreen from '../screens/community/RequestScreen';
import SearchScreen from '../screens/community/SearchScreen';
import AcceptScreen from '../screens/community/AcceptScreen';
import ProfileDetailScreen from '../screens/community/ProfileDetailScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import ReferencesScreen from '../screens/user/ReferencesScreen';
import PrivateProfileScreen from '../screens/user/PrivateProfileScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.navy : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.deepblue
};

const ProfileNavigator = createStackNavigator({
    Profile: PrivateProfileScreen,
    Edit: EditProfileScreen,
    References: ReferencesScreen
},
    {
        defaultNavigationOptions: defaultNavOptions
    });

const SearchNavigator = createStackNavigator({
    Hosts: ProfileOverviewScreen,
    Filter: FilterHostScreen,
    Profile: ProfileDetailScreen
},
    {
        defaultNavigationOptions: defaultNavOptions
    });

const RequestNavigator = createStackNavigator({
    Request: RequestScreen
},
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const AcceptNavigator = createStackNavigator({
    Accept: AcceptScreen
},
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const tabScreenConfig = {
    Searching: {
        screen: SearchNavigator,
        navigationOptions: {
            tabBarIcon: tabIcon => {
                return <Ionicons
                    name='search'
                    size={25}
                    color={tabIcon.tintColor}
                />;
            },
            tabBarColor: Colors.navy
        }
    },
    Request: {
        screen: RequestNavigator,
        navigationOptions: {
            tabBarIcon: tabIcon => {
                return <FontAwesome
                    name="send"
                    size={25}
                    color={tabIcon.tintColor} />;
            },
            tabBarColor: Colors.navy
        }
    },
    Accept: {
        screen: AcceptNavigator,
        navigationOptions: {
            tabBarIcon: tabIcon => {
                return <FontAwesome5
                    name="door-open"
                    size={25}
                    color={tabIcon.tintColor} />;
            },
            tabBarColor: Colors.navy
        }
    },
    Profiles: {
        screen: ProfileNavigator,
        navigationOptions: {
            tabBarIcon: tabIcon => {
                return <Ionicons
                    name='ios-person-outline'
                    size={25}
                    color={tabIcon.tintColor}
                />;
            },
            tabBarColor: Colors.navy
        }
    }
};

const MainNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Colors.redOrange,
        shifting: true
    })
    : createBottomTabNavigators(tabScreenConfig, {
        tabBarOption: {
            activeTintColor: Colors.redOrange
        }
    });

export default createAppContainer(MainNavigator);