// -------------------------------------------------------------------------------------------------
//	cSPSettings class
//
//
//
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
//	constructor
// -------------------------------------------------------------------------------------------------
function cSPSettings(
	vDiv
)
{
	this.mDiv = $("#" + vDiv);
	this.mID = vDiv;

	this.mCurrSelection = null;

	// div elements
	this.mDivIndicator = $(this.mDiv.children("#item_indicators").children()[0]);
	this.mDivResetToAP =  $(this.mDiv.children("#setting_group").children()[0]);
	this.mDivResetToAP.pIndicatorStyle = { width: "400px", height: "40px", top: "120px", left: "200px" };
	this.mDivReconnectToWIFI = $(this.mDiv.children("#setting_group").children()[1]);
	this.mDivReconnectToWIFI.pIndicatorStyle = { width: "400px", height: "40px", top: "180px", left: "200px" };
	this.mDivReloadControlPanel = $(this.mDiv.children("#setting_group").children()[2]);
	this.mDivReloadControlPanel.pIndicatorStyle = { width: "400px", height: "40px", top: "230px", left: "200px" };
	this.mDivToggleSSH = $(this.mDiv.children("#setting_group").children()[3]);
	this.mDivToggleSSH.pIndicatorStyle = { width: "400px", height: "40px", top: "280px", left: "200px" };
	$(this.mDivToggleSSH.children()[1]).hide();
	$(this.mDivToggleSSH.children()[2]).hide();
	this.mDivSetTimezone = $(this.mDiv.children("#setting_group").children()[4]);
	this.mDivSetTimezone.pIndicatorStyle = { width: "400px", height: "40px", top: "330px", left: "200px" };
	this.mDivReboot = $(this.mDiv.children("#setting_group").children()[5]);
	this.mDivReboot.pIndicatorStyle = { width: "400px", height: "40px", top: "380px", left: "200px" };
	this.mDivBack = $(this.mDiv.children("#subnavi_action").children()[0]);
	this.mDivBack.pIndicatorStyle = { width: "96px", height: "36px", top: "551px", left: "350px" };
	
	// view modes
	this.mViewMode = null;
	cSPSettings.VIEWMODE_DEFAULT = "viewmode_default";

	this.fInit();
}

// -------------------------------------------------------------------------------------------------
//	singleton
// -------------------------------------------------------------------------------------------------
cSPSettings.instance = null;
cSPSettings.fGetInstance = function(
	vDiv
)
{
	return cSPSettings.instance ? cSPSettings.instance : cSPSettings.instance = new cSPSettings(vDiv);
}

// -------------------------------------------------------------------------------------------------
//	fInit
// -------------------------------------------------------------------------------------------------
cSPSettings.prototype.fInit = function(
)
{
//~ fDbg2("*** cSPSettings, fInit(), ");
	var vThis;
	vThis = this;

	vThis.pViewMode(cSPSettings.VIEWMODE_DEFAULT);
}

/** ------------------------------------------------------------------------------------------------
 *	pViewMode
 * -----------------------------------------------------------------------------------------------*/
cSPSettings.prototype.pViewMode = function(
	vViewMode
)
{
	var vThis;
	vThis = this;

	if (!vViewMode) return vThis.mViewMode;
	
	switch (vViewMode)
	{
	case cSPSettings.VIEWMODE_DEFAULT:
		vThis.mDivResetToAP.css("opacity", "0.2");
		vThis.mDivReconnectToWIFI.css("opacity", "0.2");
		vThis.mDivReloadControlPanel.css("opacity", "0.2");
		vThis.mDivToggleSSH.css("opacity", "0.2");
		vThis.mDivSetTimezone.css("opacity", "0.2");
		vThis.mDivReboot.css("opacity", "0.2");
		vThis.mDivBack.css("opacity", "0.2");
		
		vThis.mCurrSelection = vThis.mDivReconnectToWIFI;
		vThis.mCurrSelection.css("opacity", "1");
		vThis.mDivIndicator.css(vThis.mCurrSelection.pIndicatorStyle);
		
		if (!cModel || !cModel.fGetInstance().CHUMBY_SSH_ENABLED)
		{
			$(vThis.mDivToggleSSH.children()[0]).show();
			$(vThis.mDivToggleSSH.children()[1]).hide();
			$(vThis.mDivToggleSSH.children()[2]).hide();
		}
		else
		{
			$(vThis.mDivToggleSSH.children()[0]).hide();
			$(vThis.mDivToggleSSH.children()[1]).hide();
			$(vThis.mDivToggleSSH.children()[2]).show();
		}
		break;
	}
}

