import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

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
    tableTitle: {
        marginTop: 10,
    }
});

let id = 0;
class CmsText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            data: [
                this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
                this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
                this.createData('Eclair', 262, 16.0, 24, 6.0),
                this.createData('Cupcake', 305, 3.7, 67, 4.3),
                this.createData('Gingerbread', 356, 16.0, 49, 3.9),
            ]

        }
    }
    
    componentDidMount = () => {
        console.log(this.props)
    }
    createData = (name, calories, fat, carbs, protein) => {
        id++
        return { id, name, calories, fat, carbs, protein };
    }

    render() {
        {
            const { classes } = this.props;

            return (
                <div>
                    <Typography variant="title">我的图文</Typography>
                    <TextField
                        id="search"
                        label="搜索图文"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                    />
                    <Button variant="raised" className={classes.searchButton}>
                        搜索
                    </Button>
                    <Link to="/cms/content/text/edit">
                    <Button variant="raised" color="primary" className={classes.createBtn}>
                        新建图文
                    </Button></Link>
        
                    <Typography className={classes.tableTitle} variant="subheading">图文列表</Typography>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>名称</TableCell>
                                    <TableCell numeric>付费类型</TableCell>
                                    <TableCell numeric>所属类别</TableCell>
                                    <TableCell numeric>上架时间</TableCell>
                                    <TableCell numeric>状态</TableCell>
                                    <TableCell numeric>操作</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            <TableCell>{n.name}</TableCell>
                                            <TableCell numeric>{n.calories}</TableCell>
                                            <TableCell numeric>{n.fat}</TableCell>
                                            <TableCell numeric>{n.carbs}</TableCell>
                                            <TableCell numeric>{n.protein}</TableCell>
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