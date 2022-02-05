const SWITCH_THEME = 'SWITCH_THEME'

const toggleTheme = (themeValue) => {
    return (dispatch) => {
        dispatch({
            type: SWITCH_THEME,
            theme: themeValue
        })
    }
}

export {
    SWITCH_THEME,
    toggleTheme
}