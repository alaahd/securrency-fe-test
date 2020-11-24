import React from 'react';
import Loader from 'react-loader-spinner';

interface ILinearLoaderProps {
  color?: 'white' | 'black' | 'gray' | string;
  size?: 'compact' | 'small' | 'medium' | 'large';
  timeout?: number;
}

const defaultProps = {
  color: 'white',
  size: 'large',
};

const sizeToWidthHeigh = (size: ILinearLoaderProps['size']) => {
  switch (size) {
    case 'compact':
      return { height: 10, width: 40 };
    case 'small':
      return { height: 40, width: 40 };
    case 'medium':
      return { height: 50, width: 50 };
    case 'large':
      return { height: 60, width: 60 };
    default:
      return { height: 80, width: 80 };
  }
};

const colorToHexaMap = (color: ILinearLoaderProps['color']) =>
  color === 'gray' ? '#c3c4cd' : color;

const LinearLoader = (props: ILinearLoaderProps) => {
  return (
    <Loader
      type="ThreeDots"
      color={colorToHexaMap(props.color)}
      timeout={props.timeout}
      {...sizeToWidthHeigh(props.size)}
    />
  );
};

LinearLoader.defaultProps = defaultProps;

export default LinearLoader;
