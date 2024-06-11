import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Modal, Image } from 'react-native';
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

const getSeasonBackground = (month) => {
  switch (month) {
    case 12:
    case 1:
    case 2:
      return require('../../assets/android.png'); // Update with correct path
    case 3:
    case 4:
    case 5:
      return require('../../assets/android.png'); // Update with correct path
    case 6:
    case 7:
    case 8:
      return require('../../assets/android.png'); // Update with correct path
    case 9:
    case 10:
    case 11:
      return require('../../assets/android.png'); // Update with correct path
    default:
      return null;
  }
};

const MonthPath = ({ tasks, month, year, days, isVisible, highlightDay }) => {
  const positions = Array.from({ length: days }, (_, index) => {
    const y = index * verticalSpacing;
    const x = width / 2 + amplitude * Math.sin(frequency * index * Math.PI);
    return [x, y];
  });

  const path = generatePath(positions);
  const backgroundImage = getSeasonBackground(month);

  const [modalVisible, setModalVisible] = useState(false);
  const [pickedDay, setPickedDay] = useState(0);

  const upgradeModalVisible = (newState) => {
    setModalVisible(newState);
  };

  return (
    <View style={styles.container}>
      {isVisible && (
        <>
          <View style={styles.backgroundContainer}>
            {Array.from({ length: Math.ceil((days * verticalSpacing) / 800) }).map((_, i) => (
              <Image key={i} source={backgroundImage} style={styles.backgroundImage} />
            ))}
          </View>
          <Svg height={days * verticalSpacing} width={width}>
            <Path d={path} stroke="black" strokeWidth={2} fill="none" strokeDasharray="4, 4" />
          </Svg>
          {positions.map(([x, y], index) => {
            const isHighlighted = highlightDay === index + 1;
            return (
              <Pressable
                key={index}
                style={[styles.dayItem, { top: y - 30, left: x - 30 }]}
                onPress={() => { setModalVisible(true); setPickedDay(index + 1); }}>
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
            );
          })}
        </>
      )}
      {modalVisible && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <DayModal tasks={tasks} date={new Date(`${year}-${month}-${pickedDay}`)} modalVisible={modalVisible} setModalVisible={upgradeModalVisible} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 20,
    height: '100%',
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: 800,
    resizeMode: 'contain',
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
