import React from 'react';
import styles from './AddProductPrinting.module.css';
import { useNavigate, useLocation } from 'react-router-dom';


function AddProductPrinting() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, selectedProduct, receiptId } = location.state || {};

    const handleDone = async () => {
    navigate('/');
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-GB');
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getReceiptId = () => {
    if (receiptId) return receiptId;
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `RID${randomNum}`;
  };

  const getProductPrice = () => {
    if (!selectedProduct) return 2.75;
    switch (selectedProduct.title) {
      case '7-Day Pass': return 25.00;
      case '30-Day Pass': return 85.00;
      case 'Stored Value': return 10.00;
      default: return 2.75;
    }
  };

  const cardId = cardNumber || '012$209720';
  const product = selectedProduct?.title || 'Over Time Toskett';
  const date = getCurrentDate();
  const time = getCurrentTime();
  const finalReceiptId = getReceiptId();
  
  console.log('=== AddProductPrinting Debug ===');
  console.log('receiptId from state:', receiptId);
  console.log('finalReceiptId calculated:', finalReceiptId);
  console.log('cardNumber from state:', cardNumber);
  console.log('selectedProduct from state:', selectedProduct);

  return (
    <div className={styles.formBox}>
      <div className={styles.printingTitle}>Printing...</div>
      <div className={styles.receiptWrapper}>
        <div className={styles.receipt}>
          <div className={styles.receiptRow}><span>Card ID</span><span>{cardId}</span></div>
          <div className={styles.receiptRow}><span>Product</span><span>{product}</span></div>
          <div className={styles.receiptRow}><span>Date</span><span>{date}</span></div>
          <div className={styles.receiptRow}><span>Time</span><span>{time}</span></div>
          <div className={styles.receiptRow}><span>Receipt ID</span><span>{finalReceiptId}</span></div>
        </div>
      </div>
      <button className={styles.doneButton} onClick={handleDone}>Done</button>
    </div>
  );
}

export default AddProductPrinting; 