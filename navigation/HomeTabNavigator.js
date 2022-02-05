import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

import { Trending, Category, Search, Profile, Download } from '../src/screens'
import { FONTS, generalColors, icons, routeName } from '../assets'

const Tab = createBottomTabNavigator()

const CustomTabbarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: generalColors.light_blue,
            bottom: 20,
            shadowColor: generalColors.light_blue,
            shadowOffset: {
                width: 0,
                height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 4.65,
            elevation: 8
        }}
        onPress={onPress}
    >
        {children}
    </TouchableOpacity>
)

const HomeTabNavigator = () => {
    //Get redux theme
    const theme = useSelector(state => state.themeReducer.theme)
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: theme?.background_color,
                    borderTopColor: 'transparent'
                }
            })}
            initialRouteName={routeName.trending}
        >
            <Tab.Screen
                name={routeName.category}
                component={Category}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', paddingTop: 5 }}>
                            <Image
                                source={icons.category}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? generalColors.light_blue : theme?.text_color
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 5,
                                    ...FONTS.body5,
                                    color: focused ? generalColors.light_blue : theme?.text_color
                                }}
                            >
                                Category
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name={routeName.search}
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', paddingTop: 5 }}>
                            <Image
                                source={icons.search}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? generalColors.light_blue : theme?.text_color
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 5,
                                    ...FONTS.body5,
                                    color: focused ? generalColors.light_blue : theme?.text_color
                                }}
                            >
                                Search
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name={routeName.trending}
                component={Trending}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={icons.fire}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: generalColors.gray_10
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabbarButton {...props} />
                    )
                }}
            />
            <Tab.Screen
                name={routeName.download}
                component={Download}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', paddingTop: 5 }}>
                            <Image
                                source={icons.download}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? generalColors.light_blue : theme?.text_color
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 5,
                                    ...FONTS.body5,
                                    color: focused ? generalColors.light_blue : theme?.text_color
                                }}
                            >
                                Download
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name={routeName.profile}
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', paddingTop: 5 }}>
                            <Image
                                source={icons.user}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? generalColors.light_blue : theme?.text_color
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 5,
                                    ...FONTS.body5,
                                    color: focused ? generalColors.light_blue : theme?.text_color
                                }}
                            >
                                Profile
                            </Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default HomeTabNavigator
