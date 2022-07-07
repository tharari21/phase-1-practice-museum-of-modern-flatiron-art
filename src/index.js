const exhibitTitle = document.querySelector("#exhibit-title");
const exhibitDescription = document.querySelector("#exhibit-description");
const exhibitImage = document.querySelector("#exhibit-image");
const exhibitTicketsBought = document.querySelector("#tickets-bought");
const exhibitCommentSection = document.querySelector("#comments-section");
const commentForm = document.querySelector("#comment-form");
const buyTicketsBtn = document.querySelector("#buy-tickets-button");
const ticketsBought = document.querySelector("#tickets-bought");
let curExhibit;

/**
 * Renders the title passed in as argument on the page
 * @param  {String} title [the title of the exhibit]
 */
const renderExhibitTitle = (title) => {
  exhibitTitle.textContent = title;
};

/**
 * Renders the description passed in as argument on the page
 * @param  {String} description [the description of the exhibit]
 */
const renderExhibitDescription = (description) => {
  exhibitDescription.textContent = description;
};
// const renderExhibitArtist = (artist) => {
//   exhibitArtist.textContent = artist;
// };

/**
 * Renders each comment in the comments array passed in as argument on the page
 * @param  {Array} comments [the comments of the exhibit]
 */
const renderExhibitComments = (comments) => {
  exhibitCommentSection.innerHTML = "";
  comments.forEach((comment) => {
    const pComment = document.createElement("p");
    pComment.textContent = comment;
    exhibitCommentSection.append(pComment);
  });
};
/**
 * Renders the number of tickets bought,  passed in as argument, onto the page
 * @param  {Array} ticketsBought [the number of tickets bought of the exhibit]
 */
const renderExhibitTicketsBought = (ticketsBought) => {
  exhibitTicketsBought.textContent = `${ticketsBought} Tickets Bought`;
};

const renderExhibitImage = (src) => {
  exhibitImage.src = "";
  exhibitImage.src = src;
};

/**
 * Renders the current exhibit onto the page
 */
const renderExhibit = async () => {
  if (!curExhibit) {
    curExhibit = await fetchResource(
      "http://localhost:3000/current-exhibits/1"
    );
  }
  renderExhibitTitle(curExhibit.title);
  renderExhibitDescription(curExhibit.description);
  renderExhibitImage(curExhibit.image);
  renderExhibitComments(curExhibit.comments);
  renderExhibitTicketsBought(curExhibit["tickets_bought"]);
  //   setExhibit(curExhibit.artist)
};

const addComment = async (e) => {
  e.preventDefault();
  const input = e.target["comment-input"];
  // Rather than doing a get request to get current list of comments we simply
  // store the curExhibit and we can add new comments to it when needed
  curExhibit.comments.push(input.value);
  const patchUpdate = { comments: curExhibit.comments };
  const res = await updateResource(
    `http://localhost:3000/current-exhibits/${curExhibit.id}`,
    patchUpdate
  );
  curExhibit = res;
  renderExhibitComments(curExhibit.comments);
  input.value = "";
};
const addTicketsBought = () => {};

const fetchResource = async (url) => {
  const req = await fetch(url);
  const res = await req.json();
  return res;
};
const updateResource = async (url, body) => {
  const req = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const res = await req.json();
  return res;
};

const incrementTicketsBought = async () => {
  const res = await updateResource(
    `http://localhost:3000/current-exhibits/${curExhibit.id}`,
    { tickets_bought: curExhibit["tickets_bought"] + 1 }
  );
  curExhibit = res;
  renderExhibitTicketsBought(curExhibit["tickets_bought"]);
};

renderExhibit();

commentForm.addEventListener("submit", addComment);
buyTicketsBtn.addEventListener("click", incrementTicketsBought);
