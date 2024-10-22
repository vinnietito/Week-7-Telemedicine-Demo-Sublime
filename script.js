document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('frm-register');
    const loginForm = document.getElementById('frm-login');

    // Register form handler[Signup Form]
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value; 
            const email = document.getElementById('email').value; 
            const password = document.getElementById('password').value; 

            // Send the request to the server
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            alert(data.message);
        });
    }

    // Login form handler[Login FORM]
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Retrieve the elements
            const loginEmailElement = document.getElementById('login-email');
            const loginPasswordElement = document.getElementById('login-password');

            console.log('Login Email Element:', loginEmailElement);
            console.log('Login Password Element:', loginPasswordElement);

            if (loginEmailElement && loginPasswordElement) {
                const loginEmail = loginEmailElement.value; 
                const loginPassword = loginPasswordElement.value; 

                console.log('Login Email:', loginEmail); 
                console.log('Login Password:', loginPassword); 

                // Send the request to the server
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: loginEmail, password: loginPassword })
                });

                const data = await response.json();

                if (data.success) {
                    alert(`Welcome ${data.name} of email address: ${data.email}`);
                    // Optionally redirect or perform other actions on successful login
                } else {
                    alert(data.message); 
                }
            } else {
                console.error('One or both login elements are missing from the DOM');
            }
        });
    }
});
