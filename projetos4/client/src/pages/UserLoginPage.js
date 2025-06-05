// src/pages/UserLoginPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Certifique-se de que loginUsuario, isValidEmail, isValidPassword estão disponíveis
import { loginUsuario, isValidEmail, isValidPassword } from '../services/UserService.js';
import { useNavigate } from 'react-router-dom';

const UserLoginPage = () => {
  const [formData, setFormData] = useState({
    username: '', // Adicionando o campo username no estado do formulário
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setErrorMessage('');
  };

  const validateForm = () => {
    const newErrors = {};

    // Validação para o username (agora obrigatório para o login)
    if (!formData.username.trim()) {
      newErrors.username = 'Username é obrigatório';
    }
    // Não precisa de isValidUsername aqui, pois o backend fará a validação de credenciais

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // O objeto userData agora incluirá o username, email e password
      // para corresponder ao que o backend espera no objeto 'User' completo.
      const userData = {
        username: formData.username, // <--- CAMPO ADICIONADO AQUI
        email: formData.email,
        password: formData.password
      };

      console.log("Payload enviado para login:", userData); 
      
      const response = await loginUsuario(userData);
      console.log('Login bem-sucedido:', response);
      
      navigate('/homeadm'); 

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      
      let msg = 'Erro ao fazer login. Por favor, tente novamente.';
      if (error.response) {
        // Se o backend ainda retornar 400 por alguma validação no User completo,
        // mas agora com o username, as chances são menores.
        // O erro do backend 'nome ou senha incorretos' virá no 'error.response.data'.
        msg = error.response.data || `Erro ${error.response.status}: ${error.response.statusText}`;
        if (error.response.status === 401) { // 401 é mais apropriado para credenciais inválidas
             msg = error.response.data || 'Email ou senha inválidos. Por favor, verifique suas credenciais.';
        } else if (error.response.data) {
            msg = error.response.data; // O backend lança a mensagem diretamente no body
        }
      } else if (error.request) {
        msg = 'Erro de conexão. O servidor não respondeu.';
      } else {
        msg = error.message;
      }
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Entrando...</div>;
  }

  return (
    <div className="main-content">
      <motion.div 
        className="contato-page" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Login</h1>
        
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              border: '1px solid #f5c6cb'
            }}
          >
            {errorMessage}
          </motion.div>
        )}

        <motion.form 
          className="contato-form" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* CAMPO USERNAME ADICIONADO AQUI */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Digite seu username"
              disabled={loading}
              required // Tornar obrigatório no frontend
            />
            {errors.username && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#dc3545', fontSize: '0.875rem' }}
              >
                {errors.username}
              </motion.span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Digite seu email"
              disabled={loading}
              required
            />
            {errors.email && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#dc3545', fontSize: '0.875rem' }}
              >
                {errors.email}
              </motion.span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Digite sua senha"
              disabled={loading}
              required
            />
            {errors.password && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#dc3545', fontSize: '0.875rem' }}
              >
                {errors.password}
              </motion.span>
            )}
          </motion.div>

          <motion.button 
            type="submit" 
            disabled={loading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </motion.button>
        </motion.form>

        <motion.div 
          style={{ textAlign: 'center', marginTop: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserLoginPage;