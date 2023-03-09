var date = "";
var time = "";
var from = "";
var TMP_InjectIntrvl = "";
var TMP_ATTCHARR = {};
var TMP_LoggedIN_Phone = "";
var loaderURL = chrome.runtime.getURL("images/loader.gif");
var iconURL = chrome.runtime.getURL("images/export32.png");
var crossURL = chrome.runtime.getURL("images/icon-close.png");
var errorURL = chrome.runtime.getURL("images/icon-import-error");

var parserBox = '<div class="_SCIP-3JXTQ" role="button">\
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="24px" viewBox="0 0 25 24" version="1.1">\
									<g id="surface1">\
									<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0.392157%,65.098039%,85.490196%);fill-opacity:1;" d="M 0 0 L 0 11.429688 C 3.796875 9.421875 3.976562 6.835938 3.976562 2.855469 C 7.382812 2.855469 9.734375 2.902344 11.933594 0 Z M 0 0 "/>\
									<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0.392157%,0.392157%,0.392157%);fill-opacity:1;" d="M 3.976562 2.855469 C 3.972656 6.472656 3.609375 8.628906 0.566406 10.855469 C 2.828125 14.136719 3.972656 15.941406 3.976562 20 L 12.5 22.171875 L 21.023438 20 C 21.027344 16.320312 21.457031 14.355469 24.433594 12 L 21.023438 2.855469 L 12.5 0.523438 Z M 3.976562 2.855469 "/>\
									<path style=" stroke:none;fill-rule:nonzero;fill:rgb(33.333333%,72.54902%,27.843137%);fill-opacity:1;" d="M 13.636719 0 C 15.699219 2.722656 17.789062 2.855469 21.023438 2.855469 C 21.027344 6.816406 21.671875 9.042969 25 11.429688 L 25 0 Z M 13.636719 0 "/>\
									<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0.392157%,65.098039%,85.490196%);fill-opacity:1;" d="M 12.5 11.429688 C 12.429688 9.210938 10.300781 2.96875 7.011719 5.519531 C 3.273438 8.417969 10.34375 11.359375 12.5 11.429688 Z M 12.5 11.429688 "/>\
									<path style=" stroke:none;fill-rule:nonzero;fill:rgb(33.333333%,72.54902%,27.843137%);fill-opacity:1;" d="M 12.5 11.429688 C 14.65625 11.359375 21.726562 8.417969 17.988281 5.519531 C 14.699219 2.96875 12.570312 9.210938 12.5 11.429688 Z M 12.5 11.429688 "/>\
									<path style=" stroke:none;fill-rule:nonzero;fill:rgb(89.019608%,38.823529%,28.627451%);fill-opacity:1;" d="M 0 11.429688 L 0 24 L 12.5 24 C 10.679688 20.121094 7.847656 20 3.976562 20 C 3.976562 16.109375 3.859375 13.257812 0 11.429688 M 12.5 11.429688 C 10.292969 11.5 4.089844 13.640625 6.625 16.949219 C 9.503906 20.707031 12.429688 13.597656 12.5 11.429688 Z M 12.5 11.429688 "/>\
									<path style=" stroke:none;fill-rule:nonzero;fill:rgb(93.333333%,63.529412%,12.54902%);fill-opacity:1;" d="M 12.5 11.429688 C 12.570312 13.597656 15.496094 20.707031 18.375 16.949219 C 20.910156 13.640625 14.707031 11.5 12.5 11.429688 M 24.433594 11.429688 C 21.328125 14.054688 21.023438 16.066406 21.023438 20 C 17.152344 20 14.320312 20.121094 12.5 24 L 25 24 Z M 24.433594 11.429688 "/>\
									</g>\
									</svg>\
									</span>\
									</div>';


