import styled, { keyframes } from "styled-components";

/* ─── Animaciones ─────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Layout ─────────────────────────────────────────────── */
const Page = styled.div`
  min-height: 100vh;
  font-family: "Nunito", sans-serif;
  background: #fafaf8;
  color: #1c2717;
`;

/* ─── NAVBAR ─────────────────────────────────────────────── */
const Nav = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 70px;
  background: rgba(28, 39, 23, 0.92);
  backdrop-filter: blur(12px);

  @media (max-width: 600px) { padding: 0 20px; }
`;

const Logo = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  color: #c8d9b0;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;

  i { color: #8db87a; font-size: 1.4rem; }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 28px;

  a {
    color: #c8d9b0;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 600;
    transition: color 0.2s;
    &:hover { color: #fff; }
  }

  @media (max-width: 600px) { display: none; }
`;

const ReservarBtn = styled.a`
  padding: 9px 22px;
  border-radius: 30px;
  background: linear-gradient(135deg, #5a7a45, #8db87a);
  color: white !important;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(90,122,69,0.45); }
`;

/* ─── HERO ───────────────────────────────────────────────── */
const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px 60px;
  background:
    linear-gradient(to bottom, rgba(15,22,12,0.62), rgba(15,22,12,0.45)),
    url('https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600') center/cover no-repeat;
`;

const HeroContent = styled.div`
  max-width: 720px;
  animation: ${fadeUp} 0.8s ease both;

  h1 {
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 18px;
    text-shadow: 0 2px 16px rgba(0,0,0,0.4);
  }

  p {
    font-size: 1.15rem;
    color: #d4e8c2;
    margin-bottom: 36px;
    line-height: 1.7;
  }
`;

const HeroBtns = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const BtnPrimary = styled.a`
  padding: 14px 34px;
  border-radius: 40px;
  background: linear-gradient(135deg, #5a7a45, #8db87a);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(90,122,69,0.5); }
`;

const BtnSecondary = styled.a`
  padding: 14px 34px;
  border-radius: 40px;
  border: 2px solid rgba(255,255,255,0.55);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s;
  &:hover { background: rgba(255,255,255,0.15); }
`;

/* ─── SECCIONES COMUNES ──────────────────────────────────── */
const Section = styled.section`
  padding: 80px 48px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) { padding: 60px 20px; }
`;

const SectionLabel = styled.span`
  display: inline-block;
  background: #e8f2df;
  color: #3d6130;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  font-weight: 800;
  color: #1c2717;
  margin-bottom: 10px;
`;

const SectionSub = styled.p`
  font-size: 1rem;
  color: #5a6b52;
  margin-bottom: 44px;
  max-width: 500px;
`;

/* ─── CABAÑAS ────────────────────────────────────────────── */
const CabanasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
`;

const CabanaCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  transition: transform 0.25s, box-shadow 0.25s;
  animation: ${fadeUp} 0.6s ease both;
  animation-delay: ${p => p.delay || '0s'};

  &:hover { transform: translateY(-6px); box-shadow: 0 12px 36px rgba(0,0,0,0.13); }
`;

const CabanaImg = styled.div`
  height: 200px;
  background: url('${p => p.src}') center/cover no-repeat;
  position: relative;
`;

const CabanaBadge = styled.span`
  position: absolute;
  top: 12px; right: 12px;
  background: ${p => p.disponible ? 'rgba(90,122,69,0.92)' : 'rgba(180,60,60,0.85)'};
  color: white;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
