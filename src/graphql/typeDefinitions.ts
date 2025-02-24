export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }
  
  input CreateTodoInput{
    title: String!
  }

   input TodoTitleInput{
    title: String!
  }

  type Something {
    id: ID!
    name: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }


  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: CreateTodoInput!): Todo!
    changeTodoStatus(id: ID!, completed: Boolean!): Todo!
    changeTodoTitle(id: ID!, title: String!): Todo!
  }

  type Query {
    hello: String
    allSomething: [Something!]!
    allTodo: [Todo!]!
    allIncompleteTodo: [Todo!]!
    allCompleteTodo: [Todo!]!
    singleTodoById(id: ID!): Todo
  }
`;
