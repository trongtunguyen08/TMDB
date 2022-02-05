import RNBounceable from '@freakycoder/react-native-bounceable'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryScatter } from 'victory-native'

import { SIZES, images, generalColors, FONTS, icons } from '../../assets'
import VictoryTheme from '../../assets/styles/VictoryTheme'

const chartData = [
    { x: 1, y: 2.5 },
    { x: 2, y: 2 },
    { x: 3, y: 3.3 },
    { x: 4, y: 1.4 },
    { x: 5, y: 1.5 },
    { x: 6, y: 2.3 },
    { x: 7, y: 4.8 }
]

const Profile = () => {
    // Get theme
    const theme = useSelector(state => state.themeReducer.theme)
    const MenuItem = ({ label, text, onPress }) => (
        <RNBounceable
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: SIZES.radius }}
            onPress={onPress}
        >
            <View style={{ flex: 1, marginRight: SIZES.base }}>
                <Text style={{ ...FONTS.h4, color: theme?.text_color }}>
                    {label}
                </Text>
                <Text style={{ ...FONTS.body5, color: theme?.text_color, opacity: 0.8 }}>
                    {text}
                </Text>
            </View>
            <Image
                source={icons.right}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: theme?.text_color
                }}
            />
        </RNBounceable>
    )
    return (
        <View style={{ flex: 1, backgroundColor: theme?.background_color }}>
            <ScrollView
                style={{ flex: 1 }}
                bounces={false} showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                {/* Backdrop Image */}
                <View style={{ width: SIZES.width, height: SIZES.height / 2, position: 'absolute' }}>
                    <Image
                        source={images.avatar}
                        style={StyleSheet.absoluteFill}
                        resizeMode='cover'
                        style={{
                            width: SIZES.width, height: SIZES.height / 2
                        }}
                        blurRadius={30}
                    />
                    <LinearGradient
                        colors={['transparent', theme?.background_color]}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            bottom: 0
                        }}
                    />
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, marginTop: StatusBar.currentHeight + SIZES.base, paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                        {/* Avatar */}
                        <Image
                            source={images.avatar}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: generalColors.white
                            }}
                        />
                        <Text style={{ ...FONTS.h3, marginTop: SIZES.base, color: theme?.text_color }}>
                            NGUYEN TRONG TU
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base / 2 }}>
                            <Image
                                source={icons.pin}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: theme?.text_color,
                                    marginRight: 2
                                }}
                            />
                            <Text style={{ ...FONTS.h5, color: theme?.text_color }}>
                                Vietnam
                            </Text>
                        </View>
                        <Text style={{ ...FONTS.body4, textAlign: 'center', lineHeight: 18, color: theme?.text_color }}>
                            I'm mobile developer. Love travelling, coding, cats, music. Nice to have you here
                        </Text>
                        <RNBounceable
                            style={{
                                paddingVertical: SIZES.base,
                                paddingHorizontal: SIZES.base * 2,
                                backgroundColor: generalColors.light_blue,
                                borderRadius: 999,
                                marginTop: SIZES.base
                            }}
                        >
                            <Text
                                style={{ ...FONTS.h5, color: generalColors.white }}
                            >
                                Edit Profile
                            </Text>
                        </RNBounceable>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: SIZES.padding }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ ...FONTS.h2, color: theme?.text_color }}>
                                    12
                                </Text>
                                <Text style={{ ...FONTS.body5, color: theme?.text_color, opacity: 0.5 }}>
                                    Watched
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ ...FONTS.h2, color: theme?.text_color }}>
                                    132
                                </Text>
                                <Text style={{ ...FONTS.body5, color: theme?.text_color, opacity: 0.5 }}>
                                    Followers
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ ...FONTS.h2, color: theme?.text_color }}>
                                    900
                                </Text>
                                <Text style={{ ...FONTS.body5, color: theme?.text_color, opacity: 0.5 }}>
                                    Following
                                </Text>
                            </View>
                        </View>
                        {/* Screen Time */}
                        <Text style={{ ...FONTS.h3, color: theme?.text_color, alignSelf: 'flex-start', marginTop: SIZES.base }}>
                            Screen Time
                        </Text>
                        <View style={{ marginTop: -30 }}>
                            <VictoryChart
                                theme={VictoryTheme}
                            >
                                <VictoryLine
                                    categories={{
                                        x: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                                        y: ['2', '4', '6', '8', '10', '12']
                                    }}
                                    style={{
                                        data: {
                                            stroke: generalColors.light_green
                                        }
                                    }}
                                    data={chartData}
                                />
                                <VictoryScatter
                                    data={chartData}
                                    size={7}
                                    style={{
                                        data: {
                                            fill: generalColors.light_blue
                                        }
                                    }}
                                />
                                <VictoryAxis
                                    style={{
                                        grid: {
                                            stroke: 'transparent'
                                        }
                                    }}
                                />
                                <VictoryAxis
                                    dependentAxis
                                    style={{
                                        grid: {
                                            stroke: theme?.text_color
                                        },
                                        axis: {
                                            stroke: 'transparent'
                                        }
                                    }}
                                />
                            </VictoryChart>
                        </View>
                        {/* Menu List Item */}
                        <MenuItem
                            icon={icons.user}
                            label={'Account Details'}
                            text='Edit your password, username, email...'
                        />
                        <MenuItem
                            icon={icons.user}
                            label={'Security'}
                            text='Double identification'
                        />
                        <MenuItem
                            icon={icons.user}
                            label={'Settings'}
                            text='Customize application interface'
                        />
                        <MenuItem
                            icon={icons.user}
                            label={'Help'}
                            text='Contact customer service'
                        />
                        <MenuItem
                            icon={icons.user}
                            label={'Rating'}
                            text='Do you like this app?'
                        />
                        <MenuItem
                            icon={icons.user}
                            label={'Us'}
                            text='Learn more about us'
                        />
                        <MenuItem
                            icon={icons.user}
                            label={'Logout'}
                            text='Logout of the app'
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
