import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
const subcategories = [...new Set(products.map((p) => p.subcategory))];
const allColors = [
  ...new Map(
    products.flatMap((p) => p.colors).map((c) => [c.name, c]),
  ).values(),
].slice(0, 8);
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "New Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];
export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "all",
  );
  const [selectedSub, setSelectedSub] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const filtered = useMemo(() => {
    let list = [...products];
    if (queryParam) {
      const q = queryParam.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    if (selectedCategory && selectedCategory !== "all") {
      if (selectedCategory === "new") list = list.filter((p) => p.isNew);
      else if (selectedCategory === "sale") list = list.filter((p) => p.isSale);
      else list = list.filter((p) => p.category === selectedCategory);
    }
    if (selectedSub.length) {
      list = list.filter((p) => selectedSub.includes(p.subcategory));
    }
    if (selectedColors.length) {
      list = list.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name)),
      );
    }
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );
    switch (sortBy) {
      case "newest":
        list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [
    queryParam,
    selectedCategory,
    selectedSub,
    selectedColors,
    priceRange,
    sortBy,
  ]);
  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;
  const toggleSub = (sub) => {
    setSelectedSub((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub],
    );
    setPage(1);
  };
  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
    setPage(1);
  };
  const filterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedSub.length +
    selectedColors.length +
    (priceRange[0] > 0 || priceRange[1] < 600 ? 1 : 0);
  const categoryTabs = [
    { value: "all", label: "All" },
    { value: "women", label: "Women" },
    { value: "men", label: "Men" },
    { value: "accessories", label: "Accessories" },
    { value: "new", label: "New" },
    { value: "sale", label: "Sale" },
  ];
  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        style={{
          paddingTop: "7rem",
          paddingBottom: "2rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          borderBottom: "1px solid var(--border)",
          background: "var(--secondary)",
        }}
      >
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          {queryParam ? (
            <>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                Search results for
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.25rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                }}
              >
                "{queryParam}"
              </h1>
            </>
          ) : (
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.25rem",
                fontWeight: 500,
                color: "var(--foreground)",
              }}
            >
              Shop
            </h1>
          )}

          {/* Category tabs */}
          <div
            style={{
              display: "flex",
              gap: "0",
              marginTop: "2rem",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setSelectedCategory(tab.value);
                  setPage(1);
                }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.625rem 1.25rem",
                  background: "none",
                  border: "none",
                  borderBottom:
                    selectedCategory === tab.value
                      ? "2px solid var(--foreground)"
                      : "2px solid transparent",
                  color:
                    selectedCategory === tab.value
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
        className="shop-layout"
      >
        {/* ── Sidebar filters (desktop) ── */}
        <aside
          className="hidden md:block"
          style={{ position: "sticky", top: "80px" }}
        >
          <FilterPanel
            subcategories={subcategories}
            selectedSub={selectedSub}
            toggleSub={toggleSub}
            allColors={allColors}
            selectedColors={selectedColors}
            toggleColor={toggleColor}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onReset={() => {
              setSelectedCategory("all");
              setSelectedSub([]);
              setSelectedColors([]);
              setPriceRange([0, 600]);
              setPage(1);
            }}
          />
        </aside>

        {/* ── Product grid ── */}
        <div>
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
              }}
            >
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
            <div
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              {/* Mobile filter toggle */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="md:hidden"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  padding: "0.5rem 0.875rem",
                  cursor: "pointer",
                  borderRadius: "var(--radius)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12M4 8h8M6 12h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Filter{filterCount > 0 ? ` (${filterCount})` : ""}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  padding: "0.5rem 2rem 0.5rem 0.875rem",
                  cursor: "pointer",
                  borderRadius: "var(--radius)",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238A8278' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile filters drawer */}
          {filtersOpen && (
            <div
              style={{
                background: "var(--secondary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
              className="md:hidden"
            >
              <FilterPanel
                subcategories={subcategories}
                selectedSub={selectedSub}
                toggleSub={toggleSub}
                allColors={allColors}
                selectedColors={selectedColors}
                toggleColor={toggleColor}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onReset={() => {
                  setSelectedCategory("all");
                  setSelectedSub([]);
                  setSelectedColors([]);
                  setPriceRange([0, 600]);
                  setPage(1);
                }}
              />
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState query={queryParam} />
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem 1rem",
                }}
                className="product-grid"
              >
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {hasMore && (
                <div style={{ textAlign: "center", marginTop: "3rem" }}>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="btn-outline"
                    style={{ minWidth: "200px" }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .shop-layout { grid-template-columns: 1fr !important; }
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hidden.md\\:block { display: none !important; }
          .md\\:hidden { display: flex !important; }
        }
        @media (max-width: 480px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
function FilterPanel({
  subcategories,
  selectedSub,
  toggleSub,
  allColors,
  selectedColors,
  toggleColor,
  priceRange,
  setPriceRange,
  onReset,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
          }}
        >
          Filters
        </p>
        <button
          onClick={onReset}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "var(--accent)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--foreground)",
            marginBottom: "0.875rem",
          }}
        >
          Category
        </p>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {subcategories.map((sub) => (
            <label
              key={sub}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={selectedSub.includes(sub)}
                onChange={() => toggleSub(sub)}
                style={{
                  accentColor: "var(--accent)",
                  width: "14px",
                  height: "14px",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--foreground)",
                }}
              >
                {sub}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--foreground)",
            marginBottom: "0.875rem",
          }}
        >
          Color
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
          {allColors.map((c) => (
            <button
              key={c.name}
              title={c.name}
              onClick={() => toggleColor(c.name)}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: c.hex,
                border: selectedColors.includes(c.name)
                  ? "2px solid var(--foreground)"
                  : "2px solid transparent",
                outline: selectedColors.includes(c.name)
                  ? "2px solid var(--background)"
                  : "none",
                outlineOffset: "-3px",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.875rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--foreground)",
            }}
          >
            Price
          </p>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "var(--muted-foreground)",
            }}
          >
            ${priceRange[0]} – ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={600}
          step={25}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value)])
          }
          style={{ width: "100%", accentColor: "var(--accent)" }}
        />
      </div>
    </div>
  );
}
function EmptyState({ query }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "5rem 2rem",
        gridColumn: "1/-1",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "var(--muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="var(--muted-foreground)"
            strokeWidth="1.5"
          />
          <path
            d="M18 18l6 6"
            stroke="var(--muted-foreground)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9 12h6M12 9v6"
            stroke="var(--muted-foreground)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 500,
          color: "var(--foreground)",
          marginBottom: "0.75rem",
        }}
      >
        {query ? `No results for "${query}"` : "No products found"}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9375rem",
          color: "var(--muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        Try adjusting your filters or searching for something else.
      </p>
    </div>
  );
}
