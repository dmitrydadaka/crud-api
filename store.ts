import { User } from "./src/IUser";

let users: User[] = [];

const addToUsers = (data: User): void => {
     users.push(data);
}

const deleteFromUsers = (id: string): void => {
    users = users.filter( user=> id !== user.id);
} 

const getUserFromUsers = (id: string) => {
    return users.find( u => u.id === id);
}

export { addToUsers, deleteFromUsers, getUserFromUsers, users };
