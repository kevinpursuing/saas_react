import React from 'react';
import PropTypes from 'prop-types';
import {
    Route
} from 'react-router-dom'

import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import SidebarData from './SidebarData';

import AuthRoute from './AuthRoute/AuthRoute'
import CmsIndex from './index/CmsIndex'
import CmsResList from './content/resList'
import CreateAndEditContent from './content/CreateAndEditContent'




const drawerWidth = 240;


const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    sideBar: {
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0,
        height: 64,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
        lineHeight: 4,
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

@connect(
    state => state,
    {}
)
class ResponsiveDrawer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileOpen: false,
            firstPart: "index",
            secondPart: "",
        };
    }


    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar}>
                    <div className={classes.sideBar}>SaaS</div>
                </div>
                <Divider />
                <SidebarData location={this.props.location.pathname}></SidebarData>
                <Divider />
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            SaaS 后台管理系统
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div style={{ margin: '0 16px', overflow: 'initial' }}>
                        <AuthRoute></AuthRoute>
                        <Route path="/cms/" exact component={CmsIndex} />
                        <Route path="/cms/index" exact component={CmsIndex} />
                        <Route path="/cms/content/text" exact component={CmsResList} />
                        <Route path="/cms/content/text/:type" exact component={CreateAndEditContent} />
                        <Route path="/cms/content/audio" exact component={CmsResList} />
                        <Route path="/cms/content/audio/:type" exact component={CreateAndEditContent} />
                        <Route path="/cms/content/video" exact component={CmsResList} />
                        <Route path="/cms/content/video/:type" exact component={CreateAndEditContent} />
                    </div>

                </main>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);