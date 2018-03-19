import React from 'react';
import Button from 'material-ui/Button';
import QRCode from 'qrcode.react';

class cmsIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }



    render() {

        return (
            <div>
                <Button variant="raised" size="large" color="primary">
                    扫描二维码进入店铺
                </Button>
                <QRCode value="http://facebook.github.io/react/" />
            </div>
        );
    }
}


export default cmsIndex;