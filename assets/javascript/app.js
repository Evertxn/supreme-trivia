
var number = 2000;
var running = false;
var intervalId;

var nextOneEndsit = false;

var points = 0;
var answered = 0;

var gameStart = false;

var questionTarget = 100;
var questionText = "";
var answerSelect = "";

var askable  = [];

var possibleAnswers = [];
 
var questions = [

	{
		number: 1,
		text: "How much did it cost to open Supreme back in 1994?",
		imageUrl: "assets/images/12k.jpg",
		answer: "around $12,000 ",
		wrongAnswers: ["around $12,000 ", "around $25,000", "around $5,000"]


		},

	{
		number: 2,
		text: "Who was Supreme's first hire back in 1994?",
		imageUrl: "assets/images/gio.jpg",
		answer: "Gio Estevez",
		wrongAnswers: ["Eric Koston", "Raf Simons", "Gio Estevez"]

		},

	{
		number: 3,
		text: "Who was the first artist Supreme ever worked with?",
		imageUrl: "assets/images/ram.jpg",
		answer: "Rammellzee",
		wrongAnswers: ["Banksy", "Rammellzee", "Satoshi Nakamato"]

		},	

	{
		number: 4,
		text: "Which brand filed suit against Supreme for putting box logo stickers on their 1994 Kate Moss ads?",
		imageUrl: "assets/images/kate.jpg",
		answer: "Calvin Klein",
		wrongAnswers: ["Calvin Klein", "Gucci", "Yves Saint Laurent"]

		},	

		{
		number: 5,
		text: "The Supreme motion logo is inspired by the title sequence of the 1990's film, designed by Saul Bass",
		imageUrl: "assets/images/good.jpg",
		answer: "Goodfellas",
		wrongAnswers: ["Pulp Fiction", "Goodfellas", "Fight Club"]

		},

		{
		number: 6,
		text: "What Canadian fleece manufacturer used to make Supreme's hoodies, sweatshirts and fleeces?",
		imageUrl: "assets/images/cyc.jpg",
		answer: "CYC",
		wrongAnswers: ["Siltex", "Gildan", "CYC"]

		},


		{
		number: 7,
		text: "As of 2012, James Jebbia's net worth is estimated at ...",
		imageUrl: "assets/images/jeb.jpg",
		answer: "$40 Million",
		wrongAnswers: ["$40 Million", "$2 Million", "$800 Thousand"]

		},

    	{
        number: 8,
        text: "James Jebbia was born in the United States, but lived in ... from age 1 to 19",
        imageUrl: "assets/images/british.jpg",
        answer: "England",
        wrongAnswers: ["France", "Spain", "England"]

    	}


];

var questionCount = 0;
for (var k in questions) {
    if (questions.hasOwnProperty(k)) {
       ++questionCount;

      ;

    }
}

for (var i = 0; i < questionCount; i++) {

	 askable.push(questions[i].text);

	 //bookmark
		
	//askable.remove(questions[2].text);
		//alert(askable);

}



var alreadyAsked =[];





//alert(questions[1].number);

$("#startButton").on("click", function () {


run();
gameStart = true;
	$(this).slideUp()
	.css("display: none");

	nextQuestion();

});



