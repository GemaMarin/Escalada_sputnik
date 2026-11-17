# 🧗‍♀️ Escalada Sputnik

> Copia independiente de [Escalada](https://github.com/GemaMarin/Escalada): datos, caché y copias de seguridad propias. Web: https://gemamarin.github.io/Escalada_sputnik/

App web para registrar entrenamientos de escalada en rocódromo (pensada para **[Sputnik Climbing Legazpi](https://sputnikclimbing.com/rocodromo-madrid/legazpi/)** — C. del Hierro, 33, Madrid —, pero vale para cualquier sala).
Funciona en el móvil, se puede instalar en la pantalla de inicio y funciona sin conexión.

## Qué hace

**Registrar una sesión en segundos:** Clase o Libre (con quién fuiste), y contadores por color de *conseguidos* e *intentados* («3 amarillos, 1 morado intentado»). Si te acuerdas de cuál era, puedes elegir el bloque concreto de la sala. Las notas se clasifican solas (técnica, cabeza, molestias…), en Inicio sale tu nivel, y al guardar una sesión aparece una imagen resumen para compartir o guardar. En Progreso, «Compartir» crea la imagen de «Mi progreso».

**Navegación:** Inicio · Sala · Progreso · ＋ · Objetivos · Ajustes · Perfil. La bienvenida vuelve a salir una vez al cambiar la app de sala, para elegir tu color habitual con los colores nuevos. En Ajustes están la copia de seguridad y «Borrar todo y empezar de cero».

**Novedades** (desde Inicio): bloques y vías recién montados por sector (se actualizan solos cada día), tus planes apuntados a mano (p. ej. competiciones o promociones vistas en Instagram) y enlace al Instagram de Sputnik. La web de Sputnik no publica una agenda con fechas, así que no hay eventos automáticos.

**Objetivos:** retos del mes que se renuevan solos, siguientes objetivos con barra de progreso y colección de medallas. Logros sin final: constancia, conseguidos, a la primera, racha, colores, «Domina tu color», color completo… al completar un nivel se crea el siguiente automáticamente y la app avisa con «¡Nuevo logro!».

**Otros rocódromos y bloques inventados:** en sesiones libres se puede elegir «Otro rocódromo»: sus colores se configuran una vez (ordenados de fácil a difícil) y cada uno equivale a un color de Sputnik Legazpi para el progreso; no hay bloques concretos y Progreso muestra los rocódromos visitados. En los contadores hay una fila «✏️ Inventado» para los bloques y vías libres del profe.

**Bloques sueltos:** marcar un bloque desde la Sala lo guarda directamente (sin abrir una sesión): cuenta para nivel, colores y logros, pero no como sesión. Se ven en el Perfil, en «Apuntados por separado».

**Bloques concretos de la sala:** eliges Bloque o Vías, salen los bloques montados ahora en la sala (por color y sector) y para cada uno marcas *A la primera*, *Lo conseguí* o *Lo intenté*. Si no sabes cuál era, lo apuntas solo con el color. Cada bloque de la sala queda como **Conseguido**, **Intentando** o **Sin probar**, y en Inicio aparecen **Tus retos** (los que intentaste y siguen montados). Objetivo por defecto: 1 sesión a la semana.

**Días de escalada:** por defecto «Cuando puedo» (sin horario): cada día Inicio muestra un recordatorio «¿Has ido a escalar hoy?» para registrar la sesión, que se quita con «Hoy no he ido». Si eliges «Días fijos» (en la bienvenida o en Ajustes), la app avisa esos días a la hora indicada, marca las sesiones como clase y puede añadir recordatorios al calendario del móvil.

**Sala en directo (Sputnik Legazpi):** la pestaña *Sala* muestra los bloques y vías montados ahora mismo (sector, circuito, color de presa, número, fecha de apertura, novedades), con el plano de sectores (Sector 1 … Sector 13-14, Familias y Autobelays) y la foto del muro con la zona de cada bloque. En la cabecera hay enlaces a cómo llegar, horarios y aforo en directo. Se registran con un toque (Flash / Encadenado / Proyecto) y la app enseña cuánto llevas de cada circuito (p. ej. «Verde 18/24»). Los datos vienen del widget público de Vertical-Life de la sala (`sputnik-legazpi`); si no hay conexión se usa la última copia guardada.

- **Sesiones**: fecha, tipo (bloque, vías, mixta, entreno), duración, esfuerzo percibido (RPE), cómo te has sentido y notas.
- **Bloques y vías**: color del circuito o grado francés, resultado (flash, a vista, encadenado, proyecto), intentos, modalidad (primera / polea / autobelay), inclinación, tipo de presas, movimientos, nombre, zona y beta.
- **Registro rápido**: toca un color y queda apuntado, ideal entre pegue y pegue.
- **Fotos** de la sesión o de cada bloque/vía (se comprimen automáticamente).
- **Progreso**: evolución de grado semanal, pirámide de grados, volumen, calendario, estilos fuertes y débiles, proyectos abiertos y encadenados.
- **Consejos automáticos**: racha, cargas altas (riesgo de lesión), estilos olvidados, nuevo máximo, siguiente grado a probar…
- **Bienvenida**, objetivo semanal con anillo de progreso y aviso para instalarla.
- **Logros** desbloqueables y **compartir** el resumen de una sesión.
- **Copia de seguridad** (descargar/restaurar, fotos incluidas) y **datos de ejemplo** para probarla.

## Privacidad

No hay servidor ni cuentas: todo se guarda en el propio navegador del móvil (IndexedDB).
Cada persona que abra el enlace tiene su propio cuaderno, privado. Para cambiar de móvil, usa *Ajustes → Descargar copia* y luego *Restaurar copia*.

## Escala de bloque

Por defecto se usan los circuitos de Sputnik Legazpi tal y como los publica la sala en Vertical-Life, de más fácil a más difícil: Blanco, Verde, Amarillo, Azul, Morado, Rojo y Negro, más «Comp» (bloques de competición, circuito especial). Las vías van en grado francés (IV a 7b) y son todas con autoseguro.

Si en este navegador había datos guardados con los colores del Sharma (base original de la app), al abrir la nueva versión esas sesiones pasan a «Otro rocódromo: Sharma Climbing Madrid» con sus colores, y cada color se compara por posición con uno de Sputnik (los nombres no equivalen en dificultad: el Azul es el 2.º en el Sharma y el 4.º en Sputnik).

En **Ajustes → Circuitos de bloque** se pueden editar nombre, color y grado aproximado de cada nivel, o cambiar a grados Font (6A, 6B…).

## Publicarla (GitHub Pages, gratis)

1. Fusiona esta rama en `main`.
2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. El workflow `.github/workflows/pages.yml` la publica en cada push a `main`. La URL será `https://<usuario>.github.io/<repositorio>/`.
4. En el móvil: abrir la URL → *Compartir → Añadir a pantalla de inicio* (iPhone) o *Instalar app* (Android).

> GitHub Pages en repositorios privados requiere un plan de pago; en repositorios públicos es gratis (el código es público, pero los datos de cada usuaria **no**, se quedan en su móvil).

## Desarrollo

Es HTML + CSS + JavaScript sin dependencias ni compilación:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

```
index.html          estructura y navegación
styles.css          estilos (claro/oscuro)
js/app.js           vistas, formularios y eventos
js/model.js         grados, etiquetas y modelo de carga corporal
js/insights.js      estadísticas, consejos y logros
js/charts.js        gráficos SVG y mapa corporal
js/db.js            almacenamiento local (IndexedDB) y fotos
js/demo.js          datos de ejemplo
js/gym.js           datos de Sputnik Legazpi (Vertical-Life) y plano/topos
scripts/update-gym.mjs  genera data/gym.json (GitHub Actions, cada día)
js/icons.js         iconos SVG
data/               copia de la sala para usar sin conexión
sw.js               uso sin conexión
```

El mapa corporal es una **estimación orientativa** basada en el grado, los intentos y las etiquetas de cada escalada; no es una medida fisiológica. La carga de sesión usa el método sRPE (minutos × RPE).

> App no oficial, sin relación con Sputnik Climbing ni con Vertical-Life.
