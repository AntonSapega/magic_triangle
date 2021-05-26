//*************************************ATTENTION!!!
//*************************************IF YOU WILL WANT TO READ THIS CODE, PLEASE DON'T TRY THIS.
//*************************************THIS CODE MUST BE WRITE AGAIN WITH HELP BEST PRACTICE IN PROGRAMMING TECHNOLOGY...
//*************************************THIS CODE WILL WAIT BIG REFACTORING.


let pointA;
let pointB;
let pointC;
let i = 0; //quantity iteration
let triangleCoordinate;
let X; //координаты точек
let Y;
let valueCoordinateX = []; //координаты вершин треугольников (значения без рх)
let valueCoordinateY = [];
let speed = 400;
let timerId;

function random(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}


addEventListener('DOMContentLoaded', () => {

	let info = sessionStorage.getItem('wasShow');
	console.log(info);

	// sessionStorage.setItem('wasShow', 1);

		function showModal() {
			$('#exampleModalLong').modal('show');
			sessionStorage.setItem('wasShow', true);
	}

	if (info === null) {
		setTimeout(showModal, 1500);
	} else {
		console.log(`LocalStorage work`);
	
	}


	const representation = document.querySelector('.representation');
	const triangle = document.getElementById('triangle');
	const clear = document.getElementById('clear');
	const randomDot = document.getElementById('randomDot');
	const start = document.getElementById('start');
	const stop = document.getElementById('stop');
	const iteration = document.getElementById('iteration');
	const slow = document.getElementById('slow');
	const average = document.getElementById('average');
	const fast = document.getElementById('fast');



	triangle.addEventListener('click', () => {
		triangle.style.backgroundColor = 'rgb(100, 95, 95)';
		representation.addEventListener('mousedown', firstClick);
	});

	function firstClick(event) {
		pointA = [`${event.pageX}px`, `${event.pageY}px`];

		console.log(`pointA: ${pointA}`);
		console.log(`pointB: ${pointB}`);
		console.log(`pointC: ${pointC}`);

		let dot = document.createElement('div');
		dot.classList.add('pointA');
		dot.style.left = `${pointA[0]}`;
		dot.style.top = `${pointA[1]}`;
		representation.appendChild(dot);
		representation.removeEventListener('mousedown', firstClick);
		console.log('user create pointA');


		representation.addEventListener('mousedown', secondClick);

		function secondClick(event) {
			pointB = [`${event.pageX}px`, `${event.pageY}px`];

			console.log(`pointA: ${pointA}`);
			console.log(`pointB: ${pointB}`);
			console.log(`pointC: ${pointC}`);

			let dot = document.createElement('div');
			dot.classList.add('pointB');
			dot.style.left = `${pointB[0]}`;
			dot.style.top = `${pointB[1]}`;
			representation.appendChild(dot);
			representation.removeEventListener('mousedown', secondClick);
			console.log("user create pointB");



			representation.addEventListener('mousedown', thirdClick);

			function thirdClick(event) {
				pointC = [`${event.pageX}px`, `${event.pageY}px`];

				console.log(`pointA: ${pointA}`);
				console.log(`pointB: ${pointB}`);
				console.log(`pointC: ${pointC}`);

				let dot = document.createElement('div');
				dot.classList.add('pointC');
				dot.style.left = `${pointC[0]}`;
				dot.style.top = `${pointC[1]}`;
				representation.appendChild(dot);
				triangle.style.backgroundColor = 'rgb(126, 119, 119)';
				representation.removeEventListener('mousedown', thirdClick);
			}

		}

	}

	clear.addEventListener('click', () => {
		representation.innerHTML = `<div class="bootstrapStyle">
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
			What happened?
		</button>
	</div>`
		pointA = undefined;
		pointB = undefined;
		pointC = undefined;
		valueCoordinateX = []; //обнулим массив (вновь объявим его пустым)
		valueCoordinateY = [];
		clearTimeout(timerId);
		i = 0;
		iteration.innerHTML = `${i}`;
	});


	randomDot.addEventListener('click', () => { // create random dot, when user click button

		if (pointA !== undefined) { // this is check that triangle do not create (проверка того что треугольник не создан, чтобы вдруг не создалась рандомная стартовая точка)

			let dot = document.createElement('div');
			dot.classList.add('point');

			const triangleArea = coordinateCalc(); //макс значения координат прямоугольника описанного вокруг треукольника
			console.log(`This is triangleArea: ${triangleArea}`);
			console.log(typeof triangleArea[0]);
			console.log(typeof triangleArea[1]);

			X = random(450, triangleArea[0]); // !!!!!!!!! СДЕЛАЙ ДИНАМИЧЕСКИ ИЗМЕНЯЕМУЮ ШИРИНУ ГЛАВНЫХ БЛОКОВ 
			Y = random(0, triangleArea[1]);

			console.log('random x' + X);
			console.log('random y' + Y);

			function coordinateCalc() {
				let coordinateX = '';
				let coordinateY = '';

				coordinateX += pointA[0];
				coordinateX += pointB[0];
				coordinateX += pointC[0];

				coordinateY += pointA[1];
				coordinateY += pointB[1];
				coordinateY += pointC[1];

				const parseCoordinateX = coordinateX.split('px');
				const parseCoordinateY = coordinateY.split('px');

				console.log(parseCoordinateX);

				for (const value of parseCoordinateX) {
					if (value !== '') {
						const valueInNumber = parseInt(value, 10);
						valueCoordinateX.push(valueInNumber);
						console.log(typeof valueCoordinateX);
					}
				}

				for (const value of parseCoordinateY) {
					if (value !== '') {
						const valueInNumber = parseInt(value, 10);
						valueCoordinateY.push(valueInNumber);
					}
				}

				console.log(`valueCoordinateX: ${valueCoordinateX}`);
				console.log(`valueCoordinateY: ${valueCoordinateY}`);


				const coordinateMax = [maxCoordinate(valueCoordinateX), maxCoordinate(valueCoordinateY)];
				console.log(`max coordinates ${coordinateMax}`);

				return coordinateMax;
			}

			function maxCoordinate(coordinate) {
				let maxValue = 0;

				for (let i = coordinate.length; i !== -1; i--) {
					if (maxValue < coordinate[i]) {
						maxValue = coordinate[i];
					}
				}
				return maxValue;
			}

			dot.style.left = `${X}px`;
			dot.style.top = `${Y}px`;
			representation.appendChild(dot);

		}

	});


	start.addEventListener('click', () => {
		createDot();

		stop.addEventListener('click', () => {
			clearTimeout(timerId);
		})

		function createDot() {
			let lastDot = document.querySelector('.representation div:last-child');
			lastDot.classList.add('currentPointWithoutText'); // change style dot, do it whithout text

			let dot = document.createElement('div');
			dot.classList.add('currentPoint');
			let chooseTriangleTop = random(1, 3);

			if (chooseTriangleTop === 1) {
				const newX = (X + valueCoordinateX[0]) / 2;
				const newY = (Y + valueCoordinateY[0]) / 2;
				dot.style.left = `${newX}px`; // do refactoring (create new function)
				dot.style.top = `${newY}px`;
				representation.appendChild(dot);
				X = newX;
				Y = newY;
				i++;
				iteration.innerHTML = `${i}`;
			}

			if (chooseTriangleTop === 2) {
				const newX = (X + valueCoordinateX[1]) / 2;
				const newY = (Y + valueCoordinateY[1]) / 2;
				dot.style.left = `${newX}px`;
				dot.style.top = `${newY}px`;
				representation.appendChild(dot);
				X = newX;
				Y = newY;
				i++;
				iteration.innerHTML = `${i}`;
			}

			if (chooseTriangleTop === 3) {
				const newX = (X + valueCoordinateX[2]) / 2;
				const newY = (Y + valueCoordinateY[2]) / 2;
				dot.style.left = `${newX}px`;
				dot.style.top = `${newY}px`;
				representation.appendChild(dot);
				X = newX;
				Y = newY;
				i++;
				iteration.innerHTML = `${i}`;
			}

			timerId = setTimeout(createDot, speed);
		}

	});


	slow.style.backgroundColor = 'rgb(100, 95, 95)';

	slow.addEventListener('click', () => {
		speed = 400;
		slow.style.backgroundColor = 'rgb(100, 95, 95)';
		average.style.backgroundColor = 'rgb(126, 119, 119)';
		fast.style.backgroundColor = 'rgb(126, 119, 119)';
	});

	average.addEventListener('click', () => {
		speed = 200;
		average.style.backgroundColor = 'rgb(100, 95, 95)';
		slow.style.backgroundColor = 'rgb(126, 119, 119)';
		fast.style.backgroundColor = 'rgb(126, 119, 119)';
	});

	fast.addEventListener('click', () => {
		speed = 60;
		fast.style.backgroundColor = 'rgb(100, 95, 95)';
		slow.style.backgroundColor = 'rgb(126, 119, 119)';
		average.style.backgroundColor = 'rgb(126, 119, 119)';
	});

});

