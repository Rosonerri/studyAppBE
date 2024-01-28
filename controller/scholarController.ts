import { Request, Response } from "express"
import userModel from "../model/userModel"
import scholarModel from "../model/scholarModel"
import { Types } from "mongoose"
import moment from "moment"
import { CronJob } from "cron";


export const createScholar = async (req:Request, res:Response) =>{
    try {
        const { userID } = req.params
        const { name, studyTime, stretchTime } = req.body;
        const user = await userModel.findById(userID)

        if(user){
            const scholar = await scholarModel.create({
                name,
                studyTime,
                stretchTime
            })

            user.scholar.push(new Types.ObjectId(scholar._id))
            user.save()
            
            return res.status(201).json({
                message: "Scholar Created Successfully",
                scholar
            })
        }else{
             return res.status(404).json({
               message: "Error Creating Scholar",
             });
        }
    } catch (error) {
         return res.status(404).json({
           message: "Error",
         });
    }
}

export const createStudy = async (req: Request, res: Response) => {
  try {
    const { breakDuration, breakTime, studyDuration } = req.body;
    const { studentID } = req.params;

    const student = await userModel.findById(studentID);

    if (!student) {
      return res.status(404).json({
        msg: "User not found",
        status: 404,
      });
    }

    const hourDuration = +studyDuration * 60;

    const breakNumber = hourDuration / (breakDuration + breakTime);
    const studyTime = hourDuration + breakNumber * breakDuration;

    const getMinutes = new Date().setMinutes(studyTime);
    const cronfor = moment(getMinutes).format("h:mm:ss a");

    const study = await scholarModel.create({
      studyTime: `${studyTime} minutes`,
      breakDuration: ` ${breakDuration} minutes`,
      studyDuration: `${studyDuration} hours`,
    });

    const cron: any = new CronJob(
      `${cronfor.split(":")[1]} ${cronfor.split(":")[0]} * * *`,
      async function () {
        console.log("Start Break");
        await scholarModel.findByIdAndUpdate(
          study._id,
          { endStudy: true, studyPoint: +studyDuration },
          { new: true }
        );

        // student!.studyTime! = student?.studyTime + +studyDuration;
        student?.save();

        // console.log("true");

        cron.stop();
      },
      null,
      true,
      "America/Los_Angeles"
    );

    console.log("study._id:", study._id);
    student?.save();

    cron.start();

    return res.status(201).json({
      msg: "Study created",
      data: study,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating study",
      status: 404,
    });
  }
}


