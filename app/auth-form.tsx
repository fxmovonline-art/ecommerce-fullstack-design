"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import styles from "./auth-form.module.css";
import type { AuthFormState } from "./auth/actions";

const initialState: AuthFormState = {};

type AuthFormProps = {
  mode: "join" | "login";
  action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
};

function SubmitButton({ mode }: { mode: AuthFormProps["mode"] }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={styles.submitButton} disabled={pending}>
      {pending ? "Please wait..." : mode === "join" ? "Create account" : "Log in"}
    </button>
  );
}

export default function AuthForm({ mode, action }: AuthFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className={styles.form}>
      {state.error ? <p className={styles.formError}>{state.error}</p> : null}

      {mode === "join" ? (
        <label className={styles.field}>
          <span>Full name</span>
          <input name="name" type="text" placeholder="Enter your full name" defaultValue={state.values?.name ?? ""} />
          {state.fieldErrors?.name ? <small>{state.fieldErrors.name}</small> : null}
        </label>
      ) : null}

      <label className={styles.field}>
        <span>Email</span>
        <input name="email" type="email" placeholder="Enter your email" defaultValue={state.values?.email ?? ""} />
        {state.fieldErrors?.email ? <small>{state.fieldErrors.email}</small> : null}
      </label>

      <label className={styles.field}>
        <span>Password</span>
        <input name="password" type="password" placeholder="Enter your password" />
        {state.fieldErrors?.password ? <small>{state.fieldErrors.password}</small> : null}
      </label>

      {mode === "join" ? (
        <label className={styles.field}>
          <span>Confirm password</span>
          <input name="confirmPassword" type="password" placeholder="Confirm your password" />
          {state.fieldErrors?.confirmPassword ? <small>{state.fieldErrors.confirmPassword}</small> : null}
        </label>
      ) : null}

      <SubmitButton mode={mode} />
    </form>
  );
}
