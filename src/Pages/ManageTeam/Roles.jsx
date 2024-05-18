import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Grid,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { baseURL } from "../../Api/Api";
import Cookie from "cookie-universal";

const predefinedPermissions = [
  "role control",
  "employee control",
  "delete user",
  "report user",
  "view news",
  "view employees",
  "view opportunities",
  "view users",
  "view posts",
  "delete opportunity",
  "block user",
  "delete post",
  "view requests",
  "delete request",
  "news control",
  "view reports user",
  "delete report user",
  "admin report",
  "view admin reports",
  "opportunity control",
  "edit request",
  "post control",
  "request control",
];

const RolesTable = () => {
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [editingRoleId, setEditingRoleId] = useState(null);
  const cookie = Cookie();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesResponse = await axios.get(`${baseURL}/role/allRoles`, {
          headers: {
            Authorization: `Bearer ${cookie.get("Token")}`,
          },
        });
        setRoles(rolesResponse.data);

        const initialPermissionsState = predefinedPermissions.reduce(
          (acc, permission) => {
            acc[permission] = false;
            return acc;
          },
          {}
        );
        setSelectedPermissions(initialPermissionsState);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleAddRole = () => {
    setShowForm(!showForm);
    setEditingRoleId(null);
    setRoleName("");
    const initialPermissionsState = predefinedPermissions.reduce(
      (acc, permission) => {
        acc[permission] = false;
        return acc;
      },
      {}
    );
    setSelectedPermissions(initialPermissionsState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const permissionsArray = Object.keys(selectedPermissions).filter(
      (permission) => selectedPermissions[permission]
    );

    const roleData = {
      title: roleName,
      permissions: permissionsArray,
    };

    const url = editingRoleId
      ? `${baseURL}/role/editRole`
      : `${baseURL}/role/addRole`;

    const data = editingRoleId
      ? {
          role: editingRoleId,
          new_name: roleName,
          permissions: permissionsArray,
        }
      : roleData;

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${cookie.get("Bearer ")}`,
        },
      });

      if (editingRoleId) {
        setRoles(
          roles.map((role) =>
            role.id === editingRoleId ? response.data : role
          )
        );
      } else {
        setRoles([...roles, response.data]);
      }

      setShowForm(false);
      setRoleName("");
      const initialPermissionsState = predefinedPermissions.reduce(
        (acc, permission) => {
          acc[permission] = false;
          return acc;
        },
        {}
      );
      setSelectedPermissions(initialPermissionsState);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleEditRole = (id) => {
    const role = roles.find((role) => role.id === id);
    setEditingRoleId(id);
    setRoleName(role.role);
    const permissionsState = predefinedPermissions.reduce((ar, permission) => {
      ar[permission] = role.permissions.includes(permission);
      return ar;
    }, {});
    setSelectedPermissions(permissionsState);
    setShowForm(true);
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`${baseURL}/role/deleteRole`, {
        data: { role: id },
      });
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error("There was an error deleting the role!", error);
    }
  };

  const handleCheckboxChange = (event) => {
    setSelectedPermissions({
      ...selectedPermissions,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRole}
        style={{ marginBottom: 16, marginLeft: 8 }}
      >
        Add Role
      </Button>
      {showForm && (
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{ marginBottom: 2 }}
        >
          <TextField
            label="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <FormGroup>
            <Grid container spacing={2}>
              {predefinedPermissions.map((permission) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={permission}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedPermissions[permission]}
                        onChange={handleCheckboxChange}
                        name={permission}
                      />
                    }
                    label={permission}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Submit
          </Button>
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.role}</TableCell>
                <TableCell>
                  {role.permissions.map((permission) => (
                    <Button
                      key={permission}
                      variant="contained"
                      color="primary"
                      style={{ margin: 2 }}
                    >
                      {permission}
                    </Button>
                  ))}
                </TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    gap: "2px",
                  }}
                >
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditRole(role.id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RolesTable;