// -------------------------------------------------------------------------------------------------
//	fOnSignal
// -------------------------------------------------------------------------------------------------
cSPSettings.prototype.fOnSignal = function(
	vSignal,		// string
	vData,			// data array
	vReturnFun		// return function call
)
{
//~ fDbg("*** cSPSettings, fOnSignal(), " + vSignal + ", " + vData);
	var vThis, o, i;
	vThis = this;
	
	switch(vSignal)
	{
	case cConst.SIGNAL_TOGGLE_CONTROLPANEL:
		break;
		
	case cConst.SIGNAL_TOGGLE_WIDGETENGINE:
		break;
		
	case cConst.SIGNAL_BUTTON_LEFT:
		break;
		
	case cConst.SIGNAL_BUTTON_RIGHT:
		break;
		
	case cConst.SIGNAL_BUTTON_CENTER:
		switch (vThis.mCurrSelection)
		{
		case vThis.mDivResetToAP:
			break;
		case vThis.mDivReconnectToWIFI:
			window.location = "./html_config/";
			break;
		case vThis.mDivReloadControlPanel:
			window.location = "http://localhost/";
			break;
		case vThis.mDivToggleSSH:
			if ($(vThis.mDivToggleSSH.children()[0]).is(":visible"))
			{
				fDbg("enable SSH!!!!!!!!!!!!!!!!!");
				cProxy.fEnableSSH(function() {
					$(vThis.mDivToggleSSH.children()[0]).hide();
					$(vThis.mDivToggleSSH.children()[1]).hide();
					$(vThis.mDivToggleSSH.children()[2]).show();
				});
			}
			break;
		case vThis.mDivReboot:
			cProxy.fReboot();
			break;
		case vThis.mDivBack:
			cCPanel.fGetInstance().fBack();
			break;
		}
		break;
		
	case cConst.SIGNAL_BUTTON_UP:
		switch (vThis.mCurrSelection)
		{
		//~ case vThis.mDivReconnectToWIFI:	o = vThis.mDivResetToAP; break;
		case vThis.mDivReloadControlPanel:	o = vThis.mDivReconnectToWIFI; break;
		case vThis.mDivToggleSSH:			o = vThis.mDivReloadControlPanel; break;
		case vThis.mDivSetTimezone:			o = vThis.mDivToggleSSH; break;
		case vThis.mDivReboot:				o = vThis.mDivSetTimezone; break;
		case vThis.mDivBack:				o = vThis.mDivReboot; break;
		default: 							return;
		}
		vThis.mCurrSelection.css("opacity", "0.2");
		vThis.mCurrSelection = o;
		vThis.mCurrSelection.css("opacity", "1");
		vThis.mDivIndicator.css(vThis.mCurrSelection.pIndicatorStyle);
		break;
		
	case cConst.SIGNAL_BUTTON_DOWN:
		switch (vThis.mCurrSelection)
		{
		//~ case vThis.mDivResetToAP: 	o = vThis.mDivReconnectToWIFI; break;
		case vThis.mDivReconnectToWIFI:		o = vThis.mDivReloadControlPanel; break;
		case vThis.mDivReloadControlPanel:	o = vThis.mDivToggleSSH; break;
		case vThis.mDivToggleSSH:			o = vThis.mDivSetTimezone; break;
		case vThis.mDivSetTimezone:			o = vThis.mDivReboot; break;
		case vThis.mDivReboot:				o = vThis.mDivBack; break;
		default: 							return;
		}
		
		vThis.mCurrSelection.css("opacity", "0.2");
		vThis.mCurrSelection = o;
		vThis.mCurrSelection.css("opacity", "1");
		vThis.mDivIndicator.css(vThis.mCurrSelection.pIndicatorStyle);
		break;
	}
}

// -------------------------------------------------------------------------------------------------
//	fShow / fHide
// -------------------------------------------------------------------------------------------------
cSPSettings.prototype.fShow = function(
)
{
	this.mDiv.show();
}
cSPSettings.prototype.fHide = function(
)
{
	this.mDiv.hide();
}

// -------------------------------------------------------------------------------------------------
//	fAnimateIn / fAnimateOut
// -------------------------------------------------------------------------------------------------
cSPSettings.prototype.fAnimateIn = function(
	vReturnFun
)
{
	this.mDiv.fadeIn(200, function() { if (vReturnFun) vReturnFun(); });
}
cSPSettings.prototype.fAnimateOut = function(
	vReturnFun
)
{
	this.mDiv.fadeOut(200, function() { if (vReturnFun) vReturnFun(); });
}

// -------------------------------------------------------------------------------------------------
//	fUpdate
// -------------------------------------------------------------------------------------------------
cSPSettings.prototype.fDisplay = function(
	vData
)
{
	var o, mCPanel, vThis;
	mCPanel = cCPanel.fGetInstance();
	vThis = cSPSettings.instance;

	if (vData)
	{
		if ($("#div_messageBoard_text").html() !== vData)
		{
			vThis.mMessageList.push(vData);
			if (vThis.mMessageDisplayInProgress === false)
			{
				vThis.mMessageDisplayInProgress = true;
				$("#div_messageBoard_text").fadeOut("fast", function() {
					$("#div_messageBoard_text").html(vData);
					vThis.mMessageList.splice(0, 1);
					$("#div_messageBoard_text").fadeIn("fast", function() {
						if (vThis.mMessageList.length > 0)
							vThis.fDisplay();
						else
							vThis.mMessageDisplayInProgress = false;
					});
				});
			}
		}
		else
		{
			if (vThis.mMessageList.length > 0)
				vThis.mMessageList.splice(0, 1);
			vThis.fDisplay();
		}
	}
	else
	{
		if (vThis.mMessageList.length == 0)
			return;
		o = vThis.mMessageList[0];
		vThis.mMessageList.splice(0, 1);
		if (vThis.mMessageDisplayInProgress === false)
			vThis.mMessageDisplayInProgress = true;
			
		$("#div_messageBoard_text").fadeOut("fast", function() {
			$("#div_messageBoard_text").html(o);
			$("#div_messageBoard_text").fadeIn("fast", function() {
				if (vThis.mMessageList.length > 0)
					vThis.fDisplay();
				else
					vThis.mMessageDisplayInProgress = false;
			});
		});
	}
	cCPanel.instance.mSubState = "messageBoard";
}
