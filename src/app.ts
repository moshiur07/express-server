import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import { userRoutes } from "./modules/Users/user.routes";
import { todosRoutes } from "./modules/Todos/todos.routes";
import { authRoutes } from "./modules/auth/auth.routes";



const app = express()
// ! Parser
app.use(express.json())
// ! DB
initDB()


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})


//! Users CRUD
app.use("/users", userRoutes)

// todos CRUD
app.use("/todos", todosRoutes)


// auth routes

app.use("/auth", authRoutes)

// ! 404 not found
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "NO path found",
        path: req.path
    })
})

export default app;