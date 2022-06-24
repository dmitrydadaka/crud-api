
import { ServerResponse, IncomingMessage } from "http";
import { getUserFromUsers } from "../../store";
import { uuidValidateV4 } from "../utils";

const getUser = (res: ServerResponse, id: string) => {
  const user = getUserFromUsers(id);
  if(!uuidValidateV4(id)){
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: 'Id is not valid!' }));
    return;
  }
  if(user === undefined){
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: 'User doesn\'t exist!' }));
    return;
  }


  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: 'Error! Operation failed' }));
  }

}
export { getUser };
