import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppViewState, IconState } from '../interface'

export const appViewSlice = createSlice({
    name: "appView",
    initialState: {
        appWidth: window.innerWidth,
        appHeight: window.innerHeight,
        mobileBottomBarHeight: 70,
        chatInputheight: 90,
        icon: {
            "home": "fa-house",
            "chat": "fa-comments",
            "create": "fa-plus",
            "theme": "fa-moon",
            "user": "fa-user"
        },
        chatContentHeight: 0
    } as AppViewState,
    reducers: {
        setAppWidth: (state, action: PayloadAction<number>) => {
            state.appWidth = action.payload
        },
        setAppHeight: (state, action: PayloadAction<number>) => {
            state.appHeight = action.payload
        },
        setAppIcon: (state, action: PayloadAction<IconState>) => {
            state.icon = action.payload
        },
        setChatContentHeight: (state, action: PayloadAction<number>) => {
            state.chatContentHeight = action.payload
        }
    }
})

export const { setAppIcon, setChatContentHeight, setAppHeight, setAppWidth } = appViewSlice.actions
export default appViewSlice.reducer