import { gql } from 'graphql-request';

export const GET_ALL_COURSES = `
  query GetAllCourses {
    courses {
      id
      title
      description
      level
    }
  }
`;

export const GET_COURSE_BY_ID = gql`
  query GetCourseById($id: ID!) {
    course(id: $id) {
      id
      title
      description
      level
      enrollments {
        id
        role
        user {
          id
          name
          email
        }
      }
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      email
      role
      enrollments {
        id
        role
        course {
          id
          title
        }
      }
    }
  }
`;
