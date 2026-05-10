let num1 = 25;
let num2 = 90;

//============ origial numbers ============

console.log("Original Numbers here (Destructre): \n", "1st Number :",num1, "\n 2nd Number :",num2);

console.log("\n");

// =========== Destrcture ===============

[num1 , num2] = [num2 , num1]; // [num1 , num2] : [90, 25]

console.log("Destructure Numbers here : \n", "1st Number :",num1, "\n 2nd Number :",num2);
