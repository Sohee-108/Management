import React from "react";

import CustomerProfile from "./CustomerProfile";
import CustomerInfo from "./CustomerInfo";

const Customer = (customers) => {
  return (
    <div>
      <CustomerProfile
        id={customers.id}
        image={customers.image}
        name={customers.name}
      />
      <CustomerInfo
        birthday={customers.birthday}
        gender={customers.gender}
        job={customers.job}
      />
    </div>
  );
};

export default Customer;
