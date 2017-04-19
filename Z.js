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
        for (var i; i < arguments.length; i++) {
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
    function getElementsByClassName(classname, tag, parent) {
        parent = parent || document;
        if (!(parent = $(parent))) { return false };
        //查找所有匹配的标签
        var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementByTagName(tag);
        var matchingElements = new Array();
        //创建一个正则表达式，检测classname是否正确
        classname = classname.replace(/\-/g, "\\-*");
        var regex = new RegExp("(^|\\s)" + classname + "(\\s|$)");
        var element;
        //检查每个元素
        for (var i = 0; i < allTags.length; i++) {
            element = allTags[i];
            if (regex.test(element.classname)) {
                matchingElements.push(element);
            }
        }
        //返回任何匹配得到元素
        return matchingElements;
    };
    window['Z']['getElementsByClassName'] = getElementsByClassName;
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
            node.referenceNode.nextSibling
        );
    };
    window['Z']['insertAfter'] = insertAfter;
    function removeChildren(parent) {
        if (!(parent = $(parent))) { return false };
        //存在子节点时删除子节点
        while (parent.firstChild) {
            parent.firstChild.parentNode.removeChildren(parent.firstChild);
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
})();