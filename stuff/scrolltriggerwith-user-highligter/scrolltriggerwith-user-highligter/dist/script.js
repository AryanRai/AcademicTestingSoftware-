// Function that gets called in order to highlight
function highlightSelection() {
  var userSelection = window.getSelection();

  //Attempting to highlight multiple selections (for multiple nodes only + Currently removes the formatting)
  for (var i = 0; i < userSelection.rangeCount; i++) {
    //Copy the selection onto a new element and highlight it
    var node = highlightRange(userSelection.getRangeAt(i) /*.toString()*/);
    // Make the range into a variable so we can replace it
    var range = userSelection.getRangeAt(i);
    //Delete the current selection
    range.deleteContents();
    //Insert the copy
    range.insertNode(node);
  }

  //highlights 1 selection (for individual nodes only + Need to uncomment on the bootom)
  //highlightRange(userSelection.getRangeAt(0));

  //Save the text to a string to be used if yoiu want to
  /*var string1 = (userSelection.getRangeAt(0));
				alert(string1);*/
}

//Function that highlights a selection and makes it clickable
function highlightRange(range) {
  //Create the new Node
  var newNode = document.createElement("span");

  // Make it highlight
  newNode.setAttribute("style", "background-color: yellow;");

  //Make it "Clickable"
  newNode.onclick = function () {
    if (confirm("do you want to delete it?")) {
      deletenode(newNode);
    } else {
      alert(range);
    }
  };

  //Add Text for replacement (for multiple nodes only)
  //newNode.innerHTML += range;
  newNode.appendChild(range.cloneContents());

  //Apply Node around selection (used for individual nodes only)
  //range.surroundContents(newNode);

  return newNode;
}

function deletenode(node) {
  var contents = document.createTextNode(node.innerText);
  node.parentNode.replaceChild(contents, node);
}
mode.addEventListener("click", (e) =>
  document.body.classList.toggle("dark-mode")
);


      var pageX, pageY;
      document.addEventListener("mouseup", () => {

  
        let selection = document.getSelection();
        let selectedText = selection.toString();
        var menu = document.querySelector(".menu");
        if (selectedText !== "") {
          let rect = document.querySelector(".text").getBoundingClientRect();
          menu.style.display = "block";

          menu.style.left = pageX - Math.round(rect.left) + "px";
          //menu.style.top = pageY - Math.round(rect.top) - 58 + "px";
          menu.style.top = 58 + "vh";
  
          document.getElementById("output").innerHTML = selectedText;
  
          var popup = document.getElementById("mypopup");
         
          var span = document.getElementsByClassName("close-btn")[0];
  
          span.addEventListener("click", () => {
            popup.style.display = "none";
          });
  
          window.addEventListener("click", (event) => {
            if (event.target == popup) {
              popup.style.display = "none";
            }
          });
        } else {
          menu.style.display = "none";
        }
      });
      document.addEventListener("mousedown", (e) => {
        pageX = e.pageX;
        pageY = e.pageY;
      });
