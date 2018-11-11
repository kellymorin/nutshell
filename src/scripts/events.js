import comp from "./components"
import API from "./apiData"

let currentUser = 2;


const buildEvents = {

  buildContainers() {
    document.querySelector(".container--inner").innerHTML = ""
    const newBtn = new comp.div({
        id: "newEventBtn"
      },
      new comp.btn("+")).render(".container--inner")


    const title1 = new comp.title("h1", {
      className: "title--upcoming"
    }, "Upcoming Event").render(".container--inner")
    const incomplete = new comp.div({
      id: "upcoming"
    }).render(".container--inner")
    const title2 = new comp.title("h1", {
      className: "title--past"
    }, "Past Event").render(".container--inner")
    const complete = new comp.div({
      id: "past"
    }).render(".container--inner")
    // this.newTask()
    this.eventFetch();
    this.newEventButton();
  },

  printEvents(eventObj) {
    let outputContainer;

    // need to test if date is in the future or the past

    outputContainer = "#upcoming"
    const task = new comp.section({
        className: "event",
        id: `${eventObj.id}`
      },
      new comp.title("h3", `${eventObj.name}`),
      new comp.par(`${eventObj.date} ${eventObj.time}`),
      new comp.par(`${eventObj.location}`)).render(outputContainer)
  },

  eventFetch() {
    API.getAllCategory("events") //check if user is same as session storage
      .then(eventObj => {
        eventObj.forEach(event => {
          this.printEvents(event)
        })

      })
  },

  newEventButton() {
    // when clicked it clears the dom and calls the function to build the form
    $("#newEventBtn").click(
      function (e) {
        console.log("click,click")
        $(".container--inner").text("")
        buildEvents.newEventPopUp();

      }
    )
  },
  newEventPopUp() {
    // Builds new event entry form
    let div2 = new comp.div({
        classList: "newEventForm"
      },
      new comp.title("h1", {
        className: "title"
      }, "Add A New Event"),
      new comp.label("Event Name"),
      new comp.input({
        type: "text"
      }),
      new comp.label("Date"),
      new comp.input({
        type: "date"
      }),
      new comp.label("Time"),
      new comp.input({
        type: "text"
      }),
      new comp.label("Location"),
      new comp.input({
        type: "text"
      }),
      new comp.btn("Save"),
      new comp.btn("Back"))
    div2.render(".container--inner")
    buildEvents.newEventPopUpBtnClicks();
  },
  newEventPopUpBtnClicks() {
    // grabs the two buttons on the page and adds a click listener based on index
    const popUpBtns = document.querySelectorAll("button");
    popUpBtns[0].addEventListener("click", () => {
      const inputArray = document.querySelectorAll("input");
      console.log(inputArray);
      const newEventObj = {
        name: inputArray[0].value,
        date: inputArray[1].value,
        time: inputArray[2].value,
        location: inputArray[3].value,
        userId: currentUser
      }
      console.log(newEventObj);
      API.saveItem("events", newEventObj).then(() => {
      buildEvents.buildContainers();
     }) })

    // Back Button Returns to Event Page
    popUpBtns[1].addEventListener("click", () => {
      buildEvents.buildContainers();
    })

  }

}

export default buildEvents