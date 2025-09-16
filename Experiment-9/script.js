// Base Person class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Student subclass
class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }

  displayInfo() {
    return `Student Name: ${this.name}, Age: ${this.age}, Course: ${this.course}`;
  }
}

// Teacher subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  displayInfo() {
    return `Teacher Name: ${this.name}, Age: ${this.age}, Subject: ${this.subject}`;
  }
}

// Create instances
const student1 = new Student("Alice", 20, "Computer Science");
const teacher1 = new Teacher("Mr. Smith", 40, "Mathematics");

// Function to display details in UI
function showDetails() {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = ""; // clear previous output

  const studentCard = document.createElement("div");
  studentCard.className = "card";
  studentCard.innerHTML = `<h2>Student</h2><p>${student1.displayInfo()}</p>`;

  const teacherCard = document.createElement("div");
  teacherCard.className = "card";
  teacherCard.innerHTML = `<h2>Teacher</h2><p>${teacher1.displayInfo()}</p>`;

  outputDiv.appendChild(studentCard);
  outputDiv.appendChild(teacherCard);
}
