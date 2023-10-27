import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";

const AddCustomer = (props) => {
  const respo = useSelector((y) => y.user.singleData);
  const isTrue = useSelector((y) => y.user.addReq);
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    mobile: "",
  });


  React.useEffect(() => {
    if (!props.openl && props.open) {
      setdata({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        mobile: "",
      });
    }
  }, [props.open]);

  React.useEffect(() => {
    if (!isTrue) return;
    setdata("");
    setdata(respo);
  }, [respo]);

  const handlerChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <Dialog open={props.open} onClose={props.close} fullWidth>
          <DialogTitle>{props.updt == false ? "Add":"Update" } Customer</DialogTitle>
          <DialogContent>
            <TextField
              id="firstname"
              label="First Name"
              type="text"
              name="firstname"
              fullWidth
              variant="standard"
              value={data.firstname || ""}
              onChange={(e) => handlerChange(e)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              id="lastname"
              label="Last Name"
              type="text"
              name="lastname"
              fullWidth
              variant="standard"
              value={data.lastname || ""}
              onChange={(e) => handlerChange(e)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              id="email"
              label="Email"
              type="email"
              name="email"
              fullWidth
              variant="standard"
              value={data.email || ""}
              onChange={(e) => handlerChange(e)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              id="address"
              label="Address"
              type="text"
              name="address"
              fullWidth
              variant="standard"
              value={data.address || ""}
              onChange={(e) => handlerChange(e)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              id="mobile"
              label="Mobile No."
              type="number"
              name="mobile"
              fullWidth
              variant="standard"
              value={data.mobile || ""}
              onChange={(e) => handlerChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.close(false)}>Cancel</Button>
            <Button
              onClick={() =>
                !props.openL ? props.close(data) : props.close(data, respo.id)
              }
            >
              {!props.openL ? "Add" : "Update"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AddCustomer;