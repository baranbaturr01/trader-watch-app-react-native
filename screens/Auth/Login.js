import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Platform, ActivityIndicator, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import BaseUrl from '../../data/BaseUrl';
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({ navigation, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

            onLogin(data.data.token);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.circularFrame}>
                    <Text style={styles.circularFrameText}>Stock Watch</Text>
                </View>
                <TextInput
                    onChangeText={text => setEmail(text)}
                    style={[styles.input, error && styles.errorInput]}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={[styles.input, error && styles.errorInput]}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { sendRequestToLogin(); Keyboard.dismiss() }}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" color="white" />}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232D3F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularFrame: {
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
        backgroundColor: 'transparent',
        borderRadius: windowWidth * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: windowHeight * 0.02,
        borderColor: '#005B41',
        borderWidth: 2,
    },
    circularFrameText: {
        fontSize: windowWidth * 0.08,
        fontWeight: 'bold',
        color: '#005B41',
        textAlign: 'center',
    },
    input: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.06,
        backgroundColor: 'grey',
        marginVertical: windowHeight * 0.015,
        padding: windowWidth * 0.03,
        color: 'black',
        borderRadius: windowWidth * 0.07,
        fontSize: windowWidth * 0.045,
        fontWeight: '500',
    },
    errorInput: {
        borderColor: 'red',
    },
    buttonContainer: {
        marginTop: windowHeight * 0.04,
        width: windowWidth * 0.5,
        height: windowHeight * 0.07,
        backgroundColor: 'transparent',
        borderRadius: windowWidth * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#005B41',
        borderWidth: 2,
    },
    buttonText: {
        fontSize: windowWidth * 0.06,
        fontWeight: '500',
        color: '#005B41',
    },
});
