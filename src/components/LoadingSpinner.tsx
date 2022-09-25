import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const LoadingSpinner = () => (
  <ActivityIndicator animating={true} color={"#3145f8"} />
);

export default LoadingSpinner;