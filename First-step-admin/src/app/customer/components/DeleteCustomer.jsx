"use client";
import BASE_URL from "@/lib/baseUrl";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DeleteCustomer({ customer }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const token = getCookie("adminAccessToken");
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (customerId) => {
    try {
      const responseData = await fetch(
        `${BASE_URL}/user/${customerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const response = await responseData.json();
      Swal.fire({
        icon: "success",
        title: "Delete Customer Success",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("error detlete", error);
    }
  };
  return (
    <div>
      <button
        className="btn btn-xs btn-outline sm:btn-sm btn-error ml-3"
        onClick={handleModal}
      >
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="text-xl font-bold">
            Are you sure delete {customer.username}
          </h3>
          <form onSubmit={handleDelete}>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-sm sm:btn-md"
                onClick={handleModal}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-sm sm:btn-md btn-error"
                onClick={() => handleDelete(customer.id)}
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
