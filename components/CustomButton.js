import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function CustomButton(props) {

    const { title } = props;
    const { onPress } = props;
    const { style } = props;

    return (
        <TouchableOpacity style={style}>
            <Text style={styles.buttonText} onPress={
                onPress
            }>{title}</Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 12,
        width: '50%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
    }
})
