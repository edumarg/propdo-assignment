import React from "react";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/drawerStyles";

import logo from "../cryptocurrency.png";

const SideBar = (props) => {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const list = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <NavLink to="/currencies">
          <ListItem button>
            <ListItemIcon>
              <i className="fa fa-btc" aria-hidden="true"></i>
            </ListItemIcon>
            <ListItemText> Currencies</ListItemText>
          </ListItem>
        </NavLink>
        <NavLink to="/charts">
          <ListItem button>
            <ListItemIcon>
              <i className="fa fa-line-chart" aria-hidden="true"></i>
            </ListItemIcon>
            <ListItemText> Charts</ListItemText>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Cryptocurrencies{" "}
          </Typography>
          <div>
            <img
              src={logo}
              width="30"
              height="30"
              className={classes.logo}
              alt="cryptocurency logo"
            />
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="Menu">
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="top"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {list}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {list}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
};

SideBar.propTypes = { window: PropTypes.func };

export default SideBar;
