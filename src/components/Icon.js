import RNBounceable from '@freakycoder/react-native-bounceable'
import React from 'react'
import { Image } from 'react-native'

const Icon = ({ icon, size, containerStyle, onPress, tintColor }) => {
    return (
        <RNBounceable
            style={containerStyle}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: size,
                    height: size,
                    tintColor: tintColor
                }}
            />
        </RNBounceable>
    )
}

export default Icon
