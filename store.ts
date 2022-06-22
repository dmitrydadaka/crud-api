import { User } from "./src/IUser";

let users: User[] = [];

const store = (user: User, action: string): void => {
    switch(action){
        case 'add': users.push(user);
        break;
        case 'delete': users.filter( e => e.id !== user.id);
        break;
    }
} 


export { store, users };
