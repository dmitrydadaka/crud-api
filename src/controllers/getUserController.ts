
import { ServerResponse, IncomingMessage } from "http";
import { getUserFromUsers } from "../../store";
import { User } from "../IUser";

const getUser = (res: ServerResponse, id: string) => {
 
  const user = getUserFromUsers(id);
  res.end(JSON.stringify(user));
 
}
export { getUser };
