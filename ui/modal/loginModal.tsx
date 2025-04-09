"use client"
import React, { useState } from "react";
import { Modal, useModal } from "@/ui/components/modal"
import Button from "@/ui/components/button";
import { EyeCloseIcon, EyeIcon, UserCircleIcon } from "@/ui/icons";
import Input from "@/ui/components/input";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <>
      <Button 
        className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10" 
        onClick={openModal}
        children={
        <>
          <UserCircleIcon /> 
          <p className="text-sm dark:text-gray-400">
            Login
          </p>
        </>}
      />
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <h4 className="mb-6 text-title-sm font-medium text-gray-800 dark:text-white/90">
          Login
        </h4>
        <form action={formAction} >
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 dark:text-white/90">
                Email <span className="text-error-500">*</span>{" "}
              </label>
              <Input placeholder="info@gmail.com" type="email" id="email" name="email" />
            </div>
            <div>
              <label className="text-gray-800 dark:text-white/90">
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
            <div className="flex items-center justify-between">
              {/* <p className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
                Forgot password?
              </p> */}
            </div>
            <div>
              <input type="hidden" name="redirectTo" value={callbackUrl} />
              <Button 
                className="px-4 py-3 text-sm inline-flex items-center justify-center font-medium gap-2 rounded-lg transition bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 w-full" 
                aria-disabled={isPending}
              >
                Login
              </Button>
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}