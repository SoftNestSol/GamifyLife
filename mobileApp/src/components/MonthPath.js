// src/components/MonthPath.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const amplitude = 100;
const frequency = 0.05;
const verticalSpacing = 80;

const generatePath = (positions) => {
  return positions.map((pos, index) => {
    const [x, y] = pos;
    return index === 0 ? `M${x},${y}` : `L${x},${y}`;
  }).join(' ');
};

const MonthPath = ({ month, year, days, isVisible }) => {
  const positions = Array.from({ length: days }, (_, index) => {
    const y = index * verticalSpacing;
    const x = width / 2 + amplitude * Math.sin(frequency * index * Math.PI);
    return [x, y];
  });

  const path = generatePath(positions);

  return (
    <View style={styles.container}>
      {isVisible && (
        <>
          <Svg height={days * verticalSpacing} width={width}>
            <Path d={path} stroke="white" strokeWidth={2} fill="none" />
          </Svg>
          {positions.map(([x, y], index) => (
            <View key={index} style={[styles.dayItem, { top: y, left: x }]}>
              <Text style={styles.dayText}>{index + 1}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dayItem: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#282c34',
  },
});

export default MonthPath;
