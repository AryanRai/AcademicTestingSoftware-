var m = 1;
var s = 1;
var fullscreenval = false;
var readingcomplete = false;
var writingcomplete = false;
var listeningcomplete = false;
var testcomplete = false;
var ansdict = {};
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

var article = document.getElementById("maintxt1");

// We could also add the  'touchend' event for touch devices, but since 
// most iOS/Android browsers already show a dialog when you select 
// text (often with a Share option) we'll skip that
// article.addEventListener('mouseup', handlerFunction, false);

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
        document.getElementById("txt1").classList.remove("blurredElement");
        document.getElementById("questions1").classList.remove("blurredElement");
        document.getElementById("txt2").classList.remove("blurredElement");
        document.getElementById("questions2").classList.remove("blurredElement");        
        document.getElementById("footer").style.display = "none";
        document.getElementById("fullscreenbtn").checked = true;
        document.getElementById("fullscreenbtnfooter").checked = true;
        document.getElementById("maintxt1").style.userSelect = "text";
        document.getElementById("maintxt2").style.userSelect = "text";
        

    } else {
        console.log('NORMAL SCREEN');
        fullscreenval = false;
        document.getElementById("txt1").classList.add("blurredElement");
        document.getElementById("questions1").classList.add("blurredElement");
        document.getElementById("txt2").classList.add("blurredElement");
        document.getElementById("questions2").classList.add("blurredElement");        
        document.getElementById("footer").style.display = "inline";
        document.getElementById("fullscreenbtn").checked = false;
        document.getElementById("fullscreenbtnfooter").checked = false;
        document.getElementById("maintxt1").style.userSelect = "none";
        document.getElementById("maintxt2").style.userSelect = "none";
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
        
        document.getElementById("txt1").classList.add("blurredElement");
        document.getElementById("maintxt1").style.userSelect = "none";
        document.getElementById("questions1").classList.add("blurredElement");
        document.getElementById("txt2").classList.add("blurredElement");
        document.getElementById("maintxt2").style.userSelect = "none";
        document.getElementById("questions2").classList.add("blurredElement");
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



const switchers = document.querySelectorAll('[data-switcher]');

for (let i = 0; i < switchers.length; i++) {
   const page_id = switchers[i].dataset.tab;
   switchers[i].addEventListener('click', function() {
      document.querySelector('.tab.is-active').classList.remove('is-active');
      switchers[i].parentNode.classList.add('is-active');
     
      switchPage(page_id);
    });
}

function switchPage(page_id) {

  //if (!((page_id == 3 || page_id == 4) && readingcomplete == false) {}
    
    if (document.contains(document.getElementById("share-snippet"))) {
        document.getElementById("share-snippet").remove();
    }
    
    const current_page = document.querySelector('.pages .page.is-active');
    current_page.classList.remove('is-active');
    console.log(`current page: ${current_page}`);

    const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
    next_page.classList.add('is-active');
    console.log(`next page: ${next_page}`);
    if (page_id == 1) {
      article = document.getElementById("maintxt1");  
      article.addEventListener('mouseup', handlerFunction, false);
      console.log("change id");  
    }

    if (page_id == 2) {
      article = document.getElementById("maintxt2");
      article.addEventListener('mouseup', handlerFunction, false);
      console.log("change id"); 
    }
}   


  function submitreading() {
        var ques = [document.getElementsByName('rques1'), document.getElementsByName('rques2'), document.getElementsByName('rques3'), document.getElementsByName('rques4'), document.getElementsByName('rques5'), document.getElementsByName('rques6'), document.getElementsByName('rques7'), document.getElementsByName('rques8'), document.getElementsByName('rques9'), document.getElementsByName('rques10')];
        var ans = [];
        for(j = 0; j < ques.length; j++) {
          
          for(i = 0; i < ques[j].length; i++) {
            if(ques[j][i].checked)
            
            ans[j] = ques[j][i].value;
          }
        }

        console.log(ans);
        readingcomplete = true;
        document.getElementById('navw1').classList.remove('hidden');
        //document.getElementById('navl1').classList.remove('hidden');
        document.getElementById('navr1').classList.add('hidden');
        document.getElementById('navr2').classList.add('hidden');
        switchPage(3);
        m = 00;
        s = 10;
        document.getElementById('autosubmittimerreading').innerHTML = m + ":" + s;
        ansdict["reading"] = ans;


    }

    function submitwriting(){
      document.getElementById('navresults').classList.remove('hidden');
      document.getElementById('navinstructions').classList.add('hidden');
      document.getElementById('navw1').classList.add('hidden');
      switchPage(4);
      var ans = [document.getElementById('wques1').value, document.getElementById('wques2').value];
      console.log(ans);
      ansdict["writing"] = ans;
      writingcomplete = true;
      testcomplete = true;
      submittest();
    }


document.getElementById('timer').innerHTML = 00 + ":" + 10;



function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  m = timeArray[0];
  s = checkSecond((timeArray[1] - 1));
  if (s == 0 && m == 0) {
    console.log("timerout");
    
    if (readingcomplete == true && writingcomplete == false) {
      console.log("submitwriting");
      submitwriting();
      console.log(ansdict);

    }

    if (readingcomplete == false && writingcomplete == false) {
      console.log("submitreading");
      submitreading();
      console.log(ansdict);

    }


  }
  if(s==59){m=m-1}
  if(m<0){
    return
  }
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;

  document.getElementById('autosubmittimerreading').innerHTML =
    m + ":" + s;
  document.getElementById('autosubmittimerwriting').innerHTML =
    m + ":" + s;
  console.log(m)
  setTimeout(startTimer, 1000);
  
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}