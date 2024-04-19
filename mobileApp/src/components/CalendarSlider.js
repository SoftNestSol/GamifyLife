import React, { useState, useRef } from "react";
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Text,
	Dimensions
} from "react-native";
import moment from "moment";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

export default function CalendarSlider() {
	const swiper = useRef(); // reference - nice for storing, if it changes it doesn't trigger a re-render
	const [day, setDay] = useState(new Date()); // selected day
	const [week, setWeek] = useState(0); // how many weeks away am i from the actual week

  // returns an array of array of objects - adjacent weeks with their days
	const weeks = React.useMemo(() => {
		// useMemo() caches the result between re-renders
    // get the first day of the current week
		const start = moment().add(week, "weeks").startOf("week");

		return [-1, 0, 1].map((adj) => {
      // build each array
			return Array.from({ length: 7 }).map((_, index) => {
				const date = moment(start).add(adj, "week").add(index, "day");

				return {
					weekday: date.format("ddd"),
					date: date.toDate()
				};
			});
		});
	}, [week]); // array of dependencies

  const handleIndexChanged = (ind) => {
    if (ind === 1) {
      return;
    }

    setTimeout(() => {
      const newIndex = ind - 1;
      const newWeek = week + newIndex;
      setWeek(newWeek);
      // add / substract a week from the selected date
      setDay(moment(day).add(newIndex, "week").toDate()); 
    }, 10);
    
    // always keep the current week on the index 1
    // bigger timeout to make sure it uses the updated values of day and week
    setTimeout(() => {
      swiper.current.scrollTo(1, false); 
    }, 50); 
  };

  
	return (
		<View style={styles.container}>
			<View style={styles.picker}>
				<Swiper // date picker
					index={1}
					ref={swiper}
					loop={false}
					showsPagination={false}
					onIndexChanged={handleIndexChanged}
				>
					{weeks.map((dates, index) => (
						<View // a week
							style={[styles.itemRow, { paddingHorizontal: 16 }]}
							key={index}
						>
							{dates.map((item, dateIndex) => {
								const isActive =
									day.toDateString() === item.date.toDateString();
								return (
									<TouchableWithoutFeedback
										key = {dateIndex}
										// we update the selected date when we click it
										onPress = {() => setDay(item.date)} 
									>
										
										<View style = {[{flex: 1, height: 70,}, isActive && styles.wrapperActive]}>
											<View style = {isActive && styles.selectedBorder}/>
											<View style={[styles.item, isActive && styles.activeDay]}>				
												<Text style={styles.itemWeekday}>{item.weekday}</Text>
												<View style={styles.dateWrapper}>
													<Text style={styles.itemDate}>
														{item.date.getDate()}
													</Text>
												</View>
											</View>
										</View>
									</TouchableWithoutFeedback>
								);
							})}
						</View>
					))}
				</Swiper>
			</View>
			{/* the small heading showing the selected date
			<View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 10 }}>
				 <Text style={styles.subtitle}> {day.toDateString()} </Text> 
			</View>*/}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 5
	},
	picker: {
		flex: 1,
		maxHeight: 120,
		paddingVertical: 12,
		flexDirection: "row",
		alignItems: "center"
	},
	// the date subtitle
	subtitle: {
		fontSize: 14,
		fontWeight: "600",
		color: "#999999",
		marginBottom: 12
	},
	itemRow: {
		width: width,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginHorizontal: -4,
		marginTop: 5,
	},
	item: {
		flex: 1,
		height: 70,
		marginHorizontal: 2,
		paddingTop: 4,
		borderRadius: 8,
		backgroundColor: "#E49773",
		flexDirection: "column",
		alignItems: "center"
	},
	itemWeekday: {
		fontSize: 13,
		fontWeight: "500"
	},
	itemDate: {
		fontSize: 15,
		fontWeight: "600"
	},
	dateWrapper: {
		flex: 1,
		width: "100%",
		backgroundColor: "#cedefe",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center"
	},
	wrapperActive: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 5,
	},
	activeDay: {
		position: "absolute",
		hieght: "100%",
		width: "100%",
	},
	selectedBorder: {
		flex: 1, 
		height: 80,
		flexBasis: 55, //width
		borderStyle: "dashed",
		borderColor: "black",
		borderWidth: 1, 
		borderRadius: 8,
	},
});