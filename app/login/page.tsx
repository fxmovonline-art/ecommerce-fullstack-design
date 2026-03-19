import Link from "next/link";

import AuthForm from "@/app/auth-form";
import { loginAction } from "@/app/auth/actions";
import styles from "@/app/auth-page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.authPage}>
      <section className={styles.authShell}>
        <aside className={styles.storyCard}>
          <Link href="/" className={styles.brandLink}>
            <span className="brand-icon">B</span>
            <span className="brand-text">Brand</span>
          </Link>
          <h1>Welcome back</h1>
          <p>
            Log in to continue browsing products, keep your preferences, and manage the items you have shortlisted.
          </p>
          <ul className={styles.storyList}>
            <li>
              <strong>Inline error handling</strong>
              <span>Wrong credentials and missing fields are shown clearly before retrying.</span>
            </li>
            <li>
              <strong>Persistent session</strong>
              <span>Your login stays active with a secure session cookie.</span>
            </li>
            <li>
              <strong>Quick return home</strong>
              <span>After login, you are redirected straight back into the storefront.</span>
            </li>
          </ul>
        </aside>

        <section className={styles.formCard}>
          <h2>Log in</h2>
          <p>Use the email and password you registered with.</p>
          <div className={styles.switchLine}>
            New here? <Link href="/join">Create an account</Link>
          </div>
          <div style={{ marginTop: 24 }}>
            <AuthForm mode="login" action={loginAction} />
          </div>
          <Link href="/" className={styles.backHome}>Back to homepage</Link>
        </section>
      </section>
    </main>
  );
}
