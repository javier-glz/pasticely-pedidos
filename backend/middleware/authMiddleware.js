function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso no autorizado: falta token de sesión' });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  if (token !== 'pasticely-token-2026') {
    return res.status(403).json({ error: 'Token inválido o sin permisos' });
  }
  next();
}

module.exports = { verificarToken };

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('Acceso denegado: falta token');
    return res.status(401).json({ error: 'Acceso no autorizado: falta token de sesión' });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  if (token !== 'pasticely-token-2026') {
    console.log('Acceso denegado: token inválido');
    return res.status(403).json({ error: 'Token inválido o sin permisos' });
  }
  console.log(`Token válido recibido: ${token}`);
  next();
}
