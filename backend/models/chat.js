const mongoose= require('mongoose')

const chatSchema= mongoose.Schema({
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
  read: {type: Boolean, default: false},
  content: {type: String, required: true},
}, {timestamps: true})

module.exports= mongoose.model('Chat', chatSchema)