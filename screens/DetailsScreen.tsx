import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DetailsScreen = ({route, navigation}: any) => {
  const restaurant = route.params.place;
  const [comments, setComments] = useState<any>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        const storedPlaces = await AsyncStorage.getItem('featuredPlaces');
        if (storedPlaces) {
          const placesArray = JSON.parse(storedPlaces);
          const currentPlace = placesArray.find(
            (p: any) => p.id === restaurant.id,
          );
          if (currentPlace && currentPlace.comments) {
            setComments(currentPlace.comments);
          }
        }
      } catch (error) {
        console.log('Load Comments Error:', error);
      }
    };
    loadComments();
  }, [restaurant.id]);

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      const storedPlaces = await AsyncStorage.getItem('featuredPlaces');
      if (storedPlaces) {
        const placesArray = JSON.parse(storedPlaces);
        const updatedPlaces = placesArray.map((p: any) => {
          if (p.id === restaurant.id) {
            const updatedComments = p.comments ? [...p.comments] : [];
            updatedComments.push(newComment);
            return {...p, comments: updatedComments};
          }
          return p;
        });
        await AsyncStorage.setItem(
          'featuredPlaces',
          JSON.stringify(updatedPlaces),
        );
        setComments((prev: any) => [...prev, newComment]);
        setNewComment('');
        Alert.alert('Success', 'Comment added');
      }
    } catch (error) {
      console.log('Add Comment Error:', error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#1e1e1e'}}
      contentContainerStyle={styles.container}>
      <Image source={{uri: restaurant.image}} style={styles.image} />
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.description}>{restaurant.description}</Text>
      <Text style={styles.address}>
        📍 {restaurant.address || 'Address not available'}
      </Text>
      <Text style={styles.rating}>
        ⭐ {restaurant.rating || 'No rating'} / 5
      </Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Icon name="time-outline" size={20} color="#FFD700" />
          <Text style={styles.infoText}>
            Opening Hours: {restaurant.openingHours || 'Not available'}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="call-outline" size={20} color="#FFD700" />
          <Text style={styles.infoText}>
            Phone: {restaurant.phone || 'No contact'}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Icon name="globe-outline" size={20} color="#FFD700" />
          <Text style={styles.infoText}>
            Website: {restaurant.website || 'No website'}
          </Text>
        </View>
      </View>
      <Text style={styles.commentTitle}>Comments</Text>
      {comments.map((item: any, index: any) => (
        <View key={index} style={styles.commentBox}>
          <Text style={styles.commentText}>• {item}</Text>
        </View>
      ))}

      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#999"
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.addButton} onPress={addComment}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    paddingVertical: 40,
    alignItems: 'center',
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
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
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
  commentTitle: {
    width: '100%',
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentBox: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#ccc',
  },
  addCommentContainer: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#1e1e1e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
});
