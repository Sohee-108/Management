import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@material-ui/core";

function CustomerDelete(props) {
  const [open, setOpen] = useState(false);

  const deleteCustomer = (id) => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    setOpen(false);
    // }).then(props.stateRefresh());
    // stateRefresh()가 동작하지 않는 오류 발생
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        삭제
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>삭제 경고</DialogTitle>
        <DialogContent gutterBottom>
          <Typography>선택한 고객 정보가 삭제됩니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => {
              deleteCustomer(props.id);
            }}
          >
            삭제
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerDelete;
