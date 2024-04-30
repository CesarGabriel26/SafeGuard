import React from "react"
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as Animar from 'react-native-animatable'
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../../styles/meusEstilos"

const Home = ({ navigation }) => {
    return (
        <ImageBackground source={require('../../../assets/bg.png')} resizeMode="cover" style={meusEstilos.conteudoHeader}>
            <View style={{ backgroundColor: '#fff',marginLeft: 30, marginRight: 30, marginTop: 15, marginBottom: 15, paddingLeft: 10, paddingBottom: 10 }}>
                <Text style={styles.apresentacao} > Colaborador: </Text>
                <Text style={styles.apresentacao} > Carlos </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.texto}> EPI’s vinculadas 3 </Text>  
                <TouchableOpacity style={{ fontSize: 14, fontWeight: 'bold', marginTop: 15, marginLeft: 100, }}> 
                    <Text>Ver mais</Text> 
                </TouchableOpacity>  
            </View>
            <View style={styles.apresentacaoPrincipal}>
                <Text style={styles.apresentacao} > Nome EPI </Text>
                <Text style={styles.apresentacao} > Validade: 04/03/2020 </Text>
            </View>
            <View style={styles.apresentacaoPrincipal}>
                <Text style={styles.apresentacao} > Nome EPI </Text>
                <Text style={styles.apresentacao} > Validade: 04/03/2020 </Text>
            </View>
            <View style={styles.apresentacaoPrincipal}>
                <Text style={styles.apresentacao} > Nome EPI </Text>
                <Text style={styles.apresentacao} > Validade: 04/03/2020 </Text>
            </View>
            
            <Text style={styles.texto}> Notificação </Text>  
            
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    logo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    apresentacaoPrincipal: {
        backgroundColor: '#fff',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    apresentacao: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 15,
    },
    texto: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 20,
    },
    titulo: {
        color: corTitulo
    },
})

export default Home