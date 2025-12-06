import { Router } from "express";
import { todoController } from "./todos.controller";

const router = Router();

router.post("/", todoController.createTodo)

router.get("/", todoController.getTodos)


export const todosRoutes = router;