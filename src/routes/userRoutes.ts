import { FastifyInstance } from "fastify";
import { getAllUsers } from "../controllers/user/getAllUsers";
import { registerUser } from "../controllers/user/register";
import { getUserByEmail } from "../controllers/user/getUserByEmail";
import { authenticate } from "../controllers/user/authenticate";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users/register', registerUser)
    app.post('/users/authenticate', authenticate)
    app.get('/users/getAll', getAllUsers)
    app.get('/users/by-email/:email', getUserByEmail)
}