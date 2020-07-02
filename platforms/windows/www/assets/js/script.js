// const e = require("express");

// var urlService = 'http://localhost:8888/ronaldSengkey/fitClub/api/v1';
var urlService = 'http://192.168.0.54:8888/ronaldSengkey/fitClub/api/v1';
// var urlService = 'http://192.168.1.12:8888/ronaldSengkey/fitClub/api/v1';
var fieldTextInput = '<input type="text" class="form-control fieldText">';
var fieldEmailInput = '<input type="email" class="form-control fieldEmail">';
var fieldPswdInput = '<input type="password" class="form-control fieldPswd">';
var fieldSelect = '<select class="form-control select2"></select>';
var target, uri, dom, data, userId, userName, userRole = '';
var backBtn = '<button type="button" id="backBtn" data-target="index" style="position:fixed;right:7%;bottom:5%;" class="btn bg-blue btn-circle-lg waves-effect waves-circle waves-float">' +
	'<i class="material-icons">keyboard_arrow_left</i>' +
	'</button>';
$(function () {
	if ($('#loginPage').length > 0) {
		validate('login');
		// $('body').append(backBtn);
		// controlBackBtn('registration');
	}
	if ($('#registerPage').length > 0) {
		// $('body').append(backBtn);
		// controlBackBtn('index');
		validate();
		select2Activated();
	}
	if ($('#classHistoryPage').length > 0) {
		validate('classHistory');
	}
	if ($('#classListPage').length > 0) {
		validate('classList');
	}
	if ($('#profilePage').length > 0) {
		validate('profile');
	}
	if ($('#membershipPage').length > 0) {
		validate('membership');
	}
	if ($('#classDetailPage').length > 0) {
		validate('classDetail');
	}
	if ($('#classSchedulePage').length > 0) {
		validate('classSchedule');
	}
	if ($('#bodyProgressPage').length > 0) {
		validate('bodyProgress');
	}
	if($('#classAvailableListPage').length > 0){
		validate('availableClass');
	}
	if($('#paymentCashPage').length > 0){
		validate('paymentCash');
	}
	if($('#paymentManualMethodPage').length >0){
		validate('paymentManualMethod');
	}
	if($('#paymentMethodPage').length >0){
		validate('paymentMethodPage');
	}
	if($('#paymentManualPage').length >0){
		validate('paymentManual');
	}
	var dataProfilee = parseUserData();
	if (dataProfilee) {
		console.log('profile data', dataProfilee);
	}
	setTimeout(function () {
		$('.page-loader-wrapper').fadeOut(400, "linear");
	}, 300);
});


function logout() {
	localStorage.removeItem("dataProfile");
	window.location.href = "index.html";
}

function notification(cat, T) {
	if (cat == 200) {
		// alert(T);
		swal({
			title: "Proccess success!",
			text: T,
			icon: "success",
			button: "Thanks!",
		});
		$(".sweet-alert").css({
			'background-color': '#2196F3'
		});
	} else if (cat == 500) {
		// alert(T);
		swal({
			title: "Proccess failed!",
			text: T,
			icon: "error",
			button: "Thanks!",
		});
		$(".sweet-alert").css({
			'background-color': '#F44336'
		});
	}

	$(".sweet-alert").find('p').css({
		'color': '#fff'
	});
	$(".sweet-alert").find('h2').css({
		'color': '#fff'
	});
	$(".sweet-alert").find('button').css({
		'background': '#03A9F4'
	});
}

function controlBackBtn(page) {
	$('#backBtn').attr('data-target', page);
}

function loadingActive() {
	$('.page-loader-wrapper').fadeIn(400, "linear");
}

function loadingDeactive() {
	$('.page-loader-wrapper').fadeOut(400, "linear");
}

function getDetailData() {
	let searchParams = new URLSearchParams(window.location.search);
	let param = searchParams.get('id');
	getData('classDetail', param);
}

function validate(param) {
	let dataProfile = JSON.parse(localStorage.getItem("dataProfile"));
	if (dataProfile) {
		switch (param) {
			case "availableClass":
				getData('availableClass');
				break;
			case "login":
				window.location = "classHistory.html";
				break;
			case "classHistory":
				getData("classHistory");
				break;
			case 'classList':
				getData('classList');
				break;
			case 'profile':
				appendProfile(dataProfile)
				generateQrProfile();
				break;
			case 'membership':
				appendMembershipData(dataProfile);
				getData('placeMember');
				getData('paymentFee');
				break;
			case 'classDetail':
				getDetailData();
				break;
			case 'classSchedule':
				getScheduleData();
				break;
			case 'paymentCash':
				generateCashPayment();
				// getData('paymentCash');
				break;
			case 'bodyProgress':
				getBodyProgress();
				break;
			case 'paymentManualMethod':
				getBankList();
				break;
			case "paymentMethodPage":
				getCategoryData();
				break;
			case "paymentManual":
				getPaymentData();
				generateTimer();
				break;
				// default:
				// 	window.location = "classHistory.html";
				// 	break;
		}
	} else {
		// window.location = "index.html";
		// logout();
		// 	if($('#indexPage').length == 0 && $('#registerIntroPage').length == 0 && $('#registerPage').length == 0 && $('#loginPage').length == 0){
		// 		getPage("","index",'');
		// 	}
	}
}

