const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/authMiddleware');
const {
  listarPedidos,
  crearPedido,
  actualizarEstado,
  eliminarPedido
} = require('../controllers/pedidosController');

router.get('/', verificarToken, listarPedidos);
router.post('/', verificarToken, crearPedido);
router.put('/:id/estado', verificarToken, actualizarEstado);
router.delete('/:id', verificarToken, eliminarPedido);

module.exports = router;