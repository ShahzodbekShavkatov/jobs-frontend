let data = []
!(async () => {
    data = await req('/jobs', 'GET')
    
})()


confirmBtn.addEventListener('click', async event => {
    event.preventDefault()

    let findPostJob;
    data.forEach(dat => {
        if(dat.jobName == job_name.value) {
            findPostJob = dat
        }
    })

    if(!findPostJob) {

        let formdata = new FormData()

        if(!job_name.value.length) return errorP.textContent = 'Kasb nomini kiritmadingiz!'
        if(!job_about.value.length) return errorP.textContent = 'Kasb haqida kiritmadingiz!'
        if(!job_good.value.length) return errorP.textContent = 'Kasbning yaxshi tomonlarini kiritmadingiz!'
        if(!job_bad.value.length) return errorP.textContent = 'Kasbning yomon tomonlarini kiritmadingiz!'
        if(!file.files[0]) return errorP.textContent = 'Kasb uchun rasm kiritmadingiz!'
        if(!advert.value.length) return errorP.textContent = "Kasbni qayerda o'rganish mumkinligini kiritmadingiz!"
    
        formdata.append('jobname', job_name.value)
        formdata.append('about', job_about.value)
        formdata.append('goodSides', job_good.value)
        formdata.append('badSides', job_bad.value)
        formdata.append('img', file.files[0])
    
        let response = await request('/jobs', 'POST', formdata)
    
        if(await response.message == 'OK') {
            let data = await req('/jobs', 'GET')
            let find = data.find(job => job.jobName == job_name.value)
            let obj = {
                info: advert.value,
                jobId: find.jobId
            }
    
            let response = await req('/adverts', 'POST', obj)
            if(await response.message == 'OK') {
                job_name.value = null
                job_about.value = null
                job_good.value = null
                job_bad.value = null
                advert.value = null
            }
        }
    } else {

        let token = window.localStorage.getItem('token')
        let tokenObj = {
            token
        }
        let resToken = await req('/auth/check', 'POST', tokenObj)

        if (await resToken.command == 'user') {
            return alert("Sizga ma'lumotlarni o'zgartirish uchun ruxsat yo'q!")
        }

        if(!job_name.value.length) return errorP.textContent = 'Kasb nomini kiritmadingiz!'
        if(!job_about.value.length) return errorP.textContent = 'Kasb haqida kiritmadingiz!'
        if(!job_good.value.length) return errorP.textContent = 'Kasbning yaxshi tomonlarini kiritmadingiz!'
        if(!job_bad.value.length) return errorP.textContent = 'Kasbning yomon tomonlarini kiritmadingiz!'
    
        let obj = {
            jobname: job_name.value,
            about: job_about.value,
            goodSides: job_good.value,
            badSides: job_bad.value
        }
    
        let response = await request('/jobs', 'PUT', obj)
    
        if(await response.message == 'OK') {
            job_name.value = null
            job_about.value = null
            job_good.value = null
            job_bad.value = null
        }

    }


})

cancelBtn.addEventListener('click', event => {
    event.preventDefault()

    job_name.value = null
    job_about.value = null
    job_good.value = null
    job_bad.value = null
    advert.value = null
})


search.onkeyup = event => {
    let searchData = data.filter(dat => dat.jobName.toLowerCase().includes(search.value.toLowerCase()))
    datalist.innerHTML = null
    searchData.forEach(name => {
        let option = document.createElement('option')
        option.textContent = name.jobName
        datalist.append(option)
    })

    let findData = searchData.find(dat => dat.jobName.toLowerCase().includes(search.value.toLowerCase()))
    job_name.value = findData.jobName
    job_about.value = findData.about
    job_good.value = findData.goodSides
    job_bad.value = findData.badSides
}


deleteBtn.onclick = async event => {
    event.preventDefault()

    let token = window.localStorage.getItem('token')
    let tokenObj = {
        token
    }
    let resToken = await req('/auth/check', 'POST', tokenObj)

    if (await resToken.command == 'user') {
        return alert("Sizga ma'lumotlarni o'chirish uchun ruxsat berilmagan!")
    }

    let response = await req('/jobs', 'DELETE', {
        jobName: job_name.value
    })

    if(await response.message == 'OK!') {
        job_name.value = null
        job_about.value = null
        job_good.value = null
        job_bad.value = null
    }
}