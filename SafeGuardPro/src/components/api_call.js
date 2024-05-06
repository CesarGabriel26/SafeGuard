const cargosAutorizados = [
    "diretor",
    "administrador"
]

const IP = "http://192.168.0.107:5000"

//! Colaborador

async function CallLogin(email, senha) {
    try {
        const resp = await fetch(`${IP}/colaboradores/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": email,
                "senha": senha
            }),
        });

        if (!resp.ok) {
            throw new Error('Erro ao fazer login');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de login:', error);
        throw error;
    }
}

async function CallListColaboradores() {
    try {
        const resp = await fetch(`${IP}/colaboradores/listar`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao fazer obter colaboradores');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de colaboradores:', error);
        throw error;
    }
}

async function CallBuscarColaboradores(nome) {
    try {
        const resp = await fetch(`${IP}/colaboradores/obter/${nome}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao fazer obter colaboradores');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de colaboradores:', error);
        throw error;
    }
}

async function BuscarEnderecoViaCep(CEP) {
    //
    try {
        const resp = await fetch(`https://viacep.com.br/ws/${CEP}/json/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao fazer obter endereço');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de endereço:', error);
        throw error;
    }
}

async function Cadastrar_EditarColaborador(Userdata, id, alterarExistente) {
    const method = alterarExistente ? "PUT" : "POST"
    const link = alterarExistente ? `${IP}/colaboradores/alterar/${id}` : `${IP}/colaboradores/cadastrar`

    try {
        const resp = await fetch(link, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Userdata),
        });

        if (!resp.ok) {
            throw new Error('Erro ao fazer cadastrar ou alterar');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de login:', error);
        throw error;
    }
}

async function DeletarColaborador(id) {
    try {
        const resp = await fetch(`${IP}/colaboradores/deletar/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao deltar usuario');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro ao requisitar deltar usuario:', error);
        throw error;
    }
}

//! EPI ---- Colaborador

async function CallBuscaEpiPorColaborador(id) {

    try {
        const resp = await fetch(`${IP}/colab_epi/buscarPcolaborador/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao buscar epis');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de Epis:', error);
        throw error;
    }
}

async function Cadastrar_EditarRelacao(Data, id, alterarExistente) {
    const method = alterarExistente ? "PUT" : "POST"
    const link = alterarExistente ? `${IP}/colab_epi/alterar/${id}` : `${IP}/colab_epi/add`

    try {
        const resp = await fetch(link, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Data),
        });

        if (!resp.ok) {
            throw new Error('Erro ao fazer cadastrar ou alterar');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de login:', error);
        throw error;
    }
}

//! EPI

async function CallBuscaEpi(id) {

    try {
        const resp = await fetch(`${IP}/epi/buscar/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao buscar epis');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de Epis:', error);
        throw error;
    }
}

async function CallBuscaEpiPorNome(name) {

    try {
        const resp = await fetch(`${IP}/epi/buscar/${name}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao buscar epis');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de Epis:', error);
        throw error;
    }
}

async function CallListEpi() {
    try {
        const resp = await fetch(`${IP}/epi/listar`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao obter lista de epis');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de epis:', error);
        throw error;
    }
}

async function Cadastrar_EditarEpi(EpiData, id, alterarExistente) {
    const method = alterarExistente ? "PUT" : "POST"
    const link = alterarExistente ? `${IP}/epi/alterar/${id}` : `${IP}/epi/cadastrar`

    try {
        const resp = await fetch(link, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(EpiData),
        });

        if (!resp.ok) {
            throw new Error('Erro ao fazer cadastrar ou alterar');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de login:', error);
        throw error;
    }
}

async function DeletarEPI(id) {
    try {
        const resp = await fetch(`${IP}/epi/deletar/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao deltar Epi');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro ao requisitar deltar Epi:', error);
        throw error;
    }
}

//! Notificacoes

async function CallGetNotificacoes(id) {
    try {
        const resp = await fetch(`${IP}/notificacao/buscarPcolaborador/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
            throw new Error('Erro ao buscar epis');
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error('Erro na requisição de Epis:', error);
        throw error;
    }
}


export {
    cargosAutorizados,

    CallListEpi,
    CallBuscaEpi,
    CallBuscaEpiPorColaborador,
    CallBuscaEpiPorNome,
    Cadastrar_EditarEpi,
    DeletarEPI,

    CallLogin,
    CallListColaboradores,
    CallBuscarColaboradores,
    BuscarEnderecoViaCep,
    Cadastrar_EditarColaborador,
    DeletarColaborador,

    CallGetNotificacoes,
    Cadastrar_EditarRelacao
}