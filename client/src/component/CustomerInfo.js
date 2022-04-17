import React from "react";

const CustomerInfo = (customers) => {
  return (
    <div>
      <p>{customers.birthday}</p>
      <p>{customers.gender}</p>
      <p>{customers.job}</p>
    </div>
  );
};

export default CustomerInfo;