function appendPlace(data,index){
	let placeHtml = '<option value='+data.partnerId+'>'+data.name+'</option>';
	$('#placeGym').append(placeHtml);
}

function generateTimer() {
	var halfHour = 60 * 30;
	var display = $('#time');
	startTimer(halfHour, display);
}

function startTimer(duration, display){
	var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
			timer = duration;
			expiredTimer();
        }
    }, 1000);
}

function expiredTimer(){
	window.location.href="paymentMethod.html";
}

function encodeImageFileAsURL(){
	var filesSelected = document.getElementById("inputFileToLoad").files;
	if (filesSelected.length > 0) {
		var fileToLoad = filesSelected[0];
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			var srcData = fileLoadedEvent.target.result;
			var newImage = document.createElement('img');
			newImage.src = srcData;
			newImage.style.cssText = "max-width:75vw;";
			document.getElementById("imgTest").innerHTML = newImage.outerHTML;
			$('#payProve64').val(srcData)
		}
		fileReader.readAsDataURL(fileToLoad);
	}
}

function generateQrProfile(){
	var qrcode = new QRCode("qrProfile", {
		width: 128,
		height: 128,
	});
	qrcode.makeCode("halo");
}

function getPaymentData(){
	let searchParams = new URLSearchParams(window.location.search);
	let param_bank = searchParams.get('bank_name');
	let cat_name_on_bank = searchParams.get('cat_name');
	let placesId = searchParams.get('placeIdPay');
	let catId = searchParams.get('cat');
	let cat_manual_price = searchParams.get('cat_price');
	let requestCatTf = searchParams.get('requestCat');
	let oldMemberCatTf = searchParams.get('oldMemberCatManual');
	let bankID = searchParams.get('bank');
	$('#classLevel').html(cat_name_on_bank);
	getBankParam(param_bank);
	getPaymentValue(placesId,catId,requestCatTf,oldMemberCatTf,bankID);
}

function getBodyProgress() {
	getData('bodyProgress');
}

function getPaymentValue(placeId,cat_id,requestCatTf,oldMemberCatTf,bankID){
	var payObj = {
		"memberCategory":cat_id,
		"placeId":placeId,
		"paymentType":"transfer",
		"requestCat":requestCatTf,
		"oldMemberCat":oldMemberCatTf,
		"bankID":bankID
	}
	console.log('pay value',payObj);
	getData('generatePayment',payObj);
}

function getBankParam(bank_name){
	getData('bankParam',bank_name);
}

function getCategoryData(){
	let searchParams = new URLSearchParams(window.location.search);
	let param = searchParams.get('cat');
	let paramCatName = searchParams.get('cat_name');
	let placeId = searchParams.get('placeId');
	let paramCatPrice = searchParams.get('cat_price');
	let paramCatId = searchParams.get('cat_id');
	let requestCategory = searchParams.get('requestCat');
	let oldMemberCategory = searchParams.get('oldMemberCat');
	$('#cat_id').val(paramCatId);
	$('#cat_name').val(paramCatName);
	$('#placeId').val(placeId);
	$('#cat_price').val(paramCatPrice);
	$('#requestCat').val(requestCategory);
	$('#oldMemberCat').val(oldMemberCategory);
}

function getBankList(){
	let searchParams = new URLSearchParams(window.location.search);
	let param = searchParams.get('cat');
	let paramCatNameOnBank = searchParams.get('cat_name');
	let paramPlaceId = searchParams.get('placeId');
	let paramCatPrice = searchParams.get('cat_price');
	console.log('param',param);
	let requestCategory = searchParams.get('requestCat');
	let oldMemberCategory = searchParams.get('oldMemberCat');
	$('#cat_id_bank').val(param);
	$('#cat_name_member').val(paramCatNameOnBank);
	$('#placeIdManual').val(paramPlaceId);
	$('#cat_manual_price').val(paramCatPrice);
	$('#requestCatManual').val(requestCategory);
	$('#oldMemberCatManual').val(oldMemberCategory);
	getData('getBankList');
}

