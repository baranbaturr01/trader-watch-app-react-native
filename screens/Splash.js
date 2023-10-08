import { ImageBackground, StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton'
function Splash({ navigation }) {
    return (
        <SafeAreaView>
            <ImageBackground
                style={styles.logo}
                source={{
                    uri: 'https://images.pexels.com/photos/1978126/pexels-photo-1978126.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>Welcome My App</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        style={styles.button}
                        title="Continue"
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    text: {
        fontSize: 40,
        padding: 15,
        color: 'orange',
    },
    button: {
        backgroundColor: 'orange',
        padding: 15,
        width: '70%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

})

export default Splash