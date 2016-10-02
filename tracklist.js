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

function TrackAlert() {
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


function WizComDateTimeToStr(com_dt) {
    var dt = new Date(Date.parse(com_dt));
    return "" + dt.getFullYear() + "-" + WizFormatInt2(dt.getMonth() + 1) + "-" + WizFormatInt2(dt.getDate()) + " " + WizFormatInt2(dt.getHours()) + ":" + WizFormatInt2(dt.getMinutes()) + ":" + WizFormatInt2(dt.getSeconds());
}




function ListFilesToTrack() 
{
    var sql = "DOCUMENT_GUID in (select distinct DOCUMENT_GUID from WIZ_DOCUMENT where DOCUMENT_KEYWORDS like '1% %' and DOCUMENT_SEO<'" + tk_date.getTime() + "')"; 
    
    try {
        var documents = objDatabase.DocumentsFromSQL(sql);
        objWindow.DocumentsCtrl.SetDocuments(documents);
        
    }
    catch (err) {
    }

}


/*改变WIZ_VERSION值一例
function sync333 () {
    var documents = objDatabase.DocumentsFromSQL(WIZ_VERSION=-1);
    for (var i = 0; i < documents.Count; i++) {
        doc=documents.Item(i);
        doc.Version=0;
    };
    
}
sync333();*/


TrackAlert();


/*

function ListFilesToTrackInParam() {
    var sql = "DOCUMENT_GUID in (select distinct DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME='TK_DUETIME' and PARAM_VALUE<'" + tk_date.getTime() + "')"; 
    
    try {
        var documents = objDatabase.DocumentsFromSQL(sql);
        objWindow.DocumentsCtrl.SetDocuments(documents);
        
    }
    catch (err) {
    }
}



function ListUntrackedFiles() {
    var sql = "document_guid not in (select distinct document_guid from wiz_document_param where param_name='TK_DUETIME')";
    try {
        var documents = objDatabase.DocumentsFromSQL(sql);
        objApp.Window.DocumentsCtrl.SetDocuments(documents);

    }
    catch (err) {
    }
}

*/


