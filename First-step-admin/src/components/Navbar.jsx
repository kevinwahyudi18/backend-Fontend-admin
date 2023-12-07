"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import logo from "../assets/logo.png";
import Image from "next/image";
export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("adminAccessToken");
    router.push("/login");
  };

  return (
    <div className="navbar bg-secondary">
      <div className="flex-none">
        <div className="drawer bg-secondary ">
          <input id="my-drawer" type="checkbox" className="bg-secondary drawer-toggle" />
          <div className="btn btn-square btn-ghost">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-secondary drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="drawer-side z-10">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <h1 className="text-2xl font-bold text-primary ">Dashboard Admin</h1>
              <li className="hover:bg-primary rounded-lg">
                <Link href="/products">Product</Link>
              </li>
              <li className="hover:bg-primary rounded-lg">
                <Link href="/order">Order</Link>
              </li>
              <li className="hover:bg-primary rounded-lg">
                <Link href="/category">Category</Link>
              </li>
              <li className="hover:bg-primary rounded-lg">
                <Link href="/payment">Payment</Link>
              </li>
              <li className="hover:bg-primary rounded-lg">
                <Link href="/warehouse">Warehouse</Link>
              </li>
              <li className="hover:bg-primary rounded-lg">
                <Link href="/customer">Customer</Link>
              </li>
              <li className="bg-red-400 rounded-lg">
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 mx-5 flex justify-center items-center">
        <Link href={"/"}>
          <Image src={logo} alt="" width={200} height={200} />
        </Link>
      </div>
    </div>
  );
}
