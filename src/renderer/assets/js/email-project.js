$('.nav ._child').click(function () {
	$('.nav ._child').removeClass('active');
	$(this).addClass('active');
});

$('.nav ._child').focusout(function () {
	$('.nav ._child').removeClass('active');
});

$(document).ready(function() {

	CKEDITOR.on('instanceReady', function(evt) {
	    var editor = evt.editor;
	    $('#cke_1_top').hide();

	    editor.on('focus', function(e) {
	        $('#cke_1_top').slideDown();
	    });
	    editor.on('blur', function(e) {
	        $('#cke_1_top').slideUp();
	    });
	});
	CKEDITOR.replace( 'editor' );

	window.resizeTo(window.screen.width, window.screen.height);

	$('#mail_list').DataTable({
		"sDom": '<"top"fip>rt<"clear">',
		"lengthChange": false,
		"pageLength": 45,
		"scrollY": '87.5vh',
        "scrollCollapse": true,
        "paging": true,
        "pagingType": "simple",
		'language': { 
					search: "" ,
					info: "_START_ - _END_ of _TOTAL_",
					paginate:
				        {
				            previous: '<i class="fa fa-chevron-left"></i>',
				            next: '<i class="fa fa-chevron-right"></i>'
				        },
			        infoFiltered: "(filtered from _MAX_ mails)",
				    },

		'columnDefs': [{
	         'targets': 0,
	         'searchable':false,
	         'orderable':false,
	         'className': 'dt-body-center',
	         'render': function (data, type, full, meta){
	             return '<input type="checkbox" name="id[]" value="' 
	                + $('<div/>').text(data).html() + '">';
	         }
	      }]
	});

	  $('.dropdown-submenu a.test').on("click", function(e){
	    $(this).next('ul').toggle();
	    e.stopPropagation();
	    e.preventDefault();
	  });

	// var deviceInnerHeight = (($(window).height()) - 119) + 'px';
	// var deviceInnerHeightForDiv = (($(window).height()) - 29) + 'px';
	$('#mail_list_div').css({ 'min-height': '-webkit-fill-available' });
	$('.dataTables_scrollBody').css({ 'max-height': '' + window.screen.height + '' });
	$('.tab-pane').css({'min-height': '88.5vh'});

	$('[data-toggle="tooltip"]').tooltip(); 

	$('#mail_list_filter').addClass('col-md-6').css('padding-left', '0');
	$('#mail_list_paginate').addClass('col-md-1').css({
		'width': '8%',
		'float': 'right',
		'text-align': 'right',
	    'padding': '0'
	});

	$('#mail_list_info').addClass('col-md-4').css({
		'font-size': '1.3rem',
		'text-align': 'right',
		'padding-top': '5px',
	    'position': 'relative',    
	    'right': '0',
	    'left': '10%'
	});

	$('#mail_list_next a').attr('data-toggle', 'tooltip');
	$('#mail_list_next a').attr('title', 'Older');

	$('#mail_list_filter label').css('float', 'right');

	$('.dataTables_filter input[type="search"], #mail_list_filter label').css(
		{'width':'-webkit-fill-available'}).attr('id', 'search_field_mail');

	$('.dataTables_filter input[type="search"]').attr('placeholder', 'Search mail');

	$('#search_field_mail').keyup(function(){
		var searchText = $('#mail_list_info').text().match(/entries/gi);
		if (searchText != null && searchText.length < 1) {
			$('#mail_list_info').removeClass('col-md-5').addClass('col-md-4').css('left', '10%');
		} else {
			$('#mail_list_info').removeClass('col-md-4').addClass('col-md-5').css('left', '2%');
		}
	});
	$('#mail_list thead').hide();
	$('#mail_list tfoot').hide();

	$("#mail_list_div").resizable({
		// alsoResize: "#mail_form_div",
	    resize: function(event, ui){
	        if ((ui.size.width) < ((window.screen.width)/2)) {
	        	$('#mail_list_info').css('display', 'none');
	        	$('#mail_list_paginate').removeClass('col-md-1').addClass('col-md-6').css('width', '28%');
	        } else {
	        	$('#mail_list_info').css('display', 'block');
	        	$('#mail_list_paginate').removeClass('col-md-6').addClass('col-md-1').css('width', '8%');
	        }
	    }
	});

	$("#mail_form_div").resizable();

	$('a[field-handler="field-activator"]').click(function () {
		var elementType = $(this).attr('id').split('-').shift();
		if ((elementType == 'cc') && ($('#bcc-selector').css('display') != 'block')) {
			$('#to-selector .input-group').removeClass();
			$('#cc-span, #bcc-span').hide();
			$('#cc-selector').slideDown('fast');
			$('#cc-InputBox').focus();
		} else if ((elementType == 'bcc') && ($('#cc-selector').css('display') != 'block')) {
			$('#to-selector .input-group').removeClass();
			$('#cc-span, #bcc-span').hide();
			$('#bcc-selector').slideDown('fast');
			$('#bcc-InputBox').focus();
		} else if ((elementType == 'bcc') && ($('#cc-selector').css('display') == 'block')) {
			$('#bcc-selector .input-group, #cc-selector .input-group').removeClass();
			$('#cc-span, #bcc-span, #cc-span1, #bcc-span1').hide();
			$('#bcc-selector').slideDown('fast');
			$('#bcc-InputBox').focus();
		} else {
			$('#bcc-selector .input-group, #cc-selector .input-group').removeClass();
			$('#cc-span, #bcc-span, #cc-span1, #bcc-span1').hide();
			$('#cc-selector').slideDown('fast');
			$('#cc-InputBox').focus();
		}
	});

	$('#files').on('change', function (e, decimals) {
      var fileName = e.target.files[0].name;
      var fileSize = e.target.files[0].size;
      var filetype = e.target.files[0].type;
      var filePath = $('#files').val();
      var convertedSize = formatBytes(fileSize);
      function formatBytes(bytes,decimals) {
		   if(bytes == 0) return '0 Bytes';
		   var k = 1024,
		       dm = decimals <= 0 ? 0 : decimals || 2,
		       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		       i = Math.floor(Math.log(bytes) / Math.log(k));
		   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
		}
    	$('#file-preview').append('<div class="col-md-12 file-preview-list"><a href="' + filePath + '" target="_blank"><span>' + fileName + '</span> <span>(' + convertedSize + ')</span>' + '</a><a href="javascript:void(0)" action-field="remove-attachment" class="close-list-btn"><i class="fa fa-times-circle"></i></a></div>');

		$('a[action-field="remove-attachment"]').on('click', function () {
			$(this).parent().remove();
		});
    });  
});