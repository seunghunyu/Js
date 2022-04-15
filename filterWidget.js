
 function RealEasyFilter(id) {
    this.id = id;
    this.ctl;
    var Data;

    
    this.init = function() {
        $('table').remove();
        this.ctl = document.getElementById(id);
        //var jobj = JSON.parse(Data);
        let searchTag = document.createElement('div');
        searchTag.setAttribute('id','search');
        searchTag.setAttribute('class','div_search');
        searchTag.setAttribute('style','border : 1px');
    
        

        let search_textTag = document.createElement('input');
        search_textTag.setAttribute('id','search_textTag');
        search_textTag.setAttribute('class','search_textTag');
        search_textTag.setAttribute('type','text');
        search_textTag.setAttribute('autocomplete','off');
        search_textTag.setAttribute('placeholder','검색어를 입력해주세요.');
        //search_textTag.setAttribute('maxlength','10');
        search_textTag.setAttribute('style','width : 95%;height : 25px');
        search_textTag.onkeyup = function(){
            if (window.event.keyCode == 13) {
                // 엔터키가 눌렸을 때
                alert(document.getElementById('search_textTag').value);

                var tbody_trArr = $('.tbody_trTag');
                var tbody_trArr = $('.tbody_trTag');
               
                if(document.getElementById('search_textTag').value !== ''){
                    for(var i = 0 ; i < tbody_trArr.length ; i++){
                        var itemId = $('.tbody_trTag')[i].id;
                        var itemNm = itemId.replace('tbody_trTag',''); //아이템 태그에서 아이템명 추출
                        if(itemNm.indexOf( document.getElementById('search_textTag').value ) !== -1 ){ //입력값이 포함되어있다면 해당 태그만 보여주기
                            $('#'+itemId).show();
                        }else{
                            $('#'+itemId).hide();                            
                        }
                    }
                }else{
                    for(var i = 0 ; i < tbody_trArr.length ; i++){
                        var itemId = $('.tbody_trTag')[i].id;
                        $('#'+itemId).show();
                    }
                } 
               
            }
        };
        

        let itemSearch_Icon = document.createElement('i');
        itemSearch_Icon.setAttribute('id','itemSearch_Icon');    
        itemSearch_Icon.setAttribute('class','dx-icon dx-icon-search');
        itemSearch_Icon.setAttribute('style','cursor:pointer');

        //search_textTag.setAttribute('border','1px');
        searchTag.appendChild(search_textTag);
        searchTag.append(itemSearch_Icon);
        
        let tableTag = document.createElement('table');
        tableTag.setAttribute('id','EasyFilterTable');
        tableTag.setAttribute('class', 'EasyFilterTable');
        tableTag.setAttribute('border', '1px');
        
        let tbodyTag = document.createElement('tbody');
        let trTag    = document.createElement('tr');
        let thTag    = document.createElement('th');
        this.ctl.append(searchTag);
        this.ctl.append(tableTag);
        

        
        let thead1 = document.createElement('thead');
        let tr1 = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.setAttribute('colspan','2');
        td1.setAttribute('style','border-right : 0px; border-bottom : 0px; height : 30px');
        td1.appendChild(searchTag);
        
        let td3 = document.createElement('td');
        td3.setAttribute('class','td_More');
        td3.setAttribute('border-left','0px');
        td3.appendChild(itemSearch_Icon);
        
        tr1.appendChild(td1);
        
        tr1.appendChild(td3);
        thead1.appendChild(tr1);

        tableTag.appendChild(thead1);



        for(var i = 0 ; i < Data.length ; i++){   
            //thead
            let theadTag = document.createElement('thead');
            theadTag.setAttribute('id', Data[i].TASK_BRCH);
            theadTag.setAttribute('class','theadTag');
           // theadTag.innerHTML = (i+1).toString()+'.'+Data[i].TASK_BRCH;
            //tr
            let trTag    = document.createElement('tr');
            trTag.setAttribute('id', 'tr'+Data[i].TASK_BRCH);
            trTag.setAttribute('class','trTag');
            //trTag.innerHTML = (i+1).toString()+'.'+Data[i].TASK_BRCH;

            //분류 태그 생성
            /*
            let taskTag = document.createElement('div');
            taskTag.setAttribute('id',Data[i].TASK_BRCH);
            taskTag.setAttribute('class','taskTag');
            taskTag.innerHTML = (i+1).toString()+'.'+Data[i].TASK_BRCH;
            */
            
            let taskTdTag = document.createElement('td');
            taskTdTag.setAttribute('id', Data[i].TASK_BRCH);
            taskTdTag.setAttribute('class','taskTag');
            taskTdTag.setAttribute('colspan','3');
            taskTdTag.innerHTML = (i+1).toString()+'.'+Data[i].TASK_BRCH;
            //분류 폴더 접기펴기
            
            taskTdTag.onclick = function(){
                //$('#'+'tbody'+Data[i].TASK_BRCH).show();
                console.log('#tbody'+this.id);
                if($('#tbody'+this.id).css('display') === 'none'){
                    $('#tbody'+this.id).show();
                }else{
                    $('#tbody'+this.id).hide();
                }
            };
            /*
            <table>
                <thead>
                    <tr>
                        <task>
            */
            tableTag.appendChild(theadTag);
            theadTag.appendChild(trTag); 
            trTag.appendChild(taskTdTag);
            
            //tbody
            let tbodyTag = document.createElement('tbody');
            tbodyTag.setAttribute('id','tbody'+Data[i].TASK_BRCH);
            tbodyTag.setAttribute('class','tbodyTag');
           
             /*
            <table>
                <thead>
                    <tr>
                        <task>
                </thead>
                <tbody>        
            */
            tableTag.appendChild(tbodyTag);
            

            
            for(var j = 0 ; j < Data[i].ITEM_INFO.length ; j++){
                //tbody_tr
                let tbody_trTag    = document.createElement('tr');
                tbody_trTag.setAttribute('id','tbody_trTag'+Data[i].ITEM_INFO[j].ITEM_NM);
                tbody_trTag.setAttribute('class','tbody_trTag');    
                /*
                let tbody_tdTag    = document.createElement('td');
                tbody_tdTag.setAttribute('id','tbody_tdTag'+Data[i].ITEM_INFO[j].ITEM_NM);
                tbody_tdTag.setAttribute('class','tbody_tdTag');    
                */
                /**
                 * <tbody>
                 *  <tr>
                 *    <td></td>  //itemtag
                 *    <td></td>  //conTag
                 *     
                 */

                let itemTag = document.createElement('td');
                itemTag.setAttribute('id',Data[i].ITEM_INFO[j].ITEM_NM);
                itemTag.setAttribute('class','itemTag');
                itemTag.innerHTML = Data[i].ITEM_INFO[j].ITEM_NM;
                

                tbodyTag.appendChild(tbody_trTag);
                tbody_trTag.appendChild(itemTag);

                let td_conTag = document.createElement('td');
                td_conTag.setAttribute('id','td_conTag'+Data[i].ITEM_INFO[j].ITEM_NM+Data[i].ITEM_INFO[j].CON_TYPE);
                td_conTag.setAttribute('class','td_conTag');
                td_conTag.setAttribute('style','border-left : 0px;border-right : 0px; border-bottom : 0px');
                //td_conTag.innerHTML = Data[i].ITEM_INFO[j].CON_TYPE;
                tbody_trTag.appendChild(td_conTag);
                
                let td_More = document.createElement('td');
                td_More.setAttribute('id','td_More'+Data[i].ITEM_INFO[j].ITEM_NM);
                td_More.setAttribute('class','td_More');
                td_More.setAttribute('style','border-left : 0px;border-right : 0px; border-bottom : 0px');
                // td_More.setAttribute('class','dx-icon dx-icon-search');
                tbody_trTag.appendChild(td_More);
                
                let td_Icon;
                
                let conTag;
                switch(Data[i].ITEM_INFO[j].CON_TYPE){
                    case '001': //text
                        conTag = document.createElement('input');
                        conTag.setAttribute('type','text');
                        conTag.setAttribute('autocomplete','off');
                        //conTag.setAttribute('maxlength','10');
                        conTag.setAttribute('id', 'text');
                        conTag.setAttribute('class','td_text');
                        conTag.setAttribute('style','width : 90% ; height : 20px');
                        break;
                    case '002': //combobox
                        conTag = document.createElement('select');
                        conTag.setAttribute('id', 'combobox');    
                        conTag.setAttribute('class','td_combobox');
                        conTag.setAttribute('style','width : 90% ; height : 25px');
                        Data[i].ITEM_INFO[j].CODE_LIST = '%,'+Data[i].ITEM_INFO[j].CODE_LIST
                        Data[i].ITEM_INFO[j].VALUE_LIST = '선택,'+Data[i].ITEM_INFO[j].VALUE_LIST
                        var codeArr = Data[i].ITEM_INFO[j].CODE_LIST.split(',');
                        var valArr = Data[i].ITEM_INFO[j].VALUE_LIST.split(',');
                    
                        for(var t = 0 ; t < codeArr.length ; t++){
                            let optionTag = document.createElement('option');
                            optionTag.setAttribute('value',codeArr[t]);
                            optionTag.innerHTML = valArr[t];
                            conTag.append(optionTag);
                            //console.log(codeArr[t] + '/' + valArr[t]);
                        }
                        td_Icon = document.createElement('i');
                        td_Icon.setAttribute('id','td_Icon'+Data[i].ITEM_INFO[j].ITEM_NM);    
                        td_Icon.setAttribute('class','dx-icon dx-icon-search');
                        td_Icon.setAttribute('style','cursor:pointer');
                        td_More.appendChild(td_Icon);
                        break;
                    case '003': //checkgroup
                        var codeArr = Data[i].ITEM_INFO[j].CODE_LIST.split(',');
                        var valArr = Data[i].ITEM_INFO[j].VALUE_LIST.split(',');
                        
                        conTag = document.createElement('div');
                        conTag.setAttribute('id', 'checkgroup');
                        conTag.setAttribute('class','td_checkgroup');
                        conTag.setAttribute('style','width : 100% ; height : 25px');
                        for(var t = 0 ; t < codeArr.length ; t++){
                            let checkTag = document.createElement('input');
                            checkTag.setAttribute('type','checkbox');
                            checkTag.setAttribute('name','checkGroup'+Data[i].ITEM_INFO[j].ITEM_NM); 
                            checkTag.setAttribute('id',codeArr[t]);
                            checkTag.setAttribute('value',codeArr[t]);
                            
                            let labelTag = document.createElement('label');
                            labelTag.setAttribute('for',codeArr[t]);
                            labelTag.innerHTML = valArr[t] ;   
        
                            conTag.append(checkTag);
                            conTag.append(labelTag);
                        }
                        td_Icon = document.createElement('i');
                        td_Icon.setAttribute('id','td_Icon'+Data[i].ITEM_INFO[j].ITEM_NM);    
                        td_Icon.setAttribute('class','dx-icon dx-icon-search');
                        td_Icon.setAttribute('style','cursor:pointer');
                        td_More.appendChild(td_Icon);
                        break;
                    case '004': //radiogroup
                        var codeArr = Data[i].ITEM_INFO[j].CODE_LIST.split(',');
                        var valArr = Data[i].ITEM_INFO[j].VALUE_LIST.split(',');
                        
                        conTag = document.createElement('div');
                        conTag.setAttribute('id', 'radiogroup');
                        conTag.setAttribute('class','td_radiogroup');
                        conTag.setAttribute('style','width : 100% ; height : 25px');
                        for(var t = 0 ; t < codeArr.length ; t++){
                            let radioTag = document.createElement('input');
                            radioTag.setAttribute('type','radio');
                            radioTag.setAttribute('name','radioGroup'+Data[i].ITEM_INFO[j].ITEM_NM); 
                            radioTag.setAttribute('id',codeArr[t]);
                            radioTag.setAttribute('value',codeArr[t]);
                            
                            let labelTag = document.createElement('label');
                            labelTag.setAttribute('for',codeArr[t]);
                            labelTag.innerHTML = valArr[t] ;   
            
                            conTag.append(radioTag);
                            conTag.append(labelTag);
                        }
                        td_Icon = document.createElement('i');
                        td_Icon.setAttribute('id','td_Icon'+Data[i].ITEM_INFO[j].ITEM_NM);    
                        td_Icon.setAttribute('class','dx-icon dx-icon-search');
                        td_Icon.setAttribute('style','cursor:pointer');
                        td_More.appendChild(td_Icon);
                        break;
                    case '005': //between
                        conTag = document.createElement('input');
                        conTag.setAttribute('id', 'between');
                        conTag.setAttribute('class','td_between');
                        conTag.setAttribute('type','text');
                        conTag.setAttribute('maxlength','10');
                        conTag.setAttribute('style','width : 90% ; height : 25px');
                        break;

                }
                
                if(td_Icon !== undefined){
                    td_Icon.onclick = function(){
                        //$('#'+'tbody'+Data[i].TASK_BRCH).show();
                        //console.log(this.id);
                        obz.setPageParam('ITEM_NM', this.id.substring('td_Icon'.length));
                        obz.openDialogNew(instance, '', obz.getFrameURL('/managebaseserver/webframes/jcomponent/design/codesearch'), 'setCodeSearchData', false);
                        
                    };
                }
                
                td_conTag.appendChild(conTag);

            }   
        }//end for
        
    };//init end
    
    
   
    this.setFoldering = function(){
        console.log('a');
    }
    
    this.getSelectedData = function(){
        //최종선택값들의 데이터 리스트
        var selDataList = new Array();

        //item 리스트 조합 초기화
        var itemTagArr = $('.itemTag');
        var itemIdArr = [];
        var itemArr = [];
        var itemTypeArr = [];
        // 사용자 입력 항목 리스트 조합 초기화
        var conTagArr = $('.td_conTag');
        var conTagVal = [];
        //item 리스트 추출
        
        var AllData = this.Data;
        for(var i = 0 ; i < AllData.length ; i ++){
            for(var j = 0 ; j < AllData[i].ITEM_INFO.length ; j++){
                itemIdArr.push(AllData[i].ITEM_INFO[j].ITEM_ID);
                itemArr.push(AllData[i].ITEM_INFO[j].ITEM_NM);
                itemTypeArr.push(AllData[i].ITEM_INFO[j].ITEM_TYPE);
            }   
        }    
        /*
        for(var i = 0; i < itemTagArr.length ; i++){
            itemArr.push(itemTagArr[i].innerHTML);
        }*/
        
        //컨트롤 타입이 무엇인지 text,combo,radio,.. 
        //$('.td_conTag')[0].id.substring($('.td_conTag')[0].id.length,$('.td_conTag')[0].id.length-3)  
        for(var i = 0 ; i < conTagArr.length ; i++){
            
            var data = new Object(); 
            //타입 세팅(STRING,NUMERIC)
            data.type = itemTypeArr[i];
            data.id   = itemIdArr[i];

            var tagId = $('.td_conTag')[i].id;
            switch(tagId.substring(tagId.length,tagId.length-3)){
                case '001'://text
                    conTagVal.push($('.td_conTag')[i].children[0].value);
                    
                    if($('.td_conTag')[i].children[0].value !== ''){
                        data.item = itemArr[i];
                        data.val  = $('.td_conTag')[i].children[0].value;
                        selDataList.push(data);
                    }

                    break;
                case '002'://combobox
                    conTagVal.push($('.td_conTag')[i].children[0].value);

                    if($('.td_conTag')[i].children[0].value !== '' && $('.td_conTag')[i].children[0].value !== '%'){
                        data.item = itemArr[i];
                        data.val  = $('.td_conTag')[i].children[0].value;
                        selDataList.push(data);
                    }

                    break;    
                case '003'://checkgroup
                    var checkVal = '';
                    var parentTagId = $('.td_conTag')[i].id;
                    
                    for(var j = 0 ; j <  $('#'+parentTagId).find('input').length ; j++){
                        if($('#'+parentTagId).find('input')[j].checked === true){
                            checkVal += $('#'+parentTagId).find('input')[j].value + ',';
                        }
                    }
                    
                    if(checkVal.length > 1){
                        checkVal = checkVal.substring(0,checkVal.length - 1);
                    }

                    if(checkVal !== ''){
                        data.item = itemArr[i];
                        data.val  = checkVal;
                        selDataList.push(data);
                    }

                    conTagVal.push(checkVal);
                    break;
                case '004'://radiogroup
                    var checkVal = '';
                    var parentTagId = $('.td_conTag')[i].id;
                    
                    for(var j = 0 ; j < $('#'+parentTagId).find('input').length ; j++){
                        if($('#'+parentTagId).find('input')[j].checked === true){
                            checkVal += $('#'+parentTagId).find('input')[j].value + ',';
                        }
                    }
                    if(checkVal.length > 1){
                        checkVal = checkVal.substring(0,checkVal.length - 1);
                    }

                    if(checkVal !== ''){
                        data.item = itemArr[i];
                        data.val  = checkVal;
                        selDataList.push(data);
                    }

                    conTagVal.push(checkVal);
                    break;
                case '005'://between
                    conTagVal.push($('.td_conTag')[i].children[0].value);
                    if($('.td_conTag')[i].children[0].value !== ''){
                        data.item = itemArr[i];
                        data.val  = $('.td_conTag')[i].children[0].value;
                        selDataList.push(data);
                    }
                    break;
            }
        }
        /*
        console.log('itemArr');
        console.log(itemArr);
        console.log('conTagVal');
        console.log(conTagVal);
        */
        console.log(selDataList);
        return selDataList;

    }
    
    this.settingFilterCode = function(itemList , valList){
        console.log("sel itemList :::::::::::" +itemList);
      console.log("sel valList ::::::::::: " +valList);

        var pmpt_ItemArr;
        var pmpt_ValArr;
        
        if(itemList.length > 0){
            pmpt_ItemArr = itemList.split(';');
            pmpt_ValArr  = valList.split(';');
            var selDataList = new Array();

            //item 리스트 조합 초기화
            var itemTagArr = $('.itemTag');
            var itemArr = [];
            // 사용자 입력 항목 리스트 조합 초기화
            var conTagArr = $('.td_conTag');
            var conTagVal = [];
            //item 리스트 추출
            for(var i = 0; i < itemTagArr.length ; i++){
                itemArr.push(itemTagArr[i].innerHTML);
            }
            
            //컨트롤 타입이 무엇인지 text,combo,radio,.. 
            //$('.td_conTag')[0].id.substring($('.td_conTag')[0].id.length,$('.td_conTag')[0].id.length-3)  
            for(var i = 0 ; i < conTagArr.length ; i++){
                
                for(var k = 0 ; k < pmpt_ItemArr.length ; k++){
                    if(itemArr[i]+'_PMPT' === pmpt_ItemArr[k]){
                        var tagId = $('.td_conTag')[i].id;
                        switch(tagId.substring(tagId.length,tagId.length-3)){
                            case '001'://text
                                $('.td_conTag')[i].children[0].value  = pmpt_ValArr[k];   
                                break;
                            case '002'://combobox
                                $('.td_conTag')[i].children[0].value  = pmpt_ValArr[k];           
                                break;    
                            case '003'://checkgroup
                                
                                var checkVal = '';
                                var parentTagId = $('.td_conTag')[i].id;
                                var pmpt_check_ValArr = pmpt_ValArr[k].split(',');

                                for(var j = 0 ; j <  $('#'+parentTagId).find('input').length ; j++){
                                    console.log($('#'+parentTagId).find('input')[j].value);
                                    
                                    for(var h = 0 ; h < pmpt_check_ValArr.length ; h++){
                                        if(pmpt_check_ValArr[h] === $('#'+parentTagId).find('input')[j].value){
                                            $('#'+parentTagId).find('input')[j].checked = true;
                                        }
                                    }
                                }
                                
                                break;
                            case '004'://radiogroup
                                
                                var checkVal = '';
                                var parentTagId = $('.td_conTag')[i].id;
                        
                                for(var j = 0 ; j <  $('#'+parentTagId).find('input').length ; j++){
                                    console.log($('#'+parentTagId).find('input')[j].value);
                                    if(pmpt_ValArr[k] === $('#'+parentTagId).find('input')[j].value){
                                        $('#'+parentTagId).find('input')[j].checked = true;
                                    }
                                }
                                
                                break;
                            case '005'://between
                                /*
                                conTagVal.push($('.td_conTag')[i].children[0].value);
                                if($('.td_conTag')[i].children[0].value !== ''){
                                    data.item = itemArr[i];
                                    data.val  = $('.td_conTag')[i].children[0].value;
                                    selDataList.push(data);
                                }*/
                                break;
                        }   
                    }else{continue;}
                }
            }    


        }else{
            console.log("설정된 아이템이 없습니다.")
        }


    }

    //2022.04.04 하나의 룰 생성
    this.getRuleCode = function(type){
        var operator = '&&'; //임시 
        var ruleObj = this.getSelectedData();
        
        var codeData = 'if(';
        var xmlData  = '<List>';
        var htmlData = 'IF(';  

        for(var i = 0 ; i < ruleObj.length ; i++){
            var tempCode = '';
            var tempXml = '';
            var tempHtml = '';
            
            tempXml = "<EasySheet>"
                      + "<LogicOperator operator=\"\" LastCondidx=\"1\">"
                      + "<Condition operator=\"=\" groupstart=\"False\" groupend=\"False\" groupoperator=\"\" isgroup=\"False\" NothingCond=\"0\" LastCond=\"1\">"
                      + "<Inputlist><RefItem name=\""+ruleObj[i].item+"\" id=\""+ruleObj[i].id+"\" itemtype=\""+ruleObj[i].type+"\"/>"
                      + "<RefItem name=\""+ruleObj[i].item+"_PMPT\" id=\""+ruleObj[i].id+"\" itemtype=\""+ruleObj[i].type+"\"/></Inputlist>"
                      + "<equation caption=\"0\"><![CDATA[{"+ruleObj[i].item+"}]]></equation>"
                      + "<valuation><![CDATA[\""+ruleObj[i].item+"_PMPT\"]]></valuation>";

            

            if(ruleObj[i].type === 'STRING'){
                if(ruleObj[i].val.split(',').length > 1){ //복수개 
                    tempCode = '(obzFunction.operatorIN(get(\"'+ ruleObj[i].item + '\"),  get(\"'+ ruleObj[i].item +'_PMPT\"+)))';
                    tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\""+ruleObj[i].item+"\"),  get(\""+ruleObj[i].item+"_PMPT\")))]]></value>";
                    tempHtml = "{"+ ruleObj[i].item + "} IN (" + ruleObj[i].item + "_PMPT) <br> AND";
                }else{                
                    tempCode = '(get(\"' + ruleObj[i].item + '\").compareTo(get(\"'+ruleObj[i].item+'_PMPT\")) == 0)';
                    tempXml += "<value><![CDATA[((get(\""+ruleObj[i].item+"\").compareTo(get(\""+ruleObj[i].item+"_PMPT\"))) == 0)]]></value>";
                    tempHtml = "{"+ ruleObj[i].item + "} = " + ruleObj[i].item + "_PMPT <br> AND";
                }
            }else{//NUMERIC
                if(ruleObj[i].val.split(',').length > 1){ //복수개
                    /*
                    var tempArr = ruleObj[i].val.split(',');               
                    var tempVal = ''; 
                    for(var j = 0 ; j < tempArr.length ; j++){
                        tempVal += tempArr[j]+'d' + ',';
                    }
                    tempVal = tempVal.substring(0,tempVal.length-1);
                    tempCode = '(Double.parseDouble(get(\"' + ruleObj[i].item + '\")) == (' + tempVal + '))';
                    */
                    tempCode = '(obzFunction.operatorIN(get(\"'+ ruleObj[i].item + '\"), get(\"'+ ruleObj[i].item +'_PMPT\")))';
                    tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\""+ruleObj[i].item+"\"), get(\""+ruleObj[i].item+"_PMPT\")))]]></value>";
                    //tempCode = '(Double.parseDouble(get(\"' + ruleObj[i].item + '\")) == ('+ruleObj[i].val+'d))';
                    tempHtml = "{"+ ruleObj[i].item + "} IN (" + ruleObj[i].item + "_PMPT) <br> AND";
                }else{
                    tempCode = "if(get\""+ ruleObj[i].item + "\").equals(\"\") set(\""+ ruleObj[i].item + "_PMPT\", \"0\");"  
                             + "(Double.parseDouble(get(\"" + ruleObj[i].item + "_PMPT\")) == (Double.parseDouble(get\""+ruleObj[i].item+"_PMPT\"))))";
                    tempXml  += "<value><![CDATA[(Double.parseDouble(get(\""+ruleObj[i].item+"\")) == (Double.parseDouble(get(\""+ruleObj[i].item+"_PMPT\"))))]]></value>";
                    tempHtml = "{"+ ruleObj[i].item + "} = " + ruleObj[i].item + "_PMPT <br> AND";
                }
            }
            codeData += tempCode + '&&';
            xmlData  += tempXml + "</Condition></LogicOperator><RuleThen></RuleThen><Desc><![CDATA[]]></Desc></EasySheet>";
            htmlData += tempHtml 
        }
        codeData = codeData.substring(0,codeData.length-2);
        //codeData += '){return true;}';
        codeData += '){}else{return false;}';

        
        xmlData += "<EasyInfo actioncnt=\"0\" conditioncnt=\"1\" rowcnt=\""+String(ruleObj.length+1)+"\" Multi=\"S\"  NullExType=\"0\" ISFILTER=\"1\" OPERATOR=\"AND\"/>"
        xmlData += "<Array><text><![CDATA[]]></text><item><![CDATA[]]></item></Array><GroupInfo><![CDATA[]]></GroupInfo><FormulaInfo><![CDATA[]]></FormulaInfo></List>";
        
        htmlData = htmlData.substring(0,htmlData.length-3) + ")";
        



        if(type === 'code'){
            console.log("code : " + codeData);
            return codeData;
        }else if(type === 'xml'){
            console.log("xml : " + xmlData);
            return xmlData;
        }else{
            console.log("html : " + htmlData);
            return htmlData;
        }
    }

    //2022.04.13 개별 등록 -> 컴포넌트 한개당 룰 여러개 생성   
    this.getRuleCode2 = function(type,item_nm){
        var operator = '&&'; //임시 
        var ruleObj = this.getSelectedData();
        
        var codeData = 'if(';
        var xmlData  = '<List>';
        var htmlData = 'IF(';  
        
        var tempCode = '';
        var tempXml  = '';
        var tempHtml = '';
        
        var item_id   = '';
        var item_type = '';
        var item_val  = '';
        //아이템 아이디 추출
        for(var i = 0 ; i < ruleObj.length ; i++){
            if(ruleObj[i].item === item_nm){
                item_id   = ruleObj[i].id;
                item_type = ruleObj[i].type;
                item_val  = ruleObj[i].val;
                break;
            }    
        }   
        tempXml = "<EasySheet>"
                   + "<LogicOperator operator=\"\" LastCondidx=\"1\">"
                   + "<Condition operator=\"=\" groupstart=\"False\" groupend=\"False\" groupoperator=\"\" isgroup=\"False\" NothingCond=\"0\" LastCond=\"1\">"
                   + "<Inputlist><RefItem name=\"" + item_nm + "\" id=\"" + item_id + "\" itemtype=\"" + item_type + "\"/>"
                   + "<RefItem name=\"" + item_nm + "_PMPT\" id=\"" + item_id + "\" itemtype=\"" + item_type + "\"/></Inputlist>"
                   + "<equation caption=\"0\"><![CDATA[{" + item_nm + "}]]></equation>"
                   + "<valuation><![CDATA[\""+item_nm+"_PMPT\"]]></valuation>";
       
        if(item_type === 'STRING'){
            if(ruleObj[i].val.split(',').length > 1){ //복수개 
                tempCode = '(obzFunction.operatorIN(get(\"' + item_nm + '\"),  get(\"' + item_nm + '_PMPT\"+)))';
                tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\"" + item_nm + "\"),  get(\"" + item_nm + "_PMPT\")))]]></value>";
                tempHtml = "{"+ item_nm + "} IN (" + item_nm + "_PMPT) <br> AND";
            }else{                
                tempCode = '(get(\"' + item_nm + '\").compareTo(get(\"' + item_nm + '_PMPT\")) == 0)';
                tempXml += "<value><![CDATA[((get(\"" + item_nm + "\").compareTo(get(\"" + item_nm + "_PMPT\"))) == 0)]]></value>";
                tempHtml = "{" + item_nm + "} = " + item_nm + "_PMPT <br> AND";
            }
        }else{//NUMERIC
            if(ruleObj[i].val.split(',').length > 1){ //복수개
                tempCode = '(obzFunction.operatorIN(get(\"'+ item_nm + '\"), get(\"'+ item_nm +'_PMPT\")))';
                tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\"" + item_nm + "\"), get(\"" + item_nm + "_PMPT\")))]]></value>";
                tempHtml = "{" + item_nm + "} IN (" + item_nm + "_PMPT) <br> AND";
            }else{  
                tempCode = "(Double.parseDouble(get(\"" + item_nm + "_PMPT\")) == (Double.parseDouble(get(\"" + item_nm + "_PMPT\"))))";
                tempXml  += "<value><![CDATA[(Double.parseDouble(get(\"" + item_nm + "\")) == (Double.parseDouble(get(\"" + item_nm + "_PMPT\"))))]]></value>";
                tempHtml = "{" + item_nm + "} = " + item_nm + "_PMPT <br> AND";
            }
        }
        codeData += tempCode + '&&';

        //NUMERIC 타입일경우 null 체크 필요
        if(item_type === 'NUMERIC'){
            codeData = "if(get(\"" + item_nm + "\").equals(\"\")) set(\"" + item_nm + "_PMPT\", \"0\"); " +  codeData;
        }
        

        xmlData  += tempXml + "</Condition></LogicOperator><RuleThen></RuleThen><Desc><![CDATA[]]></Desc></EasySheet>";
        htmlData += tempHtml 
        
        codeData = codeData.substring(0,codeData.length-2);
        //codeData += '){return true;}';
        codeData += '){}else{return false;}';

        
        xmlData += "<EasyInfo actioncnt=\"0\" conditioncnt=\"1\" rowcnt=\""+String(ruleObj.length+1)+"\" Multi=\"S\"  NullExType=\"0\" ISFILTER=\"1\" OPERATOR=\"AND\"/>"
        xmlData += "<Array><text><![CDATA[]]></text><item><![CDATA[]]></item></Array><GroupInfo><![CDATA[]]></GroupInfo><FormulaInfo><![CDATA[]]></FormulaInfo></List>";
        
        htmlData = htmlData.substring(0,htmlData.length-3) + ")";
        



        if(type === 'code'){
            console.log("code : " + codeData);
            return codeData;
        }else if(type === 'xml'){
            console.log("xml : " + xmlData);
            return xmlData;
        }else{
            console.log("html : " + htmlData);
            return htmlData;
        }
    }

    //2022.04.13 세트로 묶기 (ex :  {아이템 : 상권코드;상권코드_PMPT , 코드 : if(get("상권코드").compareTo(get("상권코드_PMPT"))){}else{return false;}   } 
    this.getRuleCode3 = function(type){
        var operator = '&&'; //임시 
        var ruleObj = this.getSelectedData();
        
        var jexlCode = " import org.apache.commons.jexl2.*;"
                     + " import java.util.Map;"
                     + " import java.util.HashMap;"
                     + " import java.util.Iterator;"
                     + " !@#!@#!@# "       //import문과 코드 부문 구분
                     + " Map<String,String> codeMap = new HashMap<String,String>(); "
                     + " String tempCode = \"\"; ";

        var codeData = '';
        var xmlData  = '<List>';
        var htmlData = 'IF(';  

        for(var i = 0 ; i < ruleObj.length ; i++){
            var tempCode = '';
            var tempXml = '';
            var tempHtml = '';
            codeData = '';


            tempXml = "<EasySheet>"
                      + "<LogicOperator operator=\"\" LastCondidx=\"1\">"
                      + "<Condition operator=\"=\" groupstart=\"False\" groupend=\"False\" groupoperator=\"\" isgroup=\"False\" NothingCond=\"0\" LastCond=\"1\">"
                      + "<Inputlist><RefItem name=\""+ruleObj[i].item+"\" id=\""+ruleObj[i].id+"\" itemtype=\""+ruleObj[i].type+"\"/>"
                      + "<RefItem name=\""+ruleObj[i].item+"_PMPT\" id=\""+ruleObj[i].id+"\" itemtype=\""+ruleObj[i].type+"\"/></Inputlist>"
                      + "<equation caption=\"0\"><![CDATA[{"+ruleObj[i].item+"}]]></equation>"
                      + "<valuation><![CDATA[\""+ruleObj[i].item+"_PMPT\"]]></valuation>";
            
            if(ruleObj[i].type === 'STRING'){
                   if(ruleObj[i].val.split(',').length > 1){ //복수개 
                       tempCode = 'if((obzFunction.operatorIN('+ruleObj[i].item +'),'+ ruleObj[i].item +'_PMPT))';
                       tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\""+ruleObj[i].item+"\"),  get(\""+ruleObj[i].item+"_PMPT\")))]]></value>";
                       tempHtml = "{"+ ruleObj[i].item + "} IN (" + ruleObj[i].item + "_PMPT) <br> AND";
                   }else{                
                       tempCode = 'if(('+ ruleObj[i].item +'.compareTo('+ruleObj[i].item+'_PMPT) == 0)';
                       tempXml += "<value><![CDATA[((get(\""+ruleObj[i].item+"\").compareTo(get(\""+ruleObj[i].item+"_PMPT\"))) == 0)]]></value>";
                       tempHtml = "{"+ ruleObj[i].item + "} = " + ruleObj[i].item + "_PMPT <br> AND";
                   }
               }else{//NUMERIC
                   if(ruleObj[i].val.split(',').length > 1){ //복수개
                       tempCode = 'if((obzFunction.operatorIN('+ ruleObj[i].item + ', '+ ruleObj[i].item +'_PMPT))';
                       tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\""+ruleObj[i].item+"\"), get(\""+ruleObj[i].item+"_PMPT\")))]]></value>";
                       tempHtml = "{"+ ruleObj[i].item + "} IN (" + ruleObj[i].item + "_PMPT) <br> AND";
                   }else{
                       tempCode = "if(("+ ruleObj[i].item + ".equals(\"\") ) set("+ ruleObj[i].item + "_PMPT, \"0\");"  
                                + "if((Double.parseDouble(" + ruleObj[i].item + "_PMPT) == (Double.parseDouble("+ruleObj[i].item+"_PMPT))";
                       tempXml  += "<value><![CDATA[(Double.parseDouble(get(\""+ruleObj[i].item+"\")) == (Double.parseDouble(get(\""+ruleObj[i].item+"_PMPT\"))))]]></value>";
                       tempHtml = "{"+ ruleObj[i].item + "} = " + ruleObj[i].item + "_PMPT <br> AND";
                   }
            }
            /*
            if(ruleObj[i].type === 'STRING'){
                if(ruleObj[i].val.split(',').length > 1){ //복수개 
                    tempCode = 'if((obzFunction.operatorIN(get(\"'+ruleObj[i].item +'\")), get(\"'+ ruleObj[i].item +'_PMPT\")))';
                    tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\""+ruleObj[i].item+"\"),  get(\""+ruleObj[i].item+"_PMPT\")))]]></value>";
                    tempHtml = "{"+ ruleObj[i].item + "} IN (" + ruleObj[i].item + "_PMPT) <br> AND";
                }else{                
                    tempCode = 'if((get(\\\"'+ ruleObj[i].item +'\\\").compareTo(get(\\\"'+ruleObj[i].item+'_PMPT\\\")) == 0)';
                    tempXml += "<value><![CDATA[((get(\""+ruleObj[i].item+"\").compareTo(get(\""+ruleObj[i].item+"_PMPT\"))) == 0)]]></value>";
                    tempHtml = "{"+ ruleObj[i].item + "} = " + ruleObj[i].item + "_PMPT <br> AND";
                }
            }else{//NUMERIC
                if(ruleObj[i].val.split(',').length > 1){ //복수개
                    tempCode = 'if((obzFunction.operatorIN(get(\"'+ ruleObj[i].item + '\"), get(\"'+ ruleObj[i].item +'_PMPT\")))';
                    tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\""+ruleObj[i].item+"\"), get(\""+ruleObj[i].item+"_PMPT\")))]]></value>";
                    tempHtml = "{"+ ruleObj[i].item + "} IN (" + ruleObj[i].item + "_PMPT) <br> AND";
                }else{
                    tempCode = "if((get(\""+ ruleObj[i].item + "\").equals(\"\") ) set("+ ruleObj[i].item + "_PMPT, \"0\");"  
                             + "if((Double.parseDouble(get(\"" + ruleObj[i].item + "\")) == (Double.parseDouble(get(\""+ruleObj[i].item+"_PMPT\")))";
                    tempXml  += "<value><![CDATA[(Double.parseDouble(get(\""+ruleObj[i].item+"\")) == (Double.parseDouble(get(\""+ruleObj[i].item+"_PMPT\"))))]]></value>";
                    tempHtml = "{"+ ruleObj[i].item + "} = " + ruleObj[i].item + "_PMPT <br> AND";
                }
            }*/
            codeData += tempCode + '){}else{return false;}';
            xmlData  += tempXml + "</Condition></LogicOperator><RuleThen></RuleThen><Desc><![CDATA[]]></Desc></EasySheet>";
            htmlData += tempHtml 

            /*
            jexlCode += " String tempCode = \""+ codeData + "\";";
            jexlCode += " tempCode = tempCode.replaceFirst(\""+ ruleObj[i].item +"\", \"get(\""+ ruleObj[i].item +"\")\" );";
            jexlCode += " tempCode = tempCode.replace(\""+ ruleObj[i].item +"_PMPT\", \"get(\""+ ruleObj[i].item +"_PMPT\")\" );";                
            jexlCode += " codeMap.put(\""+ruleObj[i].item+"\", tempCode); ";
            */

            jexlCode += " tempCode = \""+codeData+"\"; ";
            //var temp = "true";
            //jexlCode += " tempCode = \""+temp+"\"; ";
            jexlCode += " codeMap.put(\""+ruleObj[i].item+"\",tempCode); ";
        }

        jexlCode += " Iterator it = codeMap.entrySet().iterator(); "
                 +  " while(it.hasNext()){"
                 +  " Map.Entry<String, String> entry = (Map.Entry)it.next(); "
                 //+  " //entry.getKey() , entry.getValue() " 
                 

        jexlCode += " JexlEngine jexl = new JexlEngine(); "
                  + " String jexlExp = codeMap.get(entry.getKey()); "
                  //+ " __wlog.info_println(\"jexelEXP::::::::::::::::::::::::::\" + jexlExp); "
                  + " System.out.println(\"jexelEXP::::::::::::::::::::::::::\" + jexlExp); "
                  + " Expression e = jexl.createExpression( jexlExp ); "
                  + " JexlContext jc = new MapContext(); "
                  + " String param = entry.getKey(); "
                  + " String param_pmpt = entry.getKey()+\"_PMPT\";"
                  + " String data1 = get(param);"
                  + " String data2 = get(param_pmpt);"
                  + " jc.set(param, data1); "
                  + " jc.set(param_pmpt, data2); "
                  + " if((Boolean)e.evaluate(jc) == false){ System.out.println(\"@@@@@@@@@@@@@@@@@@false\"); return false;}else{ System.out.println(\"@@@@@@@@@@@@@@@@@@@@@true\"); return true; } "
                  //+ " if((Boolean)e.evaluate(jc) == false){return false; }else{ } "
                  +  "  } ";

        console.log(jexlCode);

        
        xmlData += "<EasyInfo actioncnt=\"0\" conditioncnt=\"1\" rowcnt=\""+String(ruleObj.length+1)+"\" Multi=\"S\"  NullExType=\"0\" ISFILTER=\"1\" OPERATOR=\"AND\"/>"
        xmlData += "<Array><text><![CDATA[]]></text><item><![CDATA[]]></item></Array><GroupInfo><![CDATA[]]></GroupInfo><FormulaInfo><![CDATA[]]></FormulaInfo></List>";
        
        htmlData = htmlData.substring(0,htmlData.length-3) + ")";
        



        if(type === 'code'){
            console.log("code : " + jexlCode);
            return jexlCode;
        }else if(type === 'xml'){
            console.log("xml : " + xmlData);
            return xmlData;
        }else{
            console.log("html : " + htmlData);
            return htmlData;
        }
    }

    //DOM 로그 이전 호출하면 에러
    function showList(){
        
        var displayId = document.getElementById(this.id);
        console.log('displayId : '+ displayId.innerText);
        /*
        if(displayId.style.display=='none'){
            displayId.style.display = 'block';
        }else{
            displayId.style.display = 'none';
        }*/
     }

  
    Object.defineProperty(this, 'Text', {
        get: function() {
            //return textArea.getValue();
        },
        set: function(val) {
            //textArea.setValue(val);
        }
    });

    Object.defineProperty(this, 'Data', {
        get: function() {
            return Data;
        },
        set: function(val) {
            Data = val;
        }
    });
   
}

function setCodeSearchData(e){
    console.log('setCodeSearchData');
}