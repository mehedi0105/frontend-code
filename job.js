const postjob = (event) => {
    event.preventDefault();
    const form = document.getElementById('jobs-form')
    const form_data = new FormData(form);
    // console.log(form_data)
    const user_name = localStorage.getItem("user_name")
    // fetch(`http://127.0.0.1:8000/accounts/user_type/${user_name}/`)
    //     .then((res) => res.json())
    //     .then((user) =>
    //         // localStorage.setItem('user_type', user.user_type),
    //         localStorage.setItem('user_id', user.user_id)
    //     );
    console.log(form_data.get("category"))
    const company_name = localStorage.getItem("user_id")
    const Post_Job = {
        comapany_name: company_name,
        title: form_data.get("title"),
        job_type: form_data.get("job_type"),
        job_category: [form_data.get("category")],
        salary: parseFloat(form_data.get("salary")),
        description: form_data.get("description"),
    };
    // console.log(Post_Job)
    fetch("http://freelancer-platform-api.onrender.com/buyer/job_list/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Post_Job),
    })
        .then((rest) => rest.json())
        .then((data) => {
            alert("Your Job Post Added Successfuly");
            window.location.href = "index.html";
            console.log(data)
        })
        .catch((error) => {
            console.error(error);
        });
}


const postlistview = () => {
    fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/")
        .then((res) => res.json())
        .then((data) => {

            data.forEach(jobs => {
                const parent = document.getElementById("post-page");
                const div = document.createElement("div");
                div.classList.add("card");
                div.classList.add("job-card", "mb-3");
                div.innerHTML = `
                <div class="card-body post-card" onclick="details_page('${jobs.id}')">
                    <h4 class="card-title">${jobs.title}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">Company id: ${jobs.comapany_name}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Job-Type: ${jobs.job_type}</h6>
                    <p class="card-text" style="text-align:justify">
                        ${jobs.description.slice(0, 250)}.......(click  & view details this job)
                    </p>
                    <h6><small>Salary: ${jobs.salary}$</small></h6>
                </div>
                `
                parent.appendChild(div)
            });


        })
        .catch((error) => {
            console.error(error);
        });
}



const caregoryView = () => {
    fetch("https://freelancer-platform-api.onrender.com/buyer/category/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(category => {
                const parent = document.getElementById("category-container");
                const div = document.createElement("div");

                div.innerHTML = `
                <button class="btn category-btn" onclick="categorySlugView('${category.slug}')">${category.name}</button>
                `
                parent.appendChild(div);
            })
        })
}

const categorySlugView = (slug) => {
    fetch(`https://freelancer-platform-api.onrender.com/buyer/category/serch/${slug}/`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // const parent = document.getElementById("post-page");
            if (data.length > 0) {
                data.forEach(jobs => {
                    const parent = document.getElementById("post-page");
                    parent.innerHTML = "";
                    const div = document.createElement("div");
                    div.classList.add("card");
                    div.classList.add("job-card", "mb-3");
                    div.innerHTML = `
                <div class="card-body post-card mb-3" onclick="details_page('${jobs.id}')">
                    <h4 class="card-title">${jobs.title}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">Company id: ${jobs.comapany_name}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Job-Type: ${jobs.job_type}</h6>
                    <p class="card-text" style="text-align:justify">
                        ${jobs.description.slice(0, 250)}.......
                    </p>
                    <h6><small>Salary: ${jobs.salary}$</small></h6>
                </div>
                `
                    parent.appendChild(div)
                });
            } else {
                const parent = document.getElementById("jobs-container");
                parent.innerHTML = "";
                // const parent1 = document.getElementById("jobs-container");
                const div = document.createElement("div");
                div.classList.add("m-auto");
                div.innerHTML = `
                    <h1>Job Not Found</h1>
                `
                parent.appendChild(div);
            }
        }
        )
        .catch(error => console.error('Error:', error));
}


const details_page = (id) => {
    const parent = document.getElementById("details-page")
    const token = localStorage.getItem("auth_token")
    const user_type = localStorage.getItem("user_type")
    // console.log(parent)
    parent.innerHTML = ""
    fetch(`https://freelancer-platform-api.onrender.com/buyer/job_details/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            if (token) {
                if (user_type === "Freelancer") {
                    const div = document.createElement("div")
                    div.innerHTML = `
                        <div class="card-body p-2">
                            <div class="details-top">
                                <h4 class="card-title">${data.title}</h4>
                                <h6 class="card-subtitle mb-2 text-muted">Company id: ${data.comapany_name}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">Job-Type: ${data.job_type}</h6>
                                <a onclick="gettitle('${data.id}')" class="btn btn-primary rounded">Apply Now</a>
                            </div>
                            <div class="details-bottom">
                                <p class="card-text" style="text-align:justify">
                                ${data.description}
                                </p>
                                <h6><small>Salary: ${data.salary}$</small></h6>
                            </div>
                        </div>
                    `
                    parent.appendChild(div)
                } else {
                    const div = document.createElement("div")
                    div.innerHTML = `
                        <div class="card-body p-2">
                            <div class="details-top">
                                <h4 class="card-title">${data.title}</h4>
                                <h6 class="card-subtitle mb-2 text-muted">Company id: ${data.comapany_name}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">Job-Type: ${data.job_type}</h6>
                                <a onclick="clientsJobLoad('${data.id}','${data.comapany_name}','${data.title}')"  class="btn btn-primary rounded">See Proposal List</a>
                            </div>
                            <div class="details-bottom">
                                <p class="card-text" style="text-align:justify">
                                ${data.description}
                                </p>
                                <h6><small>Salary: ${data.salary}$</small></h6>
                            </div>
                        </div>
                    `
                    parent.appendChild(div)
                }
            } else {
                const div = document.createElement("div")
                div.innerHTML = `
                        <div class="card-body p-2">
                            <div class="details-top">
                                <h4 class="card-title">${data.title}</h4>
                                <h6 class="card-subtitle mb-2 text-muted">Company id: ${data.comapany_name}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">Job-Type: ${data.job_type}</h6>
                                <a href="./login.html" class="btn btn-primary rounded">Apply Now</a>
                            </div>
                            <div class="details-bottom">
                                <p class="card-text" style="text-align:justify">
                                ${data.description}
                                </p>
                                <h6><small>Salary: ${data.salary}$</small></h6>
                            </div>
                        </div>
                    `
                parent.appendChild(div)
            }
        })
}

const clientsJobLoad = (id, owner, title) => {
    company = localStorage.getItem("user_id")
    if (company === owner) {
        localStorage.setItem('job_id', id)
        localStorage.setItem('job_title', title)
        window.location.href = "veiw.html"
    }
    else {
        alert("only job post owner permited view proposal")
    }


}

caregoryView()
postlistview()

details_page(1)
