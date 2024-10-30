import dotenv from "dotenv";
import { runServer } from "./src";
import path from "path";

console.log('asdasdasdasd');

dotenv.config({ path: path.resolve(__dirname, '.env') });
void runServer();