var chatBoxHtml = '<div id="saveScipBox">\
										<div class="crossBttnBox">\
											<a href="javascript:void(0);" id="crossBttn" class="valueTxt">x</a>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">To:</label>\
											<label id="toPhone" class="valueTxt">+91123xxxx890</label>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">From:</label>\
											<label id="fromPhone" class="valueTxt">+91123xxxx890</label>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">From Name:</label>\
											<label id="fromName" class="valueTxt">John Doe</label>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Date Time:</label>\
											<label id="dateTime" class="valueTxt">12/12/2022 10:12AM</label>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Message:</label>\
											<label id="message" class="valueTxt">Hello world</label>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Attachments:</label>\
											<ul class="attachmentsBox">\
												<li id="attachPreview" class="attach-preview"></li>\
												<li id="addAttachment" class="addAttachment">Add Attachment +</li>\
												<input type="file" id="fileUpload" style="opacity: 0; height: 0px; width: 0px;"/>\
											</ul>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Note:</label>\
											<textarea id="note" class="valueTxt" placeholder="Please type to enter note"></textarea>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Name of Deal:</label>\
											<input type="text" id="dealName" class="valueTxt" placeholder="Please enter the deal name"/>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Deal Type:</label>\
											<select id="dealType" class="valueTxt select-dropdown">\
													<option value="">Select the deal type</option>\
													<option value="new deal">New Deal</option>\
													<option value="existing deal">Existing Deal</option>\
												</select>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Deal Source:</label>\
											<select id="dealSource" class="valueTxt select-dropdown">\
													<option value="">Select the deal source</option>\
													<option value="investor">Investor</option>\
													<option value="incubator">Incubator</option>\
													<option value="accelerator">Accelerator</option>\
													<option value="hackathon">Hackathon</option>\
													<option value="co-investment">Co-investment</option>\
												</select>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Deal Action:</label>\
											<select id="dealAction" class="valueTxt select-dropdown">\
													<option value="">Select the deal action</option>\
													<option value="send to apply">Send to apply</option>\
													<option value="evaluate">Evaluate</option>\
													<option value="scoring">Scoring</option>\
													<option value="workflow">Workflow</option>\
													<option value="reject">Reject</option>\
												</select>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Industry:</label>\
											<input type="text" id="dealIndustry" class="valueTxt" placeholder="Please type to enter Industry"/>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Technology:</label>\
											<input type="text" id="dealTechnology" class="valueTxt" placeholder="Please type to enter Technology"/>\
										</div>\
										<div class="fieldList">\
											<label class="labelTxt">Revenue Model:</label>\
											<input type="text" id="revenueModel" class="valueTxt" placeholder="Please type to enter Revenue Model"/>\
										</div>\
										<div class="fieldList">\
											<a id="saveButton" href="javascript:void(0);"> <span class="loader" style="display:none;"></span> <span class="btn-save-text">Save</span></a>\
										</div>\
										<span id="success_msg" style="display:none;color:green;">Message saved to SCIP successfully</span>\
										<span id="error_msg" style="display:none;color:red;">Try again later</span>\
										<span id="attech_error_msg" style="display:none;color:red;">Try again later</span>\
									</div>';


/*
#side #pane-side ._3uIPm.WYyr1 .ln8gz9je.rx9719la
#main copyable-area .message-in ---> attr(data-id) to get phone no
#main copyable-area .message-in .cvjcv .Nm1g1._22AX6 .copyable-text ---> attr(data-pre-plain-text) to get date time name


#main copyable-area .message-in .cvjcv .Nm1g1._22AX6 .copyable-text .g0rxnol2.ln8gz9je.ppled2lx ---> attr(data-testid) == "media-url-provider"

#main copyable-area .message-in .cvjcv ._3JXTQ ----> add scip save icon
*/

$(function(){

	//alert("extension load");

	setTimeout(function(){
		//$("head").append('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
		//$("head").append('<meta http-equiv="Content-Security-Policy" content="default-src * self blob: data: gap:; style-src * self \'unsafe-inline\' blob: data: gap:; script-src * \'self\' \'unsafe-eval\' \'unsafe-inline\' blob: data: gap:; object-src * \'self\' blob: data: gap:; img-src * self \'unsafe-inline\' blob: data: gap:; connect-src self * \'unsafe-inline\' blob: data: gap:; frame-src * self blob: data: gap:;">');

		var last_wid_md = localStorage.getItem('last-wid-md');
		var last_wid_mdPrts = last_wid_md.split(":");

		TMP_LoggedIN_Phone = last_wid_mdPrts[0].replace('"','');

		//alert("TMP_LoggedIN_Phone:" + TMP_LoggedIN_Phone);

	}, 1000);

	setTimeout(function(){

		addScrapWindow();

	}, 5000);


	$('body').on('click', '#crossBttn', function(){
		closeForm();
	});


	$('body').on('click', '#saveButton', function(){
		sendWhatsAppData(0);
	});


});


