"use client"

import { 
  TableCell,
  TableRowRef,
} from "@/ui/components/table";
import {
  ChevronDownIcon,
  PencilIcon,  
} from "@/ui/icons";
import React, { useState, useEffect, useRef, useActionState } from "react";
import { Application } from "@/lib/definitions";
import Button from "@/ui/components/button";
import DeleteButton from "./deleteButton";
import Input from "@/ui/components/input";
import Select from "@/ui/components/select";
import TextArea from "../components/textarea";
import { ApplicationState, updateApplication } from "@/lib/actions";

export default function PopulateTableRow({
  application
}: {
  application: Application
}) {
  const [isOpen, setIsOpen] = useState(false);
  const updateApplicationWithId = updateApplication.bind(null, application.id);
  const initialState:ApplicationState = {message:null, errors:{}}
  const [state, formAction] = useActionState(updateApplicationWithId, initialState);

  const options = [
    { value: "Applied", label: "Applied" },
    { value: "Rejected", label: "Rejected" },
    { value: "Interview Scheduled", label: "Interview Scheduled" },
    { value: "Offer Received", label: "Offer Received" },
  ];
  const [formData, setFormData] = useState({
    company_name: application.company_name,
    role: application.role,
    status: String(application.status),
    notes: application.notes,
    url: application.url
  });
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({...prev, ["status"]:value}));
  };
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const rowRef = useRef<HTMLTableRowElement>(null);

  // Close popup when clicking outside and reset formData
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedNode = event.target as Node;
      if (rowRef.current && !rowRef.current.contains(clickedNode)) {
        setIsOpen(false); // Close only if not on scrollbar
        setFormData({
          company_name: application.company_name,
          role: application.role,
          status: String(application.status),
          notes: application.notes,
          url: application.url
        });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  return (
    <TableRowRef ref={rowRef} className="">
    {isOpen ? 
    <>
      <TableCell colspan={7} className="py-3">
        <form action={formAction}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-3">
            <div className="col-span-1">
              <label className="dark:text-white/90">Company Name</label>
              <Input 
                type="text" 
                id="company_name" 
                name="company_name" 
                placeholder="Google" 
                defaultValue={formData.company_name}
                onChange={handleInputChange}
              />
              <div id="company-name-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.company_name &&
                  state.errors.company_name.map((error: string) => (
                    <p className="mt-2 text-xs text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
              {/* Role */}        
            <div className="col-span-1">
              <label className="dark:text-white/90">Role</label>
              <Input 
                type="text" 
                id="role" 
                name="role" 
                placeholder="Software Engineer" 
                defaultValue={formData.role}
                onChange={handleInputChange}/>
              <div id="role-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.role &&
                  state.errors.role.map((error: string) => (
                    <p className="mt-2 text-xs text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
              {/* Status */}       
            <div className="col-span-1">
              <label className="dark:text-white/90">Status</label>
              <div className="relative">
                <Select 
                  name="status"
                  options={options}
                  placeholder="Select option"
                  defaultValue={formData.status}
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
                <div id="status-error" aria-live="polite" aria-atomic="true">
                  {state?.errors?.status &&
                    state.errors.status.map((error: string) => (
                      <p className="mt-2 text-xs text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>    
            </div>
            {/* Notes */}
            <div className="col-span-1 sm:col-span-3">
              <label className="dark:text-white/90">Notes</label>
              <TextArea
                name="notes"
                placeholder="Enter any notes"
                value={formData.notes}
                onChange={(value) => setFormData((prev) => ({...prev, ["notes"]:value}))}
                rows={6}
              />
            </div>
            {/* URL */}
            <div className="col-span-1 sm:col-span-3">
              <label className="dark:text-white/90">URL</label>
              <Input 
                type="text" 
                id="url" 
                name="url" 
                placeholder="https://www.google.com/" 
                defaultValue={formData.url}
                onChange={handleInputChange}/>
            </div>
            <div className="flex items-center justify-start w-full gap-3">
              <Button
                className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300" 
              >
                Confirm
              </Button>
              <Button 
                className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                Close
              </Button>
            </div>
          </div> 
        </form>
      </TableCell>
    </>
    :<>
      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        {application.company_name}
      </TableCell>
      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        {application.role}
      </TableCell>
      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        {application.status}
      </TableCell>
      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
      {formatDate(application.date.toString())}
      </TableCell>
      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        {application.notes}
      </TableCell>
      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        {application.url}
      </TableCell>
      <TableCell className="flex justify-end gap-3">
        <Button 
          className="rounded-md border p-2 hover:bg-gray-100 dark:bg-brand-400 dark:hover:bg-brand-300 dark:border-brand-500"
          onClick={() => {
            setIsOpen((prev) => !prev);
            document.getElementById('table-container')?.scrollTo({ left: 0, behavior: 'smooth' });
          }}
        >
          <PencilIcon className="w-5"/>
        </Button>
        <DeleteButton applicationId={application.id} />
      </TableCell>
    </>
    }
    </TableRowRef>
  )
}