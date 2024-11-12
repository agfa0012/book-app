import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

export default function Borrowed() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const borrowedBooksCollection = collection(db, "borrowedBooks");
    const unsubscribe = onSnapshot(borrowedBooksCollection, (snapshot) => {
      const booksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBorrowedBooks(booksList);
    });

    return () => unsubscribe();
  }, []);

  const handleReturnBook = async (originalBookId) => {
    try {
      const borrowedBooksCollection = collection(db, "borrowedBooks");
      const q = query(
        borrowedBooksCollection,
        where("id", "==", originalBookId)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log("No matching document found in borrowedBooks!");
        Alert.alert("Error", "The borrowed book record does not exist.");
        return;
      }

      const borrowedBookDocId = snapshot.docs[0].id;
      await deleteDoc(doc(db, "borrowedBooks", borrowedBookDocId));
      console.log("Deleted from borrowedBooks collection");

      const bookRef = doc(db, "books", originalBookId);
      await updateDoc(bookRef, { isBorrowed: false });
      console.log("Updated isBorrowed flag in books collection");

      Alert.alert("Success", "Book returned successfully!");
    } catch (error) {
      console.error("Error returning book:", error);
      Alert.alert("Error", "An error occurred while returning the book.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri:
            "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        {borrowedBooks.length === 0 ? (
          <Text style={styles.emptyText}>
            You haven't borrowed any books yet.
          </Text>
        ) : (
          <FlatList
            data={borrowedBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.bookCard}>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookName}>{item.name}</Text>
                  <Text style={styles.author}>by {item.author}</Text>
                </View>
                <TouchableOpacity
                  style={styles.returnButton}
                  onPress={() => handleReturnBook(item.id)}
                >
                  <Ionicons name="return-down-back" size={20} color="#FFF" />
                  <Text style={styles.returnButtonText}>Return</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  emptyText: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 50,
    fontStyle: "italic",
  },
  listContent: {
    paddingBottom: 20,
  },
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    transform: [{ rotate: "-1deg" }], // Slight tilt for a funky look
  },
  bookInfo: {
    flex: 1,
  },
  bookName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4E4E4E",
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#888888",
    fontStyle: "italic",
  },
  returnButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B6B",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    transform: [{ scale: 1.1 }],
  },
  returnButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
});
