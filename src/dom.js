window.dom = {
	// 新增
	create(string) {
		const container = document.createElement('template')
		container.innerHTML = string.trim()
		return container.content.firstChild
	},
	body(element) {
		document.body.appendChild(element)
	},
	before(node, node2) {
		node2.parentNode.insertBefore(node, node2)
	},
	after(node, node2) {
		node2.parentNode.insertBefore(node, node2.nextSibling)
	},
	append(node, node2) {
		node2.appendChild(node)
	},
	wrap(node, node2) {
		dom.before(node, node2)
		// 如果本来就是父子关系，互换之前先设置为平级关系。
		dom.append(node2, node)
	},
	// 删除
	remove(node) {
		node.remove()
		return node
	},
	empty(node) {
		const array = []
		let x = node.firstChild
		while (x) {
			array.push(node.firstChild)
			dom.remove(node.firstChild)
			x = node.firstChild
		}
		return array
	},
	// 修改
	attr(node, name, value) {
		if (arguments.length === 2) {
			return node.getAttribute(name)
		} else if (arguments.length === 3) {
			node.setAttribute(name, value)
		}
	},
	text(node, string) {
		if (arguments.length === 1) {
			if ('innerText' in node) {
				return node.innerText
			} else {
				return node.testContent
			}
		} else if (arguments.length === 2) {
			if ('innerText' in node) {
				node.innerText = string
			} else {
				node.testContent = string
			}
		}
	},
	html(node, string) {
		if (arguments.length === 1) {
			return node.innerHTML
		} else if (arguments.length === 2) {
			node.innerHTML = string
		}
	},
	style(node, name, value) {
		if (arguments.length === 3) {
			node.style[name] = value
		} else if (arguments.length === 2) {
			if (typeof name === 'string') {
				return node.style[name] // 字符串，查看
			} else if (name instanceof Object) {
				const object = name
				for (let key in object) {
					node.style[key] = object[key] // 对象，修改
				}
			}
		}
	},
	class: {
		// 类
		add(node, className) {
			node.classList.add(className)
		},
		remove(node, className) {
			node.classList.remove(className)
		},
		has(node, className) {
			return node.classList.contains(className) // 判断className是否存在，true or false。
		},
	},
	on(node, eventName, fn) {
		node.addEventListener(eventName, fn)
	},
	off(node, eventName, fn) {
		node.removeEventListener(eventName, fn)
	},
	// 查找
	find(selector, node) {
		return (node || document).querySelectorAll(selector)
	},
	parent(node) {
		return node.parentNode
	},
	children(node) {
		return node.children
	},
	sibling(node) {
		return Array.from(node.parentNode.children).filter((n) => n !== node) // 过滤器
	},
	previous(node) {
		let x = node.previousSibling
		while (x && x.nodeType === 3) {
			x = x.previousSibling
		}
		return x
	},
	next(node) {
		let x = node.nextSibling
		while (x && x.nodeType === 3) {
			// 短路逻辑
			x = x.nextSibling
		}
		return x
	},
	each(node, fn) {
		if (node.children) {
			// 遍历
			for (let i = 0; i < node.children.length; i++) {
				fn.call(null, node.children[i]) // 坚持使用call方法
			}
		}
	},
	index(node) {
		list = dom.children(node.parentNode)
		let i
		for (i = 0; i < list.length; i++) {
			if (list[i] === node) {
				break
			}
		}
		return i
	},
}
