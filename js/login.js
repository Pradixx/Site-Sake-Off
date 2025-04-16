import { signIn } from './supabase.js'

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm')
    const authMessage = document.getElementById('authMessage')

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try {
            const { data, error } = await signIn(email, password)
            
            if (error) {
                authMessage.textContent = error.message
                authMessage.className = 'auth-message error'
                return
            }

            // Login bem sucedido
            authMessage.textContent = 'Login realizado com sucesso!'
            authMessage.className = 'auth-message success'
            
            // Redirecionar para a página inicial após 1 segundo
            setTimeout(() => {
                window.location.href = '../index.html'
            }, 1000)

        } catch (error) {
            authMessage.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente.'
            authMessage.className = 'auth-message error'
        }
    })
}) 