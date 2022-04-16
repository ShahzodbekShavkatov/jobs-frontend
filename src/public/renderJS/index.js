let jobUl = document.querySelector('#jobUl')

let allJobs = []
let allComments = []

!(async () => {
    allJobs = await req('/jobs', 'GET')
    allComments = await req('/comments', 'GET')
    render(allJobs, allComments)
})()


function render(jobs, comments) {
    
    jobs.forEach(job => {

        let liJob = document.createElement('li')
        liJob.setAttribute('class', 'cards__item')

        let img = document.createElement('img')
        img.setAttribute('class', 'cards-item__img')

        let divContent = document.createElement('div')
        divContent.setAttribute('class', 'cards-item__content-box')

        let p = document.createElement('p')
        p.setAttribute('class', 'cards-item__title')

        let divComment = document.createElement('div')
        divComment.setAttribute('class', 'cards-item__comment-box')

        let ulComment = document.createElement('ul')
        ulComment.setAttribute('class', 'comment__list list-unstyled')

        img.src = backendApi + '/files/' + job.imgUrl
        p.textContent = job.jobName

        let divInput = document.createElement('div')
        divInput.setAttribute('class', 'comment__box')
        divInput.innerHTML = `
            <form class="comment__form"><input placeholder="type here" class="comment__input" type="text"><button class="comment__send">send</button></form>
        `

        let button = document.createElement('button')
        button.setAttribute('class', 'comment__btn-more')
        button.textContent = 'more'

        comments.forEach(comment => {
            if(job.jobId == comment.jobId) {
                let liComment = document.createElement('li')
                liComment.setAttribute('class', 'comment__item')

                let pComment = document.createElement('p')
                pComment.setAttribute('class', 'comment__text')

                pComment.textContent = comment.info
                liComment.append(pComment)
                ulComment.append(liComment)
            }

        })

        divComment.append(ulComment)
        divComment.append(divInput)
        divComment.append(button)
        divContent.append(p)
        divContent.append(divComment)
        liJob.append(img)
        liJob.append(divContent)
        jobUl.append(liJob)

        document.querySelector('.comment__btn-more').addEventListener('click', evt => {
            document.querySelector('.cards-item__comment-box').classList.toggle('cards-item__comment--active')
          
            if (document.querySelector('.cards-item__comment-box').classList.contains('cards-item__comment--active')) {
              document.querySelector('.comment__btn-more').textContent = 'back'
              document.querySelector('.cards-item__title').style.display = 'none'
            }
            if (!document.querySelector('.cards-item__comment-box').classList.contains('cards-item__comment--active')) {
              document.querySelector('.comment__btn-more').textContent = 'more...'
              document.querySelector('.cards-item__title').style.display = 'block'
            }
        })        

        p.addEventListener('click', () => {
            window.localStorage.setItem('jobId', job.jobId)
            window.location = '/about'
        })

        img.addEventListener('click', () => {
            window.localStorage.setItem('jobId', job.jobId)
            window.location = '/about'
        })

    })

}




