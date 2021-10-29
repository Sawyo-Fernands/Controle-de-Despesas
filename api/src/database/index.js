

const mongo=require('mongoose')

mongo.connect("mongodb://localhost/controle",{
    
}).then(() =>{
    console.log("Mongo connect")
}).catch((error)=>{
    console.log(error)
})

module.exports=mongo