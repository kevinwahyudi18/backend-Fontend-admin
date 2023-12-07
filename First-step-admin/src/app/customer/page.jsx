import Customer from "./components/Customer";
import { getAllCustomer } from "./components/fetch";
import { cookies } from "next/headers";

export default async function Page() {
  const token = cookies().get("adminAccessToken");
  const Customers = await getAllCustomer(token.value);

  if (Customers.error === "Unauthorized") {
    redirect("/logout");
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4">
        <h1 className="text-4xl font-bold text-center mb-10">List Customer First Step</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full table-sm sm:table-md">
            <thead>
              <tr>
                <th className="hidden sm:block">No</th>
                <th>Username User</th>
                <th>Email User</th>
                <th>Phone User</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Customers.data.map((customer, index) => (
                <tr key={customer.id}>
                  <Customer customer={customer} index={index} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}