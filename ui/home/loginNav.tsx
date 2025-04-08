import LoginModal from "@/ui/modal/loginModal";
import RegisterModal from "@/ui/modal/registerModal";

export default function LoginNav() {

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Welcome to Trackr
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Login or Signup to begin your application tracking journey!
            </p>
          </div>
          <div>
            <div className="flex justify-center">
              <LoginModal />
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <RegisterModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}