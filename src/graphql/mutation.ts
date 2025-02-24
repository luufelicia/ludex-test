import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";
import { z } from "zod";

//creates a zod schema that validates a title field
const todoSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  id: z.string().length(10, "ID should look like: 62c98cea-4474-4161-9933-8d4e45db3069"),
  completed: z.boolean(),
});

export const Mutation: IMutation<Context> = {
  createSomething: async (_, { input }, { prisma }) => {
   
    const something = await prisma.something.create({
      data: {
        name: input.name,
      },
    });

    return {
      id: something.id,
      name: something.name,
    };
  },

  createTodo: async (_, { input }, { prisma }) => {
    //validation
    const validation = todoSchema.safeParse(input);
    if (!validation.success){
      throw new Error(validation.error.errors.map(err => err.message).join(", "))
    }

    //creating to do
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
        completed: false,
      },
    });

    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    };
  },

  changeTodoStatus: async (_, { id, completed }, { prisma }) => {
    //validation
    const validation = todoSchema.safeParse({id, completed});
    if (!validation.success){
      throw new Error(validation.error.errors.map(err => err.message).join(", "))
    }

    //updating
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        completed: completed
      }
    });

    return{
      id: updatedTodo.id,
      title: updatedTodo.title,
      completed: updatedTodo.completed,
    }
  },

  changeTodoTitle: async (_, { id, title }, { prisma }) => {
    //validation
    const validation = todoSchema.safeParse({id, title});
    if (!validation.success){
      throw new Error(validation.error.errors.map(err => err.message).join(", "))
    }

    //updating
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: title
      }
    });

    return{
      id: updatedTodo.id,
      title: updatedTodo.title,
      completed: updatedTodo.completed,
    }
  },

  deleteTodo: async (_, { id }, { prisma }) => {
    //validation
    const validation = todoSchema.safeParse(id);
    if (!validation.success){
      throw new Error(validation.error.errors.map(err => err.message).join(", "))
    }

    //deleting
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return "Successfully deleted."
  },
};

