import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Keyboard } from 'react-native';
import BaseUrl from '../../data/BaseUrl';
import Toast from 'react-native-toast-message';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // İstek yükleme durumu
    const [error, setError] = useState(null); // Hata durumu

    const sendRequestToLogin = async () => {
        setLoading(true);
        const response = await fetch(BaseUrl() + 'api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        setLoading(false);

        if (data.error) {
            setError('Hatalı giriş bilgileri. Lütfen tekrar deneyin.');
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Hata',
                text2: 'Hatalı giriş bilgileri. Lütfen tekrar deneyin.',
            });
            setEmail('');
            setPassword('');
            setError(null);

            return;
        }
        if (data.data.token !== null) {
            global.token = data.data.token;

            setEmail('');
            setPassword('');
            setError(null);

            navigation.navigate('BottomTabs');
        }


    }

    return (
        <ImageBackground source={require('../../assets/trade_login.jpg')} style={styles.image}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/batur.jpg')} style={styles.logo} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.text}>Trader Watch</Text>
                </View>
                <TextInput
                    onChangeText={text => setEmail(text)}
                    style={[styles.input, error && styles.errorInput]} // Hata durumunda alanın rengini değiştir
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={[styles.input, error && styles.errorInput]} // Hata durumunda alanın rengini değiştir
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { sendRequestToLogin(); Keyboard.dismiss() }}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Yükleme durumunu göster */}
                {loading && <ActivityIndicator size="large" color="white" />}

            </KeyboardAvoidingView>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </ImageBackground>
    );
};

export default Login;

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
    },
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 10,
    },
    logo: {
        width: 100,
        height: 100,
    },
    titleContainer: {
        marginTop: 10,
    },
    text: {
        fontSize: 30,
        color: 'white',
    },
    input: {
        width: 350,
        height: 55,
        backgroundColor: 'white',
        margin: 10,
        padding: 8,
        color: 'black',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    errorInput: {
        borderColor: 'red', // Hata durumunda alanın etrafını kızart
    },
    buttonContainer: {
        marginTop: 30,
        width: 200,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },
});
