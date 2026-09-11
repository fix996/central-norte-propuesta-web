# Central Norte — Propuesta visual

Propuesta visual no oficial preparada para el Club Atlético Central Norte de Salta. Contenido demostrativo sujeto a validación institucional.

**[Ver el sitio](https://fix996.github.io/central-norte-propuesta-web/)** · **[Repositorio](https://github.com/fix996/central-norte-propuesta-web)**

Una experiencia institucional en negro y blanco: actualidad, fútbol, socios, historia y tienda. Diseño y desarrollo: Lautaro, 2026.

## Alcance

- Portada editorial con fotografía del archivo del club, centro de partidos, noticias, socios, plantel, disciplinas, historia, camisetas y galería.
- Noticias con búsqueda, categorías, detalle, fuente y opciones de compartir.
- Plantel por posiciones y fichas modales. Fixture, resultados y tabla de la Zona A con los escudos de sus 18 clubes.
- Socios y entradas enlazados con OurClub; consultas mediante el WhatsApp público del área.
- Historia, disciplinas, estadios y sede con mapas y rutas de llegada.
- Tienda con ocho productos reales, filtros de indumentaria y merchandising, tres camisetas y vistas de frente/dorso donde existe fotografía verificada. Cada compra continúa en la ficha de Tienda 1921; el catálogo completo permanece disponible allí.
- Sponsors, prensa, galería, formulario demostrativo y página de fuentes.
- Navegación adaptable, enlaces profundos con hash, controles de teclado, diálogos con Escape y devolución de foco, imágenes WebP y fuentes locales.

## Ejecutar y publicar

Requiere Node.js 22.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

La ruta base es `/central-norte-propuesta-web/`. En GitHub, Settings → Pages → Source debe estar en **GitHub Actions**. El workflow publica `dist` al actualizar `main`. Si cambia el nombre del repositorio, actualizar `base` en `vite.config.ts` y los enlaces de esta documentación.

## Actualizar contenido

| Contenido                     | Archivo                                                     | Qué revisar                                                                                                             |
| ----------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Noticias                      | `src/data/club.ts`, colección `news`                        | ID único, fecha del hecho o consulta, categoría, síntesis original, imagen y fuente.                                    |
| Partidos y tabla              | `src/data/matches.json`                                     | Fecha de corte, rivales, estado, resultado, puntos, PJ y diferencia. No completar horarios sin programación confirmada. |
| Centro de partidos de portada | `src/App.tsx`, `MatchCenter`                                | Mantener sincronizados último resultado y próximo encuentro con el JSON.                                                |
| Plantel                       | `src/data/club.ts`, `playerGroups`                          | Altas y bajas, posición y fuentes; `SquadPage` contiene el técnico. Validar con el club.                                |
| Escudos rivales               | `src/data/crests.json` y `public/assets`                    | Nombre idéntico al fixture/tabla, archivo auténtico y proporciones originales.                                          |
| Tienda                        | `src/data/products.json` y `JerseySection` en `src/App.tsx` | URL real de cada producto, imagen, categoría y fecha de consulta. La tienda externa administra precio, talles y stock.  |
| Sponsors                      | `Footer` y `SponsorsPage` en `src/App.tsx`                  | Validar contrato y marca vigente antes de agregar logos, categorías o beneficios.                                       |
| Contactos y fuentes           | `src/data/club.ts`, `links` y `sources`                     | Comprobar identidad, destino y vigencia antes de presentar.                                                             |
| Diseño                        | `src/style.css`                                             | Revisar escritorio y 390/360 px después de cambiar tamaños o navegación.                                                |

Los datos deportivos son una **instantánea del 8 de septiembre de 2026**, no una conexión en vivo. Tienda, imágenes y escudos se revisaron nuevamente el **10 de septiembre de 2026**. Toda actualización debe modificar su fecha y dejar una fuente comprobable.

## Investigación y decisiones

El sitio anterior consultado mostraba el encabezado “Home Real-estate”, una identidad rosa y enlaces de navegación incompletos o dirigidos a una instalación de Hostinger. Esta propuesta reorganiza los accesos de socios, entradas, fútbol y tienda alrededor de la identidad azabache.

Se revisaron como referencias institucionales los sitios de [Belgrano](https://www.belgranocordoba.com/), [Racing](https://www.racingclub.com.ar/), [River](https://www.riverplate.com/), [Boca](https://www.bocajuniors.com.ar/), [San Lorenzo](https://sanlorenzo.com.ar/) y [Rosario Central](https://rosariocentral.com/). Se tomaron criterios de jerarquía deportiva, accesos de socios, noticias y prensa; no se copiaron plantillas ni textos.

Las fuentes concretas del contenido se enumeran en [FUENTES.md](FUENTES.md), en [el manifiesto de imágenes](ASSETS.json) y en la sección “Fuentes y alcance” del sitio. El Linktree suministrado enlazaba canales de Central Norte de Tucumán y se descartó para evitar mezclar clubes.

## Límites de esta propuesta

No procesa pagos, altas de socios, acreditaciones ni consultas. El formulario no transmite ni guarda datos. Las compras se realizan en Tienda 1921; no existe un carrito ficticio ni una pasarela propia. No se inventan precios, stock, cuotas, testimonios, estadísticas individuales, dorsales o retratos. Las áreas sin evidencia reciente indican que requieren validación institucional.

La publicación contiene `noindex,nofollow`, `robots.txt` y un aviso visible de propuesta no oficial. Estos controles no restringen el acceso: el enlace es público y se puede compartir sin iniciar sesión.

Fotografías, escudos, marcas y productos corresponden a sus respectivos titulares. Se documenta su procedencia; no se afirma una licencia comercial ni representación del club. El sitio definitivo requiere validación institucional y permisos de reutilización.

## Verificación

Consultar [VERIFICACION.md](VERIFICACION.md) para las pruebas realizadas y límites. Las capturas finales están en `qa/`.
