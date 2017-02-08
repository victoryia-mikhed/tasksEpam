function Node(value) {
    this.data = value;
    this.next = null;
    this.prev = null;
}

function List() {
    this._length = 0;
    this._head = null;
    this._tail = null;
}

List.prototype.head = function() {
	return this._head;
}

List.prototype.tail = function() {
	return this._tail;
}

List.prototype.append = function(data) {
	var node = new Node(data);
	if (this._length === 0) {
		this._head = node;
		this._tail = node;
		this._length += 1;
	}
	else {
		this._tail.next = node;
		node.prev = this._tail;
		this._tail = node;
		this._length +=1;
	}
	return this;
}

List.prototype.at = function(index) {
	if ( (index > -1) && (index < this._length ) && (this._length > 0) ) {
		var current = this._head;
		for(var i = 0; i < index; i++) {
			current = current.next;
		}
		return current;
	}
	else {
		throw new Error("Incorrect index.");
	}
}

List.prototype.insertAt = function(index, data) {
	var node = new Node(data);

	if ( (index > -1) && (index < this._length + 1) ) {

		// insertion into empty list
		if (this._length === 0) {
			this.append(data);
			return this;
		}

		// insertion into _head
		if (index === 0) {
			this._head.prev = node;
			node.next = this._head;
			this._head = node;
			this._length += 1;
			return this;
		}

		// insertion into _tail
		if (index === this._length) {
			this._tail.next = node;
			node.prev = this._tail;
			this._tail = node;
			this._length += 1;
			return this;
		}


		var current = this._head;
		for (var i = 0; i < index-1; i++) {
			current = current.next;
		}

		node.prev = current;
		node.next = current.next;
		current.next.prev = node;
		current.next = node;

		this._length += 1;

		return this;
	}
	else {
		throw new Error("Incorrect index.");
	}
	return this;
}

List.prototype.deleteAt = function(index) {

	if ( (index > -1) && (index < this._length) && (this._length > 0) ) {

		// deletion of the only element in list
		if (this._length === 1) {
			this._length = 0;
			this._head = null;
			this._tail = null;
			return this;
		}

		// deletion of _head
		if (index === 0) {
			this._head = this._head.next;
			this._head.prev = null;
			this._length -= 1;
			return this;
		}

		// deletion of _tail
		if (index === this._length -1) {
			this._tail = this._tail.prev;
			this._tail.next = null;
			this._length -= 1;
			return this;
		}

		var current = this._head;
		for (var i = 0; i < index-1; i++) {
			current = current.next;
		}

		current.next = current.next.next;
		current.next.prev = current;

		this._length -= 1;

		return this;
	}
	else {
		throw new Error("Incorrect index.");
	}
	return this;
}

List.prototype.reverse = function() {
	var current = this._head;
	var temp;

	this._tail = this._head;

	while (current) {
		temp = current.next;
		current.next = current.prev;
		current.prev = temp;

		if (!temp) {
			this._head = current;
		}

		current = temp;
	}
	return this;
}

List.prototype.each = function(func) {
	for (var i = 0; i < list._length; i++) {
		func(this.at(i));
	}
}

List.prototype.indexOf = function(data) {
	for (var i = 0; i < this._length; i++) {
		if (this.at(i).data === data) {
			return i;
		}
	}
	return -1;
}

List.prototype.clear = function() {
	this._length = 0;
	this._head = null;
	this._tail = null;
	return this;
}