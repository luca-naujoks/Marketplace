import { useState, useEffect } from "react";
import ClientCookies from "js-cookie"
import jwtDecode from "jwt-decode";

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(ClientCookies.get('auth') !== undefined);
  }, []);

  return( isAuthenticated);
}

export function useSession() {
  const isAuthenticated = useAuthentication();

  if (isAuthenticated) {
    const token = ClientCookies.get('auth');
    if (token) {
      const decoded_token = jwtDecode(token);
      return decoded_token;
    }
  }

  return null;
}

export function useCreate(tokenObject: string) {
  if (ClientCookies.get('auth') !== undefined) {
    console.log("auth " + tokenObject)
    ClientCookies.remove('auth')
  }
  var expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  ClientCookies.set('auth', tokenObject, { expires: expiryDate })
  console.log(tokenObject)
}


export function useLogout(isAuthenticated: boolean) {
  if (isAuthenticated) {
    ClientCookies.remove('auth')
  }
}

export function verifySession(token: String) {
  let url = "https://localhost/auth/verify"

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}
