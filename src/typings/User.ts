import {Chatroom} from './Chatroom';
export interface User {
    uid: string;
    username: string; 
    email:string;
    avatar:string; 
    display_status:boolean; //public, private
    relationship_status:string; // single, partnered, 
    gender_preference:string; //men, women, both
    sexual_orientation:string; //gay, straight, lesbian, bisexual, asexual, curious, none of the above
    dietary_preference: string; //vegan, vegetarian, pescatarian, kosher, halal, flexitarian, carnivore, omnivore
    age:number;
    dob:Date;
    gender: string; //male, female, prefer not to say
    about:string; 
    interests: string[];
    job_title:string;
    skills: string[];
    countries_travelled: string[];
    countries_lived:string[]
    last_destination:string;
    next_destination:string;
    phone_number:number;
    photo:string[]; 
    myFriends:[{
        userid:string,
        username:string,
    }];
    myEvents:[];
    location:{
        location_name:string,
        lat:number,
        long:number
    }
    chatrooms: Chatroom[];
}