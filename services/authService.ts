// Placeholder service untuk Authentication

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (email: string, password: string) => {
    await delay(1000);
    if (email === "user@example.com" && password === "password") {
      return { success: true, token: "mock-jwt-token" };
    }
    return { success: false, message: "Invalid credentials" };
  },

  register: async (data: any) => {
    await delay(1000);
    return { success: true, message: "Account created" };
  },

  logout: async () => {
    await delay(500);
    return { success: true };
  }
};