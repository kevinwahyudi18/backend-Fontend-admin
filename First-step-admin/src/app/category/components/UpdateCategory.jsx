"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BASE_URL from "@/lib/baseUrl";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export default function UpdateCategory({ category }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const token = getCookie("adminAccessToken");
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        category_name: categoryName,
      };
      const responseData = await fetch(`${BASE_URL}/category/${category.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const response = await responseData.json();

      Swal.fire({
        icon: "success",
        title: "Update Category Success",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
      });

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button className="btn btn-xs btn-outline sm:btn-sm btn-primary" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="text-xl font-bold mb-5">Update {category.category_name}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Name</label>
              <input type="text" required className="input input-sm input-bordered sm:input-md" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
              <div className="modal-action">
                <button type="button" className="btn btn-sm sm:btn-md" onClick={handleModal}>
                  Close
                </button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-primary btn-outline">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
