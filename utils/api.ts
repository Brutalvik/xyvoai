// utils/api.ts

const API_BASE = process.env.NEXT_PUBLIC_USER_AUTH_URL;

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error?.error || "API Error");
  }

  return res.json();
}
