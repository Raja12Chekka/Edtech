import { gql } from 'graphql-request';

export const ENROLL_IN_COURSE = `
  mutation EnrollInCourse($userId: ID!, $courseId: ID!) {
    enroll(userId: $userId, courseId: $courseId) {
      id
      role
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $userId: ID!, $data: UpdateCourseInput!) {
    updateCourse(id: $id, userId: $userId, data: $data) {
      id
      title
      description
      level
    }
  }
`;
