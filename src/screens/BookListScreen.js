import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator,StatusBar, StyleSheet, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const bookList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(bookList);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);


  if (loading) return <ActivityIndicator size="large" color="blue" style={styles.loader} />;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('BookDetail', { book: item })}>
            <Image source={{ uri: item.coverImage + "-M.jpg" }} style={styles.bookImage} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.genre}>{item.genre}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.burrowedBtn} onPress={() => navigation.navigate('BorrowedBooks')}>
        <Text style={styles.borrowedBtnText}>Books Borrowed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: '#121212', padding: 10 },
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
  burrowedBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderBlockColor: 'gold',
    backgroundColor: '#FFC107',
    padding: 20,
    marginVertical: 20,
    borderRadius: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  borrowedBtnText: { 
    color: '#1E1E1E', 
    fontWeight: 'bold',
    fontSize: 16 },
  bookImage: {
    width: 90,
    height:120,
    resizeMode: "cover",
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  author: { fontSize: 14, color: '#B0B0B0' },
  genre: { fontSize: 12, color: '#0B0B', fontStyle: 'italic' },
});

