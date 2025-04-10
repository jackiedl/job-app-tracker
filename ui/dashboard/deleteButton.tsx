"use client"

import React, { useState, useEffect, useRef } from "react";
import Button from "@/ui/components/button";
import { TrashIcon } from "../icons";
import { deleteApplication } from "@/lib/actions";

export default function DeleteButton({
  applicationId
}:{
  applicationId: string
}){
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popupRef}>
      <Button
        className={`${isOpen ? "hidden" : ""} rounded-md border p-2 hover:bg-gray-100 dark:bg-brand-400 dark:hover:bg-brand-300 dark:border-brand-500`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
          <TrashIcon className="w-5"/>
      </Button>
      {isOpen && (
        <Button
          className="rounded-md border p-2 font-semibold text-[#fa5e55] hover:bg-gray-100 dark:bg-[#212830] dark:hover:bg-[#3d4a58]"
          onClick={() => deleteApplication(applicationId)}
        >
           <TrashIcon className="w-5"/>
        </Button>
      )}
    </div>
    

  )
}