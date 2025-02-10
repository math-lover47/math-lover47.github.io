const existingEmails = [];
$(document).ready(function () {
  $("#registrationForm").on("submit", (element) => {
    element.preventDefault();

    $(".error").hide();

    let isValid = true;

    // name validation
    const name = $("#name").val();
    const nameRegex = /\d/;
    switch (true) {
      case name.length < 2:
        $("#nameError").text("Name must be at least 2 characters long").show();
        isValid = false;
        break;
      case name.length > 25:
        $("#nameError")
          .text("Name can contain maximum 25 characters long")
          .show();
        isValid = false;
        break;
      case nameRegex.test(name):
        $("#nameError").text("Name can't contain nums").show();
        isValid = false;
        break;
    }

    // email validation
    const email = $("#email").val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    switch (true) {
      case !emailRegex.test(email):
        $("#emailError").text("Please enter valid email address").show();
        isValid = false;
        break;
      case existingEmails.includes(email):
        $("#emailError")
          .text("This email address is already registered")
          .show();
        isValid = false;
        break;
    }

    // password validation
    const password = $("#password").val();
    switch (true) {
      case password.length < 8:
        $("#passwordError")
          .text("Password must contain at least 8 characters")
          .show();
        isValid = false;
        break;
      case password.length > 25:
        $("#passwordError")
          .text("Password must contain maximum 25 characters")
          .show();
        isValid = false;
        break;
    }

    // phone number validation
    const phone = $("#phone").val();
    const phoneRegex = /^\d{11}$/;
    switch (true) {
      case !phoneRegex.test(phone):
        $("#phoneError")
          .text("Please enter a valid 11-digit phone number")
          .show();
        isValid = false;
        break;
      case phone[0] !== "8":
        $("#phoneError").text("Must start from 8").show();
        isValid = false;
        break;
    }

    // birthday validation
    const birthday = new Date($("#birthday").val());
    const today = new Date();
    const age = today.getFullYear - birthday.getFullYear;

    switch (true) {
      case !$("#birthday").val():
        $("#birthdayError").text("Please enter all fields").show();
        isValid = false;
        break;
      case age < 0:
        $("#birthdayError").text("You are born in future!").show();
        isValid = false;
        break;
      case age < 18:
        $("#birthdayError").text("You must be at least 18 years old!").show();
        isValid = false;
        break;
      case age > 120:
        $("#birthdayError").text("You are too old!").show();
        isValid = false;
        break;
    }

    const selectedError = $("#errorType").val();
    switch (selectedError) {
      case "name":
        $("#nameError").text("Invalid name chosen").show();
        isValid = false;
        break;
      case "phone":
        $("#phoneError").text("Invalid phone number chosen").show();
        isValid = false;
        break;
      case "password":
        $("#passwordError").text("Invalid password chosen").show();
        isValid = false;
        break;
      case "email":
        $("#emailError").text("Invalid email chosen").show();
        isValid = false;
        break;
      case "age":
        $("#ageError").text("Invalid age chosen").show();
        isValid = false;
        break;
      case "none":
        break;
    }
    if (isValid) {
      existingEmails.push(email);
      console.log(existingEmails);

      $(".formContainer").animate(
        {
          opacity: 0.5,
        },
        300,
        () => {
          $(".success-message").fadeIn(500);
          setTimeout(() => {
            $(".form-container").animate({ opacity: 1 }, 300);
            $(".success-message").fadeOut(2000);
          }, 300);
        }
      );
    }
  });
});
