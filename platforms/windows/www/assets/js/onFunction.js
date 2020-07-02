$(document).on('click','#newProgress',(function(e){	
	$('#bodyProgress').modal('show');
}))

$(document).on('submit','#imgProfile',(function(e) {
	e.preventDefault();
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
	if (regex.test($('#profilePicture').val().toLowerCase())) {
		if (typeof (FileReader) != "undefined") {
			$.ajax({
				url: urlService+'/update/user',
				type: "POST",
				data:  new FormData(this),
				mimeType:"multipart/form-data",
				contentType: false,
				cache: false,
				processData:false,
				success: function(callback)
				{
					var json = JSON.parse(callback);
					notification(json.response,"Update success");
					if($('#name').val() != '' && $('#gender').val() != ''
						&& $('#phone').val() != '' && $('#address').val() != ''){
							$('#updateProfile').remove();
							$('#skipNav').find('span').html("Let's Go");
					}
					var userId = localStorage.getItem("userId");
					var param = {'token':12345678,'filter':'getProfile','dataId':userId};
					postData('read','user',param);
				},complete: function() {
					
				}
			 });
		} else {
			alert("File can't readed.");
		}
	} else {
		notification(200,"Update success");
		// alert("Please upload a valid image file.");
	}
}));


$(document).on('click','.clickable',function(){
	target = $(this).data('target');
	uri = $(this).data('uri');
	dom = $(this).data('dom');
	if(dom  !== undefined && uri === undefined && target !== undefined){
		getPage(dom,target,'');
	}
	if(dom === undefined && uri === undefined && target !== undefined){
		getPage("",target,'');
	}
	if(uri !== undefined && target !== undefined){
	}
});

$(document).on('click','#getImge',function(){
	$('#profilePicture').click();
});
$(document).on('change','#profilePicture',function(){
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
	if (regex.test($(this).val().toLowerCase())) {
		if (typeof (FileReader) != "undefined") {
			var reader = new FileReader();
			reader.onload = function (e) {
				$("#dvPreview").attr("src", e.target.result).css({'width':'90px','height':'90px'});
			}
			reader.readAsDataURL($(this)[0].files[0]);
		} else {
			alert("File can't readed.");
		}
	} else {
		alert("Please upload a valid image file.");
	}
})

$(document).on('click','#manualTransfer',function(){
	var cat_id = $('#cat_id').val();
	var cat_name = $('#cat_name').val();
	var placeId = $('#placeId').val();
	var cat_price = $('#cat_price').val();
	var requestCat = $('#requestCat').val();
	var oldMemberCat = $('#oldMemberCat').val();
	window.location.href="paymentManualMethod.html?cat="+cat_id+"&cat_name="+cat_name+"&placeId="+placeId+"&cat_price="+cat_price+"&requestCat="+requestCat+"&oldMemberCat="+oldMemberCat;
})

$(document).on('click','#cashPayment',function(){
	var cat_id = $('#cat_id').val();
	var cat_name = $('#cat_name').val();
	var placeId = $('#placeId').val();
	var cat_price = $('#cat_price').val();
	var requestCat = $('#requestCat').val();
	var oldMemberCat = $('#oldMemberCat').val();
	window.location.href="paymentCash.html?cat="+cat_id+"&placeId="+placeId+"&requestCat="+requestCat+"&oldMemberCat="+oldMemberCat;
})

$(document).on('click','#otherMethod',function(){
	window.location.href="paymentGateway.html";
})

$(document).on('click','#bca',function(){
	var cat_id = $('#cat_id_bank').val();
	var cat_name = $('#cat_name_member').val();
	var placeGymId = $('#placeIdManual').val();
	var cat_price = $('#cat_manual_price').val();

	var requestCat = $('#requestCatManual').val();
	var oldMemberCatManual = $('#oldMemberCatManual').val();
	var bank_name = $(this).data('id');
	var bank_name_real = $(this).attr('id');
	window.location.href="paymentManual.html?cat=" + cat_id +"&bank=" +bank_name+"&cat_name=" +cat_name+"&placeIdPay="+placeGymId+"&cat_price="+cat_price+"&requestCat="+requestCat+"&oldMemberCatManual="+oldMemberCatManual+"&bank_name="+bank_name_real;
})

