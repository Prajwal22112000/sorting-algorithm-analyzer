// NOTE: since the sleep function doesn't work on recursively called functions.
// I implemented them within the same function calls and wrote the code of recursively called functions into the calling function
// it solved the issue of sleep function without causing any bugs

let array = [];
let arraysorted = false;
let interruption = false;
let playsound = true;
let slider = document.getElementById("sliderrange");
let sortingtype = document.getElementById("sorttype");
let sortingspeed = document.getElementById("sortspeed");
let bubblesorttimeout, heapsorttimeout, mergesorttimeout, insertionsorttimeout, quicksorttimeout;
let sortbutton = document.getElementById("startsort");

// will be called when document loads
document.addEventListener("DOMContentLoaded", function(){
    addBar();
    soudnONOFF();
});

//function to add delay in the code
function sleep(waitTime){
    return new Promise(resolve => setTimeout(resolve, waitTime));
}

// if slider is changed bars amount will be changed respectively
slider.onchange = function(){
    randomizeArray();
};

// randomize the array with the same amount of size as before
function randomizeArray(){
    arraysorted = false;
    interruption = true;
    array = [];
    addBar();
    sortbutton.disabled = false;
}

// add bars in the graph
function addBar(){
    document.getElementById("barbox").innerHTML = "";
    document.getElementById("sliderrangecount").innerHTML = slider.value;
    for (let i = 0; i < slider.value; i++) {
        let random = Math.floor(Math.random()*100) + 1;
        array[i] = random;
        let element = document.createElement("div");
        element.className = "bar";
        element.id = "bar" + i;
        element.style.height = random + "%";
        document.getElementById("barbox").appendChild(element);
    }
}

// sorting and algorithms
function sort(){
    // after calling the randomizing or slider, sorting doesn't work, to change that
    // convert the interruption to false, so that sorting can work again
    interruption = false;
    // disable to sort button so that user can't click on the sort button in between the sorting process
    sortbutton.disabled = true;
    switch (sortingtype.value) {
        case "bsort":
            bubbleSort();
            break;
        case "isort":
            insertionSort();
            break;
        case "qsort":
            quickSort();
            break;
        case "hsort":
            heapSort();
            break;
        case "msort":
            mergeSort();
            break;
        case "ssort":
            selectionSort();
            break;
        default:
            alert("some error occured");
            break;
    }
}

// *************************************************************************************
async function bubbleSort(){
    if(arraysorted == false){
        let stick;
        let i = 0, j = 0;
        for (i = 0; i < array.length; i++) {
            for (j = 0; j < array.length - i; j++) {
                // abort sorting process if user presses slider or Randomizer
                if(interruption){return;}
                if(array[j] > array[j+1]){
                    swap(j, j + 1);
                }
                stick = document.getElementById("bar" + j);
                stick.style.backgroundColor = "rgb(170, 100, 90)";
                stick.style.height = array[j+1] + "%";
                await sleep(sortingspeed.value);
                stick.style.backgroundColor = "rgb(70, 132, 71)";
                stick.style.height = array[j] + "%";
            }
            stick.style.backgroundColor = "rgb(100, 177, 232)";
            soundeffect("single");
        }
    }
    completed();
}

// *************************************************************************************
async function insertionSort(){
    if(arraysorted == false){
        alert("insertoin sort function called");
        let i = 0, stick;
        while(i < array.length){
            if(interruption){return;}
            if(array[i] > array[i+1]){
                swap(i, i+1);
                if(i != 0){
                    i--;
                    stick.style.backgroundColor = "rgb(70, 132, 71)";
                    soundeffect("single");
                }
            }
            else{
                i++;
            }
            if(i < array.length){
                stick = document.getElementById("bar" + i);
                stick.style.backgroundColor = "rgb(170, 100, 90)";
                stick.style.height = array[i+1] + "%";
                await sleep(sortingspeed.value);
                stick.style.backgroundColor = "rgb(70, 132, 71)";
                stick.style.height = array[i] + "%";
                stick.style.backgroundColor = "rgb(100, 177, 232)";
            }
        }
    }
    completed();
}

// *************************************************************************************
function quickSort(){
    if (arraysorted == false){
        qs(0, array.length - 1);
    }else{
        completed();
    }
}

async function qs(left, right){
    let i, N;
    if (left >= right){
        return;
    }

    // partition code
    N = array[right];
    i = left;
    for (let j = left; j < right; j++) {
        if(array[j] <= N){
            if(interruption){return;}
            swap(i,j);
            document.getElementById("bar" + i).style.height = array[i] + "%";
            document.getElementById("bar" + j).style.height = array[j] + "%";
            document.getElementById("bar" + i).style.backgroundColor = "rgb(170, 100, 90)";
            document.getElementById("bar" + j).style.backgroundColor = "rgb(170, 100, 90)";
            await sleep(sortingspeed.value);
            document.getElementById("bar" + i).style.backgroundColor = "rgb(70, 132, 71)";
            document.getElementById("bar" + j).style.backgroundColor = "rgb(70, 132, 71)";
            i++;
        }
    }
    swap(right, i);
    document.getElementById("bar" + i).style.height = N + "%";
    document.getElementById("bar" + right).style.height = array[i] + "%";
    document.getElementById("bar" + i).style.backgroundColor = "rgb(100, 177, 232)";
    document.getElementById("bar" + right).style.backgroundColor = "rgb(100, 177, 232)";
    soundeffect("single");
    var pivot = i;
    //partition code ended

    qs(left, pivot - 1);
    qs(pivot + 1, right);
    for(i = 1; i < array.length; i++){if(array[i-1] > array[i]){break;}}
    if (i == array.length && arraysorted == false) {completed();}
}

