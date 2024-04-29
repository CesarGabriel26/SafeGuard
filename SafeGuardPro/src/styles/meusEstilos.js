import { StyleSheet } from "react-native"

const corPrincipal = '#fc7303'
const corSecundaria = '#29292E'
const corBorda = '#CCC'
const corTexto = '#222'
const corTitulo = '#dfdfdf'
const corBranco = '#fff'

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
    botaoIcone: {
        borderColor: corPrincipal,
        backgroundColor: corBranco,
        borderWidth: 2,
        borderRadius: 25,
        marginHorizontal: 2,
        padding: 2,
    },
    botaoIcone2: {
        borderColor: corBranco,
        backgroundColor: corPrincipal,
        borderWidth: 2,
        borderRadius: 25,
        marginHorizontal: 2,
        padding: 2,
    },
    itemLista: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: corBorda,
    },
    imagemLista: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    controles: {
        flexDirection: 'row',
        marginBottom: 10,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    tituloLista: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: corBorda,
    },
    textContainer: {
        flex: 1,
    },
    preco: {
        fontSize: 18,
    },
    inputCad: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: corBranco
    },
})
export {
    corPrincipal,
    corSecundaria,
    corBorda,
    corTexto,
    corTitulo,
    corBranco,
    meusEstilos
}