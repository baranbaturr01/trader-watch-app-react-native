import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'

const Details = () => {
    const [recipeName, setRecipeName] = useState('')
    const [recipeIngredients, setRecipeIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [loading, setLoading] = useState(true)

    const handleSubmit = () => {
        const recipe = {
            name: recipeName,
            ingredients: recipeIngredients,
            instructions: instructions,
        }

        console.log(recipe)

        setRecipeName('')
        setRecipeIngredients('')
        setInstructions('')
    }

    useEffect(() => {
        // Resim yüklendiğinde setLoading'i false olarak ayarlayın
        setLoading(false);
    }, []);

    return (
        <SafeAreaView>
            <ImageBackground source={require('../assets/receps.png')} style={styles.backgroundImage}>
                <Text style={styles.title}>Yemek Tarifi Ekle</Text>
                {loading ? ( // Eğer yükleniyor ise loading göstergesini göster
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Yemek Adı"
                            value={recipeName}
                            onChangeText={(text) => setRecipeName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Malzemeler"
                            value={recipeIngredients}
                            onChangeText={(text) => setRecipeIngredients(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Yapılışı"
                            multiline
                            value={instructions}
                            onChangeText={(text) => setInstructions(text)}
                        />
                        <Button title="Tarifi Ekle" onPress={handleSubmit} />
                    </View>
                )}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Details

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    formContainer: {
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center', // İçeriği dikey olarak ortala
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
