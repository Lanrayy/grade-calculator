'use strict'
console.log("Hello");

//Object constructor
//Allows you to create multiple instances of the same object
class assessment{
    constructor(name, yourScore, totalMarks, worth){
        if(yourScore > totalMarks){
            throw new Error("Your score is greater than the total marks");
        }

        if(yourScore < 0){
            throw new Error("Invalid input. Score is less than zero");
        }
        
        if(totalMarks < 0){
            throw new Error("Invalid input. Total Marks is less than zero");
        }

        this.name = name;
        this.score = yourScore;
        this.totalMarks = totalMarks;
        this.percent = this.calcPercentage(yourScore, totalMarks);
        this.worth = worth;
        this.grade = this.calcGrade(this.percent);
    }

    calcPercentage(yourScore, totalMarks){
        let percent = ((yourScore / totalMarks) * 100);
        percent = Number(percent.toFixed(2));
        return percent;
    }

    calcGrade(percent){
        if(percent >= 70){
            return "1st";
        } else if(percent >= 60 && percent < 70){
            return "2.1";
        }else if(percent >= 50 && percent < 60){
            return "2.2";
        }else if(percent >= 40 && percent < 50){
            return "3rd";
        } else {
            return "Did not pass";
        }
    }
}

class modules{

    constructor(name, moduleCode, numofAssessments, credits){
        this.name = name;
        this.moduleCode = moduleCode;
        this.numOfAssessments = numofAssessments;
        this.average = this.calcAverage;
        this.credits = credits;
        // an object containing assessment objects;
        this.assessments = {};
    };
    
    //methods
    //returns a string representation of the fields in the object
    moduleDetails(){
        console.log(`Databases ${this.moduleCode} is worth ${this.credits} credits and has ${this.numOfAssessments} assessments.
You have done already done ${this.calcNumOfAssessments()} asssessment(s).`);
    };

    //this method adds a new assessment to the module
    addAssessment(name, yourScore, totalMarks, worth){
        let numOfCurrentAssessments = this.calcNumOfAssessments();

        if(this.numOfAssessments - numOfCurrentAssessments <= 0){
            // console.log("You have already added the maximum number of assessments");
            // alert("You have already added the maximum number of assessments");
            return 0;
        }

        try{
            this.assessments[name] = new assessment(name, yourScore, totalMarks, worth);
        }
        catch(e){
            console.log(`Error: ${e.message}!`);
        }
    }

    //this method calulates the number of assessments already taken in the module
    calcNumOfAssessments(){
        let keys = Object.keys(this.assessments);
        this.numofAssessments = keys.length;
        return keys.length;
    };

    // this method calculates the weighted average for the module.
    calcWeightedAverage(){
        let currentNumOfAssessments = this.calcNumOfAssessments();

        // let weightedAverage = 0;
        // for(let i = 0; i < currentNumOfAssessments; i++){
        //     let grade = this.assessments[`assessment_${i+1}`].percent;
            
        //     let worth = this.assessments[`assessment_${i+1}`].worth;
        //     worth /= 100;

        //     weightedAverage += (grade * worth);
        //     console.log(weightedAverage);
        // }

        //Get the weighted sum of all the current assessements
        let weightedAverage = 0;
        for(let assessment_name in this.assessments){
            // console.log(this.assessments[assessment_name]["percent"]);

            let grade = this.assessments[assessment_name]["percent"];
            let worth = this.assessments[assessment_name]["worth"];
            worth = worth / 100;

            weightedAverage += (grade * worth)
            console.log(weightedAverage);
        }


        weightedAverage = Number(weightedAverage.toFixed(2));
        this.average = weightedAverage;

        return weightedAverage;
    }

    //this method calculates the grade that the user has gotten
    static calcGrade(num){
        if(num >= 70){
            //console.log(`Your score is ${num} and you currently have a first`);
            return " a first, ";
        } else if(num >= 60 && num < 70){
            //console.log(`Your score is ${num} and you currently have a 2.1`);
            return " a 2.1, ";
        }else if(num >= 50 && num < 60){
            //console.log(`Your score is ${num} and you currently have a 2.2`);
            return " a 2.2, ";
        }else if(num >= 40 && num < 50){
            //console.log(`Your score is ${num} and you and currently have a Pass`);
            return " a pass, ";
        } else {
            //console.log(`Your score is ${num} and you have not passed yet`);
            return " ";
        }
    }

