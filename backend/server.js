require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('./database/init');
const pedidosRoutes = require('./routes/pedidosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Login sencillo para obtener token de sesión
app.post('/api/auth/login', (req, res) => {      // <-- CORREGIDO
  const { usuario, password } = req.body;
  if (usuario === 'admin@pasticely.com' && password === 'pasticely123') {
    return res.json({
      token: 'pasticely-token-2026',
      usuario: 'Administración Pasticely'
    });
  }
  res.status(401).json({ error: 'Credenciales incorrectas' });
});

app.use('/api/pedidos', pedidosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de Pasticely activo en http://localhost:${PORT}`);
});
