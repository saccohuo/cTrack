
var objApp      = WizExplorerApp;
var objDatabase = objApp.Database;
var objWindow   = objApp.Window;
var objDoc      = objWindow.CurrentDocument; 
var tk_date=new Date();



function WizAlert(msg) {
    objWindow.ShowMessage(msg, "{p}", 0x00000040);
}

function WizConfirm(msg) {
    return objWindow.ShowMessage(msg, "Wiz", 0x00000020 | 0x00000001) == 1;
}



function WizFormatInt2(val) {
    if (val < 10)
        return "0" + val;
    else
        return "" + val;
}


function WizComDateTimeToStr(com_dt) {
    var dt = new Date(Date.parse(com_dt));
    return "" + dt.getFullYear() + "-" + WizFormatInt2(dt.getMonth() + 1) + "-" + WizFormatInt2(dt.getDate()) + " " + WizFormatInt2(dt.getHours()) + ":" + WizFormatInt2(dt.getMinutes()) + ":" + WizFormatInt2(dt.getSeconds());
}




function SetTrackValue(rate)
{
    var objDoc      = objWindow.CurrentDocument; 

    
    
    if (objDoc.Keywords.length!=33 || !rate ) 
    {
        objDoc.Keywords=tk_date.getTime()+" "+WizComDateTimeToStr(tk_date);
        if (rate==0) {rate=3};
    }

    
    
    var tk_interval=(1.6-0.2*rate)*Math.max(43200000,tk_date.getTime()-parseInt(objDoc.Keywords));  
    objDoc.SetParamValue("rate",rate);
    objDoc.SEO=tk_date.getTime()+tk_interval;
    WizAlert("已经设等级 "+rate);
}

SetTrackValue(objDoc.ParamValue("rate"));
        





