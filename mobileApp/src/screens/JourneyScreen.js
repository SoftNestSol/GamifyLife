// src/screens/JourneyScreen.js

import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native';
import MonthPath from '../components/MonthPath';

const months = [
  { month: 1, year: 2024, days: 31 },
  { month: 2, year: 2024, days: 29 },
  { month: 3, year: 2024, days: 31 },
  { month: 4, year: 2024, days: 30 },
  { month: 5, year: 2024, days: 31 },
  { month: 6, year: 2024, days: 30 },
  { month: 7, year: 2024, days: 31 },
  { month: 8, year: 2024, days: 31 },
  { month: 9, year: 2024, days: 30 },
  { month: 10, year: 2024, days: 31 },
  { month: 11, year: 2024, days: 30 },
  { month: 12, year: 2024, days: 31 },
];

const JourneyScreen = () => {
  const [visibleMonths, setVisibleMonths] = useState([]);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const viewportHeight = event.nativeEvent.layoutMeasurement.height;
    const newVisibleMonths = months.map((monthData, index) => {
      const startY = index * (monthData.days * 80); // height of one month
      const endY = startY + monthData.days * 80;
      return scrollY + viewportHeight >= startY && scrollY <= endY;
    });
    setVisibleMonths(newVisibleMonths);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
        {months.map((monthData, index) => (
          <View key={index} style={{ height: monthData.days * 80 }}>
            <MonthPath {...monthData} isVisible={visibleMonths[index]} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  },
  scrollView: {
    paddingBottom: 100,
  },
});

export default JourneyScreen;
