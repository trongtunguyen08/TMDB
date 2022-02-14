import React, { useEffect, useState, useRef } from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Animated,
    StatusBar,
    Platform,
    FlatList,
    Image
} from 'react-native'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import RNBounceable from '@freakycoder/react-native-bounceable'

import {
    getTrendingMovies,
    IMAGE_PATH_LOW,
    IMAGE_PATH_HIGH
} from '../../services'
import { FONTS, generalColors, routeName, SIZES } from '../../assets'

const Trending = ({ navigation }) => {
    // Contants
    const { width, height } = Dimensions.get('window')
    let BACKDROP_HEIGHT = height * .6
    let ITEM_SIZE = width * .72
    const scrollX = useRef(new Animated.Value(0)).current
    let SPACING = 10
    let SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2
    // Get theme
    const theme = useSelector(state => state.themeReducer.theme)
    // Get Trending Movies
    const [trendingList, setTrendingList] = useState(null)
    useEffect(() => {
        getTrendingMovies(1)
            .then(res => {
                let tempTrendingList = [
                    {
                        id: 'spacer-1'
                    },
                    ...res.data.results
                    ,
                    {
                        id: 'spacer-2'
                    }
                ]
                setTrendingList(tempTrendingList)
            })
        return null
    }, [])

    //Render Backdrop
    const Backdrop = () => {
        return (
            <View style={{
                position: 'absolute',
                width,
                height: BACKDROP_HEIGHT
            }}>
                <FlatList
                    data={trendingList}
                    keyExtractor={item => `backdrop-${item.id}`}
                    contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
                    removeClippedSubviews={false}
                    initialNumToRender={5}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 2) * ITEM_SIZE,
                            (index - 1) * ITEM_SIZE
                        ]
                        const translateX = scrollX.interpolate({
                            inputRange,
                            outputRange: [-width, 0]
                        })
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0, 1]
                        })
                        if (!item.original_title) {
                            return null
                        }
                        return (
                            <Animated.View
                                style={{
                                    position: 'absolute',
                                    width,
                                    height: BACKDROP_HEIGHT,
                                    overflow: 'hidden',
                                    transform: [
                                        {
                                            translateX
                                        }
                                    ],
                                    opacity
                                }}
                            >
                                <Image
                                    source={{ uri: `${IMAGE_PATH_HIGH}${item.backdrop_path}` }}
                                    style={{
                                        width,
                                        height: BACKDROP_HEIGHT
                                    }}
                                />
                            </Animated.View>
                        )
                    }}
                />
                <LinearGradient
                    colors={['transparent', theme?.background_color]}
                    style={{
                        width,
                        height: BACKDROP_HEIGHT,
                        position: 'absolute',
                        bottom: 0
                    }}
                />
            </View>
        )
    }

    // Render Trending Movies List
    const TrendingMovies = () => {
        return (
            <Animated.FlatList
                data={trendingList}
                keyExtractor={item => `trending-${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_SIZE}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                bounces={false}
                snapToAlignment='start'
                initialNumToRender={5}
                contentContainerStyle={{ alignItems: 'center', marginTop: 50 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: true
                    }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE
                    ]
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, -60, 0]
                    })

                    if (!item.original_title) {
                        return <View style={{
                            width: SPACER_ITEM_SIZE
                        }} />
                    }

                    return (
                        <RNBounceable
                            style={{
                                width: ITEM_SIZE
                            }}
                            onPress={() => navigation.navigate(routeName.movie_details, { items: item })}
                        >
                            <Animated.View style={{
                                backgroundColor: theme?.background_color,
                                padding: SPACING * 2,
                                borderRadius: SIZES.radius,
                                marginHorizontal: SPACING,
                                transform: [
                                    {
                                        translateY
                                    }
                                ]
                            }}>
                                <Image
                                    source={{ uri: `${IMAGE_PATH_LOW}${item.poster_path}` }}
                                    style={{
                                        width: '100%',
                                        height: null,
                                        aspectRatio: 9 / 14.5,
                                        borderRadius: SIZES.radius
                                    }}
                                    resizeMode='stretch'
                                />
                                <Text
                                    numberOfLines={2}
                                    style={[styles.title, { color: theme?.text_color }]}
                                >
                                    {item.original_title}
                                </Text>
                                <Text
                                    numberOfLines={4}
                                    style={[styles.overview, { color: theme?.text_color }]}
                                >
                                    {item.overview}
                                </Text>
                            </Animated.View>
                        </RNBounceable>
                    )
                }}
            />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme?.background_color }}>
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={'transparent'}
            />
            <Backdrop />
            <TrendingMovies />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
        ...FONTS.h4,
        marginTop: SIZES.base
    },
    overview: {
        textAlign: 'center',
        ...FONTS.h5
    }
})

export default Trending


