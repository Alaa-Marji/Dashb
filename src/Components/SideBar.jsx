import { useState } from "react"; // استيراد useState
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Avatar, Typography, styled, useTheme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import PropTypes from "prop-types";

import Logout from "../Pages/Auth/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {
  AddTask,
  BarChartOutlined,
  BlockOutlined,
  ContactsOutlined,
  HandshakeOutlined,
  LoginOutlined,
  ManageAccountsOutlined,
  PeopleOutlined,
  PersonAddAlt,
  PieChartOutlineOutlined,
  ReportProblemOutlined,
  TimelineOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Array1 = [
  { text: "Dashboard", icon: <HomeOutlinedIcon />, path: "/" },
  {
    text: "Manage Team",
    icon: <PeopleOutlined />,
    path: "/Team",
    subItems: [
      { text: "Roles", path: "/Roles" },
      { text: "Add Employee", path: "/AddEmployee" },
    ],
  },
];

const Array3 = [
  { text: "Users", icon: <ManageAccountsOutlined />, path: "/Users" },
  { text: "Posts", icon: <ContactsOutlined />, path: "/Posts" },
  {
    text: "Companies Reg",
    icon: <HandshakeOutlined />,
    path: "/CompaniesRegistration",
  },
];
const Array4 = [
  { text: "Reports", icon: <ReportProblemOutlined />, path: "/Reports" },
  { text: "Block", icon: <BlockOutlined />, path: "/Block" },
];
const Array5 = [
  { text: "Bar Chart", icon: <BarChartOutlined />, path: "/BarChart" },
  { text: "Pie Chart", icon: <PieChartOutlineOutlined />, path: "/PieChart" },
  { text: "Line Chart", icon: <TimelineOutlined />, path: "/LineChart" },
];

const DenseMenu = ({ handleClose }) => {
  return (
    <>
      <ListItem
        disablePadding
        sx={{ display: "block", justifyContent: "center", textAlign: "center" }}
      >
        <ListItemButton onClick={() => handleClose("/Roles")}>
          <ListItemIcon>
            <AddTask />
          </ListItemIcon>
          <ListItemText primary="Roles" />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: "block", justifyContent: "center", textAlign: "center" }}
      >
        <ListItemButton onClick={() => handleClose("/AddEmployee")}>
          <ListItemIcon>
            <PersonAddAlt />
          </ListItemIcon>

          <ListItemText primary="AddEmployee" />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default function SideBar({ open, handleDrawerClose }) {
  let location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [denseMenuVisible, setDenseMenuVisible] = useState(false);
  const toggleDenseMenu = () => {
    setDenseMenuVisible(!denseMenuVisible);
  };
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <Avatar
        sx={{
          mx: "auto",
          width: open ? 88 : 44,
          height: open ? 88 : 44,
          my: 1,
          border: "2px solid grey",
          transition: "0.25s",
        }}
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
      />
      <Typography
        align="center"
        sx={{ fontSize: open ? 17 : 0, transition: "0.25s" }}
      >
        Alaa Almarji
      </Typography>
      <Typography
        align="center"
        sx={{
          fontSize: open ? 15 : 0,
          transition: "0.25s",
          color: theme.palette.info.main,
        }}
      >
        Admin
      </Typography>

      <Divider />
      <List>
        {Array1.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                if (item.subItems) {
                  toggleDenseMenu(); // Toggle the dense menu
                } else {
                  navigate(item.path);
                }
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.path
                    ? theme.palette.mode === "dark"
                      ? grey[800]
                      : grey[300]
                    : null,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {denseMenuVisible && (
        <List>
          <DenseMenu
            handleClose={(path) => {
              // Close the dense menu and navigate to the selected path
              setDenseMenuVisible(false);
              navigate(path);
            }}
          />
        </List>
      )}

      <Divider />
      <List>
        {Array3.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.path
                    ? theme.palette.mode === "dark"
                      ? grey[800]
                      : grey[300]
                    : null,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {Array4.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.path
                    ? theme.palette.mode === "dark"
                      ? grey[800]
                      : grey[300]
                    : null,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {Array5.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.path
                    ? theme.palette.mode === "dark"
                      ? grey[800]
                      : grey[300]
                    : null,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className="logout" style={{ display: "flex", cursor: "pointer" }}>
        <LoginOutlined
          sx={{
            fontSize: 28,
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
            marginTop: "10px",
          }}
        />
        <Logout handleLogout={handleDrawerClose} />
      </div>
      <Divider />
    </Drawer>
  );
}

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};
