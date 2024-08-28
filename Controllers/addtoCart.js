const stripe = require("stripe")("sk_test_51PM559G0hXsNMoU54H3l1VaJsBlAsFEU87iakU7W9Y8ID11bJCzsLrc7HbsL9LBvc97rpL2j9FooZUhwwA8dHHVc00XSHH1UFu")
const orderSchema=require("../Models/ordersSchema")
const placeOrders = async (req, res) => {
    const { products } = req.body;


    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
                images: [product.path]
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/successPayment",
        cancel_url: "http://localhost:5173/rejectPayment",
    });

    res.json({ id: session.id })

}

const checkoutOrder=async(req,res)=>{
    console.log(req.body,"Order req")
    await orderSchema.create(req.body)
}

module.exports = {placeOrders,checkoutOrder}