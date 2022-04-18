import React from "react";

function CustomerDelete(props) {
  const deleteCustomer = (id) => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    }).then(props.stateRefresh());
    // stateRefresh()가 동작하지 않는 오류 발생
  };

  return (
    <button
      onClick={(e) => {
        deleteCustomer(props.id);
      }}
    >
      삭제
    </button>
  );
}

export default CustomerDelete;
