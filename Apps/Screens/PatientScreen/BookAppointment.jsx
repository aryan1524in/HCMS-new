import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Modal, ScrollView } from 'react-native';
import { getDatabase, ref, onValue, get } from '@firebase/database';
import { app } from "../../../fireConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MedicalHistory() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const db = getDatabase(app);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userUid = await AsyncStorage.getItem('userUid');
        if (!userUid) {
          return;
        }

        const appointmentsRef = ref(db, `appointments`);
        onValue(appointmentsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const patientAppointments = Object.keys(data)
              .flatMap(doctorId => Object.values(data[doctorId]))
              .filter(appointment => appointment.PatientID === userUid);
            
            setAppointments(patientAppointments);
          } else {
            setAppointments([]);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  const handleAppointmentPress = async (appointment) => {
    try {
      const doctorEmail = formatEmail(appointment.DoctorEmail);
      const prescriptionsRef = ref(db, `prescriptions/${doctorEmail}/${appointment.PatientID}`);
      const prescriptionsSnapshot = await get(prescriptionsRef);
      const prescriptionsData = prescriptionsSnapshot.val();

      if (prescriptionsData) {
        const prescriptionsList = Object.keys(prescriptionsData).map(key => prescriptionsData[key]);
        setPrescriptions(prescriptionsList);
        setSelectedAppointment(appointment);
        setModalVisible(true);
      } else {
        Alert.alert('No prescriptions found for this appointment.');
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      Alert.alert('Error', 'Failed to fetch prescriptions.');
    }
  };

  const formatEmail = (email) => {
    const [emailName, domain] = email.split('@');
    const formattedDomain = domain.replace('.com', '');
    return `${emailName.toLowerCase()}@${formattedDomain}`;
  };

  const renderAppointment = ({ item }) => (
    <TouchableOpacity 
      style={styles.appointmentItem} 
      onPress={() => handleAppointmentPress(item)}
    >
      <Text style={styles.doctorName}>Doctor: {item.DoctorEmail}</Text>
      <Text>Date: {item.Date}</Text>
      <Text>Status: {item.Status}</Text>
    </TouchableOpacity>
  );

  const renderPrescription = ({ item }) => (
    <View style={styles.prescriptionItem}>
      <Text>Prescription: {item.prescription}</Text>
      <Text>Date: {new Date(item.date).toLocaleString()}</Text>
      {item.fileUrl && <Text>File: {item.fileUrl}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Medical History</Text>
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      ) : (
        <Text style={styles.noAppointments}>No appointments found.</Text>
      )}

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>Prescriptions</Text>
          {prescriptions.length > 0 ? (
            <FlatList
              data={prescriptions}
              renderItem={renderPrescription}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
            />
          ) : (
            <Text style={styles.noAppointments}>No prescriptions found.</Text>
          )}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  list: {
    marginBottom: 20,
  },
  appointmentItem: {
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
    color: '#333333',
    marginBottom: 10,
  },
  noAppointments: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  prescriptionItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
