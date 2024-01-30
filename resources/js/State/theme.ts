import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        value: "light"
    },
    reducers: {
        turnDark: (state) => {
            state.value = "dark"
        },
        turnLight: (state) => {
            state.value = "light"
        }
    }
})

export const { turnDark, turnLight } = themeSlice.actions
export default themeSlice.reducer