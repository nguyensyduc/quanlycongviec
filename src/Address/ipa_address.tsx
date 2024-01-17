import { Platform } from "react-native";
const host = Platform.OS == 'ios' ? 'localhost' : '192.168.1.16';
// const host = 'localhost';
// const host = '127.0.0.1';
const address = `http://${host}:3002/api/v1/`
export default address;