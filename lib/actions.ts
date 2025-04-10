"use server"

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from 'zod';
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';
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

const ApplicationFormSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  company_name: z.string().min(1, { message: "Company name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  status: z.enum(['Applied', 'Rejected', 'Interview Scheduled', 'Offer Received'], {
    invalid_type_error: 'Please select status.',
  }),
  notes: z.string(),
  url: z.string(),
  date: z.date(),
})

const AddApplication = ApplicationFormSchema.omit({id: true, user_id:true, date:true})

export type State = {
  message?: string | null;
};

export type ApplicationState = {
  errors?: {
    company_name?: string[];
    role?: string[];
    status?: string[];
    notes?: string[];
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

export async function createApplication(
  id: string | undefined,
  prevState: ApplicationState | undefined,
  formData: FormData
) {
    // Validate form using Zod
    const validatedFields = AddApplication.safeParse({
      company_name: formData.get('company_name'),
      role: formData.get('role'),
      status: formData.get('status'),
      notes: formData.get('notes'),
      url: formData.get('url'),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create application.',
    };
    }
    const {company_name, role, status, notes, url} = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    try{
      if (!id) throw Error;

      await sql`
        INSERT INTO applications (user_id, company_name, role, status, url, notes, date)
        VALUES (${id}, ${company_name}, ${role}, ${status}, ${url}, ${notes}, ${date});
      `;

    } catch (error) {
      // If a database error occurs, return a more specific error.
      console.log(error);
      return {
        message: 'Database Error: Failed to Create Application.',
      };
    }
    revalidatePath('/dashboard');
    redirect('/');
}

export async function updateApplication(
  id: string,
  prevState: ApplicationState,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = AddApplication.safeParse({
    company_name: formData.get('company_name'),
    role: formData.get('role'),
    status: formData.get('status'),
    notes: formData.get('notes'),
    url: formData.get('url'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update application.',
    };
  }

  const {company_name, role, status, notes, url} = validatedFields.data;
  //const date = new Date().toISOString().split('T')[0];

  try{
    if (!id) throw Error;

    await sql`
      UPDATE applications
      SET company_name = ${company_name}, role = ${role}, status = ${status}, notes = ${notes}, url = ${url}
      WHERE id = ${id}
    `;

  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Update Application.',
    };
  }
  revalidatePath('/dashboard');
  redirect('/');
}

export async function deleteApplication(id: string) {
  await sql`DELETE FROM applications WHERE id = ${id};`;
  revalidatePath('/dashboard');
  redirect('/');
}