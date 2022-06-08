'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObject = function (e) {
    return e !== null && typeof e === 'object';
};

var publicPropertiesMap = {
    $el: function (i) { return i.vnode.el; },
};
var PublicInstanceProxyHandles = {
    get: function (_a, key) {
        var instance = _a._;
        var setupState = instance.setupState;
        if (key in setupState) {
            return setupState[key];
        }
        var publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    },
};

function createComponentInstance(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type,
        setupState: {},
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
    // ctx
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandles);
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
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    console.log(instance, "e");
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
    var el = (vnode.el = document.createElement(vnode.type));
    var children = vnode.children, props = vnode.props;
    if (typeof children === "string") {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        mountChildren(vnode, el);
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
    console.log(instance, "instance");
    setUpComponent(instance);
    setupRenderEffect(instance, vnode, container);
}
function setupRenderEffect(instance, vnode, container) {
    var proxy = instance.proxy;
    var subTree = instance.render.call(proxy);
    // vnode -> element -> mountElement
    patch(subTree, container);
    // 所有element mount
    vnode.el = subTree.el;
}

function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children,
        el: null
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
