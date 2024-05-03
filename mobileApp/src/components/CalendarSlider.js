import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

export default function CalendarSlider() {
  const swiper = useRef(); // useRef() ??
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  const weeks = React.useMemo(() => { // useMemo() ?? =))((
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
      <View style = {styles.container}>

        <View style = {styles.picker}>
          <Swiper // date picker
            index = {1}
            ref = {swiper}
            loop = {false}
            showsPagination = {false}
            onIndexChanged = {ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View
                style = {[styles.itemRow, { paddingHorizontal: 16 }]}
                key = {index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key = {dateIndex}
                      onPress = {() => setValue(item.date)}>
                      <View // day group view
                        style = {[
                          styles.item,
                          isActive && styles.activeDay,
                        ]}>
                          <Text style = {styles.itemWeekday}>
                            {item.weekday} 
                          </Text>
                          <View style = {styles.dateWrapper}>
                            <Text style = {styles.itemDate}>
                              {item.date.getDate()}
                            </Text>
                          </View>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>

        <View style = {{ flex: 1, paddingHorizontal: 16, paddingVertical: 10 }}>
          <Text style = {styles.subtitle}>{value.toDateString()}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
  },
  header: {
    paddingHorizontal: 16,
  },
  picker: {
    flex: 1,
    maxHeight: 100,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // the date subtitle
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  // Item
  item: {
    flex: 1,
    height: 70,
    marginHorizontal: 2,
    paddingTop: 4,
    borderRadius: 8,
    backgroundColor: '#fffBBB',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
  },
  dateWrapper: {
    flex: 1,
    width: '100%',    
    backgroundColor: '#D6DAC8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDay: {
    borderColor: '#9CAFAA',
    borderWidth: 5,
  },
});
