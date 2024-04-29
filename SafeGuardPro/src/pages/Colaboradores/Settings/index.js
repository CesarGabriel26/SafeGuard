import React from "react"
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as Animar from 'react-native-animatable'
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../../styles/meusEstilos"

const Settings = ({navigation}) => {
    return (
        <ImageBackground source={require('../../../assets/bg.png')} resizeMode="cover" style={meusEstilos.conteudoHeader}>
            <Text style={styles.apresentacao} >Settings</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    logo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    apresentacao: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 12,
    },
    titulo: {
        color: corTitulo
    },
})

export default Settings