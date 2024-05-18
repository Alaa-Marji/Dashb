import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Check from "@mui/icons-material/Check";

export default function DenseMenu({ handleClose }) {
  return (
    <Paper sx={{ width: 320 }}>
      <MenuList dense>
        <MenuItem onClick={() => handleClose("/roles")}>
          <ListItemText inset>Roles</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose("/prem")}>
          <ListItemText inset>Prem</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClose("/add-emp")}>
          <ListItemText inset>Add Emp</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
