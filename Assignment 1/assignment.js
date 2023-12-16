////Global variables

//Random image location(unique)
let randomUnique=0;
//Random image location(duplicate)
let  randomDuplicate =0;
//Random col location
let randomCol=0;

let imageUrl="image2.jpg";

//retrieve the left column
let leftColumn = document.getElementById('leftColumn');

//retrieve the right column
let rightColumn=document.getElementById('rightColumn');

//startButton
let startButton = document.getElementById('startButton');

//get all the blocks on the left
let leftBlocks = leftColumn.getElementsByClassName("block Left");

//get all the blocks on the right side:
let rightBlocks = rightColumn.getElementsByClassName("block Right");

//Set to store the values of used positions so far
let positionSet = new Set();

//Start button event listener function
startButton.addEventListener('click', function () {
    randomImageGenerator(leftBlocks,rightBlocks);

    // Disable the button
    startButton.disabled = true;
});

function resetGame() {
    location.reload(); 
}


//Level variable
let level=1;


function insertImageIntoBlock(block,index,colIndex) {

    //const block = document.getElementById(blockId);
    

    // Create an img element
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl; // Set the image URL

    //set image id based on column and pos
    if(colIndex==0)
    {
        col="l";
    }
    else
    {
        col="r";
    }
    imgElement.id=col+index;
    imgElement.className="image";
    imgElement.onclick=function() {
        handleImageClick(imgElement.id); // Pass the ID of the clicked image to the function
    };;


    // Set the maximum width and height to maintain the block size
    imgElement.style.maxWidth = '100%';
    imgElement.style.maxHeight = '100%';

    // Append the image element to the block div
    block.innerHTML = ''; 
    block.appendChild(imgElement);
}

function randomImageGenerator(leftBlocks,rightBlocks)
{   
    //generate 2 locations
    //one which will be unique for a column
    //and one that is present in both columns


    //Randomize the locations without overlapping
    randomUnique=0;
    randomDuplicate=0;
    while(randomUnique==randomDuplicate || positionSet.has(randomUnique))
    {
    randomDuplicate = Math.floor(Math.random() * 9) + 1; // Generate a random block number (from 1 to 9)
    randomUnique = Math.floor(Math.random() * 9) + 1; // Generate a random block number (from 1 to 9)

    }

    //Add to the set
    //positionSet.add(randomUnique);
    positionSet.add(randomDuplicate);


    console.log(randomDuplicate);
    console.log(randomUnique);
    console.log(positionSet);
    //choose randomly which column will have the unique img location
    randomCol = Math.round(Math.random());
    console.log(randomCol);


    //generate the images in both columns
    // Get the randomly selected dulicate blocks
    const leftImgBlockDup = leftBlocks[randomDuplicate - 1];
    const rightImgBlockDup = rightBlocks[randomDuplicate - 1];  
    

    // insert duplicae images in both columns
     insertImageIntoBlock(leftImgBlockDup,randomDuplicate,0);
     insertImageIntoBlock(rightImgBlockDup,randomDuplicate,1);
     


    //Generate the unique image in one of columns
    //Select the randomized column
    if(randomCol==0)
    {
        uniqueBlocks=leftBlocks;
    }
    else{
        uniqueBlocks=rightBlocks;
    }


    // Get the randomly selected duplicate blocks
    const imgBlockUnique = uniqueBlocks[randomUnique - 1];

    insertImageIntoBlock(imgBlockUnique,randomUnique,randomCol);
}






function handleImageClick(id) {
   // alert(id);
    // You can perform any action here when the button is clicked

    //Check if the image clicked is the odd one out
    clickedImgCol=id[0];
    clickedImgPos=id[1];
    
    if((clickedImgCol=="l" && randomCol==0) || clickedImgCol=="r" && randomCol==1)
    {   if(clickedImgPos==randomUnique)
        {
            alert("correct choice!");

            //Onto the next level function
            nextLevel();

        }
        else{
            
        alert("You lost!");
        resetGame();
        }
    }
    else{
        alert("You lost!");
        resetGame();
    }
}


function nextLevel()
{
    level++;
    //Capture the block containing the image
    if(level<=6)
    {
    if(randomCol==0)
    {
        
    removeImgBlock = leftBlocks[randomUnique- 1];
    }
    else
    {
    removeImgBlock = rightBlocks[randomUnique- 1];
    }

    //remove the image
    removeImgBlock.innerHTML = ''; 

    //update the array holding the block elements
    //get all the blocks on the left
    leftBlocks = leftColumn.getElementsByClassName("block Left");

    //get all the blocks on the right side:
    rightBlocks = rightColumn.getElementsByClassName("block Right");

    levelHeader=document.getElementById("levelHeader");
    levelHeader.innerHTML="Level "+level;

    //add more images
    randomImageGenerator(leftBlocks,rightBlocks);
    }
    else{
        alert("Congrats you have won!!!!!")
        resetGame();
    }
    
}

