import React from "react";

const CustomerProfile = (customers) => {
  return (
    <div>
      <img src={customers.image} alt="profile" />
      <h2>
        {customers.name}({customers.id})
      </h2>
    </div>
  );
};

export default CustomerProfile;
