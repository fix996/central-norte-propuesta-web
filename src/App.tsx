import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";

import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  UserRound,
  Ticket,
  ShoppingBag,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Search,
  Plus,
  Minus,
  Instagram,
  Facebook,
  MessageCircle,
  Download,
  Play,
  CalendarDays,
  Shield,
  TrainFront,
  Share2,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  links,
  news,
  players,
  disciplines,
  timeline,
  sources,
  verified,
} from "./data/club";
import matches from "./data/matches.json";
import products from "./data/products.json";
import crests from "./data/crests.json";
import "./style.css";
const base = import.meta.env.BASE_URL;
const asset = (id: string) => `${base}assets/${id}.webp`;
const date = (s: string) =>
  new Date(s + "T12:00:00").toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const routeHref = (s: string) => "#/" + s;
function Link({
  to,
  children,
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return (
    <a href={routeHref(to)} className={className} {...props}>
      {children}
    </a>
  );
}
function Out({
  href,
  children,
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
function Crest({ className = "" }: { className?: string }) {
  return (
    <img
      className={"crest " + className}
      src={asset("escudo")}
      alt="Escudo del Club Atlético Central Norte"
      width="58"
      height="58"
    />
  );
}
function TeamCrest({ name }: { name: string }) {
  return (
    <img
      className="rival-crest"
      src={asset((crests as Record<string, string>)[name] || "escudo")}
      alt={"Escudo de " + name}
      width="58"
      height="58"
    />
  );
}
function SectionHeading({
  label,
  title,
  to,
  link = "Ver más",
}: {
  label: string;
  title: string;
  to?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {to && (
        <Link to={to} className="text-link">
          {link}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
type DialogContent = { title: string; body: React.ReactNode };
const ModalContext = createContext<(v: DialogContent) => void>(() => {});
function Header() {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const close = () => setMenu(false);
    window.addEventListener("hashchange", close);
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("keydown", esc);
    };
  }, []);
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
          document.getElementById("main")?.scrollIntoView();
        }}
      >
        Saltar al contenido
      </a>
      <div className="service-bar">
        <div className="wrap service-inner">
          <span className="demo-tag">
            PROPUESTA VISUAL <span>· NO OFICIAL</span>
          </span>
          <div>
            <Out href={links.portal}>Portal de socios</Out>
            <Out href={links.portal}>Entradas</Out>
            <Out href={links.store}>Tienda 1921</Out>
            <Link to="contacto">Contacto</Link>
            <Out href={links.instagram} aria-label="Instagram oficial">
              <Instagram size={14} />
            </Out>
            <Out href={links.facebook} aria-label="Facebook oficial">
              <Facebook size={14} />
            </Out>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="wrap header-inner">
          <Link to="" className="brand" aria-label="Central Norte, inicio">
            <Crest />
            <span>
              CLUB ATLÉTICO<strong>CENTRAL NORTE</strong>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {[
              ["", "Inicio"],
              ["noticias", "Noticias"],
              ["futbol", "Fútbol"],
              ["disciplinas", "Disciplinas"],
              ["socios", "Socios"],
              ["historia", "El Club"],
              ["tienda", "Tienda"],
              ["prensa", "Prensa"],
            ].map(([r, t]) => (
              <Link key={t} to={r}>
                {t}
              </Link>
            ))}
          </nav>
          <Link to="socios" className="button header-join">
            <UserRound size={16} />
            Hacete socio
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Navegación móvil"
          >
            {[
              ["", "Inicio"],
              ["noticias", "Noticias"],
              ["futbol", "Fútbol"],
              ["plantel", "Plantel"],
              ["fixture", "Fixture y posiciones"],
              ["disciplinas", "Disciplinas"],
              ["socios", "Socios"],
              ["historia", "Historia"],
              ["estadios", "Estadios y sedes"],
              ["tienda", "Tienda 1921"],
              ["prensa", "Prensa"],
              ["contacto", "Contacto"],
            ].map(([r, t]) => (
              <Link key={t} to={r}>
                {t}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
function Footer() {
  return (
    <>
      <section className="sponsor-strip wrap">
        <p className="eyebrow">NOS ACOMPAÑAN · INDUMENTARIA 2026</p>
        <div className="sponsor-row">
          <div>
            <strong className="macro">Macro</strong>
            <span>Sponsor frontal</span>
          </div>
          <div>
            <strong className="hummel">hummel</strong>
            <span>Marca técnica</span>
          </div>
          <Link to="sponsors" className="text-link">
            Quiero acompañar al club
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
      <footer>
        <div className="wrap footer-grid">
          <div>
            <Link to="" className="brand">
              <Crest />
              <span>
                CLUB ATLÉTICO<strong>CENTRAL NORTE</strong>
              </span>
            </Link>
            <p>
              Una ciudad. Una historia.
              <br />
              Un sentimiento azabache.
            </p>
            <div className="socials">
              <Out href={links.instagram} aria-label="Instagram">
                <Instagram />
              </Out>
              <Out href={links.facebook} aria-label="Facebook">
                <Facebook />
              </Out>
              <Out href={links.x} aria-label="X oficial">
                𝕏
              </Out>
            </div>
          </div>
          <div>
            <h3>EL CLUB</h3>
            <Link to="historia">Nuestra historia</Link>
            <Link to="estadios">Estadios y sedes</Link>
            <Link to="disciplinas">Disciplinas</Link>
            <Link to="prensa">Centro de prensa</Link>
          </div>
          <div>
            <h3>VIVÍ CENTRAL</h3>
            <Link to="noticias">Noticias</Link>
            <Link to="plantel">Plantel profesional</Link>
            <Link to="fixture">Fixture y posiciones</Link>
            <Out href={links.portal}>Socios y entradas ↗</Out>
            <Out href={links.store}>Tienda 1921 ↗</Out>
          </div>
          <div>
            <h3>ENCONTRANOS</h3>
            <p>
              Av. Entre Ríos 1498
              <br />
              Salta Capital, Argentina
            </p>
            <Out href={links.socios}>Socios: +54 9 387 458-6400</Out>
            <Link to="contacto">Contacto y consultas</Link>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <p>
            Propuesta visual no oficial preparada para el Club Atlético Central
            Norte. Contenido demostrativo sujeto a validación institucional.
          </p>
          <span>Diseño y desarrollo: Lautaro · 2026</span>
          <Link to="fuentes">Fuentes y verificación</Link>
        </div>
      </footer>
      <Out
        href={links.socios}
        className="floating"
        aria-label="Consultar al Departamento de Socios por WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Socios</span>
      </Out>
    </>
  );
}
function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-photo"
        src={asset("hero")}
        alt="Futbolistas de Central Norte abrazados en una celebración. Archivo oficial 2025."
        fetchPriority="high"
        width="1300"
        height="700"
      />
      <div className="hero-shade" />
      <div className="rail-lines" aria-hidden="true" />
      <div className="wrap hero-content">
        <div className="hero-kicker">
          <span className="tiny-line" />
          SALTA, ARGENTINA · DESDE 1921
        </div>
        <h1>
          CENTRAL NORTE
          <br />
          ES <span>SALTA.</span>
        </h1>
        <p>
          105 años de historia.
          <br />
          Una pasión que se lleva para siempre.
        </p>
        <div className="hero-actions">
          <Link to="socios" className="button">
            Hacete socio
            <ArrowUpRight size={19} />
          </Link>
          <Link to="noticias" className="button ghost">
            Últimas noticias
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="hero-bottom">
          <span>NEGRO Y BLANCO. DE GENERACIÓN EN GENERACIÓN.</span>
          <span>FOTOGRAFÍA · ARCHIVO OFICIAL 2025</span>
        </div>
      </div>
      <div className="anniversary" aria-label="105 años, 1921 a 2026">
        <strong>105</strong>
        <span>AÑOS DE PASIÓN</span>
        <small>1921 — 2026</small>
      </div>
    </section>
  );
}
function MatchCenter() {
  return (
    <section className="match-center wrap" aria-label="Centro de partidos">
      <div className="match-title">
        <span className="eyebrow">PRIMERA NACIONAL</span>
        <h2>
          CENTRO <br />
          DE PARTIDOS
        </h2>
        <Link to="fixture">
          Ver fixture
          <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="match-card">
        <p className="match-label">
          ÚLTIMO PARTIDO <span>FINALIZADO</span>
        </p>
        <div className="teams">
          <div>
            <Crest />
            <span>Central Norte</span>
          </div>
          <strong className="score">
            0 <span>—</span> 0
          </strong>
          <div>
            <TeamCrest name="Almirante Brown" />
            <span>Almirante Brown</span>
          </div>
        </div>
        <p className="match-note">6 SEP 2026 · FECHA 28 · MARTEARENA</p>
      </div>
      <div className="match-card next">
        <p className="match-label">
          PRÓXIMO PARTIDO <span>VISITANTE</span>
        </p>
        <div className="teams">
          <div>
            <TeamCrest name="Ciudad de Bolívar" />
            <span>Ciudad de Bolívar</span>
          </div>
          <strong className="vs">VS</strong>
          <div>
            <Crest />
            <span>Central Norte</span>
          </div>
        </div>
        <p className="match-note">
          12 SEP 2026 · HORARIO Y ESTADIO A CONFIRMAR
        </p>
      </div>
      <div className="match-services">
        <Out href={links.portal}>
          <Ticket size={18} />
          Portal de entradas
          <ArrowUpRight size={16} />
        </Out>
        <Link to="socios">
          <UserRound size={18} />
          Información para socios
          <ArrowUpRight size={16} />
        </Link>
        <small>Disponibilidad según cada encuentro.</small>
      </div>
    </section>
  );
}
function NewsCard({
  item,
  large = false,
}: {
  item: (typeof news)[number];
  large?: boolean;
}) {
  return (
    <Link
      to={"noticias/" + item.id}
      className={"news-card " + (large ? "lead-news" : "")}
    >
      <div
        className={
          "news-image " + (item.image === "escudo" ? "emblem-image" : "")
        }
      >
        <img
          src={asset(item.image)}
          alt={item.credit}
          loading="lazy"
          width="640"
          height="420"
        />
        <span className="category">{item.category}</span>
        <span className="card-arrow">
          <ArrowUpRight />
        </span>
      </div>
      <div className="news-copy">
        <div className="meta">
          {date(item.date)} <span>· {item.type}</span>
        </div>
        <h3>{item.title}</h3>
        {large && <p>{item.summary}</p>}
      </div>
    </Link>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <MatchCenter />
      <section className="wrap section">
        <SectionHeading
          label="EL PULSO DEL CUERVO"
          title="ACTUALIDAD AZABACHE"
          to="noticias"
          link="Todas las noticias"
        />
        <div className="home-news">
          <NewsCard item={news[0]} large />
          <div className="secondary-news">
            {news.slice(1, 5).map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        </div>
      </section>
      <HomeMore />
    </>
  );
}
function HomeMore() {
  return (
    <>
      <section className="membership">
        <div className="wrap membership-inner">
          <div>
            <p className="eyebrow">EL CLUB LO HACEMOS ENTRE TODOS</p>
            <h2>
              NO ES SOLO ALENTAR.
              <br />
              ES <span>PERTENECER.</span>
            </h2>
            <p>
              La camiseta nos une. Ser socio es una manera
              <br className="desktop-break" /> de acompañar a Central todos los
              días.
            </p>
            <div className="hero-actions">
              <Link to="socios" className="button">
                Quiero ser socio
                <ArrowUpRight size={18} />
              </Link>
              <Out href={links.portal} className="button ghost">
                Ingresar al portal
                <ArrowUpRight size={18} />
              </Out>
            </div>
          </div>
          <div className="member-card">
            <div className="member-card-top">
              <Crest />
              <span>
                CLUB ATLÉTICO
                <br />
                <strong>CENTRAL NORTE</strong>
              </span>
              <span className="card-year">1921</span>
            </div>
            <div className="member-card-bottom">
              <p>
                EL ORGULLO DE
                <br />
                <strong>SER PARTE.</strong>
              </p>
              <span>
                CREDENCIAL CONCEPTUAL
                <br />
                SIN VALIDEZ
              </span>
            </div>
            <div className="card-rails" />
          </div>
        </div>
      </section>
      <section className="wrap section">
        <SectionHeading
          label="PRIMERA NACIONAL · TEMPORADA 2026"
          title="LOS QUE DEFIENDEN ESTA PIEL"
          to="plantel"
          link="Conocer el plantel"
        />
        <div className="player-preview">
          {[players[0], players[4], players[12], players[20]].map((p) => (
            <PlayerCard key={p.name} player={p} />
          ))}
        </div>
        <p className="small-note">
          Selección de futbolistas contrastados en septiembre de 2026. Sin
          dorsales ni retratos no verificados.
        </p>
      </section>
      <section className="home-disciplines">
        <div className="wrap section">
          <SectionHeading
            label="MUCHO MÁS QUE NOVENTA MINUTOS"
            title="UN CLUB. MUCHAS PASIONES."
            to="disciplinas"
            link="Ver disciplinas"
          />
          <div className="discipline-preview">
            {disciplines.slice(0, 3).map((d, i) => (
              <Link to="disciplinas" key={d.name} className="discipline-tile">
                <span className="discipline-num">0{i + 1}</span>
                <span className="discipline-icon">
                  {i === 2 ? <Shield /> : <TrainFront />}
                </span>
                <div>
                  <p>{d.category}</p>
                  <h3>{d.name}</h3>
                </div>
                <ArrowUpRight />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="history-teaser">
          <div className="history-photo">
            <img
              src={asset("hincha-archivo")}
              alt="Hincha de Central Norte levantando sus brazos. Archivo oficial 2025."
              loading="lazy"
              width="800"
              height="500"
            />
            <span>EL SENTIMIENTO NO CAMBIA.</span>
          </div>
          <div className="history-teaser-copy">
            <p className="eyebrow">NUESTRA HISTORIA, NUESTRO ORGULLO</p>
            <h2>
              NACIMOS DEL RIEL.
              <br />
              CRECIMOS CON
              <br />
              NUESTRA GENTE.
            </h2>
            <p>
              De aquel 9 de marzo de 1921 al regreso a la Primera Nacional. Más
              de un siglo de historias que se encuentran en un mismo escudo.
            </p>
            <Link to="historia" className="button dark">
              Recorré nuestra historia
              <ArrowUpRight size={18} />
            </Link>
            <div className="history-stat">
              <strong>1921</strong>
              <span>EL INICIO DE TODO</span>
              <strong>2024</strong>
              <span>CAMPEÓN FEDERAL A</span>
            </div>
          </div>
        </div>
      </section>
      <JerseySection />
      <section className="wrap section">
        <SectionHeading
          label="IMÁGENES QUE NOS UNEN"
          title="CENTRAL, EN PRIMERA PERSONA"
          to="multimedia"
          link="Ver galería"
        />
        <div className="media-preview">
          <GalleryButton
            id="equipo-archivo"
            label="El equipo · Archivo oficial 2025"
          />
          <GalleryButton
            id="hincha-archivo"
            label="Nuestra gente · Archivo oficial 2025"
          />
          <GalleryButton
            id="accion-archivo"
            label="En la cancha · Archivo oficial 2025"
          />
        </div>
      </section>
      <section className="home-utilities wrap">
        <Link to="estadios">
          <MapPin />
          <div>
            <h3>NUESTRAS CASAS</h3>
            <p>Estadios, sede social y cómo llegar</p>
          </div>
          <ArrowUpRight />
        </Link>
        <Link to="prensa">
          <Download />
          <div>
            <h3>CENTRO DE PRENSA</h3>
            <p>Información y recursos institucionales</p>
          </div>
          <ArrowUpRight />
        </Link>
        <Link to="contacto">
          <MessageCircle />
          <div>
            <h3>HABLEMOS DE CENTRAL</h3>
            <p>Encontrá el área que necesitás</p>
          </div>
          <ArrowUpRight />
        </Link>
      </section>
    </>
  );
}
function PlayerCard({ player }: { player: (typeof players)[number] }) {
  const open = useContext(ModalContext);
  return (
    <button
      className="player-card"
      onClick={() =>
        open({
          title: player.name,
          body: (
            <>
              <p className="eyebrow">
                {player.position} · PRIMERA NACIONAL 2026
              </p>
              <div className="player-modal-crest">
                <Crest />
              </div>
              <p>
                Nombre y posición contrastados con los listados deportivos
                consultados al {verified}. La inclusión no indica convocatoria
                para el próximo partido.
              </p>
              <p className="small-note">
                Fotografía, dorsal, nacionalidad y estadísticas individuales
                pendientes de validación institucional.
              </p>
              <Out href={sources.squad} className="text-link">
                Fuente del plantel
                <ExternalLink size={16} />
              </Out>
              <br />
              <Out href={sources.positions} className="text-link">
                Contraste de posiciones
                <ExternalLink size={16} />
              </Out>
            </>
          ),
        })
      }
    >
      <div className="player-art">
        <span className="player-watermark">CACN</span>
        <Crest />
        <span className="player-label">IDENTIDAD AZABACHE</span>
      </div>
      <div className="player-copy">
        <span>{player.position}</span>
        <h3>{player.name}</h3>
        <ArrowUpRight size={22} />
      </div>
    </button>
  );
}
function GalleryButton({ id, label }: { id: string; label: string }) {
  const open = useContext(ModalContext);
  return (
    <button
      className="gallery-button"
      onClick={() => open({ title: label, body: <Gallery initial={id} /> })}
    >
      <img
        src={asset(id)}
        alt={label}
        width="800"
        height="500"
        loading="lazy"
      />
      <span>
        {label}
        <Plus size={20} />
      </span>
    </button>
  );
}
const galleryItems = [
  { id: "hero", label: "El abrazo · Archivo oficial CACN, 2025" },
  { id: "equipo-archivo", label: "El equipo · Archivo oficial CACN, 2025" },
  { id: "hincha-archivo", label: "Nuestra gente · Archivo oficial CACN, 2025" },
  { id: "accion-archivo", label: "En la cancha · Archivo oficial CACN, 2025" },
  {
    id: "partido",
    label:
      "Central Norte – Almirante Brown · Prensa CACN / Gente de Salta, 2026",
  },
];
function Gallery({ initial }: { initial: string }) {
  const [idx, setIdx] = useState(
    Math.max(
      0,
      galleryItems.findIndex((x) => x.id === initial),
    ),
  );
  const current = galleryItems[idx];
  return (
    <div className="gallery">
      <img
        src={asset(current.id)}
        alt={current.label}
        width="1300"
        height="800"
      />
      <div className="gallery-controls">
        <button
          onClick={() =>
            setIdx((idx + galleryItems.length - 1) % galleryItems.length)
          }
          aria-label="Imagen anterior"
        >
          <ChevronLeft />
        </button>
        <span>
          {idx + 1} / {galleryItems.length} · {current.label}
        </span>
        <button
          onClick={() => setIdx((idx + 1) % galleryItems.length)}
          aria-label="Imagen siguiente"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
function JerseySection() {
  const [model, setModel] = useState(0),
    [back, setBack] = useState(false);
  const names = ["TITULAR", "BLANCA", "GRIS"];
  const p = products[model];
  return (
    <section className="jersey-section">
      <div className="wrap jersey-layout">
        <div className="jersey-copy">
          <p className="eyebrow">HUMMEL × CENTRAL NORTE · 2026</p>
          <h2>
            NUESTRA
            <br />
            <span>PIEL.</span>
          </h2>
          <p>
            Tres formas de llevar
            <br />
            el mismo sentimiento.
          </p>
          <div
            className="jersey-tabs"
            role="group"
            aria-label="Modelo de camiseta"
          >
            {names.map((n, i) => (
              <button
                aria-pressed={i === model}
                className={i === model ? "active" : ""}
                onClick={() => {
                  setModel(i);
                  setBack(false);
                }}
                key={n}
              >
                <span className={"swatch swatch-" + i} />
                {n}
              </button>
            ))}
          </div>
          <p className="jersey-description">
            {
              [
                "Negro azabache, líneas verticales y detalles blancos. La identidad de siempre.",
                "La alternativa blanca de la temporada 2026. El mismo escudo, otro contraste.",
                "Gris con detalles reflectivos en escudo, marca y chevrons.",
              ][model]
            }
          </p>
          <Out href={p.url} className="button">
            Comprar en Tienda 1921
            <ArrowUpRight size={18} />
          </Out>
          <Link to="tienda" className="text-link">
            Explorar la tienda
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="jersey-display">
          <span className="jersey-season" aria-hidden="true">
            2026
          </span>
          <img
            key={p.id + back}
            src={asset(p.id + (back ? "-dorso" : ""))}
            alt={`Camiseta ${names[model].toLowerCase()} Central Norte 2026, ${back ? "dorso" : "frente"}. Fotografía de Tienda 1921.`}
            loading="lazy"
            width="640"
            height="800"
          />
          {model < 2 && (
            <button className="jersey-view" onClick={() => setBack(!back)}>
              {back ? "Ver frente" : "Ver dorso"}
              <ArrowRight size={15} />
            </button>
          )}
          <span className="jersey-credit">
            FOTOGRAFÍAS · TIENDA OFICIAL 1921
          </span>
        </div>
      </div>
    </section>
  );
}
function NewsPage() {
  const [q, setQ] = useState(""),
    [cat, setCat] = useState("Todas");
  const cats = [
    "Todas",
    "Primera Nacional",
    "Institucional",
    "Socios",
    "Inferiores",
    "Femenino",
    "Disciplinas",
  ];
  const filtered = news.filter(
    (n) =>
      (cat === "Todas" || n.category === cat) &&
      (n.title + " " + n.summary)
        .toLocaleLowerCase("es")
        .includes(q.toLocaleLowerCase("es")),
  );
  return (
    <Page title="ACTUALIDAD AZABACHE" label="NOTICIAS Y SERVICIOS">
      <div className="filter-bar">
        <label className="search-field">
          <Search size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar noticias"
            aria-label="Buscar noticias"
          />
        </label>
        <div className="chips" role="group" aria-label="Categorías de noticias">
          {cats.map((c) => (
            <button
              key={c}
              aria-pressed={cat === c}
              className={cat === c ? "active" : ""}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="small-note" aria-live="polite">
        {filtered.length} publicaciones · Las guías llevan fecha de
        verificación; las crónicas, fecha del hecho.
      </p>
      {filtered.length ? (
        <div className="news-grid">
          {filtered.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Search />
          <h3>No hay publicaciones para esta búsqueda</h3>
          <p>Probá otra categoría o palabra.</p>
          <button
            className="button dark"
            onClick={() => {
              setCat("Todas");
              setQ("");
            }}
          >
            Ver todas las publicaciones
          </button>
        </div>
      )}
    </Page>
  );
}
function NewsDetail({ id }: { id: string }) {
  const n = news.find((x) => x.id === id),
    [copied, setCopied] = useState(false),
    open = useContext(ModalContext);
  if (!n) return <NotFound />;
  return (
    <article className="wrap article">
      <Link to="noticias" className="breadcrumb">
        Noticias
        <ChevronRight size={15} /> {n.category}
      </Link>
      <p className="eyebrow">
        {n.type} · {date(n.date)}
      </p>
      <h1>{n.title}</h1>
      <p className="article-lead">{n.summary}</p>
      <figure className={n.image === "escudo" ? "article-emblem" : ""}>
        <img src={asset(n.image)} alt={n.credit} width="1300" height="760" />
        <figcaption>{n.credit}</figcaption>
      </figure>
      <div className="article-body">
        {n.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <div className="article-source">
          <Out href={n.source}>
            Consultar la fuente original <ExternalLink size={15} />
          </Out>
          <p>
            Texto de síntesis preparado para esta propuesta visual. No es un
            comunicado oficial del club.
          </p>
        </div>
        <div className="actions">
          <button
            className="button dark"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(location.href);
                setCopied(true);
              } catch {
                open({
                  title: "Compartir publicación",
                  body: (
                    <p>
                      Copiá este enlace:{" "}
                      <a href={location.href}>{location.href}</a>
                    </p>
                  ),
                });
              }
            }}
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}{" "}
            {copied ? "Enlace copiado" : "Copiar enlace"}
          </button>
          <Out
            href={
              "https://wa.me/?text=" +
              encodeURIComponent(
                n.title + " · Propuesta no oficial " + location.href,
              )
            }
            className="button outline"
          >
            Compartir por WhatsApp
            <ArrowUpRight size={16} />
          </Out>
          <button
            className="button outline"
            onClick={() =>
              open({
                title: "Galería institucional · Archivo",
                body: <Gallery initial={n.image} />,
              })
            }
          >
            Galería del club
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div className="section">
        <SectionHeading
          label="SEGUÍ LEYENDO"
          title="MÁS DE CENTRAL"
          to="noticias"
        />
        <div className="news-grid">
          {news
            .filter((x) => x.id !== id)
            .slice(0, 3)
            .map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
        </div>
      </div>
    </article>
  );
}
function SquadPage() {
  const [pos, setPos] = useState("Todos");
  const filtered = players.filter((p) => pos === "Todos" || pos === p.position);
  return (
    <Page title="PLANTEL PROFESIONAL" label="FÚTBOL · PRIMERA NACIONAL 2026">
      <p className="intro-text">
        Los nombres que llevan la identidad azabache a cada cancha.
      </p>
      <div className="notice">
        <Shield size={19} />
        <p>
          Selección contrastada al {verified}. Las fuentes no coinciden en todas
          las altas y bajas; este listado requiere validación institucional y no
          representa una nómina oficial completa.
        </p>
      </div>
      <div className="chips" role="group" aria-label="Posiciones del plantel">
        {[
          "Todos",
          "Arqueros",
          "Defensores",
          "Mediocampistas",
          "Delanteros",
        ].map((p) => (
          <button
            key={p}
            aria-pressed={pos === p}
            className={pos === p ? "active" : ""}
            onClick={() => setPos(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <p className="small-note" aria-live="polite">
        {filtered.length} futbolistas en esta selección
      </p>
      <div className="player-grid">
        {filtered.map((p) => (
          <PlayerCard player={p} key={p.name} />
        ))}
      </div>
      <div className="coach">
        <div>
          <p className="eyebrow">DIRECCIÓN TÉCNICA</p>
          <h2>ALEXIS MATTEO</h2>
          <p>
            Confirmado por coberturas deportivas de septiembre de 2026.
            Integrantes del resto del cuerpo técnico: pendientes de validación.
          </p>
        </div>
        <Out href={sources.coach} className="text-link">
          Ver referencia del 8 de septiembre
          <ArrowUpRight size={18} />
        </Out>
      </div>
    </Page>
  );
}
function FixturePage() {
  const [view, setView] = useState("Próximos"),
    [competition, setCompetition] = useState("Todas");
  const rows = matches.matches.filter((m) =>
    view === "Resultados"
      ? m.status === "Finalizado"
      : m.status !== "Finalizado",
  );
  return (
    <Page title="CADA PARTIDO, CON CENTRAL" label="FIXTURE Y POSICIONES">
      <div className="fixture-toolbar">
        <div className="chips" role="group" aria-label="Vista del fixture">
          {["Próximos", "Resultados", "Posiciones"].map((v) => (
            <button
              key={v}
              aria-pressed={v === view}
              className={view === v ? "active" : ""}
              onClick={() => setView(v)}
            >
              {v}
            </button>
          ))}
        </div>
        <label className="select-label">
          Competencia
          <select
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
          >
            <option>Todas</option>
            <option>Primera Nacional 2026</option>
          </select>
        </label>
      </div>
      <p className="small-note">
        Corte: {verified} ·{" "}
        {competition === "Todas"
          ? "Todas las competencias cargadas: Primera Nacional 2026"
          : competition}{" "}
        · Zona A
      </p>
      {view === "Posiciones" ? (
        <div className="table-wrap">
          <table>
            <caption>
              Primera Nacional 2026 · Zona A · Corte de la fecha 28
            </caption>
            <thead>
              <tr>
                <th scope="col">POS.</th>
                <th scope="col">EQUIPO</th>
                <th scope="col">PTS</th>
                <th scope="col">PJ</th>
                <th scope="col">DG</th>
              </tr>
            </thead>
            <tbody>
              {matches.standings.map(([team, points, played, diff], i) => (
                <tr
                  key={team}
                  className={team === "Central Norte" ? "highlight" : ""}
                >
                  <td>{i + 1}</td>
                  <th scope="row">
                    <span className="table-team">
                      <TeamCrest name={String(team)} />
                      {team}
                    </span>
                  </th>
                  <td>
                    <strong>{points}</strong>
                  </td>
                  <td>{played}</td>
                  <td>
                    {Number(diff) > 0 ? "+" : ""}
                    {diff}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="fixture-list">
          {rows.map((m) => (
            <div className="fixture-row" key={m.date}>
              <div className="fixture-date">
                <CalendarDays size={18} />
                <strong>{date(m.date)}</strong>
                <span>
                  Fecha {m.round} ·{" "}
                  {m.home === "Central Norte" ? "Local" : "Visitante"}
                </span>
              </div>
              <div className="fixture-teams">
                <span>
                  <TeamCrest name={m.home} />
                  {m.home}
                </span>
                <strong>{m.score || "VS"}</strong>
                <span>
                  <TeamCrest name={m.away} />
                  {m.away}
                </span>
              </div>
              <div className="fixture-status">
                <span>{m.status}</span>
                <small>
                  {m.time ? m.time + " h · Argentina" : "Horario por confirmar"}
                  {m.stadium && (
                    <>
                      <br />
                      {m.stadium}
                    </>
                  )}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="notice">
        <CalendarDays size={18} />
        <p>
          {matches.scheduleNotice} Los datos son una instantánea de la
          investigación, no se actualizan en vivo. Los partidos posteriores al
          12 de septiembre conservan estado “Por confirmar” por diferencias
          entre fuentes.
        </p>
      </div>
      <div className="actions">
        <Out
          href={view === "Posiciones" ? sources.match : sources.fixture}
          className="text-link"
        >
          Consultar fuente deportiva
          <ExternalLink size={16} />
        </Out>
        <Out href={links.portal} className="button dark">
          Portal de entradas
          <ArrowUpRight size={16} />
        </Out>
        <Link to="socios" className="text-link">
          Información para socios
          <ArrowRight size={16} />
        </Link>
      </div>
    </Page>
  );
}
const faqs = [
  [
    "¿Cómo puedo hacerme socio?",
    "Ingresá al portal OurClub para consultar el alta o comunicate con el Departamento de Socios. Crear una cuenta en el portal no implica automáticamente quedar asociado; el club confirma los requisitos y la categoría.",
  ],
  [
    "¿Cómo pago o regularizo mi cuota?",
    "Consultá tu situación en el portal. Si tenés deuda o necesitás asistencia, hablá con el Departamento de Socios antes de pagar para confirmar el importe y los medios habilitados.",
  ],
  [
    "¿Dónde compro las entradas?",
    "En el portal OurClub cuando el club habilita la venta del encuentro. Las condiciones de acceso, sectores y disponibilidad se anuncian para cada partido.",
  ],
  [
    "¿Qué hago si olvidé mi clave?",
    "Usá “¿Olvidaste tu clave?” en la pantalla de acceso de OurClub. El soporte de acceso corresponde al club.",
  ],
  [
    "¿Hay beneficios, categorías especiales u horarios de atención?",
    "Cuotas, beneficios, documentación para menores, jubilados y socios del interior, y horarios de atención requieren confirmación del Departamento de Socios. Esta demo no establece condiciones comerciales.",
  ],
];
function MembersPage() {
  return (
    <Page title="EL ORGULLO DE SER PARTE" label="SOCIOS Y SOCIAS">
      <div className="members-intro">
        <div>
          <p className="intro-text">
            Acompañar. Sostener. Pertenecer.
            <br />
            Tu vínculo con Central va más allá del domingo.
          </p>
          <div className="actions">
            <Out href={links.portal} className="button dark">
              Ingresar al portal
              <ArrowUpRight size={18} />
            </Out>
            <Out href={links.socios} className="button outline">
              <MessageCircle size={18} />
              Consultar por WhatsApp
            </Out>
          </div>
        </div>
        <div className="contact-box">
          <UserRound size={28} />
          <h3>Departamento de Socios</h3>
          <p>
            Av. Entre Ríos 1498 · Salta Capital
            <br />
            +54 9 387 458-6400
          </p>
          <small>Consultá los horarios vigentes antes de acercarte.</small>
        </div>
      </div>
      <div className="steps">
        {[
          [
            "01",
            "Sumate",
            "Consultá los requisitos de asociación y la categoría que te corresponde.",
          ],
          [
            "02",
            "Ingresá",
            "Accedé a OurClub con tus datos. También podés crear una cuenta o recuperar tu clave.",
          ],
          [
            "03",
            "Acompañá",
            "Revisá tu situación y las entradas habilitadas a través de los servicios del club.",
          ],
        ].map(([n, t, p]) => (
          <div key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{p}</p>
          </div>
        ))}
      </div>
      <section className="faq">
        <SectionHeading
          label="CERCA DE CADA SOCIO"
          title="PREGUNTAS FRECUENTES"
        />
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={18} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <div className="notice">
        <Shield size={18} />
        <p>
          Las operaciones se realizan en los canales del club. Esta propuesta no
          recibe pagos ni solicita documentación personal.
        </p>
      </div>
    </Page>
  );
}
function DisciplinesPage() {
  const open = useContext(ModalContext);
  return (
    <Page title="UN CLUB, MUCHAS PASIONES" label="DEPORTES Y FORMACIÓN">
      <p className="intro-text">
        El sentimiento azabache también se construye en cada entrenamiento.
      </p>
      <div className="discipline-grid">
        {disciplines.map((d) => (
          <article key={d.name} className="discipline-card">
            <div className="discipline-graphic">
              <Crest />
              <span>{d.name.toUpperCase()}</span>
            </div>
            <div>
              <p className="eyebrow">{d.category}</p>
              <h2>{d.name}</h2>
              <span className="status-label">{d.status}</span>
              <p>{d.description}</p>
              <button
                className="text-link"
                onClick={() =>
                  open({
                    title: d.name,
                    body: (
                      <>
                        <p>{d.description}</p>
                        <p>
                          <strong>
                            Categorías, días, horarios, lugar de práctica y
                            contacto específico:
                          </strong>{" "}
                          sujetos a actualización institucional. Consultá al
                          club antes de acercarte.
                        </p>
                        <p>
                          No hay una fotografía reciente verificada para esta
                          disciplina; se utiliza el escudo institucional.
                        </p>
                        <Out href={d.source} className="text-link">
                          Ver evidencia consultada
                          <ExternalLink size={16} />
                        </Out>
                        <br />
                        <Out href={links.instagram} className="button dark">
                          Consultar en el canal oficial
                          <ArrowUpRight size={16} />
                        </Out>
                      </>
                    ),
                  })
                }
              >
                Información y consulta
                <ArrowUpRight size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="notice">
        <Shield size={18} />
        <p>
          Básquet, boxeo y actividades culturales o recreativas no se anuncian
          como oferta vigente. La primera local, escuelita y categorías
          juveniles quedan pendientes de una nómina institucional actualizada.
        </p>
      </div>
    </Page>
  );
}
function HistoryPage() {
  return (
    <Page title="105 AÑOS DE IDENTIDAD" label="EL CLUB · NUESTRA HISTORIA">
      <div className="history-banner">
        <img
          src={asset("hero")}
          alt="Abrazo de jugadores, archivo oficial 2025"
          width="1300"
          height="700"
        />
        <div>
          <strong>1921 — 2026</strong>
          <p>
            Una historia que sigue viajando
            <br />
            de generación en generación.
          </p>
        </div>
      </div>
      <div className="timeline">
        {timeline.map((t) => (
          <article key={t.year}>
            <span>{t.year}</span>
            <div>
              <h2>{t.title}</h2>
              <p>{t.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="history-notes">
        <div>
          <TrainFront />
          <h3>El origen ferroviario</h3>
          <p>
            El nombre del club recoge el de la línea ferroviaria. El vínculo con
            los trabajadores del riel forma parte de su memoria institucional.
          </p>
        </div>
        <div>
          <Crest />
          <h3>Negro y blanco</h3>
          <p>
            Los colores siguen identificando al Azabache. La explicación
            histórica exacta de la elección del negro queda pendiente de
            validación documental.
          </p>
        </div>
      </div>
      <div className="actions">
        <Out href={sources.history} className="text-link">
          Reseña histórica consultada
          <ExternalLink size={16} />
        </Out>
        <Out href={sources.champion} className="text-link">
          AFA · Federal A 2024
          <ExternalLink size={16} />
        </Out>
        <Out href={sources.anniversary} className="text-link">
          Aniversario 2026
          <ExternalLink size={16} />
        </Out>
      </div>
      <p className="small-note">
        No se afirma una capacidad del Dr. Luis Güemes ni la primacía provincial
        en la B Nacional ante la falta de contraste documental suficiente.
      </p>
      <Link to="estadios" className="button dark">
        Conocé nuestras casas
        <ArrowUpRight size={18} />
      </Link>
    </Page>
  );
}
const places = [
  {
    name: "Estadio Doctor Luis Güemes",
    label: "LA CASA AZABACHE",
    query: "Estadio Doctor Luis Guemes Salta",
    address: "Av. Entre Ríos 1498 · Salta Capital",
    text: "El estadio del club en el predio de su sede. La historia consultada documenta el usufructo del predio Legado Güemes; se distingue del estadio provincial.",
    image: "escudo",
  },
  {
    name: "Estadio Padre Ernesto Martearena",
    label: "ESCENARIO DEL FÚTBOL PROFESIONAL",
    query: "Estadio Padre Ernesto Martearena Salta",
    address: "Estadio Padre Ernesto Martearena · Salta Capital",
    text: "Estadio provincial donde Central Norte disputa habitualmente partidos de Primera Nacional. La sede de cada encuentro debe confirmarse con la programación oficial.",
    image: "partido",
  },
  {
    name: "Sede social",
    label: "EL PUNTO DE ENCUENTRO",
    query: "Club Atletico Central Norte Av Entre Rios 1498 Salta",
    address: "Av. Entre Ríos 1498 · Salta Capital",
    text: "Consultas institucionales y Departamento de Socios. Confirmá con el club horarios de atención y accesos antes de tu visita.",
    image: "escudo",
  },
];
function StadiumsPage() {
  const [selected, setSelected] = useState(0);
  return (
    <Page title="NUESTRAS CASAS" label="ESTADIOS Y SEDE SOCIAL">
      <div className="venue-layout">
        <div>
          {places.map((p, i) => (
            <button
              key={p.name}
              className={"venue-card " + (i === selected ? "selected" : "")}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
            >
              <span className="eyebrow">{p.label}</span>
              <h2>{p.name}</h2>
              <p>{p.address}</p>
              <ArrowUpRight size={22} />
            </button>
          ))}
        </div>
        <article className="venue-detail">
          <div
            className={
              "venue-image " +
              (places[selected].image === "escudo" ? "venue-emblem" : "")
            }
          >
            <img
              src={asset(places[selected].image)}
              alt={
                selected === 1
                  ? "Partido de Central Norte en el Martearena. Prensa CACN, 2026."
                  : "Escudo institucional, sin fotografía del inmueble verificada"
              }
              width="800"
              height="500"
            />
          </div>
          <h3>{places[selected].name}</h3>
          <p>{places[selected].text}</p>
          <p className="small-note">
            Puertas, sectores habilitados y accesibilidad física: consultar para
            cada actividad.
          </p>
          <Out
            href={
              "https://www.google.com/maps/search/?api=1&query=" +
              encodeURIComponent(places[selected].query)
            }
            className="button dark"
          >
            <MapPin size={18} />
            Cómo llegar
            <ArrowUpRight size={18} />
          </Out>
        </article>
      </div>
      <iframe
        key={selected}
        title={"Mapa de " + places[selected].name}
        className="map"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={
          "https://maps.google.com/maps?q=" +
          encodeURIComponent(places[selected].query) +
          "&output=embed"
        }
      />
      <p className="small-note">
        Mapa de referencia. El Dr. Luis Güemes pertenece a la vida institucional
        del club; el Martearena es un estadio provincial. No se informa
        capacidad ni se anuncian predios adicionales sin validar.
      </p>
      <Link to="multimedia" className="text-link">
        Ver galería institucional
        <ArrowUpRight size={18} />
      </Link>
    </Page>
  );
}
function ShopPage() {
  const [category, setCategory] = useState("Todos");
  return (
    <>
      <div className="wrap page-intro shop-intro">
        <Link to="" className="breadcrumb">
          Inicio
          <ChevronRight size={14} />
        </Link>
        <p className="eyebrow">TIENDA OFICIAL 1921</p>
        <h1>LLEVÁ CENTRAL CON VOS</h1>
      </div>
      <JerseySection />
      <section className="wrap section">
        <SectionHeading
          label="SELECCIÓN DE LA TIENDA OFICIAL"
          title="EL AZABACHE, TODOS LOS DÍAS"
        />
        <p className="small-note">
          Comprá en Tienda 1921: cada producto abre su ficha oficial para elegir
          talle, consultar stock y completar el pago. Selección revisada el 10
          de septiembre de 2026.
        </p>
        <div
          className="chips shop-filters"
          role="group"
          aria-label="Categorías de tienda"
        >
          {["Todos", "Indumentaria", "Merchandising"].map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              className={c === category ? "active" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {products
            .filter((p) => category === "Todos" || p.category === category)
            .map((p) => (
              <Out href={p.url} key={p.id} className="product-card">
                <div>
                  <img
                    src={asset(p.id)}
                    alt={p.name + " · Tienda 1921"}
                    width="640"
                    height="800"
                    loading="lazy"
                  />
                </div>
                <h3>{p.name}</h3>
                <span>
                  Ver producto y comprar
                  <ArrowUpRight size={17} />
                </span>
              </Out>
            ))}
        </div>
        <div className="shop-catalog">
          <div>
            <p className="eyebrow">PARA VESTIR, REGALAR Y ACOMPAÑARTE</p>
            <h2>TODO EL UNIVERSO AZABACHE</h2>
            <p>
              Más remeras, accesorios, mates, termos y artículos para el asado
              en el catálogo oficial. Disponibilidad y precios sujetos a la
              tienda.
            </p>
          </div>
          <Out
            href="https://www.tienda1921.com.ar/merchandising-oficial/"
            className="button dark"
          >
            Ver todo el merchandising
            <ArrowUpRight size={18} />
          </Out>
          <Out href={links.store} className="text-link">
            Catálogo completo
            <ArrowUpRight size={18} />
          </Out>
        </div>
        <div className="shop-addresses">
          <div>
            <ShoppingBag />
            <h3>Tienda Centro</h3>
            <p>Pellegrini 323 · Salta Capital</p>
          </div>
          <div>
            <MapPin />
            <h3>Tienda en la sede</h3>
            <p>Av. Entre Ríos 1498 · Salta Capital</p>
          </div>
          <Out href={links.storeWhatsApp} className="button dark">
            <MessageCircle size={18} />
            Consultar a Tienda 1921
            <ArrowUpRight size={17} />
          </Out>
        </div>
        <p className="small-note">
          La selección se limita a productos comprobados. No se presenta “Legado
          Azabache” como una colección vigente sin confirmación.
        </p>
      </section>
    </>
  );
}
function SponsorsPage() {
  return (
    <Page title="ACOMPAÑAR ES SER PARTE" label="VÍNCULOS COMERCIALES">
      <p className="intro-text">
        Un lugar para las marcas que acompañan la historia y el presente de
        Central Norte.
      </p>
      <div className="sponsor-feature">
        <div>
          <strong>Macro</strong>
          <p>Sponsor frontal · Indumentaria de juego 2026</p>
        </div>
        <div>
          <strong>hummel</strong>
          <p>Marca técnica · Indumentaria de juego 2026</p>
        </div>
      </div>
      <p className="small-note">
        Marcas verificadas en las fichas y fotografías de Tienda 1921. No se
        informa exclusividad, duración ni condiciones de acuerdos.
      </p>
      <SectionHeading
        label="OPORTUNIDADES CONCEPTUALES"
        title="UN ESPACIO PARA CRECER JUNTOS"
      />
      <div className="steps">
        {[
          [
            "01",
            "Presencia institucional",
            "Visibilidad de marca en el sitio y en sus contenidos.",
          ],
          [
            "02",
            "Contenido compartido",
            "Acciones editoriales y campañas sujetas a aprobación del club.",
          ],
          [
            "03",
            "Comunidad azabache",
            "Propuestas vinculadas al deporte, socios y vida institucional.",
          ],
        ].map(([n, t, p]) => (
          <div key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{p}</p>
            <small>Ejemplo demostrativo · sin oferta comercial vigente</small>
          </div>
        ))}
      </div>
      <Link to="contacto" className="button dark">
        Quiero acompañar al club
        <ArrowUpRight size={18} />
      </Link>
      <p className="small-note">
        El formulario es demostrativo. El contacto y las condiciones comerciales
        deberán ser definidos por el área correspondiente.
      </p>
    </Page>
  );
}
function PressPage() {
  return (
    <Page title="CENTRO DE PRENSA" label="COMUNICACIÓN INSTITUCIONAL">
      <p className="intro-text">
        Información, identidad y recursos del club en un mismo lugar.
      </p>
      <div className="press-grid">
        <article className="press-resource">
          <Crest />
          <h2>Escudo institucional</h2>
          <p>
            Archivo obtenido del sitio del club. Se conserva el diseño original
            y su proporción.
          </p>
          <a
            href={asset("escudo")}
            download="central-norte-escudo.webp"
            className="button dark"
          >
            <Download size={18} />
            Descargar escudo
          </a>
          <small>
            Uso sujeto a autorización del club. No constituye un manual oficial
            de marca.
          </small>
        </article>
        <article className="press-resource">
          <Ticket />
          <h2>Acreditaciones</h2>
          <p>
            Convocatoria, requisitos, fechas y contacto de prensa pendientes de
            publicación institucional.
          </p>
          <button className="button outline" disabled>
            Solicitud aún no habilitada
          </button>
          <small>La demo no tramita acreditaciones.</small>
        </article>
        <article className="press-resource">
          <Download />
          <h2>Kit de prensa</h2>
          <p>
            Espacio previsto para fotografías autorizadas y documentos
            institucionales.
          </p>
          <button className="button outline" disabled>
            Kit oficial por confirmar
          </button>
          <Link to="multimedia" className="text-link">
            Explorar archivo fotográfico
            <ArrowUpRight size={18} />
          </Link>
        </article>
      </div>
      <section className="section">
        <SectionHeading
          label="PUBLICACIONES INSTITUCIONALES"
          title="INFORMACIÓN PARA MEDIOS"
        />
        <div className="notice">
          <Shield size={18} />
          <p>
            No se obtuvieron comunicados recientes descargables, normas
            oficiales de marca ni un correo público de Prensa confirmado. Se
            enlaza el canal oficial para consultar novedades.
          </p>
        </div>
        <Out href={links.x} className="button dark">
          Publicaciones oficiales en X<ArrowUpRight size={18} />
        </Out>
        <Link to="contacto" className="text-link">
          Contacto por área
          <ArrowRight size={18} />
        </Link>
      </section>
    </Page>
  );
}
function MultimediaPage() {
  return (
    <Page title="EL SENTIMIENTO, EN IMÁGENES" label="MULTIMEDIA">
      <p className="intro-text">
        Fotografías reales del archivo del club y de su presente deportivo.
      </p>
      <div className="media-grid">
        {galleryItems.map((g) => (
          <GalleryButton key={g.id} id={g.id} label={g.label} />
        ))}
      </div>
      <div className="video-card">
        <Play size={40} />
        <div>
          <h2>LA ACTUALIDAD EN LOS CANALES OFICIALES</h2>
          <p>
            Seguí las publicaciones y videos en Instagram y X del club salteño.
          </p>
          <p className="small-note">
            No se incorpora un canal de YouTube o TikTok sin confirmar su
            pertenencia a Central Norte de Salta.
          </p>
          <div className="actions">
            <Out href={links.instagram} className="button dark">
              Instagram oficial
              <ArrowUpRight size={18} />
            </Out>
            <Out href={links.x} className="text-link">
              X oficial
              <ArrowUpRight size={18} />
            </Out>
          </div>
        </div>
      </div>
    </Page>
  );
}
function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Page title="CERCA TUYO" label="CONTACTO">
      <div className="contact-layout">
        <div>
          <div className="contact-box">
            <UserRound />
            <h3>Departamento de Socios</h3>
            <p>Asociación, cuotas y asistencia de acceso al portal.</p>
            <Out href={links.socios} className="text-link">
              +54 9 387 458-6400
              <ArrowUpRight size={17} />
            </Out>
          </div>
          <div className="contact-box">
            <ShoppingBag />
            <h3>Tienda oficial 1921</h3>
            <p>Pellegrini 323 / Av. Entre Ríos 1498</p>
            <Out href={links.storeWhatsApp} className="text-link">
              +54 387 311-9822
              <ArrowUpRight size={17} />
            </Out>
          </div>
          <div className="contact-box">
            <MapPin />
            <h3>Sede social</h3>
            <p>Av. Entre Ríos 1498 · Salta Capital</p>
            <Link to="estadios" className="text-link">
              Mapa y cómo llegar
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <p className="eyebrow">FORMULARIO DEMOSTRATIVO</p>
          <h2>ENCONTRÁ TU ÁREA</h2>
          <p>
            Probá el recorrido con datos de ejemplo. No se envían ni se guardan
            consultas.
          </p>
          <label>
            Área de consulta
            <select name="area" onChange={() => setSent(false)}>
              <option>Consulta general</option>
              <option>Socios</option>
              <option>Prensa</option>
              <option>Sponsors</option>
              <option>Disciplinas</option>
            </select>
          </label>
          <label>
            Nombre de ejemplo
            <input
              name="nombre"
              autoComplete="off"
              required
              maxLength={80}
              placeholder="Nombre"
              onChange={() => setSent(false)}
            />
          </label>
          <label>
            Email de ejemplo
            <input
              name="email"
              type="email"
              autoComplete="off"
              required
              maxLength={120}
              placeholder="nombre@ejemplo.com"
              onChange={() => setSent(false)}
            />
          </label>
          <label>
            Mensaje
            <textarea
              name="mensaje"
              required
              maxLength={1500}
              rows={4}
              placeholder="Escribí una consulta de prueba"
              onChange={() => setSent(false)}
            />
          </label>
          <button type="submit" className="button dark">
            Probar formulario
            <ArrowUpRight size={18} />
          </button>
          {sent && (
            <div className="form-success" role="status">
              <Check size={22} />
              <p>
                Formulario demostrativo. En el sitio definitivo se conectará con
                el área correspondiente.
              </p>
            </div>
          )}
          <small>
            Prensa y sponsors: contacto específico pendiente de validación. Para
            una consulta real, utilizá los canales oficiales publicados.
          </small>
        </form>
      </div>
      <section className="contact-social">
        <h3>SEGUÍ LA ACTUALIDAD AZABACHE</h3>
        <Out href={links.instagram}>
          Instagram
          <ArrowUpRight size={17} />
        </Out>
        <Out href={links.facebook}>
          Facebook
          <ArrowUpRight size={17} />
        </Out>
        <Out href={links.x}>
          X<ArrowUpRight size={17} />
        </Out>
      </section>
    </Page>
  );
}
function FootballPage() {
  return (
    <>
      <Page title="FÚTBOL AZABACHE" label="PRIMERA NACIONAL · TEMPORADA 2026">
        <p className="intro-text">
          El presente deportivo de Central, sus protagonistas y cada partido.
        </p>
        <div className="football-links">
          <Link to="plantel">
            <Crest />
            <h2>PLANTEL PROFESIONAL</h2>
            <p>Futbolistas y dirección técnica</p>
            <ArrowUpRight />
          </Link>
          <Link to="fixture">
            <CalendarDays size={50} />
            <h2>FIXTURE Y POSICIONES</h2>
            <p>Resultados, próximos encuentros y Zona A</p>
            <ArrowUpRight />
          </Link>
          <Link to="disciplinas">
            <Shield size={50} />
            <h2>FEMENINO Y FORMACIÓN</h2>
            <p>Información y consultas de categorías</p>
            <ArrowUpRight />
          </Link>
        </div>
        <section className="section">
          <SectionHeading
            label="EL PRESENTE DEL EQUIPO"
            title="NOTICIAS DE FÚTBOL"
            to="noticias"
          />
          <div className="news-grid">
            {news
              .filter((n) => n.category === "Primera Nacional")
              .map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
          </div>
        </section>
      </Page>
    </>
  );
}
function SourcesPage() {
  return (
    <Page title="FUENTES Y ALCANCE" label="TRANSPARENCIA DE LA PROPUESTA">
      <p className="intro-text">Última verificación: {verified}.</p>
      <div className="prose">
        <p>
          Esta es una propuesta visual no oficial de Lautaro para el Club
          Atlético Central Norte de Salta. No procesa pagos, altas de socios,
          compras, consultas ni acreditaciones. No contiene información de
          conversaciones privadas.
        </p>
        <h2>Qué se verificó</h2>
        <p>
          Identidad, aniversario, antecedentes históricos, campeonato Federal A
          2024, resultado del 6 de septiembre, próximo rival, selección del
          plantel, técnico de septiembre, tabla de la Zona A y productos de
          Tienda 1921.
        </p>
        <h2>Qué necesita validación institucional</h2>
        <p>
          Plantel completo, cuerpo técnico adicional, horarios futuros, accesos
          a estadios, categorías deportivas, cuotas, beneficios, autoridades
          vigentes, contactos de prensa, documentos y derechos de reutilización
          de las fotografías para el sitio definitivo.
        </p>
        <h2>Imágenes y marcas</h2>
        <p>
          El escudo y las fotografías de archivo proceden del sitio del club. La
          fotografía del encuentro con Almirante Brown está acreditada a Prensa
          CACN por Gente de Salta. Las imágenes de productos pertenecen a Tienda
          1921. Los escudos de los rivales se obtuvieron de las fichas de Mundo
          Ascenso y se conservan sin redibujar. No se generaron escudos ni
          rostros. La atribución no implica licencia de reutilización para una
          web definitiva.
        </p>
        <h2>Canales descartados</h2>
        <p>
          El Linktree CLUBCENTRALNORTE suministrado como referencia deriva a
          canales de Tucumán. Se excluyó. YouTube y TikTok quedan pendientes de
          confirmación para Salta.
        </p>
        <h2>Datos deportivos</h2>
        <p>
          Los listados son una instantánea local y no se actualizan
          automáticamente. Las fuentes discrepan en horarios y algunas fechas
          futuras; la demo señala esos campos como pendientes. La tabla
          corresponde a la Zona A tras la fecha 28 según Mundo Ascenso.
        </p>
        <ul className="source-list">
          {Object.entries(sources).map(([key, url]) => (
            <li key={key}>
              <Out href={url}>
                {
                  (
                    {
                      match: "Resultado y tabla · Mundo Ascenso",
                      fixture: "Calendario · Goal",
                      squad: "Plantel · GioScore",
                      positions: "Posiciones de futbolistas · Mundo Ascenso",
                      coach: "Técnico de septiembre · Mundo Ascenso",
                      history: "Reseña histórica · Central Norte Web",
                      anniversary: "105 años · Aries",
                      champion: "Federal A 2024 · AFA",
                      hockey: "Hockey · Asociación Salteña",
                      female: "Femenino · Ascenso del Interior",
                      volley: "Vóley · Botineros",
                      futsal: "Futsal · Nuevo Diario",
                    } as Record<string, string>
                  )[key]
                }
                <ExternalLink size={14} />
              </Out>
            </li>
          ))}
        </ul>
        <Out href={links.store} className="text-link">
          Tienda oficial 1921
          <ExternalLink size={15} />
        </Out>
        <br />
        <Out href={links.official} className="text-link">
          Sitio actual del club
          <ExternalLink size={15} />
        </Out>
      </div>
    </Page>
  );
}
function NotFound() {
  return (
    <Page title="ESTA PÁGINA NO ESTÁ EN JUEGO" label="404">
      <p>El enlace no corresponde a una sección de la propuesta.</p>
      <Link to="" className="button dark">
        Volver al inicio
        <ArrowRight size={17} />
      </Link>
    </Page>
  );
}
function Page({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="wrap page">
      <div className="page-intro">
        <Link to="" className="breadcrumb">
          Inicio <ChevronRight size={14} />
        </Link>
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
}
function Content({ route }: { route: string }) {
  if (route.startsWith("noticias/"))
    return <NewsDetail key={route} id={route.split("/")[1]} />;
  switch (route) {
    case "":
      return <Home />;
    case "noticias":
      return <NewsPage />;
    case "futbol":
      return <FootballPage />;
    case "plantel":
      return <SquadPage />;
    case "fixture":
      return <FixturePage />;
    case "socios":
      return <MembersPage />;
    case "disciplinas":
      return <DisciplinesPage />;
    case "historia":
      return <HistoryPage />;
    case "estadios":
      return <StadiumsPage />;
    case "tienda":
      return <ShopPage />;
    case "sponsors":
      return <SponsorsPage />;
    case "prensa":
      return <PressPage />;
    case "multimedia":
      return <MultimediaPage />;
    case "contacto":
      return <ContactPage />;
    case "fuentes":
      return <SourcesPage />;
    default:
      return <NotFound />;
  }
}
export default function App() {
  const [route, setRoute] = useState(location.hash.replace(/^#\/?/, ""));
  const [modal, setModal] = useState<DialogContent | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const cb = () => {
      setRoute(location.hash.replace(/^#\/?/, ""));
      setModal(null);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", cb);
    return () => window.removeEventListener("hashchange", cb);
  }, []);
  useEffect(() => {
    document.title = route
      ? `${route.split("/")[0].replace(/^./, (c) => c.toUpperCase())} — Central Norte · Propuesta visual`
      : "Central Norte — Propuesta visual";
  }, [route]);
  useEffect(() => {
    if (modal) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  return (
    <ModalContext.Provider value={setModal}>
      <Header />
      <main id="main" tabIndex={-1}>
        <Content route={route} />
      </main>
      <Footer />
      <dialog
        ref={dialog}
        onCancel={() => setModal(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModal(null);
        }}
        aria-labelledby="modal-title"
      >
        <div className="dialog-content">
          <button
            className="close-modal"
            onClick={() => setModal(null)}
            aria-label="Cerrar ventana"
          >
            <X />
          </button>
          <h2 id="modal-title">{modal?.title}</h2>
          {modal?.body}
        </div>
      </dialog>
    </ModalContext.Provider>
  );
}
