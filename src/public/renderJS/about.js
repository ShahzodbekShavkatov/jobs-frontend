let allJobs = []
let adverts = []

!(async () => {
    allJobs = await req('/jobs', 'GET')
    adverts = await req('/adverts', 'GET')
    render(allJobs, adverts)
})()

function render(jobs, adverts) {
    let id = window.localStorage.getItem('jobId')
    let findJob = jobs.find(job => job.jobId == id)
    let findAdvert = adverts.find(advert => advert.jobId == id)
    job_name.textContent = findJob.jobName
    job_img.src = backendApi + '/files/' + findJob.imgUrl
    job_about.textContent = findJob.about
    job_good.textContent = findJob.goodSides
    job_bad.textContent = findJob.badSides
    if(!findAdvert) advert.textContent = "O'rganish mumkin bo'lgan joy haqida ma'lumot mavjud emas!"
    advert.textContent = findAdvert.info
}