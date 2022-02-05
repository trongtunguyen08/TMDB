import RNBounceable from '@freakycoder/react-native-bounceable'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { FONTS, generalColors, SIZES } from '../../assets'

const Button = ({ containerStyle, text, onPress }) => {
    return (
        <RNBounceable
            style={[
                styles.container,
                {
                    ...containerStyle
                }
            ]}
            onPress={onPress}
        >
            <Text
                style={styles.buttonText}
            >
                {text}
            </Text>
        </RNBounceable>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: generalColors.light_blue,
        alignSelf: 'center'
    },
    buttonText: {
        ...FONTS.h3,
        color: generalColors.gray_10
    }
})
