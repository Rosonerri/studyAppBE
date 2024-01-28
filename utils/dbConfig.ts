import {connect} from "mongoose"


const URL: string = "mongodb://127.0.0.1:27017/StudyApp"
export const dbConfig = async () => {
    try {
        return await connect(URL).then(() =>{
            console.log("DataBase Connected🌍🌎🌏")
        }).catch((err) => console.error(err))
    } catch (error) {
        return error
    }
}