import Link from "next/link";

import { logoutAction } from "@/app/auth/actions";
import AddToCartButton from "@/app/components/add-to-cart-button";
import CartNavLink from "@/app/components/cart-nav-link";
import SearchBar from "@/app/components/search-bar";
import DealCountdown from "@/app/shop/deal-countdown";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const currentUser = await getCurrentUser();

  const deals = [
    { name: "Smart watches", discount: "-25%", bg: "#f4f7fb url('/images/smart%20watch.png') center/74% no-repeat" },
    { name: "Laptops", discount: "-15%", bg: "#f8f3eb url('/images/laptop.png') center/76% no-repeat" },
    { name: "Canon cameras", discount: "-40%", bg: "#f2f6fa url('/images/canon%20camera.png') center/75% no-repeat" },
    { name: "Headphones", discount: "-25%", bg: "#edf4fb url('/images/headphones.png') center/74% no-repeat" },
    { name: "Smart phones", discount: "-25%", bg: "#f6f1f7 url('/images/smartphone.png') center/70% no-repeat" },
  ];

  const homeOutdoor = [
    { name: "Soft chairs", price: "USD 19", bg: "#efe6dd url('/images/Soft%20chairs.png') center/cover no-repeat" },
    { name: "Sofa and chair", price: "USD 19", bg: "#f2e9dc url('/images/Sofa%20and%20Chair.png') center/cover no-repeat" },
    { name: "Kitchen dishes", price: "USD 19", bg: "#ebeff2 url('/images/Kitchen%20Dishes.png') center/cover no-repeat" },
    { name: "Smart watches", price: "USD 19", bg: "#eff1f5 url('/images/smart%20watch.png') center/cover no-repeat" },
    { name: "Kitchen mixer", price: "USD 100", bg: "#f1f0eb url('/images/kitchen%20mixer.png') center/cover no-repeat" },
    { name: "Blenders", price: "USD 39", bg: "#f2efe7 url('/images/blenders.png') center/cover no-repeat" },
    { name: "Home appliance", price: "USD 19", bg: "#f4f7f9 url('/images/home%20appliance.jpg') center/cover no-repeat" },
    { name: "Coffee maker", price: "USD 10", bg: "#f0ece6 url('/images/coffee%20maker.png') center/cover no-repeat" },
  ];

  const gadgets = [
    { name: "Smart watches", price: "USD 19", bg: "#eff2f6 url('/images/smart%20watch.png') center/cover no-repeat" },
    { name: "Cameras", price: "USD 89", bg: "#edf2f7 url('/images/canon%20camera.png') center/cover no-repeat" },
    { name: "Headphones", price: "USD 10", bg: "#f0f2f6 url('/images/headphones.png') center/cover no-repeat" },
    { name: "Smart watches", price: "USD 90", bg: "#eff1f5 url('/images/smart%20watch.png') center/cover no-repeat" },
    { name: "Gaming set", price: "USD 35", bg: "#e7eef6 url('/images/Consumer%20electronics%20and%20gadgets.png') center/cover no-repeat" },
    { name: "Laptops and PC", price: "USD 340", bg: "#eee9df url('/images/laptop.png') center/cover no-repeat" },
    { name: "Smartphones", price: "USD 19", bg: "#eef7f9 url('/images/smartphone.png') center/cover no-repeat" },
    { name: "Electric kettle", price: "USD 240", bg: "#f8efef url('/images/utensils.png') center/cover no-repeat" },
  ];

  const recommended = [
    { id: "1", name: "T-shirts with multiple colors, for men", price: "$10.30", bg: "#ddeff5 url('/images/t%20shirts.png') center/cover no-repeat" },
    { id: "2", name: "Jeans shorts for men blue color", price: "$10.30", bg: "#f0e6d6 url('/images/jean%20short.png') center/cover no-repeat" },
    { id: "3", name: "Brown winter coat medium size", price: "$12.50", bg: "#f0eff5 url('/images/brown%20coat.jpg') center/cover no-repeat" },
    { id: "4", name: "Jeans bag for travel for men", price: "$34.00", bg: "#dae4f3 url('/images/jeans%20bags.png') center/cover no-repeat" },
    { id: "5", name: "Leather wallet", price: "$99.00", bg: "#dde7f6 url('/images/smartphone.png') center/cover no-repeat" },
    { id: "6", name: "Canon camera black, 100x zoom", price: "$9.99", bg: "#e2eaf4 url('/images/canon%20camera.png') center/cover no-repeat" },
    { id: "7", name: "Headset for gaming with mic", price: "$8.99", bg: "#f0f2f6 url('/images/headphones.png') center/cover no-repeat" },
    { id: "8", name: "Smartwatch silver color modern", price: "$10.30", bg: "#edf0f5 url('/images/smart%20watch.png') center/cover no-repeat" },
    { id: "9", name: "Blue wallet for men leather material", price: "$10.30", bg: "#f1e4da url('/images/blue%20coat.png') center/cover no-repeat" },
    { id: "10", name: "Jeans bag for travel for men", price: "$80.95", bg: "#eceae6 url('/images/jeans%20bags.png') center/cover no-repeat" },
  ];

  const services = [
    "Source from Industry Hubs",
    "Customize Your Products",
    "Fast, reliable shipping by ocean or air",
    "Product monitoring and inspection",
  ];

  const regions = [
    { country: "Arabic Emirates", domain: "shopname.ae", flagSrc: "https://flagcdn.com/w40/ae.png", flagAlt: "United Arab Emirates flag" },
    { country: "Australia", domain: "shopname.ae", flagSrc: "https://flagcdn.com/w40/au.png", flagAlt: "Australia flag" },
    { country: "United States", domain: "shopname.ae", flagSrc: "https://flagcdn.com/w40/us.png", flagAlt: "United States flag" },
    { country: "Russia", domain: "shopname.ru", flagSrc: "https://flagcdn.com/w40/ru.png", flagAlt: "Russia flag" },
    { country: "Italy", domain: "shopname.it", flagSrc: "https://flagcdn.com/w40/it.png", flagAlt: "Italy flag" },
    { country: "Denmark", domain: "denmark.com.dk", flagSrc: "https://flagcdn.com/w40/dk.png", flagAlt: "Denmark flag" },
    { country: "France", domain: "shopname.com.fr", flagSrc: "https://flagcdn.com/w40/fr.png", flagAlt: "France flag" },
    { country: "Arabic Emirates", domain: "shopname.ae", flagSrc: "https://flagcdn.com/w40/ae.png", flagAlt: "United Arab Emirates flag" },
    { country: "China", domain: "shopname.ae", flagSrc: "https://flagcdn.com/w40/cn.png", flagAlt: "China flag" },
    { country: "Great Britain", domain: "shopname.co.uk", flagSrc: "https://flagcdn.com/w40/gb.png", flagAlt: "United Kingdom flag" },
  ];

  return (
    <main className="market-page">

      {/* Mobile header */}
      <header className="mobile-header">
        <div className="mobile-header-row">
          <button className="mobile-menu-btn" aria-label="Menu">
            <span className="mobile-menu-icon" />
          </button>
          <span className="brand-mark">
            <span className="brand-icon">B</span>
            <span className="brand-text">Brand</span>
          </span>
          <div className="mobile-header-icons">
            <CartNavLink variant="mobile" />
            <button aria-label="User" className="mobile-header-btn">
              <span className="mobile-user-icon" />
            </button>
          </div>
        </div>
        <div className="mobile-search-row">
          <input aria-label="Search" placeholder="Search" />
        </div>
        <nav className="mobile-category-tabs">
          <Link href="/shop" className="active">All category</Link>
          <Link href="/shop">Gadgets</Link>
          <Link href="/shop">Clothes</Link>
          <Link href="/shop">Accessories</Link>
        </nav>
      </header>

      {/* Desktop header and nav (hidden on mobile) */}
      <section className="container panel top-header desktop-only">
        <Link href="/" className="brand-mark">
          <span className="brand-icon">B</span>
          <span className="brand-text">Brand</span>
        </Link>
        <SearchBar />
        <div className="top-links">
          <a href="#" className="top-link-item">
            <span className="top-link-icon profile" aria-hidden="true" />
            <span>Profile</span>
          </a>
          <a href="#" className="top-link-item">
            <span className="top-link-icon message" aria-hidden="true" />
            <span>Message</span>
          </a>
          <a href="#" className="top-link-item">
            <span className="top-link-icon orders" aria-hidden="true" />
            <span>Orders</span>
          </a>
          <CartNavLink />
        </div>
      </section>
      <section className="container panel nav-strip desktop-only">
        <div className="left-nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/shop">All category</Link>
          <Link href="/shop">Hot offers</Link>
          <a href="#">Gift boxes</a>
          <a href="#">Projects</a>
          <a href="#">Menu item</a>
          <a href="#">Help</a>
        </div>
        <div className="right-nav">
          <a href="#">English, USD</a>
          <a href="#">Ship to DE</a>
        </div>
      </section>

      <section className="container panel hero-grid">
        <aside className="hero-cats">
          {[
            { label: "Automobiles", category: "automobiles" },
            { label: "Clothes and wear", category: "clothing" },
            { label: "Shop all", category: null },
            { label: "Home interiors", category: "home" },
            { label: "Computer and tech", category: "electronics" },
            { label: "Tools, equipments", category: "accessories" },
            { label: "Sports and outdoor", category: "wearables" },
            { label: "Animal and pets", category: "pets" },
            { label: "Machinery tools", category: "machinery" },
            { label: "More category", category: null },
          ].map((item, index) => (
            <Link 
              key={item.label} 
              href={item.category ? `/shop?category=${item.category}` : "/shop"}
              className={index === 0 ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </aside>

        <div className="hero-banner">
          <p>Latest trending</p>
          <h1>Electronic items</h1>
          <button>Learn more</button>
        </div>

        <div className="hero-side">
          <div className="panel user-card">
            <p>{currentUser ? `Hi, ${currentUser.name}` : "Hi, user"}</p>
            <span>{currentUser ? "you are signed in" : "let's get started"}</span>
            {currentUser ? (
              <>
                <Link href="/product/1" className="hero-auth-primary">Continue shopping</Link>
                <form action={logoutAction}>
                  <button type="submit" className="hero-auth-secondary">Log out</button>
                </form>
              </>
            ) : (
              <>
                <Link href="/join" className="hero-auth-primary">Join now</Link>
                <Link href="/login" className="hero-auth-secondary">Log in</Link>
              </>
            )}
          </div>
          <div className="panel promo-card warm">Get US $10 off with a new supplier</div>
          <div className="panel promo-card cool">Send quotes with supplier preferences</div>
        </div>
      </section>

      <section className="container panel deals-section">
        <div className="deal-head">
          <h2>Deals and offers</h2>
          <p>Hygiene equipments</p>
          <DealCountdown initialDays={6} />
        </div>
        <div className="deal-items">
          {deals.map((deal) => (
            <Link href="/shop" key={deal.name}>
              <div className="thumb" style={{ background: deal.bg }} />
              <h3>{deal.name}</h3>
              <span>{deal.discount}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container panel showcase-row">
        <div className="showcase-banner home">
          <h2>Home and outdoor</h2>
          <button>Source now</button>
        </div>
        <div className="showcase-grid">
          {homeOutdoor.map((item) => (
            <Link href="/shop" key={item.name}>
              <h3>{item.name}</h3>
              <p>From {item.price}</p>
              <div className="mini-thumb" style={{ background: item.bg }} />
            </Link>
          ))}
        </div>
      </section>

      <section className="container panel showcase-row">
        <div className="showcase-banner gadgets">
          <h2>Consumer electronics and gadgets</h2>
          <button>Source now</button>
        </div>
        <div className="showcase-grid">
          {gadgets.map((item) => (
            <Link href="/shop" key={item.name + item.price}>
              <h3>{item.name}</h3>
              <p>From {item.price}</p>
              <div className="mini-thumb" style={{ background: item.bg }} />
            </Link>
          ))}
        </div>
      </section>

      <section className="container inquiry-banner">
        <div>
          <h2>An easy way to send requests to all suppliers</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
          </p>
        </div>
        <form className="panel inquiry-form">
          <h3>Send quote to suppliers</h3>
          <input aria-label="What item" placeholder="What item you need?" />
          <textarea aria-label="Details" placeholder="Type more details" rows={3} />
          <div className="form-row">
            <input aria-label="Quantity" placeholder="Quantity" />
            <select aria-label="Pcs">
              <option>Pcs</option>
            </select>
          </div>
          <button type="button">Send inquiry</button>
        </form>
      </section>

      <section className="container content-stack">
        <h2 className="section-title">Recommended items</h2>
        <div className="recommended-grid">
          {recommended.map((item) => (
            <article key={item.name + item.price} className="panel recommended-card">
              <Link href={`/product/${item.id}`}>
                <div className="thumb" style={{ background: item.bg }} />
                <h3>{item.price}</h3>
                <p>{item.name}</p>
              </Link>
              <AddToCartButton
                id={item.id}
                name={item.name}
                price={Number(item.price.replace("$", ""))}
                image={item.bg.match(/url\('([^']+)'\)/)?.[1] ?? "/images/smartphone.png"}
                description={item.name}
                category="Recommended"
                className="recommended-add-btn"
              />
            </article>
          ))}
        </div>

        <h2 className="section-title">Our extra services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <article key={service} className="panel service-card">
              <div className={`service-banner s${index + 1}`} />
              <h3>{service}</h3>
            </article>
          ))}
        </div>

        <h2 className="section-title">Suppliers by region</h2>
        <div className="regions-grid">
          {regions.map((region, index) => (
            <article key={`${region.country}-${index}`} className="region-item">
              <img className="region-flag" src={region.flagSrc} alt={region.flagAlt} loading="lazy" />
              <div className="region-meta">
                <strong>{region.country}</strong>
                <span>{region.domain}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <h2>Subscribe on our newsletter</h2>
        <p>Get daily news on upcoming offers from many suppliers all over the world</p>
        <div className="newsletter-row">
          <input aria-label="Email" placeholder="Email" />
          <button>Subscribe</button>
        </div>
      </section>

      <footer className="container footer-grid">
        <div className="brand-col">
          <div className="brand-mark">
            <span className="brand-icon">B</span>
            <span className="brand-text">Brand</span>
          </div>
          <p>Best information about the company gives here but now lorem ipsum is.</p>
        </div>
        <div>
          <h3>About</h3>
          <a href="#">About Us</a>
          <a href="#">Find store</a>
          <a href="#">Categories</a>
          <a href="#">Blogs</a>
        </div>
        <div>
          <h3>Partnership</h3>
          <a href="#">About Us</a>
          <a href="#">Find store</a>
          <a href="#">Categories</a>
          <a href="#">Blogs</a>
        </div>
        <div>
          <h3>Information</h3>
          <a href="#">Help Center</a>
          <a href="#">Money Refund</a>
          <a href="#">Shipping</a>
          <a href="#">Contact us</a>
        </div>
        <div>
          <h3>For users</h3>
          <a href="#">Login</a>
          <a href="#">Register</a>
          <a href="#">Settings</a>
          <a href="#">My Orders</a>
        </div>
      </footer>

      <div className="copyright">© 2026 Ecommerce. English</div>
      {/* Mobile footer nav */}
      <footer className="mobile-footer">
        <Link href="/" className="mobile-footer-btn active">
          <span className="mobile-footer-icon home" />
          <span>Home</span>
        </Link>
        <Link href="/shop" className="mobile-footer-btn">
          <span className="mobile-footer-icon categories" />
          <span>Categories</span>
        </Link>
        <Link href="/cart" className="mobile-footer-btn">
          <span className="mobile-footer-icon cart" />
          <span>Cart</span>
        </Link>
        <button className="mobile-footer-btn">
          <span className="mobile-footer-icon user" />
          <span>Account</span>
        </button>
      </footer>
    </main>
  );
}
