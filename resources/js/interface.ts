
import { PageProps } from '@inertiajs/inertia'

import { SweetAlert2Props } from "react-sweetalert2"

type IconState = {
    home: string,
    chat: string,
    create: string,
    theme: string,
    user: string
}

interface AppViewState {
    appWidth: number,
    appHeight: number,
    mobileBottomBarHeight: number,
    chatInputheight: number
    icon: IconState,
    chatContentHeight: number
}

interface SelectedChatState {
    character_id: string,
    character_name: string,
    character_pic: string
}

interface ChatItemState {
    character_image: string,
    character_name: string,
    _id: string
}

interface ChatListPage extends PageProps {
    usersCharacters: {
        characters: ChatItemState[]
    }
}


export type { AppViewState, IconState, SelectedChatState, ChatItemState, ChatListPage }