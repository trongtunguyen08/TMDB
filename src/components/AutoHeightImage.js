import React from 'react'
import { Image } from 'react-native'

export const AutoHeightImage = ({ image, size, style }) => {
    const e = Image.resolveAssetSource(image)
    return (
        <Image
            source={image}
            style={{
                width: size,
                height: null,
                aspectRatio: e.width / e.height,
                ...style
            }}
        />
    )
}
