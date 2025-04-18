import { getCurrentUser, signOut, supabase } from './supabase.js'

document.addEventListener('DOMContentLoaded', async () => {
    // Verificar se o usuário está logado
    const { user, error } = await getCurrentUser()
    if (!user) {
        window.location.href = 'login.html'
        return
    }

    // Carregar dados do usuário
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Atualizar nome do usuário
    const nomeUsuario = document.getElementById('nomeUsuario')
    nomeUsuario.textContent = profile?.nome || user.email

    // Preencher formulário
    const formDados = document.getElementById('formDados')
    formDados.nome.value = profile?.nome || ''
    formDados.email.value = user.email
    formDados.telefone.value = profile?.telefone || ''

    // Gerenciar navegação
    const links = document.querySelectorAll('.conta-link')
    const secoes = document.querySelectorAll('.secao-conta')

    links.forEach(link => {
        if (link.tagName === 'A') {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const targetId = link.getAttribute('href').substring(1)
                
                // Atualizar classes ativas
                links.forEach(l => l.classList.remove('ativo'))
                link.classList.add('ativo')
                
                secoes.forEach(secao => {
                    secao.classList.remove('ativo')
                    if (secao.id === targetId) {
                        secao.classList.add('ativo')
                    }
                })
            })
        }
    })

    // Gerenciar logout
    const btnLogout = document.getElementById('btnLogout')
    btnLogout.addEventListener('click', async () => {
        const { error } = await signOut()
        if (!error) {
            window.location.href = '../index.html'
        }
    })

    // Gerenciar atualização de dados
    formDados.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const updates = {
            id: user.id,
            nome: formDados.nome.value,
            telefone: formDados.telefone.value,
            updated_at: new Date()
        }

        const { error } = await supabase
            .from('profiles')
            .upsert(updates)

        if (!error) {
            alert('Dados atualizados com sucesso!')
            nomeUsuario.textContent = updates.nome
        } else {
            alert('Erro ao atualizar dados. Tente novamente.')
        }
    })
}) 