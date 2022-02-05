import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'

const Download = () => {
    //Get theme
    const theme = useSelector(state => state.themeReducer.theme)
    return (
        <View style={{ flex: 1, backgroundColor: theme?.background_color, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar
                barStyle={theme?.status_bar}
            />
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
}

export default Download

const styles = StyleSheet.create({})
