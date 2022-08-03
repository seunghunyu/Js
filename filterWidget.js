
 function FilterCondition(id){
    this.ctl;
    this.id = "#" + id;
    var filterBuilder = undefined;
    var _filterData = undefined;
    var _name = "";
    var _id = ""; 
    var _fields = new Array();
    var _filter = new Array();

    var codeData = "";
    var htmlData = "";
    var xmlData = "";
    

    //DevExpress.setTemplateEngine("underscore");

    DevExpress.ui.dxTreeView.defaultOptions({ 
        //device: { deviceType: "desktop" },
        options: {
            searchEnabled: true,
            searchEditorOptions: {
                placeholder: "Type search value here...",
            },
            width:"200px",
            noDataText:"", 
            onItemRendered: function(e){  
                var _loc = document.location.href.split('html/')[0];
                if (getFieldType(e.itemData.dataType) == "string" || getFieldType(e.itemData.dataField) === "STRING")
                {
                    var i = document.createElement("img");
                    i.setAttribute("src", _loc+"img/BRMS/Icon_STRING.png");
                    i.style.verticalAlign="middle"
                    i.style.marginRight="5px"
                    e.itemElement.children(0).prepend(i);
                }
                else if(getFieldType(e.itemData.dataType) == "number" || getFieldType(e.itemData.dataField) === "NUMERIC")
                {
                    var i = document.createElement("img");
                    i.setAttribute("src", _loc+"img/BRMS/Icon_NUMERIC.png");
                    i.style.verticalAlign="middle"
                    i.style.marginRight="5px"
                    e.itemElement.children(0).prepend(i);
                }
               
            }, 
            
        }
       
    });

    /*
 $('.dx-popup-content').keydown(function(e){
                    if(e.keyCode == 13){
                        console.log("enter");
                        updateTexts();
                    }
                });

    */
     

    function getFieldType(item) {
        for(var i = 0; i < _fields.length; i++)
        {
            if(_fields[i].dataField === item)
            {
                return _fields[i].itemType
            }
        }
    }

    /*임시 데이터 
    var filter = [
        ["CUST_ID", "<>", "ADMIN"],
        "or",
        [
            ["고객명", "=", "AAA"],
            "and",
            ["상품금액", "<", 200]
        ]
    ];
    var fields = [
        {
            caption: "ID",
            id : "",
            width: 50,
            dataField: "Product_ID",
            dataType: "number"
        }, {
            id : "",
            dataField: "Product_Name",
            dataType: "string"
        }, {
            id : "",
            caption: "Cost",
            dataField: "Product_Cost",
            dataType: "number",
            format: "currency"
        }, {
            id : "",
            dataField: "Product_Sale_Price",
            caption: "Sale Price",
            dataType: "number",
            format: "currency"
        }, {
            id : "",
            dataField: "Product_Retail_Price",
            caption: "Retail Price",
            dataType: "number",
            format: "currency"
        }, {
            id : "",
            dataField: "Product_Current_Inventory",
            dataType: "number",
            caption: "Inventory"
        }, {
            id : "",
            caption : "직접입력",
            dataField: " ",
            dataType: "string"
        }
    ];*/

    this.init = function(){
       this.ctl = $(this.id).dxFilterBuilder({
            fields: _fields,
            value: _filter, 
            //maxGroupLevel:1,
            groupOperations:["and","or"],
            //filterOperations:["equal","notEqual","greaterThan","greaterThanOrEqual","isBlank","isNotBlank","lessThan","lessThanOrEqual"],
            onValueChanged:updateTexts,
            onInitialized:updateTexts,
            onEditorPreparing: function (e) {
                if (e.lookup)
                {
                    e.editorOptions.acceptCustomValue = true;
                    e.editorOptions.searchEnabled = true;
                    e.editorOptions.searchTimeout = 0;
                    e.editorOptions.onCustomItemCreating = function(args){
                        var newItem = {};
                        newItem.CODE = args.text
                        newItem.NAME = args.text;
                        args.component.option('dataSource').store.insert(newItem)
                        return newItem;
                    }
                }
                if(e.dataType === 'string')
                {
                    e.editorOptions.onKeyDown = function(args) {
                        var event = args.event;
                        var keyCode = event.keyCode;
            
                        // The next commented line is for debugging purposes:
                        //console.log(keyCode);
                            
                        // Allow: Backspace, Delete, Tab, Escape, Enter and '.'
                        
                        if ($.inArray(keyCode, [46, 8, 9, 27, 13]) !== -1 ||
                            // Allow: Ctrl+A
                            (keyCode == 65 && event.ctrlKey === true) ||
                            // Allow: Ctrl+C
                            (keyCode == 67 && event.ctrlKey === true) ||
                            // Allow: Ctrl+X
                            (keyCode == 88 && event.ctrlKey === true) ||
                            // Allow: home, end, left, right
                            (keyCode >= 35 && keyCode <= 40)) {
                            // Let it happen, don't do anything
                            return;
                        }
                        
                        // Ensure that it is a letter and stop the keypress otherwise
                        if ((keyCode < 65 || keyCode > 90)) {             //키패드 0~9 (65이하) 
                            if ((keyCode < 48 || keyCode > 57)) {
                                event.preventDefault();
                            }
                        }
                    }
                }
            },
            /*
            filterOperationDescriptions: {
                equal:"",
                notEqual:"",
                greaterThan:"",
                greaterThanOrEqual:"",
                lessThan:"",
                lessThanOrEqual:""
            }*/
            filterOperationDescriptions: {
                between:"Between",
                contains:"Contains",
                endsWith:"Ends with",
                equal:"Equals",
                greaterThan:"Greater than",
                greaterThanOrEqual:"Greater than or equal to",
                isBlank:"Is blank",
                isNotBlank:"Is not blank",
                lessThan:"Less than",
                lessThanOrEqual:"Less than or equal to",
                notContains:"Does not contain",
                notEqual:"Does not equal",
                startsWith:"Starts with"
            },
            customOperations: [{
                name: "anyof",
                caption: "Is any of",
                icon: "selectall",
                customizeText : function(fieldInfo) {
                    //2022.04.12 특수문자 입력시 방어로직 추가 필요
                    if(fieldInfo.field.lookup !== undefined)
                    {
                        //return fieldInfo.field.lookup.dataSource[fieldInfo.field.lookup.dataSource.findIndex(function(find_item) {return find_item.CODE === fieldInfo.value})].NAME
                        if (fieldInfo.field.lookup.dataSource[fieldInfo.field.lookup.dataSource.findIndex(function(find_item) {return find_item.CODE === fieldInfo.value})] === undefined)
                        {
                            return fieldInfo.value
                        }
                        else
                        {
                            return fieldInfo.field.lookup.dataSource[fieldInfo.field.lookup.dataSource.findIndex(function(find_item) {return find_item.CODE === fieldInfo.value})].NAME
                        }
                    }
                    else
                    {
                        return fieldInfo.value
                    }
                },
                editorTemplate: function(conditionInfo) {
                    return $("<div>").dxTagBox({
                        value: conditionInfo.value,
                        items: [],
                        onFocusIn: function(e) {
                            if(conditionInfo.field.lookup !== undefined)
                            {
                                e.component.option("items", conditionInfo.field.lookup.dataSource) ;
                                e.component.option("displayExpr", "NAME") ;
                                e.component.option("valueExpr", "CODE") ;
                            }
                        },
                        searchEnabled: true,
                        searchTimeout:10,
                        // displayExpr: "NAME",
                        // valueExpr: "CODE",
                        onValueChanged: function(e) {
                            conditionInfo.setValue(e.value && e.value.length ? e.value : null);
                        },
                        width: "auto",
                        acceptCustomValue: true,
                        onCustomItemCreating: function(args) {
                            var component;
                            var currentItems;
                            if(conditionInfo.field.lookup === undefined)
                            {
                                var newValue = args.text
                                component = args.component,
                                currentItems = component.option("items");
                                currentItems.unshift(newValue);
                                component.option("items", currentItems);
                                args.customItem = newValue;
                            }
                            else
                            {
                                var newValue = {};
                                newValue.CODE = args.text
                                newValue.NAME = args.text;
                                component = args.component,
                                currentItems = component.option("items");
                                currentItems.unshift(newValue);
                                component.option("items", currentItems);
                                args.customItem = newValue;
                            }
                            

                            //args.component.option('dataSource').store.insert(newItem)
                            //return newItem;


                        },
                        noDataText:"",
                        showClearButton:true,
                    });
                },
                calculateFilterExpression: function(filterValue, field) {
                    return filterValue && filterValue.length
                        && Array.prototype.concat.apply([], filterValue.map(function(value) {
                            return [[field.dataField, "=", value], "or"];
                        })).slice(0, -1);
                }
            }, {
                name: "notanyof",
                caption: "Is Not any of",
                icon: "unselectall",
                customizeText : function(fieldInfo) {
                    //2022.04.12 특수문자 입력시 방어로직 추가 필요
                    if(fieldInfo.field.lookup !== undefined)
                    {
                        return fieldInfo.field.lookup.dataSource[fieldInfo.field.lookup.dataSource.findIndex(function(find_item) {return find_item.CODE === fieldInfo.value})].NAME
                    }
                    else
                    {
                        return fieldInfo.value
                    }
                },
                editorTemplate: function(conditionInfo) {
                    return $("<div>").dxTagBox({
                        value: conditionInfo.value,
                        items: [],
                        onFocusIn: function(e) {
                            if(conditionInfo.field.lookup !== undefined)
                            {
                                e.component.option("items", conditionInfo.field.lookup.dataSource) ;
                                e.component.option("displayExpr", "NAME") ;
                                e.component.option("valueExpr", "CODE") ;
                            }
                        },
                        searchEnabled: true,
                        searchTimeout:100,
                        onValueChanged: function(e) {
                            conditionInfo.setValue(e.value && e.value.length ? e.value : null);
                        },
                        width: "auto",
                        acceptCustomValue: true,
                        onCustomItemCreating: function(args) {
                            if(conditionInfo.field.lookup !== undefined)
                            {
                                
                            }
                            else
                            {
                                var newValue = args.text,
                                component = args.component,
                                currentItems = component.option("items");
                                currentItems.unshift(newValue);
                                component.option("items", currentItems);
                                args.customItem = newValue;
                            }
                        },
                        noDataText:"",
                        showClearButton:true,
                    });
                },
                calculateFilterExpression: function(filterValue, field) {
                    return filterValue && filterValue.length
                        && Array.prototype.concat.apply([], filterValue.map(function(value) {
                            return [[field.dataField, "=", value], "or"];
                        })).slice(0, -1);
                }
            }],
            /*,
            customOperations : [{
                name: "<",
                caption: "<",
                dataTypes: "number"
            }, {
                name: "<=",
                caption: "<=",
                dataTypes: "number"
            }, {
                name: ">",
                caption: ">",
                dataTypes: "number"
            }, {
                name: ">=",
                caption: ">=",
                dataTypes: "number"
            }, {
                name: "=",
                caption: "=="
            }, {
                name: "<>",
                caption: "<>"
            }]*/
       }).dxFilterBuilder("instance");
       _id = this.id; 
       this.ctl = $(this.id).dxFilterBuilder('instance');
       filterBuilder = $(this.id).dxFilterBuilder('instance');
       //filterBuilder = $(this.id).dxFilterBuilder('instance');
       return this.ctl;
    };

    /**
     * @version 20211020
     * @description 컨트롤 값 변화시 데이터 값 세팅 
     * @param 
     */
    function updateTexts(e){
        if(_id != ""){
            _filterData = $(_id).dxFilterBuilder("instance").option("value");
            _filter = _filterData; 
            console.log(_filterData);
        }
    }
    
    /**
    * @version 20211020
    * @description 위젯 초기화
    * @param 
    */
    this.removeData = function() {
        if(_id != ""){
            console.log("_id : " + _id);
            $(_id).dxFilterBuilder({value : ''});
            $(_id).dxFilterBuilder({filter : ''});
        }
    }  

    
    /**
    * @version 20211022
    * @description getCodeData 호출 리턴 값인 codeData 초기화
    * @param 
    * @returns 
    */
    this.clearCode = function(){ 
        codeData = "";         
        htmlData = "";
        xmlData = "";
        nullCheck = "";
        inputItem = "";
        OPERATOR = "";
        recursiveYn = false; 
        groupOperator = "";
    }
    this.getJavaCode = function(){
        return codeData;
    }

    this.getHtmlCode = function(){
        return htmlData;
    }

    this.getXmlCode = function(){
        return xmlData;
    }

    this.getNullCheck = function(){
        return nullCheck;
    }
    this.getInputItem = function(){
        return inputItem; 
    }


    var nullCheck = "";
    var inputItem =  ""; 
    var OPERATOR = "";
    var recursiveYn = false; 
    var groupOperator = "";
    
    var javaCode = "";
    var htmlCode = "";
    var xmlCode = "";

    /**
        * @version 20211021
        * @description FilterCondtion 위젯의 조건 정보를 자바코드,HTML코드, XML정보로 추출  
        * @param {Array} data  
        * @returns {String} codeData 
        */
    this.getData = function(data) {
        var OPERATOR = "";
        
        if(this.ctl._model.length > 0){
         if(this.ctl._model[1] == "and"){//"['a','and','12']" 
            OPERATOR = "AND";     
         }else{
            OPERATOR = "OR";
         }
      }

        javaCode = this.getNullCheck()+"if(" + this.getCodeData(this.filter) + "){}else{return false;}";
        htmlCode = "IF("+ this.getHtmlCode() + ")";
         
        var fcXmlCode = "<List>"+this.getXmlCode();
        var tempXml = "";
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(fcXmlCode,"text/xml");
        
        //obzc.FilterCondition.getXmlCode() == xmlDoc.getElementsByTagName('EasySheet');
        var easySheetTag = xmlDoc.getElementsByTagName('EasySheet');
        var conditioncnt="1";
        var rowcnt = easySheetTag.length+1; //BRMS 필터 위젯에서는 값이있는표 아래에 공백 라인을 넣어야해서 +1 
        
        for(var i = 0 ; i < easySheetTag.length ; i++){
            if(conditioncnt < easySheetTag[i].getElementsByTagName('Condition').length){
                conditioncnt = easySheetTag[i].getElementsByTagName('Condition').length;
            }
            for(var j = 0 ; j < easySheetTag[i].getElementsByTagName('Condition').length ; j++){
                //Condition 태그가 1개면 LastCond는 1 grouperator = '' 
                if(easySheetTag[i].getElementsByTagName('Condition').length == 1){  
                    easySheetTag[i].getElementsByTagName('Condition')[j].setAttribute("LastCond","1");
                    easySheetTag[i].getElementsByTagName('Condition')[j].setAttribute("groupoperator","");
                }else{
                    //Condition 태그 여러개면 마지막 Condition 태그의 LastCond 속성값만 1 그외는 다 0  
                    
                    var logicOperator = easySheetTag[i].getElementsByTagName('LogicOperator')[0].getAttribute('operator');
                    easySheetTag[i].getElementsByTagName('Condition')[j].setAttribute("groupoperator",logicOperator);
                    
                    if(j == easySheetTag[i].getElementsByTagName('Condition').length-1){ 
                        easySheetTag[i].getElementsByTagName('Condition')[j].setAttribute("LastCond","1");
                    }else{
                        easySheetTag[i].getElementsByTagName('Condition')[j].setAttribute("LastCond","0");
                    }
                }
            }
            //XML 태그 정보 및 속성정보 수정 후 문자열 재조합
            tempXml += easySheetTag[i].outerHTML; 
        }
        tempXml = tempXml.replace("<RuleThen/>","<RuleThen></RuleThen>");
        
        xmlCode = "<List>" 
                        + tempXml
                   +"<EasyInfo actioncnt=\"0\" conditioncnt=\""+conditioncnt+"\" rowcnt=\""+rowcnt+"\" Multi=\"S\" "
                   +" NullExType=\"0\" ISFILTER=\"1\" OPERATOR=\""+ OPERATOR +"\"/>"
                        +"<Array>"
                        +"<text><![CDATA[]]></text>" 
                        +"<item><![CDATA[]]></item>"
                        +"</Array>"
                        +"<GroupInfo>"
                        +"<![CDATA[]]>"
                        +"</GroupInfo>"
                        +"<FormulaInfo>"
                        +"<![CDATA[]]>"
                        +"</FormulaInfo>"
                   +"</List>";
        
        codeData = javaCode;
        htmlData = htmlCode;
        xmlData = xmlCode;
      
    }
    /**
    * @version 20211021
    * @description FilterCondtion 위젯의 조건 정보를 자바코드,HTML코드, XML정보로 추출  
    * @param {Array} data  
    * @returns {String} codeData 
    */
    this.getCodeData = function(data) {
        
        console.log(xmlData);
        var itemInfo = new Object();

        for(var i = 0 ; i < data.length ; i++){
            //해당인덱스의 값이 Array 일때 
            var tmpCode = "";
            var tmpHtml = "";
            var tmpXml = "";
            var conOpr = "";
            var grpOpr = "";    
            var dataTy = "";  
            //var itemInfo = new Object();
            /*
            itemInfo.CondOpr
            itemInfo.GrpOpr 
            itemInfo.RefItem
            itemInfo.RefId
            itemInfo.RefType
            itemInfo.Equation
            itemInfo.Valuation
            itemInfo.Value
            */
            var dataType = "";

            if(typeof(data[i])=="object" && data[i].length >= 3){
                // index0 -> Operand1 , index1 -> Operation , index2 -> Operand2 
                
                //첫번째 항목이 배열일때(Array(n)) 함수 재호출
                if(typeof(data[i][0])=="object"){
                    
                    codeData+="("; //단계별 영역구분  '(' 시작 
                    htmlData+="(";
                    //flowCnt++;    //코드 마지막 ')' 붙일 갯수
                    
                    
                    recursiveYn = true; // 그룹으로 묶일시에는 <EasySheet><LogincOperator>태그로 묶는 부분 제외>
                    var LastCondidx = "";
                    var operator = data[i][1].toUpperCase();
                    groupOperator = operator;

                    console.log("uppercase:::::::" + operator);
                    //data[i][1] -> "and" 나 "or" 넘어오는 data array  연산자 제외 후 마지막 인덱스가 객체인경우 LastCondidx 조정
                    if(typeof(data[i].filter(function(item){return item!==data[i][1];})[data[i].filter(function(item){return item!=="and";}).length-1])=="object"){
                        LastCondidx = data[i].filter(function(item){return item!==data[i][1];}).length;
                    }else{
                        LastCondidx = data[i].filter(function(item){return item!==data[i][1];}).length;
                    }
                    
                    xmlData +=  "<EasySheet><LogicOperator operator=\""+operator+"\" LastCondidx = \""+LastCondidx+"\">";
                    this.getCodeData(data[i]);                                     
                    xmlData += "</LogicOperator><RuleThen></RuleThen><Desc><![CDATA[]]></Desc></EasySheet>"

                    recursiveYn = false; // 그룹으로 안묶일시에는 <EasySheet><LogincOperator>태그로 묶는 부분 포함>
                    groupOperator = "";

                    //단계별 영역구분  ')' 종료
                    codeData+=")";
                    htmlData+=")";

                    if(i < data.length){ //아직 데이터가 남아있으면 계속
                        continue;   
                    }else{
                        //finData += "){}else{ return false; }";
                        codeData += ")";
                        htmlData += ")";         
                        return codeData;
                    }    

                }

                // tmpCode = "if(";  
                // tmpHtml = "IF";
                tmpCode = "(";  
                tmpHtml = "";
                
                for(var j = 0 ; j < _fields.length ; j++){
                    if(_fields[j].dataField == data[i][0]){
                        dataType = _fields[j].dataType;
                        itemInfo.id   = _fields[j].id;   
                        break;
                    }
                }   
                
                
                //아이템 값 세팅
                itemInfo.refItem=data[i][0];

                if(dataType == "string"){
                    itemInfo.dataType = "STRING";
                }else{
                    itemInfo.dataType = "NUMERIC";
                    nullCheck += "if(get(\""+itemInfo.refItem+"\").equals(\"\"))set(\""+itemInfo.refItem+"\",0); "
                }
                
                console.log(itemInfo.dataTy);

                
                
                switch(data[i][1]){ 
                    case "=":
                        //equals , is blank 둘다 처리 
                        if(itemInfo.dataType =="STRING"){
                            tmpCode += "get(\""+data[i][0]+"\")"+".compareTo(\""+data[i][2]+"\") == 0)";
                        }else{                  //NUMERIC
                            tmpCode += "get(\""+data[i][0]+"\")"+"==\""+data[i][2]+"\")";    
                        }
                        tmpHtml += "{"+data[i][0]+"} = "+ data[i][2] +"<br>";
                        itemInfo.conOpr = "=";
                        break;
                    case "<>":
                        //Does Not equal, is not blank 둘다 처리
                        if(itemInfo.dataType =="STRING"){
                            tmpCode += "get(\""+data[i][0]+"\")"+".compareTo(\""+data[i][2]+"\") != 0)";
                        }else{                  //NUMERIC
                            tmpCode += "get(\""+data[i][0]+"\")"+"!=\""+data[i][2]+"\")";    
                        }
                        tmpHtml += "{"+data[i][0]+"}"+" != "+data[i][2] + "<br>";
                        itemInfo.conOpr = "<>";
                        break;
                    case "<":
                        tmpCode += "Double.parseDouble(get(\""+data[i][0]+"\"))"+" < "+data[i][2]+"d)"; //double형 변환 체크
                        tmpHtml += "{"+data[i][0]+"}"+" < "+data[i][2] + "<br>";
                        itemInfo.conOpr = "&lt;";
                        break;         
                    case ">":
                        tmpCode += "Double.parseDouble(get(\""+data[i][0]+"\"))"+" > "+data[i][2]+"d)";
                        tmpHtml += "{"+data[i][0]+"}"+" > "+data[i][2] + "<br>";
                        itemInfo.conOpr = "&gt;";
                        break;
                    case "<=":
                        tmpCode += "Double.parseDouble(get(\""+data[i][0]+"\"))"+" <= "+data[i][2]+"d)";
                        tmpHtml += "{"+data[i][0]+"}"+" <= "+data[i][2] + "<br>";
                        itemInfo.conOpr = "&lt;=";
                        break;
                    case ">=":
                        tmpCode += "Double.parseDouble(get(\""+data[i][0]+"\"))"+" >= "+data[i][2]+"d)";
                        tmpHtml += "{"+data[i][0]+"}"+" >= "+data[i][2] + "<br>";
                        itemInfo.conOpr = "&gt;=";
                        break;   
                    case "contains":
                        tmpCode += "obzFunction.operatorIN(get(\""+data[i][0]+"\"),\""+data[i][2]+"\"))";             
                        tmpHtml += "{"+data[i][0]+"}"+" IN "+data[i][2] + "<br>";                 
                        itemInfo.conOpr = "IN";
                        break;
                    case "notContains":
                        tmpCode += "obzFunction.operatorNOT_IN(get(\""+data[i][0]+"\"),\""+data[i][2]+"\"))";             
                        tmpHtml += "{"+data[i][0]+"}"+" NOT IN "+data[i][2] + "<br>";                        
                        itemInfo.conOpr = "NOT IN";
                        break;
                    case "anyof":
                        tmpCode += "obzFunction.operatorLIKE(get(\""+data[i][0]+"\"),\""+data[i][2]+"\"))";             
                        tmpHtml += "{"+data[i][0]+"}"+" LIKE "+data[i][2] + "<br>";                      
                        itemInfo.conOpr = "LIKE";
                        break;
                    case "notanyof":
                        tmpCode += "!obzFunction.operatorLIKE(get(\""+data[i][0]+"\"),\""+data[i][2]+"\"))";             
                        tmpHtml += "{"+data[i][0]+"}"+" NOT LIKE "+data[i][2] + "<br>";                        
                        itemInfo.conOpr = "NOT LIKE";
                        break;
                        
                }
                inputItem  += data[i][0]+";";  //Input 아이템 세팅
                if(itemInfo.dataType == "STRING"){
                    itemInfo.value = "\""+data[i][2]+"\"";
                }else{
                    itemInfo.value = data[i][2];    
                }
                codeData += tmpCode;
                htmlData += tmpHtml;
                
              
                if(recursiveYn == false){
                    xmlData += "<EasySheet><LogicOperator operator=\""+groupOperator+"\" LastCondidx = \""+"1"+"\">";
                }    

                xmlData += "<Condition operator=\'"+ itemInfo.conOpr + "\' groupstart='False' groupend ='False' groupoperator = \'"+itemInfo.grpOpr+ "\' isgroup='False' NothingCond = '0' LastCond = '0'> ";
                xmlData += "<Inputlist>";
                xmlData += "<RefItem name=\""+itemInfo.refItem+"\" id=\""+itemInfo.id+"\" itemtype=\""+ itemInfo.dataType +"\"/>";
                xmlData += "</Inputlist>";
                xmlData += "<equation caption = \"0\">"; 
                xmlData += "<![CDATA[{"+itemInfo.refItem+"}]]>"
                xmlData += "</equation>"; 
                xmlData += "<valuation>";
                xmlData += "<![CDATA["+itemInfo.value+"]]>"
                xmlData += "</valuation>";
                xmlData += "<value>";
                
                console.log("iteminfo.dataType:"+itemInfo.dataType);
                if(itemInfo.dataType == "STRING"){
                    if(itemInfo.conOpr == "="){
                        xmlData += "<![CDATA["+"((get(\"" + itemInfo.refItem + "\").compareTo("+ itemInfo.value +")) == 0)]]>";            
                    }else{
                        xmlData += "<![CDATA["+"((get(\"" + itemInfo.refItem + "\").compareTo("+ itemInfo.value +")) != 0)]]>";    
                    }
                }else{  //NUMERIC
                    xmlData += "<![CDATA["+"(Double.parseDouble(get(\"" + itemInfo.refItem + "\"))"+ itemInfo.conOpr + "("+ itemInfo.value +"d))]]>";    
                }

                xmlData += "</value>";
                xmlData += "</Condition>";
                
                if(recursiveYn == false){
                    xmlData += "</LogicOperator><RuleThen></RuleThen><Desc><![CDATA[]]></Desc></EasySheet>";
                }    

            }else if(data[i]=="and" || data[i]=="or"){
                
                switch(data[i])
                {
                    case "and":
                        codeData += " "+"&&"+" ";
                        htmlData += " "+"AND"+" ";
                        itemInfo.grpOpr = "AND";
                        break;
                    case "or":
                        codeData += " "+"||"+" ";
                        htmlData += " "+"OR"+" ";
                        itemInfo.grpOpr = "OR";
                        break;
                }

            }else{  
                //[cust_id,==,3000]     
                if(i == 0){
                    for(var j = 0 ; j < _fields.length ; j++){
                        if(_fields[j].dataField == data[i]){
                            dataType = _fields[j].dataType;
                            itemInfo.id = _fields[j].id;   
                            break;
                        }
                    }
                    //아이템항목 설정
                    itemInfo.refItem = data[i];
                    
                    if(dataType == "string"){
                        itemInfo.dataType = "STRING";
                        //tmpCode += "if(" + "get(\""+data[i]+"\")"; 
                        if(data[1] === '=' || data[1] === '<>' ){       
                            tmpCode += "(" + "get(\""+data[i]+"\")";                              
                        }else{ //2022.07.26 String 일때 예외 케이스
                            switch(data[1]){
                                case "contains":
                                    tmpCode += "(" + "obzFunction.operatorIN(get(\""+data[i]+"\")";                              
                                    itemInfo.conOpr = "IN";
                                    break;
                                case "notContains":
                                    tmpCode += "(" + "obzFunction.operatorNOT_IN(get(\""+data[i]+"\")";                              
                                    itemInfo.conOpr = "NOT IN";
                                    break;
                                case "anyof":
                                    tmpCode += "(" + "obzFunction.operatorLIKE(get(\""+data[i]+"\")";                              
                                    itemInfo.conOpr = "LIKE";
                                    break;
                                case "notanyof":
                                    tmpCode += "(" + "!obzFunction.operatorLIKE(get(\""+data[i]+"\")";                              
                                    itemInfo.conOpr = "NOT LIKE";
                                    break;
                            }
                        }
                    }else{
                        itemInfo.dataType = "NUMERIC";
                        //tmpCode += "if(" + "Double.parseDouble(get(\""+data[i]+"\"))";        
                        tmpCode += "(" + "Double.parseDouble(get(\""+data[i]+"\"))";        
                    }                    
                    
                    // tmpHtml += "IF " + "{"+data[i]+"}";
                    tmpHtml += "" + "{"+data[i]+"}";
                    inputItem += data[i]+";";
                }else if(i == 1 ){
                    switch(data[i]){ 
                        case "=":
                            //equals , is blank 둘다 처리 
                            if(itemInfo.dataType == "STRING"){
                                tmpCode += ".compareTo";
                            }else{                  //NUMERIC
                                tmpCode += "==";    
                            }
                            tmpHtml += " = ";
                            itemInfo.conOpr = "="
                            break;
                        case "<>":
                            //Does Not equal, is not blank 둘다 처리
                            if(itemInfo.dataType == "STRING"){
                                tmpCode += ".compareTo";
                            }else{                  //NUMERIC
                                tmpCode += "!=";    
                            }
                            tmpHtml += " != ";
                            itemInfo.conOpr = "<>";
                            break;
                        case "<":
                            tmpCode += " < ";
                            tmpHtml += " < ";
                            itemInfo.conOpr = "&lt;";
                            break;         
                        case ">":
                            tmpCode += " > ";
                            tmpHtml += " > ";
                            itemInfo.conOpr = "&gt;";
                            break;
                        case "<=":
                            tmpCode += " <= ";
                            tmpHtml += " <= ";
                            itemInfo.conOpr = "&lt;=";
                            break;
                        case ">=":
                            tmpCode += " >= ";
                            tmpHtml += " >= ";
                            itemInfo.conOpr = "&gt;=";
                            break;
                        //contains~notanyof는 tmpCode, itemInfo.conOpr 예외
                        case "contains":                
                            tmpHtml += "IN ";
                            break;
                        case "notContains":
                            tmpHtml += " NOT IN ";
                            break;
                        case "anyof":
                            tmpHtml += " LIKE ";
                            break;
                        case "notanyof":
                            tmpHtml += " NOT LIKE ";
                            break;                                                                                                      
                    }  
      
                }else{ 
                    //value 값 설정
                    if(itemInfo.dataType == "STRING"){    
                        if(itemInfo.conOpr == "="){
                            tmpCode += "(\""+data[i]+"\") == 0)";
                        }else if(itemInfo.conOpr == "<>"){      
                            tmpCode += "(\""+data[i]+"\") != 0)";    
                        }else{
                            switch(itemInfo.conOpr){
                                case "IN":
                                    tmpCode += ",\""+data[i]+"\"))";                              
                                    break;
                                case "NOT IN":
                                    tmpCode += ",\""+data[i]+"\"))";                                        
                                    break;
                                case "LIKE":
                                    tmpCode += ",\""+data[i]+"\"))";                                        
                                    break;
                                case "NOT LIKE":
                                    tmpCode += ",\""+data[i]+"\"))";                                       
                                    break;
                            }        
                        } 

                        itemInfo.value = "\""+data[i]+"\"";
                    }else{ //NUMERIC
                        tmpCode += "("+data[i]+"d))"; 
                        itemInfo.value = data[i];
                    }
                    
                    tmpHtml += "{"+data[i]+"}";
                    
                    
                    if(recursiveYn == false){
                        xmlData += "<EasySheet><LogicOperator operator=\""+''+"\" LastCondidx = \""+"1"+"\">" ;
                    }

                    xmlData += "<Condition operator=\'"+ itemInfo.conOpr + "\' groupstart='False' groupend ='False' groupoperator = \'"+''+ "\' isgroup='False' NothingCond = '0' LastCond = '0'> ";
                    xmlData += "<Inputlist>";
                    xmlData += "<RefItem name=\""+itemInfo.refItem+"\" id=\""+itemInfo.id+"\" itemtype=\""+ itemInfo.dataType +"\"/>";
                    xmlData += "</Inputlist>";
                    xmlData += "<equation caption = \"0\">"; 
                    xmlData += "<![CDATA[{"+itemInfo.refItem+"}]]>"
                    xmlData += "</equation>"; 
                    xmlData += "<valuation>";
                    xmlData += "<![CDATA["+itemInfo.value+"]]>"
                    xmlData += "</valuation>";
                    xmlData += "<value>";
                    
                    console.log("iteminfo.dataType:"+itemInfo.dataType);
                    if(itemInfo.dataType == "STRING"){
                        if(itemInfo.conOpr == "="){
                            xmlData += "<![CDATA["+"((get(\"" + itemInfo.refItem + "\").compareTo("+ itemInfo.value +")) == 0)]]>";            
                        }else if(itemInfo.conOpr == "<>"){
                            xmlData += "<![CDATA["+"((get(\"" + itemInfo.refItem + "\").compareTo("+ itemInfo.value +")) != 0)]]>";    
                        }else{
                            switch(itemInfo.conOpr){
                                case "IN":
                                    xmlData += "<![CDATA["+"(obzFunction.operatorIN(get(\"" + itemInfo.refItem + "\"),"+ itemInfo.value +"))]]>";                                        
                                    break;
                                case "NOT IN":                                
                                    xmlData += "<![CDATA["+"(obzFunction.operatorNOT_IN(get(\"" + itemInfo.refItem + "\"),"+ itemInfo.value +"))]]>";                                        
                                    break;
                                case "LIKE":                                    
                                    xmlData += "<![CDATA["+"(obzFunction.operatorLIKE(get(\"" + itemInfo.refItem + "\"),"+ itemInfo.value +"))]]>";                                        
                                    break;
                                case "NOT LIKE": 
                                    xmlData += "<![CDATA["+"(!obzFunction.operatorLIKE(get(\"" + itemInfo.refItem + "\"),"+ itemInfo.value +"))]]>";                                        
                                    break;
                            } 
                        }
                    }else{  //NUMERIC
                        xmlData += "<![CDATA["+"(Double.parseDouble(get(\"" + itemInfo.refItem + "\"))"+ itemInfo.conOpr + "("+ itemInfo.value +"d))]]>";    
                    }

                    xmlData += "</value>";
                    xmlData += "</Condition>";
                    if(recursiveYn == false){
                        xmlData += "</LogicOperator><RuleThen></RuleThen><Desc><![CDATA[]]></Desc></EasySheet>";
                    }
                }
     
                codeData += tmpCode; 
                htmlData += tmpHtml;

            }    

            
        }
        

        // console.log("codeData" + "  " + codeData);
        // console.log("htmlData" + "  " + htmlData);

        
        return codeData;
        
    }

    
    /**
    * @version 20211115
    * @description 파라미터로 받은 XML 정보를 통해서 위젯 그리기
    * @param {Array} data  
    * @return {Array} 조합된 filter 정보 
    */
    this.setWidgetInfo = function(data){

       //var decodeXML = obz.decodeStr(data);
       console.log(data);
       var parser = new DOMParser();
       var xmlDoc = parser.parseFromString(data,"text/xml");
       var easySheetTag = xmlDoc.getElementsByTagName('EasySheet');
       //최상단 필터 조건 
       var filterOper = xmlDoc.getElementsByTagName('EasyInfo')[0].getAttribute('OPERATOR').toLowerCase();
       
       var filterArr = new Array(); 
       
       for(var i = 0 ; i < easySheetTag.length ; i++){
           //var singleArr = new Array();
          
          var operator = easySheetTag[i].getElementsByTagName('LogicOperator')[0].getAttribute('operator').toLowerCase();
          var lastCondidx = easySheetTag[i].getElementsByTagName('LogicOperator')[0].getAttribute('LastCondidx');
          var condition = easySheetTag[i].getElementsByTagName('LogicOperator')[0].getElementsByTagName('Condition');
          
          if(lastCondidx > 1){ 
              var groupArr = new Array();
              //그룹으로 묶인 경우 lastCondidx가 존재 
              for(var j = 0 ; j < lastCondidx ; j++){
                  var singleArr = new Array();
                  var conOper = "";
                  if(condition[j].getAttribute('operator') == "!="){
                    conOper = "<>";
                  }else{
                    conOper = condition[j].getAttribute('operator'); //컨디션 내부에서 사용하는 operator
                  } 
                  var itemNm = condition[j].getElementsByTagName('Inputlist')[0].getElementsByTagName('RefItem')[0].getAttribute('name');
                  var itemValue = condition[j].getElementsByTagName('valuation')[0].innerHTML; 
                  itemValue = itemValue.replace(/"/gi,"");
                  itemValue = itemValue.substring(9, itemValue.length-3);
                  
                  singleArr.push(itemNm);
                  singleArr.push(conOper);
                  singleArr.push(itemValue);
                  groupArr.push(singleArr);   
                  //[a ,=,b ]
                  //마지막 value 뒤에는 operator을 뺀다    
                  if( j != lastCondidx-1){
                      groupArr.push(operator);
                  }   
                  
              }
              filterArr.push(groupArr);
              
          }else{ 
              var singleArr = new Array();
              var conOper = "";
              if(condition[0].getAttribute('operator') == "!="){
                  conOper = "<>";
              }else{
                  conOper = condition[0].getAttribute('operator'); //컨디션 내부에서 사용하는 operator
              } 
              var itemNm = condition[0].getElementsByTagName('Inputlist')[0].getElementsByTagName('RefItem')[0].getAttribute('name');
              var itemValue = condition[0].getElementsByTagName('valuation')[0].innerHTML; 

              itemValue = itemValue.replace(/"/gi,"");
              itemValue = itemValue.substring(9, itemValue.length-3);
              
              singleArr.push(itemNm);
              singleArr.push(conOper);
              singleArr.push(itemValue);   
              //[a ,=,b ]
              filterArr.push(singleArr);   
          }
          
          //마지막 value뒤에는 AND,OR가 오면 안된다. 
          if(i != easySheetTag.length-1){
              if(operator != ''){ //조건이 단일이면 operator 가 없음 
                  filterArr.push(operator);   
              }else{
                  filterArr.push(filterOper);
              }
          }
          
       }
      console.log(filterArr);
      return filterArr; 
    }

    Object.defineProperty(this, 'name', {
        get: function() {
            return _name;
        },
        set: function(value) {
            _name = value;
        }
    });
    
    Object.defineProperty(this, 'filterData', {
        get: function() {
            return _filterData;
        },
        set: function(value) {
            _filterData = value;
        }
    });

    Object.defineProperty(this, 'fields', {
        get: function() {
            return _fields;
        },
        set: function(value) {
            var fields = JSON.stringify(value)
            _fields = JSON.parse(fields);
            //console.log(this.ctl.fields);
            //this.ctl.option('fields', _fields);
        }
    });

    Object.defineProperty(this, 'filter', {
        get: function() {
            return _filter;
        },
        set: function(value) {
            _filter = value;
        }
    });
}