$(document).on('click','#bri',function(){
	var cat_id = $('#cat_id_bank').val();
	var bank_name = $(this).data('id');
	var bank_name_real = $(this).attr('id');
	var placeGymId = $('#placeIdManual').val();
	var cat_name = $('#cat_name_member').val();
	var cat_price = $('#cat_manual_price').val();
	var requestCat = $('#requestCatManual').val();
	var oldMemberCatManual = $('#oldMemberCatManual').val();
	window.location.href="paymentManual.html?cat=" + cat_id +"&bank=" +bank_name+"&cat_name=" +cat_name+"&placeIdPay="+placeGymId+"&cat_price="+cat_price+"&requestCat="+requestCat+"&oldMemberCatManual="+oldMemberCatManual+"&bank_name="+bank_name_real;
})

$(document).on('click','#mandiri',function(){
	var cat_id = $('#cat_id_bank').val();
	var cat_name = $('#cat_name_member').val();
	var bank_name = $(this).data('id');
	var bank_name_real = $(this).attr('id');
	var placeGymId = $('#placeIdManual').val();
	var cat_price = $('#cat_manual_price').val();
	var requestCat = $('#requestCatManual').val();
	var oldMemberCatManual = $('#oldMemberCatManual').val();
	window.location.href="paymentManual.html?cat=" + cat_id +"&bank=" +bank_name+"&cat_name=" +cat_name+"&placeIdPay="+placeGymId+"&cat_price="+cat_price+"&requestCat="+requestCat+"&oldMemberCatManual="+oldMemberCatManual+"&bank_name="+bank_name_real;
})

