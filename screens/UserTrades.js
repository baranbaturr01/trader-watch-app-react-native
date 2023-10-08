import { Text, StyleSheet, View, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import BaseUrl from '../data/BaseUrl';

const UserTrades = () => {
    const [userStocks, setUserStocks] = useState([]); // Kullanıcı stok verilerini tutmak için bir state

    useEffect(() => {
        // Bu etkileşimde backend'e istek atarak verileri çekin
        fetchStockDataFromBackend();
    }, []);

    // Backend'den stok verilerini çeken işlev
    const fetchStockDataFromBackend = async () => {
        try {
            const requestUrl = BaseUrl() + 'api/user-stocks';
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': global.token,
                },
            });

            const data = await response.json();

            if (data.success) {
                setUserStocks(data.data.userStocks);
            } else {
                console.error('Veri çekme hatası:', data.error);
            }
        } catch (error) {
            console.error('Veri çekme hatası:', error);
        }
    };

    // Her bir hisse senedi öğesini gösterecek olan işlev
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.recipeBox}
            onPress={() => {
                // Seçilen hisse senedine tıklamak için yapılacak eylemi burada tanımlayabilirsiniz
            }}
        >
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.recipeIngredients}>Price: {item.price}</Text>
            <Text style={styles.recipeIngredients}>Volume: {item.volume}</Text>
            <Text style={styles.recipeIngredients}>Value: {item.value}</Text>
            <Text style={styles.recipeIngredients}>Date: {item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground source={require('../assets/home.png')} style={styles.backgroundImage}>
            <FlatList
                data={userStocks}
                renderItem={renderItem}
                keyExtractor={(item) => item._id} // Her öğeyi benzersiz bir şekilde tanımlamak için kullanabileceğiniz bir özellik seçin
            />
        </ImageBackground>
    );
}


export default UserTrades

const styles = StyleSheet.create({
    recipeBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recipeIngredients: {
        fontSize: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
})