function closeForm(){


	TMP_ATTCHARR = {};
	$("#toPhone").text("");
	$("#fromPhone").text("");
	$("#fromName").text("");
	$("#dateTime").text("");
	$("#message").text("");
	$("#note").val("");
	$("#dealName").val("");
	$("#dealType").val("");
	$("#dealSource").val("");
	$("#dealAction").val("");
	$("#dealIndustry").val("");
	$("#dealTechnology").val("");
	$("#revenueModel").val("");
	$(".tagit-choice").remove();
	$("#saveScipBox").fadeOut("fast","swing");

}

function initTagit(){

		var sampleTags = [];

    $("#dealIndustry").tagit({
        availableTags: sampleTags
    });

		$("#dealTechnology").tagit({
        availableTags: sampleTags
    });

    $("#revenueModel").tagit({
        availableTags: sampleTags
    });

}

function injectButtonToNewMsg(){

		var messageInElms = $("#main .copyable-area").find(".message-in");

		if($(messageInElms).length > 0){

				$(messageInElms).each(function(idx, msgInElm){

					if($(msgInElm).hasClass("SCIPMSGIN") == false){

							var tmpElmId = getUniqeId();
							//var cvjcvElm = $(msgInElm).find(".cvjcv");
							var cvjcvElm = $(msgInElm).find(".p357zi0d._1m68F");
							
							$(cvjcvElm).append(parserBox);
							$(msgInElm).addClass("SCIPMSGIN");
							$(msgInElm).attr("id", tmpElmId);
							$(msgInElm).css({"position": "relative"});

							setTimeout(function(){
								//$('._SCIP-3JXTQ').parent().css("position","relative");

								var scipBttnElm = $(msgInElm).find("._SCIP-3JXTQ");
								//$(scipBttnElm).parent().css("position","relative");

								$(scipBttnElm).on('click', function(){
										getAttachments(msgInElm);

								});

							}, 200);

					}

				});

				//add save chat box
				if($("#saveScipBox").length == 0){
					//$("footer._2cYbV").prepend(chatBoxHtml);
					$("._2gzeB").after(chatBoxHtml);
					setTimeout(function(){
						$("#toPhone").removeAttr('disabled');
					}, 500);
				}
		}

}


function injectButton(){

	//alert(1);

	setTimeout(function(){
			//alert(2);
			var messageInElms = $("#main .copyable-area").find(".message-in");


			//alert("$(messageInElms).length:" + $(messageInElms).length);




			if($(messageInElms).length > 0){

					$(messageInElms).each(function(idx, msgInElm){

						//console.log("msgInElm:");
						//console.log(msgInElm);

						if($(msgInElm).hasClass("SCIPMSGIN") == false){

							var tmpElmId = getUniqeId();


							//p357zi0d ktfrpxia nu7pwgvd fhf7t426 sap93d0t gndfcl4n _1m68F	

							//tvf2evcx m0h2a7mj lb5m6g5c j7l1k36l ktfrpxia nu7pwgvd gjuq5ydh rqm6ogl5 i5tg98hk folpon7g przvwfww snweb893


							//p357zi0d ktfrpxia nu7pwgvd fhf7t426 sap93d0t gndfcl4n _1m68F
							//tvf2evcx m0h2a7mj lb5m6g5c j7l1k36l ktfrpxia nu7pwgvd gjuq5ydh rqm6ogl5 i5tg98hk folpon7g przvwfww snweb893



							//var cvjcvElm = $(msgInElm).find(".cvjcv");
							var cvjcvElm = $(msgInElm).find(".p357zi0d._1m68F");
							
							$(cvjcvElm).append(parserBox);
							$(msgInElm).addClass("SCIPMSGIN");
							$(msgInElm).attr("id", tmpElmId);
							$(msgInElm).css({"position": "relative"});
							

							setTimeout(function(){
								//$('._SCIP-3JXTQ').parent().css("position","relative");

									var scipBttnElm = $(msgInElm).find("._SCIP-3JXTQ");
									//$(scipBttnElm).parent().css("position","relative");

									$(scipBttnElm).on('click', function(){
											getAttachments(msgInElm);

									});

							}, 200);

						}

					});

					//add save chat box
					if($("#saveScipBox").length == 0){
						//$("footer._2cYbV").prepend(chatBoxHtml);
						$("._2gzeB").after(chatBoxHtml);
						setTimeout(function(){
							$("#toPhone").removeAttr('disabled');
						}, 500);
				 	}

					// first clear prev interval if any
					clearInterval(TMP_InjectIntrvl);

					TMP_InjectIntrvl = setInterval(function(){
						injectButtonToNewMsg();
					}, 1000);

			}

	}, 2000);
}

