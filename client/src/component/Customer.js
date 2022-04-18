import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import CustomerDelete from "./CustomerDelete";

function Customer(customers, props) {
  return (
    <TableRow>
      <TableCell>{customers.id}</TableCell>
      <TableCell>
        <img src={customers.image} alt="profile" />
      </TableCell>
      <TableCell>{customers.name}</TableCell>
      <TableCell>{customers.birthday}</TableCell>
      <TableCell>{customers.gender}</TableCell>
      <TableCell>{customers.job}</TableCell>
      <TableCell>
        <CustomerDelete stateRefresh={props.stateRefresh} id={customers.id} />
      </TableCell>
    </TableRow>
  );
}

export default Customer;