    getWeightedProjections(num){
        //Calculate the percentage/worth of the final assessement
        let output = "";
        let weightedFeedbackForFirst = "";
        let weightedFeedbackForTwoOne = "";
        let weightedFeedbackForTwoTwo = "";
        let weightedFeedbackForPass = "";

        let currentNumOfAssessments = this.calcNumOfAssessments();
        let sumOfTakenAssessements = 0;
        for(let i = 0; i < currentNumOfAssessments; i++){
            sumOfTakenAssessements += Number(this.assessments[`assessment_${i+1}`].worth);
        }
        let worthOfFinalAssessment = 100 - sumOfTakenAssessements;

        //Calculate the marks need for a first using the weighted average
        //Show it to the user
        console.log(`Sum: ${sumOfTakenAssessements}`);
        console.log(`Worth of final assessment: ${worthOfFinalAssessment}`);

        let marksForAFirst = ((70 - num)/ (worthOfFinalAssessment / 100)).toFixed(2);
        console.log(marksForAFirst);
        //if the marks needed for a first is less than zero, then the student has ahieved a first already regardless of the result of the final assessment. 
        if(marksForAFirst <= 0){
            weightedFeedbackForFirst = "You have already achieved a first <br/>";
            console.log(weightedFeedbackForFirst);
            output += weightedFeedbackForFirst;
        }else{

            if(marksForAFirst > worthOfFinalAssessment){
                weightedFeedbackForFirst = "Unfortunately, you cannot get a first in this module <br/>";
                console.log(weightedFeedbackForFirst);
                output += weightedFeedbackForFirst;
            }
            else{
                weightedFeedbackForFirst = `You need to get at least ${marksForAFirst}%,${modules.calcGrade(marksForAFirst)}in the final assessment in order to get a first.<br/>`;
                console.log(weightedFeedbackForFirst);
                output += weightedFeedbackForFirst;
            }
        }

        let marksForATwoOne = ((60 - num)/ (worthOfFinalAssessment / 100)).toFixed(2);
        console.log(marksForATwoOne);
        if(marksForATwoOne <= 0){
            weightedFeedbackForTwoOne = "You have already achieved a 2.1.<br/>";
            console.log(weightedFeedbackForTwoOne);
            output += weightedFeedbackForTwoOne;

        }else{
            if(marksForATwoOne > worthOfFinalAssessment){
                weightedFeedbackForTwoOne = "Unfortunately, you cannot get a 2.1 in this module.<br/>";
                console.log(weightedFeedbackForTwoOne);
                output += weightedFeedbackForTwoOne;
            }
            else{
                weightedFeedbackForTwoOne = `You need to get at least ${marksForATwoOne}%,${modules.calcGrade(marksForATwoOne)}in the final assessment in order to get a 2.1.<br/>`;
                console.log(weightedFeedbackForTwoOne);
                output += weightedFeedbackForTwoOne
            }
        }

        let marksForATwoTwo = ((50 - num)/ (worthOfFinalAssessment / 100)).toFixed(2);
        if(marksForATwoTwo <= 0){
            weightedFeedbackForTwoTwo = "You have already achieved a 2.2.<br/>";
            console.log(weightedFeedbackForTwoTwo);
            output += weightedFeedbackForTwoTwo;
        }
        else{
            if(marksForATwoTwo > worthOfFinalAssessment){
                weightedFeedbackForTwoTwo = "Unfortunately, you cannot get a 2.2 in this module.<br/>";
                console.log(weightedFeedbackForTwoTwo);
                output += weightedFeedbackForTwoTwo;
            }
            else{
                weightedFeedbackForTwoTwo = `You need to get at least ${marksForATwoTwo}%,${modules.calcGrade(marksForATwoTwo)}in the final assessment in order to get a 2.2<br/>`;
                console.log(weightedFeedbackForTwoTwo);
                output += weightedFeedbackForTwoTwo;
            }
        }
        
        let marksForAPass = ((40 - num)/ (worthOfFinalAssessment / 100)).toFixed(2);
        if(marksForAPass <= 0){
            weightedFeedbackForPass = "You have already passed<br/>";
            console.log(weightedFeedbackForPass);
            output += weightedFeedbackForPass;
        }
        else{
            if(marksForAPass > 100){
                weightedFeedbackForPass = "Unfortunately, You cannot pass this module<br/>";
                console.log(weightedFeedbackForPass);
                output += weightedFeedbackForPass;
            }
            else{
                weightedFeedbackForPass = `You need to get at least ${marksForAPass}%,${modules.calcGrade(marksForAPass)}in the final assessment in order to get a Pass<br/>`;
                console.log(weightedFeedbackForPass);
                output += weightedFeedbackForPass;
            }
        }
        return output;
    }

