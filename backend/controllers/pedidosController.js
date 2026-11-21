const db = require('../database/init');

const ESTADOS_VALIDOS = ['Pendiente', 'En preparación', 'Listo', 'Entregado'];

function listarPedidos(req, res) {
  const { estado, cliente } = req.query;
  let sql = 'SELECT * FROM pedidos WHERE 1=1';
  const params = [];

  if (estado && estado !== 'Todos') {
    sql += ' AND estado = ?';
    params.push(estado);
  }
  if (cliente) {
    sql += ' AND LOWER(cliente_nombre) LIKE ?';
    params.push(`%${cliente.toLowerCase()}%`);
  }
  sql += ' ORDER BY id DESC';

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al consultar pedidos' });
    res.json(rows);
  });
}

function crearPedido(req, res) {
  const { cliente_nombre, cliente_telefono, producto, cantidad, fecha_entrega, total, notas } = req.body;

  if (!cliente_nombre || !cliente_telefono || !producto || !fecha_entrega) {
    return res.status(400).json({ error: 'Faltan campos obligatorios del pedido' });
  }

  const sql = `
    INSERT INTO pedidos (cliente_nombre, cliente_telefono, producto, cantidad, fecha_entrega, estado, total, notas)
    VALUES (?, ?, ?, ?, ?, 'Pendiente', ?, ?)
  `;
  const params = [
    cliente_nombre.trim(),
    cliente_telefono.trim(),
    producto.trim(),
    Number(cantidad) || 1,
    fecha_entrega,
    Number(total) || 0,
    notas ? notas.trim() : ''
  ];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: 'Error al registrar pedido' });
    res.status(201).json({ id: this.lastID, mensaje: 'Pedido registrado con éxito' });
  });
}

function actualizarEstado(req, res) {
  const { id } = req.params;
  const { estado } = req.body;

  if (!ESTADOS_VALIDOS.includes(estado)) {
    return res.status(400).json({ error: 'Estado de pedido no válido' });
  }

  db.run('UPDATE pedidos SET estado = ? WHERE id = ?', [estado, id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al actualizar pedido' });
    if (this.changes === 0) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json({ mensaje: 'Estado actualizado correctamente' });
  });
}

function eliminarPedido(req, res) {
  const { id } = req.params;
  db.run('DELETE FROM pedidos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar pedido' });
    if (this.changes === 0) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json({ mensaje: 'Pedido eliminado correctamente' });
  });
}

module.exports = { listarPedidos, crearPedido, actualizarEstado, eliminarPedido };