function getUniqeId(isNow){
	var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
	if(isNow != undefined && isNow == 1){
			return Date.now();
	}else{
			return timeStampInMs;
	}
	//console.log(timeStampInMs, Date.now());
}


function addScrapWindow(){

		//alert("addScrapWindow");

		var chatListElmsIntrvl = setInterval(function(){

		var chatListElms = $("#side #pane-side ._3uIPm.WYyr1 .ln8gz9je.rx9719la");


		console.log("chatListElms:" + $(chatListElms).length);

		if($(chatListElms).length > 0){

			clearInterval(chatListElmsIntrvl);

			$(chatListElms).each(function(idx, vlElm){
				console.log("idx:"+idx);
				console.log(vlElm);

				$(vlElm).on('click', function(){
						injectButton();

				});

			});
		}

	}, 1000);

}


function upload(event){
	//TMP_ATTCHARR
	var files = event.target.files;
	console.log('files');
	console.log(files);

	var file = files[0];
	var fileName = file.name;
	var fileSize = file.size;
	var fileType = file.type;

	var tmpId = getUniqeId(1);
	var prgId = tmpId+"_attch";
	var attchClsId = tmpId+"_attchClose";
	var progressBarHtml = '<span class="attachSpan" id="'+prgId+'" >\
	<progress class="progressBar" value="0" max="100" style="width:70%;"></progress>\
	<a href="JavaScript:void(0);" id="'+attchClsId+'" class="removeAttach">x</a>\
	<span class="fileNameSpan">'+fileName+'</span></span>';
	$('#attachPreview').append(progressBarHtml);

	setTimeout(function(){

		var reader = new FileReader(); // Creating reader instance from FileReader() API

		reader.onload = function (event) {
			 //demoImage.src = reader.result;
			 var fileBs64Data = reader.result;
			 var percent = (event.loaded / event.total) * 100;
		   $("#"+prgId+" .progressBar").val(Math.round(percent));

			 //removeAttach
			 $("#"+attchClsId).on('click', function(){
				 removeAttcment(attchClsId);
			 });

			 console.log("prgId:"+ prgId +" , "+ $("#"+prgId+" .progressBar").val() + "percent:"+percent);

			 TMP_ATTCHARR[prgId] = {"fileName":fileName, "fileSize":fileSize, "fileType":fileType, "fileBs64Data":fileBs64Data};

			 console.log('TMP_ATTCHARR');
			 console.log(TMP_ATTCHARR);


		}


		reader.readAsDataURL(file);

	},1000);
}

function removeAttcment(attchClsId){

	var attchClsIdprts =  attchClsId.split("_");
	var arrKy  = attchClsIdprts[0] + "_attch";

	$("#"+arrKy).remove();

	//TMP_ATTCHARR.splice(arrKy, 1);

	delete TMP_ATTCHARR[arrKy];

	console.log('TMP_ATTCHARR');
	console.log(TMP_ATTCHARR);
}



