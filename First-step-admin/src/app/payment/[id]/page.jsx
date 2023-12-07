import fetchWithTokenServer from "@/lib/fetchWithTokenServer";

// import { getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Upload from "./components/Upload";

export default async function Page({ params }) {
  if (!cookies().get(`adminAccessToken`)) {
    redirect(`/login`);
  }
  const res = await fetchWithTokenServer(`payment/${params.id}`, "GET", {
    cache: "no-store",
  });

  if (res === "Unauthorized") {
    redirect("/logout");
  }

  const data = res.data

  return (
    <div className="p-5">
        <Upload data={data} />
    </div>
  );
}
