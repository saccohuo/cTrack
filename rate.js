eventsHtmlDocumentComplete.add(RateKeyMon);
function RateKeyMon(doc)
{
	if(doc.addEventListener){
		doc.addEventListener("keydown",SetRateByHotkey,false);   
	}
}
function SetRateByHotkey(hotkey)
{
    switch (hotkey.keyCode) {
    case 48:  
        SetTrackValue(0);
    	WizAlert("已经重新开始 track")
        break;
    case 32: 
    	SetTrackValue(3);
    	WizAlert("已经设等级 3")
        break;
    case 65: 
    	SetTrackValue(1);
    	WizAlert("已经设置等级 1")
        break;
    case 83: 
    	SetTrackValue(2);
    	WizAlert("已经设等级 2")
        break;
    case 68: 
    	SetTrackValue(3);
    	WizAlert("已经设等级 3")
        break;
    case 70: 
    	SetTrackValue(4);
    	WizAlert("已经设等级 4")
        break;
    case 71: 
		SetTrackValue(5);
    	WizAlert("已经设等级 5")
        break;
    case 67: 
    	ClearTrackValue();
    	WizAlert("track信息已清空，此文件不再track")
    	break;
    case 73: 
        TrackInfo();
        break;
    case 76: 
        ListFilesTracked();
        break;
    case 84: 
        ListFilesToTrack();
        break;
    case 85: 
        ListFilesUntracked();
        break;
    default:
    	break;
    }
}



function SetTrackValue(rate)
{
    var tk_date=new Date();
    var objDoc      = objWindow.CurrentDocument; 
    
    if (objDoc.Keywords.length!=33 || !rate ) 
    {
        objDoc.Keywords=tk_date.getTime()+" "+WizComDateTimeToStr(tk_date); 
        if (rate==0) {rate=3};
    }
    
    
    var tk_interval=(1.6-0.2*rate)*Math.max(43200000,tk_date.getTime()-parseInt(objDoc.Keywords));  
    objDoc.SetParamValue("rate",rate);
    objDoc.SEO=tk_date.getTime()+tk_interval;
}


function ClearTrackValue()
{
	var objDoc=objWindow.CurrentDocument;
	objDoc.Keywords="";
	objDoc.SEO="";
    objDoc.SetParamValue("rate","");
}


function ListFilesToTrack() 
{
    var tk_date=new Date();
    var sql = "DOCUMENT_GUID in (select distinct DOCUMENT_GUID from WIZ_DOCUMENT where DOCUMENT_KEYWORDS like '1% %' and DOCUMENT_SEO<'" + tk_date.getTime() + "')"; 
    
    try {
        var documents = objDatabase.DocumentsFromSQL(sql);
        objWindow.DocumentsCtrl.SetDocuments(documents);
        
    }
    catch (err) {
    }
}


function ListFilesTracked() 
{
    var tk_date=new Date();
    var sql = "DOCUMENT_GUID in (select distinct DOCUMENT_GUID from WIZ_DOCUMENT where DOCUMENT_KEYWORDS like '1% %')"; 
    
    try {
        var documents = objDatabase.DocumentsFromSQL(sql);
        objWindow.DocumentsCtrl.SetDocuments(documents);
    }
    catch (err) {
    }
}


function ListFilesUntracked() 
{
    var tk_date=new Date();
    var sql = "DOCUMENT_GUID not in (select distinct DOCUMENT_GUID from WIZ_DOCUMENT where DOCUMENT_KEYWORDS like '1% %')"; 
    
    try {
        var documents = objDatabase.DocumentsFromSQL(sql);
        objWindow.DocumentsCtrl.SetDocuments(documents);
    }
    catch (err) {
    }
}


function TrackInfo () {
    var tk_date=new Date();
    var objDoc      = objWindow.CurrentDocument; 
    var dt1=new Date();
    var dt2=new Date();
    dt1.setTime(parseInt(objDoc.Keywords));
    dt2.setTime(parseInt(objDoc.SEO));
    dt3=((parseInt(objDoc.SEO)-tk_date.getTime())/86400000).toFixed(2);
    WizAlert("开始 track 时间: "+WizComDateTimeToStr(dt1)+"\n"+"下次 track 时间: "+WizComDateTimeToStr(dt2)+"\n\n"+"剩余时间:  "+dt3+"天");        
}



function TrackAlert() {
    var tk_date=new Date();
    var sql = "select count(*) from WIZ_DOCUMENT where DOCUMENT_KEYWORDS like '1% %' and DOCUMENT_SEO<'" +tk_date.getTime()+ "'"; 
    var count = objDatabase.SQLQuery(sql,"");
    if(count.GetFieldValue(0)!=0)
    {               
        if(WizConfirm("有  "+count.GetFieldValue(0)+"  个文件已经迫不及待，马上track?"))
        {
	        ListFilesToTrack();
	    }
    }
    while(!count.EOF)   
    {
        count.MoveNext();
    }

}
objWindow.AddTimer("TrackAlert", 1000 * 60 * 60);        

TrackAlert();







/*

function ListFilesToTrackInParam() 
{
    var sql = "document_guid in (select distinct document_guid from wiz_document_param where param_name='TK_DUETIME' and param_value<'" + tk_date.getTime() + "')"; 
    
    try {
        var documents = objDatabase.DocumentsFromSQL(sql);
        objWindow.DocumentsCtrl.SetDocuments(documents);
        
    }
    catch (err) {
    }
}


function SetTrackValueInParam(rate)
{
    var objDoc      = objWindow.CurrentDocument; 
    
    if (!objDoc.ParamValue("tk_first_review") || rate==0 ) 
    {
        objDoc.SetParamValue("tk_first_review", tk_date.getTime());
        
        if (rate==0) {rate=3};
        
        
    }
    var interval    =tk_date.getTime()+100-parseInt(objDoc.ParamValue("tk_first_review"));   
    
    
    
    
    var tk_interval=(1.6-0.2*rate)*Math.max(43200000,tk_date.getTime()-parseInt(objDoc.ParamValue("tk_first_review")));  
    objDoc.SetParamValue("rate",rate);
    
    objDoc.SetParamValue("tk_duetime",tk_date.getTime()+tk_interval);
}
*/
