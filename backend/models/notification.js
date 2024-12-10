import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema(

    {
        body:{
            type: String,
            
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Notification",NotificationSchema);