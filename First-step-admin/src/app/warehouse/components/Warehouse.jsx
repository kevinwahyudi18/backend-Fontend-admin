import DeleteWarehouse from "./DeleteWarehouse";
import UpdateWarehouse from "./UpdateWarehouse";

const Warehouse = ({ warehouse, index }) => {
    return (
      <>
        <td className="hidden sm:block">{index + 1} </td>
        <td>{warehouse.warehouse_name} </td>
        <td>{warehouse.address} </td>
        <td>{warehouse.productCount} Product</td>
        <td className="flex space-x-2">
          <DeleteWarehouse warehouse={warehouse}/>
          <UpdateWarehouse warehouse={warehouse}/>
        </td>
      </>
    );
  };
  
  export default Warehouse;
  