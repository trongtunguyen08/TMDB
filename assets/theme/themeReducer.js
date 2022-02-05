import { lightTheme } from './theme'
import {
    SWITCH_THEME
} from './themeActions'

const initaialState = {
    theme: lightTheme
}

const themeReducer = (state = initaialState, action) => {
    switch (action.type) {
        case SWITCH_THEME:
            return { theme: action.theme }
        default:
            return state
    }
}

export {
    themeReducer
}