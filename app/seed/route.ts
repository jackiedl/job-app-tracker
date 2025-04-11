import bcrypt from "bcryptjs";
import postgres from 'postgres';
import { users, applications } from "@/lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  return insertedUsers;
}

async function seedApplications() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      company_name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL,
      notes TEXT,
      date DATE NOT NULL
    );  
  `;
  
  const insertedApplications = await Promise.all(
    applications.map(
      (app) => sql`
        INSERT INTO applications (user_id, company_name, role, status, url, notes, date)
        VALUES (${app.user_id}, ${app.company_name}, ${app.role}, ${app.status}, ${app.url}, ${app.notes}, ${app.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  ); 

  return insertedApplications;
}
  


export async function GET() {
  try {
    seedUsers();
    seedApplications();
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}