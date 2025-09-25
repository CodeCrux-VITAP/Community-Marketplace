const router= require('express').Router()

const Item= require('../models/item')

const {verifyToken}= require('../middlewares/authMiddleware')

router.post('/', verifyToken, async(req, res)=>{
  try{
    const {name, description, price, img, category} = req.body
    if (!name || !description || !price || !category) return res.status(400).json({msg: "All * fields are required!"})

     const newItem= new Item({ name, description, price, img, category, seller: req.user._id })
     await newItem.save()
    return res.status(201).json({msg: 'Item Added SuccessFully', newItem})
  }
  catch(err){
    console.error(err);
    res.status(500).json({ msg: "Server error! Try again !!" });
  }
})

router.get('/', async (req, res)=>{
  try {
    const items= await Item.find().populate("seller", "username email");
    return res.status(200).json(items)
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error! Try again !!" });
  }
})

router.get('/:id', async (req, res)=>{
  try {
    const item= await Item.findById(req.params.id).populate("seller", "username email");
    if (!item) res.status(404).json({msg: 'Item Not Found :('})
    return res.status(200).json(item)
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error! Try again !!" });
  }
})

module.exports= router