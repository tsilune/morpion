var tourDuJoueur1 = true;
var partieGagnee = false;
var cells = document.querySelectorAll('.cell');
var nbVictoireJ1 = 0;
var nbVictoireJ2 = 0

var nomJoueur1 = prompt("Nom du joueur 1");
var nomJoueur2 = prompt("Nom du joueur 2");

document.getElementById('nom').innerHTML = nomJoueur1;

document.getElementById('j1').innerHTML = nomJoueur1;
document.getElementById('j2').innerHTML = nomJoueur2;

document.getElementById('new').onclick = function() {
	var continuer = confirm("Voulez-vous recommencer ?");
	if (continuer === false) {
		continuer.close();
	} else {
		window.location.assign("index.html");
	}
};

var afficherSymbole = function(cell) {
	// 1 - verifier case remplie ou pas
	if (cell.classList[1] !== 'renoi' && cell.classList[1] !== 'baby') {
		// 2 - poser symbole J1 ou j2
		if (tourDuJoueur1) {
			cell.classList.add('renoi');
			document.getElementById('nom').innerHTML = nomJoueur2;
		} else {
			cell.classList.add('baby');
			document.getElementById('nom').innerHTML = nomJoueur1;
		}
		// 4 - changer le joueur courant
		tourDuJoueur1 = !tourDuJoueur1;
	}
};

var combinaisons = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

var verifierCombinaisons = function() {
	// a remplir
	// 3 - check combinaison gagnante
	combinaisons.forEach(function(combinaison) {
		if (
			cells[combinaison[0]].classList[1] === cells[combinaison[1]].classList[1] &&
			cells[combinaison[1]].classList[1] === cells[combinaison[2]].classList[1] &&
			(cells[combinaison[0]].classList[1] === 'renoi' ||
				cells[combinaison[0]].classList[1] === 'baby')
		) {
			var currentPlayer;
			if (tourDuJoueur1) {
				currentPlayer = nomJoueur2;
				nbVictoireJ2 = nbVictoireJ2 + 1;
				document.getElementById('score2').innerHTML = nbVictoireJ2;
			} else {
				currentPlayer = nomJoueur1;
				nbVictoireJ1 = nbVictoireJ1 + 1;
				document.getElementById('score1').innerHTML = nbVictoireJ1;
			}
			partieGagnee = true;
			document.getElementById("background").style.display = "block";
			document.getElementById('winnerMsg').innerHTML = 'Bravo ' + currentPlayer + ' ! <br> Press [space] to restart';
		} else {
			var rempli = true;
			for (var i = 0; i < cells.length; i++) {
				if (cells[i].classList[1] === undefined) {
					rempli = false;
				}
				if (rempli) {
					restart();
				}

			};
		}
	});
};

document.body.addEventListener('keypress', function(e) {
	if (e.code === 'Space') {
		restart();
		lancement();
	};
});

var restart = function() {
	var y = document.getElementsByClassName("cell");
	var x;
	for (x = 0; x < y.length; x++) {
		y[x].classList.remove("renoi", "baby");
		document.getElementById('winnerMsg').innerHTML = '';
		partieGagnee = false;
		document.getElementById("background").style.display = "none";
	};
};

var lancement = function() {
	cells.forEach(function(cell) {
		cell.addEventListener('click', function() {
			if (!partieGagnee) {
				afficherSymbole(cell);
				verifierCombinaisons();
			}
		});
	});
};

lancement();