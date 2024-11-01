var Vue = (function (exports) {
    'use strict';

    function effect(fn) {
        const _effect = new ReactiveEffect(fn);
        _effect.run();
    }
    class ReactiveEffect {
        constructor(fn) {
            this.fn = fn;
        }
        run() {
            return this.fn();
        }
    }
    /**
     * 收集依赖
     * @param target
     * @param key
     */
    function track(target, key) {
        console.log('收集依赖');
    }
    /**
     * 触发依赖
     * @param target
     * @param key
     * @param newValue
     */
    function trigger(target, key, newValue) {
        console.log('触发依赖');
    }

    const get = createGetter();
    function createGetter() {
        return function get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
            // 依赖收集
            track();
            return res;
        };
    }
    const set = createSetter();
    function createSetter() {
        return function set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            // 触发依赖
            trigger();
            return result;
        };
    }
    const mutableHandlers = {
        get,
        set
    };

    const reactiveMap = new WeakMap();
    function reactive(target) {
        return createReactiveObject(target, mutableHandlers, reactiveMap);
    }
    function createReactiveObject(target, baseHandlers, proxyMap) {
        const existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        const proxy = new Proxy(target, baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }

    exports.effect = effect;
    exports.reactive = reactive;

    return exports;

})({});
//# sourceMappingURL=vue.js.map
