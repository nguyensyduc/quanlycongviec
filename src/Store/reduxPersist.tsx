import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMigrate } from "redux-persist";

export const generalPersistConfig = ({whiteList = [], version = 1}) =>{
    const migrations = {
        [version]: (state: any)=>{
            return state
        }
    };

    return{
        key: 'root',
        version: version,
        whiteList: [...whiteList, '_persist'],
        storage: AsyncStorage,
        debug: __DEV__,
        migrate: createMigrate(migrations, {debug: __DEV__}) 
    }
}