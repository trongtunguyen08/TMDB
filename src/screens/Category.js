import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View, LogBox, StatusBar, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import { getGenre } from '../../services'
import { routeName, SIZES } from '../../assets'
import RNBounceable from '@freakycoder/react-native-bounceable'

const Category = ({ navigation }) => {
    LogBox.ignoreAllLogs(true)
    //Get theme
    const theme = useSelector(state => state.themeReducer.theme)

    const [genres, setGenres] = useState(null)
    useEffect(() => {
        getGenre('movie')
            .then(res => setGenres(res.data.genres))
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background_color }}>
            <ScrollView
                contentContainerStyle={{
                    padding: SIZES.padding,
                    marginTop: StatusBar.currentHeight,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    flex: 1
                }}
                bounces={false}
            >
                {
                    genres?.map((item, index) => {
                        return (
                            <RNBounceable
                                key={`genres-${index}`}
                                style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderWidth: 0.5,
                                    borderColor: theme?.text_color,
                                    borderRadius: SIZES.base,
                                    marginVertical: SIZES.base
                                }}
                                onPress={() => navigation.navigate(routeName.genres, { items: item })}
                            >
                                <Text style={{
                                    color: theme?.text_color
                                }}>
                                    {item?.name}
                                </Text>
                            </RNBounceable>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Category

const styles = StyleSheet.create({})
