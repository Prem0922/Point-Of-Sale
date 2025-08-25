import React, { useEffect, useState } from 'react';
import styles from './AddProductCashChange.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { addProduct } from './api';

function AddProductCashChange() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct, startTime } = location.state || {};
  const [countdown, setCountdown] = useState(3);
  const [status, setStatus] = useState(null);

  const getProductPrice = () => {
    if (!selectedProduct) return 2.75;
    switch (selectedProduct.title) {
      case '7-Day Pass': return 25.00;
      case '30-Day Pass': return 85.00;
      case 'Stored Value': return 10.00;
      default: return 2.75;
    }
  };

  useEffect(() => {
    const processPayment = async () => {
      try {
        if (cardNumber && selectedProduct) {
          const productName = selectedProduct.title;
          const productValue = getProductPrice();
          
          const productResponse = await addProduct(cardNumber, productName, productValue);
          
          if (productResponse.status === 'success') {
            setStatus('Payment processed successfully');
          } else {
            setStatus('Payment processing failed');
          }
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        setStatus('Payment processing error');
      }
    };

    processPayment();
  }, [cardNumber, selectedProduct]);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          navigate('/add-product-cash-success', { 
            state: { 
              cardNumber: cardNumber, 
              selectedProduct: selectedProduct,
              startTime: startTime
            } 
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [navigate, cardNumber, selectedProduct, startTime]);

  return (
    <div className={styles.formBox}>
      <div className={styles.successTitle}>Purchase Successful</div>
      <div className={styles.changeText}>Issuing <span>${(getProductPrice() * 0.1).toFixed(2)}</span> in change ...</div>
      {status && <div className={styles.status}>{status}</div>}
      <div className={styles.countdown}>Advancing in {countdown} second{countdown !== 1 ? 's' : ''}...</div>
    </div>
  );
}

export default AddProductCashChange; 