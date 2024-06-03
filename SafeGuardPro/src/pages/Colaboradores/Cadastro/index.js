import React, { useEffect, useState } from "react"
import { ImageBackground, Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import * as Animar from 'react-native-animatable'
import { Picker } from '@react-native-picker/picker';
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../../styles/meusEstilos"
import { BuscarEnderecoViaCep, Cadastrar_EditarColaborador, CallLogin, DeletarColaborador } from "../../../components/api_call";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const Cadastro = ({ navigation, route }) => {
    const [Id, setId] = useState(0)

    const [Usuario, setUsuario] = useState("")
    const [Email, setEmail] = useState("")

    const [Senha, setSenha] = useState("")
    const [ShowPassWord, setShowPassWord] = useState(false)

    const [tipoAcesso, setTipoAcesso] = useState('')
    const [CPF, setCPF] = useState("")
    const [Cargo, setCargo] = useState("")
    const [Cep, setCep] = useState("")
    const [Endereco, setEndereco] = useState("")
    const [Nr, setNr] = useState("")
    const [Bairro, setBairro] = useState("")
    const [Cidade, setCidade] = useState("")
    const [Estado, setEstado] = useState("")

    const BuscarEndereco = async () => {
        // Remova os pontos e traços do CEP para contar apenas os dígitos
        const cepLimpo = Cep.replace(/\D/g, ''); // Remove tudo exceto os dígitos

        if (cepLimpo.length !== 8) {
            return; // Retorna sem fazer a busca se o CEP não tiver 8 dígitos
        }

        try {
            const data = await BuscarEnderecoViaCep(cepLimpo);
            setEndereco(data.logradouro)
            setBairro(data.bairro)
            setCidade(data.localidade)
            setEstado(data.uf)
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        }
    }

    const Finalizar = async () => {
        const data = {
            "bairro": Bairro,
            "cargo": Cargo,
            "cep": Cep,
            "cidade": Cidade,
            "cpf": CPF,
            "email": Email,
            "endereco": Endereco,
            "estado": Estado,
            "nome": Usuario,
            "nr": Nr,
            "senha": Senha,
            "setor": tipoAcesso
        }

        for (const key in data) {
            if (data[key] == "") {
                Alert.alert('Todos os campos deven ser preenchidos');
                alert('Todos os campos deven ser preenchidos')
                return
            }
        }


        const userId = route.params ? route.params.colaborador.id : null

        try {
            const resp = await Cadastrar_EditarColaborador(data, userId, !!userId);
            navigation.goBack()
        } catch (error) {
            console.error('Erro ao cadastrar/alterar colaborador:', error.message);
            // Trate o erro conforme necessário (exibir mensagem de erro, etc.)
        }
    }

    const DeletarUsuario = async () => {
        try {

            let resp = await DeletarColaborador(Id)
            Alert.alert(resp.message)
            alert(resp.message)
            navigation.goBack()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (route.params) {
            const { colaborador } = route.params

            setId(colaborador.id)

            setUsuario(colaborador.nome)
            setEmail(colaborador.email)
            setSenha(colaborador.senha)
            setTipoAcesso(colaborador.setor)
            setCPF(colaborador.cpf)
            setCargo(colaborador.cargo)
            setCep(colaborador.cep)
            setEndereco(colaborador.endereco)
            setNr(colaborador.nr)
            setBairro(colaborador.bairro)
            setCidade(colaborador.cidade)
            setEstado(colaborador.estado)
        }

        console.log(Id);

    }, [])

    useEffect(() => {
        BuscarEndereco()
    }, [Cep])

    return (
        <ImageBackground source={require('../../../assets/bg.png')} resizeMode="cover" style={meusEstilos.ScreenBody}>
            <Animar.View animation={'fadeInUp'} style={[meusEstilos.conteudoCorpo, { padding: 20, paddingTop: 20, borderRadius: 25 }]}>

                <View style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botao}>
                        <Image resizeMode="stretch" style={{ width: '100%', height: '100%' }} source={require('../../../assets/ProjetoEPI_voltar.png')} />
                    </TouchableOpacity>
                    {
                        route.params ? (
                            <TouchableOpacity style={styles.botao} onPress={DeletarUsuario}>
                                <MaterialIcons name="delete" size={20} color={corBranco} />
                            </TouchableOpacity>
                        ) : null
                    }

                </View>

                <ScrollView style={{ paddingHorizontal: 20 }}>

                    <View>
                        <Text>Nome:</Text>
                        <TextInput
                            placeholder="Nome..."
                            style={styles.inputLogin}
                            value={Usuario}
                            onChangeText={setUsuario}
                        />
                    </View>

                    <View>
                        <Text>Email:</Text>
                        <TextInput
                            placeholder="Email..."
                            style={styles.inputLogin}
                            value={Email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View>
                        <Text>Senha:</Text>
                        <View style={{ flexDirection: 'row', position: "relative" }}>
                            <TextInput
                                placeholder="Senha..."
                                style={styles.inputLogin} secureTextEntry={!ShowPassWord}
                                value={Senha}
                                onChangeText={setSenha}
                            />

                            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setShowPassWord(!ShowPassWord)} >
                                <MaterialIcons name={ShowPassWord ? "visibility-off" : "visibility"} size={20} color={corPrincipal} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text>Setor:</Text>
                        <TextInput
                            placeholder="Setor..."
                            style={styles.inputLogin}
                            value={tipoAcesso}
                            onChangeText={setTipoAcesso}
                        />
                        {/* <Picker
                        selectedValue={tipoAcesso}
                        onValueChange={(itemValue, itemIndex) => {
                            setTipoAcesso(itemValue)
                            LoadList()
                        }}
                        style={styles.inputLogin}
                    >
                        <Picker.Item label="Administração" value="administração" />
                        <Picker.Item label="Logistica" value="logistica" />
                    </Picker> */}
                    </View>

                    <View>
                        <Text>CPF:</Text>
                        <TextInput
                            placeholder="CPF..."
                            style={styles.inputLogin}
                            value={CPF}
                            onChangeText={setCPF}
                        />
                    </View>

                    <View>
                        <Text>Cargo:</Text>
                        <TextInput
                            placeholder="Cargo..."
                            style={styles.inputLogin}
                            value={Cargo}
                            onChangeText={setCargo}
                        />
                    </View>

                    <View>
                        <Text>CEP:</Text>
                        <TextInput
                            placeholder="CEP..."
                            style={styles.inputLogin}
                            value={Cep}
                            onChangeText={setCep}
                        />
                    </View>

                    <View>
                        <Text>Rua:</Text>
                        <TextInput
                            placeholder="Rua..."
                            style={styles.inputLogin}
                            value={Endereco}
                            onChangeText={setEndereco}
                        />

                    </View>

                    <View>
                        <Text>Numero:</Text>
                        <TextInput
                            placeholder="Numero..."
                            style={styles.inputLogin}
                            value={Nr}
                            onChangeText={setNr}
                        />
                    </View>

                    <View>
                        <Text>Bairro:</Text>
                        <TextInput
                            placeholder="Bairro..."
                            style={styles.inputLogin}
                            value={Bairro}
                            onChangeText={setBairro}
                        />
                    </View>

                    <View>
                        <Text>Cidade:</Text>
                        <TextInput
                            placeholder="Cidade..."
                            style={styles.inputLogin}
                            value={Cidade}
                            onChangeText={setCidade}
                        />
                    </View>

                    <View>
                        <Text>Estado:</Text>
                        <TextInput
                            placeholder="Estado..."
                            style={styles.inputLogin}
                            value={Estado}
                            onChangeText={setEstado}
                        />
                    </View>


                </ScrollView>

                <TouchableOpacity style={[meusEstilos.botao, { backgroundColor: corPrincipal }]} onPress={Finalizar} >
                    <Text style={[meusEstilos.textoBotao, { color: corBranco }]}> {route.params ? "Atualizar" : "Cadastrar"} </Text>
                </TouchableOpacity>

            </Animar.View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: corBranco
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    picker: {
        backgroundColor: corBranco,
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 20,
        marginTop: 28
    },
    inputLogin: {
        width: '100%',
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16,
        paddingRight: 35,
        marginBottom: 15
    },
    botao: {
        backgroundColor: corPrincipal,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10

    }
})

export default Cadastro