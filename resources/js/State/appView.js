import { createSlice } from '@reduxjs/toolkit'

export const appViewSlice = createSlice({
    name: "appView",
    initialState: {
        appWidth: 0,
        icon: {
            "chat": "fa-comments",
            "settings": "fa-gear",
            "theme": "fa-moon",
            "logout": "fa-right-from-bracket text-dark"
        }
    },
    reducers: {
        setAppWidth: (state, action) => {
            state.appWidth = action.payload
        },
        setAppIcon: (state, action) => {
            state.icon = action.payload
        }
    }
})

export const { setAppWidth, setAppIcon } = appViewSlice.actions
export default appViewSlice.reducer