function sendWhatsAppData(FOLDERIDPARAM){
        
		var toPhone = $("#toPhone").text();
		var fromPhone = $("#fromPhone").text();
		var fromName = $("#fromName").text();
		var dateTime = $("#dateTime").text();
		var message = $("#message").text();
		var note = $("#note").val();

		var dealName = $("#dealName").val();
		var dealType = $("#dealType").val();
		var dealSource = $("#dealSource").val();
		var dealAction = $("#dealAction").val();
		var dealIndustry = $("#dealIndustry").val();
		var dealTechnology = $("#dealTechnology").val();
		var revenueModel = $("#revenueModel").val();

		var attachments = [];
		if(TMP_ATTCHARR != null && TMP_ATTCHARR != '' && TMP_ATTCHARR != undefined){

				$.each(TMP_ATTCHARR, function(idx, vl){

						attachments.push(vl);
				});

		}

		$(".loader").show();
		$(".btn-save-text").hide();


		setTimeout(function(){



		var requestUrl = "http://zoho.krescentglobal.com/whatsapp/waextension.php";

		var requestUrl = "https://whatsapp.scip.co/whatsapp/waextension.php";
	//actualDownloadUrl
		$.ajax({
			url:requestUrl,
			data:{
					"folderId":FOLDERIDPARAM,
					"PURPOSE":"MESSAGEBODY",
					"toPhone":toPhone,
					"fromPhone":fromPhone,
					"fromName":fromName,
					"dateTime":dateTime,
					"message":message,
					"note":note,
					"dealName":dealName,
					"dealType":dealType,
					"dealSource":dealSource,
					"dealAction":dealAction,
					"dealIndustry":dealIndustry,
					"dealTechnology":dealTechnology,
					"revenueModel":revenueModel
					//"attachments": attachments
				},
			dataType:"JSON",
			type:"POST",
			crossDomain: true,
			success: function(resp){
                  
                  $(".loader").hide();
                  $(".btn-save-text").show();
                 

                 
				// alert("Message saved to SCIP successfully");
				//console.log("resp");
				//console.log(resp);
					//post attachments one by one in sequence
					//return false;

					if(resp.C == 100){

							var tmpResp = resp.R;

							if(attachments != '' && attachments != null && attachments.length > 0){

								var initIdx = 0;

								var folderId = tmpResp.folderId;
								var rowId = tmpResp.id;

								sendAttachments(attachments, 0, folderId, rowId);
							}else{
								 $('#success_msg').show();

								 setTimeout(function(){
								 	$('#success_msg').hide();
								 	closeForm();
								 },2000);
							}
					}else{

						//alert("error");
						$('#error_msg').show();

					}



			},
			error: function(p1, p2, p3){

				console.log("p1");
				console.log(p1);
				console.log("p2");
				console.log(p2);
				console.log("p3");
				console.log(p3);

				$(".loader").hide();

                $('#error_msg').show();
				

			}


		});

}, 3000);

}

function sendAttachments(attachments, arrIdx, folderId, rowId){

	var arrLastIdx = attachments.length - 1;

	if(arrIdx > -1 && (arrIdx <= arrLastIdx)){

			var tmpAttch = attachments[arrIdx];

			console.log("tmpAttch");
			console.log(tmpAttch);

			var requestUrl = "https://whatsapp.scip.co/whatsapp/waextension.php";

			$.ajax({
				url:requestUrl,
				dataType:"JSON",
				type:"POST",
				crossDomain: true,
				data:{
						"folderId":folderId,
						"id":rowId,
						"PURPOSE":"ATTACHMENTS",
						"attachment": tmpAttch
					},
					success:function(attchRsp){
							console.log("attchRsp:");
							console.log(attchRsp);
							var nwArrIdx = arrIdx + 1;
							sendAttachments(attachments, nwArrIdx, folderId, rowId);
					},
					error: function(p1, p2, p3){

						console.log("p1");
						console.log(p1);
						console.log("p2");
						console.log(p2);
						console.log("p3");
						console.log(p3);

                        $('#attech_error_msg').show();
						//alert("Try again later");

					}


					});
	}else{
		$('#success_msg').show();
		setTimeout(function(){
		 	$('#success_msg').hide();
		 	closeForm();
		 },2000);
	}

}



