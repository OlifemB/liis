import React from 'react';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';


const Spinner = () => {
    return (
        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
    );
};

export default Spinner;