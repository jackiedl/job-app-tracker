"use server"

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from 'zod';
import { redirect } from "next/navigation";
import postgres from 'postgres';
import bcrypt from "bcryptjs";


const sql = postgres(process.env.DATABASE_URL!);

const RegisterFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const RegisterUser = RegisterFormSchema.omit({id: true});

export type State = {
};

export type ApplicationState = {
  errors?: {
    companyName?: string[];
    role?: string[];
    status?: string[];
    url?: string[];
  };
  message?: string | null;
}

export async function authenticate(
  prevState: State | undefined,
  formData: FormData,
) {
  try{
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function SignOut() {
  try{
    await signOut({redirectTo: "/"});
  } catch (error) {
    throw error;
  }
}

export async function register(
  prevState: State | undefined,
  formData: FormData
) {
  // Validate form using Zod
  const validatedFields = RegisterUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await sql
    `INSERT INTO users (name, email, password) 
    VALUES (${name}, ${email}, ${hashPassword})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Register.',
    };
  }
  redirect("/");
}