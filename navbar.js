fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById("navbar").innerHTML = data;

        const navbar_nav = document.getElementById("navbar-nav")
        const nav_item = document.getElementById("nav-item")
        const token = localStorage.getItem("auth_token")
        const user_name = localStorage.getItem("user_name")
        const user_type = localStorage.getItem("user_type")

        if (token) {
            if (user_type === "Freelancer") {
                nav_item.innerHTML += `
                <a href="./index.html" class="nav-item nav-link">Find job</a>

                `

                navbar_nav.innerHTML += `

                <p class="m-auto">Welcome [${user_name}]</p>
                    <ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="./freelancer_profile.html">Profile</a></li>
                            <li><a class="dropdown-item" href="#">My PortFolio</a></li>
                            <li><a class="dropdown-item" href="#">My Jobs</a></li>
                            <li><a class="dropdown-item" href="#">My Reveiw</a></li>
                            <li>
                            <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item bg-red" href="#" onclick="handlelogout()">Logout</a></li>
                        </ul>
                    </li>
                    </ul>
                `
            }
            else {
                nav_item.innerHTML += `
                <a href="./post_job.html" class="nav-item nav-link">Post job</a>

                `

                navbar_nav.innerHTML += `

                <p class="m-auto">Welcome [${user_name}]</p>
                    <ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="./clients_profile.html">Profile</a></li>
                            <li><a class="dropdown-item" href="./post_job.html">Post Jobs</a></li>
                            <hr class="dropdown-divider">
                            </li>
                            <li class=""><a class="dropdown-item bg-danger" href="#" onclick="handlelogout()">Logout</a></li>
                        </ul>
                    </li>
                    </ul>
                `
            }

        } else {
            navbar_nav.innerHTML += `
            <a href="./login.html" class="nav-item nav-link Sign-Up fw-bold ">Sign in</a>
            <a href="./registration.html" class="nav-item nav-link">Employers / Post Job</a>
            
            `
        }
    })
// <a href="#" class="nav-item nav-link Sign-Up fw-bold cursor-pointer" onclick="handlelogout()">Logout</a>
// <a href="#" class="nav-item nav-link">Profile</a>