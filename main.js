
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
        let tr = document.createElement('tr');
        for (let getInItems in item){
            let td = document.createElement('td');
            let btnTd = document.createElement('button');
            btnTd.classList.add('btn__copy');
            //console.log(item[getInItem][getInItems]);

            btnTd.textContent = `${item[getInItems]}`;
            ////HANDLER BTN GET-COPY ITEM
            btnTd.addEventListener('click', function(){
            navigator.clipboard.writeText(btnTd.textContent);
            })

            td.append(btnTd);

            tr.append(td);
        }

        tbody.append(tr);
    }
    /////////////// HANDLER-TEXT
    function handlerArr(item){
        let getbrand = `<strong>Бренд:</strong> ${item.brand}<br>`;
        let getArticle = `<strong>Артикул:</strong> ${item.article}<br>`;
        
        let resultTextArr = [];
        ////CHECK EMPTY TEXT 
        let getTextArr = [item.textTwoOne, item.textTwoTwo, item.textFor];
        for (let deletEmpty in getTextArr){
            if (getTextArr[deletEmpty] == ''){
                continue;
            }
            else {
                resultTextArr.push(getTextArr[deletEmpty]);
            }
        }
        ////GET RESULT HANDLER TEXT
        let checkValue = []
        
        for (let g in resultTextArr) {
            if (item.textTwoOne == resultTextArr[g]){
                let getAreaOne = handlerAreaOne(item.textTwoOne);
                //let getAreaOne = `<b>Описание:</b><br> ${item.textTwoOne}<br>`;
                checkValue.push(`<b>Описание:</b><br> ${getAreaOne}`)
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
        
        //// CHECK HOW MUCH GET ITEMS 
        let endArrAllItem = [getbrand, getArticle]
        if (checkValue.length == 2){
            endArrAllItem.push(checkValue.join(''));
        }
        else {
            endArrAllItem.push(checkValue[0])
        }
        //// GET THE END RESULT
        let result = [item.brand, item.article, `<p>${endArrAllItem.join(' ')}</p>`]
        
        ////ADD IN BLOCK WATCH - HTML ITEM
        let transitHtmlText = new DOMParser().parseFromString(result[2],'text/html').body.firstChild
        checkResualt.append(transitHtmlText);
        
        
        pushItem(result)
    }
   /////////////// HANDLER-TWO/ONE
    function handlerAreaOne(item){
        
        item = deleteFirstLast(item);
        
        let getItemOne = item.trim().split('\t');
        let resultConvertOne = getItemOne.join(' ').split('\n');
        
        let getArrOne = [];
        
        resultConvertOne.forEach((el) => {
            getArrOne.push(`${el}<br>`)
        })
        
        return getArrOne.join(' ')
    }
   /////////////// HANDLER-TWO/TWO 
    function handlerAreaTwo(item){
        
        item = deleteFirstLast(item);
        
        let handlerItem = item.trim().split('\n');
        
        let oneArr = [];
        for (let x = 0; x <= handlerItem.length - 1; x = x + 2){
            oneArr.push(`${handlerItem[x].replaceAll(':', '')}: `)
        }

        let twoArr = [];
        for (let a = 1; a <= handlerItem.length - 1; a = a + 2){
            twoArr.push(`${handlerItem[a]}<br> `)
        }

        let endArr = [];
        for (let f = 0; f <= oneArr.length - 1; f++){
            endArr.push(`${oneArr[f]}${twoArr[f]}`)
        }

        let getAllArr = endArr.join('');
                
        return getAllArr
    }
   /////////////// HANDLER-AREA/FOR 
       
    function handlerAreaFor(item) {
        let getNumFor = document.getElementById('textarea__num');
        //console.log(getNumFor.value);
        
        item = deleteFirstLast(item);
        
        let handlerTextFor = item.trim().split('\t');
        let endHandlerTextFor = handlerTextFor.join(' ').split('\n');
        console.log(endHandlerTextFor)
        
        
        let transitArr = []
        for (let y = 0; y <= endHandlerTextFor.length - 1; y++){
            let s = y + 1;
            if (s % getNumFor.value == 0){
                transitArr.push(`${endHandlerTextFor[y]}; `);
            }
            else {
                transitArr.push(`${endHandlerTextFor[y]} `)
            }
        }
        return transitArr.join(' ')
    }
    /////////////// DELET - "
    function deleteFirstLast(item){
        item.trim();
        if (item[0] == '"'){
            let firstItem = item.replaceAll('"', '');
            item = firstItem;
        }
        //console.log(item)
        if (item[item.length - 1] == '"'){
            let twiceItem = item.reverse().replace("\"", "");
            item = twiceItem.reverse();
        }
        return item
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
        ////CHECK GET VALUE != EMPTY
        if (item.brand == ''){
            return;
        }
        if (item.article == ''){
            return;
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
       
/////////////// BLOCK BUTTONS CLOSE - OPEN
    let btnTxtOne = document.getElementById('btn_txt_one');
    btnTxtOne.textContent = 'Описание 2/1 - СКРЫТЬ';
    let btnTxtTwo = document.getElementById('btn_txt_two');
    btnTxtTwo.textContent = 'Описание 2/2 - СКРЫТЬ';
    let btnTxtThree = document.getElementById('btn_txt_three');
    btnTxtThree.textContent = 'Применяемость - СКРЫТЬ';
       
    btnTxtOne.addEventListener('click', function(){
        textareaOne.classList.toggle('hidden__block');
        btnTxtOne.classList.toggle('btn__green');
        btnTxtOne.textContent = btnTxtOne.textContent === 'Описание 2/1 - СКРЫТЬ' ? 'Описание 2/1 - ОТКРЫТЬ' : 'Описание 2/1 - СКРЫТЬ';
    })
    
    btnTxtTwo.addEventListener('click', function(){
        textareaTwo.classList.toggle('hidden__block');
        btnTxtTwo.classList.toggle('btn__green');
        btnTxtTwo.textContent = btnTxtTwo.textContent === 'Описание 2/2 - СКРЫТЬ' ? 'Описание 2/2 - ОТКРЫТЬ' : 'Описание 2/2 - СКРЫТЬ';
    })
    
    btnTxtThree.addEventListener('click', function(){
        let getNumTextFor = document.getElementById('textarea__num');
        textareaThree.classList.toggle('hidden__block');
        getNumTextFor.classList.toggle('hidden__block');
        btnTxtThree.classList.toggle('btn__green');
        btnTxtThree.textContent = btnTxtThree.textContent === 'Применяемость - СКРЫТЬ' ? 'Применяемость - ОТКРЫТЬ' : 'Применяемость - СКРЫТЬ';
    })
}) 
