import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllCustomer } from "@/fetch/customer";
import { getAllProduct } from "@/fetch/productCount";
import { getAllOrder } from "@/fetch/order";

export default async function Home() {
  const token = cookies().get("adminAccessToken");

  if (!token) {
    redirect(`/login`);
  }

  const Customers = await getAllCustomer(token.value);
  const cusLength = Customers.data ? Customers.data.length : 0;

  const resProducts = await getAllProduct(token.value);
  const productLength = resProducts.data ? resProducts.data.length : 0;

  const Order = await getAllOrder(token.value);
  const dataOrder = Array.isArray(Order) ? Order : []; // Check if Order is an array

  const todayDate = new Date().toISOString().split("T")[0];
  const todayOrder = dataOrder.filter((order) => order.created_at.startsWith(todayDate));

  const todayOrderLength =todayOrder.data ? todayOrder.length : 0;

  return (
    <>
      <div className="container mx-auto mt-20 justify-center text-center">
        <div className="mx-auto text-center mb-20 md:w-full lg:w-1/2 justify-center items-center">
          <p className="text-2xl mb-2 font-bold">Welcome back to</p>
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard First Step</h1>
        </div>
      </div>

      <div className="container mx-auto flex">
        <div className="w-3/4">
          <h1 className="text-3xl font-bold mb-4">Last User Order</h1>
          <table className="table table-zebra table-sm md:w-3/4">
            <thead>
              <tr>
                <th className="hidden sm:block">No</th>
                <th>Username User</th>
                <th>Email User</th>
                <th>Phone User</th>
              </tr>
            </thead>
            <tbody>
              {Customers.data.map((customer, index) => (
                <tr key={customer.id}>
                  <td className="hidden sm:block">{index + 1}</td>
                  <td>{customer.username}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/4 flex flex-col justify-center items-center">
          <Link href={"/customer"}>
            <div className="bg-primary text-white hover:bg-orange-400 w-52 h-24 mb-6 shadow-xl cursor-pointer rounded-lg overflow-hidden">
              <h2 className="text-center font-semibold text-5xl leading-none pt-2 mt-2">{cusLength}</h2>
              <p className="text-center text-lg">Total User</p>
            </div>
          </Link>
          <Link href={"/products"}>
            <div className="bg-primary text-white hover:bg-orange-400 w-52 h-24 mb-6 shadow-xl cursor-pointer rounded-lg overflow-hidden">
              <h2 className="text-center font-semibold text-5xl leading-none pt-2 mt-2">{productLength}</h2>
              <p className="text-center text-lg">Total Product</p>
            </div>
          </Link>
          <Link href={"/order"}>
            <div className="bg-primary text-white hover:bg-orange-400 w-52 h-24 mb-6 shadow-xl cursor-pointer rounded-lg overflow-hidden">
              <h2 className="text-center font-semibold text-5xl leading-none pt-2 mt-2">{todayOrderLength}</h2>
              <p className="text-center text-lg">Total Orders Today</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
