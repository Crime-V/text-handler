document.addEventListener('DOMContentLoaded', function(){
        let container = document.getElementById('container');
        container.classList.add('container');
    
        let divOne = document.createElement('div');
        divOne.classList.add('block__one');
    
        let divForm = document.createElement('div');
        divForm.classList.add('block__one_form')
        let divLook = document.createElement('div');
        divLook.classList.add('block__one_look');
        
        let raNum = 0;
    
        let butNubAll = document.createElement('button');
        butNubAll.classList.add('block__one_btn')
        butNubAll.textContent = `Сделано товаров - ${raNum}`;
    
        let form = document.createElement('form');
        let inputOne = document.createElement('input');
        inputOne.type = 'text';
        inputOne.placeholder = 'Бренд';
        let inputTwo = document.createElement('input');
        inputTwo.type = 'text';
        inputTwo.placeholder = 'Артикул';
        let inputThree = document.createElement('textarea');
        inputThree.placeholder = '1 строка - заголовок / 2 строка - текст';
        let buttonForm = document.createElement('button');
        buttonForm.classList.add('btn__form')
        
        buttonForm.textContent = 'Отправить';
    
        let divTwo = document.createElement('div');
        divTwo.classList.add('block__two');
    
        let table = document.createElement('table');
        let tHead = document.createElement('thead');
        let tBody = document.createElement('tbody');
        let trHead = document.createElement('tr');
        
        
    
        let thOne = document.createElement('th');
        let thTwo = document.createElement('th');
        let thThree = document.createElement('th');
        thOne.classList.add('table__th');
        thTwo.classList.add('table__th');
        thThree.classList.add('table__th');
        
        thOne.textContent = 'Бренд';
        thTwo.textContent = 'Артикул';
        thThree.textContent = 'Описание';
        
        let tdOne = document.createElement('td');
        let tdTwo = document.createElement('td');
        let tdThree = document.createElement('td');
        
        container.append(divOne);
        divOne.append(divForm);
        divOne.append(divLook);
        divOne.append(butNubAll);
        divForm.append(form);
        form.append(inputOne);
        form.append(inputTwo);
        form.append(inputThree);
        divForm.append(buttonForm);
        
        container.append(divTwo);
        
        divTwo.append(table);
        table.append(tHead);
        table.append(tBody);
        
        tHead.append(trHead);
        
        trHead.append(thOne, thTwo, thThree);
        //trBody.append(tdOne, tdTwo, tdThree);
        
        arrGet = [];
    
        buttonForm.addEventListener('click', function(){
            arrItems = {
                brand: inputOne.value,
                article: inputTwo.value,
                write: inputThree.value,
            };
            
            for (let inArrItems in arrItems){
                if (arrItems[inArrItems] === ''){
                    return;   
                }
            }
            
            
            function getList(getText){
                let getResult = getText.trim().split('\n');
                //console.log(getResult)

                let oneArr = [];
                for (let x = 0; x <= getResult.length - 1; x = x + 2){
                    oneArr.push(`${getResult[x]} - `)
                }
                
                    let twoArr = [];
                    for (let a = 1; a <= getResult.length - 1; a = a + 2){
                        twoArr.push(`${getResult[a]}<br>`)
                    }
                
                let allArr = [];
                for (let f = 0; f <= oneArr.length - 1; f++){
                    allArr.push(`${oneArr[f]}${twoArr[f]}`)
                }
                
                let getAllArr = allArr.join('')
                //console.log(getAllArr)
                
                return getAllArr
            }
            
            
            let getBrand = arrItems.brand.trim();
            //console.log(getBrand)
            let getArticle = arrItems.article.trim();
            //console.log(getWrite)
            let getWrite = getList(arrItems.write);
            
            //console.log(test)
            
            let trBody = document.createElement('tr');
            
            let tdOne = document.createElement('td');
            tdOne.classList.add('table__td');
            let tdTwo = document.createElement('td');
            tdTwo.classList.add('table__td_article')
            let btnTdTwo = document.createElement('button');
            
            btnTdTwo.classList.add('table__btn');
            //navigator.clipboard.writeText(btnTdTwo.textContent);
            tdTwo.classList.add('table__td');
            
            
            let tdThree = document.createElement('td');
            tdThree.classList.add('table__td');
                
            tdOne.textContent = getBrand;
            btnTdTwo.textContent = getArticle;
            tdThree.textContent = `<p><b>Бренд: ${getBrand}</b><br><b>Артикул: ${getArticle}</b><br>${getWrite}</p>`;
            //console.log(tdThree.textContent);
            tdTwo.append(btnTdTwo)
            trBody.append(tdOne,tdTwo,tdThree);
            //console.log(newBtn)
            tBody.append(trBody);
            //Событие клик
            btnTdTwo.addEventListener('click', function(){
                navigator.clipboard.writeText(btnTdTwo.textContent);
            })
            //Конверт
            let convertCont = new DOMParser().parseFromString(tdThree.textContent, 'text/html').body.firstChild
            divLook.append(convertCont);
            
            //Счетчик
            raNum++
            butNubAll.textContent = `Сделано товаров - ${raNum}`;
            divOne.append(butNubAll);
            
            inputTwo.value = '';
            inputThree.value = '';
        })
    
    })