import React from "react";
import { View, Text, Image, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { db } from "../database/firebaseConfig";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;

  const borrowBook = async () => {
    try {
      const borrowedRef = collection(db, "borrowedBooks");
      const borrowedSnapshot = await getDocs(query(borrowedRef));
      const borrowedCount = borrowedSnapshot.size;

      if (borrowedCount >= 3) {
        Alert.alert("Limit Reached", "You cannot borrow more than 3 books at a time.");
        return;
      }
      const borrowedBooks = borrowedSnapshot.docs.map(doc => doc.data());
      const borrowedBook = borrowedBooks.find(b => b.bookId === book.id);
      if (borrowedBook) {
        
        Alert.alert("Already Borrowed", "This book has already been borrowed.");
        return;
      }
      await addDoc(borrowedRef, {
        bookId: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        borrowedDate: new Date(),
        dueDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
        coverImage: book.coverImage,
      });

      Alert.alert("Success", "Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  return (
    
    <View style={styles.container}>
      
      <Text style={styles.title}>{book.title}</Text>
      <Image source={{ uri: book.coverImage + "-L.jpg" }} style={styles.bookImage} />
      <Text style={styles.author}>By {book.author}</Text>
      <Text style={styles.genre}>{book.genre}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <TouchableOpacity style={styles.button} title="Borrow Book" onPress={borrowBook} >
        <Text style={styles.buttonText}>Borrow Book</Text>
        </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#121212",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  bookImage: {
    width: 250,
    height: 350,
    resizeMode: "contain",
    marginBottom: 5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  author: {
    fontSize: 18,
    color: "gray",
  },
  description: {
    fontSize: 18,
    color: "#B0B0B0",
    marginBottom: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: "center",
  },
  genre:{
    fontSize: 18,
    color: "red",
    marginBottom: 10,   
  },
  button: {
    backgroundColor: '#FFC107',
    padding: 20,
    marginVertical: 20,
    borderRadius: 120,
    alignItems: 'center',
  },
  buttonText: {
    color:"#1E1E1E",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  }

});

export default BookDetailsScreen;
