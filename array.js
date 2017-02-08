var arr = [1, 2, 3];
//arr[3] ---- undefined
arr['s'] = NaN;
arr = {};
arr=[1, 2];
arr[10] = 0;
//arr.length = 11
//sparse array - не обязательно, чтобы в каждом элементе массива было значение

arr[-1] = NaN;
//это не сказывается на массиве
//arr.length can be changed, array will be cut
//использовалось для освобождения памяти, но не юзать

arr = [1, "xxx", function() {}, {}, []];
//в массиве могут лежать любые типы, но это плохо,
//в таком случае доступ к элементам нельзя получить за константное время, всё плохо
//массив нужно заполнять целиком, чтобы не было undefined, т.к. это уже другой тип

var arr = new Array(16);
//массив из 16 undefined
//стрёмный конструктор, используется редко
//лучше делать так: var arr = [1, 2, 3]

//Uint8Array - типизированный массив (беззнаковые целые числа)
//Uint8ClampedArray

//не обращаться с массивом, как с объектом (например, delete не использовать)

//v8 оптимизирует массив, если он состоит только из чисел, если добавляем что-то ещё, то возвращается к исходному

arr = [[], []]; 
//jagged arrays - массивы с рваным краем (подмассивы имеют разную длину)
//они тоже не оптимизируются, т.к. нельзя посчитать позицию каждого элемента

//типа дерево:
//[[], [[], [], {}], {}] LEFT = 0, RIGHT = 1, DATA = 2;
//5 + [] ---- "5" - приводит число к строке. так не делать!!!

Arra.of(1) ---- [1]
Array.of('a', 1) ---- ["a", 1]
// заменяется полифилом, не делать так

'abc'.split() // ---- ["abc"]
'abc'.split('') // ---- ["a", "b", "c"]

Object.keys(window);
Object.keys({a:0, b:1}); // -- ["a", "b"]
Object.keys([1,2,3,4,5]);
arr.wow = -1;
Object.keys(arr); // ---- ["0", ... , "wow"]

'aj8'.match(/\d/); // ----- ["8"]
var m = 'aj8'.match(/\d/)
m.index // 2 - позиция, на которой нашли соответствие регулярному выражению
m.input // "aj8" - строка, по которой искали

//mdn array - тут всё есть

[1,2,3,4].concat([5,6]); // ---- объединяет массивы
[2,3,1,4].sort() 
[200,3,1000,4].sort() //sort приводит элементы к строке и сортирует в лексикографическом порядке
[200,3,1000,4].sort(function(first,second) { return first - second; }) //нужно передавать компаратор
[200,3,1000,4].sort(function() { return Math.random()*2 - 1;});

var arr = [2,3,1,4];
arr.sort(); //меняет исходный массив
//concat не меняет

//shuffle 


//mutable & immutable
//лучше не менять исходные данные, но страдает производительность
// https://facebook.github.io/immutable-js/

//arguments

function f() {
	return [].concat(Array.from(arguments));
}

document.querySelectorAll("*").concat; //ничего не получим
//Array.from(...);
function f() {return [].slice.call(arguments).concat(5); }

// Array.prototype <=> []
// во втором случае создаётся массив, а в первом нет

//[].reverse.call("cellar door"); - doesn't work
//'cellar door'.split('').reverse().join('') - works
//reverse изменяет исходный массив

//Array.isArray([]) - чтобы отличить массив от не массива
[] instanceof Array //true
f() instanceof Array //false

var iframe = document.createelement('iframe');
document.body.appendChild(iframe);
console.log(iframe);
console.log([] instanceof iframe.contentWindow.Array); //true
console.log([] instanceof window.Array); //false
//лучше использовать Array.isArray, а не instanceof

[1,2,3,4].join();
[1,2,3,4].toString();
var o = { 0:1, 1:2 };
o.toString() // "[object Object]"

function f() {
	return arguments;
}

f();

function f() {
	return [].join.call(arguments);
}

function f() {
	return [].toString.call(arguments);
} // "[object Arguments]"

//toString реализован не через join

//slice использует length и доступ по индексам
//без длины не работает!!

//итератор, генератор

//push, pop methods

arr.push(5);
arr.unshift(0); //del from end
arr.pop();
arr.shift(); //del from head

//очередь на массиве лучше не делать
//стек можно

[1,2,3,4].forEach(function(item, index, array) {
	console.log(item, index, array);
});

var arr = [1,2,3];
arr.map (function(item) {return -item;})
.forEach(function(item){console.log(item);});

//в forEach есть замыкания
//индексы будут такие, как надо


//lodash

var arr = [1,2,3,4,5];
arr.every(function(item) { return item > 0; })
//true (все элементы удовлетворяют условию)
var arr = [1,2,3,-4,5];
arr.every(function(item) { return item > 0; })
//false (прерывается, когда находит false)

var arr = [1,2,3,4,5];
arr.some(function(item) { return item < 0; })
//false (прерывается, когда находит true)

//писать код так, чтобы break был не нужен

//reduce

//map через reduce
arr.reduce((res,v) => res.concat([-v]),[]);


//[[1,2], [1,2,3]] to [1,2,1,2,3]

arr.reduce((a,b) => concat(b));

arr.reduce(function(p,c) { return p.concat(c)},[]);


//indexOf
//findIndex
//Number.isNaN

['10', '10', '10', '10'].map(parseInt.bind(null,10));

_.map(['10', '10', '10', '10'], _.partialRight(parseInt, 10))
['10', '10', '10', '10'].map(_.partial(parseInt, _, 10))

_.partial(parseInt, 10)(2)