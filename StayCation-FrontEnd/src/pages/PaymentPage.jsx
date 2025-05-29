import React, { useState } from "react";

const CheckoutPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    // Validera och skicka betalning till backend
  };

  return (
    <div>
      <h2>Betalning</h2>
      {/* Visa bokningssammanfattning här */}
      <form onSubmit={handlePayment}>
        <input type="text" placeholder="Kortnummer" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required />
        <input type="text" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} required />
        <input type="text" placeholder="CVC" value={cvc} onChange={e => setCvc(e.target.value)} required />
        <button type="submit">Betala</button>
        {error && <p style={{color: "red"}}>{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutPage;