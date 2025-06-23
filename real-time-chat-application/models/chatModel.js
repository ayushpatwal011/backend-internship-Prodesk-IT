import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  name: String, // for group
  isGroup: { type: Boolean, default: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
