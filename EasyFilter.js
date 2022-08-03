
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
        searchTag.setAttribute('style','border : 0px #e5e5e5 solid;');
    
        let search_textTag = document.createElement('input');
        search_textTag.setAttribute('id','search_textTag');
        search_textTag.setAttribute('class','search_textTag');
        search_textTag.setAttribute('type','text');
        search_textTag.setAttribute('autocomplete','off');
        search_textTag.setAttribute('placeholder','검색어를 입력해주세요.');
        //search_textTag.setAttribute('maxlength','10');
        search_textTag.setAttribute('style','width : 98.5%; height : 20px; margin : 1px 1px 1px 1px; border : 0px #e5e5e5 solid;');
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
                            //$('#'+itemId).show();
                            $('#'+itemId).css('visibility','visible');
                        }else{
                            //$('#'+itemId).hide();                      
                            $('#'+itemId).css('visibility','collapse');      
                        }
                    }
                }else{
                    for(var i = 0 ; i < tbody_trArr.length ; i++){
                        var itemId = $('.tbody_trTag')[i].id;
                        //$('#'+itemId).show();
                        $('#'+itemId).css('visibility','visible');
                    }
                } 
               
            }
        };
        

        let itemSearch_Icon = document.createElement('i');
        itemSearch_Icon.setAttribute('id','itemSearch_Icon');    
        itemSearch_Icon.setAttribute('class','dx-icon dx-icon-search');
        itemSearch_Icon.setAttribute('style','cursor:pointer;');

        itemSearch_Icon.onclick = function(e){
            var tbody_trArr = $('.tbody_trTag');
            var tbody_trArr = $('.tbody_trTag');
           
            if(document.getElementById('search_textTag').value !== ''){
                for(var i = 0 ; i < tbody_trArr.length ; i++){
                    var itemId = $('.tbody_trTag')[i].id;
                    var itemNm = itemId.replace('tbody_trTag',''); //아이템 태그에서 아이템명 추출
                    if(itemNm.indexOf( document.getElementById('search_textTag').value ) !== -1 ){ //입력값이 포함되어있다면 해당 태그만 보여주기
                        //$('#'+itemId).show();
                        $('#'+itemId).css('visibility','visible');
                    }else{
                        //$('#'+itemId).hide();                      
                        $('#'+itemId).css('visibility','collapse');      
                    }
                }
            }else{
                for(var i = 0 ; i < tbody_trArr.length ; i++){
                    var itemId = $('.tbody_trTag')[i].id;
                    //$('#'+itemId).show();
                    $('#'+itemId).css('visibility','visible');
                }
            } 
        };

        //search_textTag.setAttribute('border','1px');
        searchTag.appendChild(search_textTag);
        searchTag.append(itemSearch_Icon);
        
        let htableTag = document.createElement('table');//헤더테이블태그
        htableTag.setAttribute('id','headerTable');    
        htableTag.setAttribute('style', 'width : 100%; border:0px;');

        let tableTag = document.createElement('table'); //아이템테이블태그
        tableTag.setAttribute('id','EasyFilterTable');
        tableTag.setAttribute('class', 'EasyFilterTable');
     
        
        let tbodyTag = document.createElement('tbody');
        let trTag    = document.createElement('tr');
        let thTag    = document.createElement('th');
        //this.ctl.append(searchTag);
        htableTag.append(searchTag);
        this.ctl.append(htableTag);

        //this.ctl.append(tableTag);
        let divScroll = document.createElement('div');
        divScroll.setAttribute('id','divScroll');
        divScroll.setAttribute('style', 'width : 100%; height: calc(100% - 33.9px);');
        tableTag.setAttribute('style', 'border-bottom: 1px #ccc solid;');
        divScroll.appendChild(tableTag);

        this.ctl.append(divScroll);
        
        let thead1 = document.createElement('thead');
        let tr1 = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.setAttribute('colspan','2');
        td1.setAttribute('style','border : 1px #bbb solid; ');
        td1.appendChild(searchTag);
        
        let td3 = document.createElement('td');
        td3.setAttribute('class','td_More');
        td3.setAttribute('style','border-top:1px;border-bottom:1px;padding:6px;');
        td3.appendChild(itemSearch_Icon);
        
        tr1.appendChild(td1);
        
        tr1.appendChild(td3);
        thead1.appendChild(tr1);

        //tableTag.appendChild(thead1);
        htableTag.appendChild(thead1);


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
                // console.log('#tbody'+this.id);
                // if($('#tbody'+this.id).css('display') === 'none'){
                if($('#tbody'+this.id).css('visibility') === 'collapse'){
                    // $('#tbody'+this.id).show();
                    $('#tbody'+this.id).css('visibility','visible');
                }else{
                    // $('#tbody'+this.id).hide();
                    $('#tbody'+this.id).css('visibility','collapse');
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
                //td_conTag.setAttribute('style','border : 0px;');
                //td_conTag.innerHTML = Data[i].ITEM_INFO[j].CON_TYPE;
                tbody_trTag.appendChild(td_conTag);
                
                let td_More = document.createElement('td');
                td_More.setAttribute('id','td_More'+Data[i].ITEM_INFO[j].ITEM_NM);
                td_More.setAttribute('class','td_More');
                //td_More.setAttribute('style','padding:5px 5px; text-align : center; vertical-align: top;');
                // td_More.setAttribute('class','dx-icon dx-icon-search');
                tbody_trTag.appendChild(td_More);
                
                let td_Icon;
                let moreButton;

                let conTag;
                let conTag2; //Between 컨트롤일 경우 사용 

                switch(Data[i].ITEM_INFO[j].CON_TYPE){
                    case '001'://text
                    case '006'://greaterEqual
                    case '007'://lessEqual
                    case '008'://greater
                    case '009'://less
                        conTag = document.createElement('input');
                        conTag.setAttribute('type','text');
                        conTag.setAttribute('autocomplete','off');
                        //conTag.setAttribute('maxlength','10');
                        var conType = '';
                        if(Data[i].ITEM_INFO[j].CON_TYPE === '001'){
                            conType = 'text';
                        }else if(Data[i].ITEM_INFO[j].CON_TYPE === '006'){
                            conType = 'greaterEqual';
                        }else if(Data[i].ITEM_INFO[j].CON_TYPE === '007'){
                            conType = 'lessEqual';
                        }else if(Data[i].ITEM_INFO[j].CON_TYPE === '008'){
                            conType = 'greater';
                        }else if(Data[i].ITEM_INFO[j].CON_TYPE === '009'){
                            conType = 'less';                
                        }
                        conTag.setAttribute('id', conType+Data[i].ITEM_INFO[j].ITEM_ID);
                        conTag.setAttribute('class','td_'+conType);
                        conTag.setAttribute('style','width : 97.5% ; height : 20px ; margin : 1px 1px 1px 1px; background-color: #ffffff; color: #333; border-width: 1px; border-style: solid;  border-radius: 0; border-color: #ddd; vertical-align: super; ');
                        break;
                    case '002': //combobox
                        
                        conTag = document.createElement('select');
                        conTag.setAttribute('id', 'combobox'+Data[i].ITEM_INFO[j].ITEM_ID);    
                        conTag.setAttribute('class','td_combobox');
                        conTag.setAttribute('style','width : 100% ; height : 25px ; margin : 1px 1px 1px 1px; font-family:Malgun gothic; border-radius:5px; border-width:2px; border-color:#f0f2f4 ');
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
                        conTag.setAttribute('id', 'checkgroup'+Data[i].ITEM_INFO[j].ITEM_ID);
                        conTag.setAttribute('class','td_checkgroup');
                        conTag.setAttribute('style','width : 100% ; height : 25px ; margin : 1px 1px 1px 1px;  overflow:hidden ; display:flex; flex-wrap : wrap;');
                        //conTag.setAttribute('style','width : 100% ;  margin : 1px 1px 1px 1px;  overflow:hidden ; display:flex; flex-wrap : wrap;');
                        for(var t = 0 ; t < codeArr.length ; t++){
                            let checkTag = document.createElement('input');
                            checkTag.setAttribute('type','checkbox');
                            checkTag.setAttribute('name','checkGroup'+Data[i].ITEM_INFO[j].ITEM_NM); 
                            checkTag.setAttribute('id',codeArr[t]);
                            checkTag.setAttribute('value',codeArr[t]);
                            checkTag.setAttribute('style','cursor: pointer; user-select: none; width:17px; heigth:17px; border:#cbcbcb; border-radius:4px; vertical-align : middle;');
                            
                            let labelTag = document.createElement('label');
                            labelTag.setAttribute('for',codeArr[t]);
                            labelTag.setAttribute('style','vertical-align : middle; width:80px ; overflow : hidden ; text-overflow : ellipsis; white-space : nowrap ; display : inline-block;');
                            labelTag.innerHTML = valArr[t] ;   
                            

                            //2022.06.28 div로 체크박스와 라벨을 감싸준다.
                            let divTag = document.createElement('div');
                            divTag.setAttribute('id','check'+Data[i].ITEM_INFO[j].ITEM_ID);
                            divTag.setAttribute('style','min-width : 100px; ');
                            divTag.append(checkTag);
                            divTag.append(labelTag);

                            conTag.append(divTag);
                            // conTag.append(checkTag);
                            // conTag.append(labelTag);
                        }
                        td_Icon = document.createElement('i');
                        td_Icon.setAttribute('id','td_Icon'+Data[i].ITEM_INFO[j].ITEM_NM);    
                        td_Icon.setAttribute('class','dx-icon dx-icon-search');
                        td_Icon.setAttribute('style','cursor:pointer');
                        td_More.appendChild(td_Icon);
                        //아이템 10개 넘어가면 ... 더보기 버튼 생성
                        if(codeArr.length > 10){
                            moreButton = document.createElement('i');
                            moreButton.setAttribute('id','moreButton'+Data[i].ITEM_INFO[j].ITEM_ID);    
                            moreButton.setAttribute('class','dx-icon dx-icon-overflow');
                            moreButton.setAttribute('style','cursor:pointer');
                            td_More.appendChild(moreButton);
                            moreButton.onclick = function(){ 
                                //this.parentNode.clientHeight -> 선택요소의 상위 태그의 높이구하기 (td_More)
                                var tagHeight       = this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.style.height;
                                var tagScrollHeight = this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.scrollHeight;
                                var tagMax_Height   = this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.style.maxHeight;

                                //height가 기본 25px이면 접혀있는 상태 , height가 scroll Height랑 같다면 펴져있는 상태 / scollHeight 는 브라우저 크기에 따른 태그 크기
                                if(tagHeight === '25px'){
                                    if(parseInt(tagScrollHeight) > parseInt(tagHeight.substr(0,tagHeight.length-2))){    
                                        $('#'+this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.id).css('height',tagScrollHeight+'px');            
                                    }
                                }else{
                                    $('#'+this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.id).css('height','25px');                
                                }
                             }
                        }else{
                            conTag.style.height = 'auto';
                        }    
                        break;
                    case '004': //radiogroup
                        
                        var codeArr = Data[i].ITEM_INFO[j].CODE_LIST.split(',');
                        var valArr = Data[i].ITEM_INFO[j].VALUE_LIST.split(',');
                        
                        codeArr.unshift('X');
                        valArr.unshift('선택안함');

                        conTag = document.createElement('div');
                        conTag.setAttribute('id', 'radiogroup'+Data[i].ITEM_INFO[j].ITEM_ID);
                        conTag.setAttribute('class','td_radiogroup');
                        conTag.setAttribute('style','width : 100% ; height : 25px ; margin : 1px 1px 1px 1px;  display:flex; flex-wrap : wrap;');
                        for(var t = 0 ; t < codeArr.length ; t++){
                            let radioTag = document.createElement('input');
                            radioTag.setAttribute('type','radio');
                            radioTag.setAttribute('name','radioGroup'+Data[i].ITEM_INFO[j].ITEM_NM); 
                            radioTag.setAttribute('id',codeArr[t]);
                            radioTag.setAttribute('value',codeArr[t]);
                            radioTag.setAttribute('style','cursor: pointer; user-select: none; width:17px; heigth:17px; border:#cbcbcb; border-radius:4px; vertical-align : middle;');
                            radioTag.onclick = function(){
                                
                            };

                            let labelTag = document.createElement('label');
                            labelTag.setAttribute('for',codeArr[t]);
                            labelTag.setAttribute('style','vertical-align : middle; width:80px ; overflow : hidden ; text-overflow : ellipsis; white-space : nowrap ; display : inline-block;');
                            labelTag.innerHTML = valArr[t] ;   
                            
                            //2022.06.28 div로 라디오박스와 라벨을 감싸준다.
                            let divTag = document.createElement('div');
                            divTag.setAttribute('id','check'+Data[i].ITEM_INFO[j].ITEM_ID);
                            divTag.setAttribute('style',' min-width : 100px; ');
                            divTag.append(radioTag);
                            divTag.append(labelTag);
                            
                            conTag.append(divTag);
                            // conTag.append(radioTag);
                            // conTag.append(labelTag);
                        }
                        td_Icon = document.createElement('i');
                        td_Icon.setAttribute('id','td_Icon'+Data[i].ITEM_INFO[j].ITEM_NM);    
                        td_Icon.setAttribute('class','dx-icon dx-icon-search');
                        td_Icon.setAttribute('style','cursor:pointer');
                        td_More.appendChild(td_Icon);
                        if(codeArr.length > 10){
                            moreButton = document.createElement('i');
                            moreButton.setAttribute('id','moreButton'+Data[i].ITEM_INFO[j].ITEM_NM);    
                            moreButton.setAttribute('class','dx-icon dx-icon-overflow');
                            moreButton.setAttribute('style','cursor:pointer');
                            td_More.appendChild(moreButton);
                            moreButton.onclick = function(){
                                //this.parentNode.clientHeight -> 선택요소의 상위 태그의 높이구하기 (td_More)
                                var tagHeight       = this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.style.height;
                                var tagScrollHeight = this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.scrollHeight;
                                var tagMax_Height   = this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.style.maxHeight;

                                //height가 기본 25px이면 접혀있는 상태 , height가 scroll Height랑 같다면 펴져있는 상태 / scollHeight 는 브라우저 크기에 따른 태그 크기
                                if(tagHeight === '25px'){
                                    if(parseInt(tagScrollHeight) > parseInt(tagHeight.substr(0,tagHeight.length-2))){    
                                        $('#'+this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.id).css('height',tagScrollHeight+'px');            
                                    }
                                }else{
                                    $('#'+this.parentNode.parentNode.getElementsByClassName('td_conTag')[0].firstElementChild.id).css('height','25px');                
                                }
                            }
                        }else{
                            conTag.style.height = 'auto';
                        }
                        break;
                    case '005': //between  2022.07.27 추가
                        conTag = document.createElement('input');
                        conTag.setAttribute('type','text');
                        conTag.setAttribute('autocomplete','off');
                        conTag.setAttribute('maxlength','10');
                        conTag.setAttribute('id', 'text'+Data[i].ITEM_INFO[j].ITEM_ID);
                        conTag.setAttribute('class','td_between');
                        conTag.setAttribute('style','width : 45% ; left : 0px ; rigtht : 53% ; height : 20px ; margin : 1px 1px 1px 1px; background-color: #ffffff; color: #333; border-width: 1px; border-style: solid;  border-radius: 0; border-color: #ddd; vertical-align: super; ');
                        
                        conTag2 = document.createElement('input');
                        conTag2.setAttribute('type','text');
                        conTag2.setAttribute('autocomplete','off');
                        conTag2.setAttribute('maxlength','10');
                        conTag2.setAttribute('id', 'text'+Data[i].ITEM_INFO[j].ITEM_ID+'_2');
                        conTag2.setAttribute('class','td_between');
                        conTag2.setAttribute('style','width : 45% ; left : 53% ; rigtht : 0px ; height : 20px ; margin : 1px 1px 1px 1px; background-color: #ffffff; color: #333; border-width: 1px; border-style: solid;  border-radius: 0; border-color: #ddd; vertical-align: super; ');
                        
                        break;

                }
                
                if(td_Icon !== undefined){
                    td_Icon.onclick = function(){
                        var conTagId = this.parentNode.parentElement.childNodes[1].id;
                        var conType = conTagId.substr(conTagId.length-3, conTagId.length);
                        obz.setPageParam('ITEM_NM', this.id.substring('td_Icon'.length));
                        obz.setPageParam('CON_TYPE', conType);
                        obz.openDialogNew(instance, '', obz.getFrameURL('/managebaseserver/webframes/jcomponent/design/codesearch'), 'setCodeSearchData', false);
                    };
                }
                td_conTag.appendChild(conTag);

                //2022.07.27 Between인 경우 Input 두개 있어야 함.
                if(conTag2 !== '' && conTag2 !== null && conTag2 !== undefined){
                    let waveLabel = document.createElement('label');
                    waveLabel.innerHTML = ' ~ '; 
                    waveLabel.setAttribute('class','label');
                    waveLabel.setAttribute('style','vertical-align: super; ');
                    td_conTag.appendChild(waveLabel);
                    td_conTag.appendChild(conTag2);
                }

            }   
        }//end for
        
    };//init end
    
    
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
        
        //컨트롤 타입이 무엇인지 text,combo,radio,.. 
        //$('.td_conTag')[0].id.substring($('.td_conTag')[0].id.length,$('.td_conTag')[0].id.length-3)  
        for(var i = 0 ; i < conTagArr.length ; i++){
            
            var data = new Object(); 
            //타입 세팅(STRING,NUMERIC)
            data.type     = itemTypeArr[i];
            data.id       = itemIdArr[i];
            var tagId = $('.td_conTag')[i].id;
            data.operator = tagId.substring(tagId.length,tagId.length-3);

            switch(tagId.substring(tagId.length,tagId.length-3)){
                case '001'://text
                case '006'://greaterEqual(>=)
                case '007'://lessEqual(<=)
                case '008'://greater(>)
                case '009'://less(<)
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
                        data.nm   = $('.td_conTag')[i].children[0].options[$('.td_conTag')[i].children[0].selectedIndex].text
                        selDataList.push(data);
                    }

                    break;    
                case '003'://checkgroup
                    var checkVal = '';
                    var checkNm  = '';
                    var parentTagId = $('.td_conTag')[i].id;
                    
                    for(var j = 0 ; j <  $('#'+parentTagId).find('input').length ; j++){
                        if($('#'+parentTagId).find('input')[j].checked === true){
                            checkVal += $('#'+parentTagId).find('input')[j].value + ',';
                            checkNm  += $('#'+parentTagId).find('input')[j].nextSibling.innerText + ',';
                           
                        }
                    }
                    
                    if(checkVal.length > 1){
                        checkVal = checkVal.substring(0,checkVal.length - 1);
                        checkNm  = checkNm.substring(0,checkNm.length - 1);
                    }

                    if(checkVal !== ''){
                        data.item = itemArr[i];
                        data.val  = checkVal;
                        data.nm   = checkNm;
                        selDataList.push(data);
                    }

                    conTagVal.push(checkVal);
                    break;
                case '004'://radiogroup
                    var checkVal = '';
                    var checkNm = '';
                    var parentTagId = $('.td_conTag')[i].id;
                    
                    for(var j = 0 ; j < $('#'+parentTagId).find('input').length ; j++){
                        if($('#'+parentTagId).find('input')[j].value !== 'X'  &&  $('#'+parentTagId).find('input')[j].checked === true){
                            checkVal += $('#'+parentTagId).find('input')[j].value + ',';
                            checkNm  += $('#'+parentTagId).find('input')[j].nextSibling.innerText + ',';
                        }
                    }
                    if(checkVal.length > 1){
                        checkVal = checkVal.substring(0,checkVal.length - 1);
                        checkNm  = checkNm.substring(0,checkNm.length - 1);
                    }

                    if(checkVal !== ''){
                        data.item = itemArr[i];
                        data.val  = checkVal;
                        data.nm   = checkNm;
                        selDataList.push(data);
                    }

                    conTagVal.push(checkVal);
                    break;
                case '005'://between
                    //첫번째 아이템만 존재할때
                    if($('.td_conTag')[i].children[0].value !== '' && $('.td_conTag')[i].children[2].value === ''){
                        data.item = itemArr[i];
                        data.val  = $('.td_conTag')[i].children[0].value;  //Between 첫번째 값
                        data.val2  = ''; //Between 두번째 값
                        selDataList.push(data);
                    //두번째 아이템만 존재할때
                    }else if($('.td_conTag')[i].children[0].value === '' && $('.td_conTag')[i].children[2].value !== ''){
                        data.item = itemArr[i];
                        data.val  = '';  //Between 첫번째 값
                        data.val2  = $('.td_conTag')[i].children[2].value; //Between 두번째 값
                        selDataList.push(data);
                    //둘다 존재하는 경우
                    }else  if($('.td_conTag')[i].children[0].value !== '' && $('.td_conTag')[i].children[0].value !== ''){
                        data.item = itemArr[i];
                        data.val  = $('.td_conTag')[i].children[0].value;  //Between 첫번째 값
                        data.val2  = $('.td_conTag')[i].children[2].value; //Between 두번째 값
                        selDataList.push(data);
                    }
                    break;
            }
        }
        
        // console.log(selDataList);
        return selDataList;

    }
    
    this.settingFilterCode = function(itemList , valList){
        // console.log("sel itemList :::::::::::" +itemList);
      // console.log("sel valList ::::::::::: " +valList);

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
                                    // console.log($('#'+parentTagId).find('input')[j].value);
                                    
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
                                    // console.log($('#'+parentTagId).find('input')[j].value);
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

    this.clearFilter = function(){
         
         // 사용자 입력 항목 리스트 조합 초기화
         var conTagArr = $('.td_conTag');
         
         //세팅 값 초기화
         for(var i = 0 ; i < conTagArr.length ; i++){
             
             var tagId = $('.td_conTag')[i].id;
             switch(tagId.substring(tagId.length,tagId.length-3)){
                 case '001'://text
                 case '006':
                 case '007':
                 case '008':
                 case '009':  
                     if($('.td_conTag')[i].children[0].value !== ''){
                         $('#'+$('.td_conTag')[i].children[0].id).val('');
                     }
 
                     break;
                 case '002'://combobox
 
                     if($('.td_conTag')[i].children[0].value !== '' && $('.td_conTag')[i].children[0].value !== '%'){
                        $('#'+$('.td_conTag')[i].children[0].id).val('%');
                     }
 
                     break;    
                 case '003'://checkgroup
                     var checkVal = '';
                     var checkNm  = '';
                     var parentTagId = $('.td_conTag')[i].id;
                     
                     for(var j = 0 ; j <  $('#'+parentTagId).find('input').length ; j++){
                        $('#'+parentTagId).find('input')[j].checked = false;
                     }
                     
                     break;
                 case '004'://radiogroup
                     var checkVal = '';
                     var checkNm = '';
                     var parentTagId = $('.td_conTag')[i].id;
                     
                     for(var j = 0 ; j < $('#'+parentTagId).find('input').length ; j++){
                         if($('#'+parentTagId).find('input')[j].value !== 'X'  &&  $('#'+parentTagId).find('input')[j].checked === true){
                            $('#'+parentTagId).find('input')[j].checked = false;
                         }
                     }
                     
                     break;
                 case '005'://between
    
                     if($('.td_conTag')[i].children[0].value !== ''){
                        $('#'+$('.td_conTag')[i].children[0].id).val('');
                     }
                     if($('.td_conTag')[i].children[2].value !== ''){
                        $('#'+$('.td_conTag')[i].children[2].id).val('');
                     }

                     break;
             }
         }
    }
    //취소버튼 클릭시에 컨트롤 disable 처리되어있는부분들 원복
    this.cancelFilter = function(){
        var conTagArr = $('.td_conTag');
        for(var i = 0 ; i < conTagArr.length ; i++){
            $('#'+$('.tbody_trTag')[i].id).css('pointer-events','');
            $('#'+$('.tbody_trTag')[i].id + ' > *').css('opacity','');
        }
    }
    //수정버튼 클릭시 이벤트 
    this.editFilter = function(ruleId, code, operator){
         
        //console.log("수정할 항목 ruleid : " + ruleId + "/code 값 : "+ code);

        // 사용자 입력 항목 리스트 조합 초기화
        var conTagArr = $('.td_conTag');

        //세팅 값 초기화
        for(var i = 0 ; i < conTagArr.length ; i++){
            $('#'+$('.tbody_trTag')[i].id).css('pointer-events','none');
            $('#'+$('.tbody_trTag')[i].id + ' > *').css('opacity','0.7');

            var tagId = $('.td_conTag')[i].id;
            switch(tagId.substring(tagId.length,tagId.length-3)){
                case '001'://text
                case '006':
                case '007':    
                case '008':
                case '009':    
                    if(ruleId === conTagArr[i].firstChild.id.substr(4,conTagArr[i].length)){    
                        $('#'+$('.tbody_trTag')[i].id).css('pointer-events','');
                        $('#'+$('.tbody_trTag')[i].id + ' > *').css('opacity','');
                        $('#'+$('.td_conTag')[i].children[0].id).val(code);//인자값으로 넘어온 코드 세팅
                    }    
                    break;
                case '002'://combobox
                    if(ruleId === conTagArr[i].firstChild.id.substr(8,conTagArr[i].length)){    
                        $('#'+$('.tbody_trTag')[i].id).css('pointer-events','');
                        $('#'+$('.tbody_trTag')[i].id + ' > *').css('opacity','');
                        $('#'+$('.td_conTag')[i].children[0].id).val(code);
                    }
                    
                    break;    
                case '003'://checkgroup
                    if(ruleId === conTagArr[i].firstChild.id.substr(10,conTagArr[i].length)){
                        $('#'+$('.tbody_trTag')[i].id).css('pointer-events','');
                        $('#'+$('.tbody_trTag')[i].id + ' > *').css('opacity','');

                        var parentTagId = $('.td_conTag')[i].id;
                        for(var j = 0 ; j <  $('#'+parentTagId).find('input').length ; j++){
                            var codeArr = code.split(',');
                            //넘어온 코드값과 해당태그의 아이디값이 같다면 체크
                            for(var idx in codeArr){
                                if($('#'+parentTagId).find('input')[j].id === codeArr[idx]){
                                    $('#'+parentTagId).find('input')[j].checked = true;        
                                }
                            }
                        }
                    }
                    
                    break;
                case '004'://radiogroup
                    if(ruleId === conTagArr[i].firstChild.id.substr(10,conTagArr[i].length)){    
                        $('#'+$('.tbody_trTag')[i].id).css('pointer-events','');
                        $('#'+$('.tbody_trTag')[i].id + ' > *').css('opacity','');

                    }
                    var checkVal = '';
                    var checkNm = '';
                    var parentTagId = $('.td_conTag')[i].id;
                    
                    for(var j = 0 ; j < $('#'+parentTagId).find('input').length ; j++){
                        if($('#'+parentTagId).find('input')[j].value !== 'X'  &&  $('#'+parentTagId).find('input')[j].checked === true){
                           //$('#'+parentTagId).find('input')[j].checked = false;
                        }
                    }
                    
                    break;
                case '005'://between
                    var codeArr = code.split(',');
                    
                    if(ruleId === conTagArr[i].firstChild.id.substr(4,conTagArr[i].length)){    
                        $('#'+$('.tbody_trTag')[i].id).css('pointer-events','');
                        $('#'+$('.tbody_trTag')[i].id + ' > *').css('opacity','');
                        
                        //부등호로 넘어오는 경우에는 코드값 배열 인덱스가 하나 밖에 없음
                        if(operator==='>='){
                            $('#'+$('.td_conTag')[i].children[0].id).val(codeArr[0]);
                        }else if(operator==='<='){
                            $('#'+$('.td_conTag')[i].children[0].id+'_2').val(codeArr[0]);
                        }else{//BETWEEN 
                            $('#'+$('.td_conTag')[i].children[0].id).val(codeArr[0]);
                            $('#'+$('.td_conTag')[i].children[0].id+'_2').val(codeArr[1]);
                        }

                    }   
                    break;
            }
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
            // console.log("code : " + codeData);
            return codeData;
        }else if(type === 'xml'){
            // console.log("xml : " + xmlData);
            return xmlData;
        }else{
            // console.log("html : " + htmlData);
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
            // console.log("code : " + codeData);
            return codeData;
        }else if(type === 'xml'){
            // console.log("xml : " + xmlData);
            return xmlData;
        }else{
            // console.log("html : " + htmlData);
            return htmlData;
        }
    }

    //2022.04.13 세트로 묶기 (ex :  {아이템 : 상권코드;상권코드_PMPT , 코드 : if(get("상권코드").compareTo(get("상권코드_PMPT"))){}else{return false;}   } 
    this.getRuleCode3 = function(type, selArr){
        var operator = '&&'; //임시 
        var ruleObj;
        if(selArr === null || selArr === undefined || selArr.length === 0){
            ruleObj = this.getSelectedData();
        }else{
            ruleObj = selArr;
        }
        
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
                       var mulitVal =  ruleObj[i].val.split(',');
                       tempCode = "if("
                       for(var m = 0 ; m < mulitVal.length ; m++){
                            tempCode += "( \\\""+ ruleObj[i].item +"\\\".compareTo(\\\""+mulitVal[m]+"\\\") == 0) ||"                                 
                       }
                       tempCode = tempCode.substring(0,tempCode.length-2); //&& 제거

                       //tempCode = "if((obzFunction.operatorIN(\\\""+ruleObj[i].item +"\\\"),\\\""+ ruleObj[i].item +"_PMPT\\\"))";

                       tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\""+ruleObj[i].item+"\"),  get(\""+ruleObj[i].item+"_PMPT\")))]]></value>";
                       tempHtml = "{"+ ruleObj[i].item + "} IN (" + ruleObj[i].item + "_PMPT) <br> AND";
                   }else{                

                       switch(ruleObj[i].operator){
                            case '<=':
                                if((ruleObj[i].val === ''|| ruleObj[i].val === undefined)&&(ruleObj[i].val2 !== ''|| ruleObj[i].val2 !== undefined)){ //첫번째 아이템 없고 두번째 아이템 존재  -> 아이템 >= 값1        
                                    tempCode = "if(\\\"" + ruleObj[i].item + "\\\" <= \\\""+ruleObj[i].item+"_PMPT2\\\"";
                                    tempXml  += "<value><![CDATA[(get(\""+ruleObj[i].item+"\") get(\""+ruleObj[i].item+"_PMPT2\"))]]></value>";
                                    tempHtml = "{"+ ruleObj[i].item + "} &lt;= " + ruleObj[i].item + "_PMPT2 <br> AND";     
                                
                                }else if((ruleObj[i].val !== '' || ruleObj[i].val !== undefined)&&(ruleObj[i].val2 === '' || ruleObj[i].val2 === undefined)){//첫번째 아이템 존재 두번째 아이템 없음  -> 아이템 <= 값2
                                    tempCode = "if(\\\"" + ruleObj[i].item + "\\\" <= \\\""+ruleObj[i].item+"_PMPT\\\"";
                                    tempXml  += "<value><![CDATA[(\""+ruleObj[i].item+"\" <= \""+ruleObj[i].item+"_PMPT\")]]></value>";
                                    tempHtml = "{"+ ruleObj[i].item + "} &lt;= " + ruleObj[i].item + "_PMPT <br> AND";          
                                }
                                break;
                            case '>=':
                                if((ruleObj[i].val === ''|| ruleObj[i].val === undefined)&&(ruleObj[i].val2 !== ''|| ruleObj[i].val2 !== undefined)){ //첫번째 아이템 없고 두번째 아이템 존재  -> 아이템 >= 값1        
                                    tempCode = "if(\\\"" + ruleObj[i].item + "\\\" >= \\\""+ruleObj[i].item+"_PMPT2\\\" ";
                                    tempXml  += "<value><![CDATA[(\""+ruleObj[i].item+"\" >= \""+ruleObj[i].item+"_PMPT2\")]]></value>";
                                    tempHtml = "{"+ ruleObj[i].item + "} &gt;= " + ruleObj[i].item + "_PMPT2 <br> AND";     
                                
                                }else if((ruleObj[i].val !== '' || ruleObj[i].val !== undefined)&&(ruleObj[i].val2 === '' || ruleObj[i].val2 === undefined)){//첫번째 아이템 존재 두번째 아이템 없음  -> 아이템 <= 값2
                                    tempCode = "if(\\\"" + ruleObj[i].item + "\\\" >= \\\""+ruleObj[i].item+"_PMPT\\\" ";
                                    tempXml  += "<value><![CDATA[(\""+ruleObj[i].item+"\" >= \""+ruleObj[i].item+"_PMPT\")]]></value>";
                                    tempHtml = "{"+ ruleObj[i].item + "} &gt;= " + ruleObj[i].item + "_PMPT <br> AND";          
                                }
                                break;
                            case '<':
                                tempCode = "if( \\\""+ ruleObj[i].item +"\\\" < \\\""+ruleObj[i].item+"_PMPT\\\" ";
                                tempXml += "<value><![CDATA[(get(\""+ruleObj[i].item+"\") < get(\""+ruleObj[i].item+"_PMPT\"))]]></value>";
                                tempHtml = "{"+ ruleObj[i].item + "} &lt; " + ruleObj[i].item + "_PMPT <br> AND";
                                break;
                            case '>':
                                tempCode = "if( \\\""+ ruleObj[i].item +"\\\" > \\\""+ruleObj[i].item+"_PMPT\\\" ";
                                tempXml += "<value><![CDATA[(get(\""+ruleObj[i].item+"\") > get(\""+ruleObj[i].item+"_PMPT\"))]]></value>";
                                tempHtml = "{"+ ruleObj[i].item + "} &gt; " + ruleObj[i].item + "_PMPT <br> AND";
                                break;
                            case 'BETWEEN':
                                if((ruleObj[i].val === ''|| ruleObj[i].val === undefined)&&(ruleObj[i].val2 !== ''|| ruleObj[i].val2 !== undefined)){ //첫번째 아이템 없고 두번째 아이템 존재  -> 아이템 >= 값1        
                                    
                                    tempCode = "if( \\\""+ ruleObj[i].item +"\\\" <= \\\""+ruleObj[i].item+"_PMPT2\\\" ";
                                    tempXml += "<value><![CDATA[(get(\""+ruleObj[i].item+"\") <= get(\""+ruleObj[i].item+"_PMPT2\"))]]></value>";
                                    tempHtml = "{"+ ruleObj[i].item + "} &lt;= " + ruleObj[i].item + "_PMPT2 <br> AND";     

                                }else if((ruleObj[i].val !== '' || ruleObj[i].val !== undefined)&&(ruleObj[i].val2 === '' || ruleObj[i].val2 === undefined)){//첫번째 아이템 존재 두번째 아이템 없음  -> 아이템 <= 값2
                                    
                                    tempCode = "if( \\\""+ ruleObj[i].item +"\\\" >= \\\""+ruleObj[i].item+"_PMPT2\\\" ";
                                    tempXml += "<value><![CDATA[(get(\""+ruleObj[i].item+"\") >= get(\""+ruleObj[i].item+"_PMPT2\"))]]></value>";
                                    tempHtml = "{"+ ruleObj[i].item + "} &gt;= " + ruleObj[i].item + "_PMPT2 <br> AND";   
                                
                                }else{                                                    //둘다 존재   -> 값1 <= 아이템 <= 값2
    
                                    tempCode = "if((\\\""+ ruleObj[i].item +"\\\" >= \\\""+ruleObj[i].item+"_PMPT\\\") && (\\\""+ ruleObj[i].item +"\\\" <= \\\""+ruleObj[i].item+"_PMPT2\\\")";
                                    tempXml += "<value><![CDATA[((get(\""+ruleObj[i].item+"\") >= get(\""+ruleObj[i].item+"_PMPT\")) && (get(\""+ruleObj[i].item+"\") <= get(\""+ruleObj[i].item+"_PMPT2\")))]]></value>";
                                    tempHtml = "{"+ ruleObj[i].item + "} BETWEEN " + ruleObj[i].item + "_PMPT" + " AND " + ruleObj[i].item + "_PMPT2 <br> AND";    
    
                                }
                                break;
                            case '<>':
                                break;
                            case 'NOT IN':        
                                break;
                            default:   //IN, = 
                                tempCode = "if((\\\""+ ruleObj[i].item +"\\\".compareTo(\\\""+ruleObj[i].item+"_PMPT\\\") == 0)";
                                tempXml += "<value><![CDATA[((get(\""+ruleObj[i].item+"\").compareTo(get(\""+ruleObj[i].item+"_PMPT\"))) == 0)]]></value>";
                                tempHtml = "{"+ ruleObj[i].item + "} = " + ruleObj[i].item + "_PMPT <br> AND";
                                break;
                        }     

                   }
               }else{//NUMERIC
                   if(ruleObj[i].val.split(',').length > 1){ //복수개

                        var mulitVal =  ruleObj[i].val.split(',');
                        tempCode = "if("
                        for(var m = 0 ; m < mulitVal.length ; m++){
                            tempCode += "(Double.parseDouble( \\\""+ ruleObj[i].item +"\\\") == Double.parseDouble(\\\""+mulitVal+"\\\") ) ||"                                 
                        }
                        tempCode = tempCode.substring(0,tempCode.length-2); //&& 제거
                       //tempCode = "if(obzFunction.operatorIN(\\\"'+ ruleObj[i].item + '\\\", \\\"'+ ruleObj[i].item +'_PMPT\\\"))";
            
                       tempXml += "<value><![CDATA[(obzFunction.operatorIN(get(\\\""+ruleObj[i].item+"\\\"), get(\\\""+ruleObj[i].item+"_PMPT\\\")))]]></value>";
                       tempHtml = "{"+ ruleObj[i].item + "} IN (" + ruleObj[i].item + "_PMPT) <br> AND";
                   }else{
                       /* BETWEEN */ //ex) 값1 ~ 값2   1.값1 만 입력할 경우   아이템 >= 값1 /  2.값2만 입력할 경우 아이템 <= 값2 로 풀리도록 변경
                       switch(ruleObj[i].operator){
                            case '<=':
                                if((ruleObj[i].val === ''|| ruleObj[i].val === undefined)&&(ruleObj[i].val2 !== ''|| ruleObj[i].val2 !== undefined)){ //첫번째 아이템 없고 두번째 아이템 존재  -> 아이템 >= 값1        
                                    tempCode = "if(Double.parseDouble(\\\"" + ruleObj[i].item + "\\\") <= (Double.parseDouble(\\\""+ruleObj[i].item+"_PMPT2\\\"))";
                                    tempXml  += "<value><![CDATA[(Double.parseDouble(get(\""+ruleObj[i].item+"\")) <= Double.parseDouble(get(\""+ruleObj[i].item+"_PMPT2\")))]]></value>";
                                    tempHtml = "{"+ ruleObj[i].item + "} &lt;= " + ruleObj[i].item + "_PMPT2 <br> AND";     
                                
                                }else if((ruleObj[i].val !== '' || ruleObj[i].val !== undefined)&&(ruleObj[i].val2 === '' || ruleObj[i].val2 === undefined)){//첫번째 아이템 존재 두번째 아이템 없음  -> 아이템 <= 값2
                                    tempCode = "if(Double.parseDouble(\\\"" + ruleObj[i].item + "\\\") <= (Double.parseDouble(\\\""+ruleObj[i].item+"_PMPT\\\"))";
                                    tempXml  += "<value><![CDATA[(Double.parseDouble(get(\""+ruleObj[i].item+"\")) <= Double.parseDouble(get(\""+ruleObj[i].item+"_PMPT\")))]]></value>";
                                    tempHtml = "{"+ ruleObj[i].item + "} &lt;= " + ruleObj[i].item + "_