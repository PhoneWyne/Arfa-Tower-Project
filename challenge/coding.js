let running = true;
const countVowels = () => {
    const input = prompt("Enter a string to count vowels:");
    let vowelCount = 0;
    const vowels = "aeiouAEIOU";

    for (let i = 0; i < input.length; i++) {
      if (vowels.includes(input[i])) {
        vowelCount++;
      }
    }
    return vowelCount;
}

const findAboveAverage = (students) => {
    
  
    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const average = total / students.length;

    let aboveAverageList = "Students above average:\n";
    students
    .filter(student => student.grade > average)
    .forEach(student => {
        aboveAverageList += `${student.name}: ${student.grade}\n`;
    });

    return aboveAverageList;
};

while (running) {
  const choice = prompt(
    "Choose an option:\n" +
    "1 - Run Vowel Counter\n" +
    "2 - Run Student Grade Filter\n" +
    "3 - Run Person Greeting\n" +
    "0 - Exit"
  );

  if (choice === "1") {   
    alert(`Total number of vowels: ${countVowels()}`);

  } else if (choice === "2") {
    const students = [
        { name: "Alice", grade: 85 },
        { name: "Bob", grade: 72 },
        { name: "Charlie", grade: 90 },
        { name: "David", grade: 65 },
        { name: "Eve", grade: 78 }
    ];

    alert(findAboveAverage(students));

  } else if (choice === "3") {
    const name = prompt("Enter your name:");
    const person = {
      name: name,
      age: 30,
      sayHello: function () {
        return `Hello!  ${this.name}.`;
      }
    };

    alert(person.sayHello());

  } else if (choice === "0") {
    running = false;
    alert("Goodbye!");

  } else {
    alert("Invalid choice. Please try again.");
  }
}
