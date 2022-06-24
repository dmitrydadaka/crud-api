
import { ServerResponse } from "http";
import { users } from '../../store'


const getUsers = (res: ServerResponse) => {
  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({message:'Error! Operation failed'}));
  }
}
export { getUsers }; 
