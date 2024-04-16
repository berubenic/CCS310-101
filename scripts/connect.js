document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Display the loading div
        document.querySelector('#loadingBlocker').style.display = 'block';

        // Validate the form fields
        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var subject = document.getElementById('subject');
        var message = document.getElementById('message');

        var errors = [];

        if (name.value.length < 2) {
            errors.push({field: 'name', message: 'Name should be at least 2 characters long'});
        }

        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.value)) {
            errors.push({field: 'email', message: 'Email should be a valid email'});
        }

        if (subject.value.length < 2) {
            errors.push({field: 'subject', message: 'Subject should be at least 2 characters long'});
        }

        if (message.value.length < 10) {
            errors.push({field: 'message', message: 'Message should be at least 10 characters long'});
        }

        // Wait for 5 seconds
        setTimeout(function() {
            // Hide the loading div
            document.querySelector('#loadingBlocker').style.display = 'none';

            // Clear previous error messages
            document.querySelectorAll('.error').forEach(function(errorDiv) {
                errorDiv.style.display = 'none';
            });

            // Display the errors or success message
            if (errors.length > 0) {
                errors.forEach(function(error) {
                    var errorDiv = document.getElementById(error.field + 'Error');
                    errorDiv.textContent = error.message;
                    errorDiv.style.display = 'block';
                });
            } else {
                var successDiv = document.querySelector('#successBlocker');
                successDiv.style.display = 'block';

                // Hide the success message after 5 seconds
                setTimeout(function() {
                    successDiv.style.display = 'none';
                }, 5000);
            }
        }, 5000);
    });
});