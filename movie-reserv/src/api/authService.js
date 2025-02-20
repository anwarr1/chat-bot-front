const API_URL = "http://localhost:8082/api/auth";

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("Invalid credentials");

  return response.json(); // { accessToken, user }
};

export const fetchUser = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to fetch user");

  return response.json(); // { id, email, role }
};
