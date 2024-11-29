import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from '@/styles/order-history/OrderHistoryInformationSection.module.css'

export const OrderHistoryInformationComponent = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleClear = () => {
    setSelectedDate('');
  };

  return (
    <div className={styles["information-section"]}>
      <div className={styles["grid-container"]}>
        <div className={styles["first-column"]}>
          <div className={styles["info-item"]}>
            <h2>Name: <span>Jefersson</span></h2>
          </div>
          <div className={styles["info-item"]}>
            <h2>Email: <span>jefersoncoronel700@gmail.com</span></h2>
          </div>
        </div>

        <div className={styles["second-column"]}>
          <div className={styles["date-picker-container"]}>
            <div className={styles["date-picker-wrapper"]}>
              <input
                placeholder="Select a date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles["date-input"]}
              />
              {selectedDate && (
                <button
                  onClick={handleClear}
                  className={styles["clear-button"]}
                >
                  <FaTrash size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryInformationComponent;