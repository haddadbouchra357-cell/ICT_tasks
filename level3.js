
function transferMoney(userA_Balance, userB_Balance, amount) {
  const isValidNumber = (n) =>
    typeof n === "number" && Number.isFinite(n);

  // Check 1: Amount must be greater than 0
  if (!isValidNumber(amount) || amount <= 0) {
    return { success: false, error: "Invalid amount" };
  }

  // Check balances
  if (!isValidNumber(userA_Balance) ||
      !isValidNumber(userB_Balance)) {
    return { success: false, error: "Invalid balance" };
  }

  // Check 2: Sender must have enough money
  if (userA_Balance < amount) {
    return { success: false, error: "Insufficient funds" };
  }

  return {
    success: true,
    newBalanceA: userA_Balance - amount,
    newBalanceB: userB_Balance + amount,
  };
}

// Tests
console.log("--- Level 3 ---");
console.log(transferMoney(5000, 200, 1000));
console.log(transferMoney(5000, 200, 6000));
console.log(transferMoney(5000, 200, -500));
console.log(transferMoney(5000, 200, 0));
console.log(transferMoney(5000, 200, "100"));
console.log(transferMoney(5000, 200, 5000));
      
