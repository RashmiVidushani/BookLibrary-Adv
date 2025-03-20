import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';

export default function BorrowedBooksScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const storedBooks = await getDocs(collection(db, 'borrowedBooks'));
        const borrowedList = storedBooks.docs.map(doc => ({ 
          id: doc.id, ...doc.data() ,
          borrowedDate: doc.data().borrowedDate?.toDate(), 
          dueDate: doc.data().dueDate?.toDate()
        }));
        setBorrowedBooks(borrowedList);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const returnBook = async (id) => {
    try {
      await deleteDoc(doc(db, 'borrowedBooks', id)); 
      setBorrowedBooks(borrowedBooks.filter(book => book.id !== id));
      Alert.alert("Book Returned", "Book is returned successfully!");
    } catch (err) {
      console.error("Error returning book:", err);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="blue" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.coverImage + "-M.jpg" }} style={styles.bookImage} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
              {/* Display Borrowed Date */}
              {item.borrowedDate && (
                <Text style={styles.burrowedDate}>
                  Borrowed: {item.borrowedDate.toLocaleDateString()}
                </Text>
              )}

              {/* Display Due Date */}
              {item.dueDate && (
                <Text style={styles.dueDate}>
                  Due Date: {item.dueDate.toLocaleDateString()}
                </Text>
              )}

              <TouchableOpacity style={styles.returnBtn}  onPress={() => returnBook(item.id)} >
                <Text style={styles.returnBtnText}>Return</Text>  
                </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
  returnBtn: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  burrowedDate:{
    fontSize: 14,
    color: 'green',
  },
  dueDate: {
    fontSize: 14,
    color: 'red',
  },

  returnBtnText: {
    color: '#121212',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  bookImage: {
    width: 90,
    height:120,
    resizeMode: "cover",
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  author: { fontSize: 14, color: '#B0B0B0', marginBottom: 5 },
});

