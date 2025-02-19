document.addEventListener('DOMContentLoaded', function() {
    let tbody = document.getElementById('tbody');
    let checkResualt = document.getElementById('group__watch');
    let arrItems = [];
    /////////////// COUNTER
    const counterA = document.getElementById('counter');
    let startNum = 0;
    counterA.textContent = `Сделано товаров: ${startNum}`;

    /////////////// PUSH-ITEM-HTML
    function pushItem (item){
        console.log(item[2])
        //for (let getInItem = 0; getInItem <= item.length - 1; getInItem++) {
            let tr = document.createElement('tr');
            for (let getInItems in item){
                let td = document.createElement('td');
                let btnTd = document.createElement('button');
                //console.log(item[getInItem][getInItems]);
                
                btnTd.textContent = `${item[getInItems]}`;
                ////HANDLER BTN COPY
                btnTd.addEventListener('click', function(){
                navigator.clipboard.writeText(btnTd.textContent);
                })
                
                td.append(btnTd);
                
                tr.append(td);
            }
            
            //console.log(tr);
            tbody.append(tr);
        //}
    }
    /////////////// HANDLER-TEXT
    function handlerArr(item){
        let getbrand = `<strong>Бренд:</strong> ${item.brand}<br>`;
        let getArticle = `<strong>Артикул:</strong> ${item.article}<br>`;
        
        let resultTextArr = [];
        
        let getTextArr = [item.textTwoOne, item.textTwoTwo, item.textFor];
        for (let deletEmpty in getTextArr){
            if (getTextArr[deletEmpty] == ''){
                continue;
            }
            else {
                resultTextArr.push(getTextArr[deletEmpty]);
            }
        }
        
        let checkValue = []

        for (let g in resultTextArr) {
            if (item.textTwoOne == resultTextArr[g]){
                let getAreaOne = `<b>Описание:</b><br> ${item.textTwoOne}<br>`;
                checkValue.push(getAreaOne)
            }
            if (item.textTwoTwo == resultTextArr[g]){
                let getAreaTwo = handlerAreaTwo(item.textTwoTwo)
                checkValue.push(getAreaTwo)
            }
            if (item.textFor == resultTextArr[g]) {
                let getAreaFor = handlerAreaFor(item.textFor);
                checkValue.push(`<b>Применяемость:</b> ${getAreaFor}<br>`)
            }
        }
        
    
        let endArrAllItem = [getbrand, getArticle]
        if (checkValue.length == 2){
            endArrAllItem.push(checkValue.join(''));
        }
        else {
            endArrAllItem.push(checkValue[0])
        }
        
        let result = [item.brand, item.article, `<p>${endArrAllItem.join(' ')}</p>`]
        
        ////Add IN BLOCK WATCH - HTML ITEM
        let transitHtmlText = new DOMParser().parseFromString(result[2],'text/html').body.firstChild
        checkResualt.append(transitHtmlText);
        
        
        pushItem(result)
    }
   /////////////// HANDLER-TWO/TWO 
    function handlerAreaTwo(item){
        let handlerItem = item.trim().split('\n');
        
        let oneArr = [];
        for (let x = 0; x <= handlerItem.length - 1; x = x + 2){
            oneArr.push(`${handlerItem[x]}: `)
        }

        let twoArr = [];
        for (let a = 1; a <= handlerItem.length - 1; a = a + 2){
            twoArr.push(`${handlerItem[a]}<br> `)
        }

        let endArr = [];
        for (let f = 0; f <= oneArr.length - 1; f++){
            endArr.push(`${oneArr[f]}${twoArr[f]}`)
        }

        let getAllArr = endArr.join('')
                
        return getAllArr
    }
   /////////////// HANDLER-AREA/FOR  
    function handlerAreaFor(item) {
        let getNumTextFor = document.getElementById('textarea__num');
        let handlerTextFor = item.trim().split('\t');
        let endHandlerTextFor = handlerTextFor.join(' ').split('\n');
        
        
        let transitArr = []
        for (let y = 0; y <= endHandlerTextFor.length - 1; y++){
            let s = y + 1;
            if (s % getNumTextFor.value == 0){
                transitArr.push(`${endHandlerTextFor[y]}; `);
            }
            else {
                transitArr.push(`${endHandlerTextFor[y]} `)
            }
        }
        return transitArr.join(' ')
    }
    
    /////////////// CLICK-SEND
    const inputOne = document.getElementById('input__one');
    const inputTwo = document.getElementById('input__two');
    const textareaOne = document.getElementById('textarea__one');
    const textareaTwo = document.getElementById('textarea__two');
    const textareaThree = document.getElementById('textarea__three');
    const btnInput = document.getElementById('btn__input');
    
    btnInput.addEventListener('click', function(){
        let getInputOne = inputOne.value
        let getInputTwo = inputTwo.value
        let getTextareaOne = textareaOne.value
        let getTextareaTwo = textareaTwo.value
        let getTextareaThree = textareaThree.value
        
        let valueArr = [];
        
        let item = {
            brand: getInputOne,
            article: getInputTwo,
            textTwoOne: getTextareaOne,
            textTwoTwo: getTextareaTwo,
            textFor: getTextareaThree,
        }
        
        valueArr.push(item)
        
        handlerArr(valueArr[0])
        
        startNum++
        counterA.textContent = `Сделано товаров: ${startNum}`
        
        inputTwo.value = '';
        textareaOne.value = '';
        textareaTwo.value = '';
        textareaThree.value = '';
    })
    
    
})