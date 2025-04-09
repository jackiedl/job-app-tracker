import postgres from "postgres";


const sql = postgres(process.env.DATABASE_URL!);

export async function fetchApplicationMetrics(userId: string | undefined) {
  if (!userId) {
    throw new Error("Failed to fetch, no user signed in")
  }
  try {
    const appliedCountPromise = sql`SELECT COUNT(*) FROM applications WHERE user_id = ${userId} AND status = 'Applied';`;
    const rejectedCountPromise = sql`SELECT COUNT(*) FROM applications WHERE user_id = ${userId} AND status = 'Rejected'; `;
    const interviewCountPromise = sql`SELECT COUNT(*) FROM applications WHERE user_id = ${userId} AND status = 'Interview Scheduled'; `;
    const offersCountPromise = sql`SELECT COUNT(*) FROM applications WHERE user_id = ${userId} AND status = 'Offer Received'; `;

    const data = await Promise.all([
      appliedCountPromise,
      rejectedCountPromise,
      interviewCountPromise,
      offersCountPromise
    ]);
    
    const numberOfApplied = Number(data[0][0].count ?? '0');
    const numberOfRejected = Number(data[1][0].count ?? '0');
    const numberOfInterview = Number(data[2][0].count ?? '0');
    const numberOfOffers = Number(data[3][0].count ?? '0');

    return {
      numberOfApplied,
      numberOfRejected,
      numberOfInterview,
      numberOfOffers
    };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredApplications(
  query: string,
  currentPage: number,
  userId: string | undefined
) {
  if (!userId) {
    throw new Error("Failed to fetch, no user signed in")
  }
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try{
    const applications = await sql`
      SELECT
        app.id,
        app.company_name,
        app.role,
        app.status,
        app.url,
        app.notes,
        app.date
      FROM applications as app
      WHERE
        app.user_id = ${userId} AND (
        app.company_name ILIKE ${`%${query}%`} OR
        app.role ILIKE ${`%${query}%`} OR
        app.status ILIKE ${`%${query}%`} OR
        app.date::text ILIKE ${`%${query}%`})
      ORDER BY app.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;
    return applications;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchApplicationPages(query: string, userId: string | undefined) {
  if (!userId) {
    throw new Error("Failed to fetch, no user signed in")
  }
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM applications as app
      WHERE
        app.user_id = ${userId} AND (
        app.company_name ILIKE ${`%${query}%`} OR
        app.role ILIKE ${`%${query}%`} OR
        app.status ILIKE ${`%${query}%`} OR
        app.date::text ILIKE ${`%${query}%`});
  `;
    const totalPages = {totalPage: Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE), count: Number(data[0].count)};
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of applications.');
  }
}