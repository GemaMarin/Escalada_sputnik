// Integración con la sala: información de Sputnik Climbing Legazpi y bloques/vías
// actuales publicados por la propia sala en Vertical-Life (widget público).
// App no oficial: los datos se leen del widget público de Vertical-Life de la sala.
import { db } from './db.js';

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeColor = (c) => (/^#[0-9a-f]{3,8}$|^[a-z]+$/i.test(c || '') ? c : '#afff00');
const safeURL = (u) => (/^https:\/\/[\w.-]+\/[\w./-]+$/.test(u || '') ? u : '');
// Datos de la web oficial: https://sputnikclimbing.com/rocodromo-madrid/legazpi/
export const GYM = {
  id: 'sputnik-legazpi',
  name: 'Sputnik Legazpi',
  fullName: 'Sputnik Climbing Legazpi',
  address: 'C. del Hierro, 33, 28045 Madrid',
  phone: '645 51 17 02',
  email: 'legazpi@sputnikclimbing.com',
  hours: [
    { days: 'Lunes a viernes', time: '7 – 23 h' },
    { days: 'Sábados', time: '9 – 22 h' },
    { days: 'Domingos y festivos', time: '9 – 21 h' },
  ],
  transport: [
    { icon: 'metro', text: 'Metro L3 y L6 · Legazpi' },
  ],
  facts: [
    { value: '180+', label: 'bloques · 2500 m²' },
    { value: '40', label: 'vías cortas (6 m) · IV a 7b' },
    { value: '16', label: 'autoseguros' },
  ],
  zones: ['Bloque (bloques nuevos cada semana)', 'Vías con autoseguro (se renuevan en un mes)', 'Zona de entrenamiento: 2 Kilter Board, muro de densidad y suspensiones',
    'Gimnasio (115 m²) y aula de estiramientos', 'Área de familias', 'La Cantina (restaurante)'],
  links: {
    web: 'https://sputnikclimbing.com/rocodromo-madrid/legazpi/',
    hours: 'https://sputnikclimbing.com/rocodromo-madrid/legazpi/',
    prices: 'https://sputnikclimbing.com/rocodromo-madrid/tarifas/',
    capacity: 'https://sputnikclimbing.deporsite.net/aforo-legazpi',
    maps: 'https://maps.app.goo.gl/Q8pkB8XqBfg5dYsr8',
    instagram: 'https://www.instagram.com/sputnikclimbing/',
    vl: 'https://gyms.vertical-life.info/sputnik-legazpi/iframe',
  },
};

// Circuitos de bloque de la sala, de más fácil a más difícil (orden de Vertical-Life).
export const GYM_CIRCUITS = [
  { name: 'Blanco', color: '#f4f4f5', approx: '' },
  { name: 'Verde', color: '#16a34a', approx: '' },
  { name: 'Amarillo', color: '#facc15', approx: '' },
  { name: 'Azul', color: '#2563eb', approx: '' },
  { name: 'Morado', color: '#7c3aed', approx: '' },
  { name: 'Rojo', color: '#dc2626', approx: '' },
  { name: 'Negro', color: '#18181b', approx: '' },
  { name: 'Comp', color: '#64748b', approx: 'bloques de competición', joker: true },
];

// Circuitos de Sharma Climbing Madrid (base original de la app): solo para migrar datos antiguos.
export const SHARMA = {
  name: 'Sharma Climbing Madrid',
  circuits: [
    { name: 'Blanco', color: '#f4f4f5' }, { name: 'Azul', color: '#2563eb' }, { name: 'Verde', color: '#16a34a' },
    { name: 'Joker 1', color: '#94a3b8', joker: true }, { name: 'Amarillo', color: '#facc15' },
    { name: 'Joker 2', color: '#64748b', joker: true }, { name: 'Rojo', color: '#dc2626' },
    { name: 'Morado', color: '#7c3aed' }, { name: 'Negro', color: '#18181b' },
  ],
};

const BASE = 'https://gyms.vertical-life.info';
const IFRAME = `${BASE}/${GYM.id}/iframe`;
const MAX_AGE = 3 * 3600 * 1000;

// Nombres de color de presa (Vertical-Life los da en inglés o, en Sputnik, en español).
const HOLD_NAMES = {
  white: 'Blanca', black: 'Negra', pink: 'Rosa', yellow: 'Amarilla', purple: 'Morada', blue: 'Azul',
  green: 'Verde', 'fluoro green': 'Verde flúor', red: 'Roja', orange: 'Naranja', turquoise: 'Turquesa',
  cyan: 'Turquesa', grey: 'Gris', gray: 'Gris', brown: 'Marrón', wood: 'Madera', beige: 'Beige',
  blanco: 'Blanca', negro: 'Negra', amarillo: 'Amarilla', morado: 'Morada', rojo: 'Roja', menta: 'Menta',
  naranja: 'Naranja', rosa: 'Rosa', gris: 'Gris', marrón: 'Marrón', turquesa: 'Turquesa',
};
export const holdName = (n) => HOLD_NAMES[(n || '').toLowerCase()] || n || '';

function parsePane(doc, kind) {
  const pane = doc.getElementById(kind === 'route' ? 'routes' : 'boulders');
  if (!pane) return [];
  return [...pane.querySelectorAll('tbody.list tr')].map((tr) => {
    const a = tr.querySelector(`a.${kind}_name`);
    const sec = tr.querySelector('td.sector a');
    const circle = tr.querySelector('.iframe-circle');
    const color = (circle?.getAttribute('style') || '').match(/border-top-color:\s*([^;]+)/)?.[1]?.trim() || '#999';
    return {
      vlId: (a?.getAttribute('href') || '').match(/iframe\/(\d+)\//)?.[1] || null,
      kind,
      number: tr.querySelector(`.${kind}_number`)?.textContent.trim() || '',
      hold: a?.textContent.trim() || '',
      holdColor: color.toLowerCase(),
      grade: tr.querySelector('td.grade')?.textContent.trim() || '',
      sector: sec?.textContent.trim() || '',
      sectorId: (sec?.getAttribute('href') || '').match(/iframe\/(\d+)\//)?.[1] || null,
      setter: tr.querySelector('td.route_setter')?.textContent.trim() || '',
      date: Number(tr.querySelector('td.date')?.textContent.trim() || 0) * 1000,
      zlags: Number(tr.querySelector('td.zlags')?.textContent.trim() || 0),
      isNew: !!tr.querySelector('.new-small-badge'),
    };
  }).filter((x) => x.vlId);
}

export function parseGym(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return { boulders: parsePane(doc, 'boulder'), routes: parsePane(doc, 'route'), fetchedAt: Date.now() };
}

let memo = null;
let extras = null;

// Planos de sector y zonas de cada bloque: los prepara GitHub cada día (scripts/update-gym.mjs)
// y se publican junto a la app, así cargan al instante.
async function loadExtras() {
  if (extras) return extras;
  try {
    const res = await fetch('data/gym.json');
    if (!res.ok) throw new Error(res.status);
    extras = await res.json();
    db.put('settings', { key: 'gym-extras', value: extras });
  } catch {
    extras = (await db.get('settings', 'gym-extras'))?.value || { sectors: {}, topos: {}, boulders: [], routes: [], fetchedAt: 0 };
  }
  return extras;
}

// Devuelve los datos de la sala: caché local → lista en directo → copia publicada con la app.
export async function getGym({ force = false } = {}) {
  const ex = await loadExtras();
  if (!memo) memo = (await db.get('settings', 'gym-cache'))?.value || null;
  const fresh = memo && Date.now() - memo.fetchedAt < MAX_AGE;
  if (!force && fresh) return memo;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(IFRAME, { cache: 'no-store', signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(res.status);
    const data = parseGym(await res.text());
    if (!data.boulders.length && !data.routes.length) throw new Error('vacío');
    memo = data;
    await db.put('settings', { key: 'gym-cache', value: data });
    return data;
  } catch {
    if (memo) return { ...memo, offline: true };
    if (ex.boulders?.length) return { boulders: ex.boulders, routes: ex.routes, fetchedAt: ex.fetchedAt, offline: true };
    return { boulders: [], routes: [], fetchedAt: 0, offline: true };
  }
}

export const cachedGym = () => memo;

export async function getDetail(item) {
  const ex = await loadExtras();
  const t = ex.topos?.[item.vlId];
  return {
    wall: t?.wall || null,
    map: ex.sectors?.[item.sectorId]?.map || null,
    stars: Math.min(5, t?.stars || 0),
    expires: t?.expires || null,
    missing: !t,
  };
}

export async function getSector(sectorId) {
  const ex = await loadExtras();
  return ex.sectors?.[sectorId]?.map || null;
}

// Dibuja una foto con una zona resaltada (coordenadas en píxeles de la imagen original).
export function topoHTML(topo, color, { cls = '', label = '', line = false } = {}) {
  const src = safeURL(topo?.src);
  if (!src) return '';
  const id = `t${Math.random().toString(36).slice(2, 8)}`;
  const pts = topo.path.map(([x, y]) => `${Number(x)},${Number(y)}`).join(' ');
  return `<figure class="topo ${cls}" id="${id}">
    <div class="topo-inner"><img src="${src}" alt="" loading="lazy"
      onload="const s=this.nextElementSibling;s.setAttribute('viewBox','0 0 '+this.naturalWidth+' '+this.naturalHeight);s.style.display='block';this.parentNode.classList.add('ready')"
      onerror="this.closest('figure').classList.add('broken')">
    <svg preserveAspectRatio="none" style="display:none">${line || topo.path.length < 3 ? `<polyline points="${pts}" style="--zc:${safeColor(color || topo.color)}"/>` : `<polygon points="${pts}" style="--zc:${safeColor(color || topo.color)}"/>`}</svg></div>
    ${label ? `<figcaption>${esc(label)}</figcaption>` : ''}
  </figure>`;
}

// Mapa general con todos los sectores (agrupados por imagen de fondo).
export function sectorMapHTML(sectors, active) {
  const byImage = {};
  for (const s of sectors) if (safeURL(s.topo?.src)) (byImage[s.topo.src] ||= []).push(s);
  return Object.entries(byImage).map(([src, list]) => `<figure class="topo map">
    <div class="topo-inner"><img src="${src}" alt="Plano de la sala" loading="lazy"
      onload="const s=this.nextElementSibling;s.setAttribute('viewBox','0 0 '+this.naturalWidth+' '+this.naturalHeight);s.style.display='block';this.parentNode.classList.add('ready')"
      onerror="this.closest('figure').classList.add('broken')">
    <svg preserveAspectRatio="none" style="display:none">${list.map((s) => `<polygon class="${active === s.id ? 'on' : ''}" data-action="gym-sector" data-v="${esc(s.id)}" points="${s.topo.path.map(([x, y]) => `${x},${y}`).join(' ')}"><title>${esc(s.name)}</title></polygon>`).join('')}</svg></div>
  </figure>`).join('');
}
