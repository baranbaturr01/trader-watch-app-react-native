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
    buttonText: {
        color: 'white',
        fontSize: 20,
    }
})
