import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window")

const darkTheme = {
    mode: 'dark',
    background_color: '#000000',
    text_color: '#FFFFFF',
    status_bar: 'light-content'
}

const lightTheme = {
    mode: 'light',
    background_color: '#FFFFFF',
    text_color: '#404040',
    status_bar: 'dark-content'
}

const generalColors = {
    primary: '#0D253F',
    light_blue: '#01B4E4',
    light_green: '#90CEA1',
    gray_10: '#F0F0F0',
    gray_20: '#C0C0C0',
    gray_30: '#808080',
    white: '#FFFFFF'
}

const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
}

const FONTS = {
    h1: { fontFamily: "Roboto_Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto_Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto_Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto_Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto_Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto_Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto_Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto_Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto_Regular", fontSize: SIZES.body5, lineHeight: 22 },
}

export {
    darkTheme,
    lightTheme,
    generalColors,
    SIZES,
    FONTS
}