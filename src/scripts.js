function getHomeUrl() {
  var href = window.location.href;
  var index = href.indexOf('/wp-admin');
  var homeUrl = href.substring(0, index);
  return homeUrl;
}

(function ($, root, undefined) {

	console.log('%cBienvenido a Multiplicatron el juego para los que no saben multiplicar bien', 'color: #ff0000; font-size: 30px; font-family: impact;');

	$(function () {

		'use strict';

		/*-----------------------------------------//
					VARIABLES GLOBALES
		//-----------------------------------------*/

		var lastScrollTop = 0; // Para revisar distancia de scroll y esconder el header.
		var $body = $(document.body);
		var min = parseInt($('.min').val());
		var max = parseInt($('.max').val());
		var time = parseInt($('.time').val());

		/*-----------------------------------------//
						FUNCIONES
		//-----------------------------------------*/

		$('.min').change(function( event ) {
				min = parseInt($('.min').val());
			if (min<max) {
				min = parseInt($('.min').val());
			} else {
  				alert( "Debe ser menor que el máximo: "+max );
				min = parseInt(max)-1;
				$('.min').val(min);
			}
		});
		$('.max').change(function( event ) {
				max = parseInt($('.max').val());
			if (min<max) {
				max = parseInt($('.max').val());
			} else {
  				alert( "Debe ser mayor que el mínimo: "+min );
				max = parseInt(min)+1;
				$('.max').val(max);
			}
		});
		function Multiplicatron(){
			var countNum = 0;
			function counter() {
				countNum = parseInt($('#counter').text());
				countNum = parseInt(countNum)+1
				$('#counter').text(countNum);
				countNum = $('#counter').text();
			}setInterval(counter,1000);

			console.log('Multiplicatron Activado');
			var rand1 = Math.floor((Math.random() * max) + 1);
			var rand2 = Math.floor((Math.random() * max) + 1);
			$('.a').val(rand1);
			$('.b').val(rand2);
			$('.result').focus();
			
			$( "#multiplicatron" ).submit(function( event ) {
				var time = parseInt($('.time').val());
				console.log(min+' - '+max);
				var result = $('.result').val();
				console.log($('.result').val());
				rand1 = $('.a').val();
				rand2 = $('.b').val();
				var correct = parseInt(rand1*rand2);

				if(result==correct) {
					if (countNum>=time || countNum<time){
						if (countNum>=time){
							var monstruo = parseInt($('#monstruo span').text())-1;
							$('#monstruo span').text(monstruo);
							var heroe = parseInt($('#heroe span').text())-1;
							$('#heroe span').text(heroe);
							$('.output').prepend( "<li class='good slow'>BIEN "+rand1+" * "+rand2+" = <span class='big'>"+rand1*rand2+"</span> - "+countNum+"seg. </li>" );
						}

						if (countNum<time){
							var monstruo = parseInt($('#monstruo span').text())-3;
							$('#monstruo span').text(monstruo);
							$('.output').prepend( "<li class='good'>GENIAL "+rand1+" * "+rand2+" = <span class='big'>"+rand1*rand2+"</span> - "+countNum+"seg. </li>" );
						}
						var old1 = rand1;
						var old2 = rand2;
						while (rand1==old1 && rand2==old2){
							rand1 = Math.floor((Math.random() * max) + 1);
							rand2 = Math.floor((Math.random() * max) + 1);
							if (rand1<min){
								rand1 = min+1;
							}
							if (rand2<min){
								rand2 = min+1;
							}
						}
						$('#counter').text(0);
						
					}
				} else if(countNum>time){
					var heroe = parseInt($('#heroe span').text())-10;
					$('#heroe span').text(heroe);
					var insulto = ["BURRO", "¿EN SERIO?", "ME DAS VERGÜENZA", "AARGH", "PATÉTICO...", "¡ESTUDIA!", "QUÉ TRISTE", "¿ESTÁS ADIVINANDO?", "¿MUY DIFÍCIL?", "DESHONRAS A TU FAMILIA", "LO TUYO ES EL DEPORTE", "¿CUÁNTAS LOBOTOMÍAS LLEVAS?" ];
					$('.output').prepend("<li class='bad slow'>" + insulto[Math.floor((Math.random() * 12))] + "<br> " + rand1 + " * " + rand2 + " = <span class='big'>" + rand1 * rand2 +"</span> No es: "+result+"</li>" );
				} else {
					var heroe = parseInt($('#heroe span').text())-5;
					$('#heroe span').text(heroe);
					$('.output').prepend( "<li class='bad'>NO "+rand1+" * "+rand2+" = <span class='big'>"+rand1*rand2+"</span> - No es: "+result+"</li>" );
				}

				$('.a').val(rand1);
				$('.b').val(rand2);
				$('.result').val('');
			  	event.preventDefault();
			});
			counter();
		}

		Multiplicatron();


	});

})(jQuery, this);