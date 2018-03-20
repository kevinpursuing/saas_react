import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import Snackbar from 'material-ui/Snackbar';

import { getResInfo, handleChange, ossUpload, ceRes } from '../../../redux/res.redux'

const styles = theme => ({
    contentPaper: {
        width: '100%',
        height: 1000,
        boxSizing: 'border-box',
        padding: 20,
    },
    topPart: {
        width: '100%',
        height: 30,
        lineHeight: '30px',
    },
    content: {
        width: '100%',
        marginTop: 50
    },
    contentTitle: {
        float: 'left',
        width: '100%',
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftPart: {
        float: 'left',
        width: 3,
        height: 20,
        marginRight: 10,
        backgroundColor: theme.primary
    },
    mainContent: {
        marginLeft: 20
    },
    partTitle: {
        float: 'left',
        paddingTop: 24,
        marginRight: 50
    },
    partTitlePrice: {
        float: 'left',
        paddingTop: 26,
        marginRight: 50
    },
    contentInput: {
        float: 'left',
        width: '50%',
    },
    contentPart: {
        float: 'left',
        width: '100%',
        height: 70,
        marginBottom: 12
    },
    contentCover: {
        float: 'left',
        width: '100%',
        height: 160,
        marginBottom: 12
    },
    coverPart: {
        float: 'left',
        width: 200,
        height: 150,
        background: 'rgba(0, 0, 0, 0.24)'
    },
    coverImg: {
        width: 200,
        height: 150,
    },
    contentField: {
        float: 'left',
        width: '80%'
    },
    multyContent: {
        float: 'left',
        width: '100%',
        height: 'auto',
        marginBottom: 12
    },
    divideLine: {
        float: 'left',
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        height: 1,
        background: 'rgba(0, 0, 0, 0.24)'
    },
    resPrice: {
        marginLeft: 10
    },
    timeField: {
        marginTop: 17
    },
    resUploadBtn: {
        marginTop: 15
    },

})

@connect(
    state => state,
    { ossUpload, getResInfo, handleChange, ceRes }
)
class CreateAndEditContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            vertical: 'top',
            horizontal: 'center',
            msg: '',   //错误提示文字
            isEdit: false,  //是否是编辑页
        };
    }

    componentDidMount = () => {
        if (this.props.match.params.type !== 'create') {
            this.setState({ isEdit: true })
            console.log(this.props.match.params.type)
            console.log(this.props.SideBar.type)
            this.props.getResInfo(this.props.match.params.type, this.props.SideBar.type)
        }
    }


    getResType = (secondPart) => {
        switch (secondPart) {
            case 'text':
                return [1, '图文']
            case 'audio':
                return [2, '音频']
            case 'video':
                return [3, '视频']
            default:
                return null
        }
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    createRes = () => {
        let resType = this.getResType(this.props.SideBar.resWords)
        let params = this.props.res
        if (params.name === '') {
            this.setState({ open: true, msg: `请输入${resType}名称` });
            return
        }
        if (params.intro === '') {
            this.setState({ open: true, msg: `请输入${resType}名称` });
            return
        }
        if (params.cover === '') {
            this.setState({ open: true, msg: `请输入${resType}封面` });
            return
        }
        this.props.ceRes(this.props.res, this.props.SideBar.type, this.props.history, this.props.SideBar.secondPart)
    }

    render = () => {
        const { classes } = this.props
        // const { resType, name, cover, intro, textContent, audioSrc, videoSrc, saleType, price, saleTime } = this.state
        const { vertical, horizontal, open, msg } = this.state

        let resType = this.props.SideBar.resWords

        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{msg}</span>}
                />
                <Paper className={classes.contentPaper}>
                    <Typography className={classes.topPart}>内容管理  /   {this.state.isEdit ? '编辑' : '新增'}{resType}</Typography>
                    <Divider />
                    <div className={classes.content}>
                        <div className={classes.contentTitle}>
                            <div className={classes.leftPart} color='primary'></div>
                            <div className={classes.titleWords}>基本信息</div>
                        </div>
                        <div className={classes.mainContent}>
                            <div className={classes.contentPart}>
                                <Typography className={classes.partTitle}>{resType}名称</Typography>
                                <TextField
                                    id="name"
                                    className={classes.contentInput}
                                    value={this.props.res.name}
                                    onChange={v => this.props.handleChange('name', v)}
                                    margin="normal"
                                />
                            </div>
                            <div className={classes.contentCover}>
                                <Typography className={classes.partTitle}>{resType}封面</Typography>
                                <Typography color='textSecondary'>750*422像素或16:9，支持PNG、JPG、GIF格式，小于5M</Typography>
                                <Paper className={classes.coverPart}>
                                    {this.props.res.cover === '' ? null : <img className='coverImg' width='200' height="150" src={this.props.res.cover} alt='pic' />}
                                </Paper>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={v => this.props.ossUpload(v.target.files[0], 1)}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="raised" component="span" className={classes.button}>
                                        Upload
                                   </Button>
                                </label>
                            </div>
                            <div className={classes.contentIntro}>
                                <Typography className={classes.partTitle}>{resType}简介</Typography>
                                <TextField
                                    id="name"
                                    className={classes.contentInput}
                                    value={this.props.res.intro}
                                    onChange={v => this.props.handleChange('intro', v)}
                                    margin="normal"
                                />
                            </div>
                            {this.props.SideBar.type === 1 ? null : <div className={classes.contentPart}>
                                <Typography className={classes.partTitle}>{resType}上传</Typography>
                                <input
                                    accept={this.props.SideBar.type === 2 ? "audio/*" : "video/*"}
                                    className={classes.input}
                                    id="reource"
                                    multiple
                                    type="file"
                                    onChange={v => this.props.ossUpload(v.target.files[0], this.props.SideBar.type)}
                                />
                                <label htmlFor="reource">
                                    <Button variant="raised" component="span" className={classes.resUploadBtn}>
                                        上传{resType}资源
                               </Button>
                                </label>
                            </div>}

                            <div className={classes.multyContent}>
                                <Typography className={classes.partTitle}>{resType}内容</Typography>
                                <div >
                                    <TextField
                                        id="multiline-flexible"
                                        multiline
                                        rowsMax="100"
                                        value={this.props.res.textContent}
                                        onChange={v => this.props.handleChange('textContent', v)}
                                        className={classes.contentField}
                                        margin="normal"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.divideLine}></div>
                        <div className={classes.contentTitle}>
                            <div className={classes.leftPart} color='primary'></div>
                            <div className={classes.titleWords}>上架信息</div>
                        </div>

                        <div className={classes.multyContent}>
                            <div className={classes.mainContent}>
                                <Typography className={classes.partTitlePrice}>收费形式</Typography>
                                <div >
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="age-helper">请选择收费形式</InputLabel>
                                        <Select
                                            value={1}
                                            onChange={v => this.props.handleChange('saleType', v)}

                                        >
                                            <MenuItem value={0}>
                                                <em>免费</em>
                                            </MenuItem>
                                            <MenuItem value={1}>单卖</MenuItem>
                                        </Select>
                                        <FormHelperText>Some important helper text</FormHelperText>

                                    </FormControl>
                                    <TextField
                                        id="price"
                                        disabled={!this.props.res.saleType}
                                        type="number"
                                        value={this.props.res.price}
                                        onChange={v => this.props.handleChange('price', v)}
                                        className={classes.resPrice}
                                        margin="normal"
                                    />
                                </div>
                                <div className={classes.contentPart}>
                                    <Typography className={classes.partTitle}>上架时间</Typography>
                                    <TextField
                                        id="datetime-local"
                                        type="datetime-local"
                                        value={this.props.res.saleTime}
                                        onChange={v => this.props.handleChange('saleTime', v)}
                                        className={classes.timeField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className={classes.divideLine}></div>
                                <Button onClick={this.createRes} variant="raised" size="large" color="primary" className={classes.button}>
                                    {this.state.isEdit ? '保存' : '创建'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>

            </div >
        );
    }
}

CreateAndEditContent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(CreateAndEditContent);