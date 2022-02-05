import React from 'react'
import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { FONTS, icons, SIZES } from '../../assets'

const Input = (props) => {
    // Props
    const { containerStyle, icon, password } = props
    // Get theme
    const theme = useSelector(state => state.themeReducer.theme)

    return (
        <View
            style={[
                styles.container,
                {
                    ...containerStyle,
                    borderColor: theme?.text_color
                }
            ]}
        >
            <Image
                source={icon}
                style={[
                    styles.icon,
                    {
                        tintColor: theme?.text_color
                    }
                ]}
                resizeMode='stretch'
            />
            <TextInput
                style={[
                    styles.input,
                    {
                        color: theme?.text_color
                    }
                ]}
                secureTextEntry={(password == true) ? true : false}
                placeholderTextColor={theme?.text_color}
                {...props}
            />
            {
                (password == true) &&
                <Image
                    source={icons.hide}
                    style={[styles.icon, styles.rightIcon, { tintColor: theme?.text_color }]}
                />
            }
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.base,
        borderWidth: 0.5,
        borderRadius: SIZES.base
    },
    icon: {
        width: 25,
        height: 25
    },
    input: {
        flex: 1,
        marginLeft: SIZES.base,
        ...FONTS.h5
    },
    rightIcon: {
        marginLeft: SIZES.base
    }
})
