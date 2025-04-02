import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EventDetails = ({route, navigation}: any) => {
  const {event} = route.params;
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('eventBookings');
      let bookings = storedBookings ? JSON.parse(storedBookings) : [];
      const alreadyBooked = bookings.some((b: any) => b.id === event.id);
      if (!alreadyBooked) {
        bookings.push({id: event.id, title: event.title});
        await AsyncStorage.setItem('eventBookings', JSON.stringify(bookings));
        setIsBooked(true);
        Alert.alert('Success', 'You have successfully reserved a spot.');
      } else {
        Alert.alert('Info', 'You have already reserved this event.');
      }
    } catch (error) {
      console.log('Booking Error:', error);
    }
  };

  return (
    <View  style={{flex:1}}>
      <ImageBackground style={{ flex: 1 }} source={require('../assets/newDiz/bg.jpg')}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      style={{}}
      contentContainerStyle={styles.container}>
      <Image source={{uri: event.image}} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Icon name="calendar-outline" size={20} color="#FFD700" />
          <Text style={styles.infoText}>
            Date: {event.date || 'No date provided'}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="map-outline" size={20} color="#FFD700" />
          <Text style={styles.infoText}>
            Location: {event.location || 'No location provided'}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="cash-outline" size={20} color="#FFD700" />
          <Text style={styles.infoText}>Price: {event.price || 'Free'}</Text>
        </View>
      </View>
      {!isBooked && (
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Reserve Your Spot</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
      </ImageBackground>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#1e1e1e',
    padding: 20,
    alignItems: 'center',
    paddingVertical: 40,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: '#292929',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
});
