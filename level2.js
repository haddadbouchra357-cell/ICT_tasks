
const users = [
  { id: 1, email: "admin@test.com", pass: "admin123" },
  { id: 2, email: "user@test.com", pass: "user2024" },
];

function loginUser(email, password) {
  if (typeof email !== "string" ||
      typeof password !== "string") {
    return {
      success: false,
      error: "Email and password are required"
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === "" || password === "") {
    return {
      success: false,
      error: "Email and password are required"
    };
  }

  const user = users.find(
    (u) => u.email === normalizedEmail
  );

  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (user.pass !== password) {
    return { success: false, error: "Invalid Credentials" };
  }

  return { success: true, token: "ACCESS_GRANTED" };
}

// Tests
console.log("--- Level 2 ---");
console.log(loginUser("admin@test.com", "admin123"));
console.log(loginUser("admin@test.com", "wrongpass"));
console.log(loginUser("new@test.com", "123"));
console.log(loginUser(" ADMIN@test.com ", "admin123"));
console.log(loginUser(undefined, "123"));
