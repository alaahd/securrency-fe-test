import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIconSmall = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const antIconMedium = <LoadingOutlined style={{ fontSize: 48 }} spin />;
const antIconLarge = <LoadingOutlined style={{ fontSize: 128 }} spin />;

const Spinner = ({ size = 'small' }) => {
  if (size === 'small') {
    return <Spin indicator={antIconSmall} />;
  } else if (size === 'medium') {
    return <Spin indicator={antIconMedium} />;
  } else if (size === 'large') {
    return <Spin indicator={antIconLarge} />;
  }
  return null;
};

export default Spinner;
