const convertBtn = document.getElementById('convert-btn');
const results = document.getElementById('results');
const errorMessage = document.getElementById('error');
const calculationDiv = document.getElementById('calculation');
const calculateBtn = document.getElementById('calculate-btn');
const finalBtn = document.getElementById('final-btn');
const finalDiv = document.getElementById('final');
const resetBtn = document.getElementById('reset-btn');
const buttonsDiv = document.getElementById('buttons');

let storeLbs = [];
let storeInches = [];
let storeTotalWeight = [];
let storeTotalVolume = [];

convertBtn.addEventListener('click', function(){
    // Get the current value from the input which is string because type is text to a number by parseFloat each time the button is clicked
    const lbsInput = document.getElementById('lbs').value.trim();
    const inchesInput = document.getElementById('inch').value.trim();
    const lbs = parseFloat(lbsInput);
    const inches = parseFloat(inchesInput);
    
    // Clear all before rendering out 
    let content = '';
    
    // Check if one of values entered 
    if(!lbsInput && !inchesInput){
        errorMessage.style.display = 'block';
        return;
    }else{
        errorMessage.style.display = 'none';
    }
    
    // Check if entered values are integers and positive
    // Math.ceil() to round Up to the nearest whole number 
    if(isNaN(lbs) && isNaN(inches)){
        errorMessage.style.display = 'block';
        return;
    }else if (isNaN(lbs) || lbs < 0 && inches>=0){
        content = `
            <div class='div-result'>
                <p>${Math.ceil(inches)} inches = ${Math.ceil(inches*2.54)} cm. </p>
            </div>
        
        `
    }else if(isNaN(inches) || inches<0 && lbs>=0){
        content = `
            <div class='div-result'>
                <p>${Math.ceil(lbs)} lbs = ${Math.ceil(lbs * 0.45359237)} kg. </p>
            </div>
        
        `
    }else if (lbs>=0 && inches>=0){
        errorMessage.style.display = 'none';
        content = `
            <div class='div-result'>
                <p>${Math.ceil(lbs)} lbs = ${Math.ceil(lbs * 0.45359237)} kg. </p>  
                <p>${Math.ceil(inches)} inches = ${Math.ceil(inches*2.54)} cm. </p>
            </div>
        
        `
    }else{
        errorMessage.style.display = 'block';
        return;
    }
    storeLbs.push(Math.ceil(lbs * 0.45359237));
    storeInches.push(Math.ceil(inches *2.54));
    
    console.log(storeLbs)
    console.log(storeInches)
    
    localStorage.setItem('lbs', JSON.stringify(storeLbs))
    localStorage.setItem('inches', JSON.stringify(storeInches))
    
    console.log(localStorage.getItem('lbs'))
    console.log(localStorage.getItem('inches'))
    
    results.style.display = 'block';
    results.innerHTML = content;
    // Reset input value after convertion
    document.getElementById('lbs').value = '';
    document.getElementById('inch').value = '';
    
    setTimeout(function(){
        buttonsDiv.style.display = 'block';
    },1000)
})

// Reset button 
resetBtn.addEventListener('click', function(){
    // Reset input value after convertion
    document.getElementById('lbs').value = '';
    document.getElementById('inch').value = '';
    
    storeLbs = [];
    storeInches = [];
    storeTotalWeight = [];
    storeTotalVolume = [];
   
    localStorage.clear();
    
    results.style.display = 'none';
    finalDiv.style.display = 'none';
    calculationDiv.style.display = 'none';
    buttonsDiv.style.display = 'none';
    finalBtn.style.display = 'none';
    errorMessage.style.display = 'none';

})

calculateBtn.addEventListener('click', function(){
   
    let calculateContent = '';
    
    let weights = JSON.parse(localStorage.getItem('lbs')) || [];
    let volumes = JSON.parse(localStorage.getItem('inches')) || [];
    
    if (volumes.length < 3){
        errorMessage.textContent = 'Please enter at least 3 numbers'
        errorMessage.style.display = 'block'
        calculationDiv.innerHTML = '';
        finalDiv.style.display = 'none';
        finalBtn.style.display = 'none';
        return;
    }
    
    errorMessage.style.display = 'none';
    
    let totalWeight = 0;
    let totalVolume = 1; // Start with 1 for multiplication 
    
    console.log(weights)
    console.log(volumes)
        
    for (let weight of weights){
            totalWeight += weight;
    }
        
    for (let volume of volumes){
            totalVolume *= volume;
    }
    
    console.log(totalWeight)
    console.log(totalVolume)
    
    let volumeInCbm = totalVolume/1e+6
    
    storeTotalVolume.push(volumeInCbm)
    storeTotalWeight.push(totalWeight)
    
    localStorage.setItem('total_volume', JSON.stringify(storeTotalVolume))
    localStorage.setItem('total_weight', JSON.stringify(storeTotalWeight))
    
    calculateContent = `       
                <div class='div-result'>
                        <p> Total weight = ${(totalWeight).toFixed(2)} kg. </p>
                        <p> Volume = ${(volumeInCbm).toFixed(2)} cbm. </p>
                </div>
        `
    calculationDiv.innerHTML = calculateContent;
    calculationDiv.style.display = 'block'
    clearlocalStorage() 
    finalBtn.style.display = 'block'; 

})

// Clear memory of local Storage
function clearlocalStorage(){
    localStorage.removeItem("lbs");
    localStorage.removeItem("inches");
    storeLbs = [];
    storeInches = [];
    console.log('Local storage cleared');
}

finalBtn.addEventListener('click', function(){
    
    let grandContent = '';
    
    let grandTotalWeight = 0;
    let grandTotalVolume = 0;
    
    let grandVolumes = JSON.parse(localStorage.getItem('total_volume'))
    let grandWeights = JSON.parse(localStorage.getItem('total_weight'))
    
    for (let grandWeight of grandWeights){
        grandTotalWeight += grandWeight
    }
    
    for (let grandVolume of grandVolumes){
        grandTotalVolume += grandVolume
    }
    
    grandContent = `
                <div class='div-result'>
                        <p> Total weight = ${(grandTotalWeight).toFixed(2)} kg. </p>
                        <p> Volume = ${(grandTotalVolume).toFixed(2)} cbm. </p>
                </div>
    `
    
    finalDiv.style.display = 'block';
    finalDiv.innerHTML = grandContent;
})

