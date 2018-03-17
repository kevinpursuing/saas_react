import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import Input, { InputLabel } from 'material-ui/Input';

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
        paddingTop: 39,
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
        marginTop: 31
    },
    resUploadBtn: {
        marginTop: 30
    }

})

class CreateAndEditContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 0,   //资源类型
            name: '',  //资源名称
            inTro: '',  //资源简介
            cover: '',  //资源封面
            textContent: '',  //图文内容
            saleType: 0,  //售卖类型
            audioSrc: '',  //音频资源地址
            videoSrc: '',  //视频资源地址
            price: 0,  //资源价格
            saleTime: '',   //上架时间
        };
    }

    handleChange = (key, val) => {
        console.log(this.state)
        this.setState({
            [key]: val.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.contentPaper}>
                    <Typography className={classes.topPart}>内容管理  /   新增图文</Typography>
                    <Divider />
                    <div className={classes.content}>
                        <div className={classes.contentTitle}>
                            <div className={classes.leftPart} color='primary'></div>
                            <div className={classes.titleWords}>基本信息</div>
                        </div>
                        <div className={classes.mainContent}>
                            <div className={classes.contentPart}>
                                <Typography className={classes.partTitle}>图文名称</Typography>
                                <TextField
                                    id="name"
                                    label="请输入图文名称"
                                    className={classes.contentInput}
                                    onChange={v => this.handleChange('name', v)}
                                    margin="normal"
                                />
                            </div>
                            <div className={classes.contentCover}>
                                <Typography className={classes.partTitle}>图文封面</Typography>
                                <Typography color='textSecondary'>750*422像素或16:9，支持PNG、JPG、GIF格式，小于5M</Typography>
                                <div className={classes.coverPart}></div>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={v => this.handleChange('cover', v)}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="raised" component="span" className={classes.button}>
                                        Upload
                                   </Button>
                                </label>
                            </div>
                            <div className={classes.contentIntro}>
                                <Typography className={classes.partTitle}>图文简介</Typography>
                                <TextField
                                    id="name"
                                    label="请输入图文简介"
                                    className={classes.contentInput}
                                    value=''
                                    onChange={v => this.handleChange('inTro', v)}
                                    margin="normal"
                                />
                            </div>
                            <div className={classes.contentPart}>
                                <Typography className={classes.partTitle}>资源上传</Typography>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={v => this.handleChange('cover', v)}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="raised" component="span" className={classes.resUploadBtn}>
                                        上传资源
                               </Button>
                                </label>
                            </div>
                            <div className={classes.multyContent}>
                                <Typography className={classes.partTitle}>图文内容</Typography>
                                <div >
                                    <TextField
                                        id="multiline-flexible"
                                        label="多行书写"
                                        multiline
                                        rowsMax="100"
                                        onChange={v => this.handleChange('textContent', v)}
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
                                            value={this.state.age}
                                            onChange={v => this.handleChange('saleType', v)}
                                            input={<Input name="age" id="age-helper" />}
                                            value={0}
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
                                        label="请输入图文价格"
                                        onChange={v => this.handleChange('price', v)}
                                        className={classes.resPrice}
                                        margin="normal"
                                    />
                                </div>
                                <div className={classes.contentPart}>
                                    <Typography className={classes.partTitle}>上架时间</Typography>
                                    <TextField
                                        id="datetime-local"
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        onChange={v => this.handleChange('saleTime', v)}
                                        className={classes.timeField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className={classes.divideLine}></div>
                                <Button variant="raised" size="large" color="primary" className={classes.button}>
                                    创建
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