import { Request, Response } from "express";

interface todosType2 {
  id: number;
  title: string;
  date: string;
}

interface todosType {
  id: number;
  title: string;
  date: string;
  completed?: boolean;
  nestedTodo?: todosType2[];
}

const todos: todosType[] = [
  {
    id: 1,
    title: "Buy milk",
    date: "2024-01-01",
    nestedTodo: [
      { id: 131313, title: "dsad", date: "2024-01-01" },
      { id: 131312323, title: "dsadsadd", date: "2024-05-01" },
    ],
  },
  { id: 2, title: "Buy bread", date: "2024-01-02", nestedTodo: [] },
];

export const getTodos = (req: Request, res: Response): void => {
  try {
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

export const createTodo = (req: Request, res: Response): void => {
  try {
    const { title, date } = req.body;

    if (!title || !date) {
      res.status(400).json({ message: "Title and date are required." });
      return;
    }

    const newTodo = { id: Date.now(), title, date };

    todos.push(newTodo);

    res.status(201).json({ message: "Todo created successfully.", todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo" });
  }
};

export const deteTodo = (req: Request, res: Response): void => {
  try {
    const { id } = req.body; // Destructure `id` from the request body
    console.log(id);
    // Ensure id is provided
    if (!id) {
      res.status(400).json({ message: "ID is required to delete a todo" });
      return;
    }

    // Find the index of the todo
    const index = todos.findIndex((todo) => todo.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    // Remove the todo
    todos.splice(index, 1);

    // Return the updated todos list
    res.status(200).json(todos);
  } catch (error) {
    // console.error("Error in deteTodo:", error);
    // res.status(500).json({ message: "Failed to delete todo" });
  }
};

export const nestedTodos = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const nestedTodo = todos.find((todo) => todo.id === parseInt(id));
    if (!nestedTodo) {
      res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(nestedTodo);
  } catch (error) {
    console.error("Error in nestedTodos:", error);
    res.status(500).json({ message: "Failed to get nested todo" });
  }
};
 