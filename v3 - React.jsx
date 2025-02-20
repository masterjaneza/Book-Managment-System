import React, { useState } from 'react';

const BookManagementSystem = () => {
  const [books, setBooks] = useState([
    { title: "To Kill a Mockingbird", author: "Harper Lee", isBorrowed: false },
    { title: "1984", author: "George Orwell", isBorrowed: false },
    { title: "Moby Dick", author: "Herman Melville", isBorrowed: false },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isBorrowed: false },
  ]);

  const [members, setMembers] = useState([
    { name: "Alice", borrowed_books: [] },
    { name: "Bob", borrowed_books: ["Moby Dick"] },
    { name: "John", borrowed_books: [] },
  ]);

  const borrowBook = (memberName, bookTitle) => {
    const member = members.find(({ name }) => name === memberName);
    const book = books.find(({ title }) => title === bookTitle);

    if (!member) return console.log(`Member '${memberName}' not found.`);
    if (!book) return console.log(`Book '${bookTitle}' not found.`);
    if (member.borrowed_books.length > 0)
      return console.log(`${memberName} already has a borrowed book. Return it first.`);
    if (book.isBorrowed)
      return console.log(`Book '${bookTitle}' is already borrowed. We will notify you when it returns.`);

    member.borrowed_books.push(book.title);
    book.isBorrowed = true;
    setMembers([...members]);
    setBooks([...books]);
    console.log(`${memberName} borrowed '${book.title}'.`);
  };

  const returnBook = (memberName, bookTitle) => {
    const member = members.find(({ name }) => name === memberName);
    const book = books.find(({ title }) => title === bookTitle);

    if (!member) return console.log(`Member '${memberName}' not found.`);
    if (!book) return console.log(`Book '${bookTitle}' not found.`);
    if (member.borrowed_books.length === 0)
      return console.log(`${memberName} has no borrowed books.`);

    const bookIndex = member.borrowed_books.indexOf(book.title);
    if (bookIndex === -1)
      return console.log(`${memberName} did not borrow '${bookTitle}'.`);

    member.borrowed_books.splice(bookIndex, 1);
    book.isBorrowed = false;
    setMembers([...members]);
    setBooks([...books]);
    console.log(`${memberName} returned '${book.title}'.`);
  };

  const showStatus = () => {
    console.log("Available books:");
    books.filter(({ isBorrowed }) => !isBorrowed).forEach(({ title }) => {
      console.log(`- ${title}`);
    });

    console.log("\nMembers and their borrowed books:");
    members.forEach(({ name, borrowed_books }) => {
      console.log(
        borrowed_books.length > 0
          ? `${name} borrowed: ${borrowed_books.join(", ")}`
          : `${name} has no borrowed books.`
      );
    });
  };

  // Test the functions
  borrowBook("Alice", "1984");
  borrowBook("Bob", "The Great Gatsby");
  borrowBook("John", "To Kill a Mockingbird");

  returnBook("Bob", "Moby Dick");

  showStatus();

  return (
    <div>
      <h1>Book Management System</h1>
      <button onClick={() => borrowBook("Alice", "1984")}>Borrow "1984" for Alice</button>
      <button onClick={() => returnBook("Bob", "Moby Dick")}>Return "Moby Dick" for Bob</button>
      <button onClick={showStatus}>Show Status</button>
    </div>
  );
};

