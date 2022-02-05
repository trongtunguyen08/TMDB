import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'

import { ContainerView, AutoHeightImage, Button } from '../components'
import { FONTS, images, routeName, SIZES } from '../../assets'

const Landing = ({ navigation }) => {
    // Get theme
    const theme = useSelector(state => state.themeReducer.theme)

    return (
        <ContainerView>
            <AutoHeightImage
                image={images.landing}
                size={SIZES.width * .7}
            />
            <Text
                style={[
                    styles.headerText,
                    {
                        color: theme?.text_color
                    }
                ]}
                numberOfLines={1}
            >
                Welcome to TMDB
            </Text>
            <Text
                style={[
                    styles.subHeaderText,
                    {
                        color: theme?.text_color
                    }
                ]}
                numberOfLines={5}
            >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor quisquam atque veritatis nisi labore pariatur. Perferendis perspiciatis eius ex quasi saepe vel repudiandae provident velit quod, facilis quia nostrum aliquid.
            </Text>
            <Button
                text='Get Started'
                containerStyle={styles.button}
                onPress={() => navigation.replace(routeName.login)}
            />
        </ContainerView>
    )
}

export default Landing

const styles = StyleSheet.create({
    headerText: {
        ...FONTS.h1,
        textAlign: 'center',
        marginTop: SIZES.base
    },
    subHeaderText: {
        ...FONTS.body4,
        textAlign: 'center',
        opacity: 0.5
    },
    button: {
        marginTop: SIZES.radius
    }
})