    //this method will provide complete/overall feedback to the user about the module.
    feedback(){

        let output = "";
        //Before providing Feedback Calculate the average
        this.calcWeightedAverage();

        //if there are no assessments left.
        //Log the user's final grade for the module.
        if(this.numOfAssessments - this.calcNumOfAssessments() == 0)
        {
            console.log("No assessments left");

            if(this.average >= 70){
                output += `Your final mark is ${(Math.trunc(this.average))}% and your final grade is a first<br/>`;
                console.log(output);
                
            } else if(this.average >= 60 && this.average < 70){
                output += `Your final mark is ${(Math.trunc(this.average))}% and your final grade is a 2.1<br/>`;
                console.log(output);
                
            }else if(this.average >= 50 && this.average < 60){
                output += `Your final mark is ${(Math.trunc(this.average))}% and your final grade is a 2.2<br/>`;
                console.log(output);
                
            }else if(this.average >= 40 && this.average < 50){
                output += `Your final mark is ${(Math.trunc(this.average))}% and your final grade is a Pass<br/>`
                console.log(output);
            }else {
                output += `Your final mark is ${(Math.trunc(this.average))}% and you did not pass this module<br/>`
                console.log(output);
            }
        }
        //if there is only one assessment left.
        else if(this.numOfAssessments - this.calcNumOfAssessments() == 1)
        {
            console.log("One assessment left");
            //calculate average
            //if average is first, tell user that they have already achieved a first.
            if(this.average >= 70)
            {
                output += `Your current mark is ${this.average}% and you currently have a first.<br/>`;
                console.log(output);
                output += this.getWeightedProjections(this.average);

            } 
            // if they have a 2.1 tell them how much they need to get a first on the last assessement.
            else if(this.average >= 60 && this.average < 70)
            {
                output += `Your current mark is ${(this.average)}% and you currently have a 2.1.<br/>`;
                console.log(output);
                output += this.getWeightedProjections(this.average);
            }else if(this.average >= 50 && this.average < 60){
                output += `Your current mark is ${this.average}% and you currently have a 2.2.<br/>`;
                console.log(output);
                output += this.getWeightedProjections(this.average);
            }else if(this.average >= 40 && this.average < 50){
                output += `Your current mark is ${this.average}% and you and currently have a third.<br/>`
                console.log(output);
                output += this.getWeightedProjections(this.average);
            } else{
                output += `Your current mark is ${this.average}% and you have not passed yet.<br/>`
                console.log(output);
                output += this.getWeightedProjections(this.average);
            }
        }
        else{
            output += `Your current mark is ${(this.average)}%.<br/>`
            console.log(output);
            output += "You need to add more assessements to get better insights.<br/>";
            console.log(output);
            
        }
        return output;
    }

    
}

// Tests
let databases = new modules("Databases", "COMP1121", 4, 10);

//Programming for the web
databases.addAssessment("assessment_1", 5, 10, 20);
databases.addAssessment("assessment_2", 10, 20, 10);
databases.addAssessment("assessment_3", 5, 20, 10);
databases.feedback();

databases.calcNumOfAssessments();
// databases.addAssessment("coursework_4", 14, 16, 10);

console.log("****Feedback****");
databases.feedback();
console.log("<br/>");


let modulesList = {};

//Additional methods
//this function sets the button to specific module

//Main program

let modulesContainer = document.querySelector(".modules-container");
let node = document.querySelector(".original-module");

//Add Module
let addModuleButton = document.querySelector(".add-module-button");
addModuleButton.addEventListener("click", function(){
    let popup = document.querySelector(".add-module-popup-container");
    popup.classList.remove("hide");

});

let setModuleName = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.textContent = nameofModule;
}
//this function sets the button to specific module
let setDeleteModuleButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.classList.add(`${nameofModule}-add-assessment-button`);
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.classList.add(`${nameofModule}`);
}
let setAddAssessmentButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-delete-assessment-button`);
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}`);
}
let setModuleDetailsButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-module-details-button`);
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}`);
}
let setModuleFeedbackButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-module-feedback-button`);
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}`);

}
let setMinimizeButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-minimise-button`);
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}`);
}
let setModuleDropdownClassName = function(node, nameofModule){
    node.firstChild.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-module-dropdown`);
    node.firstChild.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}`);
}