$(document).on('change','#demo',function(){
	console.log('woe',$(this).val());
	var datee = $(this).val();
	let profile = JSON.parse(localStorage.getItem('dataProfile'));
	$('#classScheduleData').empty();
	$('#classScheduleData').html('');
	$.ajax({
		url: urlService + '/class/schedule/'+profile.data.accessToken,
		crossDomain: true,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Accept": "*/*",
			"Cache-Control": "no-cache",
			"param" :JSON.stringify({'byDate':datee})
		},
		timeout: 8000,
		tryCount: 0,
		retryLimit: 3,
		success: function (callback) {
			console.log('kembalian onchange demo', callback);
			switch (callback.responseCode) {
				case "200":
					callback.data.forEach(domClassSchedule);
					break;
				default:
					notification(500,'empty data');
					break;
			}
		},
		error:function(callback){
			notification(500,'empty data');
		}
	})
})

$(document).on('click','button, a',function(){
	target = $(this).data('target');
	uri = $(this).data('uri');
	dom = $(this).data('dom');
	filter = $(this).data('filter');
	var type = $(this).data('type');
	switch (target) {
		case "memberRegistration":
			getPage("", target, "");
			break;
	}
	if(dom  !== undefined && uri === undefined && target !== undefined){
		getPage(dom,target,'');
	}
	if(dom === undefined && uri === undefined && target !== undefined){
		getPage("",target,'');
	}
	if(uri !== undefined && target !== undefined){
		if(uri == 'create'){
			if(filter == 'memberRegister' && target == 'user'){
				data = {'filter':filter,'name':$('#name').val(),'address':$('#address').val(),'phone':$('#phone').val(),'gender':parseInt($('select#gender').val()),'email':$('#email').val(),'password':$('#password').val()};
			}else if(filter == 'trainerRegister' && target == 'user'){
				data = {'token':12345678,'filter':filter,'name':$('#name').val(),'email':$('#email').val(),'password':$('#password').val(),
				'specialization':specialization};
			} else if(filter == 'joinMember' && target == 'joinMember' && type == 'upgrade'){
				let profile = JSON.parse(localStorage.getItem('dataProfile'));
				data = {'token':profile.data.accessToken,'memberCat':$('select#memberSelect').val(),'memberCatName':$('#memberSelect option:selected').text(),'placeId':$('#placeGym option:selected').val(),'memberPrice':$('#memberSelect option:selected').val(),'catID':$('#memberSelect option:selected').data('id'),"requestCat":"upgrade","oldMemberCat":profile.data.memberCat};
				target = 'upgradeMember';
			} else if(filter == 'joinMember' && target == 'joinMember' && type == 'join'){
				let profile = JSON.parse(localStorage.getItem('dataProfile'));
				data = {'token':profile.data.accessToken,'memberCat':$('select#memberSelect').val(),'memberCatName':$('#memberSelect option:selected').text(),'placeId':$('#placeGym option:selected').val(),'memberPrice':$('#memberSelect option:selected').val(),'catID':$('#memberSelect option:selected').data('id'),"requestCat":"join"};
				target = 'joinMember';
			} else if(filter == 'personalBodyProgress' && target == 'bodyProgress'){
				data = {'prCat' : $('select#categories').val(), 'dataValue':$('#progressValue').val()};
			}
			console.log("check data =>", JSON.stringify(data));
			postData(uri,target,data);
		}else if(uri == 'read'){
			if(filter == 'confirmCode' && target == 'user'){
				data = {'token':12345678,'filter':filter,'verificationCode':$('#verificationCode').val(),'dataId':$(this).data('id')}
			}else if(filter == 'login'){
				data = {'email':$('#email').val(),'password':$('#password').val()}
				// window.location.href="classHistory.html";
			} else if(filter == 'index'){
				logout();
			} else if(filter == 'classDetail'){
				window.location.href="classDetail.html";
			}
			console.log("check data =>", JSON.stringify(data));
			postData(uri,target,data);
			// data = {'name':$('#name').val(),'email':$('#email').val(),'password':$('#password').val()}
		}else if(uri == 'update'){
			if(filter == 'resendCode' && target == 'user'){
				data = {'token':12345678,'filter':filter,'dataId':$(this).data('id')}
			} else if(filter == 'profileUser' && target == 'user'){
				data = {'token':12345678,'filter':filter,'dataId':$(this).data('id'),'name':$('#name').val(),
				'gender':$('#gender').val(),'phone':$('#phone').val(),'address':$('#address').val()}
			}
			console.log("check data =>", JSON.stringify(data));
			postData(uri,target,data);
		} else if(uri == 'view'){
			if(filter == 'listClass'){
				window.location.href="classSchedule.html";
			} else if(filter == 'profile'){
				window.location.href="profile.html";
			} else if(filter == 'membership'){
				window.location.href="membership.html";
			} else if(filter == 'joinMember'){
				window.location.href="joinMember.html";
			} else if(filter == 'classJoin'){
				defineAllowed(filter);
			} else if(filter == 'goToClassMembership'){
				window.location.href="membership.html";
			} else if(filter == 'listAvailableClass'){
				window.location.href="classAvailableList.html";
			}
		}
		
	}
});

function defineAllowed(target){
	let profile = JSON.parse(localStorage.getItem('dataProfile'));
	if(profile.data.memberId == null && profile.data.memberCat == null){
		window.location.href="membership.html";
	} else {
		// TODO able to join class (empty param)
		data = {'token':profile.data.accessToken,'scheduleId':$('#schedule_id').val(),'action':'join','memberId':String(profile.data.memberId)};
		console.log('param join class',data);
		postData(uri,target,data);
	}
}

function appendMembershipData(dataProfile){
	var html;
	var buttonHtml;
	var classButton;
	switch(dataProfile.data.memberCat){
		case null:
			html = 'Below are the privileges you will get if u join as a member:'+
			'<ul><li>tes 1</li><li>tes 2</li><li>tes 3</li>'+
			'</ul>';
			// data-uri="view" data-filter="joinMember" data-target="joinMember"
			buttonHtml = '<button type="button" class="btn btn-primary btn-block"  data-toggle="modal" data-target="#modalPoll-1">Join Member</button>';
			$('.btnMembership').attr('data-type','join');
			break;
		default:
			html = "Hi,&nbsp;<b id='userName'>"+dataProfile.data.name+"</b><br> you're registered on <b id='memberCatName'></b> membership.<br>"+
			"<small><span class='fa fa-calendar'></span>&nbsp;&nbsp;Expired date &nbsp;"+
			"<label class='label label-warning' id='expDate'></label>"+
			"<br><span class='fa fa-star'></span>&nbsp;&nbsp;Privilage &nbsp;"+
			"<br><span class='fa fa-book'></span>&nbsp;&nbsp;Policy &nbsp;</small>";
			classButton = '<button type="button" class="text-white btn purple-gradient btn-md btn-block btn-floating" data-uri="view" data-filter="listAvailableClass" data-target="listAvailableClass">Check Available Class</button>'; 
			buttonHtml = '<button type="button" class="btn btn-primary btn-block upgradeMember" data-toggle="modal" data-target="#modalPoll-1">Upgrade Member</button>';
			$('#defineClassMemberButton').append(classButton);
			$('.btnMembership').attr('data-type','upgrade');
			break;
	}
	$('#defineMembershipContent').append(html);
	$('#defineMemberButton').append(buttonHtml);
}

function appendProfile(dataProfile){
	$('#profName').append(dataProfile.data.name);
	$('#profAddr').append(dataProfile.data.address);
	$('#profEmail').append(dataProfile.data.email);
	$('#profPhone').append(dataProfile.data.phone);
}

function parseUserData(){
	let dataProfile = JSON.parse(localStorage.getItem("dataProfile"));
	return dataProfile;
}

$(document).on('change','#categoriesB', function(){
	var prcat = $(this).val();
	getData('bodyProgressParam',prcat);
});

$(document).on('click','.uploadFile', function(){
	var imgFile = $('#payProve64').val();
	var reqNumber = $('#reqNumber').val();
	let dataProfile = JSON.parse(localStorage.getItem("dataProfile"));
	var dataUpload = {
		"file":imgFile,
		"transactionId":reqNumber
	};
	$.ajax({
		url: 'http://192.168.0.5:8888/ronaldSengkey/fitClub/api/v1'+'/upload/'+dataProfile.data.accessToken,
		  crossDomain: true,
		  method: "POST",
		  headers: {
			  "Content-Type": "application/json",
			  "Accept": "*/*",
			  "Cache-Control": "no-cache"
	  },
		data: JSON.stringify(dataUpload),
		success: function(callback){
			console.log('kembalian upload file',callback);
			switch(callback.responseCode){
				case "500":
					notification(500,"Server error");
					break;
				case "406":
					notification(500,"File already uploaded");
					break;
				case "200":
					notification(200,"success upload file");
				default:
					break;
			}
		}
	})
});

