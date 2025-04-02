import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const defaultPlaces = [
  {
    id: '1',
    title: 'Sobrino de Botín',
    description:
      'The world’s oldest restaurant, serving traditional Spanish cuisine since 1725.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSv6a5Kz0fCfvVcBdKvQsTeTxZRz6fT-nZZA&s',
    address: 'Calle de Cuchilleros, 17, 28005 Madrid, Spain',
    rating: 4.7,
    phone: '+34 913 66 42 17',
    website: 'https://www.botin.es',
    priceRange: '€€€',
    specialty: 'Cochinillo Asado',
    openingHours: '1:00 PM - 11:30 PM',
  },
  {
    id: '2',
    title: 'Prado Museum',
    description: 'Home to masterpieces by Velázquez, Goya, and El Greco.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr5pWUNRhjm0IILJcntnHTwnUlsF3pI46log&s',
    address: 'C. de Ruiz de Alarcón, 23, 28014 Madrid, Spain',
    rating: 4.8,
    phone: '+34 902 10 70 77',
    website: 'https://www.museodelprado.es/',
    priceRange: 'N/A',
    specialty: 'Art Exhibitions',
    openingHours: '10:00 AM - 8:00 PM',
  },
  {
    id: '3',
    title: 'Plaza Mayor',
    description:
      'A historic square in the heart of Madrid, perfect for enjoying a coffee and people-watching.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Plaza_Mayor_de_Madrid_06.jpg/640px-Plaza_Mayor_de_Madrid_06.jpg',
    address: 'Plaza Mayor, 28012 Madrid, Spain',
    rating: 4.6,
    phone: 'N/A',
    website: 'https://www.esmadrid.com/en/tourist-information/plaza-mayor',
    priceRange: 'Free',
    specialty: 'Historical Landmark',
    openingHours: 'Open 24 hours',
  },
];

export const HomeScreen = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState<any>([]);

  const navigation = useNavigation<any>();
  const focus = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const storedPlaces = await AsyncStorage.getItem('featuredPlaces');
      if (storedPlaces) {
        setFeaturedPlaces(JSON.parse(storedPlaces));
      } else {
        setFeaturedPlaces(defaultPlaces);
        await AsyncStorage.setItem(
          'featuredPlaces',
          JSON.stringify(defaultPlaces),
        );
      }
    };
    loadPlaces();
  }, [focus]);

  return (
    <View  style={{flex:1}}>
      <ImageBackground style={{flex:1}} source={require('../assets/newDiz/bg.jpg')}>
         <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={{paddingVertical: 40, }}>
      <Text style={styles.title}>Welcome to Gran Madrid</Text>
      <Text style={styles.subtitle}>
        Explore Madrid’s top restaurants, cultural landmarks, and exciting
        events.
      </Text>
      <Text style={styles.sectionTitle}>Featured Places</Text>
      {featuredPlaces.length ? (
        <FlatList
          data={featuredPlaces}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Pressable
              onPress={() =>
                navigation.navigate('RestaurantDetails', {place: item})
              }
              style={styles.card}>
              <Image source={{uri: item.image}} style={styles.image} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </Pressable>
          )}
        />
      ) : (
        <></>
      )}
      <Text style={styles.sectionTitle}>Madrid Travel Tips</Text>
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>
          🎭 Visit the Royal Palace – one of Europe’s largest palaces.
        </Text>
        <Text style={styles.tipText}>
          🌅 Watch the sunset at Templo de Debod.
        </Text>
        <Text style={styles.tipText}>
          🍷 Try authentic Spanish tapas at Mercado de San Miguel.
        </Text>
      </View>
      <Text style={styles.sectionTitle}>Fun Facts About Madrid</Text>
      <View style={styles.factContainer}>
        <Text style={styles.factText}>
          🏟️ Santiago Bernabéu Stadium is one of the most famous football
          stadiums in the world.
        </Text>
        <Text style={styles.factText}>
          🚇 Madrid’s metro system is the second-largest in Europe after London.
        </Text>
        <Text style={styles.factText}>
          🌳 Retiro Park was once the royal family’s private retreat.
        </Text>
      </View>
    </ScrollView>
      </ImageBackground>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#1e1e1e',
    padding: 20,
    paddingBottom: 50,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    width: 250,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
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
  tipContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 6,
  },
  tipText: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 5,
  },
  factContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#292929',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 6,
  },
  factText: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 5,
  },
});
