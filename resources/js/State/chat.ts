import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SelectedChatState } from '../interface'

export const selectedChat = createSlice({
    name: "selectedChat",
    initialState: {
        value: {} as SelectedChatState
    },
    reducers: {
        setChat: (state, action: PayloadAction<SelectedChatState>) => {
            state.value = action.payload
        },
        unsetChat: (state) => {
            state.value = <SelectedChatState>{}
        }
    }
})

export const { setChat, unsetChat } = selectedChat.actions
export default selectedChat.reducer