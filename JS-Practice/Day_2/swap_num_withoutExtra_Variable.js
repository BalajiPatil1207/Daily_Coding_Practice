let num1 = 33;
let num2 = 66;

//============ origial numbers ============
console.log("Original Numbers here (Without Extra Variable): \n", "1st Number :",num1, "\n 2nd Number :",num2);

console.log("\n");

//============ Swap numbers ============

num1 = num1 + num2;  // num1 = 33 + 66 ==> 99
num2 = num1 - num2;  // num2 = 99 - 66 ==> 33
num1 = num1 - num2;  // num1 = 99 - 33 ==> 66

console.log("Swap Numbers here: \n", "1st Number :",num1, "\n 2nd Number :",num2);
