import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

function Customer(customers) {
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
    </TableRow>
  );
}

export default Customer;
