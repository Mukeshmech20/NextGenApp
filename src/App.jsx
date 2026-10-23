import React from "react";
import "./App.css";

function App() {
  const [selectedFeature, setSelectedFeature] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  const [quizStarted, setQuizStarted] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [quizScore, setQuizScore] = React.useState(0);
  const [attemptQuestions, setAttemptQuestions] = React.useState([]);

  const [attemptedQuestionIds, setAttemptedQuestionIds] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("attemptedQuestionIds")) || {};
    } catch {
      return {};
    }
  });
  const quizStatsRecorded = React.useRef(false);
  const [quizStats, setQuizStats] = React.useState(() => {
    try {
      const savedStats = JSON.parse(localStorage.getItem("quizStats"));

      return {
        completedQuizzes: savedStats?.completedQuizzes ?? 0,
        totalCorrectAnswers: savedStats?.totalCorrectAnswers ?? 0,
        totalQuestions: savedStats?.totalQuestions ?? 0,
      };
    } catch {
      return {
        completedQuizzes: 0,
        totalCorrectAnswers: 0,
        totalQuestions: 0,
      };
    }
  });

  const categoryDetails = {
    Technology: {
      description: "Explore the technology shaping our future.",
      topics: ["Web Development", "Artificial Intelligence", "Digital Tools"],
    },

    Creativity: {
      description: "Discover new ways to express your imagination.",
      topics: ["Digital Art", "Photography", "Creative Writing"],
    },

    Fitness: {
      description: "Build healthier habits and stay active.",
      topics: ["Home Workouts", "Nutrition Basics", "Daily Habits"],
    },

    "AI Tools": {
      description: "Discover AI tools that can make everyday tasks easier.",
      topics: ["AI Assistants", "Image Generation", "Productivity Tools"],
    },

    "Fun & Games": {
      description: "Take a break and explore something entertaining.",
      topics: ["Brain Games", "Puzzles", "Trivia"],
    },

    "Family Activities": {
      description: "Find activities that bring people closer together.",
      topics: ["Indoor Activities", "Family Challenges", "Creative Projects"],
    },

    Coding: {
      description: "Start learning programming one step at a time.",
      topics: ["Java Basics", "JavaScript Basics", "Problem Solving"],
    },

    Communication: {
      description:
        "Improve how you express ideas and connect with other people.",
      topics: ["Speaking Skills", "Writing Skills", "Active Listening"],
    },

    "Personal Development": {
      description: "Build habits that support your personal growth.",
      topics: ["Time Management", "Goal Setting", "Self-Discipline"],
    },
  };

  const topicLessons = {
    "Java Basics": {
      title: "Welcome to Java!",
      description:
        "Java is a programming language used to build applications, websites, and software.",
      example: 'System.out.println("Hello, World!");',
    },

    "JavaScript Basics": {
      title: "Welcome to JavaScript!",
      description:
        "JavaScript helps make websites interactive and is widely used in web development.",
      example: 'console.log("Hello, World!");',
    },

    "Problem Solving": {
      title: "Learn Problem Solving",
      description:
        "Break a problem into smaller steps, understand the input and output, and develop a solution.",
      example: "Understand → Plan → Solve → Test",
    },
  };

  const quizQuestions = {
    "Java Basics": [
      {
        id: "java-001",
        question: "Which keyword is used to create a class in Java?",
        options: ["function", "class", "define", "object"],
        answer: "class",
      },
      {
        id: "java-002",
        question: "Which method is the entry point of a Java program?",
        options: ["start()", "run()", "main()", "execute()"],
        answer: "main()",
      },
      {
        id: "java-003",
        question: "Which statement prints text in Java?",
        options: [
          "console.log()",
          "print.text()",
          "System.out.println()",
          "echo()",
        ],
        answer: "System.out.println()",
      },

      {
        id: "java-004",
        question: "Which data type stores whole numbers in Java?",
        options: ["String", "boolean", "int", "char"],
        answer: "int",
      },
      {
        id: "java-005",
        question: "Which symbol ends a Java statement?",
        options: [".", ";", ":", ","],
        answer: ";",
      },
      {
        id: "java-006",
        question: "Which keyword is used to create an object in Java?",
        options: ["class", "this", "new", "static"],
        answer: "new",
      },
      {
        id: "java-007",
        question: "Which data type stores true or false?",
        options: ["int", "String", "char", "boolean"],
        answer: "boolean",
      },
      {
        id: "java-008",
        question: "Which operator checks equality between two values?",
        options: ["=", "==", "!=", "&&"],
        answer: "==",
      },
      {
        id: "java-009",
        question: "Which loop executes its body at least once?",
        options: ["for", "while", "do-while", "enhanced for"],
        answer: "do-while",
      },
      {
        id: "java-010",
        question: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "extends", "inherits", "super"],
        answer: "extends",
      },
      {
        id: "java-011",
        question: "Which keyword is used to declare an integer variable?",
        options: ["integer", "int", "number", "IntegerType"],
        answer: "int",
      },
      {
        id: "java-012",
        question: "Which data type is used to store a single character?",
        options: ["String", "char", "boolean", "int"],
        answer: "char",
      },
      {
        id: "java-013",
        question: "Which symbol represents logical AND in Java?",
        options: ["||", "&&", "!", "&="],
        answer: "&&",
      },
      {
        id: "java-014",
        question: "Which keyword is used to make a variable constant?",
        options: ["static", "final", "const", "fixed"],
        answer: "final",
      },
      {
        id: "java-015",
        question: "Which keyword is used to create a subclass?",
        options: ["implements", "extends", "inherits", "super"],
        answer: "extends",
      },
      {
        id: "java-016",
        question: "Which access modifier allows access from anywhere?",
        options: ["private", "protected", "public", "default"],
        answer: "public",
      },
      {
        id: "java-017",
        question: "Which keyword refers to the current object?",
        options: ["this", "self", "current", "object"],
        answer: "this",
      },
      {
        id: "java-018",
        question: "Which block handles an exception?",
        options: ["try", "catch", "throw", "finally"],
        answer: "catch",
      },
      {
        id: "java-019",
        question:
          "Which keyword is used to define an interface implementation?",
        options: ["extends", "implements", "interface", "instanceof"],
        answer: "implements",
      },
      {
        id: "java-020",
        question: "Which collection does not allow duplicate elements?",
        options: ["ArrayList", "LinkedList", "HashSet", "Vector"],
        answer: "HashSet",
      },
      {
        id: "java-021",
        question: "Which keyword is used to return a value from a method?",
        options: ["break", "return", "continue", "yield"],
        answer: "return",
      },
      {
        id: "java-022",
        question:
          "Which loop is commonly used when the number of iterations is known?",
        options: ["for", "if", "switch", "try"],
        answer: "for",
      },
      {
        id: "java-023",
        question: "What is the default value of an instance int field?",
        options: ["1", "-1", "0", "null"],
        answer: "0",
      },
      {
        id: "java-024",
        question: "Which operator gives the remainder after division?",
        options: ["/", "*", "%", "//"],
        answer: "%",
      },
      {
        id: "java-025",
        question: "Which method returns the length of a String?",
        options: ["size()", "length()", "count()", "getLength()"],
        answer: "length()",
      },
      {
        id: "java-026",
        question: "Which method compares the contents of two Strings?",
        options: ["==", "compare()", "equals()", "same()"],
        answer: "equals()",
      },
      {
        id: "java-027",
        question: "Which keyword prevents a method from being overridden?",
        options: ["static", "final", "private", "abstract"],
        answer: "final",
      },
      {
        id: "java-028",
        question: "Which keyword is used to create an abstract class?",
        options: ["virtual", "interface", "abstract", "base"],
        answer: "abstract",
      },
      {
        id: "java-029",
        question:
          "Which concept allows one interface to have multiple implementations?",
        options: ["Encapsulation", "Polymorphism", "Compilation", "Iteration"],
        answer: "Polymorphism",
      },
      {
        id: "java-030",
        question: "What is encapsulation in Java?",
        options: [
          "Combining data and methods in a class while controlling access",
          "Repeating a loop",
          "Converting code into machine instructions",
          "Creating multiple packages",
        ],
        answer:
          "Combining data and methods in a class while controlling access",
      },
      {
        id: "java-031",
        question: "Which keyword is used to call a superclass constructor?",
        options: ["this", "parent", "base", "super"],
        answer: "super",
      },
      {
        id: "java-032",
        question: "Which keyword is used to declare a package?",
        options: ["import", "package", "namespace", "module"],
        answer: "package",
      },
      {
        id: "java-033",
        question: "Which keyword imports a class from another package?",
        options: ["include", "using", "import", "require"],
        answer: "import",
      },
      {
        id: "java-034",
        question: "Which exception occurs when dividing an integer by zero?",
        options: [
          "NullPointerException",
          "ArithmeticException",
          "IOException",
          "ClassNotFoundException",
        ],
        answer: "ArithmeticException",
      },
      {
        id: "java-035",
        question: "Which keyword explicitly throws an exception?",
        options: ["throws", "throw", "catch", "error"],
        answer: "throw",
      },
      {
        id: "java-036",
        question:
          "Which keyword declares exceptions a method may pass to its caller?",
        options: ["throw", "throws", "finally", "catch"],
        answer: "throws",
      },
      {
        id: "java-037",
        question: "Which collection stores elements as key-value pairs?",
        options: ["HashSet", "ArrayList", "HashMap", "LinkedList"],
        answer: "HashMap",
      },
      {
        id: "java-038",
        question: "Which method adds an element to an ArrayList?",
        options: ["insert()", "add()", "append()", "put()"],
        answer: "add()",
      },
      {
        id: "java-039",
        question: "Which method removes all elements from a collection?",
        options: ["remove()", "deleteAll()", "clear()", "empty()"],
        answer: "clear()",
      },
      {
        id: "java-040",
        question: "Which keyword is used to start a new thread's execution?",
        options: ["execute()", "start()", "begin()", "runNow()"],
        answer: "start()",
      },
      {
        id: "java-041",
        question: "Which method contains the code executed by a Thread?",
        options: ["main()", "start()", "run()", "execute()"],
        answer: "run()",
      },
      {
        id: "java-042",
        question: "Which class can read text input from the console?",
        options: ["Scanner", "Printer", "ConsoleWriter", "FileOutputStream"],
        answer: "Scanner",
      },
      {
        id: "java-043",
        question: "Which Scanner method reads the next integer?",
        options: ["next()", "nextLine()", "nextInt()", "readInt()"],
        answer: "nextInt()",
      },
      {
        id: "java-044",
        question:
          "Which keyword is used to declare a method that belongs to the class?",
        options: ["static", "final", "void", "public"],
        answer: "static",
      },
      {
        id: "java-045",
        question: "What is a constructor used for?",
        options: [
          "Initializing a new object",
          "Destroying a class",
          "Repeating a loop",
          "Importing a package",
        ],
        answer: "Initializing a new object",
      },
      {
        id: "java-046",
        question:
          "Which feature allows methods to share a name but have different parameter lists?",
        options: [
          "Method overriding",
          "Method overloading",
          "Inheritance",
          "Encapsulation",
        ],
        answer: "Method overloading",
      },
      {
        id: "java-047",
        question: "Which keyword skips the current loop iteration?",
        options: ["break", "return", "continue", "exit"],
        answer: "continue",
      },
      {
        id: "java-048",
        question: "Which keyword immediately exits a loop?",
        options: ["continue", "break", "skip", "next"],
        answer: "break",
      },
      {
        id: "java-049",
        question: "Which Java type represents a sequence of characters?",
        options: ["char", "String", "boolean", "double"],
        answer: "String",
      },
      {
        id: "java-050",
        question:
          "Which principle hides internal implementation details and exposes essential functionality?",
        options: ["Abstraction", "Iteration", "Compilation", "Recursion"],
        answer: "Abstraction",
      },
    ],

    "JavaScript Basics": [
      {
        id: "js-001",
        question: "Which keyword declares a variable that can be reassigned?",
        options: ["const", "let", "fixed", "define"],
        answer: "let",
      },
      {
        id: "js-002",
        question: "Which function prints output to the browser console?",
        options: ["print()", "echo()", "console.log()", "System.out.println()"],
        answer: "console.log()",
      },
      {
        id: "js-003",
        question: "Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "===",
      },
      {
        id: "js-004",
        question: "Which data type represents true or false?",
        options: ["String", "Number", "Boolean", "Array"],
        answer: "Boolean",
      },
      {
        id: "js-005",
        question:
          "Which keyword declares a variable that cannot be reassigned?",
        options: ["let", "var", "const", "static"],
        answer: "const",
      },
      {
        id: "js-006",
        question: "Which brackets create an array in JavaScript?",
        options: ["{}", "[]", "()", "<>"],
        answer: "[]",
      },
      {
        id: "js-007",
        question: "Which operator represents logical AND?",
        options: ["||", "&&", "!", "&"],
        answer: "&&",
      },
      {
        id: "js-008",
        question: "Which statement checks a condition?",
        options: ["if", "repeat", "echo", "define"],
        answer: "if",
      },
      {
        id: "js-009",
        question: "Which method adds an element to the end of an array?",
        options: ["pop()", "shift()", "push()", "join()"],
        answer: "push()",
      },
      {
        id: "js-010",
        question: "Which keyword is used to declare a function?",
        options: ["method", "function", "func", "define"],
        answer: "function",
      },
      {
        id: "js-011",
        question:
          "Which keyword declares a block-scoped variable that can be reassigned?",
        options: ["const", "let", "static", "final"],
        answer: "let",
      },
      {
        id: "js-012",
        question: "What is the result of typeof 42?",
        options: ["number", "integer", "string", "boolean"],
        answer: "number",
      },
      {
        id: "js-013",
        question: "Which operator checks both value and type equality?",
        options: ["=", "==", "===", "!="],
        answer: "===",
      },
      {
        id: "js-014",
        question: "Which method converts a string to lowercase?",
        options: ["toLowerCase()", "lower()", "lowercase()", "toSmall()"],
        answer: "toLowerCase()",
      },
      {
        id: "js-015",
        question: "Which method converts a string to uppercase?",
        options: ["upper()", "toUpperCase()", "capitalize()", "toCapital()"],
        answer: "toUpperCase()",
      },
      {
        id: "js-016",
        question: "Which array method removes the last element?",
        options: ["shift()", "slice()", "pop()", "push()"],
        answer: "pop()",
      },
      {
        id: "js-017",
        question: "Which array method removes the first element?",
        options: ["shift()", "pop()", "push()", "unshift()"],
        answer: "shift()",
      },
      {
        id: "js-018",
        question: "Which array method adds an element to the beginning?",
        options: ["push()", "unshift()", "shift()", "concat()"],
        answer: "unshift()",
      },
      {
        id: "js-019",
        question: "What does an array's length property return?",
        options: [
          "The last element",
          "The number of elements",
          "The first index",
          "The array type",
        ],
        answer: "The number of elements",
      },
      {
        id: "js-020",
        question:
          "What is the index of the first element in a JavaScript array?",
        options: ["1", "-1", "0", "It has no index"],
        answer: "0",
      },
      {
        id: "js-021",
        question: "Which loop is commonly used to iterate over array values?",
        options: ["for...of", "if...else", "try...catch", "switch"],
        answer: "for...of",
      },
      {
        id: "js-022",
        question:
          "Which method creates a new array by transforming each element?",
        options: ["filter()", "map()", "find()", "pop()"],
        answer: "map()",
      },
      {
        id: "js-023",
        question: "Which method returns elements that satisfy a condition?",
        options: ["map()", "join()", "filter()", "push()"],
        answer: "filter()",
      },
      {
        id: "js-024",
        question:
          "Which method checks whether at least one array element satisfies a condition?",
        options: ["every()", "some()", "map()", "reduce()"],
        answer: "some()",
      },
      {
        id: "js-025",
        question: "Which method combines array elements into a single value?",
        options: ["reduce()", "filter()", "slice()", "reverse()"],
        answer: "reduce()",
      },
      {
        id: "js-026",
        question: "Which symbol starts a single-line comment in JavaScript?",
        options: ["<!--", "//", "**", "##"],
        answer: "//",
      },
      {
        id: "js-027",
        question: "Which syntax creates a template literal?",
        options: ['" "', "' '", "` `", "( )"],
        answer: "` `",
      },
      {
        id: "js-028",
        question: "Which keyword declares a function?",
        options: ["func", "function", "method", "define"],
        answer: "function",
      },
      {
        id: "js-029",
        question: "What does a function return if it has no return statement?",
        options: ["null", "0", "false", "undefined"],
        answer: "undefined",
      },
      {
        id: "js-030",
        question: "Which arrow function syntax is valid?",
        options: [
          "(x) -> x * 2",
          "(x) => x * 2",
          "(x) := x * 2",
          "(x) == x * 2",
        ],
        answer: "(x) => x * 2",
      },
      {
        id: "js-031",
        question: "Which value represents an intentional absence of a value?",
        options: ["undefined", "null", "NaN", "false"],
        answer: "null",
      },
      {
        id: "js-032",
        question: "What is the result of Boolean(0)?",
        options: ["true", "false", "0", "undefined"],
        answer: "false",
      },
      {
        id: "js-033",
        question:
          "Which operator returns the value on its right when the left value is null or undefined?",
        options: ["||", "&&", "??", "==="],
        answer: "??",
      },
      {
        id: "js-034",
        question: "Which operator is commonly used for exponentiation?",
        options: ["^", "**", "//", "%%"],
        answer: "**",
      },
      {
        id: "js-035",
        question: "What is the result of 10 % 3?",
        options: ["3", "1", "0", "3.33"],
        answer: "1",
      },
      {
        id: "js-036",
        question:
          "Which statement handles multiple condition branches based on one expression?",
        options: ["switch", "while", "throw", "import"],
        answer: "switch",
      },
      {
        id: "js-037",
        question:
          "Which statement handles an error that occurs inside a try block?",
        options: ["if", "catch", "switch", "return"],
        answer: "catch",
      },
      {
        id: "js-038",
        question: "Which keyword creates an object in JavaScript?",
        options: ["object", "newObject", "new", "classObject"],
        answer: "new",
      },
      {
        id: "js-039",
        question: "Which syntax accesses the name property of an object?",
        options: ["object->name", "object.name", "object::name", "object/name"],
        answer: "object.name",
      },
      {
        id: "js-040",
        question:
          "Which method converts a JSON string into a JavaScript value?",
        options: [
          "JSON.stringify()",
          "JSON.parse()",
          "JSON.convert()",
          "JSON.read()",
        ],
        answer: "JSON.parse()",
      },
      {
        id: "js-041",
        question:
          "Which method converts a JavaScript value into a JSON string?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.toObject()",
          "JSON.encodeObject()",
        ],
        answer: "JSON.stringify()",
      },
      {
        id: "js-042",
        question: "Which browser API selects an element by its ID?",
        options: [
          "document.getElementById()",
          "document.getByClass()",
          "window.selectId()",
          "document.findId()",
        ],
        answer: "document.getElementById()",
      },
      {
        id: "js-043",
        question: "Which property changes the text content of an HTML element?",
        options: ["innerStyle", "textContent", "textValueOnly", "htmlClass"],
        answer: "textContent",
      },
      {
        id: "js-044",
        question:
          "Which keyword waits for a Promise to settle inside an async function?",
        options: ["defer", "await", "pause", "wait"],
        answer: "await",
      },
      {
        id: "js-045",
        question:
          "Which keyword declares a function that always returns a Promise?",
        options: ["promise", "async", "await", "defer"],
        answer: "async",
      },
      {
        id: "js-046",
        question:
          "Which array method returns the first element matching a condition?",
        options: ["find()", "filter()", "map()", "reduce()"],
        answer: "find()",
      },
      {
        id: "js-047",
        question: "Which operator returns the type of a value as a string?",
        options: ["type()", "typeof", "instance", "getType"],
        answer: "typeof",
      },
      {
        id: "js-048",
        question:
          "Which built-in function converts a numeric string to a number when possible?",
        options: ["parseInt()", "toString()", "String()", "isNaN()"],
        answer: "parseInt()",
      },
      {
        id: "js-049",
        question:
          "Which method creates a shallow copy of part of an array without changing the original?",
        options: ["splice()", "slice()", "pop()", "sort()"],
        answer: "slice()",
      },
      {
        id: "js-050",
        question: "Which keyword exports a default value from an ES module?",
        options: [
          "export default",
          "import default",
          "module default",
          "return default",
        ],
        answer: "export default",
      },
    ],
    "Problem Solving": [
      {
        id: "ps-001",
        question: "What is the first step in solving a programming problem?",
        options: [
          "Write code immediately",
          "Understand the problem",
          "Run the program",
          "Delete the input",
        ],
        answer: "Understand the problem",
      },
      {
        id: "ps-002",
        question: "What is an algorithm?",
        options: [
          "A programming language",
          "A computer device",
          "A step-by-step solution to a problem",
          "A type of variable",
        ],
        answer: "A step-by-step solution to a problem",
      },
      {
        id: "ps-003",
        question: "What does debugging mean?",
        options: [
          "Finding and fixing errors",
          "Deleting a program",
          "Creating a folder",
          "Installing software",
        ],
        answer: "Finding and fixing errors",
      },
      {
        id: "ps-004",
        question: "What is the output of 5 + 3 * 2?",
        options: ["16", "11", "13", "10"],
        answer: "11",
      },
      {
        id: "ps-005",
        question: "Which concept is used to repeat a block of code?",
        options: ["Loop", "Variable", "Comment", "Class"],
        answer: "Loop",
      },
      {
        id: "ps-006",
        question: "What is a variable used for?",
        options: [
          "Storing data",
          "Deleting files",
          "Turning off a computer",
          "Printing paper",
        ],
        answer: "Storing data",
      },
      {
        id: "ps-007",
        question: "What is the remainder when 17 is divided by 5?",
        options: ["2", "3", "5", "1"],
        answer: "2",
      },
      {
        id: "ps-008",
        question:
          "Which data structure stores elements in an indexed sequence?",
        options: ["Array", "Boolean", "Condition", "Operator"],
        answer: "Array",
      },
      {
        id: "ps-009",
        question: "What is the purpose of testing a program?",
        options: [
          "To make the code longer",
          "To check whether it works correctly",
          "To remove all variables",
          "To change the programming language",
        ],
        answer: "To check whether it works correctly",
      },
      {
        id: "ps-010",
        question:
          "What is the time complexity of accessing an array element by index?",
        options: ["O(n)", "O(n²)", "O(1)", "O(log n)"],
        answer: "O(1)",
      },
      {
        id: "ps-011",
        question: "What is the purpose of pseudocode?",
        options: [
          "To describe an algorithm in a readable, code-like format",
          "To execute a program directly",
          "To store database records",
          "To compile Java code",
        ],
        answer: "To describe an algorithm in a readable, code-like format",
      },
      {
        id: "ps-012",
        question: "What is the output of 12 + 8 / 4?",
        options: ["5", "14", "20", "8"],
        answer: "14",
      },
      {
        id: "ps-013",
        question:
          "What is the time complexity of a loop that visits every element in an array once?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: "O(n)",
      },
      {
        id: "ps-014",
        question:
          "Which search algorithm requires sorted data to work correctly in its standard form?",
        options: [
          "Linear search",
          "Binary search",
          "Sequential search",
          "Random search",
        ],
        answer: "Binary search",
      },
      {
        id: "ps-015",
        question: "What is the worst-case time complexity of linear search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: "O(n)",
      },
      {
        id: "ps-016",
        question: "Which data structure follows Last In, First Out (LIFO)?",
        options: ["Queue", "Stack", "Array", "Graph"],
        answer: "Stack",
      },
      {
        id: "ps-017",
        question: "Which data structure follows First In, First Out (FIFO)?",
        options: ["Stack", "Tree", "Queue", "Heap"],
        answer: "Queue",
      },
      {
        id: "ps-018",
        question: "What is recursion?",
        options: [
          "A function calling itself",
          "A loop that never ends",
          "Sorting an array",
          "Declaring a variable",
        ],
        answer: "A function calling itself",
      },
      {
        id: "ps-019",
        question: "Why is a base case important in recursion?",
        options: [
          "It increases memory usage",
          "It provides a stopping condition",
          "It sorts the input",
          "It creates a new array",
        ],
        answer: "It provides a stopping condition",
      },
      {
        id: "ps-020",
        question: "What is the result of 7 * 6?",
        options: ["36", "40", "42", "48"],
        answer: "42",
      },
      {
        id: "ps-021",
        question:
          "Which algorithm repeatedly compares adjacent elements and swaps them when needed?",
        options: [
          "Binary search",
          "Bubble sort",
          "Merge sort",
          "Linear search",
        ],
        answer: "Bubble sort",
      },
      {
        id: "ps-022",
        question: "What is the worst-case time complexity of bubble sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: "O(n²)",
      },
      {
        id: "ps-023",
        question:
          "Which sorting algorithm uses the divide-and-conquer approach?",
        options: [
          "Bubble sort",
          "Merge sort",
          "Linear search",
          "Counting loop",
        ],
        answer: "Merge sort",
      },
      {
        id: "ps-024",
        question: "What is the average-case time complexity of quicksort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: "O(n log n)",
      },
      {
        id: "ps-025",
        question: "What is an edge in a graph?",
        options: [
          "A connection between vertices",
          "A sorted array",
          "A loop condition",
          "A function parameter",
        ],
        answer: "A connection between vertices",
      },
      {
        id: "ps-026",
        question: "Which algorithm explores a graph level by level?",
        options: ["DFS", "BFS", "Binary search", "Bubble sort"],
        answer: "BFS",
      },
      {
        id: "ps-027",
        question: "Which graph traversal commonly uses a stack or recursion?",
        options: ["BFS", "DFS", "Linear search", "Merge sort"],
        answer: "DFS",
      },
      {
        id: "ps-028",
        question: "What is the purpose of a hash table?",
        options: [
          "To provide efficient key-based data lookup",
          "To execute loops",
          "To compile source code",
          "To display images",
        ],
        answer: "To provide efficient key-based data lookup",
      },
      {
        id: "ps-029",
        question: "What is a collision in a hash table?",
        options: [
          "Two keys map to the same hash location",
          "An array becomes empty",
          "A loop stops",
          "A function returns a value",
        ],
        answer: "Two keys map to the same hash location",
      },
      {
        id: "ps-030",
        question: "What is the main purpose of dynamic programming?",
        options: [
          "To solve problems by reusing results of overlapping subproblems",
          "To repeat every calculation",
          "To avoid storing values",
          "To replace all loops with recursion",
        ],
        answer:
          "To solve problems by reusing results of overlapping subproblems",
      },
      {
        id: "ps-031",
        question: "What is memoization?",
        options: [
          "Storing computed results to reuse them",
          "Deleting previous results",
          "Sorting values alphabetically",
          "Creating duplicate functions",
        ],
        answer: "Storing computed results to reuse them",
      },
      {
        id: "ps-032",
        question: "Which condition makes a number even?",
        options: [
          "number % 2 == 1",
          "number % 2 == 0",
          "number / 2 == 1",
          "number + 2 == 0",
        ],
        answer: "number % 2 == 0",
      },
      {
        id: "ps-033",
        question: "What is the sum of the first five positive integers?",
        options: ["10", "15", "20", "25"],
        answer: "15",
      },
      {
        id: "ps-034",
        question:
          "Which approach checks each element one by one until a target is found?",
        options: [
          "Binary search",
          "Linear search",
          "Merge sort",
          "Dynamic programming",
        ],
        answer: "Linear search",
      },
      {
        id: "ps-035",
        question: "What is the space complexity of an algorithm?",
        options: [
          "The amount of memory it uses relative to input size",
          "The number of developers",
          "The screen size",
          "The number of comments",
        ],
        answer: "The amount of memory it uses relative to input size",
      },
      {
        id: "ps-036",
        question: "What does Big-O notation describe?",
        options: [
          "An algorithm's growth rate as input size increases",
          "The programming language version",
          "The number of files in a project",
          "The screen resolution",
        ],
        answer: "An algorithm's growth rate as input size increases",
      },
      {
        id: "ps-037",
        question: "What is the output of 15 % 4?",
        options: ["2", "3", "4", "1"],
        answer: "3",
      },
      {
        id: "ps-038",
        question: "What is the largest value in the array [3, 9, 2, 7]?",
        options: ["3", "7", "9", "2"],
        answer: "9",
      },
      {
        id: "ps-039",
        question: "What is the smallest value in the array [8, 4, 6, 1]?",
        options: ["8", "4", "6", "1"],
        answer: "1",
      },
      {
        id: "ps-040",
        question: "What is the reverse of the string 'CAT'?",
        options: ["ACT", "TAC", "CTA", "ATC"],
        answer: "TAC",
      },
      {
        id: "ps-041",
        question: "What is a palindrome?",
        options: [
          "A sequence that reads the same forward and backward",
          "A sequence containing only numbers",
          "A sorted array",
          "A function without parameters",
        ],
        answer: "A sequence that reads the same forward and backward",
      },
      {
        id: "ps-042",
        question:
          "Which technique solves a problem by repeatedly choosing a locally optimal option?",
        options: [
          "Greedy algorithm",
          "Linear search",
          "Bubble sort",
          "Brute-force enumeration only",
        ],
        answer: "Greedy algorithm",
      },
      {
        id: "ps-043",
        question: "What is brute-force problem solving?",
        options: [
          "Trying possible candidates systematically",
          "Always choosing a random answer",
          "Skipping the input",
          "Using no computation",
        ],
        answer: "Trying possible candidates systematically",
      },
      {
        id: "ps-044",
        question: "What is the main purpose of a flowchart?",
        options: [
          "To visually represent the steps of a process or algorithm",
          "To store database records",
          "To compile a program",
          "To install an operating system",
        ],
        answer: "To visually represent the steps of a process or algorithm",
      },
      {
        id: "ps-045",
        question: "What is a boundary case in testing?",
        options: [
          "A test involving values at or near input limits",
          "A test that never runs",
          "A comment in the code",
          "A random variable declaration",
        ],
        answer: "A test involving values at or near input limits",
      },
      {
        id: "ps-046",
        question: "Why should a solution be tested with different inputs?",
        options: [
          "To check correctness across different scenarios",
          "To make the code longer",
          "To avoid finding errors",
          "To remove the output",
        ],
        answer: "To check correctness across different scenarios",
      },
      {
        id: "ps-047",
        question: "What does a function parameter represent?",
        options: [
          "An input a function can receive",
          "The final output only",
          "A compiler error",
          "A file extension",
        ],
        answer: "An input a function can receive",
      },
      {
        id: "ps-048",
        question: "What is an off-by-one error?",
        options: [
          "An error caused by an incorrect boundary or iteration count",
          "A network connection failure",
          "A missing programming language",
          "A sorting algorithm",
        ],
        answer: "An error caused by incorrect boundary or iteration count",
      },
      {
        id: "ps-049",
        question: "What is the output of 2 + 3 * 4?",
        options: ["20", "14", "24", "11"],
        answer: "14",
      },
      {
        id: "ps-050",
        question: "What should you do after implementing a solution?",
        options: [
          "Test it with suitable cases",
          "Assume it is always correct",
          "Delete the source code",
          "Ignore all errors",
        ],
        answer: "Test it with suitable cases",
      },
    ],
  };

  const featureCategories = {
    Explore: ["Technology", "Creativity", "Fitness"],
    Discover: ["AI Tools", "Fun & Games", "Family Activities"],
    Grow: ["Coding", "Communication", "Personal Development"],
  };

  function saveAttemptedIds(updatedIds) {
    setAttemptedQuestionIds(updatedIds);

    localStorage.setItem("attemptedQuestionIds", JSON.stringify(updatedIds));
  }

  function resetQuiz() {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setAttemptQuestions([]);
  }

  function handleFeatureClick(feature) {
    setSelectedFeature(feature);
    setSelectedCategory(null);
    setSelectedTopic(null);
    resetQuiz();
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    setSelectedTopic(null);
    resetQuiz();
  }

  function handleTopicClick(topic) {
    setSelectedTopic(topic);
    resetQuiz();
  }

  function handleStartQuiz() {
    const questions = quizQuestions[selectedTopic] || [];

    if (questions.length === 0) {
      alert("Questions are coming soon! Stay tuned.");
      return;
    }

    const attemptedIds = attemptedQuestionIds[selectedTopic] || [];

    let availableQuestions = questions.filter(
      (question) => !attemptedIds.includes(question.id),
    );

    if (availableQuestions.length === 0) {
      availableQuestions = questions;

      const updatedAttemptedIds = {
        ...attemptedQuestionIds,
        [selectedTopic]: [],
      };

      saveAttemptedIds(updatedAttemptedIds);
    }

    const shuffledQuestions = [...availableQuestions].sort(
      () => Math.random() - 0.5,
    );

    const selectedQuestions = shuffledQuestions.slice(0, 10);

    setAttemptQuestions(selectedQuestions);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    quizStatsRecorded.current = false;
  }

  function handleAnswerSelect(option) {
    if (selectedAnswer !== null) {
      return;
    }

    const currentQuestionData = attemptQuestions[currentQuestion];

    if (!currentQuestionData) {
      return;
    }

    setSelectedAnswer(option);

    if (option === currentQuestionData.answer) {
      setQuizScore((score) => score + 1);
    }

    const attemptedIds = attemptedQuestionIds[selectedTopic] || [];

    if (!attemptedIds.includes(currentQuestionData.id)) {
      const updatedAttemptedIds = {
        ...attemptedQuestionIds,
        [selectedTopic]: [...attemptedIds, currentQuestionData.id],
      };

      saveAttemptedIds(updatedAttemptedIds);
    }
  }
  function handleNextQuestion() {
    const isLastQuestion = currentQuestion === attemptQuestions.length - 1;

    if (isLastQuestion && !quizStatsRecorded.current) {
      const updatedStats = {
        completedQuizzes: quizStats.completedQuizzes + 1,
        totalCorrectAnswers: quizStats.totalCorrectAnswers + quizScore,
        totalQuestions: quizStats.totalQuestions + attemptQuestions.length,
      };

      quizStatsRecorded.current = true;

      setQuizStats(updatedStats);
      localStorage.setItem("quizStats", JSON.stringify(updatedStats));
    }

    setSelectedAnswer(null);
    setCurrentQuestion((question) => question + 1);
  }
  function handleTryAgain() {
    handleStartQuiz();
  }

  function handleBackToTopics() {
    setSelectedTopic(null);
    resetQuiz();
  }

  function handleClearSelection() {
    setSelectedFeature(null);
    setSelectedCategory(null);
    setSelectedTopic(null);
    resetQuiz();
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home">
          NextGen<span>App</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#discover">Discover</a>
          <a href="#about">About</a>
        </nav>

        <button
          type="button"
          className="login-button"
          onClick={() => {
            document.getElementById("discover")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Get Started
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <p className="eyebrow">A NEW WAY TO DISCOVER</p>

          <h1>
            Your world.
            <br />
            Your possibilities.
            <br />
            <span>All in one place.</span>
          </h1>

          <p className="description">
            Explore new possibilities, discover ideas, and find experiences that
            connect with your interests. Your journey starts here.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                document.getElementById("discover")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Start Exploring →
            </button>

            <a className="secondary-button" href="#about">
              Learn More
            </a>
          </div>

          <div className="trust-note">
            <span className="status-dot"></span>A new experience begins with
            you.
          </div>
        </section>
        <section className="stats-section">
          <p className="eyebrow">YOUR PROGRESS</p>
          <h2>Your Learning Dashboard</h2>
          <p className="stats-description">
            Track your quiz performance and celebrate your progress.
          </p>

          <div className="stats-grid">
            <article className="stat-card">
              <span className="stat-icon">🏆</span>
              <h3>Quizzes Completed</h3>
              <p className="stat-number">{quizStats.completedQuizzes}</p>
            </article>

            <article className="stat-card">
              <span className="stat-icon">✅</span>
              <h3>Correct Answers</h3>
              <p className="stat-number">{quizStats.totalCorrectAnswers}</p>
            </article>

            <article className="stat-card">
              <span className="stat-icon">📊</span>
              <h3>Average Score</h3>
              <p className="stat-number">
                {quizStats.totalQuestions > 0
                  ? Math.round(
                      (quizStats.totalCorrectAnswers /
                        quizStats.totalQuestions) *
                        100,
                    )
                  : 0}
                %
              </p>
            </article>
          </div>
        </section>
        <section className="discover-section" id="discover">
          <p className="eyebrow">YOUR NEXT CHAPTER</p>

          <h2>Discover what’s possible.</h2>

          <div className="feature-grid">
            <article
              className="feature-card"
              onClick={() => handleFeatureClick("Explore")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleFeatureClick("Explore");
                }
              }}
            >
              <span className="feature-icon">✦</span>
              <h3>Explore</h3>
              <p>Open the door to new ideas, interests, and possibilities.</p>
            </article>

            <article
              className="feature-card"
              onClick={() => handleFeatureClick("Discover")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleFeatureClick("Discover");
                }
              }}
            >
              <span className="feature-icon">◎</span>
              <h3>Discover</h3>
              <p>Find experiences and opportunities worth exploring.</p>
            </article>

            <article
              className="feature-card"
              onClick={() => handleFeatureClick("Grow")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleFeatureClick("Grow");
                }
              }}
            >
              <span className="feature-icon">↗</span>
              <h3>Grow</h3>
              <p>
                Turn curiosity into learning, progress, and new experiences.
              </p>
            </article>
          </div>

          {selectedFeature && (
            <div className="selected-feature">
              <h3>
                {selectedFeature === "Explore" && "✦ Explore Your Interests"}
                {selectedFeature === "Discover" && "◎ Discover Something New"}
                {selectedFeature === "Grow" && "↗ Grow Every Day"}
              </h3>

              <p>
                {selectedFeature === "Explore" &&
                  "Browse different interests and find what excites you."}

                {selectedFeature === "Discover" &&
                  "Find fresh ideas, useful recommendations, and new experiences."}

                {selectedFeature === "Grow" &&
                  "Build skills, learn new things, and track your progress."}
              </p>

              <div className="category-list">
                {featureCategories[selectedFeature].map((category) => (
                  <button
                    type="button"
                    key={category}
                    className={
                      selectedCategory === category
                        ? "category active"
                        : "category"
                    }
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <div className="category-details">
                  <h4>{selectedCategory}</h4>

                  <p>{categoryDetails[selectedCategory].description}</p>

                  <div className="topic-list">
                    {categoryDetails[selectedCategory].topics.map((topic) => (
                      <button
                        type="button"
                        className="topic-card"
                        key={topic}
                        onClick={() => handleTopicClick(topic)}
                      >
                        <span>✦</span>
                        <p>{topic}</p>
                        <small className="topic-question-count">
                          {quizQuestions[topic]?.length
                            ? `${quizQuestions[topic].length} quiz questions`
                            : "Lessons coming soon"}
                        </small>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedTopic && (
                <div className="lesson-panel">
                  <h3>{topicLessons[selectedTopic]?.title || selectedTopic}</h3>

                  <p>
                    {topicLessons[selectedTopic]?.description ||
                      `Explore ${selectedTopic} through beginner-friendly lessons and activities.`}
                  </p>

                  {topicLessons[selectedTopic]?.example && (
                    <pre>
                      <code>{topicLessons[selectedTopic].example}</code>
                    </pre>
                  )}

                  {quizQuestions[selectedTopic] && (
                    <div className="quiz-section">
                      {!quizStarted ? (
                        <button type="button" onClick={handleStartQuiz}>
                          Start Quiz
                        </button>
                      ) : currentQuestion < attemptQuestions.length ? (
                        <div className="quiz-content">
                          <button
                            type="button"
                            className="quiz-exit-button"
                            onClick={handleBackToTopics}
                          >
                            ← Exit Quiz
                          </button>
                          <h4>
                            Question {currentQuestion + 1} of{" "}
                            {attemptQuestions.length}
                          </h4>
                          <div className="quiz-progress">
                            <div
                              className="quiz-progress-bar"
                              style={{
                                width: `${
                                  ((currentQuestion + 1) /
                                    attemptQuestions.length) *
                                  100
                                }%`,
                              }}
                            />
                          </div>

                          <p>{attemptQuestions[currentQuestion].question}</p>

                          <div className="quiz-options">
                            {attemptQuestions[currentQuestion].options.map(
                              (option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => handleAnswerSelect(option)}
                                  disabled={selectedAnswer !== null}
                                  className={
                                    selectedAnswer === option
                                      ? option ===
                                        attemptQuestions[currentQuestion].answer
                                        ? "correct-answer"
                                        : "wrong-answer"
                                      : selectedAnswer !== null &&
                                          option ===
                                            attemptQuestions[currentQuestion]
                                              .answer
                                        ? "correct-answer"
                                        : ""
                                  }
                                >
                                  {option}
                                </button>
                              ),
                            )}
                          </div>

                          {selectedAnswer !== null && (
                            <div className="quiz-feedback">
                              <p>
                                {selectedAnswer ===
                                attemptQuestions[currentQuestion].answer
                                  ? "Correct answer! 🎉"
                                  : `Incorrect! Correct answer: ${attemptQuestions[currentQuestion].answer}`}
                              </p>

                              <button
                                type="button"
                                onClick={handleNextQuestion}
                              >
                                {currentQuestion === attemptQuestions.length - 1
                                  ? "View Results"
                                  : "Next Question →"}
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="quiz-results">
                          <h4>Quiz Completed! 🎉</h4>

                          <p>
                            Your Score: {quizScore} / {attemptQuestions.length}
                          </p>
                          <p className="result-percentage">
                            <p className="result-correct">
                              ✅ Correct Answers: {quizScore}
                            </p>
                            <p className="result-wrong">
                              ❌ Wrong Answers:{" "}
                              {attemptQuestions.length - quizScore}
                            </p>
                            {attemptQuestions.length > 0
                              ? Math.round(
                                  (quizScore / attemptQuestions.length) * 100,
                                )
                              : 0}
                            % Score
                          </p>

                          <p className="result-message">
                            {attemptQuestions.length > 0 &&
                            quizScore / attemptQuestions.length >= 0.8
                              ? "Excellent! 🎉 You've mastered this quiz!"
                              : attemptQuestions.length > 0 &&
                                  quizScore / attemptQuestions.length >= 0.5
                                ? "Good effort! 💪 Keep practicing!"
                                : "Don't give up! 📚 Learn and try again!"}
                          </p>

                          <button type="button" onClick={handleTryAgain}>
                            Try Again 🔄
                          </button>

                          <button type="button" onClick={handleBackToTopics}>
                            🏠 Back to Topics
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <button type="button" onClick={handleBackToTopics}>
                    Back to Topics
                  </button>
                </div>
              )}

              <button type="button" onClick={handleClearSelection}>
                Clear Selection
              </button>
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <h2>One app. More possibilities.</h2>

          <p>
            A space designed to help you explore, learn, and discover something
            new at every stage of life.
          </p>
        </section>
      </main>

      <footer>
        <a className="logo" href="#home">
          NextGen<span>App</span>
        </a>

        <p>Built for possibilities.</p>
      </footer>
    </div>
  );
}

export default App;
