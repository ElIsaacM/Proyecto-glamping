// config/cors.js
const dominiosPermitidos = [
  process.env.NGROK_FRONTEND_URL,
  'http://localhost:5173'
];

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || dominiosPermitidos.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
};