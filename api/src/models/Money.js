

const mongo=require('../database')


const ControlSchema=new mongo.Schema(
    {

        createAt:{
            type:Date,
            default:Date.now()
        },
        name:{
            type:String,
            required:true
        },
        money:{
            type: Number,
            required:true
        }
    }
)

const Item=mongo.model('Item',ControlSchema)


module.exports=Item
