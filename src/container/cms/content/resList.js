import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';

import { getResList } from '../../../redux/res.redux'
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    searchButton: {
        marginLeft: 10
    },
    createBtn: {
        float: 'right',
        marginTop: 30,
    },
    operateButton: {
        margin: 5
    },
    tableTitle: {
        marginTop: 10,
    }
});

@connect(
    state => state,
    { getResList }
)
class CmsText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        console.log(this.props)
        this.props.getResList(this.props.SideBar.type)
    }
    render() {
        {
            const { classes } = this.props;
            const resType = this.props.SideBar.resWords
            return (
                <div>
                    <Typography variant="title">我的{resType}</Typography>
                    <TextField
                        id="search"
                        label={"搜索" + resType}
                        type="search"
                        className={classes.textField}
                        margin="normal"
                    />
                    <Button variant="raised" className={classes.searchButton}>
                        搜索
                    </Button>
                    <Link to={"/cms/content/" + this.props.SideBar.secondPart + "/create"}>
                        <Button variant="raised" color="primary" className={classes.createBtn}>
                            新建{resType}
                        </Button></Link>

                    <Typography className={classes.tableTitle} variant="subheading">{resType}列表</Typography>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>名称</TableCell>
                                    <TableCell numeric>付费类型</TableCell>
                                    <TableCell numeric>价格</TableCell>
                                    <TableCell numeric>上架时间</TableCell>
                                    <TableCell numeric>状态</TableCell>
                                    <TableCell numeric>操作</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.res.resList.map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            <TableCell>{n.name}</TableCell>
                                            <TableCell numeric>{n.saleType ? "单卖" : "免费"}</TableCell>
                                            <TableCell numeric>{n.saleType ? n.price : 0}</TableCell>
                                            <TableCell numeric>{n.saleTime.split('.')[0]}</TableCell>
                                            <TableCell numeric>已上架</TableCell>
                                            <TableCell numeric>
                                                <Link to={"/cms/content/" + this.props.SideBar.secondPart + "/" + n.id}>
                                                    <Button variant="fab" mini color="primary" aria-label="edit" className={classes.operateButton}>
                                                        <Icon>edit_icon</Icon>
                                                    </Button>
                                                </Link>

                                                <Button variant="fab" mini aria-label="delete" className={classes.operateButton}>
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>


                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>

            );
        }
    }
}


CmsText.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CmsText);