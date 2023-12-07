import Category from "./components/Category";
import { getAllCategory } from "./components/fetch";
import { cookies } from "next/headers";
import AddCategory from "./components/AddCategory";

export default async function Page() {
  const token = cookies().get("adminAccessToken");
  const Categorys = await getAllCategory(token.value);

  if (Categorys.error === "Unauthorized") {
    redirect("/logout");
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4">
        <h1 className="text-4xl font-bold text-center mb-10">List Category First Step</h1>
        <div>
          <AddCategory />
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full table-sm sm:table-md">
            <thead>
              <tr>
                <th className="hidden sm:block">No</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Categorys.data.map((category, index) => (
                <tr key={category.id}>
                  <Category category={category} index={index} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}