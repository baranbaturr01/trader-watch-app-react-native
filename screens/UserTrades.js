import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard, // Klavyeyi kontrol etmek için Keyboard ekleyin
} from 'react-native';
import BaseUrl from '../data/BaseUrl';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';

const UserTrades = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [userStocks, setUserStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newStock, setNewStock] = useState({ name: '', price: '', volume: '', value: '', date: '' });

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    }
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        setNewStock({ ...newStock, date: date.toISOString() }); // Seçilen tarihi yeni hisse nesnesine ekleyin
        hideDatePicker();

    }

    useEffect(() => {
        fetchStockDataFromBackend();
    }, []);

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
            setLoading(false);
            if (data.success) {
                setUserStocks(data.data.userStocks);
            } else {
                console.error('Veri çekme hatası:', data.error);
            }
        } catch (error) {
            console.error('Veri çekme hatası:', error);
        }
    };

    const renderStockCard = ({ item }) => (
        <View style={styles.stockCard}>
            <View style={styles.stockHeader}>
                <Text style={styles.stockName}>{item.name}</Text>
                <Text style={styles.stockDate}>Alış Tarihi: {formatDate(item.date)}</Text>
            </View>
            <View style={styles.stockInfo}>
                <Text style={styles.stockInfoText}>Fiyat: {formatPrice(item.price)}</Text>
                <Text style={styles.stockInfoText}>Volume: {item.volume}</Text>
                <Text style={styles.stockInfoText}>Toplam Değer: {formatPrice(item.value)}</Text>
            </View>
            <View style={styles.stockActions}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditStock(item)}>
                    <Feather name="edit" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteStock(item._id)}>
                    <Feather name="trash-2" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleEditStock = (stock) => {
        // Düzenleme işlemi için bir modal açabilirsiniz
        // stock nesnesini düzenlemek için bir form ekleyebilirsiniz
        // Düzenleme işlemi tamamlandığında verileri güncellemelisiniz
    };

    const handleDeleteStock = (stockId) => {
        // Silme işlemi için backend'e istek atabilirsiniz
        // Kullanıcıyı onaylaması için bir onay iletişim kutusu gösterebilirsiniz
    };

    const handleAddStock = async () => {
        try {
            const requestUrl = BaseUrl() + 'api/user-stocks';
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': global.token,
                },
                body: JSON.stringify(newStock),
            });

            const data = await response.json();
            if (data.success) {
                setModalVisible(false);
                setNewStock({ name: '', price: '', volume: '', value: '', date: '' });
                fetchStockDataFromBackend();
            } else {
                console.error('Hisse ekleme hatası:', data.error);
            }
        } catch (error) {
            console.error('Hisse ekleme hatası:', error);
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', options);
    };

    const formatPrice = (price) => {
        return parseFloat(price).toFixed(2) + ' ₺';
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Kullanıcı Hisseleri</Text>
                <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                    <Feather name="plus" size={30} color="white" />
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    style={styles.stockList}
                    data={userStocks}
                    renderItem={renderStockCard}
                    keyExtractor={(item) => item._id}
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Yeni Hisse Ekle</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Hisse Adı"
                            placeholderTextColor={'grey'}
                            onChangeText={(text) => setNewStock({ ...newStock, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Fiyat"
                            placeholderTextColor={'grey'}
                            onChangeText={(text) => setNewStock({ ...newStock, price: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Adet"
                            placeholderTextColor={'grey'}
                            onChangeText={(text) => setNewStock({ ...newStock, volume: text })}
                        />
                        <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
                            <Text style={styles.dateButtonText}>
                                {selectedDate ? selectedDate.toDateString() : 'Alış Tarihi Seç'}
                            </Text>
                            <Feather name="calendar" size={20} color="black" />
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirmDate}
                            onCancel={hideDatePicker}
                        />
                        <TouchableOpacity style={styles.addButtonForModal} onPress={handleAddStock}>
                            <Text style={styles.buttonText}>Ekle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                            toggleModal();
                            Keyboard.dismiss();
                        }}>
                            <Text style={styles.buttonText}>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232D3F',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    addButton: {
        backgroundColor: '#005B41',
        padding: 10,
        borderRadius: 20,
    },
    stockCard: {
        backgroundColor: '#008170',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    stockHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    stockName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    stockDate: {
        fontSize: 14,
        color: 'lightgray',
    },
    stockInfo: {},
    stockInfoText: {
        fontSize: 16,
    },
    stockActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    editButton: {
        marginRight: 10,
    },
    deleteButton: {
        marginRight: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#232D3F',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'white', // Input metin rengini beyaz olarak ayarlar
    },
    addButtonForModal: {
        backgroundColor: 'lightgreen',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'lightcoral',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    scrollViewContainer: {
        flexGrow: 1, // ScrollView içeriğini yukarı itmek için
    },
    dateButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    dateButtonText: {
        fontSize: 16,
    },
});

export default UserTrades;
