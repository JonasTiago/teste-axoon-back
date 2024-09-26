import axios from "axios";

// const url_base = "http://127.0.0.1:80";
const url_base = "http://10.29.0.39:8080";

export async function token() {
  try {
    const response = await axios.post(
      `${url_base}/grpc`,
      // "http://10.29.0.39:8080/grpc",
      {
        method: "axxonsoft.bl.auth.AuthenticationService.AuthenticateEx",
        data: {
          user_name: "root",
          password: "Big4dev2024",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: "root",
          password: "Big4dev2024",
        },
      }
    );

    return response.data.token_value;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
}
