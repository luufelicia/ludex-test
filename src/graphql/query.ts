import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

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
};
