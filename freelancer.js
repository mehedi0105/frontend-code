const JobHistory = () => {
    const parent = document.getElementById("show-page")
    const user_id = localStorage.getItem("user_id")
    // console.log(user_id)
    parent.innerHTML = ""
    fetch("https://freelancer-platform-api.onrender.com/freelancer/poposal/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(proposal => {
                if (user_id == proposal.freelancer) {
                    console.log('true')

                    const div = document.createElement("div")
                    div.classList.add("card", "profie-card")
                    div.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">Job id: ${proposal.job}</h5>
                            <p class="card-subtitle mb-2 text-muted">job desc: "${proposal.proposal_post}"</p>
                            ${proposal.is_accepted === true ? `job status: Completed` : `job status: Panding`}

                        </div>
                    `
                    parent.appendChild(div)
                }
            });
        })
}

const ClientHistory = () => {
    const parent = document.getElementById("show-page")
    const user_id = localStorage.getItem("user_id")
    // console.log(user_id)
    parent.innerHTML = ""
    fetch("https://freelancer-platform-api.onrender.com/buyer/reveiw/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach(reveiw => {
                if (user_id == reveiw.freelancer) {
                    console.log('true')

                    const div = document.createElement("div")
                    div.classList.add("card", "profie-card")
                    div.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">Job id: ${reveiw.rating}</h5>
                            <h5 class="card-title">Job id: ${reveiw.project}</h5>
                            <p class="card-subtitle mb-2 text-muted">job desc: "${reveiw.reveiw_text}"</p>

                        </div>
                    `
                    parent.appendChild(div)
                }
            });
        })
}


JobHistory()