//Add Module Popup Cancel button
let closeModulePopup = function(){
    let popup = document.querySelector(".add-module-popup-container");
    popup.classList.add("hide");
};

let closeAssessmentPopup = function(){
    let popup = document.querySelector(".add-assessment-popup-container");
    popup.classList.add("hide");
};

let closeModuleFeedbackPopup = function(){
    let popup = document.querySelector(".module-feedback-popup-container");
    popup.classList.add("hide");
};

let sampleModule;

let saveModule = function(){
    //TODO: Get the detail user enters , parse and remove all spaces
    
    //Get all the values for the new module
    let moduleName = document.querySelector("#module-name").value;
    moduleName = moduleName.replace(/ /g, "-");
 
    
    //This variable will be displayed to the user
    let userModuleName = document.querySelector("#module-name").value; 
    let moduleCode = document.querySelector("#module-code").value;
    let numOfAssessments = document.querySelector("#num-of-assessments").value;
    let credits = document.querySelector("#credits").value;

    if(userModuleName == "" || moduleCode == "" || numOfAssessments == "" || credits == ""){
        alert("Please check all the fields and ensure you enter valid values!");
        return 0;
    }

    //Create a new module
    modulesList[`${moduleName}`]= new modules(moduleName, moduleCode, numOfAssessments, credits); 
    // sampleModule = new modules(moduleName, moduleCode, numOfAssessments, credits);

    //Close the popup
    let popup = document.querySelector(".add-module-popup-container");
    popup.classList.add("hide");

    //Add the new module to the list
    let newModule = node.cloneNode(true);
    newModule.classList.remove('original-module');
    newModule.setAttribute("id", `${moduleName}-module`);
    // newModule.classList.add(`${moduleName}-module`);

    //Add the user inputed name of the module into the element
    setModuleName(newModule,userModuleName);
    
    //Set the class names for buttons of the new module
    setDeleteModuleButton(newModule,moduleName);
    setAddAssessmentButton(newModule, moduleName);
    setModuleDetailsButton(newModule, moduleName);
    setModuleFeedbackButton(newModule, moduleName);
    setMinimizeButton(newModule, moduleName);
    setModuleDropdownClassName(newModule, moduleName);

    let newElement = document.createElement("div");
    newElement.setAttribute("class", "module" );

    modulesContainer.appendChild(newModule);
}

//Delete the selected module that was clicked on
let deleteModule = function(element){
    //confirm if user wants to delete module
    let answer = prompt("Are you sure you want to delete this module? (y/n)");

    if(answer[0] == "y"){
        let moduleName = element.classList[3];
        let moduleToDelete = document.querySelector(`#${moduleName}-module`);

        let modulesContainer = document.querySelector(".modules-container");
        console.log(modulesContainer);
        //Delete the selected module
        modulesContainer.removeChild(moduleToDelete);

        delete modulesList[`${moduleName}`];
    }

    
};

//This function opens the add module panel when the add assessment button is clicked
let addAssessment = function(element){
    //Get the name of the class & the target dropdown
    let moduleName = element.classList[2];

    let assessmentNameInput = document.querySelector("#assessment-name");
    assessmentNameInput.textContent = `coursework_${numberOfAssessmentsTaken}"`;

    let popup = document.querySelector(".add-assessment-popup-container");
    popup.classList.remove("hide");

    let target = document.querySelector(".target-module");
    target.textContent = moduleName;
}