function getScheduleData() {
	getData('classSchedule');
}

function generateCashPayment(){
	let searchParams = new URLSearchParams(window.location.search);
	let cat_id = searchParams.get('cat');
	let placeId = searchParams.get('placeId');
	let requestCat = searchParams.get('requestCat');
	var payObj = {
		"memberCategory":cat_id,
		"placeId":placeId,
		"paymentType":"cash",
		"requestCat":requestCat
	}
	getData('generateCashPayment',payObj);
}

function callModal(content) {
	$('#largeModal').modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
	$('.modal-body').empty('');
	$('.modal-body').html('');
	$('.modal-body').html(content);
}

var progressData = [];

function emptyChart(){
	$('canvas[id=line_chart]').remove();
}

function convertToRupiah(angka)
{
	var rupiah = '';		
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}

function generateQrCashPayment(data){
	var qrcode = new QRCode("paymentBarcode", {
		width: 200,
		height: 200,
	});
	qrcode.makeCode(JSON.stringify(data));
}

function getData(param, extraParam) {
	let profile = JSON.parse(localStorage.getItem('dataProfile'));
	console.log(profile);
	let directory = urlService;
	switch (param) {
		case "classHistory":
			// directory += '/class/memberClass/' + profile.data.accessToken;
			directory += '/class/memberClass/history/' + profile.data.accessToken;
			break;
		case 'classList':
			directory += '/class/' + profile.data.accessToken;
			break;
		case 'classDetail':
			directory += '/class/detail/' + profile.data.accessToken + '/' + extraParam;
			$('#className').html('');
			$('#classDesc').html('');
			break;
		case 'classSchedule':
			console.log('masuk get data schedule');
			directory += '/class/schedule/' + profile.data.accessToken;
			$('#classScheduleData').empty();
			$('#classScheduleData').html('');
			break;
		case 'bodyProgress':
			$('.chartProg').empty();
			$('.chartProg').html('');
			directory += '/member/personalRecord/' + profile.data.accessToken;
			break;
		case "availableClass":
			directory += '/class/memberClass/' + profile.data.accessToken;
			break;
		case "placeMember":
			directory += '/place/' + profile.data.accessToken;
			break;
		case 'paymentFee':
			directory += '/member/fee/' + profile.data.accessToken;
			break;
		case 'generatePayment':
			console.log('ww',extraParam);
			directory += '/transaction/request/' + JSON.stringify(extraParam) + '/' + profile.data.accessToken;
			break;
		case 'generateCashPayment':
			directory += '/transaction/request/' + JSON.stringify(extraParam) + '/' + profile.data.accessToken;
			break;
	}
	if(param == 'bodyProgress'){
		$.ajax({
			url: urlService + '/member/personalRecord/category/' + profile.data.accessToken,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
			},
			timeout: 8000,
			tryCount: 0,
			retryLimit: 3,
			success: function (callback) {
				console.log('kembalian get pr cat', callback);
				switch (callback.responseCode) {
					case "200":
						callback.data.forEach(domPrCat);
						break;
					default:
						notification(500,'empty data');
						break;
				}
			}
		})
	} else if(param == 'bankParam'){
		$.ajax({
			url: urlService + '/bank/' + profile.data.accessToken,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"param" :extraParam
			},
			timeout: 8000,
			tryCount: 0,
			retryLimit: 3,
			success: function (callback) {
				console.log('kembalian bank list param', callback);
				switch (callback.responseCode) {
					case "200":
						callback.data.forEach(appendDetailBank);
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
	} else if(param == 'getBankList'){
		$.ajax({
			url: urlService + '/bank/' + profile.data.accessToken,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"param" :"all"
			},
			timeout: 8000,
			tryCount: 0,
			retryLimit: 3,
			success: function (callback) {
				console.log('kembalian bank list all', callback);
				switch (callback.responseCode) {
					case "200":
						callback.data.forEach(appendBankList);
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
	} else if(param == 'generateCashPayment'){
		$.ajax({
			url: directory,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"param" :"all"
			},
			timeout: 8000,
			tryCount: 0,
			retryLimit: 3,
			success: function (callback) {
				console.log('kembalian generate cash payment', callback);
				switch (callback.responseCode) {
					case "200":
						generateQrCashPayment(callback.data);
						break;
					default:
						// notification(500,'empty data');
						console.log('error cash payment',callback);
						break;
				}
			},
			error:function(callback){
				notification(500,'empty data');
			}
		})
	} else if(param == 'generatePayment'){
		$.ajax({
			url: directory,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"param" :"all"
			},
			timeout: 8000,
			tryCount: 0,
			retryLimit: 3,
			success: function (callback) {
				console.log('kembalian generate payment', callback);
				switch (callback.responseCode) {
					case "200":
						// console.log('data',callback);
						var priceConvert = convertToRupiah(callback.data.nominal)
						$('.priceGenerate').html(priceConvert);
						$('#reqNumber').val(callback.data.requestNumber);
						break;
					default:
						// notification(500,'empty data');
						console.log('error',callback);
						break;
				}
			},
			error:function(callback){
				notification(500,'empty data');
			}
		})
	} else if(param == 'classSchedule'){
		$.ajax({
			url: directory,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"param" :JSON.stringify({'byDate':moment().format('YYYY-MM-DD')})
			},
			timeout: 8000,
			tryCount: 0,
			retryLimit: 3,
			success: function (callback) {
				console.log('kembalian class schedule data', callback);
				switch (callback.responseCode) {
					case "200":
						callback.data.forEach(domClassSchedule);
						break;
					case "404":
						appendEmptySchedule();
						break;
					default:
						notification(500,'empty class data');
						break;
				}
			},
			error:function(callback){
				notification(500,'empty class data');
			}
		})
	} else if(param == 'bodyProgressParam'){
		var cate = "";
		if(extraParam == "0" || extraParam == 0){
			cate = "all";
		} else {
			cate = JSON.stringify({"prCat":extraParam});
		}
		$.ajax({
			url: urlService + '/member/personalRecord/'+profile.data.accessToken,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"param" :cate
			},
			timeout: 8000,
			tryCount: 0,
			retryLimit: 3,
			success: function (callback) {
				console.log('kembalian body progress param', callback);
				switch (callback.responseCode) {
					case "200":
						emptyChart();
						defineChart(callback.data);
						$.getScript("assets/js/pages/charts/chartjs.js", function (data, textStatus, jqxhr) {});
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
	} else {
		$.ajax({
			url: directory,
			crossDomain: true,
			method: "GET",
			headers: param != 'bodyProgress' ? {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
			} : {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"param" :"all"
			},
			timeout: 8000,
			tryCount: 0,
			retryLimit: 3,
			success: function (callback) {
				console.log('kembalian', callback);
				console.log('kembalian p', param);
				console.log('kembalian d', directory);
				switch (callback.responseCode) {
					case "500":
						this.tryCount++;
						if (this.tryCount < this.retryLimit) {
							$.ajax(this);
						} else if (this.tryCount == this.retryLimit) {
							let empty500 = '<h3 class="h3 mb-5">Server Error</h3>'
							$('#classContent').append(empty500);
						}
						break;
					case "401":
						logout();
						break;
					case "404":
						if (param == 'classHistory') {
							appendEmptyClass();
						} else if (param == 'bodyProgress') {
							appendEmptyChart();
							$.getScript("assets/js/pages/charts/chartjs.js", function (data, textStatus, jqxhr) {});
						} else if (param == 'availableClass') {
							appendEmptyAvailableClass();
						} else {
							alert(callback.responseMessage);
						}
						break;
					case "200":
						switch(param){
							case "classList":
								callback.data.forEach(appendClassData);
								break;
							case "classHistory":
								callback.data.forEach(domClassHistory);
								break;
							case "classDetail":
								domClassDetail(callback.data);
								break;
							case "bodyProgress":
								progressData = callback.data;
								console.log('callback bp',callback.data);
								defineChart(callback.data);
								$.getScript("assets/js/pages/charts/chartjs.js", function (data, textStatus, jqxhr) {});
								break;
							case "availableClass":
								callback.data.forEach(appendClassAvailableData);
								break;
							case "getBankList":
								callback.data.forEach(appendBankList);
								break;
							case "placeMember":
								callback.data.forEach(appendPlace);
								break;
							case "bankParam":
								console.log('kembalian bank param',callback.data);
								break;
							case "paymentFee":
								let dataProfile = JSON.parse(localStorage.getItem("dataProfile"));
								if(dataProfile.data.memberCat == 2 || dataProfile.data.memberCat == '2'){
									$('.upgradeMember').remove();
								} else {
									callback.data.forEach(appendPaymentFee);
								}
								break;
							case 'generatePayment':
								console.log('payment',callback);
								break;
							case 'paymentCash':
								console.log('pay cash',callback);
								break;
						}
						break;
				}
			}
		})
	}
	
}

function appendPaymentFee(data,index){
	let dataProfile = JSON.parse(localStorage.getItem("dataProfile"));
	if(dataProfile.data.memberCat == null || dataProfile.data.memberCat == 'null'){
		let paymentHtml = '<option value='+data.fee+' data-id='+data.catId+'>'+data.category+'</option>'
		$('#memberSelect').append(paymentHtml);
	} else if(dataProfile.data.memberCat == 1 || dataProfile.data.memberCat == '1'){
		if(data.catID != 1){
			let paymentHtml = '<option value='+data.fee+' data-id='+data.catId+'>'+data.category+'</option>'
			$('#memberSelect').append(paymentHtml);
		}
	} else{
		
	}
	
}

function appendDetailBank(data,index){
	$('.bankName').html(data.name + " a/n " + data.billName);
	$('.bankNumber').html("No rek : " + data.billNumber);
}

function appendBankList(data,index){
	let bankHtml = '<div class="row mb-5" style="margin:0px;">'+
		'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 container">'+
			'<div class="card demo-card-header-pic text-center" id="'+(data.name).toLowerCase()+'" data-id='+data.id+' data-name='+data.name+' style="background-color: transparent;">'+
				'<div style="background-image:url(assets/images/'+data.name+'.jpg); padding-top: 30%; padding-bottom:50%;"'+
					'class="card-header align-items-flex-end">'+
					'<h2>'+data.name+'</h2>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';
	$('.banklist').append(bankHtml);
}

function domPrCat(data,index){
	let htmlPr = '<option value='+data.id+'>'+data.categoryName+'</option>';
	$('#categories').append(htmlPr);
	$('#categoriesB').append(htmlPr);
}

function appendEmptyChart() {
	let htmlChart = '<canvas id="line_chart" class="animated flipInX" height="188"></canvas>';
	$('.chartProg').append(htmlChart);
}

function domClassDetail(result) {
	console.log('result class',result);
	$('#className').html(result.className);
	$('#classDesc').html(result.descript);
	$('#schedule_id').val(result.scheduleId);
	let coachHtml = '<div class="row mb-3">'+
	'<div class="col-lg-3 col-3">'+
		'<div class="news">'+
			'<div class="label">'+
				'<img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20)-mini.jpg" style="width:110%;" class="rounded-circle z-depth-1-half">'+
			'</div>'+
		'</div>'+
	'</div>'+
	'<div class="col-lg-9 col-9">'+
		'<div class="excerpt mb-0">'+
				'<div class="brief">'+
				'<a class="blue-text">'+result.coachName+'</a>'+
				'<div class="date">3 days ago</div>'+
				'</div>'+
				'<div class="feed-footer">'+
				'<span>'+
					'<a>47</a>'+
				'</span>'+
				'<a class="thumbs" data-toggle="tooltip" data-placement="top" title="" data-original-title="I like it">'+
					'<i class="fas fa-thumbs-up"></i>'+
				'</a>'+
				'<a class="thumbs" data-toggle="tooltip" data-placement="top" title="" data-original-title="I dont like it">'+
					'<i class="fas fa-thumbs-down"></i>'+
				'</a>'+
				'</div>'+
			'</div>'+
	'</div>'+
	'</div>';
	$('#coachListDetail').append(coachHtml);
}

// '<a class="btn-floating btn-sm purple-gradient waves-effect waves-light text-white" onclick="toClassDetail(' + data.classId + ')"><i class="fas fa-check"></i></a>' +
// 		'<a class="btn-floating btn-sm peach-gradient waves-effect waves-light text-white"><i class="fas fa-times"></i></a>' +

function domClassHistory(data,index){
	let histHtml = '<div class="card card-cascade wider">' +
		'<div class="card-body card-body-cascade text-center">' +
		'<div class="row">' +
		'<div class="col-8" style="border-right:solid 1px #ddd;padding-left:3%;">' +
		'<div class="news">' +
		'<div class="excerpt">' +
		'<div class="brief">' +
		'<h5 class="blue-text">' + data.className + '</h5></div>' +
		'<div class="feed-footer">' +
		'<div>' + data.coachName + '</div>' +
		'<a class="like">' +
		'</a></div></div></div></div>' +
		'<div class="col-4">' +
		'<h6 class="h6 text-default">' + data.startTime + '</h6>' +
		'<h3> - </h3>'+
		'<h6 class="h6 text-default">' + data.endTime + '</h6>' +
		'</div>' +
		'</div>' +
		'</div></div><div class="clearfix"></div><br/>';
	$('#classContent').append(histHtml);
}

function domClassSchedule(data, index) {
	let schedHtml = '<div class="card card-cascade wider">' +
		'<div class="card-body card-body-cascade text-center">' +
		'<div class="row">' +
		'<div class="col-8" style="border-right:solid 1px #ddd;padding-left:3%;">' +
		'<div class="news">' +
		'<div class="excerpt">' +
		'<div class="brief">' +
		'<h5 class="blue-text">' + data.className + '</h5></div>' +
		'<div class="feed-footer">' +
		'<div>' + data.coachName + '</div>' +
		'<a class="like">' +
		'</a></div></div></div></div>' +
		'<div class="col-4">' +
		'<h6 class="h6 text-default">' + data.startTime + '</h6>' +
		'<a class="btn-floating btn-sm purple-gradient waves-effect waves-light text-white" onclick="toClassDetail(' + data.classId + ')"><i class="fas fa-check"></i></a>' +
		// '<a class="btn-floating btn-sm peach-gradient waves-effect waves-light text-white"><i class="fas fa-times"></i></a>' +
		'<h6 class="h6 text-default">' + data.endTime + '</h6>' +
		'</div>' +
		'</div>' +
		'</div></div><div class="clearfix"></div><br/>';
	$('#classScheduleData').append(schedHtml);
}

function appendEmptyClass() {
	let html = '<h3 class="h3 mb-5">Oopss !,<br> You are not join any class</h3>' +
		'<div class="clearfix"></div>' +
		'<button type="button" class="text-white btn purple-gradient btn-md btn-block btn-floating" data-uri="view" data-filter="listClass" data-target="listClass">Join Class Now</button>';
	$('#classContent').append(html);
}

function appendEmptyAvailableClass(){
	let html = '<h3 class="h3 mb-5">Oopss !,<br> Empty available class</h3>' +
		'<div class="clearfix"></div>' +
		'<button type="button" class="text-white btn purple-gradient btn-md btn-block btn-floating" data-uri="view" data-filter="goToClassMembership" data-target="goToClassMembership">Join as a Member now!</button>';
	$('#classAvailableListData').append(html);
}

function appendEmptySchedule(){
	let htmlSchedule = '<img src="https://uploads-ssl.webflow.com/5d1f053cee3b9da3d699a858/5d2aaced187e9368f0c098c9_gym.svg" class="mt-5" style="width:55%">'+
		'<h3 class="h3 mb-5">Oopss !!<br> Empty schedule data</h3>' +
		'<div class="clearfix"></div>';
	$('#classScheduleData').append(htmlSchedule);
}

function toClassDetail(id) {
	// let profileData = parseUserData();
	// let data = {'token' : profileData.data.accessToken,'classId' : id};
	// postData('','detailClass',data);
	window.location.href = "classDetail.html?id=" + id;
}

function appendClassAvailableData(data, index) {
	let searchPlaceholder = '<div class="md-form input-group col-12" style="margin-top:-30px;">'+
		'<input type="text" class="form-control text-white text-center availableClassSearch" placeholder="Looking for ?"'+
			'style="font-size:1.50em;font-weight:500" aria-describedby="material-addon2">'+
		'<div class="input-group-append">'+
			'<span class="input-group-text md-addon" id="material-addon2">'+
				'<i class="fas fa-pencil-alt text-white"></i></span>'+
		'</div>'+
	'</div>';
	// onclick="toClassDetail(' + data.id + ')"
	let html = '<div class="card card-cascade wider classAvailableeList mb-3" data-id=' + data.classId + ' data-class="' + data.className + '">' +
		'<div class="card-body card-body-cascade text-center">' +
		'<div class="row"><div class="col-8" style="border-right:solid 1px #ddd;padding-left:3%;">' +
		'<div class="news">' +
		'<div class="excerpt"><div class="brief"><h5 class="blue-text">' + data.className + '</h5></div>' +
		'</div>' +
		'</div>'+
	'</div>' +
	'<div class="col-4">' +
	'<h6 class="h6 text-default"> by : '+data.coachName+'</h6>' +
	// '<button type="button" class="text-white btn purple-gradient btn-md btn-block btn-floating" data-target="classDetail" data-filter="classDetail" data-uri="read">Join</button>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>';
	$('#searchPlace').append(searchPlaceholder);
	$('#classAvailableListData').append(html);
}

function appendClassData(data, index) {

	let html = '<div class="card card-cascade wider classList mb-3" onclick="toClassDetail(' + data.id + ')" data-id=' + data.id + ' data-class="' + data.name + '">' +
		'<div class="card-body card-body-cascade text-center">' +
		'<div class="row"><div class="col-8" style="border-right:solid 1px #ddd;padding-left:3%;">' +
		'<div class="news">' +
		'<div class="excerpt"><div class="brief"><h5 class="blue-text">' + data.name + '</h5></div>' +
		'</div>' +
		'</div>'
	'</div>' +
	'<div class="col-4">' +
	'<h3 class="h3 text-default">07.00</h3>' +
	'<button type="button" class="text-white btn purple-gradient btn-md btn-block btn-floating" data-target="classDetail" data-filter="classDetail" data-uri="read">Join</button>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>';
	$('#classListData').append(html);
}

function postData(uri, target, dd) {
	loadingActive();
	if (target == 'login') {
		$.ajax({
			url: urlService + '/' + target,
			type: "POST",
			data: JSON.stringify(dd),
			timeout: 5000,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			success: function (callback) {
				switch (callback.responseCode) {
					case "200":
						// notification(200, "Login success");
						loadingDeactive();
						localStorage.setItem("dataProfile", JSON.stringify(callback));
						window.location.href = 'classHistory.html';
						break;
				}
			},
			error: function () {
				loadingDeactive();
				notification(500, "Cannot login, please try again");
			}
		});
	} else if (target == 'classHistory') {
		$.ajax({
			url: urlService + '/class/history' + dd.dataId,
			type: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			success: function (callback) {
				loadingDeactive();
				console.log(callback)
			},
			error: function () {
				loadingDeactive();
			}
		});
	} else if (target == 'upgradeMember') {
		//FIXME need upgrade member API link
		var cat_name = dd.memberCatName;
		var place_id = dd.placeId;
		var cat_price = dd.memberPrice;
		var cat_id = dd.catID;
		var oldMemberCat = dd.oldMemberCat;
		delete dd.memberCatName;
		delete dd.placeId;
		delete dd.memberPrice;
		delete dd.catID;
		$.ajax({
			url: urlService + '/member/join',
			type: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(dd),
			success: function (callback) {
				loadingDeactive();
				switch (callback.responseCode) {
					case "200":
						notification(200, "Success upgrade membership, please proceed to payment page");
						window.location.href = "paymentMethod.html?cat=" + dd.memberCat + "&cat_name=" + cat_name + "&placeId=" + place_id+ "&cat_price=" + cat_price + "&cat_id=" + cat_id+ "&requestCat=upgrade" + "&oldMemberCat=" + oldMemberCat;
						break;
					default:
						alert('msih failed',callback);
						// window.location.href = "paymentMethod.html";
						break;
				}
			},
			error: function () {
				loadingDeactive();
			}
		});
	} else if (target == 'joinMember') {
		var cat_name = dd.memberCatName;
		var place_id = dd.placeId;
		var cat_price = dd.memberPrice;
		var cat_id = dd.catID;
		delete dd.memberCatName;
		delete dd.placeId;
		delete dd.memberPrice;
		delete dd.catID;
		$.ajax({
			url: urlService + '/member/join',
			type: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(dd),
			success: function (callback) {
				loadingDeactive();
				switch (callback.responseCode) {
					case "200":
						notification(200, "Success join membership, please proceed to payment page");
						window.location.href = "paymentMethod.html?cat=" + dd.memberCat + "&cat_name=" + cat_name + "&placeId=" + place_id+ "&cat_price=" + cat_price + "&cat_id=" + cat_id + "&requestCat=join";
						break;
					default:
						alert('msih failed',callback);
						// window.location.href = "paymentMethod.html";
						break;
				}
			},
			error: function () {
				loadingDeactive();
			}
		});
	} else if (target == 'classJoin') {
		$.ajax({
			url: urlService + '/member/act',
			type: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(dd),
			timeout: 7000,
			success: function (callback) {
				loadingDeactive();
				console.log('class join callback',callback);
				switch (callback.responseCode) {
					case "200":
						notification(200, "Success join class");
						setTimeout(() => {
							window.location.href="classSchedule.html";
						}, 500);
						break;
					default:
						notification(500, "failed join class" + callback.responseMessage);
						break;
				}
			},
			error: function () {
				loadingDeactive();
			}
		});
	} else if (target == 'bodyProgress') {
		let profile = JSON.parse(localStorage.getItem('dataProfile'));
		$.ajax({
			url: urlService + '/member/personalRecord/' + profile.data.accessToken,
			type: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(dd),
			timeout: 7000,
			success: function (callback) {
				loadingDeactive();
				console.log('body progress',callback);
				switch (callback.responseCode) {
					case "200":
						notification(200, "Success create body progress record");
						window.location.href="bodyProgress.html";
						break;
					default:
						notification(500, "failed create body progress record" + callback.responseMessage);
						break;
				}
			},
			error: function () {
				loadingDeactive();
			}
		});
	} else {
		let link = "";
		switch (data.filter) {
			case "memberRegister":
				link = urlService + "/register"
				break;
		}
		$.ajax({
			url: link,
			crossDomain: true,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"Host": "localhost:8888",
			},
			timeout: 7000,
			data: JSON.stringify(dd),
			success: function (callback) {
				loadingDeactive();
				// var json = JSON.parse(callback);
				// console.log("check json ==>", json)
				// console.log(dd.filter);
				if (dd.filter == 'resendCode' || dd.filter == 'memberRegister' || dd.filter == 'trainerRegister') {
					console.log(callback);
					switch (callback.responseCode) {
						case "200":
							let content = '<input type="text" class="form-control" id="otpCode">' +
								"<b><small style='color:#fff;'>Your verification code has been send in your email address, Please check your email, and verify your account</small></b>"
							callModal(content);

							console.log(callback)
							// alert();	
							break;
						case "406":
							alert(callback.responseMessage);
							break;
					}
					// if(callback.response == 200){
					// 	notification(json.response,"Please check your inbox mail, to have your verification code");
					// 	getPage('.container-wrap','verification',json.dataId);
					// }else{
					// 	notification(json.response,json.reason);
					// }
				} else if (dd.filter == 'confirmCode') {
					$.each($(json), function (i) {
						localStorage.setItem("userId", json[i].id);
						localStorage.setItem("userName", json[i].name);
					});
					window.location.href = 'profile.html';
				} else if (dd.filter == 'profileUser') {
					$('#imgProfile').submit();
				} else if (dd.filter == 'getProfile') {
					var gc = '';
					$.each($(json), function (i) {
						if (json[i].gender == 1) {
							gc = '<option value="' + json[i].gender + '">Male</option>' +
								'<option value="2">Female</option>';
						} else {
							gc = '<option value="' + json[i].gender + '">Female</option>' +
								'<option value="1">Male</option>';
						}
						$('#gender').empty();
						$('#gender').append(gc);
						$('#phone').val(json[i].phone);
						$('#address').val(json[i].address);
						$('#dvPreview').attr("src", json[i].imgProfile).css({
							'width': '90px',
							'height': '90px'
						});
						console.log(json);
					});
					if ($('#name').val() != '' && $('#gender option:selected').val() != '' &&
						$('#phone').val() != '' && $('#address').val() != '') {
						$('#updateProfile').remove();
						$('#skipNav').find('span').html("Let's Go");
					}
					if ($('#classHistoryPage').length > 0) {
						$.each($(json), function (i) {
							$('#userName').html(json[i].name);
							$('#imgUser').attr("src", json[i].imgProfile).css({
								'width': '90px',
								'height': '90px'
							});
						});
					}
				}
				setTimeout(function () {
					if ($(".sweet-alert").length > 0) {
						swal.close();
					}
				}, 950);
			},
			error: function () {
				loadingDeactive();
			}
		});

	}
}

function appendToBody(page, toDo) {
	if (toDo !== '' && toDo !== undefined && toDo !== null) {
		// $("body").load(page, function(responseData){
		// 	toDo();
		// })
		window.location.href = page;
		$('#classListPage').ready(function () {
			alert('woe onok ga');
			toDo();
		})
	}
}

function select2Activated() {
	$(".select2").select2({
		placeholder: 'Select Here'
	});
	$(".tags").select2({
		tags: true,
		tokenSeparators: [','],
		placeholder: 'Select Here'
	});
	$('.select2').css({
		"width": "100%"
	});
}

function getPageWithData(target, toDo) {

	$.ajax({
		url: target + '.html',
		success: function (response) {
			document.documentElement.innerHTML = '';
			$('html').html();
			$('html').html(response);
			// $(location).attr('href', url);
			setTimeout(() => {
				if (toDo !== '' && toDo !== undefined && toDo !== null) {
					toDo();
				}
			}, 500);

		}
	});
	// $(location).attr('href', target+'.html');
	// console.log('after load');
	// if(toDo !== '' && toDo !== undefined && toDo !== null){
	// 	console.log('after load agi');
	// 	toDo();
	// }
}

function getPage(dom, target, param) {
	if (dom != '') {
		$.ajax({
			url: target + '.html',
			success: function (response) {
				$(dom).empty();
				$(dom).html();
				$(dom).html(response);
				if (target == 'forgotPassword') {
					controlBackBtn('login');
				}
				if (target == 'verification') {
					$('.container-wrap').css({
						'margin-top': '60%'
					});
					$('#resendCode').attr('data-id', param);
					$('#confirmCode').attr('data-id', param);
					controlBackBtn('login');
				}
				loadingDeactive();
			}
		});
	} else {
		window.location.href = target + '.html';
	}
}

function dataTablleActivated() {
	$('.dataTable').dataTable();
}