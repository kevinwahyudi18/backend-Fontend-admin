"use client";
import fetchWithTokenClient from "@/lib/fetchWithTokenClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import getConfig from "next/config";

export default function Upload({ data }) {
  const router = useRouter();

  const handleAccept = async () => {
    const body = {
      status: "accepted",
    };

    const res = await fetchWithTokenClient(`payment/${data.id}`, "PUT", {
      body: JSON.stringify(body),
    });
    Swal.fire({ icon: "success", text: "Success" });
    router.refresh();
    router.push("/payment");
  };

  const handleReject = async () => {
    const body = {
      status: "rejected",
    };

    const res = await fetchWithTokenClient(`payment/${data.id}`, "PUT", {
      body: JSON.stringify(body),
    });

    Swal.fire({ icon: "success", text: "Rejected" });
    router.refresh();
    router.push("/payment");
  };

  return (
    <div className="border-2 rounded-lg p-10 flex-1 min-w-[370px] bg-slate-50">
      <div className="flex justify-between items-center py-2">
        <h1 className="font-bold text-xl py-8 border-b-2 flex-1 text-center">Bukti Transfer</h1>
      </div>
      <div>
        {data.upload ? (
          <div className="flex items-center justify-center">
            <Image className="w-auto h-auto" onClick={() => router.push(data.upload)} src={data.upload} alt={data.upload} height={200} width={200} />
          </div>
        ) : (
          "No payment receipt is submitted"
        )}
        <div className="flex p-5 items-center justify-center">
          <button className="bg-green-300 py-1 px-2 rounded-md mr-10" onClick={handleAccept}>
            Accept
          </button>
          <button onClick={handleReject} className="bg-red-300 py-1 px-2 rounded-md">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
