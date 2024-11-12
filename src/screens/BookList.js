import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Svg, Circle, Rect } from "react-native-svg"; // For background vectors
import globalStyles from "../styles/globalStyles";

export default function BooksList({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const booksCollection = collection(db, "books");

    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const booksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookCard}
            onPress={() =>
              navigation.navigate("BookDetail", { bookId: item.id })
            }
          >
            <ImageBackground
              source={item.coverPage ? { uri: item.coverPage } : null}
              style={styles.bookImage}
              imageStyle={styles.imageStyle}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.6)", "transparent"]}
                style={styles.gradientOverlay}
              />
              <Svg height="100%" width="100%" style={styles.vectorBackground}>
                <Circle cx="30%" cy="10%" r="50" fill="rgba(255, 255, 255, 0.3)" />
                <Rect x="60%" y="70%" width="100" height="100" fill="rgba(255, 255, 255, 0.2)" />
              </Svg>
              <View style={styles.overlay}>
                <Text style={styles.bookName}>{item.name}</Text>
                <Text style={styles.author}>by {item.author}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
    paddingTop: 20,
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  bookCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal: 8,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  bookImage: {
    width: "100%",
    height: 240,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 20,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "60%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  vectorBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bookName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  author: {
    fontSize: 16,
    color: "#B0E5FF",
    marginTop: 6,
  },
});
