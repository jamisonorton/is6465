// Lab2a
// Include working examples of:
// An arithmetic expression using variables, operators, parentheses, and the abs() function
function calculateTotal(
  price: number,
  quantity: number,
  discount: number,
): number {
  return price * quantity - Math.abs(1 - discount);
}

const mathStuff = calculateTotal(5, 2, 8);
console.log(mathStuff);

// Unary operators, including incrementing a variable
let newMathStuff = mathStuff;
newMathStuff++;
console.log(newMathStuff);

// Operator precedence and parentheses
let precedence = 1 * 2 + 3;
console.log(precedence);
let newPrecedence = 1 * (3 + 3);
console.log(newPrecedence);
let precedence3 = (1 + 2) * 3;
console.log(precedence3);

// Logical operators: &&, ||, and !
const a = 3;
const b = 3;
const c = 5;
console.log(a === b);
// console.log(a === b && b === c);
console.log(a === b || a === c);
// console.log(a === b && a !== c);
console.log(!(a === b));

// An if...else statement that determines scholarship eligibility from a GPA
const gpa = 3.45;
if (gpa >= 3.0) {
  console.log("You qualify for a scholarship");
} else {
  console.log("Please raise your gpa");
}

// An if...elseif...else statement that determines full, partial, or no scholarship
if (gpa < 3.0) {
  console.log("You don't qualify for a scholarship");
} else if (gpa <= 3.5) {
  console.log("You qualify for a partial scholarship");
} else {
  console.log("You qualify for a full scholarship");
}
// A switch statement that displays a message based on an access status
const accessStatus: string = "admin";

switch (accessStatus) {
  case "admin":
    console.log("Full access granted");
    break;
  case "user":
    console.log("Limited access granted");
    break;
  case "guest":
    console.log("Guest access granted");
    break;
  default:
    console.log("Access denied");
}

// A while loop that repeats while fuel remains above a stated level
let fuel = 50;

while (fuel > 10) {
  console.log(`Fuel remaining: ${fuel}`);
  fuel -= 5;
}

// A for loop that displays a multiplication table
for (let i = 1; i <= 10; i++) {
  console.log(`5 x ${i} = ${5 * i}`);
}

// Lab 2b
// Include working examples of:
// A function that receives a first, middle, and last name and returns a properly formatted full name
// A function that returns cleaned name parts as an array
// One example demonstrating variable scope
// A function using a static variable to generate sequential ticket numbers
// A User class with public properties and a method
// A second user class with a constructor that creates a password hash

export default function lab2() {
  return (
    <div>
      <div>Lab 2A</div>
      <div>
        Arithmetic expression: price(5) * quantity(2) - Math.abs(1 -
        discount)(8) = {mathStuff}
      </div>
      <div>newMathStuff++: {newMathStuff}</div>
      <div>
        <div>precedence = 1 * 2 + 3 = {precedence}</div>
        <div>newPrecedence = 1 * (3 + 3) = {newPrecedence}</div>
        <div>precedence3 = (1 + 2) * 3 = {precedence3}</div>
      </div>
    </div>
  );
}
