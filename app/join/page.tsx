import Link from "next/link";

import AuthForm from "@/app/auth-form";
import { joinAction } from "@/app/auth/actions";
import styles from "@/app/auth-page.module.css";

export default function JoinPage() {
  return (
    <main className={styles.authPage}>
      <section className={styles.authShell}>
        <aside className={styles.storyCard}>
          <Link href="/" className={styles.brandLink}>
            <span className="brand-icon">B</span>
            <span className="brand-text">Brand</span>
          </Link>
          <h1>Create your shopper account</h1>
          <p>
            Join now to save products, manage orders, and keep your marketplace activity in one place across desktop and mobile.
          </p>
          <ul className={styles.storyList}>
            <li>
              <strong>Fast checkout setup</strong>
              <span>Keep your account ready for future purchases and inquiries.</span>
            </li>
            <li>
              <strong>Track saved items</strong>
              <span>Build a shortlist of products you want to revisit later.</span>
            </li>
            <li>
              <strong>Protected sign up</strong>
              <span>We validate every field and prevent duplicate account creation.</span>
            </li>
          </ul>
        </aside>

        <section className={styles.formCard}>
          <h2>Join now</h2>
          <p>Fill in your details below. You will be signed in immediately after successful registration.</p>
          <div className={styles.switchLine}>
            Already have an account? <Link href="/login">Log in</Link>
          </div>
          <div style={{ marginTop: 24 }}>
            <AuthForm mode="join" action={joinAction} />
          </div>
          <Link href="/" className={styles.backHome}>Back to homepage</Link>
        </section>
      </section>
    </main>
  );
}
