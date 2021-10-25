import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigators } from "react-navigation-tabs";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import ProfileOverviewScreen from "../screens/community/ProfileOverviewScreen";
import FilterHostScreen from "../screens/community/FilterHostScreen";
import RequestScreen from "../screens/community/RequestScreen";
import SearchScreen from "../screens/community/SearchScreen";
import AcceptScreen from "../screens/community/AcceptScreen";
import MapScreen from "../screens/community/MapScreen";
import ProfileDetailScreen from "../screens/community/ProfileDetailScreen";
import EditProfileScreen from "../screens/user/EditProfileScreen";
import ReferencesScreen from "../screens/user/ReferencesScreen";
import PrivateProfileScreen from "../screens/user/PrivateProfileScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartScreen from "../screens/StartScreen";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.navy : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.deepblue,
};

const ProfileNavigator = createStackNavigator(
  {
    Profile: PrivateProfileScreen,
    Edit: EditProfileScreen,
    References: ReferencesScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const SearchNavigator = createStackNavigator(
  {
    Hosts: ProfileOverviewScreen,
    Profile: ProfileDetailScreen,
    References: ReferencesScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const RequestNavigator = createStackNavigator(
  {
    Request: RequestScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AcceptNavigator = createStackNavigator(
  {
    Accept: AcceptScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MapNavigator = createStackNavigator(
  {
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const tabScreenConfig = {
  Explore: {
    screen: MapNavigator,
    navigationOptions: {
      tabBarIcon: (tabIcon) => {
        return (
          <MaterialIcons name="explore" size={25} color={tabIcon.tintColor} />
        );
      },
      tabBarColor: Colors.navy,
    },
  },
  Searching: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: (tabIcon) => {
        return <Ionicons name="search" size={25} color={tabIcon.tintColor} />;
      },
      tabBarColor: Colors.navy,
    },
  },
  Request: {
    screen: RequestNavigator,
    navigationOptions: {
      tabBarIcon: (tabIcon) => {
        return <FontAwesome name="send" size={25} color={tabIcon.tintColor} />;
      },
      tabBarColor: Colors.navy,
    },
  },
  Accept: {
    screen: AcceptNavigator,
    navigationOptions: {
      tabBarIcon: (tabIcon) => {
        return (
          <FontAwesome5 name="door-open" size={25} color={tabIcon.tintColor} />
        );
      },
      tabBarColor: Colors.navy,
    },
  },
  Profiles: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarIcon: (tabIcon) => {
        return (
          <Ionicons
            name="ios-person-outline"
            size={25}
            color={tabIcon.tintColor}
          />
        );
      },
      tabBarColor: Colors.navy,
    },
  },
};

const AppTabsNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Colors.redOrange,
        shifting: true,
      })
    : createBottomTabNavigators(tabScreenConfig, {
        tabBarOption: {
          activeTintColor: Colors.redOrange,
        },
      });

const AppNavigator = createDrawerNavigator(
  {
    AppTabs: AppTabsNavigator,
    Map: MapNavigator,
  },
  {
    drawerBackgroundColor: Colors.navy,
    drawerWidth: 200,
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate("Auth");
              }}
            >
              <LinearGradient
                colors={["#fc575e", "#f7b42c"]}
                style={styles.logout}
              >
                <Text style={styles.textLogout}>Log out</Text>
              </LinearGradient>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      );
    },
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    screen: AuthScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Start: StartScreen,
  Auth: AuthNavigator,
  App: AppNavigator,
});

const styles = StyleSheet.create({
  logout: {
    width: "70%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 30,
    marginTop: 50,
  },
  textLogout: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "white",
  },
});

export default createAppContainer(MainNavigator);
