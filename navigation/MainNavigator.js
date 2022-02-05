import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { Splash, Landing, Login, MovieDetails, ActorDetails, Genres } from '../src/screens'
import { routeName } from '../assets'
import HomeTabNavigator from './HomeTabNavigator'

const Stack = createNativeStackNavigator()

export const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name={routeName.splash}
                    component={Splash}
                />
                <Stack.Screen
                    name={routeName.landing}
                    component={Landing}
                />
                <Stack.Screen
                    name={routeName.login}
                    component={Login}
                />
                <Stack.Screen
                    name={routeName.home}
                    component={HomeTabNavigator}
                />
                <Stack.Screen
                    name={routeName.movie_details}
                    component={MovieDetails}
                />
                <Stack.Screen
                    name={routeName.actor_details}
                    component={ActorDetails}
                    options={{
                        presentation: 'modal'
                    }}
                />
                <Stack.Screen
                    name={routeName.genres}
                    component={Genres}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}