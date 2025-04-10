"use client"
import React, { useState } from "react";
import { Modal, useModal } from "@/ui/components/modal"
import Button from "@/ui/components/button";
import Input from "@/ui/components/input";
import { useActionState } from "react";
import { createApplication, ApplicationState } from "@/lib/actions";
import Select from "@/ui/components/select";
import TextArea from "@/ui/components/textarea";
import { 
  ChevronDownIcon,
  PlusIcon
 } from "@heroicons/react/24/outline";

export default function AddApplicationModal({
  userId
}:{
  userId: string | undefined
}) {
  const { isOpen, openModal, closeModal } = useModal();
  const createApplicaionWithId = createApplication.bind(null, userId)
  const initialState:ApplicationState = {message: null, errors: {}};
  const [state, formAction] = useActionState(createApplicaionWithId, initialState);

  const options = [
    { value: "Applied", label: "Applied" },
    { value: "Rejected", label: "Rejected" },
    { value: "Interview Scheduled", label: "Interview Scheduled" },
    { value: "Offer Received", label: "Offer Received" },
  ];
  const [formData, setFormData] = useState({
    company_name: '',
    role: '',
    status: '',
    notes: '',
    url: '',
  });
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({...prev, ["status"]:value}));
  };
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Button 
        onClick={openModal}
        className="rounded-md border p-2 dark:bg-brand-400 dark:hover:bg-brand-300 dark:border-brand-500" 
      >
        <PlusIcon width={24} height={24}/>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <form action={formAction}>
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
            Add new application
          </h4>
          {/* Company Name */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
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
                  <ChevronDownIcon width={24} height={24}/>
                </span>
              </div>
              <div id="status-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.status &&
                  state.errors.status.map((error: string) => (
                    <p className="mt-2 text-xs text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
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
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <Button 
              className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
              onClick={closeModal}
            >
              Close
            </Button>
            <Button
              className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300" 
            >
              Add
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}