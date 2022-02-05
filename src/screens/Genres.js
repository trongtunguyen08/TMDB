import React, { useState, useEffect } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid'
import RNBounceable from '@freakycoder/react-native-bounceable'

import { getMovieAndTVByID, IMAGE_PATH_LOW } from '../../services'
import { routeName, SIZES } from '../../assets'

const Genres = ({ navigation, route }) => {
    const { items } = route.params
    // Get theme
    const theme = useSelector(state => state.themeReducer.theme)
    // Custom Header
    navigation.setOptions({
        headerShown: true,
        headerLargeTitle: true,
        title: items?.name,
        headerStyle: {
            backgroundColor: theme?.background_color
        },
        headerTintColor: theme?.text_color,
        headerBackTitle: ''
    })

    // Get Movies by Genre ID
    const [movies, setMovies] = useState(null)
    useEffect(() => {
        getMovieAndTVByID('movie', items?.id, 1)
            .then(res => {
                setMovies(res.data.results)
            })
    }, [])

    if (!movies) {
        return null
    }

    return (
        <FlatGrid
            data={movies}
            itemDimension={130}
            spacing={15}
            keyExtractor={item => `list-movie-by-genre-${item.id}`}
            style={{
                backgroundColor: theme?.background_color
            }}
            contentContainerStyle={{
                paddingBottom: 40
            }}
            renderItem={({ item }) => {
                return (
                    <RNBounceable
                        onPress={() => navigation.navigate(routeName.movie_details, { items: item, mediaType: 'movie' })}
                    >
                        <Image
                            source={{ uri: `${IMAGE_PATH_LOW}${item?.poster_path}` }}
                            style={{
                                width: '100%',
                                height: null,
                                aspectRatio: 9 / 14.5,
                                borderRadius: SIZES.base
                            }}
                            resizeMode='stretch'
                        />
                    </RNBounceable>
                )
            }}
        />
    )
}

export default Genres

const styles = StyleSheet.create({})
