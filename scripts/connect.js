window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // Display the loading div
                document.querySelector('#loadingBlocker').style.display = 'block';

                // This would be the call to the server
                setTimeout(function() {
                    // Hide the loading div
                    document.querySelector('#loadingBlocker').style.display = 'none';

                    // There would be validation of returned data
                    var successDiv = document.querySelector('#successBlocker');
                    successDiv.style.display = 'block';

                    // Hide the success message after 5 seconds
                    setTimeout(function () {
                        successDiv.style.display = 'none';
                    }, 5000);
                }, 5000);

                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
}, false);