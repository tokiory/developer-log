---
title: "Data Structures: Стек и очередь"
tags:
  - computer-science
  - note
date: 2024-02-29
---

# Стек
**Стек** - структура данных, которая действует по принципу LIFO (Last In, First Out: последний пришел, первый ушел)

::ContentDiagram{src="/posts/ds-stack-queue/cs-2-stack.excalidraw.svg"}
::

Стек можно реализовать на базе массива (там достаточно легкая реализация) или на базе связного списка:

```typescript [stack.ts]
class Stack<T> {
	list: Array<T>
	constructor(array: T[] = []) {
		this.list = array;
	}

	private getLastIndex(): number {
		return this.list.length - 1;
	}

	push(item: T) {
		list.push(item);
	}

	pop(): T | null {
		return list.pop();
	}

	peek(): T | null {
		return list.at(this.getLastIndex()) ?? null;
	}
}
```

По сути, все операции в стеке занимают $O(1)$, ибо вставка, удаление и просмотр последнего элемента не предусматривают перебор каких-либо элементов в зависимости от входных данных.

> Из-за реализации на основе массива (который должен быть ограничен в длине) — стек часто тоже ограничен в памяти.

# Очередь
**Очередь** - структура данных, которая действует по принципу FILO (First In, Last Out: первый пришел, последний ушел)

::ContentDiagram{src="/posts/ds-stack-queue/cs-2-queue.excalidraw.svg"}
::

```typescript [queue.ts]
class Queue<T> {
	list: Array<T>
	constructor(array: T[] = []) {
		this.list = array;
	}

	push(item: T) {
		list.push(item);
	}

	pop(): T | null {
		return list.shift();
	}

	peek(): T | null {
		return list.at(0) ?? null;
	}
}
```
