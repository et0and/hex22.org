var html = require('choo/html')
var path = require('path')
var ov = require('object-values')
var format = require('../components/format')

module.exports = view

function view (state, emit) {
  var logs = state.page.files ? ov(state.page.files) : false

  return html`
    <div class="db p2 sm-mt4 1">
		<div class="db c100 tac f2 projecttitle">
			Log
		</div>
		<div class="2/3 mxa m-1">
			<div class="f4">
				Logging for <b><span id="since"></span></b>.
			</div>

			<div class="log">
				<div id="total-wrapper" class="db 1" style="height: 200px"></div>

				<h3 class="my1">Sectors</h3>
				<div id="sectors"></div>

				<h3 class="my1">Projects</h3>
				<div id="projects"></div>
				<script>
					var elem = document.getElementById('total-wrapper');
					var sectors = document.getElementById('sectors');
					var projects = document.getElementById('projects');
					var since = document.getElementById('since');

                    var log = new Delog('/bundles/log.json', function() {
						log.days(since);
						log.total(elem, 80, {color: '#000', empties: true});
						log.sectors(sectors);
						log.projects(projects);
					});
				</script>
			</div>
    </div>
  `

  function image () {
    return html`
      <div class="p1">
        <div style="
          background-color: #eee;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          background-image: url(${path.join(state.page.path, state.page.image)});
          padding-bottom: 100%;
        "></div>
        <div class="pt1 db">
          ${state.page.caption ? format(state.page.caption) : ''}
        </div>
      </div>
    `
  }

  function stats() {
    return [
      'kingdom', 'division', 'class', 'order',
      'family', 'genus', 'species'
    ].reduce(function (result, key) {
      if (state.page[key]) {
        result.push({
          key: key,
          value: state.page[key]
        })
      }
      return result
    }, [ ])
  }

  function stat (state) {
    return html`
      <div class="db ffmono">
        <div class="1/2 dib ttu">${state.key}</div>
        <div class="1/2 dib">${state.value}</div>
      </div>
    `
  }
}
