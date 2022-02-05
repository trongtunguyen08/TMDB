import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { FONTS, generalColors, icons, SIZES, asyncStorageKey, darkTheme, lightTheme, routeName } from '../../assets'
import { Button, ContainerView, Icon, Input, LineBreak } from '../components'
import { toggleTheme } from '../../assets/theme/themeActions'

const Login = ({ navigation }) => {
    // Get theme
    const theme = useSelector(state => state.themeReducer.theme)
    // Toggle Theme
    const dispatch = useDispatch()
    const switchTheme = async () => {
        if (theme?.mode == 'light') {
            dispatch(toggleTheme(darkTheme))
            await AsyncStorage.setItem(asyncStorageKey.THEME_MODE, 'dark')
        } else {
            dispatch(toggleTheme(lightTheme))
            await AsyncStorage.setItem(asyncStorageKey.THEME_MODE, 'light')
        }
    }

    return (
        <ContainerView
            containerStyle={styles.container}
        >
            {/* Top View */}
            <View
                style={styles.topView}
            >
                <Text
                    style={[
                        styles.topViewHeaderText,
                        {
                            color: theme?.text_color
                        }
                    ]}
                    numberOfLines={1}
                >
                    Welcome Back
                </Text>
                <Text
                    style={[
                        styles.topViewSubHeaderText,
                        {
                            color: theme?.text_color
                        }
                    ]}
                    numberOfLines={1}
                >
                    Please login to your account
                </Text>
            </View>

            {/* Middle View */}
            <View
                style={styles.middleView}
            >
                <Input
                    placeholder='Username'
                    icon={icons.user}
                />
                <Input
                    placeholder='Password'
                    icon={icons.padlock}
                    password={true}
                    containerStyle={styles.input}
                />
                <Text
                    style={styles.forgotPassword}
                >
                    Forgot Password?
                </Text>
                <Button
                    text='Login'
                    containerStyle={styles.button}
                />
            </View>

            {/* Bottom View */}
            <View
                style={styles.bottomView}
            >
                <LineBreak
                    text='Or continue with'
                />
                {/* Social Icon */}
                <View
                    style={styles.loginBySocialsWrapper}
                >
                    <Icon
                        size={25}
                        icon={icons.google}
                        containerStyle={styles.socialIcon}
                    />
                    <Icon
                        size={25}
                        icon={icons.facebook}
                        containerStyle={styles.socialIcon}
                    />
                    <Icon
                        size={25}
                        icon={icons.apple}
                        containerStyle={styles.socialIcon}
                        tintColor={theme?.text_color}
                    />
                </View>
                <View
                    style={styles.registerWrapper}
                >
                    <Text
                        style={[
                            styles.registerLabel,
                            {
                                color: theme?.text_color
                            }
                        ]}
                    >
                        You new here?
                    </Text>
                    <Text
                        style={[styles.registerLabel, styles.registerText]}
                    >
                        Register
                    </Text>
                </View>
                <Button
                    text='Continue as Guest'
                    containerStyle={styles.guestButton}
                    onPress={() => navigation.navigate(routeName.home)}
                />
                {/* Toggle Theme Mode */}
                <View
                    style={styles.themeWrapper}
                >
                    <Icon
                        icon={icons.moon}
                        size={25}
                        onPress={switchTheme}
                        tintColor={theme?.text_color}
                    />
                    <Text
                        style={[
                            styles.themeText,
                            {
                                color: theme?.text_color
                            }
                        ]}
                    >
                        {theme?.mode}
                    </Text>
                </View>
            </View>
        </ContainerView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly'
    },
    topView: {
        width: '100%',
        alignItems: 'center'
    },
    topViewHeaderText: {
        ...FONTS.h1,
    },
    topViewSubHeaderText: {
        ...FONTS.body4,
        opacity: 0.5
    },
    middleView: {
        width: '100%'
    },
    input: {
        marginTop: SIZES.radius
    },
    forgotPassword: {
        textAlign: 'right',
        marginTop: SIZES.radius,
        color: generalColors.light_blue
    },
    button: {
        marginTop: SIZES.radius,
        width: '100%'
    },
    bottomView: {
        width: '100%'
    },
    loginBySocialsWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: SIZES.radius
    },
    socialIcon: {
        borderWidth: 0.5,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.radius,
        borderRadius: SIZES.base,
        borderColor: generalColors.gray_20
    },
    registerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: SIZES.radius
    },
    registerLabel: {
        ...FONTS.h5
    },
    registerText: {
        color: generalColors.light_blue,
        marginLeft: 3,
        ...FONTS.h4
    },
    guestButton: {
        marginTop: SIZES.radius,
        backgroundColor: generalColors.light_green
    },
    themeWrapper: {
        alignSelf: 'center',
        marginTop: SIZES.padding,
        alignItems: 'center'
    },
    themeText: {
        marginTop: 5,
        textTransform: 'capitalize',
        ...FONTS.body5
    }
})
