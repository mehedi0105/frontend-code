window.onload = () => {
    const parent = document.getElementById("veiw-container")
    console.log(parent)
    // parent.innerHTML = ""
    const user_id = localStorage.getItem("user_id")
    const job_id = localStorage.getItem("job_id")
    const title = localStorage.getItem("job_title")
    console.log(title)
    fetch("https://freelancer-platform-api.onrender.com/freelancer/poposal/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(proposal => {
                if (proposal.job == job_id) {
                    // alert()
                    const div = document.createElement("div")
                    div.classList.add("card", "proposal-card",)
                    div.innerHTML = `
                            <div class="card-body">
                                
                                <h5 class="card-title">Freelancer id:  "${proposal.freelancer}"</h5>
                                <h6 class="card-subtitle mb-2 text-muted">job-title: "${title}"</h6>
                                <p class="card-text">message: "${proposal.proposal_post}"</p>
                                <p class="card-text">message-date: "${proposal.created_at}"</p>
                                ${proposal.is_accepted === false ? "<button onclick="ProposalAccept('${proposal.id}','${proposal.job}','${proposal.freelancer}','${proposal.proposal_post}')" class="btn btn-primary w-100">Hire Now</button>" : "
                                    <div class="d-flex gap-3">
                                        <button class="btn btn-warning">Completed work</button>
                                        <button class="btn btn-warning"><a href="./reveiw.html" onclick="saveImportantData('${proposal.freelancer}','${proposal.job}')" class="text-decoration-none">Review Now</a></button>
                                    </div>
                                "}
                            </div>
                        `
                    parent.appendChild(div)

                }
            });
            localStorage.removeItem("job_id")
            localStorage.removeItem("job_title")
        })
}


const ProposalAccept = (id, job, freelancer, proposal_post) => {

    const proposalData = {
        job: job,
        freelancer: freelancer,
        is_accepted: true,
        proposal_post: proposal_post,
    };

    fetch(`https://freelancer-platform-api.onrender.com/freelancer/update_proposal/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proposalData),
    })
        .then((rest) => rest.json())
        .then((data) => {
            // alert("Your Job Post Added Successfuly");
            // window.location.href = "index.html";
            console.log(data)
        })
        .catch((error) => {
            console.error(error);
        });
}

const saveImporatData = (freelancer, job) => {
    // alert()
    // console.log(freelancer, " ", job)
    localStorage.setItem("reveiw-freelancer", freelancer)
    localStorage.setItem("reveiw-job", job)
}


const FreelancerReveiw = (event) => {
    event.preventDefault();
    const form = document.getElementById('ratingForm')
    const form_data = new FormData(form);
    const reveiw_freelancer = localStorage.getItem("reveiw-freelancer")
    const reveiw_job = localStorage.getItem("reveiw-job")
    console.log(form_data.get("category"))
    const post_review = {
        rating: form_data.get("rating"),
        reveiw_text: form_data.get("review_text"),
        freelancer: reveiw_freelancer,
        project: reveiw_job,
    };
    fetch("https://freelancer-platform-api.onrender.com/buyer/reveiw/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post_review),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => {
            console.error(error);
        });
}

// const HiredHistory = () => {
//     const parent = document.getElementById("profile-container")
//     parent.innerHTML = ""
//     user_id = localStorage.getItem("user_id")
//     fetch("http://127.0.0.1:8000/buyer/reveiw/")
//         .then((res)=>res.json())
//         .then((data)=>{
//             data.forEach(reveiw => {

//             });
//         })
//         .catch((error)=>console.log(error))
// }

const MyJobes = () => {
    const parent = document.getElementById("profile-post-page")
    parent.innerHTML = ""
    user_id = localStorage.getItem("user_id")
    fetch("https://freelancer-platform-api.onrender.com/buyer/job_list/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(jobs => {
                if (jobs.comapany_name == user_id) {
                    const parent = document.getElementById("profile-post-page");
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
                }
            });
        })
        .catch((error) => console.log(error))
}

const details_page = (id) => {
    const parent = document.getElementById("profile-details-page")
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
