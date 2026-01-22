import ky from "ky";

export const userService = {
  login: async (username: string, password: string) => {
    console.log("Logging in user:", username);

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    await ky.post("/api/v1/login-submit", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });
  },

  logout: async () => {
    await ky.post("/api/v1/logout-submit");
  },
};

export default userService;
