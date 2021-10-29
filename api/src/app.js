const express=require('express')


const app=express()
const cors= require('cors')

const Item=require('./models/Money')

app.use(cors())
app.use(express.json())

app.listen(5000, ()=>{
    console.log("Server Connect")
})


app.post('/send',async (req,res)=>{

    try {const { name , money }=req.body

     const item= await Item.create({name,money})

     res.send({item}
        )
        }catch(error){ 
            console.log(error)
        }

})

app.get('/verify',async (req,res)=>{

    try{

     const itens = await Item.find()

     res.send({itens})

    }catch(error){
        console.log(error)
    }

})

app.delete('/delete/:id',async(req,res)=>{

       try
         {
            const id=req.params.id

            await Item.findByIdAndDelete(id)

            res.send({"message":"Mensagem Apagada"})

         }catch(error){
             console.log(error)
         }
})