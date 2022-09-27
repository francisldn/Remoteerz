import React from 'react';
import { ImageBackground, View } from 'react-native';

const animationURL = "https://www.dropbox.com/s/pkeboqg8o8x64zx/28141-sate-traveling.gif?dl=0"
export default function FrontAnimation() {
  return (
      <ImageBackground source={require('./animation.gif')} style={{width:220, height:220}} />
    
  );
}