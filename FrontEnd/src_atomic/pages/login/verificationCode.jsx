import { useState } from "react";

function VerificationCode({ email, onSubmit, onBack, submitting, buttonText = "Completar" }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Código de verificación (enviado a {email})</label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        placeholder="Ingresa el código de 6 dígitos"
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Verificando...' : buttonText}
      </button>
      
      {onBack && (
        <button 
          type="button" 
          onClick={onBack} 
          disabled={submitting} 
          style={{ marginTop: '10px', background: '#ccc', color: '#333' }}
        >
          Volver
        </button>
      )}
    </form>
  );
}

export default VerificationCode;
