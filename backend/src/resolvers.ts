import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    courses: async () => {
      try {
        return await prisma.course.findMany({
          include: {
            enrollments: {
              include: {
                user: true,
              },
            },
          },
        });
      } catch (error) {
        throw new GraphQLError('Failed to fetch courses');
      }
    },
    course: async (_: any, { id }: { id: string }) => {
      try {
        const course = await prisma.course.findUnique({
          where: { id },
          include: {
            enrollments: {
              include: {
                user: true,
              },
            },
          },
        });
        if (!course) {
          throw new GraphQLError('Course not found');
        }
        return course;
      } catch (error) {
        throw new GraphQLError('Failed to fetch course');
      }
    },
    users: async () => {
      try {
        return await prisma.user.findMany({
          include: {
            enrollments: {
              include: {
                course: true,
              },
            },
          },
        });
      } catch (error) {
        throw new GraphQLError('Failed to fetch users');
      }
    },
    user: async (_: any, { id }: { id: string }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id },
          include: {
            enrollments: {
              include: {
                course: true,
              },
            },
          },
        });
        if (!user) {
          throw new GraphQLError('User not found');
        }
        return user;
      } catch (error) {
        throw new GraphQLError('Failed to fetch user');
      }
    },
    userByEmail: async (_: any, { email }: { email: string }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            enrollments: {
              include: {
                course: true,
              },
            },
          },
        });
        if (!user) {
          throw new GraphQLError('User not found');
        }
        return user;
      } catch (error) {
        throw new GraphQLError('Failed to fetch user');
      }
    },
  },
  Mutation: {
    enroll: async (_: any, { userId, courseId }: { userId: string; courseId: string }) => {
      try {
        const existingEnrollment = await prisma.enrollment.findFirst({
          where: {
            userId,
            courseId,
          },
        });

        if (existingEnrollment) {
          throw new GraphQLError('User is already enrolled in this course');
        }

        return await prisma.enrollment.create({
          data: {
            userId,
            courseId,
            role: 'student',
          },
          include: {
            user: true,
            course: true,
          },
        });
      } catch (error) {
        throw new GraphQLError('Failed to enroll user in course');
      }
    },
    updateCourse: async (
      _: any,
      { id, userId, data }: { id: string; userId: string; data: { title?: string; description?: string; level?: string } }
    ) => {
      try {
        // verify professor role for this course
        const prof = await prisma.enrollment.findFirst({
          where: { userId, courseId: id, role: 'professor' },
        });
        if (!prof) {
          throw new GraphQLError('Only professors of this course can edit it');
        }

        const updated = await prisma.course.update({
          where: { id },
          data,
          include: {
            enrollments: {
              include: { user: true },
            },
          },
        });
        return updated;
      } catch (error: any) {
        throw new GraphQLError(error.message || 'Failed to update course');
      }
    },
  },
};
