import React, { useEffect } from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import { asyncStorageKey, darkTheme, lightTheme, images, SIZES, routeName } from '../../assets'
import { toggleTheme } from '../../assets/theme/themeActions'
import { AutoHeightImage } from '../components'

const Splash = ({ navigation }) => {
    // isFocused
    const isFoused = useIsFocused()
    //Get theme from storage
    const dispatch = useDispatch()
    const getTheme = async () => {
        try {
            const data = await AsyncStorage.getItem(asyncStorageKey.THEME_MODE)
            if (data != null) {
                if (data == 'dark') {
                    dispatch(toggleTheme(darkTheme))
                } else {
                    dispatch(toggleTheme(lightTheme))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTheme()
        setTimeout(() => {
            navigation.replace(routeName.landing)
        }, 1000)
    }, [])

    //Get redux theme
    const theme = useSelector(state => state.themeReducer.theme)

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme?.background_color
                }
            ]}
        >
            {/* Status Bar */}
            {
                isFoused &&
                <StatusBar
                    barStyle={theme?.status_bar}
                    backgroundColor={theme?.background_color}
                />
            }

            {/* Logo */}
            <AutoHeightImage
                image={images.logo}
                size={150}
            />

            {/* Indicator */}
            <ActivityIndicator
                style={styles.indicator}
                color={theme?.text_color}
            />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicator: {
        marginTop: SIZES.radius
    }
})
