import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChooseLogin() {
    const navigation = useNavigation();

    const navigateToPatientLogin = () => {
        navigation.navigate('PatientLogin');
    };

    const navigateToDoctorLogin = () => {
        navigation.navigate('DoctorLogin');
    };

    return (
        <ImageBackground 
            source={require('./../../assets/images/background.jpeg')} 
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Choose Login Type</Text>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity style={styles.option} onPress={navigateToDoctorLogin}>
                            <Image
                                source={require('./../../assets/images/doctoranimate.jpeg')}
                                style={styles.optionImage}
                            />
                            <Text style={styles.optionText}>Login as Doctor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={navigateToPatientLogin}>
                            <Image
                                source={require('./../../assets/images/patientanimate.jpeg')}
                                style={styles.optionImage}
                            />
                            <Text style={styles.optionText}>Login as Patient</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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

    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    container: {
        alignItems: 'center',
        
    },

    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 30,
        backgroundColor: 'rgba(255, 255, 255, 2)',
        padding: 10,
        borderRadius: 5,
        borderWidth: 4,
        borderColor: 'black',
        
    },

    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
    },

    option: {
        alignItems: 'center',
        marginHorizontal: 10,
    },

    optionImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },

    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
});
