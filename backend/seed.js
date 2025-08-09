const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    const john = await prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    });
    const jane = await prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      },
    });
    const alice = await prisma.user.upsert({
      where: { email: 'alice.johnson@example.com' },
      update: { role: 'professor' },
      create: {
        name: 'Dr. Alice Johnson',
        email: 'alice.johnson@example.com',
        role: 'professor',
      },
    });



    // Create sample courses
    const courseTitles = [
      { title: 'Introduction to JavaScript', description: 'Learn the fundamentals of JavaScript programming language.', level: 'beginner' },
      { title: 'Advanced React Development', description: 'Master advanced React concepts including hooks, context, and performance optimization.', level: 'advanced' },
      { title: 'Node.js Backend Development', description: 'Build scalable backend applications using Node.js and Express.', level: 'intermediate' },
      { title: 'Database Design with PostgreSQL', description: 'Learn database design principles and PostgreSQL administration.', level: 'intermediate' },
    ];

    const courses = [];
    for (const course of courseTitles) {
      const existingCourse = await prisma.course.findFirst({
        where: { title: course.title },
      });
      
      if (existingCourse) {
        courses.push(existingCourse);
      } else {
        const newCourse = await prisma.course.create({
          data: course,
        });
        courses.push(newCourse);
      }
    }



    // Create sample enrollments
    const enrollments = await Promise.all([
      // John Doe enrollments (student)
      prisma.enrollment.create({
        data: {
          userId: john.id,
          courseId: courses[0].id,
          role: 'student',
        },
      }),
      prisma.enrollment.create({
        data: {
          userId: john.id,
          courseId: courses[2].id,
          role: 'student',
        },
      }),
      // Jane Smith enrollments (student)
      prisma.enrollment.create({
        data: {
          userId: jane.id,
          courseId: courses[1].id,
          role: 'student',
        },
      }),
      prisma.enrollment.create({
        data: {
          userId: jane.id,
          courseId: courses[3].id,
          role: 'student',
        },
      }),
      // Dr. Alice Johnson as professor
      prisma.enrollment.create({
        data: {
          userId: alice.id,
          courseId: courses[1].id,
          role: 'professor',
        },
      }),
      prisma.enrollment.create({
        data: {
          userId: alice.id,
          courseId: courses[3].id,
          role: 'professor',
        },
      }),
    ]);

    console.log('Database seeded successfully!');

  } catch (error) {
    console.error('Error during seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
