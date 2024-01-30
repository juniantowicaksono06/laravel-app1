import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ThemeReducer from '../State/theme'
import SelectedChatReducer from '../State/chat'
import AppViewReducer from '../State/appView'

const rootReducer = combineReducers({
    theme: ThemeReducer,
    selectedChat: SelectedChatReducer,
    appView: AppViewReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default configureStore({
    reducer: rootReducer
})