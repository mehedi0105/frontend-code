const handleRegistration = (event) => {
    event.preventDefault();
    const form = document.getElementById("register-form");
    const formData = new FormData(form);

    const registrationFormData = {
        username: formData.get('username'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        user_type: formData.get('exampleFormControlSelect1'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
    };
    // localStorage.setItem('user_type', registrationFormData.user_type)
    fetch("https://freelancer-platform-api.onrender.com/accounts/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationFormData),
    })
        .then((res) => res.json())
        .then((data) => {
            alert("Registration Complete. Please check your email.");
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error(error);
        });
}

const handleLogin = (event) => {
    event.preventDefault();
    const form = document.getElementById("login-form");
    const formData = new FormData(form);
    username = formData.get('UserName');
    localStorage.setItem('user_name', username)
    // console.log(username)
    // console.log(username.user_type)
    const loginFormData = {
        username: formData.get('UserName'),
        email: formData.get('email'),
        password: formData.get('password'),
    };
    // console.log()
    fetch("https://freelancer-platform-api.onrender.com/user/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
    })
        .then((res) => res.json())
        .then((data) => {

            fetch(`https://freelancer-platform-api.onrender.com/accounts/user_type/${username}/`)
                .then((res) => res.json())
                .then((user) => {
                    alert()
                    localStorage.setItem('user_type', user.user_type)
                    
                    localStorage.setItem('user_id', user.user_id)
                }
                );

            console.log(data);
            localStorage.setItem('auth_token', data.key);
            if (data.key) {
                window.location.href = './index.html';
            }
        })
        .catch((error) => console.error(error));
}


const handlelogout = () => {
    const token = localStorage.getItem('auth_token');
    // const user_type = localStorage.getItem('user_type');
    fetch("https://freelancer-platform-api.onrender.com/user/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    })
        .then((res) => {
            if (res.ok) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("user_type");
                localStorage.removeItem("user_name");
                localStorage.removeItem("user_id");
                window.location.href = "./index.html";
            }
        })
        .catch((error) => console.error(error));
}
