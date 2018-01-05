// inject quill css into the admin interface
$('head').append('<link href="https://cdn.quilljs.com/1.3.3/quill.snow.css" rel="stylesheet">')

// * ———————————————————————————————————————————————————————— * //
// *	quill directive
// * ———————————————————————————————————————————————————————— * //
enduro_admin_app.compileProvider
	.directive('quill', function () {
		return {
			link: function (scope, element, attr) {
				$.getScript('https://cdn.quilljs.com/1.3.3/quill.js', function () {
          console.log("injected to " + element);
          var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [ 'link', 'image', 'video', 'formula' ],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
          ];

					var editor = new Quill(element[0], {
						theme: 'snow',
            modules: {
              toolbar: toolbarOptions
            },
					})

					editor.on('text-change', function(delta, oldDelta, source) {
						scope.context[scope.terminatedkey] = editor.root.innerHTML
					})

					scope.$watch('current_culture', function () {
						editor.root.innerHTML = scope.context[scope.terminatedkey] || ''
					})

					editor.root.innerHTML = scope.context[scope.terminatedkey]
				})
			}
		}
	})
