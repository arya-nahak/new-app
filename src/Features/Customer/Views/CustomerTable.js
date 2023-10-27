import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addList,
  deleteList,
  getList,
  getSingleList,
  updateList,
} from "../AsyncActions/AsyncAction";
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionIcon, Box, Menu } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import AddCustomer from "../../../Components/AddCustomer";
import { Button, Typography } from "@mui/material";

const CustomerTable = () => {
  const [open, setOpen] = React.useState(false);
  const [openL, setOpenL] = React.useState(false);
  const [updt, setUpdt] = React.useState(false);
  
  const handleClickOpen = (data) => {
    if (data === false) {
      setOpen(true);
      setOpenL(false);
      setUpdt(false)
    } else {
      setOpen(true);
      setOpenL(true);
      setUpdt(true)
      dis(getSingleList(data));

    }
  };

  const ref = useSelector((y) => y.user.data);
  const isRefresh = useSelector((y) => y.user.addReq);
  const dis = useDispatch();


  const handleDelete = (id) => {
    dis(deleteList(id));
  };

  const submitHandler = (data,reason) => {
    
    if (reason === "backdropClick") {
      return;
    }
    
    if (data === false) {
      setOpen(false);
    }else if(reason !== undefined){
      dis(updateList(data,reason))
      setOpen(false);
    } else {
      if (!data.firstname ||!data.lastname ||!data.email ||!data.address ||!data.mobile) return;
      dis(addList(data));
      setOpen(false);
    }

  };

  const data = ref ? ref : [];

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "firstname",
        header: "First Name",
      },
      {
        accessorKey: "lastname",
        header: "Last Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "mobile",
        header: "Mobile no",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <ActionIcon color="blue" onClick={() => handleClickOpen(row.original.id)}>
          <IconEdit />
        </ActionIcon>
        <ActionIcon color="red" onClick={() => handleDelete(row.original.id)}>
          <IconTrash />
        </ActionIcon>
      </Box>
    ),
  });

  useEffect(() => {
    dis(getList());
  }, [isRefresh]);

  return (
    <>
      <Typography margin="10px" align="right">
        <Button
          className=""
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen(false)}
        >
          Add Customer
        </Button>
      </Typography>
      <AddCustomer open={open} openL={openL} close={submitHandler} updt={updt}/>
      <MantineReactTable table={table} />;
    </>
  );
};

export default CustomerTable;
