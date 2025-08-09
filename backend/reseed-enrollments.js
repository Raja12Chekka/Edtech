const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function ensureEnrollment({ userId, courseId, role }) {
  const existing = await prisma.enrollment.findFirst({ where: { userId, courseId } });
  if (existing) return existing;
  return prisma.enrollment.create({ data: { userId, courseId, role } });
}

async function main() {
  console.log('🔁 Reseeding enrollments only...');

  // Fetch users by email
  const john = await prisma.user.findUnique({ where: { email: 'john.doe@example.com' } });
  const jane = await prisma.user.findUnique({ where: { email: 'jane.smith@example.com' } });
  const alice = await prisma.user.findUnique({ where: { email: 'alice.johnson@example.com' } });

  if (!john || !jane || !alice) {
    throw new Error('Expected seed users not found. Ensure initial users exist.');
  }

  // Fetch courses by title
  const titles = [
    'Introduction to JavaScript',
    'Advanced React Development',
    'Node.js Backend Development',
    'Database Design with PostgreSQL',
  ];
  const courses = await prisma.course.findMany({ where: { title: { in: titles } } });
  const byTitle = Object.fromEntries(courses.map((c) => [c.title, c]));

  for (const t of titles) {
    if (!byTitle[t]) throw new Error(`Course not found: ${t}`);
  }

  const created = [];
  // John Doe as student in JS and Node
  created.push(
    await ensureEnrollment({ userId: john.id, courseId: byTitle['Introduction to JavaScript'].id, role: 'student' })
  );
  created.push(
    await ensureEnrollment({ userId: john.id, courseId: byTitle['Node.js Backend Development'].id, role: 'student' })
  );
  // Jane Smith as student in React and DB
  created.push(
    await ensureEnrollment({ userId: jane.id, courseId: byTitle['Advanced React Development'].id, role: 'student' })
  );
  created.push(
    await ensureEnrollment({ userId: jane.id, courseId: byTitle['Database Design with PostgreSQL'].id, role: 'student' })
  );
  // Dr. Alice Johnson as professor in React and DB
  created.push(
    await ensureEnrollment({ userId: alice.id, courseId: byTitle['Advanced React Development'].id, role: 'professor' })
  );
  created.push(
    await ensureEnrollment({ userId: alice.id, courseId: byTitle['Database Design with PostgreSQL'].id, role: 'professor' })
  );

  console.log(`✅ Reseeded/verified ${created.length} enrollments.`);
}

main()
  .catch((e) => {
    console.error('❌ Reseed failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
