import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const defaultQuests = [
  {
    id: '1',
    title: 'Explore the Prado Museum',
    description: 'Find the most famous painting and take a selfie!',
    question: 'Who painted "Las Meninas"?',
    answer: 'Diego Velázquez',
    completed: false,
  },
  {
    id: '2',
    title: 'Taste Traditional Tapas',
    description: 'Try at least three different tapas in a local bar.',
    question: 'What is the most common ingredient in Spanish tapas?',
    answer: 'Olive oil',
    completed: false,
  },
  {
    id: '3',
    title: 'Walk through Retiro Park',
    description: 'Take a stroll and visit the Crystal Palace.',
    question: 'Which famous lake can be found in Retiro Park?',
    answer: 'Estanque Grande',
    completed: false,
  },
  {
    id: '4',
    title: 'Visit the Royal Palace',
    description:
      'Explore the grandeur of the Spanish royal family’s residence.',
    question: 'What is the name of the main staircase inside the Royal Palace?',
    answer: 'The Grand Staircase',
    completed: false,
  },
  {
    id: '5',
    title: 'Find the Bear and the Strawberry Tree',
    description: 'Locate Madrid’s most iconic statue.',
    question: 'Where is the Bear and the Strawberry Tree statue located?',
    answer: 'Puerta del Sol',
    completed: false,
  },
  {
    id: '6',
    title: 'Watch a Flamenco Show',
    description:
      'Experience the passion of flamenco dancing in a local tablao.',
    question: 'Which city is considered the birthplace of Flamenco?',
    answer: 'Seville',
    completed: false,
  },
  {
    id: '7',
    title: 'Visit Mercado de San Miguel',
    description: 'Try different Spanish delicacies at the famous market.',
    question: 'What is the most famous dish served at Mercado de San Miguel?',
    answer: 'Jamón Ibérico',
    completed: false,
  },
  {
    id: '8',
    title: 'Visit Santiago Bernabéu Stadium',
    description: 'Take a tour of the home of Real Madrid.',
    question: 'How many Champions League titles has Real Madrid won?',
    answer: '14',
    completed: false,
  },
  {
    id: '9',
    title: 'Climb to the Top of Círculo de Bellas Artes',
    description: 'Enjoy a panoramic view of Madrid from the rooftop.',
    question:
      'What famous boulevard is visible from the Círculo de Bellas Artes rooftop?',
    answer: 'Gran Vía',
    completed: false,
  },
  {
    id: '10',
    title: 'Explore Temple of Debod',
    description: 'Visit Madrid’s ancient Egyptian monument.',
    question: 'Which country gifted the Temple of Debod to Spain?',
    answer: 'Egypt',
    completed: false,
  },
];

export const QuestsScreen = () => {
  const [quests, setQuests] = useState<any>([]);
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [answer, setAnswer] = useState<any>('');
  const [modalVisible, setModalVisible] = useState<any>(false);
  const focus = useIsFocused();

  useEffect(() => {
    const loadQuests = async () => {
      const storedQuests = await AsyncStorage.getItem('questsData');
      if (storedQuests) {
        setQuests(JSON.parse(storedQuests));
      } else {
        setQuests(defaultQuests);
        await AsyncStorage.setItem('questsData', JSON.stringify(defaultQuests));
      }
    };
    loadQuests();
  }, [focus]);

  const checkAnswer = async () => {
    if (
      selectedQuest &&
      answer.trim().toLowerCase() === selectedQuest.answer.toLowerCase()
    ) {
      const updatedQuests = quests.map((quest: any) =>
        quest.id === selectedQuest.id ? {...quest, completed: true} : quest,
      );
      setQuests(updatedQuests);
      await AsyncStorage.setItem('questsData', JSON.stringify(updatedQuests));
      Alert.alert('Correct!', 'You answered correctly.');
    } else {
      Alert.alert('Wrong answer', 'Please try again.');
    }
    setModalVisible(false);
    setAnswer('');
  };

  return (
    <View  style={{flex:1}}>
      <ImageBackground style={{ flex: 1 }} source={require('../assets/newDiz/bg.jpg')}>
      <View style={styles.container}>
      <Text style={styles.title}>Quests</Text>
      <Text style={styles.subtitle}>
        Complete challenges and explore Madrid!
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={quests}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.questCard, item.completed && styles.completedQuest]}
            onPress={() => {
              setSelectedQuest(item);
              setModalVisible(true);
            }}>
            <Text style={styles.questTitle}>{item.title}</Text>
            <Text style={styles.questDescription}>{item.description}</Text>
            <Text style={styles.questStatus}>
              {item.completed ? '✅ Completed' : '❌ Incomplete'}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedQuest?.title}</Text>
            <Text style={styles.modalQuestion}>{selectedQuest?.question}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your answer"
              placeholderTextColor="#999"
              value={answer}
              onChangeText={setAnswer}
            />
            <Button title="Submit" onPress={checkAnswer} color="#FFD700" />
            <Button
              title="Close"
              onPress={() => {
                setModalVisible(false);
                setAnswer('');
              }}
              color="#FF6347"
            />
          </View>
        </View>
      </Modal>
    </View>
      </ImageBackground>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#1e1e1e',
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
  questCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 6,
  },
  completedQuest: {
    backgroundColor: '#444',
  },
  questTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  questDescription: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  questStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#FFD700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  modalQuestion: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#333',
    color: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
