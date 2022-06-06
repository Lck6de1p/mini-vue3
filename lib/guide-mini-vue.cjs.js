'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObject = function (e) {
    return e !== null && typeof e === 'object';
};

function createComponentInstance(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type
    };
    return component;
}
function setUpComponent(instance) {
    // initProps();
    // initSlots();
    setupStateForComponent(instance);
}
function setupStateForComponent(instance) {
    var Component = instance.type;
    var setup = Component.setup;
    if (setup) {
        // function object
        var setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // function object
    // TODO function
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    console.log(instance, 'e');
    finishComponentsSetUp(instance);
}
function finishComponentsSetUp(instance) {
    var Component = instance.type;
    instance.render = Component.render;
}

function render(vnode, container) {
    // 调用patch方法
    // 方便后续递归
    patch(vnode, container);
}
function patch(vnode, container) {
    if (isObject(vnode.type)) {
        // 处理组件
        processComponent(vnode, container);
    }
    else {
        // 处理element
        processElement(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    var el = document.createElement(vnode.type);
    var children = vnode.children, props = vnode.props;
    if (typeof children === 'string') {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        mountChildren(vnode, container);
    }
    // props
    for (var key in props) {
        var val = props[key];
        el.setAttribute(key, val);
    }
    container.append(el);
}
function mountChildren(vnode, container) {
    vnode.children.forEach(function (v) {
        patch(v, container);
    });
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    var instance = createComponentInstance(vnode);
    console.log(instance, 'instance');
    setUpComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    var subTree = instance.render();
    // vnode -> element -> mountElement
    patch(subTree, container);
}

function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount: function (rootContainer) {
            // 先转化为vnode
            // 逻辑操作基于vnode处理
            var vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
