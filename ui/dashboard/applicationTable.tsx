import { 
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/ui/components/table";
import Search from "@/ui/components/search";
import { auth } from "@/auth";
import { fetchFilteredApplications } from "@/lib/data";
import AddApplicationModal from "../modal/addApplicationModal";
import React from "react";
import PopulateTableRow from "./editApplicationRow";

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
          <PopulateTableRow key={app.id} application={app} />
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
      <div id="table-container" className="max-w-full overflow-x-auto">
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