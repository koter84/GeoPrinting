// ==UserScript==
// @name         GeoPrinting
// @version      2.0.2
// @author       Dennis Koot
// @copyright    2015, Dennis Koot
// @namespace    http://denniskoot.nl
// @license      GPLv3
// @description  Make a better looking print-page on geocaching.com from the normal cache page
// @include      http://www.geocaching.com/geocache/*
// @include      http://www.geocaching.com/seek/cache_details.aspx*
// @oujs:author  koter84
// ==/UserScript==

function setupGeoPrinting() 
{
	doGeoPrinting = function(newValue)
	{
		// remove the print-media css-file
		$('link[media="print"]').remove();
		$('link[media="screen"]').attr('media', 'all');

		// hide the siteHeader
		$('#ctl00_siteHeader').hide();

		// hide the navigation
		$('#Navigation').hide();

		// hide the print and download links
		$('.DownloadLinks').hide();

		// larger coordinates
		$('#uxLatLon').css('font-size', '18pt');

		// hide UTM and other conversions
		$('#ctl00_ContentBody_LocationSubPanel').hide();
		$('#ctl00_ContentBody_lnkConversions').hide();

		// hide the map
		$('#uxlrgMap').hide();

		// hide the NoPrint
		$('.NoPrint').hide();

		// hide part of the informationWidget
		$('.HalfLeft').hide();
		$('.EncryptDecrypt').hide();
		$('div.InformationWidget p.NoBottomSpacing').hide();

		// hide the logs
		$('#cache_logs_container').hide();

		// hide the sidebar
		$('.sidebar').hide();

		// fix the width
		$('.span-9').width('660px');
		$('.span-17').width('100%');

		// move GC-code a little bit down 
		$('#ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoLinkPanel').css('position', 'relative');
		$('#ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoLinkPanel').css('top', '50px')
		$('#ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoLinkPanel').css('margin-top', '-50px');

		// smaller margins so more fits on one page
		$('.Clear').css('margin', '0');
		$('.BottomSpacing').css('margin-bottom', '0');
		$('.CacheInformationTable').css('margin', '0');
		$('.CacheDescriptionHeader').css('margin', '5px 0 0 0');

		// hide the additional hints decryption key
		$('#dk').hide();

		// check if the hint needs to be decrypted
		if( $('#ctl00_ContentBody_lnkDH').attr('title') == "Decrypt")
			$('#ctl00_ContentBody_lnkDH').click();

		// hide the generated time etc.
		$('.timeago').parent().parent().hide();

		// remove the scrollback to top
		$('#topScroll').remove();

		// hide the footer
		$('footer').hide();

		// remove <br/>
		$('br').remove();

		// create a no-geoprint class to show some elements except when printed
		$('head').append('<style>@media print { .no-geoprint { display: none !important; } }</style>');

		// repurpose the disclaimer div
		$('.Disclaimer').addClass('no-geoprint');
		$('.Disclaimer').html('<strong>Extra Options:</strong>&nbsp;&nbsp;');

		// add Show/Hide Images
		if($('.UserSuppliedContent').find("img").length > 0)
		{
			//found an image add the "Hide Image" link
			$('.Disclaimer').append($('<a href="#">Show/Hide Image(s)</a>').click(function (e) {
				e.preventDefault();
				$(".UserSuppliedContent").find("img").toggle();
			}));
			$('.Disclaimer').append('&nbsp;&nbsp;');
		};

		// add Show/Hide Waypoints
		$("#ctl00_ContentBody_WaypointsInfo").parent().css('margin', '15px 0 5px 0');
		$('.Disclaimer').append($('<a href="#">Show/Hide Waypoint(s)</a>').click(function (e) {
			e.preventDefault();
			$("#ctl00_ContentBody_WaypointsInfo").parent().toggle();
			$("#ctl00_ContentBody_Waypoints").toggle();
		}));
		$('.Disclaimer').append('&nbsp;&nbsp;');

		// add Show/Hide Logcounts
		$('.Disclaimer').append($('<a href="#">Show/Hide Logcounts</a>').click(function (e) {
			e.preventDefault();
			$('.InformationWidget').toggle();
		}));
		$('.Disclaimer').append('&nbsp;&nbsp;');

		// default above Show/Hide toggles to hide
		$(".UserSuppliedContent").find("img").hide();
		$("#ctl00_ContentBody_WaypointsInfo").parent().hide();
		$("#ctl00_ContentBody_Waypoints").hide();
		$('.InformationWidget').hide();

		// add print-link
		$('.Disclaimer').append($('<a href="#" style="float: right;">Print</a>').click(function (e) {
			e.preventDefault();
			print();
		}));

		$('.Disclaimer').show();
	}

	// insert a GeoPrint-link non-intrusive-style :D
	$('#ctl00_ContentBody_lnkPrintFriendly').after(
		'&nbsp;<a id="geoprinting_link" class="lnk" href="#" onclick="javascript:doGeoPrinting()">' +
			'<span>GeoPrint</span>' +
		'</a>&nbsp;');

	// hide the disclaimer
	$('.Disclaimer').hide();
}

//var jQueryGeoPrinting = document.createElement("script");
//jQueryGeoPrinting.setAttribute("type", "text/javascript");
//jQueryGeoPrinting.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
//document.body.appendChild(jQueryGeoPrinting);

var injectGeoPrinting = document.createElement("script");
injectGeoPrinting.setAttribute("type", "text/javascript");
injectGeoPrinting.appendChild(document.createTextNode("(" + setupGeoPrinting + ")()"));
document.body.appendChild(injectGeoPrinting);
