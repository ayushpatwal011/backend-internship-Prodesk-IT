import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';

export const createChat = async (req, res) => {
  const { userId, isGroup, members, name } = req.body;

  const chat = await Chat.create({
    name,
    isGroup,
    members: isGroup ? members : [req.user._id, userId]
  });
  res.json(chat);
};

export const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  const file = req.file?.filename;
  const message = await Message.create({
    chat: chatId,
    sender: req.user._id,
    content,
    file
  });
  res.json(message);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find({ chat: req.params.chatId }).populate('sender');
  res.json(messages);
};
