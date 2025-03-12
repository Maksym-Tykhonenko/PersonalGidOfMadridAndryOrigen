import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';

export const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: '',
    birthDate: '',
    image: null,
  });
  const [tempName, setTempName] = useState('');
  const [tempBirthDate, setTempBirthDate] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem('profileData');
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
        setTempName(parsedProfile.name);
        setTempBirthDate(parsedProfile.birthDate);
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async (newProfile: any) => {
    setProfile(newProfile);
    await AsyncStorage.setItem('profileData', JSON.stringify(newProfile));
  };

  const pickImage = () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 300,
      maxHeight: 300,
    };

    ImagePicker.launchImageLibrary(options, (response: any) => {
      if (response.didCancel || response.error) {
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const newProfile = {...profile, image: response.assets[0].uri};
        saveProfile(newProfile);
        Alert.alert('Success', 'Profile picture updated');
      }
    });
  };

  const updateProfile = () => {
    const newProfile = {...profile, name: tempName, birthDate: tempBirthDate};
    saveProfile(newProfile);
    Alert.alert('Success', 'Profile saved successfully');
  };

  const clearProfile = async () => {
    const emptyProfile = {name: '', birthDate: '', image: null};
    setProfile(emptyProfile);
    setTempName('');
    setTempBirthDate('');
    await AsyncStorage.setItem('profileData', JSON.stringify(emptyProfile));
    Alert.alert('Success', 'Profile cleared');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image
        source={profile.image ? {uri: profile.image} : {}}
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Change Profile Picture</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={tempName}
        onChangeText={setTempName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your birth date (DD/MM/YYYY)"
        placeholderTextColor="#999"
        value={tempBirthDate}
        onChangeText={setTempBirthDate}
      />
      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#555'}]}
        onPress={clearProfile}>
        <Text style={styles.buttonText}>Clear Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#333',
    color: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    paddingVertical: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