// *************************************************************************************
async function selectionSort(){
    if(arraysorted == false){
        for (let i = 0; i < array.length; i++) {
            for (let j = i; j < array.length; j++) {
                if(interruption){return;}
                if (array[i] > array[j]) {
                    swap(i, j);
                }
                document.getElementById("bar" + i).style.height = array[i] + "%";
                document.getElementById("bar" + j).style.height = array[j] + "%";
                document.getElementById("bar" + i).style.backgroundColor = "rgb(170, 100, 90)";
                document.getElementById("bar" + j).style.backgroundColor = "rgb(170, 100, 90)";
                await sleep(sortingspeed.value);
                document.getElementById("bar" + i).style.backgroundColor = "rgb(70, 132, 71)";
                document.getElementById("bar" + j).style.backgroundColor = "rgb(70, 132, 71)";
            }
            document.getElementById("bar" + i).style.backgroundColor = "rgb(100, 177, 232)";
            document.getElementById("bar" + i).style.height = array[i] + "%";
            soundeffect("single");
        }
    }
    completed();
}

// *************************************************************************************
async function heapSort(){
    if (arraysorted == false) {
        let N = array.length;
        for(var i = Math.floor(N/2) - 1; i >= 0; i--){
            heapify(N, i);
        }
        for(var i = N - 1; i > 0; i--){
            if(interruption){return;}
            swap(0, i);
            document.getElementById("bar" + 0).style.height = array[0] + "%";
            document.getElementById("bar" + i).style.height = array[i] + "%";
            document.getElementById("bar" + 0).style.backgroundColor = "rgb(170, 100, 90)";
            document.getElementById("bar" + i).style.backgroundColor = "rgb(170, 100, 90)";
            await sleep(sortingspeed.value);
            document.getElementById("bar" + 0).style.backgroundColor = "rgb(100, 177, 232)";
            document.getElementById("bar" + i).style.backgroundColor = "rgb(100, 177, 232)";
            heapify(i, 0);
        }
    }
    completed();
}

function heapify(N, i){
    let max = i;
    let l = 2*i + 1;
    let r = 2*i + 2;
    if(l < N && array[l] > array[max])
        max = l;
    if(r < N && array[r] > array[max])
        max = r;
    if(max != i){
        swap(i, max);
        heapify(N, max);
    }
}

// *************************************************************************************
function mergeSort(){
    if (arraysorted == false) {
        ms(0, array.length - 1);
    }
    else{
        completed();
    }
}

async function ms(l, r){
    // await sleep(sortingspeed.value);
    if(l>=r){
        // alert("returned called");
        return;
    }
    var m = l + parseInt((r-l)/2);
    ms(l,m);
    ms(m+1,r);

    //merge function code
    var n1 = m - l + 1;
    var n2 = r - m;
    var L = new Array(n1);
    var R = new Array(n2);
    for (var i = 0; i < n1; i++)
        L[i] = array[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = array[m + 1 + j];
    var i = 0;
    var j = 0;
    var k = l;
    // alert("main while entered");
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k] = L[i];
            document.getElementById("bar" + k).style.height = L[i] + "%";
            i++;
        }
        else {
            array[k] = R[j];
            document.getElementById("bar" + k).style.height = R[j] + "%";
            j++;
        }
        // await sleep(sortingspeed.value);
        k++;
    }
    // alert("2nd while entered")
    while (i < n1) {
        // await sleep(sortingspeed.value);
        array[k] = L[i];
        document.getElementById("bar" + k).style.height = L[i] + "%";
        i++;
        k++;
    }
    // alert("3rd while entered")
    while (j < n2) {
        // await sleep(sortingspeed.value);
        array[k] = R[j];
        document.getElementById("bar" + k).style.height = R[j] + "%";
        j++;
        k++;
    }
    //merge function code ended
    for(i = 1; i < array.length; i++){if(array[i-1] > array[i]){break;}}
    if (i == array.length && arraysorted == false) {completed();}
    // alert("merge sort recursion ended ");
}

// *************************************************************************************
function swap(j, i){
    soundeffect("tick");
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}

// this completed function will add animation
async function completed(){
    sortbutton.disabled = false;
    arraysorted = true;
    await sleep(250);
    for (let j = 0; j < 3; j++) {
        soundeffect("complete");
        await sleep(150);
        for (let i = 0; i < array.length; i++) {
            document.getElementById("bar" + i).style.backgroundColor = "rgb(200, 200, 200)";
        }
        await sleep(150);
        for (let i = 0; i < array.length; i++) {
            document.getElementById("bar" + i).style.backgroundColor = "rgb(100, 177, 232)";
        }
    }
}

// play sounds or not
function soudnONOFF(){
    // alert("soudnoff called");
    if(playsound == true){
        document.getElementById("soundicon").innerHTML = '<img src="icons/volume-mute.png" alt="volume mute icon"></img>';
        playsound = false;
    }
    else {
        document.getElementById("soundicon").innerHTML = '<img src="icons/volume.png" alt="volume icon"></img>';
        playsound = true;
    }
}

// sound effects function;
function soundeffect(string){
    let audio;
    if(playsound){
        if(string == "tick"){
            audio = new Audio("audiofiles/tick.wav");
            audio.play();
        }
        else if(string == "single"){
            audio = new Audio("audiofiles/singlestick.wav");
            audio.play();
        }
        else if(string == "complete"){
            // alert("complete");
            audio = new Audio("audiofiles/completed.wav");
            audio.play();
        }
    }
}