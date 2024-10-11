const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Q81UpP3WBhplXYwabi5MD8ZnVtTKpZk8WXnlkn35B19dHnSwAvBnibdvipls9LwjAPITr0veak4tsGV4Ty7FmBG00MdfWVjkg");

app.use(express.json());
app.use(cors());

// checkout api
app.post("/api/create-checkout-session", async(req,res)=>{
    const {products} = req.body;
    
    const line_items = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data: {
                name:product.name
            },
            unit_amount: product.price * 100,
        },
        quantity: 1
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: line_items,
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/failed"
    })
    console.log(products);

    res.json({id:session.id})
});

app.listen(7000, ()=>{
    console.log("server start");
})