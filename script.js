var ad= $('.ad');
var x= $('.closebtn');
var body= $('body');
x.on('click',function(){
	ad.slideUp(1000);
	setTimeout(function(){
		var difficult= 6;
		var colors= generateRandomColors(difficult);
		var squares= $('.square');
		var clickedColor;
		var pickedColor= pickColor();

		var span1= $('#colorDisplay');
		span1.text(pickedColor);

		var message= $('#message');
		var h1= $('.white');

		var reset= $('#reset');
		reset.on('click', resetColor);

		var easyBtn= $('#easy');
		var hardBtn= $('#hard');
		easyBtn.on('click', selectEasy);
		hardBtn.on('click', selectHard);

		// Aca le vuelvo a aplicar la clase 'botones' al dejar de pasar el mouse, clase la cual le elimine al hacer el hover.
		easyBtn.on('mouseleave', function(){
			easyBtn.addClass('botones');
		});

		hardBtn.on('mouseleave', function(){
			hardBtn.addClass('botones');
		});

		reset.on('mouseleave', function(){
			reset.addClass('botones');
		});


		// En este bucle le asignamos un backgroundColor a cada uno de nuestros squares
		for (var i in squares){
			squares[i].style.backgroundColor= colors[i];
			squares[i].addEventListener("click", checkColor);
		}

		// Con esta funcion checkeamos si el color aleatorio generado coincide con el square seleccionado por el usuario
		function checkColor(){

			clickedColor= $(this).css('background-color');

			if (clickedColor == pickedColor.toLowerCase()){
				reset.text('Play Again!');
				message.text('Correct!');
				h1.css('background-color', clickedColor);
				changeColors(clickedColor);

		// Caso contrario, le damos al square el backgroundColor del body;
			}else{
				$(this).css('background-color', '#232323');
				message.text('Try Again');
			}
		}

		// Con esta funcion le aplicamos el backgroundColor a cada uno de nuestros divs
		function changeColors(h1bkg){

			for(var i = 0; i < difficult; i++){
				squares[i].style.backgroundColor= h1bkg;
			}
		}

		// Con esta funcion alternamos cual va a ser el square que coicida con el color expresado en el h1
		function pickColor(){

			var num = Math.round(Math.random() * (difficult-1));
			return colors[num];	
		}

		// Con esta funcion generamos un color rgb random
		function randomColor(){

			var rgbColor=[];
			for (var i = 0; i < 3; i++){
				 rgbColor[i]= Math.round(Math.random() * 255);
			}

			return "RGB(" + rgbColor[0] + ", " + rgbColor[1] + ", " + rgbColor[2] + ")";	
		}

		// Con esta funcion vamos a crear nuestro array de colores de forma aleatoria
		function generateRandomColors(num){

			var arrayColor= [];
			for (var i = 0; i < num; i++){
				arrayColor.push(randomColor());
			}

			return arrayColor;
		}

		// En esta funcion reseteamos los colores en caso de solicitarse Play again! o New Colors.
		function resetColor(){

			reset.text('New Colors');
			message.text('');
			h1.css('background-color', 'steelblue');
			colors= generateRandomColors(difficult);
			pickedColor= pickColor();
			span1.text(pickedColor);
			changeColors(colors);

			for (var i = 0; i < difficult; i++){
				squares[i].style.backgroundColor= colors[i];
				squares[i].addEventListener("click", checkColor);
			}
		}

		// Funcion para seleccionar juego Easy
		function selectEasy(){

			easyBtn.addClass('selected');
			easyBtn.removeClass('botones');
			hardBtn.removeClass('selected');
			difficult= 3;

			for (var i = 3; i < squares.length; i++){
				squares[i].classList.add("hidden");
			}

			resetColor();			
		}

		// Funcion para seleccionar juego Hard
		function selectHard(){

			hardBtn.addClass('selected');
			hardBtn.removeClass('botones');
			easyBtn.removeClass('selected');
			difficult= 6;

			for (var i = 3; i < squares.length; i++){
				squares[i].classList.remove("hidden");
			}

			resetColor();
		}
});
}, 1000);

