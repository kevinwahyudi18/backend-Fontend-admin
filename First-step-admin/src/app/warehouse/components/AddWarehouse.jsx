"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BASE_URL from "@/lib/baseUrl";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export default function AddWarehouse() {
  const [warehouseName, setWarehouseName] = useState("");
  const [addressName, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const token = getCookie("adminAccessToken");

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = {
            warehouse_name : warehouseName,
            address : addressName
        }

        const responseData = await fetch(`${BASE_URL}/warehouse`, {
            method: "POST",
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
            title: "Create Warehouse Success",
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
    <>
      <div className="flex justify-center sm:justify-end">
        <button className="btn btn-sm btn-outline btn-primary mb-5 sm:btn-md" onClick={handleModal}>
          Add New Warehouse
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-5">Add New Warehouse</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full">
                <label className="label font-bold">Warehouse Name</label>
                <input required type="text" className="input input-sm input-bordered sm:input-md" value={warehouseName} onChange={(e) => setWarehouseName(e.target.value)} />
                <label className="label font-bold">Address</label>
                <input required type="text" className="input input-sm input-bordered sm:input-md" value={addressName} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="modal-action">
                <button type="button" className="btn btn-sm sm:btn-md" onClick={handleModal}>
                  Close
                </button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
