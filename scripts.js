const blocks = document.getElementsByClassName('block');
const game = document.getElementById('game-block');
const rows = document.getElementsByClassName('row-game');
const gameStatus = document.getElementsByClassName('game-status')[0];
let newValor = 0;
let isMoved = true;

window.onload = function(){
    generateBlock();
    generateBlock(); 
    colorUpdate();  
}
document.onkeydown = function(event) {
    moveGame(event);
}

function isWin(){
    if(newValor === 2048){
        document.getElementsByClassName('game-status')[0].style.display = "flex";
        return true;
    }
    return false;
}
function generateBlock(){
    const countBlocks = blocks.length; 
    let blocksEmpty = [];
    for(let i = 0 ; i < countBlocks ; i++){
        if(blocks[i].innerHTML === "" ){
            blocksEmpty.push(i);
        }
    }
    if(blocksEmpty.length == "0" ){
        
        if(isGameOver()){
            document.getElementsByClassName('game-status')[0].style.display = "flex";
        }
        return;
    }   
    if(isMoved){       
        const positionBlockEmpty = getRandomIntInclusive(0, blocksEmpty.length - 1);
        const positionInclude = blocksEmpty[positionBlockEmpty];
        const valueInclude = getRandomIntInclusive(2, 4) > 2 ? 4 : 2 ;
        blocks[positionInclude].innerHTML= valueInclude;
        blocks[positionInclude].innerText= valueInclude;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isGameOver(){
    for(let row= 0 ; row < rows.length ;row++){
        const next = row +1;
        if(next < rows.length ){
            const colsRow1 = rows[row].children;
            const colsRow2 = rows[next].children;
            for(let col = 0 ; col < colsRow1.length ;col++){
                const nextCol = col+1;
                if(nextCol < rows.length){
                    if(colsRow1[col].innerHTML === colsRow2[col].innerHTML ){
                        return false;
                    }
                    if( colsRow2[col].innerHTML === "" || colsRow2[nextCol].innerHTML === "" 
                        || colsRow1[nextCol].innerHTML === "" || colsRow1[col].innerHTML === ""){
                        return false;
                    }
                    if(colsRow1[col].innerHTML === colsRow1[nextCol].innerHTML){
                        return false;
                    }
                    if(colsRow2[col].innerHTML === colsRow2[nextCol].innerHTML){
                        return false;
                    }
                }
            }
        }
        
    }
    return true;
}

function moveGame(event){
    isMoved = false;
    const keyCode = event.keyCode;
    switch (keyCode) {
        case 38:
            this.up();
            break;
        case 40:
            down();
            break;
        case 37:
            left();
            break;
        case 39:
            rigth();
            break;
        default:
            '';
            break;
    }
    generateBlock();
    isWin();
    
    //Atualiza cores dos blocos
    colorUpdate();
}

function up(){

    //Verifica todas as Linhas da tabela
    for(let row = 0 ; row < rows.length ; row++ ){

        // Verifica se é a ultima linha
        const nextRow = row+1;
        if(nextRow < rows.length){

        // Blocos da tabela.
            const childrensRow1 = rows[row].children;
            const childrensRow2 = rows[nextRow].children;

            //Verifica todos os blocos da tabela 
            for(let k = 0; k < childrensRow1.length ; k++){

                // Captura o valor de cada bloco
                let childrenRow1 = childrensRow1[k].innerHTML;
                let childrenRow2 = childrensRow2[k].innerHTML;

                //Verifica se valor de blocos são iguais
                if(childrenRow1 === childrenRow2 && childrenRow1 !== "" ){
                    isMoved = true;

                    //Atualiza os blocos da tabela linha 1
                    childrensRow1[k].innerHTML = Number(childrenRow1) * 2;
                    childrensRow1[k].innerText = Number(childrenRow1) * 2;

                    newValor = Number(childrensRow1[k].innerText) > newValor ? Number(childrensRow1[k].innerText) : newValor; 

                    //Limpa os blocos da tabela linha 2 
                    childrensRow2[k].innerHTML = "";
                    childrensRow2[k].innerText = "";
                }
                    
            }            
        }        
    }

    //Sobe todos os demais campos, passando como parâmetro a linha 2
    for(let i = 0 ; i < --rows.length; i++ ){
        upAll(0);
    }


}

function upAll(row){
    const firstRow = rows[0].children;

    //Verifica todas as Linhas da tabela que não foram verificadas.
    for(let i = row ; i< rows.length ; i++){

        // Verifica se é a ultima linha
        const nextRow = i+1;

        if(nextRow < rows.length){
            // Blocos da tabela.
            const childrensRow1 = rows[i].children;
            const childrensRow2 = rows[nextRow].children;

            for(let k = 0; k < childrensRow1.length ; k++){

                //Captura todos os blocos da tabela
                let childrenRow1 = childrensRow1[k].innerHTML;

                //Verifica se bloco está vazio.
                if(childrenRow1 === "" ){                    
                    isMoved = true;
                    
                    //Atualiza bloco de cima igual o de baixo
                    childrensRow1[k].innerHTML = childrensRow2[k].innerHTML;
                    childrensRow1[k].innerText = childrensRow2[k].innerText;

                    //Limpa bloco de baixo.
                    childrensRow2[k].innerHTML = "";
                    childrensRow2[k].innerText = "";
                }                    
            }             
        }        
    }
}

function down(){

    for(let row =  --rows.length ; row >= 0 ; row-- ){
        // Verifica se é a ultima linha
        const prevRow = row-1;
        if(prevRow >= 0){

            // Blocos da tabela.
            const childrensRow1 = rows[row].children;
            const childrensRow2 = rows[prevRow].children;

            //Verifica todos os blocos da tabela 
            for(let col = 0; col < childrensRow1.length ; col++){

                // Captura o valor de cada bloco
                let childrenRow1 = childrensRow1[col].innerHTML;
                let childrenRow2 = childrensRow2[col].innerHTML;

                //Verifica se valor de blocos são iguais
                if(childrenRow1 === childrenRow2 && childrenRow1 !== "" ){                    
                    isMoved = true;

                    //Atualiza os blocos da tabela linha 1
                    childrensRow1[col].innerHTML = Number(childrenRow1) * 2;
                    childrensRow1[col].innerText = Number(childrenRow1) * 2;

                    newValor = Number(childrensRow1[k].innerText) > newValor ? Number(childrensRow1[k].innerText) : newValor;

                    //Limpa os blocos da tabela linha 2 
                    childrensRow2[col].innerHTML = "";
                    childrensRow2[col].innerText = "";
                }
                
            }            
        }
        
    }

    //Desce todos os blocos de acordo com as quantidades de linhas. 
    for(let i = 0 ; i < --rows.length; i++ ){
        downAll(--rows.length);
    }
}
function downAll(row){

    //Verifica todas as Linhas da tabela que não foram verificadas.
    for(let i = row ; i >= 0  ; i--){
        // Verifica se é a ultima linha
        const prevRow = i-1;
        if(prevRow >= 0){

            // Blocos da tabela.
            const childrensRow1 = rows[i].children;
            const childrensRow2 = rows[prevRow].children;

            for(let col = 0; col < childrensRow1.length ; col++){

                //Captura todos os blocos da tabela
                let childrenRow1 = childrensRow1[col].innerHTML;

                //Verifica se bloco está vazio.
                if(childrenRow1 === "" ){   

                    isMoved = true;
                    //Atualiza bloco de cima igual o de baixo
                    childrensRow1[col].innerHTML = childrensRow2[col].innerHTML;
                    childrensRow1[col].innerText = childrensRow2[col].innerText;

                    //Limpa bloco de baixo.
                    childrensRow2[col].innerHTML = "";
                    childrensRow2[col].innerText = "";
                }
                
            }             
        }        
    }
}
function left(){
    //Verifica todas as Linhas da tabela que não foram verificadas.
    for(let row = 0 ; row < rows.length ; row++){       

        const blocks = rows[row].children;
        const cols = blocks.length;


        //Verifica todos os blocos da tabela 
        for(let col = 0 ; col < cols ; col++){
            leftAll(row);

            const nextCol = col + 1;
            if( nextCol < cols ){
                const block1 = blocks[col].innerHTML;
                const block2 = blocks[nextCol].innerHTML;

                if(block1 === block2 && block1 !=""){    

                    isMoved = true;

                    blocks[col].innerText = Number(block1) * 2;
                    blocks[col].innerHTML = Number(block1) * 2;

                    newValor = Number(blocks[col].innerHTML) > newValor ? Number(blocks[col].innerHTML) : newValor;

                    blocks[nextCol].innerText = "";
                    blocks[nextCol].innerHTML = "";

                    leftAll(row);
                }
            }
        }
    }

    //Desce todos os blocos de acordo com as quantidades de linhas. 
    for(let i = 0 ; i < rows.length ; i++ ){
        leftAll(i);
    }
}

function leftAll(row){
    
    const blocks = rows[row].children;
    const cols = blocks.length;

    //Verifica todos os blocos da tabela 
    for(let col = 0 ; col < cols ; col++){

        const prevCol = col + 1;

        if( prevCol < cols ){

            const block1 = blocks[col].innerHTML;
            const block2 = blocks[prevCol].innerHTML;

            if(block1 === ""){                    
                isMoved = true;

                blocks[col].innerText = block2;
                blocks[col].innerHTML = block2;

                blocks[prevCol].innerText = "";
                blocks[prevCol].innerHTML = "";
            }
        }
    }
}

function rigth(){
    //Verifica todas as Linhas da tabela que não foram verificadas.
    for(let row = 0 ; row< rows.length ; row++){       

        const blocks = rows[row].children;
        const cols = blocks.length;

        

        //Verifica todos os blocos da tabela 
        for(let col = cols -1 ; col >= 0 ; col--){
            rigthAll(row);

            const nextCol = col -1;
            if( nextCol >= 0 ){
                const block1 = blocks[col].innerHTML;
                const block2 = blocks[nextCol].innerHTML;

                if(block1 === block2 && block1 !=""){      

                    isMoved = true;

                    blocks[col].innerText = Number(block1) * 2;
                    blocks[col].innerHTML = Number(block1) * 2;

                    newValor = Number(blocks[col].innerHTML) > newValor ? Number(blocks[col].innerHTML) : newValor;

                    blocks[nextCol].innerText = "";
                    blocks[nextCol].innerHTML = "";

                    rigthAll(row);
                }
            }
        }
    }

}

function rigthAll(row){

    const blocks = rows[row].children;
    const cols = blocks.length;

    //Verifica todos os blocos da tabela 
    for(let col = cols -1 ; col >= 0 ; col--){

        const nextCol = col -1;
        if( nextCol >= 0 ){
            
            const block1 = blocks[col].innerHTML;
            const block2 = blocks[nextCol].innerHTML;

            if(block1 === ""){      

                isMoved = true;

                blocks[col].innerText = block2;
                blocks[col].innerHTML = block2;

                blocks[nextCol].innerText = "";
                blocks[nextCol].innerHTML = "";
            }
        }
    }
}


function colorUpdate(){
    for( let i = 0 ; i < blocks.length ; i++){
        const textBlock = blocks[i].innerText;
        const objectColor = this.backgroundUpdate(textBlock);
        blocks[i].style.backgroundColor = objectColor.backgroundColor;
        blocks[i].style.color = objectColor.color;
    }
}



function backgroundUpdate(value){
    let objectColor;
    switch (value) {
        case "2":
            objectColor= {
                backgroundColor: "#6FD974",
                color: "#ffffff"
            };
            break;
        case "4":
            objectColor= {
                backgroundColor: "#08BF5D",
                color: "#ffffff"
            };
            break;
        case "8":
            objectColor= {
                backgroundColor: "#08BF11",
                color: "#ffffff"
            };
            break;
        case "16":
            objectColor= {
                backgroundColor: "#42A16E",
                color: "#ffffff"
            };
            break;
        case "32":
            objectColor= {
                backgroundColor: "#49B34F",
                color: "#ffffff"
            };
            break;
        case "64":
            objectColor= {
                backgroundColor: "#08D112",
                color: "#ffffff"
            };
            break;
        case "128":
            objectColor= {
                backgroundColor: "#069E0E",
                color: "#ffffff"
            };
            break;
        case "256":
            objectColor= {
                backgroundColor: "#49B34F",
                color: "#ffffff"
            };
            break;
        case "512":
            objectColor= {
                backgroundColor: "#069E4B",
                color: "#ffffff"
            };
            break;
        case "1024":
            objectColor= {
                backgroundColor: "#035227",
                color: "#ffffff"
            };
            break;
        case "2048":
            objectColor= {
                backgroundColor: "#e6bf3d",
                color: "#ffffff"
            };
            break;
        case "":
            objectColor= {
                backgroundColor: "#77EBAB",
                color: "#ffffff"
            };
            break;
        default:
            objectColor= {
                backgroundColor: "#3c3a33",
                color: "#ffffff"
            };
            break;
    }
    return objectColor;
}

function restart(){
    for(let i = 0 ; i < blocks.length ; i ++){
        blocks[i].innerHTML = "";
        blocks[i].innerText = "";
    }
    document.getElementsByClassName('game-status')[0].style.display = "none";
    generateBlock();
    generateBlock();
    colorUpdate();
}