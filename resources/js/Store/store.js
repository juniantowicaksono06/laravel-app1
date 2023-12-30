import { configureStore } from '@reduxjs/toolkit'
import ThemeReducer from '../State/theme'
import SelectedChatReducer from '../State/chat'
import AppViewReducer from '../State/appView'

export default configureStore({
    reducer: {
        theme: ThemeReducer,
        selectedChat: SelectedChatReducer,
        appView: AppViewReducer
    }
})