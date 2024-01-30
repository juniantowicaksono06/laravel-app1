
import { PageProps, Page, ErrorBag, Errors } from '@inertiajs/inertia'

type IconState = {
    chat: string,
    settings: string,
    theme: string,
    logout: string
}

interface AppViewState {
    appWidth: number,
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