import { FastifyInstance } from "fastify";
import { getAllUsers } from "../controllers/user/getAllUsers";
import { registerUser } from "../controllers/user/register";
import { getUserByEmail } from "../controllers/user/getUserByEmail";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users/register', registerUser)
    app.get('/users/getAll', getAllUsers)
    app.get('/users/by-email/:email', getUserByEmail)
}