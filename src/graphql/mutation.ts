import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";

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
};

