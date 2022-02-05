import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

import { SIZES, FONTS, generalColors } from '../../assets'
import { IMAGE_PATH_LOW, getDetailsPeople, getMoviesByCastID } from '../../services'


const ActorDetails = ({ navigation, route }) => {
    // Get Params
    const { items } = route.params
    // Get theme
    const theme = useSelector(state => state.themeReducer.theme)
    // Get Actor details
    const [details, setDetails] = useState(null)
    const [movies, setMovies] = useState(null)
    useEffect(() => {
        getDetailsPeople(items.id)
            .then(res => {
                setDetails(res.data)
                getMoviesByCastID(items.id)
                    .then(res => {
                        const tempMovies = res.data.cast.filter(item => item.poster_path != "")
                        setMovies(tempMovies)
                    })
            })
    }, [])
    return (
        <View
            style={[styles.container, { backgroundColor: theme?.background_color }]}
        >
            {/* Status Bar */}
            <StatusBar
                barStyle='default'
                translucent
                backgroundColor={'transparent'}
            />

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView
                    style={styles.container}
                >
                    {/* Backdrop Image */}
                    <View
                        style={styles.backdropImageWrapper}
                    >
                        <Image
                            source={{ uri: `${IMAGE_PATH_LOW}${items?.profile_path}` }}
                            style={StyleSheet.absoluteFillObject}
                            blurRadius={5}
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

                    {/* Content */}
                    <View
                        style={styles.content}
                    >
                        {/* Actor Image */}
                        <Image
                            source={{ uri: `${IMAGE_PATH_LOW}${items?.profile_path}` }}
                            style={{
                                width: SIZES.width * .8,
                                height: null,
                                aspectRatio: 9 / 16,
                                borderRadius: SIZES.base,
                                marginTop: SIZES.padding
                            }}
                        />
                        {/* Actor name */}
                        <Text
                            style={[styles.actorName, { color: theme?.text_color }]}
                        >
                            {items?.name}
                        </Text>
                        {/* Biography */}
                        <Text
                            style={[styles.actorBiography, { color: theme?.text_color }]}
                        >
                            {details?.biography}
                        </Text>
                        {/* Participate in */}
                        <Text
                            style={[styles.menuLabel, { color: theme?.text_color }]}
                        >
                            Participate in
                        </Text>
                        {/* List Movies  */}
                        <FlatList
                            data={movies}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            initialNumToRender={5}
                            contentContainerStyle={{
                                marginVertical: SIZES.base
                            }}
                            keyExtractor={item => `movies_by_cast-${item.id}`}
                            renderItem={({ item, index }) => {
                                return (
                                    <Image
                                        source={{ uri: `${IMAGE_PATH_LOW}${item.poster_path}` }}
                                        style={{
                                            width: 200,
                                            height: null,
                                            aspectRatio: 9 / 16,
                                            marginLeft: index == 0 ? SIZES.radius : 0,
                                            marginRight: SIZES.base,
                                            borderRadius: SIZES.base
                                        }}
                                    />
                                )
                            }}
                        />

                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default ActorDetails

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center'
    },
    backdropImageWrapper: {
        position: 'absolute',
        width: '100%',
        height: SIZES.height / 2
    },
    actorName: {
        ...FONTS.h1,
        fontWeight: 'bold',
        marginTop: SIZES.base
    },
    actorBiography: {
        ...FONTS.body4,
        textAlign: 'center',
        marginHorizontal: SIZES.padding
    },
    menuLabel: {
        alignSelf: 'flex-start',
        ...FONTS.h5,
        fontWeight: 'bold',
        marginLeft: SIZES.radius
    }
})
