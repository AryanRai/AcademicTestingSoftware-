
var fullscreenval = false;

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
  newNode.setAttribute("style", "background-color: var(--bg-color-highlight)");

  //Make it "Clickable"
  newNode.onclick = function () {

    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        
        // Get cursor position
    const posX = event.clientX - 110;
    const posY = event.clientY + 20 + scrollTop;
      
      
        
        // Append HTML to the body, create the "Tweet Selection" dialog
    document.body.insertAdjacentHTML('beforeend', '<div id="share-snippet" style="position: absolute; top: '+posY+'px; left: '+posX+'px;"><div class="speech-bubble-del"><div class="share-inside"><i class="fa fa-trash fa-2x" ><a id="delbutton" href="javascript:void(0);">Remove</a></i></div></div></div>');
    
    document.getElementById("delbutton").onclick = function () {
      deletenode(newNode);
      document.getElementById("share-snippet").remove();
    }
    //if (confirm("do you want to delete it?")) {
      //deletenode(newNode);
    //} else {
      //alert(range);
    //}
  };

  //Add Text for replacement (for multiple nodes only)
  //newNode.innerHTML += range;
  newNode.appendChild(range.cloneContents());

  //Apply Node around selection (used for individual nodes only)
  //range.surroundContents(newNode);
  document.getElementById("share-snippet").remove();
  return newNode;

}

function deletenode(node) {
  var contents = document.createTextNode(node.innerText);
  node.parentNode.replaceChild(contents, node);
}
mode.addEventListener("click", (e) =>
  document.body.classList.toggle("dark-mode")
);

const article = document.getElementById("maintxt");

// We could also add the  'touchend' event for touch devices, but since 
// most iOS/Android browsers already show a dialog when you select 
// text (often with a Share option) we'll skip that
article.addEventListener('mouseup', handlerFunction, false);

// Mouse up event handler function
function handlerFunction(event) {
    
    // If there is already a share dialog, remove it
    if (document.contains(document.getElementById("share-snippet"))) {
        document.getElementById("share-snippet").remove();
    }
    
    // Check if any text was selected
    if(window.getSelection().toString().length > 0) {

        // Get selected text and encode it
        const selection = encodeURIComponent(window.getSelection().toString()).replace(/[!'()*]/g, escape);
        
        // Find out how much (if any) user has scrolled
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        
        // Get cursor position
        const posX = event.clientX - 110;
        const posY = event.clientY + 20 + scrollTop;
      
      
        
        // Append HTML to the body, create the "Tweet Selection" dialog
        document.body.insertAdjacentHTML('beforeend', '<div id="share-snippet" style="position: absolute; top: '+posY+'px; left: '+posX+'px;"><div class="speech-bubble"><div class="share-inside"><i class="fa fa-highlighter fa-2x" ><a href="javascript:void(0);" onclick="highlightSelection(), window.getSelection()?.removeAllRanges();">Highlight</a></i></div></div></div>');
    }
}

window.addEventListener('resize', (evt) => { 
    if (window.innerHeight == screen.height) {
        console.log('FULL SCREEN');
        fullscreenval = true;
        document.getElementById("txt").classList.remove("blurredElement");
        document.getElementById("questions").classList.remove("blurredElement");
        document.getElementById("footer").style.display = "none";
        document.getElementById("fullscreenbtn").checked = true;
        document.getElementById("fullscreenbtnfooter").checked = true;
        document.getElementById("maintxt").style.userSelect = "text";
        
        

    } else {
        console.log('NORMAL SCREEN');
        fullscreenval = false;
        document.getElementById("txt").classList.add("blurredElement");
        document.getElementById("questions").classList.add("blurredElement");
        document.getElementById("footer").style.display = "inline";
        document.getElementById("fullscreenbtn").checked = false;
        document.getElementById("fullscreenbtnfooter").checked = false;
        document.getElementById("maintxt").style.userSelect = "none";
    }
});

function requestFullScreen(element) {
    // Supports most browsers and their versions.

    if (fullscreenval == false){

    document.body.dispatchEvent(new KeyboardEvent('keydown',{'key':'escape'}));
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }

    }

    if (fullscreenval == true) {
    
    var requestMethod = document.exitFullscreen;
    if (requestMethod) { // Native full screen.
        requestMethod.call(document);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }

    }
    
}


var keydown = null;

$(window).keydown(function(e) {
    if ( ( e.keyCode == 70 && ( e.ctrlKey || e.metaKey ) ) ||
         ( e.keyCode == 191 ) ) {
        keydown = new Date().getTime();
    }

    return true;
}).blur(function() {
    if ( keydown !== null ) {
        var delta = new Date().getTime() - keydown;
        if ( delta >= 0 && delta < 1000 )
            console.log('finding');
            var requestMethod = document.exitFullscreen;
        if (requestMethod) { // Native full screen.
            requestMethod.call(document);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
        
        document.getElementById("txt").classList.add("blurredElement");
        document.getElementById("maintxt").style.userSelect = "none";
        document.getElementById("questions").classList.add("blurredElement");
        document.getElementById("footer").style.display = "inline";
        document.getElementById("fullscreenbtn").checked = false;
        document.getElementById("fullscreenbtnfooter").checked = false;  



        keydown = null;
    }
});


window.addEventListener("keydown",function (e) {
  if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
    e.preventDefault();
  }
})