`;

const CabanaBody = styled.div`
  padding: 20px;

  h3 { font-size: 1.15rem; margin-bottom: 6px; color: #1c2717; }
  p  { font-size: 0.9rem; color: #6b7e62; line-height: 1.55; margin-bottom: 14px; }
`;

const CabanaMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Precio = styled.span`
  font-size: 1.1rem;
  font-weight: 800;
  color: #3d6130;
`;

const VerBtn = styled.a`
  font-size: 0.85rem;
  font-weight: 700;
  color: #5a7a45;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: gap 0.2s;
  &:hover { gap: 8px; }
`;

/* ─── PROMOCIONES ────────────────────────────────────────── */
const PromoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const PromoCard = styled.div`
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(135deg, ${p => p.from}, ${p => p.to});
  padding: 28px 24px;
  color: white;
  position: relative;
  animation: ${fadeUp} 0.6s ease both;
  animation-delay: ${p => p.delay || '0s'};
  transition: transform 0.2s;

  &:hover { transform: translateY(-4px); }

  &::after {
    content: '';
    position: absolute;
    bottom: -30px; right: -30px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
  }
`;

const PromoIcon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 12px;
`;

const PromoTag = styled.span`
  display: inline-block;
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const PromoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 8px;
`;

const PromoDesc = styled.p`
  font-size: 0.9rem;
  opacity: 0.88;
  line-height: 1.55;
  margin-bottom: 16px;
`;

const PromoDescuento = styled.div`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -1px;
`;

/* ─── FOOTER ─────────────────────────────────────────────── */
const Footer = styled.footer`
  background: #1c2717;
  color: #8fa882;
  text-align: center;
  padding: 32px 24px;
  font-size: 0.9rem;
`;

/* ══════════════════════════════════════════════════════════ */
/*                       DATOS                               */
/* ══════════════════════════════════════════════════════════ */
const CABANAS = [
  {
    id: 1,
    nombre: "Cabaña Palmas",
    descripcion: "Rodeada de palmas tropicales, ideal para parejas que buscan privacidad y naturaleza.",
    precio: "$240.000 / noche",
    disponible: true,
    img: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600",
  },
  {
    id: 2,
    nombre: "Cabaña El Roble",
    descripcion: "Amplio espacio para familias, con fogón, hamaca y vista al rio.",
    precio: "$310.000 / noche",
    disponible: true,
    img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600",
  },
  {
    id: 3,
    nombre: "Cabaña La Ceiba",
    descripcion: "Suite premium bajo la sombra de una ceiba centenaria. Lujo y tranquilidad.",
    precio: "$420.000 / noche",
    disponible: false,
    img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600",
  },
];

const PROMOCIONES = [
  {
    id: 1,
    icono: "🌙",
    tag: "Fin de semana",
    titulo: "Noche de Lujo",
    desc: "Reserva viernes y sábado y llévate una botella de vino de cortesía.",
    descuento: "15% OFF",
    from: "#3d6130",
    to: "#5a7a45",
    delay: "0.1s",
  },
  {
    id: 2,
    icono: "👨‍👩‍👧",
    tag: "Familias",
    titulo: "Plan Familiar",
    desc: "Niños menores de 10 años sin costo adicional. Incluye desayuno para 4.",
    descuento: "GRATIS",
    from: "#5a4530",
    to: "#8b6542",
    delay: "0.2s",
  },
  {
    id: 3,
    icono: "⚡",
    tag: "Última hora",
    titulo: "Reserva Hoy",
    desc: "Reservas para esta semana con descuento especial. ¡Cupos limitados!",
    descuento: "20% OFF",
    from: "#2d3a60",
    to: "#4a5fa8",
    delay: "0.3s",
  },
  {
    id: 4,
    icono: "🌿",
    tag: "Temporada",
    titulo: "Paquete Eco",
    desc: "3 noches con tour guiado por el bosque, kayak y fogón incluido.",
    descuento: "TODO INC.",
    from: "#2d5a4a",
    to: "#3d8a6e",
    delay: "0.4s",
  },
];

/* ══════════════════════════════════════════════════════════ */
/*                     COMPONENTE                            */
/* ══════════════════════════════════════════════════════════ */
function Landing() {
  return (
    <Page>
      {/* ── Navbar ── */}
      <Nav>
        <Logo><i className="bi bi-tree-fill" /> Glamping</Logo>
        <NavLinks>
          <a href="#cabanas">Cabañas</a>
          <a href="#promociones">Promociones</a>
          <a href="#contacto">Contacto</a>
        </NavLinks>
        <ReservarBtn href="#cabanas">Reservar ahora</ReservarBtn>
      </Nav>

      {/* ── Hero ── */}
      <Hero>
        <HeroContent>
          <h1>Desconéctate del mundo.<br />Conéctate con la naturaleza.</h1>
          <p>Vive una experiencia única en nuestras cabañas de glamping, donde el lujo y la naturaleza se unen para crear momentos inolvidables.</p>
          <HeroBtns>
            <BtnPrimary href="#cabanas">Ver cabañas</BtnPrimary>
            <BtnSecondary href="#promociones">Ver promociones</BtnSecondary>
          </HeroBtns>
        </HeroContent>
      </Hero>

      {/* ── Cabañas ── */}
      <Section id="cabanas">
        <SectionLabel>Nuestras cabañas</SectionLabel>
        <SectionTitle>Encuentra tu cabaña perfecta</SectionTitle>
        <SectionSub>Cada cabaña fue diseñada para ofrecerte privacidad, confort y contacto total con la naturaleza.</SectionSub>
        <CabanasGrid>
          {CABANAS.map((c, i) => (
            <CabanaCard key={c.id} delay={`${i * 0.12}s`}>
              <CabanaImg src={c.img}>
                <CabanaBadge disponible={c.disponible}>
                  {c.disponible ? "✓ Disponible" : "✗ Ocupada"}
                </CabanaBadge>
              </CabanaImg>
              <CabanaBody>
                <h3>{c.nombre}</h3>
                <p>{c.descripcion}</p>
                <CabanaMeta>
                  <Precio>{c.precio}</Precio>
                  <VerBtn href="#">Ver más <i className="bi bi-arrow-right" /></VerBtn>
                </CabanaMeta>
              </CabanaBody>
            </CabanaCard>
          ))}
        </CabanasGrid>
      </Section>

      {/* ── Separador ── */}
      <div style={{ background: "#f0f5eb", padding: "60px 48px", textAlign: "center" }}>
        <p style={{ fontSize: "1.1rem", color: "#4a6741", fontWeight: 600 }}>
          🌿 &nbsp; Más de 500 familias han vivido la experiencia glamping con nosotros
        </p>
      </div>

      {/* ── Promociones ── */}
      <Section id="promociones">
        <SectionLabel>Promociones</SectionLabel>
        <SectionTitle>Ofertas especiales para ti</SectionTitle>
        <SectionSub>Aprovecha nuestros descuentos de temporada y planes exclusivos.</SectionSub>
        <PromoGrid>
          {PROMOCIONES.map((p) => (
            <PromoCard key={p.id} from={p.from} to={p.to} delay={p.delay}>
              <PromoIcon>{p.icono}</PromoIcon>
              <PromoTag>{p.tag}</PromoTag>
              <PromoTitle>{p.titulo}</PromoTitle>
              <PromoDesc>{p.desc}</PromoDesc>
              <PromoDescuento>{p.descuento}</PromoDescuento>
            </PromoCard>
          ))}
        </PromoGrid>
      </Section>

      {/* ── Footer ── */}
      <Footer id="contacto">
        <p style={{ color: "#c8d9b0", fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
          🌿 Glamping Reserva Natural
        </p>
        <p>Contáctanos: contacto@glamping.com · +57 300 000 0000</p>
        <p style={{ marginTop: 12, opacity: 0.5 }}>© 2025 Glamping. Todos los derechos reservados.</p>
      </Footer>
    </Page>
  );
}

export default Landing;
