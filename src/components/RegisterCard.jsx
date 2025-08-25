import React, { useState, useEffect } from 'react';
import styles from './RegisterCard.module.css';
import { useNavigate } from 'react-router-dom';
import { issueCard, getAllCustomers, getAllCardTypes } from './api';

function RegisterCard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cardId: '',
    cardType: '',
    issueDate: '',
    customerId: '',
  });
  const [cardTypeOptions, setCardTypeOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [cardNumberError, setCardNumberError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const customers = await getAllCustomers();
        setCustomerOptions(customers);
        
        const cardTypes = await getAllCardTypes();
        setCardTypeOptions(cardTypes);
      } catch (error) {
        console.error('Error loading data:', error);
        setCardTypeOptions(['Account Based Card', 'Bank Card', 'Closed Loop Card']);
        setCustomerOptions([
          { id: 'C001', name: 'John Doe' },
          { id: 'C002', name: 'Jane Smith' },
        ]);
      }
    };
    
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardId') {
      if (value.length > 16) {
        setCardNumberError('Card number cannot be more than 16 digits');
        return;
      } else if (value.length < 16 && value.length > 0) {
        setCardNumberError('Card number must be exactly 16 digits');
      } else {
        setCardNumberError('');
      }
    }
    
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    navigate('/issuecard');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (form.cardId.length !== 16) {
      setCardNumberError('Card number must be exactly 16 digits');
      return;
    }
    
    setLoading(true);
    setStatus(null);
    
    try {
      const cardData = {
        card_id: form.cardId,
        card_type: form.cardType,
        customer_id: form.customerId,
        issue_date: form.issueDate,
        balance: 0,
        load_product: 'Basic Card'
      };

      const response = await issueCard(cardData);
      
      if (response.status === 'success') {
        setStatus(`✅ Card registered successfully! Card ID: ${response.data.card_id}, Customer: ${response.data.customer_name}, Balance: $${response.data.balance}`);
        setTimeout(() => {
          setForm({
            cardId: '',
            cardType: '',
            issueDate: '',
            customerId: '',
          });
          setStatus(null);
          setCardNumberError('');
          navigate('/issuecard');
        }, 3000);
      } else {
        setStatus(`❌ Failed to register card: ${response.message}`);
      }
    } catch (error) {
      console.error('Register card error:', error);
      if (error.detail) {
        setStatus(`❌ Error: ${error.detail}`);
      } else {
        setStatus('❌ Network error - please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formBox} onSubmit={handleRegister} autoComplete="off">
      <div className={styles.title}>Register Card</div>
      <div className={styles.subtitle}>Enter the details for the new transit card.</div>
      <div className={styles.inputGroup}>
        <label htmlFor="cardId">Card Number *</label>
        <input 
          id="cardId" 
          name="cardId" 
          type="text" 
          value={form.cardId} 
          onChange={handleChange} 
          className={styles.input} 
          placeholder="Enter valid card number (16 digits)"
          maxLength={16}
          required 
        />
        {cardNumberError && <div className={styles.errorText}>{cardNumberError}</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="cardType">Card Type *</label>
        <select
          id="cardType"
          name="cardType"
          value={form.cardType}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="">Select card type</option>
          {cardTypeOptions.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="issueDate">Issue Date *</label>
        <input
          id="issueDate"
          name="issueDate"
          type="date"
          value={form.issueDate}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="customerId">Customer *</label>
        <select
          id="customerId"
          name="customerId"
          value={form.customerId}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="">Select customer</option>
          {customerOptions.map((c) => (
            <option key={c.id} value={c.id}>{c.id} - {c.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        <button type="submit" className={styles.registerButton} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
      {status && <div className={`${styles.statusMessage} ${status.includes('✅') ? styles.success : styles.error}`}>{status}</div>}
    </form>
  );
}

export default RegisterCard; 