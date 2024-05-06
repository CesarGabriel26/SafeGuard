import { StyleSheet } from "react-native"

const corPrincipal = '#fc7303'
const corSecundaria = '#29292e'
const corBorda = '#CCC'
const corTexto = '#222'
const corTitulo = '#dfdfdf'
const corBranco = '#fff'
const corPreto = 'black'

const ScreenPadding = 25

const meusEstilos = StyleSheet.create({
    conteudoHeader: {
        flex: 1,
    },
    conteudoCorpo: {
        flex: 1,
        backgroundColor: corBranco,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: '5%',
        paddingTop: '2%',
    },
    botao: {
        backgroundColor: corBranco,
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    textoBotao: {
        fontSize: 18,
        color: corSecundaria,
        fontWeight: 'bold'
    },
    inputPesquisa: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: corBorda,
        borderRadius: 3,
        marginRight: 10,
        paddingLeft: 10,
        backgroundColor: corBranco
    },
    picker: {
        flex: 1,
        backgroundColor: corBranco,
        borderRadius: 3,
        height: 40,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: corBorda,
        marginRight: 8
    },
    ScreenBody: {
        flex: 1,
        gap: 25,
        padding: ScreenPadding, 
        flexDirection: 'column', 
        backgroundColor: corBranco,
    }

})

export {
    corPrincipal,
    corSecundaria,
    corBorda,
    corTexto,
    corTitulo,
    corBranco,
    meusEstilos,
    ScreenPadding,
    corPreto
}