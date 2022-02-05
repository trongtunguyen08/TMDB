import React from 'react'
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import { SIZES } from '../../assets'

const ContainerView = (props) => {
    // isFocused
    const isFocused = useIsFocused()
    // Get theme
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
            <SafeAreaView
                style={styles.safeView}
            >
                {/* Status Bar */}
                {
                    isFocused &&
                    <StatusBar
                        barStyle={theme?.status_bar}
                        backgroundColor={theme?.background_color}
                    />
                }
                <View
                    style={[
                        styles.content,
                        {
                            ...props.containerStyle
                        }
                    ]}
                >
                    {props.children}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default ContainerView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding
    },
    safeView: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
