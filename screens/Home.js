import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import BaseUrl from '../data/BaseUrl';
import { Feather } from '@expo/vector-icons';

const HomeScreen = () => {
    const [stocks, setStocks] = useState([]);
    const [bistData, setBistData] = useState({ lastBist: '', degisim: '', hacim: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        fetch(BaseUrl() + 'api/trader')
            .then(response => response.json())
            .then(data => {
                const processedStocks = data.result.map(stock => ({
                    name: stock.Name,
                    price: stock.Fiyat,
                    change: stock.Degisim,
                }));
                setStocks(processedStocks);

                setBistData({
                    lastBist: data.BistData.lastBist,
                    degisim: data.BistData.degisim,
                    hacim: data.BistData.hacim,
                });

                setLoading(false);
            })
            .catch(error => {
                console.error('Veri alınamadı:', error);
                setLoading(false);
            });
    }, []);

    const filteredStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };
    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <View style={styles.bistContainer}>
                        <Text style={styles.bistTitle}>BIST100</Text>
                        <View style={styles.separator2}></View>
                        <Text style={[styles.bistValue, bistData.degisim.startsWith('+') ? styles.greenText : styles.redText]}>
                            {bistData.lastBist}
                        </Text>
                        <Text style={[styles.bistChange, bistData.degisim.startsWith('+') ? styles.greenText : styles.redText]}>
                            {bistData.degisim}
                        </Text>
                        <Text style={styles.bistHacim}>Hacim: {bistData.hacim} min lot TL</Text>
                    </View>

                    <View style={styles.hisselerContainer}>
                        <View style={styles.hisselerHeader}>
                            <Text style={styles.hisselerTitle}>Hisseler</Text>
                            <TouchableOpacity style={styles.searchIcon} onPress={toggleSearch}>
                                <Feather name={searchVisible ? 'x' : 'search'} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separator}></View>
                        {searchVisible && (
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Hisse Ara"
                                onChangeText={text => setSearchQuery(text)}
                                value={searchQuery}
                            />
                        )}
                        <FlatList
                            data={filteredStocks}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={!filteredStocks.length ? (<Text style={{ textAlign: 'center' }}>Hisse bulunamadı</Text>) : null}
                            renderItem={({ item }) => (
                                <View style={[styles.stockContainer, item.change.startsWith('+') ? styles.greenBackground : styles.redBackground]}>
                                    <Text style={styles.stockName}>{item.name}</Text>
                                    <Text style={styles.stockPrice}>{item.price}</Text>
                                    <Text style={styles.stockChange}>{item.change}</Text>
                                </View>
                            )}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    bistContainer: {
        alignItems: 'center',
        backgroundColor: 'lightblue',
        padding: 10,
        width: '90%',
        borderRadius: 5,
        marginTop: 290,
        marginBottom: 10,
    },
    bistTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bistValue: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    bistChange: {
        fontSize: 20,
    },
    bistHacim: {
        fontSize: 16,
    },
    greenText: {
        color: 'green',
    },
    redText: {
        color: 'red',
    },
    hisselerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchIcon: {
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hisselerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        width: '90%',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 10,
        width: '100%',
    },
    separator2: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 10,
    },
    searchInput: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 20,
        paddingRight: 10,
    },
    stockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    greenBackground: {
        backgroundColor: 'green',
    },
    redBackground: {
        backgroundColor: 'red',
    },
    stockName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    stockPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    stockChange: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default HomeScreen;
