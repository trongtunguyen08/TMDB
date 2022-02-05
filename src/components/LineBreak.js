import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { FONTS, SIZES } from '../../assets'

const LineBreak = ({ text, containerStyle }) => {
    // Get theme
    const theme = useSelector(state => state.themeReducer.theme)
    return (
        <View
            style={[
                styles.container,
                {
                    ...containerStyle
                }
            ]}
        >
            <View style={[
                styles.line,
                {
                    borderColor: theme?.text_color
                }
            ]} />
            <Text
                style={[
                    styles.lineText,
                    {
                        color: theme?.text_color
                    }
                ]}
            >
                {text}
            </Text>
            <View style={[
                styles.line,
                {
                    borderColor: theme?.text_color
                }
            ]} />
        </View>
    )
}

export default LineBreak

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        borderWidth: 0.5,
        flex: 1
    },
    lineText: {
        ...FONTS.body5,
        marginHorizontal: SIZES.padding2
    }
})
