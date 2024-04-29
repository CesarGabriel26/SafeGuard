import React from "react"
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as Animar from 'react-native-animatable'
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../styles/meusEstilos"

const Inicio = ({navigation}) => {
    return (
        <ImageBackground source={require('../../assets/bg.png')} resizeMode="cover" style={meusEstilos.conteudoHeader}>
            <View style={styles.logo}>
                <Animar.Image
                    source={require('../../assets/logo.png')}
                    animation='flipInY'
                    style={{ width: '100%' }}
                    resizeMode="contain" 
                />
            </View>
            <Animar.View animation='fadeInUp' delay={600} style={meusEstilos.conteudoCorpo}>
                <Text style={styles.apresentacao} >Texto de apresentação do app!</Text>
                <Text style={styles.titulo}> Faça o login para começar </Text>
                <TouchableOpacity style={meusEstilos.botao} onPress={() => navigation.navigate('Login')}>
                    <Text style={meusEstilos.textoBotao}> Acessar </Text>
                </TouchableOpacity>
            </Animar.View>
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

export default Inicio