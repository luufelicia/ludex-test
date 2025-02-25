import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { z } from "zod"

//creates a zod schema that validates a title, id, and completed fields
const idSchema = z.object({
  id: z.string().length(10, "ID should look like: 62c98cea-4474-4161-9933-8d4e45db3069"),
});

export const Query: IQuery<Context> = {
  hello: () => "world",

  allSomething: async (_, __, { prisma }) => {
    return await prisma.something.findMany();
  },

  allTodo: async (_, __, { prisma }) => {
    return await prisma.todo.findMany();
  },

  allIncompleteTodo: async (_, __, { prisma }) => {
    return await prisma.todo.findMany({
      where: {
        completed: false
      }
    });
  },

  allCompleteTodo: async (_, __, { prisma }) => {
    return await prisma.todo.findMany({
      where: {
        completed: true
      }
    });
  },

  singleTodoById: async (_, { id } , { prisma }) => {
    const validation = idSchema.safeParse(id);

    if (!validation.success){
      throw new Error(validation.error.errors.map(err => err.message).join(", "))
    }
    
    return await prisma.todo.findUnique({
      where: {
        id: id
      }
    });
  },
};
