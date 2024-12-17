document.addEventListener('DOMContentLoaded', function () {

   var links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });

    var backToTopButton = document.createElement('button');
    backToTopButton.innerText = ' Back to Top';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    if (!localStorage.getItem('visited')) {
        setTimeout(function () {
            alert('Welcome to our Online Psychiatrist Appointment System!');
            localStorage.setItem('visited', 'true');
        }, 1000);
    }

    var appointmentForm = document.querySelector('#appointment-form form');
    appointmentForm.addEventListener('submit', function (e) {
        let isValid = true;
        var name = document.querySelector('#name');
        var email = document.querySelector('#email');
        var phone = document.querySelector('#phone');
        var Psychiatrist = document.querySelector('#Psychiatrist');
        var date = document.querySelector('#date');

        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            clearError(name);
        }

        var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(email);
        }

        if (phone.value.trim() === '' || phone.value.length < 10) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError(phone);
        }

        if (Psychiatrist.value === '') {
            showError(Psychiatrist, 'Please choose a Psychiatrist');
            isValid = false;
        } else {
            clearError(Psychiatrist);
        }

        if (date.value === '') {
            showError(date, 'Please choose an appointment date');
            isValid = false;
        } else {
            clearError(date);
        }

        if (!isValid) {
            e.preventDefault(); 
        }
    });

    function showError(input, message) {
        var errorElement = document.createElement('small');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;
        input.parentElement.appendChild(errorElement);
        input.classList.add('input-error');
    }

    function clearError(input) {
        var errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('input-error');
    }

    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('nav ul li a');
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            var sectionTop = section.offsetTop - 60;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    var appointmentConfirmation = document.querySelector('#appointment-form');
    if (appointmentConfirmation) {
        appointmentConfirmation.addEventListener('submit', function () {
            setTimeout(function () {
                alert('Your appointment has been successfully scheduled!');
            }, 500);
        });
    }

    var PsychiatristItems = document.querySelectorAll('#Psychiatrist-categories ul li a');
    PsychiatristItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const PsychiatristName = this.previousElementSibling.previousElementSibling.textContent;
            const PsychiatristSpecialty = this.previousElementSibling.textContent;
            openPsychiatristModal(PsychiatristName, PsychiatristSpecialty);
        });
    });

   

    setTimeout(function () {
        var userResponse = prompt('Would you like to receive special offers and news updates? (Yes/No)');
        if (userResponse && userResponse.toLowerCase() === 'yes') {
            alert('Thank you! You will receive updates soon.');
        } else {
            alert('No worries, you can sign up later!');
        }
    }, 5000); 

});

function toggleConfirmationMessage() {
    var confirmationMessage = document.createElement('div');
    confirmationMessage.id = 'confirmation-message';
    confirmationMessage.textContent = 'Your appointment is confirmed!';
    confirmationMessage.style.position = 'fixed';
    confirmationMessage.style.bottom = '20px';
    confirmationMessage.style.right = '20px';
    confirmationMessage.style.background = '#28a745';
    confirmationMessage.style.color = '#fff';
    confirmationMessage.style.padding = '10px 20px';
    confirmationMessage.style.borderRadius = '5px';
    confirmationMessage.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.1)';
    confirmationMessage.style.transition = 'opacity 1s ease-out';
    document.body.appendChild(confirmationMessage);

    setTimeout(function () {
        confirmationMessage.style.opacity = '0';
    }, 4000);  
}
