import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultEvents = [
  {
    id: '1',
    title: 'Madrid Jazz Festival',
    description: 'An annual jazz festival featuring international artists.',
    image:
      'https://www.centrocentro.org/sites/default/files/styles/meta_image/public/cycle/image/850x450_0.jpg.webp?itok=xUQwwWZ3',
    date: 'June 5 - 10, 2025',
    location: 'Teatro Real, Madrid',
    price: '€30 - €60',
  },
  {
    id: '2',
    title: 'San Isidro Festival',
    description: 'A traditional festival celebrating Madrid’s patron saint.',
    image:
      'https://www.tandemmadrid.com/wp-content/uploads/2017/05/san-isidro-madrid-2017-1.jpg',
    date: 'May 15, 2025',
    location: 'Throughout central Madrid',
    price: 'Free',
  },
  {
    id: '3',
    title: 'Madrid Christmas Market',
    description: 'A festive market with holiday treats and gifts.',
    image:
      'https://www.citylifemadrid.com/wp-content/uploads/2022/12/christmas-markets-madrid-plaza-mayor-edited.jpg',
    date: 'December 1 - January 6, 2025',
    location: 'Plaza Mayor',
    price: 'Free entry',
  },
  {
    id: '4',
    title: 'Flamenco Showcase',
    description: 'Experience passionate flamenco performances by top artists.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjbz00gEgXn6IaTRuxynqE4dUh8wVsG-q15w&s',
    date: 'July 10 - 14, 2025',
    location: 'Corral de la Morería',
    price: '€50 - €100',
  },
  {
    id: '5',
    title: 'Tapas Expo',
    description: 'Sample creative tapas from renowned Spanish chefs.',
    image:
      'https://vintae.com/wp-content/uploads/2013/11/TAPAS_EXPO_VINTAE3.jpg',
    date: 'August 5 - 7, 2025',
    location: 'IFEMA Madrid',
    price: '€20',
  },
];

export const EventsScreen = ({navigation}: any) => {
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const storedEvents = await AsyncStorage.getItem('eventsData');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        setEvents(defaultEvents);
        await AsyncStorage.setItem('eventsData', JSON.stringify(defaultEvents));
      }
    };
    loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <Text style={styles.subtitle}>
        Stay updated on the latest events happening in Madrid.
      </Text>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetails', {event: item})}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
    paddingVertical: 40,
    paddingBottom: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
});
