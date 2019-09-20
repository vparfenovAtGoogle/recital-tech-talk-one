function likeSubmission (id, user, model, submission, voter) {
  callAPI ('getModel', [user, model], 'getSubmission', [submission], 'like', [voter])
    .done (function (res) {
      var likes = res.result.getModel.getSubmission.likes
      document.getElementById (id).innerText = likes
    })
}

function openInCreo (submission) {
  alert ('TODO: openInCreo (' + submission + ')')
}

function load_progess_3d(load_status, load_session)
{
  var loaded=0;
  var total=0;
  
  //go over all models that are/were loaded
  Object.keys(load_status).forEach(function(model_id)
  {
    if (load_status[model_id].load_session==load_session) //need to make sure we're on the last loading session (not counting previous loaded models)
    {
      loaded+=load_status[model_id].loaded;
      total+=load_status[model_id].total;
    }
  });
  //set total progress bar
  progressStrip.style.width = (loaded/total*100).toFixed (0) + '%';
  if (loaded/total==1) {
    setTimeout (function () {
      progressBar.style.display = 'none'
    }, 700)
  }
}	

var stl_viewer=null

function preview3D (subIdx, navigation) {
  if (stl_viewer) stl_viewer.clean()
  currentSubIdx = parseInt (subIdx)
  prevButton.disabled = currentSubIdx === 0
  nextButton.disabled = currentSubIdx === (submissions.length-1)
  var previewUrl = submissions [currentSubIdx].url
  if (!navigation) $('#preview3DPopup').modal()
  function show () {
    if (!stlWindow.offsetHeight) {
      setTimeout (show, 100)
    }
    else {
      progressBar.style.display = ''
      progressStrip.style.width = '1%'
      if (!stl_viewer) {
        var stw = $(stlWindow)
        stw.css({'height': stw.width()+'px'});
        stl_viewer=new StlViewer(stlWindow, {
            models: [ {id:1, filename:previewUrl} ],
            loading_progress_callback: load_progess_3d,
            all_loaded_callback: function () {
                //stl_viewer.set_color(1, "#00FF00")
                //stl_viewer.set_zoom (-3)
              },
            canvas_width: "100%",
            canvas_height: "100%",
            load_three_files: "libs/stlviewer/"
          });
      }
      else {
          stl_viewer.add_model ({id:1, filename:previewUrl})
      }
    }
  }
  show ()
}

function prevSubmission() {
  if (currentSubIdx > 0) preview3D (currentSubIdx-1, true)
}

function nextSubmission() {
  if (currentSubIdx < (submissions.length-1)) preview3D (currentSubIdx+1, true)
}

function downloadAndOpen() {
  alert (JSON.stringify (stl_viewer.get_model_info (1), null, 2))
}