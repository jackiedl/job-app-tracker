import { 
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/ui/components/table";
import {
  PencilIcon, 
  PlusIcon, 
  TrashIcon
} from "@/ui/icons";
import Search from "@/ui/components/search";
import { auth } from "@/auth";
import { fetchFilteredApplications } from "@/lib/data";
import Button from "../components/button";
import AddApplicationModal from "../modal/addApplicationModal";

export default async function ApplicationTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const session = await auth();

  const formatDate = (date: string) => {
    // Create a Date object from the string
    const dateObj = new Date(date);
    // Extract month, day, and year
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
    const day = dateObj.getDate().toString().padStart(2, '0'); // Ensure two digits
    const year = dateObj.getFullYear();

    // Return formatted date
    return `${month}/${day}/${year}`;
  }
  const applications = await fetchFilteredApplications(query, currentPage, session?.user?.id);
  
  const populateTableBody = () => {
    return (
      <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
      {
        applications.map((app:any) => (
          <TableRow key={app.id} className="">
            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {app.company_name}
            </TableCell>
            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {app.role}
            </TableCell>
            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {app.status}
            </TableCell>
            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
            {formatDate(app.date.toString())}
            </TableCell>
            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {app.notes}
            </TableCell>
            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              {app.url}
            </TableCell>
            <TableCell className="flex justify-end gap-3">
              <button type="submit" className="rounded-md border p-2 hover:bg-gray-100 dark:bg-brand-400 dark:hover:bg-brand-300 dark:border-brand-500">
                <span className="sr-only">Update</span>
                <PencilIcon className="w-5"/>
              </button>
          
              <button type="submit" className="rounded-md border p-2 hover:bg-gray-100 dark:bg-brand-400 dark:hover:bg-brand-300 dark:border-brand-500">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5"/>
              </button>
            </TableCell>
          </TableRow>
        ))
      }
      </TableBody>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex justify-between gap-2 mb-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Applications
          </h3> 
        </div>
        <div className="flex items-center gap-3">
          <Search placeholder="Search..."/>
          <AddApplicationModal userId={session?.user?.id}/>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="md-hidden">
        </div>
        <Table className="w-full text-left table-auto min-w-max">
          <TableHeader className="rounded-lg text-left text-sm font-normal">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Company Name
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Role
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Date
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Notes
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Url
              </TableCell>
            </TableRow>
          </TableHeader>
          {populateTableBody()}
        </Table>
      </div>
    </div>
  )
}