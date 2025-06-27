import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      navigate('/');
    } catch {
      setError('Failed to sign up. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-light dark:bg-dark">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition-colors" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
} 