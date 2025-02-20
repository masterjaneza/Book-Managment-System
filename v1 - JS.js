
// Define the books array
const books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", isBorrowed: false },
    { title: "1984", author: "George Orwell", isBorrowed: false },
    { title: "Moby Dick", author: "Herman Melville", isBorrowed: false },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isBorrowed: false },
  ];
  
  // Define the members array
  const members = [
    { name: "Alice", borrowed_books: [] },
    { name: "Bob", borrowed_books: ["Moby Dick"] },
    { name: "John", borrowed_books: [] },
  ];
  
  // Function to borrow a book
  const borrowBook = (memberName, bookTitle) => {
    const member = members.find(({ name }) => name === memberName);
    const book = books.find(({ title }) => title === bookTitle);
  
    if (!member) return console.log(`Member '${memberName}' not found.`);
    if (!book) return console.log(`Book '${bookTitle}' not found.`);
    if (member.borrowed_books.length > 0) return console.log(`${memberName} already has a borrowed book. Return it first.`);
    if (book.isBorrowed) return console.log(`Book '${bookTitle}' is already borrowed. We will notify you when it returns.`);
  
    member.borrowed_books.push(book.title);
    book.isBorrowed = true;
    console.log(`${memberName} borrowed '${book.title}'.`);
  };
  
  // Function to return a book
  const returnBook = (memberName, bookTitle) => {
    const member = members.find(({ name }) => name === memberName);
    const book = books.find(({ title }) => title === bookTitle);
  
    if (!member) return console.log(`Member '${memberName}' not found.`);
    if (!book) return console.log(`Book '${bookTitle}' not found.`);
    if (member.borrowed_books.length === 0) return console.log(`${memberName} has no borrowed books.`);
  
    const bookIndex = member.borrowed_books.indexOf(book.title);
    if (bookIndex === -1) return console.log(`${memberName} did not borrow '${bookTitle}'.`);
  
    member.borrowed_books.splice(bookIndex, 1);
    book.isBorrowed = false;
    console.log(`${memberName} returned '${book.title}'.`);
  };
  
  // Function to show the status of books and members
  const showStatus = (members, books) => {
    console.log("Available books:");
    books.filter(({ isBorrowed }) => !isBorrowed).forEach(({ title }) => console.log(`- ${title}`));
  
    console.log("\nMembers and their borrowed books:");
    members.forEach(({ name, borrowed_books }) => {
      console.log(borrowed_books.length > 0 ? `${name} borrowed: ${borrowed_books.join(", ")}` : `${name} has no borrowed books.`);
    });
  };
  
  // Test the functions
  borrowBook("Alice", "1984");
  borrowBook("Bob", "The Great Gatsby");
  borrowBook("John", "To Kill a Mockingbird");
  
  returnBook("Bob", "Moby Dick");
  
  showStatus(members, books);