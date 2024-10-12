const express= require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();



app.use(express.json());

//if we want to use form , instead of json then,
//set the middleware

// app.use(express.urlencoded({extended:false}));



app.get('/',(req,res)=>{
    res.send('Hello there');
})

app.get('/blog',(req,res)=>{
    res.send('Hello, my name is  Dipsan');
})


//saving or adding  prodcut to database.

app.post('/products', async (req,res)=>{
    try{
      const product = await  Product.create(req.body)
      res.status(200).json(product)
    }
    catch(error){
     console.log(error.message);
     res.status(500).json({message:error.message});
    }
 
 })



//fetching all the products from database.
app.get('/products',async(req,res)=>{
    try{
      const products = await Product.find({});
      res.status(200).json(products);
    }
    catch(error){
  res.status(500).json({message:error,message});
    }
})

//fetching a single  product from  database

app.get('/products/:id', async(req,res)=>{
    try{
     const {id} =  req.params;
      const product =  await Product.findById(id);
      res.status(200).json(product);

    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

//updating the product
app.put('/products/:id',async (req,res)=>{
     try{
       const {id} = req.params;
       const product =  await Product.findByIdAndUpdate(id,req.body);
        //if product not available in database, and cannot update
       if(!product){
        return res.status(404).json({message:  `Cannot  find product with ID: ${id}`})
       } 

       const  updatedProduct = await  Product.findById(id);
       res.status(200).json(updatedProduct);
      

     }
     catch(error){
        res.status(500).json({message:  error.message});
     }
})

//deleting a product  from database

app.delete('/products/:id', async(req,res)=>{
     try{
      const {id} = req.params;
      const product =  await Product.findByIdAndDelete(id);

      if(!product){
        return res.status(404).json({message:  `Cannot  find product with ID: ${id}`})
      }
    res.status(200).json(product);
     }
     catch(error){
        res.status(500).json({message: error.message});
     }
})


mongoose.connect('mongodb+srv://dipsankadariya99:c7sjhfBo8SBIoW7N@restapi.ahnbq.mongodb.net/node-rest-api?retryWrites=true&w=majority&appName=restapi')
.then(()=>{
    app.listen(3000,()=>{
        console.log(`Server running on port  3000`);
    })
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.log(error);
})