import { Metadata } from "next";
import ApplicationMetrics from "@/ui/dashboard/applicationMetrics";
import ApplicationTable from "@/ui/dashboard/applicationTable";
import Pagination from "@/ui/components/pagination";
import { fetchApplicationPages } from "@/lib/data";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchApplicationPages(query, session?.user?.id);


  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <ApplicationMetrics />
      </div>
      <div className="col-span-12">
        <ApplicationTable query={query} currentPage={currentPage} />
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm text-slate-500">
            Showing <b>{Math.min(1 + 10*(currentPage-1), totalPages.count)}</b>-<b>{Math.min(currentPage*10, totalPages.count)}</b> of <b>{totalPages.count}</b>
          </div>
          <Pagination totalPages={totalPages.totalPage} />
        </div>
      </div>
    </div>
  )
}