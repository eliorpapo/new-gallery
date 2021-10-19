'use strict'

function onInit() {
  renderProjs()
}

function renderProjs() {
  var projs = getProjs()
  const strsHTML = projs.map((proj) => {
    return `<div class="col-md-4 col-sm-6 portfolio-item">
         <a class="portfolio-link" data-toggle="modal" href="#portfolioModal-${proj.id}">
           <div class="portfolio-hover">
             <div class="portfolio-hover-content">
             <i class="fa fa-plus fa-3x"></i>
             </div>
             </div>
             <img class="img-fluid" src="img/projs/${proj.id}.png" alt="" >
             </a>
             <div class="portfolio-caption">
             <h4>${proj.name}</h4>
             <p class="text-muted">${proj.title}</p>
             </div>
             </div>`
  })
  var elContainer = document.querySelector('.portfolio-container')
  elContainer.innerHTML = strsHTML.join('')
  renderModal()
}

function renderModal() {
  var projs = getProjs()
  const strsHTML = projs.map((proj) => {
    return `  <div class="portfolio-modal modal fade" id="portfolioModal-${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="close-modal" data-dismiss="modal">
                  <div class="lr">
                      <div class="rl"></div>
                  </div>
              </div>
              <div class="container">
                  <div class="row">
                      <div class="col-lg-8 mx-auto">
                          <div class="modal-body">
                              <h2>${proj.name}</h2>
                              <p class="item-intro text-muted">${proj.title}</p>
                              <img class="img-fluid d-block mx-auto" src="img/projs/${proj.id}.png" alt="">
                              <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
                                  maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                  <button type="button" class="btn btn-primary"><a href="${proj.url}" target="_blank" >Check It Out!</a></button>
                                  <ul class="list-inline">
                                  <li>Date: ${proj.publishedAt.getFullYear()}</li>
                                  <li>Client: Threads</li>
                                  <li>Category: Illustration</li>
                              </ul>
                              <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`
  })
  var elModalContainer = document.querySelector('.modal-container')
  elModalContainer.innerHTML = strsHTML.join('')
}

function onSubmit() {
  var elEmail = document.querySelector('[name="email"]')
  var elSubject = document.querySelector('[name="subject"]')
  var elMessage = document.querySelector('[name="message"]')
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${elEmail.value}&su=${elSubject.value}&body=${elMessage.value} `)
}
