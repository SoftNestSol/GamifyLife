import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import MonthPath from '../components/MonthPath';

const months = [
  { month: 1, year: 2024, days: 31, name: "January" },
  { month: 2, year: 2024, days: 29, name: "February" },
  { month: 3, year: 2024, days: 31, name: "March" },
  { month: 4, year: 2024, days: 30, name: "April" },
  { month: 5, year: 2024, days: 31, name: "May" },
  { month: 6, year: 2024, days: 30, name: "June" },
  { month: 7, year: 2024, days: 31, name: "July" },
  { month: 8, year: 2024, days: 31, name: "August" },
  { month: 9, year: 2024, days: 30, name: "September" },
  { month: 10, year: 2024, days: 31, name: "October" },
  { month: 11, year: 2024, days: 30, name: "November" },
  { month: 12, year: 2024, days: 31, name: "December" },
];

const JourneyScreen = () => {
  const [visibleMonths, setVisibleMonths] = useState([true, ...Array(months.length - 1).fill(false)]);
  const scrollViewRef = useRef(null);

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

  const today = new Date();
  const currentMonth = today.getMonth() + 1; // getMonth() returns 0-based month
  const currentDay = today.getDate();

  useEffect(() => {
    console.log(`Today is: ${currentMonth}/${currentDay}`);
    const currentMonthIndex = months.findIndex(month => month.month === currentMonth);
    if (currentMonthIndex !== -1) {
      const scrollToY = currentMonthIndex * (months[currentMonthIndex].days * 80) + ((currentDay - 1) * 80);
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: scrollToY, animated: true });
      }, 100); // slight delay to ensure the scrollView is rendered before scrolling
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Journey Path</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {months.map((monthData, index) => (
          <View key={index} style={{ height: monthData.days * 80 }}>
            <View style={styles.carouselContainer}>
              <Text style={styles.monthName}>Start of {monthData.name}</Text>
            </View>
            <MonthPath 
              {...monthData} 
              isVisible={visibleMonths[index]} 
              highlightDay={monthData.month === currentMonth ? currentDay : null}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#FCF4E7"
  },
  titleContainer: {
    marginVertical: 5,
    marginHorizontal: 20,
    paddingBottom: 25,
    borderColor: "black",
    borderStyle: "dashed",
    borderBottomWidth: 1,
  },
  monthName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    height: 50,
  },
  title: {
    padding: 10,
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "center",
  },
  scrollView: {
    paddingBottom: 100,
  },
  carouselContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JourneyScreen;
