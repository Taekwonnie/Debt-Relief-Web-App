import React, { useState, useEffect } from "react";
import clsx from "clsx";

import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PieChartIcon from "@material-ui/icons/PieChart";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { withRouter } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  //FormControlLabel,
  //Switch,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
} from "@material-ui/core";
//import { WindowScroller } from "react-virtualized";

const drawerWidth = 270;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 500,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  titleItemRight: {
    float: "right",
  },
}));

const Sidebar = (props) => {
  const { logout } = useAuth();
  //Handle logout
  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {}
  }
  const { history } = props;
  const classes = useStyles();
  const theme = useStyles();
  const [open, setOpen] = React.useState(false);
  const [toggleState, setToggleState] = useState({
    //Toggle handler
    toggler: true,
  });

  const handleToggleChange = (event) => {
    setToggleState({
      ...toggleState,
      [event.target.name]: event.target.checked,
    });
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function darkMode() {
    var aValue = localStorage.getItem("theme");
    if (aValue === "true") {
      console.log("1");
      localStorage.setItem("theme", false);
    } else if (aValue === "false") {
      console.log("2");
      localStorage.setItem("theme", true);
    }
    window.location.reload();
  }

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", false);
    }
  }, []);

  const itemListMain = [
    {
      text: "Dashboard ",
      icon: <DashboardIcon />,
      onClick: () => history.push("/"),
    },
    {
      text: "Debt Input ",
      icon: <AssignmentIcon />,
      onClick: () => history.push("/Debt"),
    },
    {
      text: "Income ",
      icon: <AccountBalanceWalletIcon />,
      onClick: () => history.push("/income"),
    },
    {
      text: "Transactions & Expenses",
      icon: <MonetizationOnIcon />,
      onClick: () => history.push("/expense"),
    },
    {
      text: "Analytics ",
      icon: <PieChartIcon />,
      onClick: () => history.push("/analytics"),
    },
  ];
  const itemListSecondary = [
    {
      text: "Account",
      icon: <AccountBoxIcon />,
      onClick: () => history.push("/update-account"),
    },
    {
      text: "Settings ",
      icon: <SettingsIcon />,
      onClick: () => history.push("/setting"),
    },
    {
      text: "Dark | Light Toggle",
      icon: <Brightness4Icon />,
      onClick: darkMode,
    },
    {
      text: "Logout ",
      icon: <ExitToAppIcon />,
      onClick: handleLogout,
    },
  ];
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Debt Relief Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List>
          {itemListMain.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {itemListSecondary.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default withRouter(Sidebar);
