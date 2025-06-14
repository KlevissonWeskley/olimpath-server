import { FastifyInstance } from "fastify";
import { getChatsByUser } from "../controllers/chatbot/getChatsByUser";
import { getChatById } from "../controllers/chatbot/getChatById";
import { addMessageToChat } from "../controllers/chatbot/addMessageToChat";
import { createChat } from "../controllers/chatbot/create";
import { deleteChat } from "../controllers/chatbot/deleteChat";

export async function chatRoutes(app: FastifyInstance) {
    app.post('/chat/create', createChat)
    app.get('/chats/:userId', getChatsByUser)
    app.get('/chat/:chatId', getChatById)
    app.post('/chat/:chatId/message', addMessageToChat)
    app.delete('/chat/delete/:chatId', deleteChat)
}