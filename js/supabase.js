// Importando o cliente Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Configuração do cliente Supabase
const supabaseUrl = 'https://ptpkkcwpqmixeujnuhop.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cGtrY3dwcW1peGV1am51aG9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTQxMjksImV4cCI6MjA2MDM5MDEyOX0.sasqVGgXVLRzTZF-YpiTj5qD4H3EI3OQIc9W27ITGl8'
const supabase = createClient(supabaseUrl, supabaseKey)

// Funções de autenticação
export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    return { data, error }
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    return { data, error }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
}

export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
}

// Exportando o cliente para uso em outros arquivos
export { supabase } 