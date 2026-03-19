import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/add-to-cart-button";
import AdminNavLink from "@/app/components/admin-nav-link";
import CartNavLink from "@/app/components/cart-nav-link";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

type ApiProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
};

const PRODUCT_DETAILS = {
  rating: 9.3,
  reviews: 32,
  sold: 154,
  prices: [
    { amount: 0, quantity: "1-10 pcs" },
    { amount: 0, quantity: "10-50 pcs" },
    { amount: 0, quantity: "50+ pcs" },
  ],
  specs: {
    Model: "#8786867",
    Style: "Classic style",
    Certificate: "ISO-898921212",
    Size: "34mm x 450mm x 19mm",
    Memory: "36GB RAM",
  },
  supplier: { name: "Guanjoi Trading LLC", location: "Germany, Berlin" },
  fallbackImages: [
    "/images/smartphone.png",
    "/images/smart watch.png",
    "/images/laptop.png",
    "/images/canon camera.png",
    "/images/headphones.png",
  ],
};

async function fetchProductById(id: string): Promise<ApiProduct | null> {
  return prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      description: true,
      category: true,
      stock: true,
    },
  });
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  const priceTiers = [
    { amount: product.price, quantity: "1-10 pcs" },
    { amount: Number((product.price * 0.94).toFixed(2)), quantity: "10-50 pcs" },
    { amount: Number((product.price * 0.86).toFixed(2)), quantity: "50+ pcs" },
  ];

  const youMayLike = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      category: { equals: product.category, mode: "insensitive" },
    },
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
    },
  });

  const related = await prisma.product.findMany({
    where: {
      id: { not: product.id },
    },
    take: 6,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
    },
  });

  const productImages = [product.image, ...PRODUCT_DETAILS.fallbackImages].slice(0, 6);
  const mainImage = productImages[0];

  return (
    <main className={`market-page ${styles.productPage}`}>
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
      </header>

      <section className="container panel top-header desktop-only">
        <Link href="/" className="brand-mark">
          <span className="brand-icon">B</span>
          <span className="brand-text">Brand</span>
        </Link>
        <div className="search-wrap">
          <input aria-label="Search" placeholder="Search" />
          <select aria-label="All category">
            <option>All category</option>
          </select>
          <button>Search</button>
        </div>
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
          <AdminNavLink />
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

      <nav className={`container ${styles.breadcrumbs}`}>
        <Link href="/">Home</Link>
        <span>{">"}</span>
        <Link href="/shop">{product.category}</Link>
        <span>{">"}</span>
        <a href="#">Men&apos;s wear</a>
        <span>{">"}</span>
        <strong>{product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}</strong>
      </nav>

      <section className={`container panel ${styles.productCard}`}>
        <div className={styles.gallery}>
          <div className={styles.mainImage} style={{ backgroundImage: `url('${mainImage}')` }} />
          <div className={styles.thumbRow}>
            {productImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className={`${styles.thumbBtn} ${index === 0 ? styles.activeThumb : ""}`}
                aria-label={`Preview ${index + 1}`}
                type="button"
              >
                <span style={{ backgroundImage: `url('${image}')` }} />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productInfo}>
          <p className={styles.stock}>{product.stock > 0 ? "In stock" : "Out of stock"}</p>
          <h1>{product.name}</h1>
          <p className={styles.rating}>
            {PRODUCT_DETAILS.rating} • {PRODUCT_DETAILS.reviews} reviews • {PRODUCT_DETAILS.sold} sold
          </p>

          <div className={styles.priceGrid}>
            {priceTiers.map((price, idx) => (
              <article key={idx}>
                <strong>${price.amount.toFixed(2)}</strong>
                <span>{price.quantity}</span>
              </article>
            ))}
          </div>

          <div className={styles.actionsRow}>
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
              category={product.category}
              className={styles.addToCartBtn}
            />
          </div>

          <div className={styles.metaList}>
            <p>
              <span>Price:</span>
              <strong>${product.price.toFixed(2)}</strong>
            </p>
            <p>
              <span>Type:</span>
              <strong>{product.category}</strong>
            </p>
            <p>
              <span>Material:</span>
              <strong>Plastic material</strong>
            </p>
            <p>
              <span>Design:</span>
              <strong>Marketplace standard</strong>
            </p>
            <p>
              <span>Customization:</span>
              <strong>Customized logo and design custom packages</strong>
            </p>
            <p>
              <span>Protection:</span>
              <strong>Refund Policy</strong>
            </p>
            <p>
              <span>Warranty:</span>
              <strong>2 years full warranty</strong>
            </p>
          </div>
        </div>

        <aside className={`panel ${styles.supplierCard}`}>
          <div className={styles.supplierTop}>
            <span>R</span>
            <div>
              <p>Supplier</p>
              <strong>{PRODUCT_DETAILS.supplier.name}</strong>
            </div>
          </div>
          <ul>
            <li>{PRODUCT_DETAILS.supplier.location}</li>
            <li>Verified Seller</li>
            <li>Worldwide shipping</li>
          </ul>
          <button>Send inquiry</button>
          <a href="#">Seller&apos;s profile</a>
          <button type="button" className={styles.saveBtn}>
            Save for later
          </button>
        </aside>
      </section>

      <section className={`container ${styles.detailGrid}`}>
        <article className={`panel ${styles.descriptionCard}`}>
          <div className={styles.tabs}>
            <button className={styles.activeTab}>Description</button>
            <button>Reviews</button>
            <button>Shipping</button>
            <button>About seller</button>
          </div>

          <p>{product.description}</p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p>

          <div className={styles.specTable}>
            {Object.entries(PRODUCT_DETAILS.specs).map(([key, value]) => (
              <p key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
              </p>
            ))}
          </div>

          <ul className={styles.featureList}>
            <li>Some great feature name here</li>
            <li>Lorem ipsum dolor sit amet, consectetur</li>
            <li>Duis aute irure dolor in reprehenderit</li>
            <li>Some great feature name here</li>
          </ul>
        </article>

        <aside className={`panel ${styles.likeCard}`}>
          <h3>You may like</h3>
          {youMayLike.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className={styles.likeItem}>
              <span style={{ backgroundImage: `url('${item.image}')` }} />
              <div>
                <p>{item.name}</p>
                <small>${item.price.toFixed(2)}</small>
              </div>
            </Link>
          ))}
        </aside>
      </section>

      <section className={`container panel ${styles.relatedCard}`}>
        <h2>Related products</h2>
        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className={styles.relatedItem}>
              <span style={{ backgroundImage: `url('${item.image}')` }} />
              <p>{item.name}</p>
              <small>${item.price.toFixed(2)}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className={`container ${styles.discountBanner}`}>
        <div>
          <h3>Super discount on more than 100 USD</h3>
          <p>Have you ever finally just write dummy info</p>
        </div>
        <button>Shop now</button>
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

      <footer className="mobile-footer">
        <Link href="/" className="mobile-footer-btn">
          <span className="mobile-footer-icon home" />
          <span>Home</span>
        </Link>
        <Link href="/shop" className="mobile-footer-btn active">
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

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product does not exist.",
    };
  }

  return {
    title: product.name,
    description: `${product.name} - ${product.category}`,
  };
}
