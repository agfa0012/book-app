import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import globalStyles from "../styles/globalStyles";

export default function BookDetail({ route }) {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);

  const fetchBook = async () => {
    try {
      const bookRef = doc(db, "books", bookId);
      const bookSnap = await getDoc(bookRef);

      if (bookSnap.exists()) {
        setBook({ id: bookSnap.id, ...bookSnap.data() });
      } else {
        Alert.alert("Error", "Book details not found.");
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(
    useCallback(() => {
      fetchBook();
    }, [bookId])
  );

  const handleBorrow = async () => {
    try {
      const borrowedBooksCollection = collection(db, "borrowedBooks");
      const snapshot = await getDocs(borrowedBooksCollection);

      if (snapshot.size >= 3) {
        Alert.alert("Limit Reached", "You can't borrow more than 3 books.");
        return;
      }

      await addDoc(borrowedBooksCollection, {
        id: book.id,
        name: book.name,
        author: book.author,
        coverPage: book.coverPage,
        rating: book.rating,
        summary: book.summary,
        borrowedAt: new Date(),
      });

      const bookRef = doc(db, "books", book.id);
      await updateDoc(bookRef, { isBorrowed: true });

      setBook((prevBook) => ({ ...prevBook, isBorrowed: true }));

      Alert.alert("Success", "Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing book:", error);
      Alert.alert("Error", "An error occurred while borrowing the book.");
    }
  };

  if (!book) {
    return (
      <View style={[globalStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#E0F7FA", "#F1F8E9"]}
        style={styles.gradientBackground}
      >
        <View style={styles.card}>
          <Image source={{ uri: book.coverPage }} style={styles.coverImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.bookName}>{book.name}</Text>
            <Text style={styles.author}>by {book.author}</Text>
            <Text style={styles.rating}>⭐ {book.rating}</Text>
          </View>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{book.summary}</Text>
          <Text
            style={[
              styles.status,
              { color: book.isBorrowed ? "#FF5C5C" : "#4CAF50" },
            ]}
          >
            {book.isBorrowed ? "Currently Borrowed" : "Available"}
          </Text>
          {!book.isBorrowed && (
            <TouchableOpacity style={styles.borrowButton} onPress={handleBorrow}>
              <LinearGradient
                colors={["#4CAF50", "#388E3C"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.borrowButtonText}>Borrow this Book</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBackground: {
    flex: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  coverImage: {
    width: "100%",
    height: 280,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  bookName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  rating: {
    fontSize: 16,
    color: "#FFC107",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginVertical: 12,
  },
  summary: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    textAlign: "justify",
  },
  status: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  borrowButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 20,
    elevation: 2,
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: "center",
  },
  borrowButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
