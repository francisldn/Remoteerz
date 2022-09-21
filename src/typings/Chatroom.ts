import {User} from './User';
import { Chat } from './Chat';

export interface Chatroom {
    id: string;
    user: User[];
    chats:Chat[];
    lastChat:Chat;
}

