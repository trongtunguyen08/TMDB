import { LinearGradient } from 'expo-linear-gradient'
import React, { useState, useLayoutEffect } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe"
import RNBounceable from '@freakycoder/react-native-bounceable'
import { useSelector } from 'react-redux'

import { FONTS, routeName, SIZES } from '../../assets'
import { IMAGE_PATH_HIGH, IMAGE_PATH_LOW, getDetails, getCredits, getVideos } from '../../services'

const MovieDetails = ({ navigation, route }) => {
    // Get selected movie
    const { items, mediaType } = route.params
    // Contants
    const theme = useSelector(state => state.themeReducer.theme)
    let BACKDROP_IMAGE_HEIGHT = SIZES.height * .72
    let POSTER_WIDTH = SIZES.width * .65
    // Get Details
    const [movieDetails, setMovieDetails] = useState(null)
    const [credits, setCredits] = useState(null)
    const [trailer, setTrailer] = useState(null)

    useLayoutEffect(() => {
        getDetails(items?.media_type || mediaType, items?.id)
            .then(res => {
                setMovieDetails(res.data)
                return getCredits(items?.media_type || mediaType, items?.id)
            })
            .then(res => {
                const tempCredits = res.data.cast.filter(item => item.known_for_department == 'Acting' && item.profile_path != "")
                setCredits(tempCredits)
                return getVideos(items?.media_type || mediaType, items?.id)
            })
            .then(res => {
                const temptVideos = res.data.results.filter(item => item.site == 'YouTube')[0]
                setTrailer(temptVideos)
            })
    }, [])

    if (!movieDetails || !credits || !trailer) {
        return null
    }

    return (
        <View
            style={[styles.container, { backgroundColor: theme?.background_color }]}
        >
            {/* Statusbar */}
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={'transparent'}
            />
            {/* Content */}
            <ScrollView
                style={styles.container}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {/* Backdrop Image */}
                <View
                    style={{
                        width: '100%',
                        height: BACKDROP_IMAGE_HEIGHT,
                        position: 'absolute',
                    }}
                >
                    <Image
                        source={{ uri: `${IMAGE_PATH_LOW}${movieDetails?.backdrop_path}` }}
                        style={StyleSheet.absoluteFillObject}
                        blurRadius={5}
                    />
                    <LinearGradient
                        colors={['transparent', theme?.background_color]}
                        style={{
                            width: SIZES.width,
                            height: BACKDROP_IMAGE_HEIGHT,
                            position: 'absolute',
                            bottom: 0
                        }}
                    />
                </View>

                {/* Content */}
                <SafeAreaView
                    style={styles.container}
                >
                    <View
                        style={styles.contentView}
                    >
                        {/* Poster, name, overview */}
                        <>
                            <Image
                                source={{ uri: `${IMAGE_PATH_HIGH}${movieDetails?.poster_path}` }}
                                style={{
                                    width: POSTER_WIDTH,
                                    height: null,
                                    aspectRatio: 9 / 15,
                                    borderRadius: SIZES.radius
                                }}
                                resizeMode='stretch'
                            />
                            <Text
                                style={[styles.title, { color: theme?.text_color }]}
                            >
                                {movieDetails?.original_title}
                            </Text>
                            <Text
                                style={[styles.overview, { color: theme?.text_color }]}
                            >
                                {movieDetails?.overview}
                            </Text>
                        </>

                        {/* Lenght, Language, release data */}
                        <View
                            style={styles.menuWrapper}
                        >
                            <View
                                style={styles.menuContentWrapper}
                            >
                                <Text
                                    style={[styles.menuLabel, { color: theme?.text_color }]}
                                >
                                    Lenght
                                </Text>
                                <Text
                                    style={[styles.menuValueText, { color: theme?.text_color }]}
                                >
                                    {movieDetails?.runtime} minutes
                                </Text>
                            </View>
                            <View
                                style={styles.menuContentWrapper}
                            >
                                <Text
                                    style={[styles.menuLabel, { color: theme?.text_color }]}
                                >
                                    Genres
                                </Text>
                                {
                                    movieDetails?.genres.map((item) => {
                                        return (
                                            <Text
                                                key={`genres-${item.id}`}
                                                style={[styles.menuValueText, { color: theme?.text_color }]}
                                            >
                                                {item.name} minutes
                                            </Text>
                                        )
                                    })
                                }
                            </View>
                            <View
                                style={styles.menuContentWrapper}
                            >
                                <Text
                                    style={[styles.menuLabel, { color: theme?.text_color }]}
                                >
                                    Rating
                                </Text>
                                <Text
                                    style={[styles.menuValueText, { color: theme?.text_color }]}
                                >
                                    {movieDetails?.vote_average}/10
                                </Text>
                            </View>
                        </View>

                        {/* Language, Company, Release Date */}
                        <View
                            style={styles.menuWrapper}
                        >
                            <View
                                style={styles.menuContentWrapper}
                            >
                                <Text
                                    style={[styles.menuLabel, { color: theme?.text_color }]}
                                >
                                    Language
                                </Text>
                                {
                                    movieDetails?.spoken_languages.map((item) => {
                                        return (
                                            <Text
                                                key={`language-${item.english_name}`}
                                                style={[styles.menuValueText, { color: theme?.text_color }]}
                                            >
                                                {item.english_name}
                                            </Text>
                                        )
                                    })
                                }
                            </View>
                            <View
                                style={styles.menuContentWrapper}
                            >
                                <Text
                                    style={[styles.menuLabel, { color: theme?.text_color }]}
                                >
                                    Companies
                                </Text>
                                {
                                    movieDetails?.production_companies.map((item) => {
                                        return (
                                            <Text
                                                key={`companies-${item.id}`}
                                                style={[styles.menuValueText, { color: theme?.text_color }]}
                                            >
                                                {item.name}
                                            </Text>
                                        )
                                    })
                                }
                            </View>
                            <View
                                style={styles.menuContentWrapper}
                            >
                                <Text
                                    style={[styles.menuLabel, { color: theme?.text_color }]}
                                >
                                    Release Date
                                </Text>
                                <Text
                                    style={[styles.menuValueText, { color: theme?.text_color }]}
                                >
                                    {movieDetails?.release_date}
                                </Text>
                            </View>
                        </View>

                        {/* The Cast */}
                        <View
                            style={[
                                styles.menuWrapper,
                                { flexDirection: 'column', paddingHorizontal: 0 }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.menuLabel,
                                    {
                                        marginLeft: SIZES.radius,
                                        color: theme?.text_color
                                    }
                                ]}
                            >
                                The Cast
                            </Text>
                            <FlatList
                                data={credits}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => `cast-${index}`}
                                contentContainerStyle={styles.castImageWrapper}
                                initialNumToRender={5}
                                renderItem={({ item, index }) => {
                                    if (index < 10) {
                                        return (
                                            <RNBounceable
                                                onPress={() => navigation.navigate(routeName.actor_details, { items: item })}
                                            >
                                                <Image
                                                    source={{ uri: `${IMAGE_PATH_LOW}${item.profile_path}` }}
                                                    style={[
                                                        styles.castImage,
                                                        {
                                                            marginLeft: index == 0 ? SIZES.radius : 0
                                                        }
                                                    ]}
                                                />
                                            </RNBounceable>
                                        )
                                    }

                                }}
                            />
                        </View>

                        {/* Trailer */}
                        <View
                            style={[
                                styles.menuWrapper,
                                { flexDirection: 'column' }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.menuLabel,
                                    {
                                        marginBottom: SIZES.base,
                                        color: theme?.text_color
                                    }
                                ]}
                            >
                                Trailer
                            </Text>
                            <YoutubePlayer
                                height={270}
                                play={false}
                                videoId={trailer?.key}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default MovieDetails

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentView: {
        alignItems: 'center',
        marginTop: StatusBar.currentHeight + SIZES.base
    },
    title: {
        ...FONTS.h2,
        marginTop: SIZES.radius,
        textAlign: 'center'
    },
    overview: {
        ...FONTS.body4,
        textAlign: 'center',
        paddingHorizontal: SIZES.base
    },
    menuWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: SIZES.base,
        paddingHorizontal: SIZES.radius
    },
    menuContentWrapper: {
        flexShrink: 1
    },
    menuLabel: {
        ...FONTS.h5,
        fontWeight: '700'
    },
    menuValueText: {
        ...FONTS.body5
    },
    castImageWrapper: {
        marginTop: SIZES.base
    },
    castImage: {
        width: 160,
        height: null,
        aspectRatio: 9 / 16,
        marginRight: SIZES.base,
        borderRadius: SIZES.radius
    }
})
