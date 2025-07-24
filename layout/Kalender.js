import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import styles from "../styles/stylesCustomCalendar"
import BottomBar from "../component/Bottombar";

const CustomCalendar = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);

  const daysOfWeek = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const toggleDate = (day) => {
    const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = fullDate.toDateString();

    if (selectedDates.includes(dateStr)) {
      setSelectedDates(selectedDates.filter((date) => date !== dateStr));
    } else {
      setSelectedDates([...selectedDates, dateStr]);
    }
  };

  const renderDays = () => {
    const days = [];
    const firstDayIndex = firstDayOfMonth.getDay();

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay}></View>);
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const isSelected = selectedDates.includes(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
      );
      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.day, isSelected && styles.selectedDay]}
          onPress={() => toggleDate(day)}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <ImageBackground
          source={require("../assets/3.png")}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
    <View style={styles.container1}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.navButton}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.month}>
          {currentDate.toLocaleString("id-ID", { month: "long", year: "numeric" })}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.navButton}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.dayOfWeek}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.daysContainer}>{renderDays()}</View>
    </View>
     <BottomBar navigation={navigation} styles={styles.BottomBar} />
    </View>
    </ImageBackground>
  );
};


export default CustomCalendar;
