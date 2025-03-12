import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';

export const RestaurantsScreen = () => {
  const [restaurants, setRestaurants] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const focus = useIsFocused();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadRestaurants = async () => {
      const storedRestaurants = await AsyncStorage.getItem('featuredPlaces');
      if (storedRestaurants) {
        setRestaurants(JSON.parse(storedRestaurants));
      }
    };
    loadRestaurants();
  }, [focus]);

  const saveNewRestaurant = async () => {
    if (!title.trim()) return;
    const newRestaurant = {
      id: Date.now().toString(),
      title,
      description,
      image: imageUrl,
      address,
      phone,
      rating,
      priceRange,
      specialty,
      openingHours,
    };
    const updated = [...restaurants, newRestaurant];
    setRestaurants(updated);
    await AsyncStorage.setItem('featuredPlaces', JSON.stringify(updated));
    Alert.alert('Success', 'Restaurant added successfully');
    setTitle('');
    setDescription('');
    setImageUrl('');
    setAddress('');
    setPhone('');
    setRating('');
    setPriceRange('');
    setSpecialty('');
    setOpeningHours('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>
      <Text style={styles.subtitle}>
        Discover the best dining spots in Madrid.
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add New Restaurant</Text>
      </TouchableOpacity>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
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
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Restaurant</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              placeholderTextColor="#999"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating (1-5)"
              placeholderTextColor="#999"
              value={rating}
              onChangeText={setRating}
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveNewRestaurant}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#555',
    color: '#FFD700',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#1e1e1e',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#777',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
