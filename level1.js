
const USERNAME_MIN = 3;
const USERNAME_MAX = 10;

function cleanUsername(rawName) {
  if (typeof rawName !== "string") {
    throw new Error("Username must be a string");
  }

  const name = rawName.trim().toLowerCase();

  if (name.length < USERNAME_MIN) {
    throw new Error("Username too short");
  }

  if (name.length > USERNAME_MAX) {
    throw new Error("Username too long");
  }

  return name;
}

// Tests
function attempt(fn, ...args) {
  try {
    return fn(...args);
  } catch (e) {
    return `Error: "${e.message}"`;
  }
}

console.log("--- Level 1 ---");
console.log(attempt(cleanUsername, " Amine_Dev "));
console.log(attempt(cleanUsername, "Mohamed_Amine_123"));
console.log(attempt(cleanUsername, " Al "));
console.log(attempt(cleanUsername, "       "));
console.log(attempt(cleanUsername, null));