window.addEventListener("DOMNodeInserted", function(event) {


		if($(event.target).parent()[0].className == "aCi"){

			var parentElms =  $(event.target).parents();
			//console.log("parentElms");
			//console.log(parentElms);

			date = $(event.target).parents().eq(7).find('.g3').attr('title');
           	date = date.replace(" at ", " ");

           	console.log("date:");
           	console.log(date);


			subject = $(event.target).parents().eq(17).children(1).find(".hP").text();

			console.log("subject:");
			console.log(subject);

			to = $(event.target).parents().eq(7).find('.g2').attr("email");
			var recipientsElm = $(event.target).parents().eq(7).find('.g2');

			console.log("recipientsElm");
			console.log(recipientsElm);

			$(recipientsElm).each(function(idx, vl){

				var tmpToEml =  $(vl).attr("email");

				recipientsArr.push(tmpToEml);

			});


			setTimeout(function(){

				console.log("recipientsArr:");
				console.log(recipientsArr);

			},500);


			fromEmail = $(event.target).parents().eq(7).find('.gD').attr("email");
			console.log("fromEmail:");
			console.log(fromEmail);

			fromName = $(event.target).parents().eq(7).find('.gD').attr("name");
			console.log("fromName:");
			console.log(fromName);



			//BODY FROM the REPLY MESSAGE
			//gs
	        var bodyElm = $(event.target).parents().eq(7).find('.aHl').parent();

	        body = $(bodyElm).find('.a3s.aiL').text();

	        //PREVIOUS THREAD MESSAGES OPTIONAL
			//var body = body + $(event.target).parents().eq(11).find('.gmail_extra').text();

			console.log("body:");
			console.log(body);

		}

 });



