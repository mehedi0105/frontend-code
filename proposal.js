const handleProposal = (event) => {
    event.preventDefault();
    const form = document.getElementById("proposal-form")
    const form_data = new FormData(form)
    // console.log(form_data)
    freelancer_name = localStorage.getItem("user_id")
    job_title = localStorage.getItem("title")

    const proposalData = {
        job: job_title,
        freelancer: freelancer_name,
        is_accepted: false,
        proposal_post: form_data.get("proposal-description"),
    };
    console.log(proposalData)
    fetch("https://freelancer-platform-api.onrender.com/freelancer/poposal/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proposalData),
    }
    )
        .then((res) => res.json())
        .then((data) => {
            alert("Your Proposal Submited Successfuly");
            localStorage.removeItem("title")
            window.location.href = "./index.html"
        })
        .catch((error) => {
            console.error(error);
        });

}

const gettitle = (title) => {
    console.log(title)
    localStorage.setItem('title', title)
    window.location.href = "proposal.html";
}