$(document).on('keyup','.search', function(){
	var filter = $(this).val(), count = 0;
	
	var idTarget = '#'+$(this).data('target');
	var path = $(idTarget).closest('.wrapcontentList');
	
	$(idTarget+' li').each(function(){

		if ($(this).text().search(new RegExp(filter, "i")) < 0) {
			$(this).fadeOut();

		} else {
			$(this).show();
			count++;
		}
	});

	var numberItems = count;
	var hasil = "<b class='filterResult font-bold col-pink'>Matching records found = "+numberItems+"</b>";
	$('.filterResult').remove();
	$(hasil).insertAfter(path);
});

$(document).on('keyup','.classSearch', function(){
	var value = $(this).val();
	$('.classList').each(function(){
		if ($(this).data('class').toLowerCase().indexOf(value.toLowerCase()) > -1) {
			$(this).fadeIn();
		} else {
			$(this).fadeOut();
		}
	});
});

$(document).on('keyup','.availableClassSearch', function(){
	var value = $(this).val();
	$('.classAvailableeList').each(function(){
		if ($(this).data('class').toLowerCase().indexOf(value.toLowerCase()) > -1) {
			$(this).fadeIn();
		} else {
			$(this).fadeOut();
		}
	});
});

$(document).on('click', '#submitOtp', function(){
	let otpCode = $('#otpCode').val();
	let email = $('#email').val();
	let phone = $('#phone').val();
	let dd = {otpCode:otpCode, phone:phone, email:email};
	$.ajax({
		url: urlService+'/otp',
		  crossDomain: true,
		  method: "PUT",
		  headers: {
			  "Content-Type": "application/json",
			  "Accept": "*/*",
			  "Cache-Control": "no-cache",
			  "Host": "localhost:8888",
	  },
		data: JSON.stringify(dd),
		success: function(callback){
			let text = "";
			switch(callback){
				case 500:
					text = "Oops internal server error, please try again!"
					break;
				default:
					text = "Confirmation Success, Please login"
					break;
			}
			notification(callback,text)
			setTimeout(function () {
				if($(".sweet-alert").length > 0){
					swal.close();
					getPage("","index","");
				}
			}, 950);
		}
	})
});