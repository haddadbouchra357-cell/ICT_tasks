# ICT_tasks
/**
 * Backend Logic Challenge - ITC Blida
 * Language: JavaScript (Node.js / OneCompiler)
 */

/* ------------------------------------------------------------------ *
 * LEVEL 1 - Data Cleaning: The Username
 * ------------------------------------------------------------------ */
const USERNAME_MIN = 3;
const USERNAME_MAX = 10;

function cleanUsername(rawName) {
  if (typeof rawName !== "string") {
    throw new Error("Username must be a string");
  }

  const name = rawName.trim().toLowerCase();

  if (name.length < USERNAME_MIN) throw new Error("Username too short");
  if (name.length > USERNAME_MAX) throw new Error("Username too long");

  return name;
}

/* ------------------------------------------------------------------ *
 * LEVEL 2 - Authentication: The Login
 * ------------------------------------------------------------------ */
const users = [
  { id: 1, email: "admin@test.com", pass: "admin123" },
  { id: 2, email: "user@test.com", pass: "user2024" },
];

function loginUser(email, password) {
  if (typeof email !== "string" || typeof password !== "string") {
    return { success: false, error: "Email and password are required" };
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === "" || password === "") {
    return { success: false, error: "Email and password are required" };
  }

  const user = users.find((u) => u.email === normalizedEmail);
  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (user.pass !== password) {
    return { success: false, error: "Invalid Credentials" };
  }

  return { success: true, token: "ACCESS_GRANTED" };
}

/* ------------------------------------------------------------------ *
 * LEVEL 3 - Transaction Logic: The Money Transfer
 * ------------------------------------------------------------------ */
function transferMoney(userA_Balance, userB_Balance, amount) {
  const isValidNumber = (n) => typeof n === "number" && Number.isFinite(n);

  // Check 1: amount must be a real number greater than 0
  if (!isValidNumber(amount) || amount <= 0) {
    return { success: false, error: "Invalid amount" };
  }

  // Sanity check on the balances themselves
  if (!isValidNumber(userA_Balance) || !isValidNumber(userB_Balance)) {
    return { success: false, error: "Invalid balance" };
  }

  // Check 2: sender must have enough funds
  if (userA_Balance < amount) {
    return { success: false, error: "Insufficient funds" };
  }

  return {
    success: true,
    newBalanceA: userA_Balance - amount,
    newBalanceB: userB_Balance + amount,
  };
}

/* ------------------------------------------------------------------ *
 * Tests
 * ------------------------------------------------------------------ */
function attempt(fn, ...args) {
  try {
    return fn(...args);
  } catch (e) {
    return `Error: "${e.message}"`;
  }
}

console.log("--- Level 1 ---");
console.log(attempt(cleanUsername, "  Amine_Dev  "));      // "amine_dev"
console.log(attempt(cleanUsername, "Mohamed_Amine_123"));  // Error: "Username too long"
console.log(attempt(cleanUsername, "  Al  "));             // Error: "Username too short"
console.log(attempt(cleanUsername, "      "));             // Error: "Username too short"
console.log(attempt(cleanUsername, null));                 // Error: "Username must be a string"

console.log("--- Level 2 ---");
console.log(loginUser("admin@test.com", "admin123"));  // success
console.log(loginUser("admin@test.com", "wrongpass")); // Invalid Credentials
console.log(loginUser("new@test.com", "123"));         // User not found
console.log(loginUser("  ADMIN@test.com ", "admin123")); // success (normalized)
console.log(loginUser(undefined, "123"));              // required

console.log("--- Level 3 ---");
console.log(transferMoney(5000, 200, 1000)); // { success: true, newBalanceA: 4000, newBalanceB: 1200 }
console.log(transferMoney(5000, 200, 6000)); // Insufficient funds
console.log(transferMoney(5000, 200, -500)); // Invalid amount
console.log(transferMoney(5000, 200, 0));    // Invalid amount
console.log(transferMoney(5000, 200, "100")); // Invalid amount
console.log(transferMoney(5000, 200, 5000)); // success, A ends at 0
