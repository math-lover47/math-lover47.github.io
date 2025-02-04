class Person {
  static Amount = 0;
  static personsArray = []; // Array to store valid person objects

  constructor(name, email, subject, message) {
    if (!this.validateFields(name, email, subject, message)) {
      throw new Error("Invalid input");
    }
    this._name = name;
    this._email = email;
    this._subject = subject;
    this._message = message;
    Person.Amount++;
    Person.personsArray.push(this);
  }

  validateFields(name, email, subject, message) {
    if (/\d/.test(name)) {
      alert("Name cannot contain numbers.");
      return false;
    }
    if (
      email.indexOf("gmail.com") === -1 &&
      email.indexOf("mail.ru") === -1 &&
      email.indexOf("yandex.ru") === -1
    ) {
      alert("Currently we support only gmail.com/mail.ru/yandex.ru.");
      return false;
    }
    if (/\d/.test(subject)) {
      alert("Subject cannot contain numbers.");
      return false;
    }
    if (message.split(" ").length > 255) {
      alert("Message cannot exceed 255 words.");
      return false;
    }
    return true;
  }

  static displayGeneralInformation(displaySection) {
    displaySection.innerHTML = `<h3>General Information:</h3>`;
    displaySection.innerHTML += `<p><strong>Amount of users:</strong> ${Person.Amount}</p>`;
    displaySection.innerHTML += `<h4>Users List:</h4>`;

    // Using a for loop
    for (let i = 0; i < Person.personsArray.length; i++) {
      if (i == 5) {
        break;
      }
      // Iterable
      let lowercaseName = "";
      for (const x of String(Person.personsArray[i]._name)) {
        lowercaseName += x.toLocaleLowerCase();
      }
      displaySection.innerHTML += `<p><strong>For Loop:</strong> ${lowercaseName}</p>`;
    }
    // Using a while loop
    let j = 5;
    while (j < Person.personsArray.length) {
      displaySection.innerHTML += `<p><strong>While Loop:</strong> ${Person.personsArray[j]._name}</p>`;
      j++;
    }

    // Using a for-in loop
    for (let index in Person.personsArray) {
      displaySection.innerHTML += `<p><strong>For-In Loop:</strong> ${Person.personsArray[index]._name}</p>`;
    }

    // Using a for-of loop
    for (let person of Person.personsArray) {
      displaySection.innerHTML += `<p><strong>For-Of Loop:</strong> ${person._name}</p>`;
    }
  }

  displayPersonInformation(form, displaySection) {
    displaySection.innerHTML = `
      <h3>Submitted Information:</h3>
      <p><strong>Full Name:</strong> ${this._name}</p>
      <p><strong>Email:</strong> ${this._email}</p>
      <p><strong>Subject:</strong> ${this._subject}</p>
      <p><strong>Message:</strong> ${this._message}</p>
      <p><strong>Created:</strong> ${new Date().toLocaleDateString()}</p>
    `;
    form.reset();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const displaySection1 = document.createElement("div");
  const displaySection2 = document.createElement("div");

  displaySection1.classList.add("container", "mt-4");
  form.parentNode.appendChild(displaySection1);

  displaySection2.classList.add("container", "mt-4");
  form.parentNode.appendChild(displaySection2);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
      const person = new Person(name, email, subject, message);
      let {
        destructedname,
        destructedemail,
        destructedsubject,
        destructedmessage,
      } = person;

      Person.displayGeneralInformation(displaySection1);
      person.displayPersonInformation(form, displaySection2);
    } catch (error) {
      displaySection1.innerHTML = "";
      displaySection2.innerHTML = "";
    }
  });
});
