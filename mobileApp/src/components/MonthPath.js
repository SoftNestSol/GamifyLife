import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Modal, ImageBackground } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import DayModal from './DayModal.js';

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

const MonthPath = ({ tasks, month, year, days, isVisible, highlightDay, backgroundImage }) => {
  const positions = Array.from({ length: days }, (_, index) => {
    const y = index * verticalSpacing;
    const x = width / 2 + amplitude * Math.sin(frequency * index * Math.PI);
    return [x, y];
  });

  const path = generatePath(positions);
  // for each day control the visibilty of the details
  const [modalVisible, setModalVisible] = useState(false);
  const [pickedDay, setPickedDay] = useState(0); // the day for which we activate the modal
  
  // function to send to the Modal content so that it can control it's visibility 
  const upgradeModalVisible = (newState) => {
    setModalVisible(newState);
  };

  return (
    <View style={styles.container}>
      {isVisible && (
        <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
          <Svg height={days * verticalSpacing} width={width}>
            <Path d={path} stroke="black" strokeWidth={2} fill="none" strokeDasharray="4, 4" />
          </Svg>
          {positions.map(([x, y], index) => {
            const isHighlighted = highlightDay === index + 1;
            return (
              <>
                {/* when pressing on any day a modal should pop up with details for the day */}
                <Modal
                  animationType='fade'
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    console.log('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <DayModal tasks={tasks} date={new Date(`${year}-${month}-${pickedDay}`)} modalVisible={modalVisible} setModalVisible={upgradeModalVisible}/> 
                </Modal>
                
                <Pressable 
                  key={index} 
                  style={[styles.dayItem, { top: y - 30, left: x - 30 }]}
                  // set picked dat and activate the modal
                  onPress={() => {setModalVisible(true); setPickedDay(index + 1);}}>
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
                </Pressable>
              </>
            );
          })}
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  dayItem: {
    position: 'absolute',
    width: 60,
    height: 60,
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
    borderRadius: 30,
  },
  highlightCircle: {
    position: 'absolute',
    top: -14,
    left: -14,
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#87CEEB',
    borderStyle: 'dotted',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    position: 'absolute',
    top: -40,
    left: 70,
    backgroundColor: '#87CEEB',
    color: '#fff',
    padding: 5,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
    zIndex: 1,
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#e49773',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  highlightedCircle: {
    backgroundColor: '#87CEEB',
  },
  dayText: {
    fontSize: 16,
    color: '#282c34',
  },
  highlightedDayText: {
    color: '#fff',
  },
});

export default MonthPath;
