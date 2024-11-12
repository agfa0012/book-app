import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BookCard({ name, author }) {
  return (
    <View style={styles.card}>
      <Text style={styles.bookName}>{name}</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  bookName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "#555",
  },
});
