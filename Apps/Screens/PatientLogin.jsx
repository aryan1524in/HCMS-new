import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { app } from "../../fireConfig"
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(app);

export default function PatientLogin() {
    const navigation = useNavigation();
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");

    const handleAuthentication = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
            const user = userCredential.user;
            
            await AsyncStorage.setItem('userEmail', user.email);
            await AsyncStorage.setItem('userUid', user.uid);

            navigation.navigate('PHomeScreen');
            Alert.alert('Login successful!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Patient Login</Text>
            <TextInput
                value={Email}
                onChangeText={text => SetEmail(text)}
                placeholder='Enter Email'
                style={styles.input}
                placeholderTextColor="#999"
            />
            <TextInput
                value={Password}
                onChangeText={text => SetPassword(text)}
                placeholder='Enter Password'
                style={styles.input}
                placeholderTextColor="#999"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('SignUP')}
                style={[styles.button, styles.buttonSecondary]}
            >
                <Text style={styles.buttonText}>Create An Account</Text>
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
