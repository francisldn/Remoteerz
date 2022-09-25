import { StyleSheet } from 'react-native'
import React from 'react'
import {Svg, Path} from 'react-native-svg'
import {moderateScale} from 'react-native-size-matters';

export default function ChatBubbleSVGLeft() {
  return (
    <>
      <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
            <Path
                d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                fill="grey"
                x="0"
                y="0"
            />
        </Svg>
    </>
  )
}

const styles=StyleSheet.create({
    arrowLeft: {
        left: moderateScale(-6, 0.5),
    }
})