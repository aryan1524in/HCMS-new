import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { getDatabase, ref, onValue } from '@firebase/database';
import { app } from "../../../fireConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppointmentRecords() {
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState(null);

  const db = getDatabase(app);

  useEffect(() => {
    const fetchAppointments = async () => {
      const savedPatientId = await AsyncStorage.getItem('userUid');
      setPatientId(savedPatientId);

      const doctorsRef = ref(db, 'doctors');
      const appointmentsRef = ref(db, 'appointments');

      const doctorsSnapshot = await new Promise((resolve) => onValue(doctorsRef, resolve));
      const appointmentsSnapshot = await new Promise((resolve) => onValue(appointmentsRef, resolve));

      const doctorsData = doctorsSnapshot.val();
      const appointmentsData = appointmentsSnapshot.val();
      const patientAppointments = [];

      for (const doctorEmail in appointmentsData) {
        const doctorAppointments = appointmentsData[doctorEmail];
        for (const patientIdKey in doctorAppointments) {
          if (patientIdKey === savedPatientId) {
            patientAppointments.push({
                id: `${doctorEmail}-${patientIdKey}`,
              doctorEmail,
              doctorName: doctorsData[doctorEmail]?.Name || 'Unknown Doctor',
              ...doctorAppointments[patientIdKey]
            });
          }
        }
      }

      setAppointments(patientAppointments);
    };

    fetchAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.recordItem}>
      <Text style={styles.doctorName}>Doctor: {item.doctorName}</Text>
      <Text style={styles.patientName}>Patient: {item.PatientName}</Text>
      <Text style={styles.details}>Date: {item.Date}</Text>
      <Text style={styles.details}>Time: {item.Time}</Text>
      <Text style={[styles.status, item.Status === 'Confirmed' ? styles.completed : item.Status === 'Cancelled' ? styles.cancelled : styles.pending]}>
        {item.Status}
      </Text>
    </View>
  );

  return (
    <ImageBackground 
      source={require('./../../../assets/images/background.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Appointment Records</Text>
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  recordItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  patientName: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666666',
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666666',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  completed: {
    color: '#1abc9c',
  },
  cancelled: {
    color: '#e74c3c',
  },
  pending: {
    color: '#f1c40f',
  },
});
