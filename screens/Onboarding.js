import React from 'react';
import { ImageBackground, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import CustomButton from '../components/CustomButton';

const windowWidth = Dimensions.get('window').width;
//for iphone 11 and all other phones
const windowHeight = Dimensions.get('window').height;
function Splash({ navigation }) {
    return (
        <View style={styles.container}>

            <StatusBar hidden />
            <ImageBackground
                style={styles.backgroundImage}
                source={require('../assets/onboarding.jpg')}
                blurRadius={5} // Blur miktarını buradan ayarlayabilirsiniz
            >
                <View style={styles.overlay}>
                    <View style={styles.textContainer}>
                        <Text style={styles.appName}>Stock Watch</Text>
                        <Text style={styles.description}>Borsa Takip Asistanınız</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Başla</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: windowWidth,
        height: windowHeight,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Overlay rengini ayarlayabilirsiniz
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    appName: {
        fontSize: windowWidth * 0.1, // Genişliğe göre boyutlandırma
        padding: 10,
        color: '#008170',
    },
    description: {
        fontSize: windowWidth * 0.03, // Genişliğe göre boyutlandırma
        color: 'white',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'transparent', // Buton arka planını transparan yapın
        borderWidth: 2,
        borderColor: '#005B41',
        padding: windowWidth * 0.05, // Genişliğe göre boyutlandırma
        width: '70%',
        borderRadius: 20,
        alignItems: 'center',
        marginTop: windowHeight * 0.1, // Yüksekliğe göre konumlandırma
    },
    buttonText: {
        color: '#005B41',
        fontSize: windowWidth * 0.04, // Genişliğe göre boyutlandırma
    },
})

export default Splash;
