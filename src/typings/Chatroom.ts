import {User} from './User';
import { Chat } from './Chat';

export interface Chatroom {
    id: string;
    users: [{
        userid: string,
        username: string,
        avatar: string
    }];
    chats: [{
        id: string;
        user: {
            userid:string,
            username: string,
        };
        datetime: Date; // stored as Unix date
        message: string; // allow for url for images
        status: string; // read or unread
    }]
    lastChat: {
        id: string;
        user: {
            userid:string,
            username: string,
        };
        datetime: Date; // stored as Unix date
        message: string; // allow for url for images
        status: string; //
    };
}

