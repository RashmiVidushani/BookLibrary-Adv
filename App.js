import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookListScreen from './src/screens/BookListScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import BorrowedBooksScreen from './src/screens/BorrowedBooksScreen';
import { TouchableOpacity , Text} from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BookList" component={BookListScreen} options={{ 
          title: 'Available Books',
          headerStyle: { backgroundColor: '#121212' },
          headerTitleStyle: { color: '#FFC107' },
          headerTitleAlign: 'center',
           }} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ 
          title: 'Book Details',
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#FFC107',
          headerTitleStyle: { color: '#FFC107' },
          headerTitleAlign: 'center',
          }} />
        <Stack.Screen name="BorrowedBooks" component={BorrowedBooksScreen} options={{ 
          title: 'Borrowed Books',
          headerStyle: { backgroundColor: '#121212' },
          headerTitleStyle: { color: '#FFC107' },
          headerTintColor: '#FFC107',
          headerTitleAlign: 'center', }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

