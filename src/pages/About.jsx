import { Link } from "react-router-dom";
const values = [
  {
    title: "Considered Design",
    body: "Every piece begins with a question: what problem does this solve in someone's wardrobe? We design for longevity, not seasons.",
  },
  {
    title: "Honest Materials",
    body: "Natural fibres where possible, recycled synthetics where technical performance matters. No greenwashing — just better choices, disclosed clearly.",
  },
  {
    title: "Fair Partnerships",
    body: "Our suppliers are named and visited. We pay on time, ask questions, and build relationships that last longer than a single collection.",
  },
  {
    title: "No Noise",
    body: "Two collections per year. No constant drops, no artificial scarcity. We make what we believe in and stand behind it.",
  },
];
const team = [
  {
    name: "Mara Lindström",
    role: "Creative Director",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "James Osei",
    role: "Head of Product",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Elif Yıldız",
    role: "Head of Sustainability",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&auto=format",
  },
];
export default function About() {
  return (
    <div style={{ background: "var(--background)", paddingTop: "70px" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "70vh",
          minHeight: "480px",
          overflow: "hidden",
          background: "var(--foreground)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&h=900&fit=crop&auto=format"
          alt="AURA atelier"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(247,243,238,0.6)",
              marginBottom: "1rem",
            }}
          >
            About AURA
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 500,
              color: "#F7F3EE",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Clothing for
            <br />
            <em>the considered life.</em>
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section
        style={{ maxWidth: "800px", margin: "0 auto", padding: "6rem 2rem" }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            fontWeight: 400,
            color: "var(--foreground)",
            lineHeight: 1.55,
            textAlign: "center",
          }}
        >
          AURA was founded on a simple premise: that a smaller wardrobe, made
          better, is more satisfying than a full one made fast. We design
          timeless pieces in natural fibres, made in factories we've visited,
          priced honestly.
        </p>
      </section>

      {/* Values */}
      <section
        style={{
          background: "var(--secondary)",
          padding: "5rem 2rem",
        }}
        id="sustainability"
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            How we operate
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 500,
              color: "var(--foreground)",
              marginBottom: "3rem",
              textAlign: "center",
            }}
          >
            Our Principles
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2.5rem",
            }}
            className="values-grid"
          >
            {values.map((v) => (
              <div key={v.title}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "var(--foreground)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.75,
                  }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.75rem",
            textAlign: "center",
          }}
        >
          The people behind AURA
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 500,
            color: "var(--foreground)",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          Our Team
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
          className="team-grid"
        >
          {team.map((member) => (
            <div key={member.name} style={{ textAlign: "center" }}>
              <div
                style={{
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  borderRadius: "var(--radius)",
                  marginBottom: "1.25rem",
                  background: "var(--muted)",
                }}
                className="image-hover-zoom"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  marginBottom: "0.25rem",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--muted-foreground)",
                }}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "var(--foreground)",
          padding: "5rem 2rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 500,
            color: "var(--primary-foreground)",
            marginBottom: "1.5rem",
          }}
        >
          Wear less,
          <br />
          <em>but wear better.</em>
        </h2>
        <Link
          to="/shop"
          className="btn-primary"
          style={{
            background: "var(--accent)",
            borderColor: "var(--accent)",
            color: "#fff",
          }}
        >
          Shop the Collection
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .values-grid, .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
