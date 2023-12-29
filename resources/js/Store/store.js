import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../State/theme'

export default configureStore({
    reducer: {
        theme: themeReducer
    }
})