function nextQuestion() {

	
	gameStart = true;
	

		
	questionTarget = questions[Math.floor(Math.random()*questionCount)].number - 1;

	
	
	
	questionText = questions[questionTarget].text;
	answerSelect = questions[questionTarget].answer;
	questionUrl  = questions[questionTarget].imageUrl;

	if (alreadyAsked.indexOf(questionText) > -1 && alreadyAsked.length < questionCount ) {

		console.log("Needs another");
		nextQuestion();
		
	}

	else if (alreadyAsked.length < questionCount) { 

	console.log(questionText);

	number = 2000;

	alreadyAsked.push(questionText); //make sure we don't ask the same question twice

	possibleAnswers = questions[questionTarget].wrongAnswers;


	if (possibleAnswers.indexOf(answerSelect) < 0)  {

	possibleAnswers.push(answerSelect);  };

		

	shuffle(possibleAnswers);



	$("#answerHolder").html("");

	for (var i = 0; i < possibleAnswers.length; i++) {
	

	$("#answerHolder").append('<div class = "row"><div class = "col-md-8 col-md-offset-2"><div id = "answers'+i+'" class = "panel prev"><h3 id = "answer'+i+'">'+possibleAnswers[i]+'</h3></div></div></div>');
	$("#questionText").html('<h2>' + questionText +'</h2>');
	//IMPORTANT FIX!!

					}

	for (var i = 0; i < possibleAnswers.length; i++) {

	if (possibleAnswers[i] === answerSelect) {

		
		$("#answers"+i).data("isCorrect", true);
	}

	else {

		$("#answers"+i).data("isCorrect", false);

	}

	//if (number < 1) { 

	//nextQuestion();   }

				$("#answers"+i).on("click", function(){
				if (gameStart && answered < questionCount) {



					
						if ($(this).data("isCorrect")) {

							points ++;
							answered ++;
							console.log("Correct! Score: " + points + " out of " + answered);




							stop();
							displayImage();

							if (gameStart && answered < questionCount) {
							setTimeout(run, 3000);
							setTimeout(nextQuestion, 3000);
						}
						

							
						}
				
						else if(!$(this).data("isCorrect")) {

							answered++;
								console.log("WRONG! Score: " + points + " out of " + answered);
								

							stop();
							displayLoss();
							if (gameStart && answered < questionCount) {
							setTimeout(run, 3000);
							setTimeout(nextQuestion, 3000);
						}
						}

						if (answered === questionCount){

							/*if () {

								$("#questionText").html('<h2 id = "questionText">Correct!</h2>')
								$("#questionText").append("<img src=" + questionUrl + " width='400px'>");

							}
							else if() {

								$("#questionText").html('<h2 id = "questionText">Nope! The correct answer is '+answerSelect+'.</h2>')
							}*/

							stop();
							$("#stopwatch").html("");
							$("#questionText").append('<h2 id = "questionText">You answered '+ points +' out of '+ questionCount +' questions correctly.</h2>');
							$("#buttonHolder").html('<div id = "buttonHolder" style="text-align: center" class = "row"><button style=" width: 30%;" id = "resetButton" type="button" class="btn btn-success">Play Again</button></div>');
							$("#answerHolder").html("");

							/*for (var i = 0; i < 4; i++) {
								$("answers" + i).html("");
							} */

							$("#resetButton").on("click", function () {

									$(this).slideUp()
									.css("display: none");

									reset();

							});
							
						}


				}

				


	});






	
	}


		}


		
	
	}



function reset () {


run();

running = true;

number = 2000;



nextOneEndsit = false;

points = 0;
answered = 0;

gameStart = false;

questionTarget = 100;
questionText = "";
questionUrl = "";
answerSelect = "";

askable  = [];
possibleAnswers = [];

alreadyAsked =[];



	nextQuestion();

}



function displayImage() {
$("#questionText").html('<h2 id = "questionText">Correct!</h2>')
$("#questionText").append("<img src=" + questionUrl + " width='300px'>");
$("#stopwatch").html("");
$("#answerHolder").html("");

			}

function displayLoss () {

	$("#questionText").html('<h2 id = "questionText">Nope! The correct answer is '+answerSelect+'.</h2>')
	$("#stopwatch").html("");
	$("#answerHolder").html("");


}

function run() {
      if (!running ){
      intervalId = setInterval(decrement, 10); }
      running = true;
    }

    //  The decrement function.
    function decrement() {

      //  Decrease number by one.
      number = number - 1;

      //  Show the number in the #show-number tag.
      $("#stopwatch").html("<h2>Time Left: " + (number / 100).toFixed(2) + "</h2>");


      //  Once number hits zero...

      if (number < 1) {

      		stop();
      		
      		answered++;

      		$("#questionText").html('<h2 id = "questionText">Nope! The correct answer is '+answerSelect+'.</h2>')
			$("#stopwatch").html("");
			$("#answerHolder").html("");

			if (gameStart && answered < questionCount) {

      		setTimeout(nextQuestion, 3000);
      		setTimeout(run, 3000);
						}

      		if (answered === questionCount){

						
							stop();
							
							$("#questionText").html('<h2 id = "questionText">You answered '+ points +' out of '+ questionCount +' questions correctly.</h2>');
							$("#questionText").prepend('<h2 id = "questionText">Nope! The correct answer is '+answerSelect+'.</h2>')
							$("#stopwatch").html("");
							$("#buttonHolder").html('<div id = "buttonHolder" style="text-align: center" class = "row"><button style=" width: 30%;" id = "resetButton" type="button" class="btn btn-success">Play Again</button></div>');
							$("#answerHolder").html("");

							/*for (var i = 0; i < 4; i++) {
								$("answers" + i).html("");
							} */

							$("#resetButton").on("click", function () {

									$(this).slideUp()
									.css("display: none");

									reset();

							});
							
						}
      }
      
    }

    function stop() {

      if (running) {

      //  Clears our intervalId
      //  We just pass the name of the interval
      //  to the clearInterval function.
      clearInterval(intervalId);
    }
      running = false;

    }

  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
