import { signUp } from './supabase.js'

document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm')
    const authMessage = document.getElementById('authMessage')

    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const nome = document.getElementById('nome').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value

        // Validação básica
        if (password !== confirmPassword) {
            authMessage.textContent = 'As senhas não coincidem!'
            authMessage.className = 'auth-message error'
            return
        }

        if (password.length < 6) {
            authMessage.textContent = 'A senha deve ter pelo menos 6 caracteres!'
            authMessage.className = 'auth-message error'
            return
        }

        try {
            const { data, error } = await signUp(email, password)
            
            if (error) {
                authMessage.textContent = error.message
                authMessage.className = 'auth-message error'
                return
            }

            // Cadastro bem sucedido
            authMessage.textContent = 'Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.'
            authMessage.className = 'auth-message success'
            
            // Limpar o formulário
            cadastroForm.reset()
            
            // Redirecionar para a página de login após 3 segundos
            setTimeout(() => {
                window.location.href = 'login.html'
            }, 3000)

        } catch (error) {
            authMessage.textContent = 'Ocorreu um erro ao tentar cadastrar. Tente novamente.'
            authMessage.className = 'auth-message error'
        }
    })
}) 