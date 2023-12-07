import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";

const Category = ({ category, index }) => {
  return (
    <>
      <td className="hidden sm:block">{index + 1}</td>
      <td>{category.category_name}</td>
      <td className="flex space-x-2">
        <DeleteCategory category={category} />
        <UpdateCategory category={category} />
      </td>
    </>
  );
};

export default Category;
