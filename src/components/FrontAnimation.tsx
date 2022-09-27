import React from 'react';
import { ImageBackground, View } from 'react-native';

const animationURL = "../../assets/animation.gif"
export default function FrontAnimation() {
  return (
      <ImageBackground source={require(animationURL)} style={{width:220, height:220}} />
    
  );
}