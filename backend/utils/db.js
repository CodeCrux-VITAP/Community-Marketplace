const mongoose= require('mongoose')

module.exports.connectDB= async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`DB connect to ${mongoose.connection.host}`)
  } 
  catch (err) {
    console.error(err)
  }
}