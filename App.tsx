import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './screens/HomeScreen';
import {RestaurantsScreen} from './screens/RestaurantsScreen';
import {EventsScreen} from './screens/EventsScreen';
import {DetailsScreen} from './screens/DetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {ProfileScreen} from './screens/Profile';
import {QuestsScreen} from './screens/QuestsScreen';
import {EventDetails} from './screens/EventDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RestaurantsStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="RestaurantsList"
      component={RestaurantsScreen}
      options={{title: 'Restaurants'}}
    />
    <Stack.Screen
      name="RestaurantDetails"
      component={DetailsScreen}
      options={{title: 'Details'}}
    />
  </Stack.Navigator>
);

export const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Home'}}
    />
    <Stack.Screen
      name="RestaurantDetails"
      component={DetailsScreen}
      options={{title: 'Details'}}
    />
  </Stack.Navigator>
);

const EventsStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="EventsList"
      component={EventsScreen}
      options={{title: 'Events'}}
    />
    <Stack.Screen
      name="EventDetails"
      component={EventDetails}
      options={{title: 'Details'}}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({color, size}) => {
        let iconName = 'home';
        if (route.name === 'Restaurants') iconName = 'restaurant';
        else if (route.name === 'Events') iconName = 'calendar';
        else if (route.name === 'Profile') iconName = 'person';
        else if (route.name === 'Quests') iconName = 'game-controller';

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {backgroundColor: '#333'},
      tabBarActiveTintColor: '#FFD700',
      tabBarInactiveTintColor: '#fff',
    })}>
    <Tab.Screen name="Home" component={HomeStack} options={{title: 'Home'}} />
    <Tab.Screen
      name="Restaurants"
      component={RestaurantsStack}
      options={{title: 'Restaurants'}}
    />
    <Tab.Screen
      name="Events"
      component={EventsStack}
      options={{title: 'Events'}}
    />
    <Tab.Screen
      name="Quests"
      component={QuestsScreen}
      options={{title: 'Quests'}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{title: 'Profile'}}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
