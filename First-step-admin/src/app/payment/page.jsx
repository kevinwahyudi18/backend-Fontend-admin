import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllPayment } from "./components/fetch";
import Link from "next/link";

export default async function Page() {
  const token = cookies().get("adminAccessToken");
  const Payments = await getAllPayment(token.value);

  if (Payments.error === "Unauthorized") {
    redirect("/logout");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4">
        <h1 className="text-4xl font-bold text-center mb-10">List Payment First Step</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full table-sm sm:table-md">
            <thead>
              <tr>
                <th className="hidden sm:block">No</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Cart ID</th>
                <th className="px-4 py-3">Payment Method ID</th>
                <th className="px-4 py-3">Total Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {Payments.data.map((payment, index) => (
                <tr key={payment.id}>
                  <td className="hidden sm:block">{index + 1}</td>
                  <td>{payment.order_id}</td>
                  <td>{payment.cart_id}</td>
                  <td>{payment.payment_method_id}</td>
                  <td>RP. {payment.total_price}</td>
                  <td className="px-4 py-3 items-center">
                    <p
                      className="p-2 rounded-md text-center"
                      defaultValue={payment.status}
                      style={{
                        backgroundColor:
                          payment.status === "waiting"
                            ? "#8DD1F0"
                            : payment.status === "rejected"
                            ? "#F6AA97"
                            : payment.status === "accepted"
                            ? "#93EF93"
                            : "Red",
                      }}
                    >
                      {payment.status}
                    </p>
                  </td>
                  <td className="text-center">
                      <Link href={`payment/${payment.id}`}>
                        <button className="btn">VIEW</button>
                      </Link>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
