import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'

export default function BackGroundImageComponent() {
    return (
        <ImageBackground source={require('../assets/receps.png')} style={styles.backgroundImage}>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center', // İçeriği dikey olarak ortala
    },
})