export const typeDefs = `#graphql
  type Course {
    id: ID!
    title: String!
    description: String!
    level: String!
    enrollments: [Enrollment]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    enrollments: [Enrollment]
  }

  type Enrollment {
    id: ID!
    role: String!
    user: User!
    course: Course!
  }

  input UpdateCourseInput {
    title: String
    description: String
    level: String
  }

  type Query {
    courses: [Course]
    course(id: ID!): Course
    users: [User]
    user(id: ID!): User
    userByEmail(email: String!): User
  }

  type Mutation {
    enroll(userId: ID!, courseId: ID!): Enrollment
    updateCourse(id: ID!, userId: ID!, data: UpdateCourseInput!): Course
  }
`;
