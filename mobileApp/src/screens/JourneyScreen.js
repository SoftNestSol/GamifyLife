import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import MonthPath from '../components/MonthPath';
import { useTasksContext } from "../contexts/tasks.context";

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
    const buffer = 600; // Buffer area in pixels to add above and below the viewport
    const newVisibleMonths = months.map((monthData, index) => {
      const startY = index * (monthData.days * 80);
      const endY = startY + monthData.days * 80;
      return (scrollY + viewportHeight + buffer > startY) && (scrollY - buffer < endY);
    });
    setVisibleMonths(newVisibleMonths);
  };

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const [allTasks, setAllTasks] = useState([]);

  const { getAllUserTasks } = useTasksContext();

  // prepare the data so that you can send it to Month Path, which in turn sends it to 
  // each pop up
  useEffect(() => {
      getAllUserTasks().then((data) => {
        setAllTasks(data);
      })
  }, []);

  useEffect(() => {
    const currentMonthIndex = months.findIndex(month => month.month === currentMonth);
    if (currentMonthIndex !== -1) {
      const scrollToY = currentMonthIndex * (months[currentMonthIndex].days * 80) + ((currentDay - 1) * 80);
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: scrollToY, animated: true });
      }, 100);
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
          <View key={index} style={{ paddingTop: index === 0 ? 20 : 0, height: monthData.days * 80, marginBottom: 40 }}>
            <View style={styles.carouselContainer}>
              <Text style={styles.monthName}>The start of {monthData.name}</Text>
            </View>
             <MonthPath 
                  {...monthData}
                  tasks={allTasks} 
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
