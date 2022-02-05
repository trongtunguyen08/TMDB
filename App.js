import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { useFonts } from 'expo-font'

import { themeReducer } from './assets/theme/themeReducer'
import { MainNavigator } from './navigation/MainNavigator'

const store = createStore(
  combineReducers({
    themeReducer
  }),
  applyMiddleware(thunk)
)

export default function App() {
  const [loaded] = useFonts({
    Roboto_Black: require('./assets/fonts/Roboto-Black.ttf'),
    Roboto_Bold: require('./assets/fonts/Roboto-Bold.ttf'),
    Roboto_Regular: require('./assets/fonts/Roboto-Regular.ttf')
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider
      store={store}
    >
      <MainNavigator />
    </Provider>
  )
}
