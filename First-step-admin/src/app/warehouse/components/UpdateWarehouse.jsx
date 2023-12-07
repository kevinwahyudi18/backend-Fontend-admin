"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BASE_URL from "@/lib/baseUrl";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export default function UpdateWarehouse({ warehouse }) {
  const [isOpen, setIsOpen] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");

  const token = getCookie("adminAccessToken");
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      let payload = {
        warehouse_name: warehouseName,
        address: warehouseAddress
      };
      const responseData = await fetch(
        `${BASE_URL}/warehouse/${warehouse.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        }
      );

      const response = await responseData.json();

      Swal.fire({
        icon: "success",
        title: "Update Warehouse Success",
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
      <button
        className="btn btn-xs btn-outline sm:btn-sm btn-primary"
        onClick={handleModal}
      >
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="text-xl font-bold mb-5">Update {warehouse.warehouse_name}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Warehouse Name</label>
              <input
                type="text"
                required
                className="input input-sm input-bordered sm:input-md"
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
              />
              <label className="label font-bold">Warehouse Address</label>
              <input
                type="text"
                required
                className="input input-sm input-bordered sm:input-md"
                value={warehouseAddress}
                onChange={(e) => setWarehouseAddress(e.target.value)}
              />
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-sm sm:btn-md"
                  onClick={handleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-sm sm:btn-md btn-primary btn-outline"
                >
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
