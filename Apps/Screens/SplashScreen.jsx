import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
    const navigation = useNavigation();
  
    const navigateToChooseLogin = () => {
      navigation.navigate('ChooseLogin');
    };
  
    return (
        <ImageBackground 
          source={require('./../../assets/images/background.jpeg')} 
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('./../../assets/images/logo.jpeg')}
                  style={styles.logo}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.boldText}>Welcome to Health Care Management System</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.customButton} onPress={navigateToChooseLogin}>
                  <Text style={styles.customButtonText}>Let's Get Started</Text>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
  },

  logoContainer: {
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 2)',
  },

  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  textContainer: {
    borderWidth: 3,
    borderColor: 'black',
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 24, 
    textAlign: 'center',
    color: 'black',
  },
  buttonContainer: {
    marginTop: 20,
  },
  customButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  customButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

