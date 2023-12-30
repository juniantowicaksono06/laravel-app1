import { createSlice } from '@reduxjs/toolkit'

export const selectedChat = createSlice({
    name: "selectedChat",
    initialState: {
        value: {}
    },
    reducers: {
        setChat: (state, action) => {
            state.value = action.payload
        },
        unsetChat: (state) => {
            state.value = {}
        }
    }
})

export const { setChat, unsetChat } = selectedChat.actions
export default selectedChat.reducer