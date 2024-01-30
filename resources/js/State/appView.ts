import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppViewState, IconState } from '../interface'

export const appViewSlice = createSlice({
    name: "appView",
    initialState: {
        appWidth: 0,
        mobileBottomBarHeight: 70,
        chatInputheight: 90,
        icon: {
            "chat": "fa-comments",
            "settings": "fa-gear",
            "theme": "fa-moon",
            "logout": "fa-right-from-bracket text-dark"
        },
        chatContentHeight: 0
    } as AppViewState,
    reducers: {
        setAppWidth: (state, action: PayloadAction<number>) => {
            state.appWidth = action.payload
        },
        setAppIcon: (state, action: PayloadAction<IconState>) => {
            state.icon = action.payload
        },
        setChatContentHeight: (state, action: PayloadAction<number>) => {
            state.chatContentHeight = action.payload
        }
    }
})

export const { setAppWidth, setAppIcon, setChatContentHeight } = appViewSlice.actions
export default appViewSlice.reducer