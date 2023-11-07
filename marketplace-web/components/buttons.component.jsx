"use client";

import Link from "next/link";
import { useAuthentication, useSession, useLogout } from "./auth.component";

export function LoginButton() {
  const isAuthenticated = useAuthentication();
  const session = useSession();
  if (!isAuthenticated) {
    return (
      <a className="" href="/api/auth/login">
        Sign In
      </a>
    );
  } else {
    return (
      <a className="" href="/profile">
        {session.first_name} {session.last_name}
      </a>
    );
  }

}

export const LogOutButton = () => {
  const isAuthenticated = useAuthentication();
  const handleLogout = () => {
    useLogout(isAuthenticated);
    window.location.href = "/";
  };

  return (
    <button className="text-lg font-bold text-gray-600" onClick={handleLogout}>
      Sign Out
    </button>
  );
};
0;
export const RegisterButton = () => {
  return (
    <Link href="/register" className="">
      Register
    </Link>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
