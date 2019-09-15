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

var stl_viewer=null

function preview3D (previewUrl) {
  if (stl_viewer) stl_viewer.clean()
  stlButton.click()
  setTimeout (function () {
      if (!stl_viewer) {
        stl_viewer=new StlViewer(stlWindow, {
            models: [ {id:1, filename:previewUrl} ],
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
  }, 1000)
}