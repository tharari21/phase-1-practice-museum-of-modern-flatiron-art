const exhibitTitle = document.querySelector('#exhibit-title')
const ticketsButton = document.querySelector('#buy-tickets-button')
const ticketsBoughtText = document.querySelector('#tickets-bought')
const exhibitDescription = document.querySelector('#exhibit-description')
const commentsSection = document.querySelector('#comments-section')
const commentForm = document.querySelector('#comment-form')
const exhibitImage = document.querySelector('#exhibit-image')

let ticketsBought = 0

fetch('http://localhost:3000/current-exhibits')
.then(res => res.json())
.then(exhibits => displayExhibit(exhibits[0]))

function displayExhibit(exhibit) {
  console.log(exhibit)
  exhibitTitle.textContent = exhibit.title
  exhibitDescription.textContent = exhibit.description
  ticketsBoughtText.textContent = `${exhibit.tickets_bought} tickets bought`
  exhibitImage.src = exhibit.image
  displayComments(exhibit.comments)
  ticketsBought = exhibit.tickets_bought
}

function displayComments(comments) {
  comments.forEach( comment => addComment(comment) )
}

function addComment(comment) {
  const p = document.createElement('p')
  p.textContent = comment
  commentsSection.append(p)
}

function incrementTicketsBought() {
  ticketsBought += 1
  ticketsBoughtText.textContent = `${ticketsBought} tickets bought`
}

ticketsButton.addEventListener('click', incrementTicketsBought)

function handleSubmitNewComment(event) {
  event.preventDefault()
  const newComment = event.target[0].value
  addComment(newComment)
  event.target.reset()
}

commentForm.addEventListener('submit', handleSubmitNewComment)
