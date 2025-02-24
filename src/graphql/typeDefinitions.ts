export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }
  
  input CreateTodoInput{
    name: String!
  }

  type Something {
    id: ID!
    name: String!
  }
  
  type Todo {
    id: ID!
    name: String!
    completed: Boolean!
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: createTodo!): Todo!
  }

  type Query {
    hello: String
    allSomething: [Something!]!
  }
`;
