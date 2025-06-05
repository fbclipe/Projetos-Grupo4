// pages/UserRegisterPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cadastrarUsuario, isValidEmail, isValidPassword, isValidUsername } from '../services/UserService.js';

const UserRegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Atualizar dados do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro específico quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulário
  const validateForm = () => {
    const newErrors = {};

    // Validar username
    if (!formData.username.trim()) {
      newErrors.username = 'Username é obrigatório';
    } else if (!isValidUsername(formData.username)) {
      newErrors.username = 'Username deve ter pelo menos 3 caracteres e conter apenas letras, números e underscore';
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    // Validar confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      await cadastrarUsuario(userData);
      setSuccessMessage('Usuário cadastrado com sucesso!');
      
      // Limpar formulário
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      
      let errorMessage = 'Erro ao cadastrar usuário';
      
      if (error.response) {
        // Erro do servidor (4xx, 5xx)
        errorMessage = error.response.data || `Erro ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // Erro de rede
        errorMessage = 'Erro de conexão. Verifique se o servidor está rodando.';
      } else {
        // Outro tipo de erro
        errorMessage = error.message || 'Erro desconhecido';
      }
      
      setErrors({
        submit: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Cadastrando usuário...</div>;
  }

  return (
    <div className="main-content">
      <motion.div 
        className="contato-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Cadastro de Usuário</h1>
        
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              border: '1px solid #c3e6cb'
            }}
          >
            {successMessage}
          </motion.div>
        )}

        {errors.submit && (
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
            {errors.submit}
          </motion.div>
        )}

        <motion.form 
          className="contato-form" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
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
            transition={{ duration: 0.3, delay: 0.4 }}
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
            transition={{ duration: 0.3, delay: 0.5 }}
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

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirme sua senha"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#dc3545', fontSize: '0.875rem' }}
              >
                {errors.confirmPassword}
              </motion.span>
            )}
          </motion.div>

          <motion.button 
            type="submit" 
            disabled={loading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </motion.button>
        </motion.form>

        <motion.div 
          style={{ textAlign: 'center', marginTop: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>Já tem uma conta? <a href="/login" style={{ color: 'var(--color-primary)' }}>Faça login</a></p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserRegisterPage;