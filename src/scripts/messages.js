import comp from "./components"
import API from "./apiData"

const currentUser = 3;

const buildMessages = {
  printMessages(messageObj) {
    if (currentUser === messageObj.user.id) {
      const message = new comp.section({
          className: "message",
          id: `${messageObj.id}`
        },
        new comp.title("h2", {}, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`),
        new comp.title("h1", {}, messageObj.messageContent),
        new comp.btn("Edit")).render(".container--inner")
    } else {
      const message = new comp.section({
          className: "message",
          id: `${messageObj.id}`
        },
        new comp.title("h2", {}, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`),
        new comp.title("h1", {}, messageObj.messageContent)).render(".container--inner")
    }
  },

  messageMap() {
    document.querySelector(".container--inner").innerHTML = ""
    API.getAllCategory("messages/?_expand=user")
      .then(messageObj => {

        messageObj.forEach(message => {
          this.printMessages(message)
        })
        this.newMessage();
        this.submitMessage();
        this.editButtonClick();

      })
  },
  // builds new message entry field
  newMessage() {
    //wrapped this in a div instead of a section, to grab sections easier.
    const newMessageField = new comp.div({
        className: "new--message",
        id: "newMessage"
      },
      new comp.title("h1", {}, "New Message"),
      new comp.textarea({
        placeholder: "type your message here",
        wrap: "hard"
      }),
      new comp.btn("Submit")).render(".container--inner")
  },

  submitMessage() {
    $("#newMessage > button").click(function (e) {
      //if statment to prevent blank entries
      if ($("#newMessage > textarea").val() === "") {
        alert("Please enter your message")
      } else {
        e.preventDefault()
        //creates object of current moment
        let dateAndTime = new Date();
        //converts it into a string and then an array to grab specific values
        let dateArray = dateAndTime.toString().split(" ");
        //getMonth() method returns a number between 0-11. Added 1 to get current month
        let month = dateAndTime.getMonth() + 1;
        //builds object to pass into fetch
        let submitMessageObj = {
          messageContent: $("#newMessage > textarea").val(),
          timeStamp: dateArray[4], //TODO: make it non military time
          date: `${month}/${dateArray[2]}/${dateArray[3]}`,
          userId: currentUser
        }
        // send to API
        API.saveItem("messages", submitMessageObj)
          .then(() => buildMessages.messageMap())
      }
    })
  },

  editButtonClick() {
    // grabs the edit buttons
    $("section > button").click(function (e) {
      // stores the message in a varable
      let messageH1 = e.target.previousSibling
      // store message's text in a varable
      let messageText = messageH1.innerHTML;
      // replaces Edit button with Save button
      $(e.target).replaceWith("<button class= 'btn' type ='button'>Save</button>")
      // replaces message text with an input field
      $(messageH1).replaceWith(`<input type="text" id = "editField" value="${messageText}">`)
      // stores the new input field in a varable
      const newInputField = $("#editField");
      // sets a click event on the new save button
      newInputField.next().click(function (e) {
        // stores input value in an object upon save click
        const editedMessageTextObj = {
          messageContent: newInputField.val(),
        }
        // save message id #
        const editedMessageId = newInputField.parent().attr("id")
        // Patch message in server and refresh the messages on the page
        API.updateItem("messages", editedMessageId, editedMessageTextObj)
          .then(() => buildMessages.messageMap())
      })
    })
  }
}

export default buildMessages