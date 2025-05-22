import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { getDatabase, ref, push, set } from '@firebase/database';
import { getStorage, ref as storageRef, uploadBytes } from '@firebase/storage';
import { app } from "../../fireConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';

export default function EnterPrescription({ route, navigation }) {
  const { patient } = route.params;
  const [prescription, setPrescription] = useState('');
  const [file, setFile] = useState(null);
  const db = getDatabase(app);
  const storage = getStorage(app);

  function formatEmail(email) {
    const [emailName, domain] = email.split('@');
    const formattedDomain = domain.replace('.com', '');
    const formattedEmail = `${emailName.toLowerCase()}@${formattedDomain}`;
    return formattedEmail;
  }

  const handlePickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    setFile(result);
  };

  const handleSavePrescription = async () => {
    const doctorEmail = await AsyncStorage.getItem('doctorEmail');
    if (!doctorEmail) {
      return;
    }

    if(!prescription){
        return;
    }
    const patientRef = ref(db, `prescriptions/${formatEmail(doctorEmail)}/${patient.PatientID}`);
    const newPrescriptionRef = push(patientRef);
    const storageReference = storageRef(storage, `prescriptions/${formatEmail(doctorEmail)}/${patient.PatientID}/${newPrescriptionRef.key}`);

    if (file && file.assets && file.assets.length > 0) {
      const selectedFile = file.assets[0];
      const fileUri = decodeURIComponent(selectedFile.uri.replace('file://', ''));

      try {
        const response = await fetch(fileUri);
        const blob = await response.blob();
        await uploadBytes(storageReference, blob);
      } catch (error) {
        console.error('Error uploading file:', error);
        Alert.alert('Error', 'Failed to upload file');
      }
    }

    await set(newPrescriptionRef, {
      prescription,
      fileUrl: file ? storageReference.toString() : null,
      date: new Date().toISOString(),
    });

    Alert.alert('Success', 'Prescription saved successfully');
    navigation.goBack();
  };

  return (
    <ImageBackground source={require('./../../assets/images/background.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Enter Prescription for {patient.PatientName}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter prescription"
          value={prescription}
          onChangeText={setPrescription}
          placeholderTextColor="#999999"
          multiline={true}
        />
        <TouchableOpacity style={styles.fileButton} onPress={handlePickDocument}>
          <Text style={styles.fileButtonText}>Pick a file</Text>
        </TouchableOpacity>
        {file && (
          <Text style={styles.fileName}>
            Selected File: {file.assets ? file.assets[0].name : file.name}
          </Text>
        )}
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePrescription}>
          <Text style={styles.saveButtonText}>Save Prescription</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 150,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    color: '#333333',
    textAlignVertical: 'top',
  },
  fileButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  fileButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileName: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});