const API_BASE = process.env.NEXT_PUBLIC_USER_AUTH_URL;

async function refreshToken() {
  // silently refresh
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) return false;
  return true;
}

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const isFormData = options.body instanceof FormData;

  let res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
    ...options,
  });

  // if access token expired, try to refresh once
  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      // retry original request after refresh
      res = await fetch(`${API_BASE}${path}`, {
        credentials: "include",
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...options.headers,
        },
        ...options,
      });
    }
  }

  if (!res.ok) {
    // optional: handle 401 after refresh (force logout)
    if (res.status === 401) {
      // e.g., redirect to login page
      window.location.href = "/auth/signin?sessionExpired=1";
    }
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "API Error");
  }

  return res.json();
}