let numberOfAssessmentsTaken = 1;
//this fucntion adds the assessment to the list
let saveAssessment = function() {
    // Get the module name and the dropdown name
    let moduleName = document.querySelector(".target-module").textContent;
    let modulesDropdown = document.querySelector(`.${moduleName}-module-dropdown`); 

    //Get the number of elements in the dropdown

    //Get the datails of the assessment to be added for the module object
    console.log(numberOfAssessmentsTaken);

    let assessmentName = `assessment_${numberOfAssessmentsTaken}`;
    

    //Get the details the user enters and parse it
    let userAssessmentName = document.querySelector("#assessment-name").value;
    let score = Number(document.querySelector("#score").value);
    let totalMarks = Number(document.querySelector("#total-marks").value);
    let worth = document.querySelector("#worth").value;

    if(userAssessmentName == "" || score == "" || totalMarks == "" || worth == "" || worth > 100 || score > totalMarks){
        alert("Please check all the fields and ensure you enter valid values!");
        return 0;
    }

    console.log(assessmentName);
    console.log(score);
    console.log(totalMarks);
    console.log(worth);

    let numberOfAssessmentsAdded = modulesList[`${moduleName}`].calcNumOfAssessments();
    console.log(numberOfAssessmentsAdded);
    let numOfAssessments = Number(modulesList[`${moduleName}`]["numOfAssessments"]);
    console.log(numOfAssessments);

    //Check if the number of assessments already added is less than the total number of assessments
    if(numberOfAssessmentsAdded < numOfAssessments){
        //Add the assessement to the specific module
        modulesList[`${moduleName}`].addAssessment(assessmentName, score, totalMarks, worth);

        //Create a button and add it to the element
        let newElement = document.createElement("div");
        let text = document.createTextNode(`${userAssessmentName}( ${worth}% ): `);
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("button", "cancel-button", `${moduleName}-delete-assessment-button`, `${moduleName}`, `${moduleName}-${assessmentName}`, `${assessmentName}`);
        deleteButton.setAttribute("onclick", "deleteAssessment(this)");
        deleteButton.textContent = "DELETE ASSESSMENT";

        //Create the node with the assesment information
        let details = ` [   Your got:  ${score} out of ${totalMarks} | ${modulesList[`${moduleName}`]["assessments"][assessmentName]["percent"]}%]`;
        let asssessmentDetails = document.createTextNode(details);

        //Append the text to the new element 
        newElement.appendChild(text);
        newElement.appendChild(asssessmentDetails);
        newElement.appendChild(deleteButton);
        newElement.setAttribute("id", `${moduleName}-${assessmentName}`);
        newElement.setAttribute("class", "assessment" );
        newElement.classList.add(`${moduleName}-assessment`);

        //append new assessment to the dropdown
        modulesDropdown.appendChild(newElement);
        console.log(modulesList);
        numberOfAssessmentsTaken++;
        closeAssessmentPopup();
    }
    else{
        alert("You have already added the maximum number of assessments!");
    }
}

//this funtion deletes the clicked assessment from the list of assessments for the specifc module
let deleteAssessment = function(element){
    //Get the name of the class, the target dropdown & id of the element to delete
    let moduleName = element.classList[3];
    console.log(element);
    console.log(moduleName);
    console.log("This" + element.classList[5]);

    let assessementToDelete = element.classList[4];

    // console.log(element);
    // console.log(element.classList[5]);
    let modulesDropdown = document.querySelector(`.${moduleName}-module-dropdown`);

    //Obtain the node of the element 
    let node = document.querySelector(`#${assessementToDelete}`);

    //Try to remove the node, if it can't log a message
    try{
        //Remove the assessement object from the modulesListObject
        delete modulesList[`${moduleName}`]["assessments"][`${element.classList[5]}`];

        //Remove the node from the website
        modulesDropdown.removeChild(node);

    }catch(e){
        console.log("Error: Cannot remove assessment!");
    } 
}

//This funtion will provide information to the user about the module.
let moduleDetails = function(element){
    let moduleName = element.classList[2];
    modulesList[`${moduleName}`].moduleDetails();
    let moduleDetailsInfo;

    console.log(modulesList);
}

//This funtion will provide feedback to the user about the module.
let moduleFeedback = function(element){

    //get feedback
    let moduleName = element.classList[2];
    let moduleFeedbackInfo = modulesList[`${moduleName}`].feedback();
    
    console.log("This " + moduleFeedbackInfo);


    //show the module feedback popup
    let popup = document.querySelector(".module-feedback-popup-container");
    popup.classList.remove("hide");

    //put feedback into popup
    // let feedback = document.createTextNode(moduleFeedbackDetails);
    let target = document.querySelector(".feedback");
    // let target = document.querySelector(".module-feedback-container");
    target.innerHTML = moduleFeedbackInfo;
    // target.appendChild(feedback);
    // feedback = "";

}

//this function, minimises the module dropdown list
let minimise = function(element){
    //Change the name of the button
    element.textContent == "MINIMISE"? element.textContent = "MAXIMISE" : element.textContent = "MINIMISE";
    //Get module name & target drop down
    let moduleName = element.classList[2];
    let dropdown= document.querySelector(`.${moduleName}-module-dropdown`);
    dropdown.classList.toggle("hide");
}



