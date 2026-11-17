// Datos de ejemplo para probar la app (se pueden quitar desde Ajustes).
import { uid } from './db.js';
import { boulderScale, boulderIndexByName, ROUTE_GRADES } from './model.js';
import { toISO } from './insights.js';
import { GYM } from './gym.js';

const B_SECTORS = ['Sector 1', 'Sector 3', 'Sector 6', 'Sector 9', 'Sector 12'];
const R_SECTORS = ['Autobelays'];

export function makeDemo(settings, gym) {
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const some = (arr, max) => arr.filter(() => rnd() < max / arr.length);
  const scale = boulderScale(settings);
  const regular = scale.map((g, i) => ({ ...g, i })).filter((g) => !g.joker);
  const styles = ['placa', 'vertical', 'desplome', 'desplome', 'techo'];
  const holds = ['regletas', 'romos', 'pinzas', 'agujeros', 'cantos', 'volumenes'];
  const moves = ['dinamico', 'bloqueos', 'talon', 'puntera', 'compresion', 'coordinacion', 'equilibrio'];
  const g6b = ROUTE_GRADES.indexOf('6b');
  const projects = [
    { name: 'El de los romos del sector 6', discipline: 'boulder', grade: regular[Math.min(regular.length - 1, 4)].i, styles: ['desplome'], holds: ['romos'], moves: ['talon', 'compresion'], zone: 'Sector 6' },
    { name: 'Travesía de la cueva', discipline: 'boulder', grade: regular[Math.min(regular.length - 1, 3)].i, styles: ['techo'], holds: ['regletas'], moves: ['bloqueos'], zone: 'Sector 13-14' },
    { name: 'La del diedro', discipline: 'route', grade: g6b + 1, styles: ['vertical'], holds: ['regletas', 'cantos'], moves: ['resistencia'], zone: 'Autobelays' },
  ];
  const sessions = [];
  const day = new Date(); day.setDate(day.getDate() - 75);
  let n = 0;
  while (day < new Date()) {
    day.setDate(day.getDate() + 2 + Math.floor(rnd() * 3));
    if (day > new Date()) break;
    const progress = n / 28; // mejora gradual
    const type = rnd() < 0.68 ? 'boulder' : (rnd() < 0.7 ? 'route' : 'mixed');
    const climbs = [];
    const count = 6 + Math.floor(rnd() * 8);
    for (let i = 0; i < count; i++) {
      const discipline = type === 'mixed' ? (i % 2 ? 'route' : 'boulder') : type;
      if (discipline === 'route' && i > 6) break;
      let grade; let hard;
      if (discipline === 'route') {
        const base = g6b - 3 + progress * 3;
        grade = Math.max(0, Math.min(g6b + 5, Math.round(base + (rnd() * 3.2 - 1.2))));
        hard = grade - base;
      } else {
        const base = 1 + progress * 1.6;
        const k = Math.max(0, Math.min(regular.length - 1, Math.round(base + (rnd() * 2.6 - 1))));
        grade = regular[k].i; hard = k - base;
      }
      const r = rnd();
      const result = hard > 1.1 ? (r < 0.65 ? 'project' : 'send') : hard > 0.3 ? (r < 0.25 ? 'project' : r < 0.5 ? 'flash' : 'send') : (r < 0.7 ? 'flash' : 'send');
      const st = [pick(styles)];
      climbs.push({
        id: uid(), discipline, grade, result: discipline === 'route' && result === 'flash' && rnd() < 0.5 ? 'onsight' : result,
        attempts: result === 'flash' ? 1 : 2 + Math.floor(rnd() * 5),
        ropeMode: discipline === 'route' ? 'auto' : undefined,
        styles: rnd() < 0.85 ? st : [], holds: some(holds, 1.3), moves: some(moves, 1.2),
        name: '', zone: discipline === 'route' ? pick(R_SECTORS) : pick(B_SECTORS), notes: '',
      });
    }
    for (const p of projects) {
      if ((type === 'mixed' || type === p.discipline) && rnd() < 0.45) {
        if (sessions.some((s) => s.climbs.some((c) => c.name === p.name && c.result === 'send'))) continue;
        const tries = sessions.filter((s) => s.climbs.some((c) => c.name === p.name)).length;
        const sentNow = tries >= 3 && rnd() < 0.5;
        climbs.push({ id: uid(), ...p, result: sentNow ? 'send' : 'project', attempts: 3 + Math.floor(rnd() * 4), notes: sentNow ? '¡Por fin! El truco era meter el talón antes.' : '', ropeMode: p.discipline === 'route' ? 'auto' : undefined });
      }
    }
    const rpe = 5 + Math.floor(rnd() * 4);
    sessions.push({
      id: uid(), demo: true, date: toISO(day), type, kind: day.getDay() === 4 ? 'class' : 'free', where: 'home', gym: GYM.name,
      with: day.getDay() !== 4 && rnd() < 0.5 ? [pick(['Gema', 'Marta', 'Lucía'])] : [], duration: 60 + 15 * Math.floor(rnd() * 6), rpe,
      mood: Math.min(4, Math.max(0, Math.round(2 + rnd() * 2.4 - (rpe > 7 ? 1 : 0)))),
      notes: rnd() < 0.3 ? pick(['Muy buenas sensaciones, pies precisos.', 'Dedos algo cansados, he parado antes.', 'Sesión con amigas y algún bloque nuevo.', 'Han reequipado la cueva, ¡qué bloques más chulos!']) : '',
      activities: rnd() < 0.25 ? [pick(['kilter', 'campus', 'hangboard', 'core'])] : [],
      climbs, createdAt: day.getTime(),
    });
    n++;
  }
  // Enlaza algunos bloques de las últimas sesiones con bloques reales de la sala.
  if (gym?.boulders?.length) {
    const recent = sessions.slice(-4);
    const easy = gym.boulders.filter((b) => {
      const i = boulderIndexByName(settings, b.grade);
      return i >= 0 && !scale[i].joker && regular.findIndex((g) => g.i === i) <= 3;
    }).slice(0, 18);
    easy.forEach((b, k) => {
      const s = recent[k % recent.length];
      const r = rnd();
      s.climbs.push({
        id: uid(), discipline: 'boulder', grade: boulderIndexByName(settings, b.grade), result: r < 0.4 ? 'flash' : r < 0.85 ? 'send' : 'project',
        attempts: 1 + Math.floor(rnd() * 3), styles: [pick(styles)], holds: some(holds, 1), moves: some(moves, 1),
        name: `${b.sector} ${b.number}`, zone: b.sector, notes: '', vlId: b.vlId, vlNumber: b.number, holdColor: b.holdColor, holdName: b.hold,
      });
    });
  }
  return sessions;
}
