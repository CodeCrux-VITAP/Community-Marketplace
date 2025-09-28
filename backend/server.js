const express= require('express')
require('dotenv').config()
const cors= require('cors')
const cookieParser= require('cookie-parser')

const {connectDB}= require('./utils/db')
const authRoutes= require('./routes/auth')
const itemRoutes= require('./routes/item')
const cartRoutes= require('./routes/cart')

const app= express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', "DELETE"],
  credentials: true
}))

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/cart', cartRoutes)

const port= process.env.PORT || 5050;

app.listen(port, ()=> console.log(`Server connected to port ${port}`))