// @ts-nocheck
import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const LoadingSpinner = ({size}) => (
  <ActivityIndicator animating={true} color={"#3145f8"} size={size} />
);

export default LoadingSpinner;