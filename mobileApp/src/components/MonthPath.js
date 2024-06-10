import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const amplitude = 80;
const frequency = 0.22; 
const verticalSpacing = 79;

const generatePath = (positions) => {
  return positions.map((pos, index) => {
    const [x, y] = pos;
    return index === 0 ? `M${x},${y}` : `L${x},${y}`;
  }).join(' ');
};

const MonthPath = ({ month, year, days, isVisible, highlightDay }) => {
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
            <Path d={path} stroke="black" strokeWidth={2} fill="none" strokeDasharray="4, 4" />
          </Svg>
          {positions.map(([x, y], index) => {
            const isHighlighted = highlightDay === index + 1;
            return (
              <View key={index} style={[styles.dayItem, { top: y - 35, left: x - 35 }]}>
                {isHighlighted && (
                  <>
                    <View style={styles.highlightCircle}></View>
                    <Text style={styles.indicatorText}>You are here</Text>
                  </>
                )}
                <View style={[styles.shadow, isHighlighted && styles.highlightedShadow]}></View>
                <View style={[styles.circle, isHighlighted && styles.highlightedCircle]}>
                  <Text style={[styles.dayText, isHighlighted && styles.highlightedDayText]}>{index + 1}</Text>
                </View>
              </View>
            );
          })}
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
    width: 60, // Increased size for highlighting
    height: 60, // Increased size for highlighting
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 30, // Half of the width and height for a perfect circle
  },
  highlightCircle: {
    position: 'absolute',
    top: -14,
    left: -14,
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#87CEEB', // Light blue color
    borderStyle: 'dotted',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    position: 'absolute',
    top:-10, // Adjust this value to position the text above the circle
    left: -90, // Adjust this value to position the text horizontally
    backgroundColor: '#87CEEB', // Match the highlight color
    color: '#fff', // White text color
    padding: 5,
    borderRadius: 10,
    fontSize: 12,
    width:80,
    
    fontWeight: 'bold',
    zIndex: 1, // Ensure the text is on top
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 30, // Half of the width and height for a perfect circle
    backgroundColor: '#e49773', // Orange color
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  highlightedCircle: {
    backgroundColor: '#87CEEB', // Light blue color for highlighting
  },
  dayText: {
    fontSize: 16,
    color: '#282c34',
  },
  highlightedDayText: {
    color: '#fff', // White color for highlighted text
  },
});

export default MonthPath;