function getAttachments(elm){

	console.log('elm');
	console.log(elm);

	/*
	#side #pane-side ._3uIPm.WYyr1 .ln8gz9je.rx9719la
	#main copyable-area .message-in ---> attr(data-id) to get phone no
	#main copyable-area .message-in .cvjcv .Nm1g1._22AX6 .copyable-text ---> attr(data-pre-plain-text) to get date time name
	*/


	var DataIdAttr = $(elm).attr('data-id');
	var DataIdAttrArr = DataIdAttr.split('@');

	var zeroStr = DataIdAttrArr[0];
	var zeroStrPrts = zeroStr.split('_');
	var fromPhone = zeroStrPrts[1];
	var toPhone = TMP_LoggedIN_Phone;
	var copyableTextElm = $(elm).find('.copyable-text');
	var metaInfo = $(copyableTextElm).attr('data-pre-plain-text');
	if(metaInfo != null && metaInfo != undefined && metaInfo != ''){
	 	//[10:41 am, 14/06/2022] +91 98888 46153:
		var metaInfoPrts = metaInfo.split("]");

		var dtTimeStr = metaInfoPrts[0];
		dtTimeStr = dtTimeStr.replace("[", "");

		var fromName = metaInfoPrts[1];
	}else{

		var msgMetaElm = $(elm).find(`div[data-testid="msg-meta"]`);
		var dtTimeStr = $(msgMetaElm).text();
		var fromName = fromPhone;
	}

	fromName = fromName.replace(" ", "");
	fromName = fromName.replace(":", "");

	var msgContElm = $(elm).find('.copyable-text.selectable-text');
	var messageContent = $(msgContElm).text();

	$("#fromPhone").text(fromPhone);
	$("#fromName").text(fromName);
	$("#toPhone").text(toPhone);
	$("#message").text(messageContent);
	$("#dateTime").text(dtTimeStr);
	$("#attachPreview").text();

	initTagit();

	$('#saveScipBox').fadeIn("fast","swing");

	$('#addAttachment').on('click', function(){
			//alert('add attchmnt');
			$('#fileUpload').val('');
			$('#fileUpload').trigger("click");
	});

	$('#fileUpload').on('change', function(e){
			upload(e);
	});






	var mediaUrlProvider = $(elm).find(`div[data-testid='media-url-provider']`);

	if(mediaUrlProvider.length > 0 && mediaUrlProvider != '' && mediaUrlProvider != null){

		var mediaImgs = $(mediaUrlProvider).find(`img`);

		if(mediaImgs.length > 0 && mediaImgs != '' && mediaImgs != null){

			$(mediaImgs).each(function(idx, mediaImg){

					var tmpSrc = $(mediaImg).attr('src');

					if(tmpSrc != null && tmpSrc != "" && tmpSrc != undefined){

						var srcIdx = tmpSrc.indexOf("blob:https://web.whatsapp.com/");

						if(srcIdx > -1){

							var attchUrl = tmpSrc;

							if(attchUrl != null && attchUrl != "" && attchUrl != undefined){

								toDataURL(attchUrl, function(dataUrl) {

									console.log("dataUrl");
									console.log(dataUrl);

								});

							}

					}
					}

			});

		}


	}


/*

	var aCiElm = $("body").find('.aCi');

	var bodyElm = $(aCiElm).parents().eq(7).find('.aHl').parent();

	//Get attachments
	var attachmentsContainerElm = $(bodyElm).find('.hq.gt');

	var aQHElmnt = $(attachmentsContainerElm).find('.aQH');


	var aZoElemnts = $(aQHElmnt).find('.aZo');

	//console.log('aZoElemnts:');
	//console.log(aZoElemnts);

	if(aZoElemnts != null && aZoElemnts != undefined){

		$.each(aZoElemnts, function(idx, vl){

			//console.log("vl:");
			//console.log(vl);


			var classNameList = $(vl).attr('class');

			//console.log("classNameList:");
			//console.log(classNameList);


			var downloadUrl = $(vl).attr('download_url');
			//console.log("downloadUrl:");
			//console.log(downloadUrl);

			var aTag = $(vl).children('a')[0];
			var downloadableAttachment = 0;
			var attachmentType = "";

			if(downloadUrl != null && downloadUrl != undefined && downloadUrl != ""){

				var downloadUrlParts = downloadUrl.split(":");

				attachmentType = downloadUrlParts[0];


				//console.log("downloadUrlParts:");
				//console.log(downloadUrlParts);

				var tmpDownloadUrlParts = downloadUrlParts;
				tmpDownloadUrlParts = tmpDownloadUrlParts.splice(0, 1);

				//console.log("downloadUrlParts:");
				//console.log(downloadUrlParts);

				downloadUrlParts.splice(0, 1);
				var tmpDownloadUrl = downloadUrlParts.join(":");
				//console.log("tmpDownloadUrl:"+tmpDownloadUrl);



				if(attachmentType != null && attachmentType != undefined && attachmentType != ""){

					attachmentType = attachmentType.toLowerCase();

					if(attachmentType == "image/jpeg" || attachmentType == "image/png"){
						//image file
						downloadableAttachment = 1;
						AttachmentsArr.push({"attachmentType":attachmentType, "downloadUrl":tmpDownloadUrl, "actualDownloadUrl":downloadUrl});
					}else if(attachmentType == "video/mp4" || attachmentType == "audio/mpeg"){
						//audio or video file
						downloadableAttachment = 1;
						AttachmentsArr.push({"attachmentType":attachmentType, "downloadUrl":tmpDownloadUrl});
					}else if(attachmentType == "application/pdf" || attachmentType == "text/plain" || attachmentType == "text/csv"){
						//pdf , csv or text/plain file
						downloadableAttachment = 1;
						AttachmentsArr.push({"attachmentType":attachmentType, "downloadUrl":tmpDownloadUrl});
					}else if(attachmentType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
						//doc file
						downloadableAttachment = 1;
						AttachmentsArr.push({"attachmentType":attachmentType, "downloadUrl":tmpDownloadUrl, "actualDownloadUrl":downloadUrl});
					}else if(attachmentType == "application/vnd.openxmlformats-officedocument.presentationml.presentation"){
						//ppt file
						downloadableAttachment = 1;
						AttachmentsArr.push({"attachmentType":attachmentType, "downloadUrl":tmpDownloadUrl, "actualDownloadUrl":downloadUrl});
					}else if(attachmentType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
						//xls or spreadsheet file
						downloadableAttachment = 1;
						AttachmentsArr.push({"attachmentType":attachmentType, "downloadUrl":tmpDownloadUrl, "actualDownloadUrl":downloadUrl});
					}
				}





			}else{


				var hrefLink = $(aTag).attr('href');

				//console.log("hrefLink:");
				//console.log(hrefLink);

				AttachmentsArr.push({"attachmentType":"youtube", "downloadUrl":hrefLink, "actualDownloadUrl":hrefLink});

			}


			//console.log("attachmentType:");
			//console.log(attachmentType);



		});


	}

*/
}


