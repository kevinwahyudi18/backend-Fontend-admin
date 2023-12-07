"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    deleteCookie("adminAccessToken");
    router.push("/login");
  });

  return (
    <div
      className="  flex
  items-center
  justify-center
  w-screen
  h-screen
  bg-gradient-to-r
  from-indigo-600
  to-blue-400"
    >
      <div className="px-40 py-20 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-blue-600 text-9xl">401</h1>
          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Token not valid
          </h6>
          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Redirecting to login page...
          </p>
        </div>
      </div>
    </div>
  );
}
