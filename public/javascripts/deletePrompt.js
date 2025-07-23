    // Select all forms with delete buttons
    const deleteForms = document.querySelectorAll("form[action$='?_method=DELETE']");

    // Add the submit event listener to each form
    deleteForms.forEach(form => {
      form.addEventListener("submit", function(e) {
        let answer = confirm("Do you want to delete?");
        if(!answer) {
          e.preventDefault();
        }
      });
    });