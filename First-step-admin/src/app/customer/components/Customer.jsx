import DeleteCustomer from "./DeleteCustomer"

const Customer = ({ customer, index }) => {
  return (
    <>
      <td className="hidden sm:block">{index + 1}</td>
      <td>{customer.username}</td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
      <td className="flex space-x-2">
        <DeleteCustomer customer={customer}/>
      </td>
    </>
  );
};

export default Customer;
