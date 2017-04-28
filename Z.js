(function () {
    //检测命名空间
    if (!window.Z) {
        window['Z'] = {};
    }
    function isCompatible(other) {
        //进行能力检测
        if (other === false
            || !Array.prototype.push
            || !Object.hasOwnProperty
            || !document.createElement
            || !document.getElementsByTagName
            ) {
            return false;
    }
    return true;
    };
    window['Z']['isCompatible'] = isCompatible;
    function $() {
    var elements = new Array();
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length == 1) {
            return element;
        }
        elements.push(element);
    }
    return elements
    };
    window['Z']['$'] = $;
    function addEvent(node, type, listener) {
        //检查兼容性保证平稳退化
        if (!isCompatible()) { return false };
        if (!(node = $(node))) { return false };
        if (node.addEventListener) {
            node.addEventListener(type, listener, false);
            return true;
        } else if (node.attachEvent) {
            //MSIE的方法
            node['e' + type + listener] = listener;
            node[type + listener] = function () {
                node['e' + type + listener](window.event);
            }
            node.attachEvent('on' + type, node[type + listener]);
            return true
        }
        //两种方法都不存在则返回false
        return false;
    };
    window['Z']['addEvent'] = addEvent;
    function removeEvent(node, type, listener) {
        if (!(node = $(node))) { return false };
        if (node.removeEventListener) {
            node.removeEventListener(type, listener, false);
            return true;
        } else if (node.detachEvent) {
            node.detachEvent('on' + type, node[type + listener]);
            node[type + listener] = null;
            return true;
        }
        //两种方法都不存在则返回false
        return false;
    };
    window['Z']['removeEvent'] = removeEvent;
    function toggleDisplay(node, value) {
        if (!(node = $(node))) { return false };
        if (node.style.display != 'none') {
            node.style.display = 'none';
        } else {
            node.style.display = value || '';
        }
        return true;
    };
    window['Z']['toggleDisplay'] = toggleDisplay;
    function insertAfter(node, referenceNode) {
        if (!(node = $(node))) { return false };
        if (!(referenceNode = $(referenceNode))) { return false };
        return referenceNode.parentNode.insertBefore(
            node, referenceNode.nextSibling
            );
    };
    window['Z']['insertAfter'] = insertAfter;
    function removeChildren(parent) {
        if (!(parent = $(parent))) { return false };
        //存在子节点时删除子节点
        while (parent.firstChild) {
            parent.firstChild.parentNode.removeChild(parent.firstChild);
        }
        //再返回父元素，以便实现链式调用
        return parent;
    };
    window['Z']['removeChildren'] = removeChildren;
    function prependChild(parent, newChild) {
        if (!(parent = $(parent))) { return false };
        if (!(newChild = $(newChild))) { return false };
        if (parent.firstChild) {
            //如果存在子节点。就在这个子节点之前插入
            parent.insertBefore(newChild, parent.firstChild);
        } else {
            //没有子节点则直接添加
            parent.appendChild(newChild);
        }
        //再返回父元素，实现方法连缀
        return parent;
    };
    window['Z']['prependChild'] = prependChild;
    function bindFunction(obj, func) {
        return function () {
            func.apply(obj, arguments)
        }
    }
    window['Z']['bindFunction'] = bindFunction;
    function getEventObject(e) {
        return e || window.event;
    }
    window['Z']['getEventObject'] = getEventObject;
    function getTarget(eventObject) {
        eventObject = eventObject || getEventObject(eventObject);
        //如果是W3C或IE的模型
        var target = eventObject.target || eventObject.srcElement;
        //如果是SAFARI中的文本节点
        if (target.nodeType == 1) {
            target = node.parentNode;
        }
        return target;
    }
    window['Z']['getTarget'] = getTarget;
    function getKeyPressed(eventObject) {
        eventObject = eventObject || getEventObject(eventObject);
        var code = eventObject.KeyCode;
        var value = String.fromCharCode(code);
        return { 'code': code, 'value': value };
    }
    window['Z']['getKeyPressed'] = getKeyPressed;
    function getClass(element) {
        if (!(element = $(element))){ return false }
            return element.className.replace(/\s+/, '').split(' ');
    }
    window['Z']['getClass'] = getClass;
    function hasClassName(element, classname) {
        if (!(element = $(element))) { return false }
            var classes = getClass(element);
        for (var i; i < classes.length; i++) {
            if (classname === classes[i]) {
                return true
            }
            return false
        }
    }
    window['Z']['hasClassName'] = hasClassName;
    function addClass(element,classname){
        if(!(element=$(element))){return false}
            element.className+=(element.className?' ':'')+classname;
        return element;
    }
    window['Z']['addClass']=addClass;
    function removeClass(element,classname){
     if(!(element=$(element))){return false}
         var classes=getClass(element);
     var length=classes.length;
     for(var i=length-1;i>=0;i--){
        if(classes[i]===classname){delete(classes[i])}
    }
    element.className=classes.join(' ');
    return element;
    }
    window['Z']['removeClass']=removeClass;
})();