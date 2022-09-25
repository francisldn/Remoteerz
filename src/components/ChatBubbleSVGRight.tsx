import { StyleSheet } from 'react-native'
import React from 'react'
import {Svg, Path} from 'react-native-svg'
import {moderateScale} from 'react-native-size-matters';

export default function ChatBubbleSVGLeft() {
  return (
    <>
      <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="34 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
          <Path
              d="M48,35c-7-4-6-8.75-10-17.5C28,17.5,29,35,48,35z"
              fill="#36a411"
              x="0"
              y="0"
          />
        </Svg>
    </>
  )
}

const styles=StyleSheet.create({
    arrowRight: {
      right:moderateScale(-6, 5),
    },
})