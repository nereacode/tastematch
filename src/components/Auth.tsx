import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'


type AuthProps = {
  onLogin: () => void
}

function Auth({ onLogin }: AuthProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [message, setMessage] = useState('')

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setMessage('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
        return
      }

      setMessage(
        'Account created. Check your email if confirmation is required.',
      )
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    onLogin()
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <p className="eyebrow">TASTEMATCH</p>

        <h1>
          {mode === 'login' ? 'WELCOME BACK.' : 'JOIN TASTEMATCH.'}
        </h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit" className="primary-button">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <button
          className="auth-switch"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login')
            setMessage('')
          }}
        >
          {mode === 'login'
            ? 'Need an account? Sign up'
            : 'Already have an account? Log in'}
        </button>
      </div>
    </main>
  )
}

export default Auth