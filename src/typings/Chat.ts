import {User} from './User';

export interface Chat {
    id: string;
    user: User;
    datetime: Date; // stored as Unix date
    message: string; // allow for url for images
    status: string; // read or unread
}