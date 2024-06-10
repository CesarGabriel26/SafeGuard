import React, {useState, useEffect} from "react"
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as Animar from 'react-native-animatable'
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../styles/meusEstilos"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Inicio = ({ navigation }) => {

    const [logo, setLogo] = useState('');

    useEffect(() => {
        const getLogo = async () => {
            let data = await AsyncStorage.getItem("Logo");
            if (data == '2') {
                setLogo(require('../../assets/logo2.png'));
            } else {
                setLogo(require('../../assets/logo.png')); // fallback para o logo padrão
            }
        };

        getLogo();
    }, []);

    return (
        <ImageBackground source={require('../../assets/bg.png')} resizeMode="repeat" style={meusEstilos.conteudoHeader}>
            <View style={styles.logo}>
                <Animar.Image
                    source={logo}
                    animation='zoomIn'
                    style={{ width: 250 }}
                    resizeMode="contain"
                />
            </View>
            <Animar.View animation='fadeInUp' delay={600} style={[meusEstilos.conteudoCorpo, styles.conteudoCorpo]}>

                <Text style={styles.apresentacao} >Aproveite os melhores recursos que o SafeGuard Pro pode oferecer.</Text>

                <TouchableOpacity style={meusEstilos.botao} onPress={() => navigation.navigate('Login')}>
                    <Text style={meusEstilos.textoBotao}> Acessar </Text>
                </TouchableOpacity>

                <Text style={styles.titulo}>Um aplicativo por SafetyNet Technoogies!</Text>

                <View style={styles.logoSafeNet}>
                    <Animar.Image
                        source={require('../../assets/SafeNetLogo.png')}
                        animation='zoomIn'
                        style={{ width: '100%' }}
                        resizeMode="contain"
                    />
                </View>
            </Animar.View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    conteudoCorpo: { flex: 4, backgroundColor: 'transparent' },
    logo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoSafeNet: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    apresentacao: {
        color: corBranco,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 12,
    },
    titulo: {
        marginTop: 20,
        color: corBranco
    },
})

export default Inicio