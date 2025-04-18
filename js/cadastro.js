import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const authMessage = document.getElementById('mensagem');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('senha').value.trim();

        if (!email || !password) {
            authMessage.textContent = 'Por favor, preencha todos os campos.';
            authMessage.style.display = 'block';
            authMessage.className = 'auth-message error';
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                authMessage.textContent = 'Erro: ' + error.message;
                authMessage.style.display = 'block';
                authMessage.className = 'auth-message error';
                return;
            }

            authMessage.textContent = 'Cadastro realizado com sucesso!';
            authMessage.style.display = 'block';
            authMessage.className = 'auth-message success';

            setTimeout(() => {
                window.location.href = './login.html';
            }, 1000);
        } catch (err) {
            authMessage.textContent = 'Erro inesperado. Tente novamente.';
            authMessage.style.display = 'block';
            authMessage.className = 'auth-message error';
        }
    });
});