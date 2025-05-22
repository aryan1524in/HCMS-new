import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet,Alert,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { app } from "../../fireConfig"
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, get } from '@firebase/database';

const auth = getAuth(app);

export default function DoctorLogin() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const database = getDatabase(app);


    function formatEmail(email) {
        const [emailName, domain] = email.split('@');
      
        const formattedDomain = domain.replace('.com', '');
      
        const formattedEmail = `${emailName.toLowerCase()}@${formattedDomain}`;
      
        return formattedEmail;
      }

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const doctorDataSnapshot = await get(ref(database, `doctors/${formatEmail(email)}`));
            const doctorData = doctorDataSnapshot.val();
    

            const specialty = doctorData?.Spl || 'Unknown';

            const name=doctorData?.Name || 'Unknown';
            const image=doctorData?.image || 'Unknown';
            await AsyncStorage.setItem('doctorEmail', email);
            await AsyncStorage.setItem('doctorUid', user.uid);
            await AsyncStorage.setItem('doctorSpecialty', specialty);
            await AsyncStorage.setItem('doctorName', name);
            await AsyncStorage.setItem('doctorImage', image);
            Alert.alert('Login successful!');
            navigation.navigate('DHomeScreen');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        
        <View style={styles.container}>
            <Text style={styles.heading}>Doctor Login</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder='Enter Email'
                style={styles.input}
                placeholderTextColor="#999"
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder='Enter Password'
                style={styles.input}
                placeholderTextColor="#999"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => Linking.openURL('mailto:jaskirat02042003@gmail.com') }   
                style={[styles.button, styles.buttonSecondary]}
            >
                <Text style={styles.buttonText}>Send us an email to create an account "jaskirat02042003@gmail.com"</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#FFF",
        color: "#333",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#333",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    buttonSecondary: {
        backgroundColor: "#999",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
})