function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}



function getAttachmentContent(attchArr, idx, callBk){

	var attchArrVl = attchArr[idx];

	var attchUrl = attchArrVl.downloadUrl;
	var actualDownloadUrl = attchArrVl.actualDownloadUrl;
	var attachmentType = attchArrVl.attachmentType;


	if(attchUrl != null && attchUrl != "" && attchUrl != undefined){


		toDataURL(attchUrl, function(dataUrl) {

			var returnObj = {"attachmentType":attachmentType, "downloadUrl":dataUrl, "actualDownloadUrl":actualDownloadUrl};
			return callBk(returnObj);

		});

	}
}

/*

 window.addEventListener("DOMNodeInserted", function(event) {
       //TEST TO SEE WHERE CSS IS AT
        // $(event.target).append($(event.target).parent()[0].className);
        if($(event.target).parent()[0].className == 'oc gU')
        {

            //ADD SEND BUTTON FOR MESSAGES
            //SUBJECT OF ENTIRE EMAIL GLOBAL
            var subject = $(event.target).parents().eq(28).children(1).find(".hP").text();

            //GET DATA EMAIL AND NAME
            //Can assign via id or data-name and jid for email
            var imageid = $(event.target).parents().eq(18).find("img[jid]").attr("id");

           //THIS IS THE SEND BUTTON IN REPLAY ADD A BUTTON NEXT TO IT WITH THIS
           $(event.target).parents().eq(1).find(".gU.Up").children(0).append("addbuttonid here");
           //set click event for button
            //$('#'+addbuttonid).click(function(){
                //TO DO HERE
                //BODY FROM the REPLY MESSAGE
                var body = $(event.target).parents().eq(11).find('.Am').text();
                //PREVIOUS THREAD MESSAGES OPTIONAL
                var body = body + $(event.target).parents().eq(11).find('.gmail_extra').text();

            //});


        }
        else if($(event.target).parent()[0].className == "aCi")
        {
           //THREAD MESSAGE
           //GET EMAIL SUBJECT
           var subject = $(event.target).parents().eq(17).children(1).find(".hP").text();
           //GET TO INFO
           var to = $(event.target).parents().eq(7).find('.g2');
           //GET NAME AND EMAIL
           var imageid = $(event.target).parents().eq(7).find("img[jid]").attr("id");
           var value = $("#\\"+imageid).attr("jid");
           var vname = $("#\\"+imageid).attr("data-name");
           //GET DOCUMENT BODY
           var tmp = $(event.target).parents().eq(6).find(".gs");
           var body = tmp.text();

           //GET DOCUMENT DATE
           var date = $(event.target).parents().eq(7).find('.g3').attr('title');
           date = date.replace(" at ", " ");
           //ADD THE BUTTONS HERE WITH INITIAL VALUES
            $(event.target).parents().eq(6).append('addbutton2');

            //$("#"+addbutton2).click(function(event){
                var email = $("#\\"+$(this).attr("data-imageid")).attr("jid");
                var name = $("#\\"+$(this).attr("data-imageid")).attr("data-name");
                var body = $(this).attr("data-body");
                //TOD FOR BUTTON NEXT TO REPLY ICON ON THREAD AS OPENED

            //});

        }
});*/
