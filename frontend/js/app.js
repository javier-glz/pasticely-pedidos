const API_URL = 'http://localhost:3000/api';

let token = localStorage.getItem('pasticely_token') || '';

function actualizarVista() {
  const logueado = Boolean(token);
  document.getElementById('vistaLogin').classList.toggle('hidden', logueado);
  document.getElementById('vistaApp').classList.toggle('hidden', !logueado);
  document.getElementById('btnLogout').classList.toggle('hidden', !logueado);
  if (logueado) cargarPedidos();
}

document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = document.getElementById('loginUsuario').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password })
  });

  const data = await res.json();
  if (res.ok) {
    token = data.token;
    localStorage.setItem('pasticely_token', token);
    actualizarVista();
  } else {
    alert(data.error || 'Error al iniciar sesión');
  }
});

function cerrarSesion() {
  token = '';
  localStorage.removeItem('pasticely_token');
  actualizarVista();
}

document.getElementById('formPedido').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pedido = {
    cliente_nombre: document.getElementById('cliente_nombre').value,
    cliente_telefono: document.getElementById('cliente_telefono').value,
    producto: document.getElementById('producto').value,
    cantidad: document.getElementById('cantidad').value,
    fecha_entrega: document.getElementById('fecha_entrega').value,
    total: document.getElementById('total').value,
    notas: document.getElementById('notas').value
  };

  const res = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(pedido)
  });

  if (res.ok) {
    e.target.reset();
    cargarPedidos();
  } else {
    const err = await res.json();
    alert(err.error || 'No se pudo guardar el pedido');
  }
});

async function cargarPedidos() {
  const estado = document.getElementById('filtroEstado').value;
  const cliente = document.getElementById('buscarCliente').value;
  const params = new URLSearchParams({ estado, cliente });

  const res = await fetch(`${API_URL}/pedidos?${params.toString()}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) return;
  const pedidos = await res.json();
  const contenedor = document.getElementById('listaPedidos');

  if (!pedidos.length) {
    contenedor.innerHTML = '<p class="text-sm text-stone-400">No hay pedidos registrados.</p>';
    return;
  }

  contenedor.innerHTML = pedidos.map((p) => {
    const mensaje = encodeURIComponent(
      `Hola ${p.cliente_nombre}, gracias por tu pedido en Pasticely (#${p.id}): ${p.cantidad}x ${p.producto}, entrega: ${p.fecha_entrega}, total: $${p.total}. Estado: ${p.estado}.`
    );
    const telLimpio = p.cliente_telefono.replace(/\D/g, '');
    const waLink = `https://wa.me/52${telLimpio}?text=${mensaje}`;

    return `
      <div class="border border-stone-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p class="font-medium text-sm">#${p.id} · ${p.cliente_nombre} <span class="text-stone-400">(${p.cliente_telefono})</span></p>
          <p class="text-sm text-stone-600">${p.cantidad}x ${p.producto} — <span class="font-medium">$${Number(p.total).toFixed(2)}</span></p>
          <p class="text-xs text-stone-400">Entrega: ${p.fecha_entrega} ${p.notas ? `· Nota: ${p.notas}` : ''}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <select onchange="cambiarEstado(${p.id}, this.value)" class="text-xs border border-stone-300 rounded px-2 py-1">
            ${['Pendiente', 'En preparación', 'Listo', 'Entregado'].map(st =>
              `<option value="${st}" ${p.estado === st ? 'selected' : ''}>${st}</option>`
            ).join('')}
          </select>
          <a href="${waLink}" target="_blank" class="text-xs bg-emerald-600 text-white px-2.5 py-1 rounded hover:bg-emerald-700">
            WhatsApp
          </a>
          <button onclick="eliminarPedido(${p.id})" class="text-xs text-red-600 hover:underline px-1">
            Borrar
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function cambiarEstado(id, estado) {
  await fetch(`${API_URL}/pedidos/${id}/estado`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ estado })
  });
  cargarPedidos();
}

async function eliminarPedido(id) {
  await fetch(`${API_URL}/pedidos/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  cargarPedidos();
}

actualizarVista();