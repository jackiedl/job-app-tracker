"use client"
import React, { useState } from "react";
import { Modal, useModal } from "../components/modal";
import Button from "../components/button";
import { EyeCloseIcon, EyeIcon, SignOutIcon } from "../icons";
import Input from "../components/input";
import { useActionState } from "react";
import { register } from "@/lib/actions";
import { useSearchParams } from "next/navigation";

export default function RegisterModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [errorMessage, formAction, isPending] = useActionState(
      register,
      undefined,
    );
  return (
    <>
      <Button 
        className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10" 
        onClick={openModal}
        children={
        <>
          <SignOutIcon className="-rotate-180"/> 
          <p className="text-sm dark:text-gray-400">
            Register
          </p>
        </>}
      />
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <h4 className="mb-6 text-title-sm font-medium text-gray-800 dark:text-white/90">
          Register
        </h4>
        <form action={formAction}>
          <div className="space-y-6">
            <div>
              <label>
                Name <span className="text-error-500">*</span>{" "}
              </label>
              <Input placeholder="John Doe" type="name" id="name" name="name" />
            </div>
            <div>
              <label>
                Email <span className="text-error-500">*</span>{" "}
              </label>
              <Input placeholder="johndoe98@gmail.com" type="email" id="email" name="email" />
            </div>
            <div>
              <label>
                Password <span className="text-error-500">*</span>{" "}
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </span>
              </div>
            </div>
            <div>
              <input type="hidden" name="redirectTo" value={callbackUrl} />
              <Button 
                className="px-4 py-3 text-sm inline-flex items-center justify-center font-medium gap-2 rounded-lg transition bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 w-full" 
                aria-disabled={isPending}
              >
                Register
              </Button>
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage && (
                  <p className="text-sm text-red-500">Database Error: Failed to Register</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}