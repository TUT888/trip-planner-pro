import { apiClient } from "./apiClient";

const sanitizeUser = (user) => {
  if (!user) return null;

  const safeUser = { ...user };
  delete safeUser.password;
  return safeUser;
};

const login = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = await apiClient.get(
    `/users?email=${encodeURIComponent(normalizedEmail)}`,
  );
  const user = users[0];

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password.");
  }

  return sanitizeUser(user);
};

const register = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUsers = await apiClient.get(
    `/users?email=${encodeURIComponent(normalizedEmail)}`,
  );

  if (existingUsers.length > 0) {
    throw new Error("An account with this email already exists.");
  }

  const user = await apiClient.post("/users", {
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  return sanitizeUser(user);
};

export const authService = {
  login,
  register,
};
