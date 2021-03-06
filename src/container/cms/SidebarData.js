import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuList, MenuItem } from 'material-ui/Menu';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import { changePart } from '../../redux/SideBar.redux'

import "../../index.css"

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    sideSecondPart: {
        color: 'grey'
    }
});

const options = {
    content: ['内容', {
        text: "我的图文",
        audio: "我的音频",
        video: "我的视频"
    }],
    user: ['用户', {
        myUser: "我的用户",
        usermessage: "用户消息",
    }],
    shop: ['店铺', {
        topPic: '轮播图',
        castegories: '分类导航'
    }],
    order: ['交易', {
        orderlist: '订单流水'
    }],
    count: ['统计', {
        content: '内容分析',
        user: '用户分析',
        order: '交易分析'
    }],
    account: ['账号管理', {
        detail: '账号详情',
        vip: '会员订购',
        rules: '角色管理'
    }]
}

@connect(
    state => state,
    { changePart }
)
class SidebarDate extends React.Component {
    state = {
        firstPartFlag: {
            content: false,
            user: false,
            shop: false,
            order: false,
            count: false,
            account: false
        }
    };

    componentDidMount = () => {
        let paramsArray = this.props.location.split("/")
        let firstArray = this.state.firstPartFlag
        firstArray[paramsArray[2]] = !firstArray[paramsArray[2]]
        this.props.changePart(paramsArray[2], paramsArray[3])
        // this.setState({
        //     firstParams: paramsArray[2],
        //     secondParams: paramsArray[3],
        //     firstPart: firstArray
        // })

    }

    handleMenuItemClick = (event, option) => {
        this.props.changePart(this.props.SideBar.firstPartFlag, option)
        console.log(this.props)
        console.log(option)
    };

    render() {
        const { classes, SideBar } = this.props;

        const secondPart = (secondPartData, firstPartName) => (
            <MenuList>
                {Object.keys(secondPartData).map((option, index) => (
                    <Link to={"/cms/" + firstPartName + "/" + option} key={option}>
                        <MenuItem
                            selected={option === SideBar.secondPart}
                            onClick={event => this.handleMenuItemClick(event, option)}
                        >
                            <ListItemIcon className={classes.icon}>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary={secondPartData[option]} />
                        </MenuItem>
                    </Link>
                ))}
            </MenuList>
        )
        return (
            <div className={classes.root}>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">SaaS后台管理系统</ListSubheader>}
                >
                    <Link to="/cms/index">
                        <MenuItem
                            selected={SideBar.firstPart === 'index'}
                            onClick={event => this.props.changePart('index', '')}
                        >
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="店铺概况" />
                        </MenuItem>
                    </Link>

                    {/* 侧边栏 */}
                    {Object.keys(options).map((o, i) => (
                        <div key={o}>
                            <ListItem button onClick={() => { let firstArray = this.state.firstPartFlag; firstArray[o] = !firstArray[o]; this.setState({ firstPartFlag: firstArray, firstParams: o }) }}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText inset primary={options[o][0]} />
                                {this.state.firstPartFlag[o] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.firstPartFlag[o]} timeout="auto" unmountOnExit>
                                {secondPart(options[o][1], o)}
                            </Collapse>
                        </div>
                    ))}
                </List>
            </div>
        );
    }
}

SidebarDate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarDate);