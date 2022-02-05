import React, { useState, useRef } from 'react'
import RNBounceable from '@freakycoder/react-native-bounceable'
import { SafeAreaView, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'
import { FlatGrid } from 'react-native-super-grid'

import { FONTS, generalColors, routeName, SIZES } from '../../assets'
import { searchMoviesAndTV, IMAGE_PATH_LOW } from '../../services'

const Search = ({ navigation }) => {
    // Get theme
    const theme = useSelector(state => state.themeReducer.theme)
    const typingTimeoutRef = useRef()
    const [mediaType, setMediaType] = useState("movie") //movie or tv
    const [movies, setMovies] = useState(null)

    // Render Movie List
    const renderMovieList = () => (
        <FlatGrid
            itemDimension={130}
            data={movies}
            spacing={SIZES.radius}
            keyExtractor={item => `movies-${item.id}`}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
                <RNBounceable
                    onPress={() => navigation.navigate(routeName.movie_details, { items: item, mediaType: mediaType })}
                >
                    <Image
                        source={{ uri: `${IMAGE_PATH_LOW}${item.poster_path}` }}
                        style={{
                            width: '100%',
                            height: null,
                            aspectRatio: 9 / 16,
                            borderRadius: 5
                        }}
                    />
                </RNBounceable>
            )}
        />
    )

    // Black Space
    const renderBlankSpace = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
                source={require('../../assets/lottie/people.json')}
                autoPlay
                loop
                style={{
                    width: 250,
                    height: 250
                }}
            />
        </View>
    )

    const onChangeText = text => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            let searchKey = text.replace(' ', '+')
            if (searchKey) {
                searchMoviesAndTV(mediaType, searchKey)
                    .then(res => {
                        const newList = res.data.results.filter((item) => item.poster_path != null)
                        setMovies(newList)
                    })
            } else {
                setMovies(null)
            }
        }, 500)
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background_color }}>
            <View style={{ flex: 1 }}>
                {/* Media Type */}
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <RNBounceable
                        style={{
                            paddingVertical: SIZES.base,
                            paddingHorizontal: SIZES.base * 2,
                            backgroundColor: mediaType == 'movie' ? generalColors.light_blue : generalColors.gray_10,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => {
                            setMediaType('movie')
                        }}
                    >
                        <Text style={{ ...FONTS.h3, color: mediaType == 'movie' ? generalColors.white : generalColors.gray_30 }}>Movies</Text>
                    </RNBounceable>
                    <RNBounceable
                        style={{
                            paddingVertical: SIZES.base,
                            paddingHorizontal: SIZES.base * 2,
                            backgroundColor: mediaType == 'tv' ? generalColors.light_blue : generalColors.gray_10,
                            borderRadius: SIZES.radius,
                            marginLeft: SIZES.base
                        }}
                        onPress={() => {
                            setMediaType('tv')
                        }}
                    >
                        <Text style={{ ...FONTS.h3, color: mediaType == 'tv' ? generalColors.white : generalColors.gray_30 }}>TV Shows</Text>
                    </RNBounceable>
                </View>
                {/* Search Input */}
                <TextInput
                    placeholder='Enter your favourite tv/movies...'
                    placeholderTextColor={theme?.text_color}
                    style={{
                        paddingVertical: SIZES.base,
                        paddingHorizontal: SIZES.base * 2,
                        marginHorizontal: SIZES.radius,
                        marginTop: SIZES.base,
                        borderWidth: 0.5,
                        borderColor: theme?.text_color,
                        borderRadius: SIZES.radius,
                        ...FONTS.h5,
                        color: theme?.text_color
                    }}
                    onChangeText={onChangeText}
                />
                {/* Content */}
                {
                    movies != null
                        ?
                        renderMovieList()
                        :
                        renderBlankSpace()
                }
            </View>
        </SafeAreaView >
    )
}

export default Search

const styles = StyleSheet.create({})
