window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            // Check each input field in the form
            Array.prototype.filter.call(form.elements, function(element) {
                if (element.type !== 'button') {
                    var feedback = element.parentNode.querySelector('.invalid-feedback-custom');
                    if (element.checkValidity() === false) {
                        // If the input is invalid, add your custom invalid feedback class
                        feedback.style.display = 'block';
                    } else {
                        // If the input is valid, remove your custom invalid feedback class
                        feedback.style.display = 'none';
                    }
                }
            });

            if (form.checkValidity() === true) {
                // Display the loading div
                document.querySelector('#loadingBlocker').style.display = 'block';

                // This would be the call to the server
                setTimeout(function() {
                    // Hide the loading div
                    document.querySelector('#loadingBlocker').style.display = 'none';

                    // There would be validation of returned data
                    var successDiv = document.querySelector('#successBlocker');
                    successDiv.style.display = 'block';

                    // Clear all the input fields in the form
                    Array.prototype.filter.call(form.elements, function(element) {
                        if (element.type !== 'button') {
                            element.value = '';
                        }
                    });

                    // Hide the success message after 5 seconds
                    setTimeout(function () {
                        successDiv.style.display = 'none';
                    }, 5000);
                }, 5000);
            }

            form.classList.add('was-validated');
        }, false);
    });
}, false);