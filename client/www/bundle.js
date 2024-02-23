"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // ../node_modules/@microsoft/fast-element/dist/esm/interfaces.js
  var kernelMode;
  var kernelAttr = "fast-kernel";
  try {
    if (document.currentScript) {
      kernelMode = document.currentScript.getAttribute(kernelAttr);
    } else {
      const scripts = document.getElementsByTagName("script");
      const currentScript = scripts[scripts.length - 1];
      kernelMode = currentScript.getAttribute(kernelAttr);
    }
  } catch (e) {
    kernelMode = "isolate";
  }
  var KernelServiceId;
  switch (kernelMode) {
    case "share":
      KernelServiceId = Object.freeze({
        updateQueue: 1,
        observable: 2,
        contextEvent: 3,
        elementRegistry: 4
      });
      break;
    case "share-v2":
      KernelServiceId = Object.freeze({
        updateQueue: 1.2,
        observable: 2.2,
        contextEvent: 3.2,
        elementRegistry: 4.2
      });
      break;
    default:
      const postfix = `-${Math.random().toString(36).substring(2, 8)}`;
      KernelServiceId = Object.freeze({
        updateQueue: `1.2${postfix}`,
        observable: `2.2${postfix}`,
        contextEvent: `3.2${postfix}`,
        elementRegistry: `4.2${postfix}`
      });
      break;
  }
  var isFunction = (object) => typeof object === "function";
  var isString = (object) => typeof object === "string";
  var noop = () => void 0;

  // ../node_modules/@microsoft/fast-element/dist/esm/polyfills.js
  (function ensureGlobalThis() {
    if (typeof globalThis !== "undefined") {
      return;
    }
    if (typeof global !== "undefined") {
      global.globalThis = global;
    } else if (typeof self !== "undefined") {
      self.globalThis = self;
    } else if (typeof window !== "undefined") {
      window.globalThis = window;
    } else {
      const result = new Function("return this")();
      result.globalThis = result;
    }
  })();

  // ../node_modules/@microsoft/fast-element/dist/esm/platform.js
  var propConfig = {
    configurable: false,
    enumerable: false,
    writable: false
  };
  if (globalThis.FAST === void 0) {
    Reflect.defineProperty(globalThis, "FAST", Object.assign({ value: /* @__PURE__ */ Object.create(null) }, propConfig));
  }
  var FAST = globalThis.FAST;
  if (FAST.getById === void 0) {
    const storage = /* @__PURE__ */ Object.create(null);
    Reflect.defineProperty(FAST, "getById", Object.assign({ value(id3, initialize) {
      let found = storage[id3];
      if (found === void 0) {
        found = initialize ? storage[id3] = initialize() : null;
      }
      return found;
    } }, propConfig));
  }
  if (FAST.error === void 0) {
    Object.assign(FAST, {
      warn() {
      },
      error(code) {
        return new Error(`Error ${code}`);
      },
      addMessages() {
      }
    });
  }
  var emptyArray = Object.freeze([]);
  function createTypeRegistry() {
    const typeToDefinition = /* @__PURE__ */ new Map();
    return Object.freeze({
      register(definition) {
        if (typeToDefinition.has(definition.type)) {
          return false;
        }
        typeToDefinition.set(definition.type, definition);
        return true;
      },
      getByType(key) {
        return typeToDefinition.get(key);
      },
      getForInstance(object) {
        if (object === null || object === void 0) {
          return void 0;
        }
        return typeToDefinition.get(object.constructor);
      }
    });
  }
  function createMetadataLocator() {
    const metadataLookup = /* @__PURE__ */ new WeakMap();
    return function(target) {
      let metadata = metadataLookup.get(target);
      if (metadata === void 0) {
        let currentTarget = Reflect.getPrototypeOf(target);
        while (metadata === void 0 && currentTarget !== null) {
          metadata = metadataLookup.get(currentTarget);
          currentTarget = Reflect.getPrototypeOf(currentTarget);
        }
        metadata = metadata === void 0 ? [] : metadata.slice(0);
        metadataLookup.set(target, metadata);
      }
      return metadata;
    };
  }
  function makeSerializationNoop(type) {
    type.prototype.toJSON = noop;
  }

  // ../node_modules/@microsoft/fast-element/dist/esm/dom.js
  var DOMAspect = Object.freeze({
    /**
     * Not aspected.
     */
    none: 0,
    /**
     * An attribute.
     */
    attribute: 1,
    /**
     * A boolean attribute.
     */
    booleanAttribute: 2,
    /**
     * A property.
     */
    property: 3,
    /**
     * Content
     */
    content: 4,
    /**
     * A token list.
     */
    tokenList: 5,
    /**
     * An event.
     */
    event: 6
  });
  var createHTML = (html2) => html2;
  var fastTrustedType = globalThis.trustedTypes ? globalThis.trustedTypes.createPolicy("fast-html", { createHTML }) : { createHTML };
  var defaultPolicy = Object.freeze({
    createHTML(value) {
      return fastTrustedType.createHTML(value);
    },
    protect(tagName, aspect, aspectName, sink) {
      return sink;
    }
  });
  var fastPolicy = defaultPolicy;
  var DOM = Object.freeze({
    /**
     * Gets the dom policy used by the templating system.
     */
    get policy() {
      return defaultPolicy;
    },
    /**
     * Sets the dom policy used by the templating system.
     * @param policy - The policy to set.
     * @remarks
     * This API can only be called once, for security reasons. It should be
     * called by the application developer at the start of their program.
     */
    setPolicy(value) {
      if (defaultPolicy !== fastPolicy) {
        throw FAST.error(
          1201
          /* Message.onlySetDOMPolicyOnce */
        );
      }
      defaultPolicy = value;
    },
    /**
     * Sets an attribute value on an element.
     * @param element - The element to set the attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is `null` or `undefined`, the attribute is removed, otherwise
     * it is set to the provided value using the standard `setAttribute` API.
     */
    setAttribute(element, attributeName, value) {
      value === null || value === void 0 ? element.removeAttribute(attributeName) : element.setAttribute(attributeName, value);
    },
    /**
     * Sets a boolean attribute value.
     * @param element - The element to set the boolean attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is true, the attribute is added; otherwise it is removed.
     */
    setBooleanAttribute(element, attributeName, value) {
      value ? element.setAttribute(attributeName, "") : element.removeAttribute(attributeName);
    }
  });

  // ../node_modules/@microsoft/fast-element/dist/esm/observation/update-queue.js
  var Updates = FAST.getById(KernelServiceId.updateQueue, () => {
    const tasks = [];
    const pendingErrors = [];
    const rAF = globalThis.requestAnimationFrame;
    let updateAsync = true;
    function throwFirstError() {
      if (pendingErrors.length) {
        throw pendingErrors.shift();
      }
    }
    function tryRunTask(task) {
      try {
        task.call();
      } catch (error) {
        if (updateAsync) {
          pendingErrors.push(error);
          setTimeout(throwFirstError, 0);
        } else {
          tasks.length = 0;
          throw error;
        }
      }
    }
    function process() {
      const capacity = 1024;
      let index = 0;
      while (index < tasks.length) {
        tryRunTask(tasks[index]);
        index++;
        if (index > capacity) {
          for (let scan = 0, newLength = tasks.length - index; scan < newLength; scan++) {
            tasks[scan] = tasks[scan + index];
          }
          tasks.length -= index;
          index = 0;
        }
      }
      tasks.length = 0;
    }
    function enqueue(callable) {
      tasks.push(callable);
      if (tasks.length < 2) {
        updateAsync ? rAF(process) : process();
      }
    }
    return Object.freeze({
      enqueue,
      next: () => new Promise(enqueue),
      process,
      setMode: (isAsync) => updateAsync = isAsync
    });
  });

  // ../node_modules/@microsoft/fast-element/dist/esm/observation/notifier.js
  var SubscriberSet = class {
    /**
     * Creates an instance of SubscriberSet for the specified subject.
     * @param subject - The subject that subscribers will receive notifications from.
     * @param initialSubscriber - An initial subscriber to changes.
     */
    constructor(subject, initialSubscriber) {
      this.sub1 = void 0;
      this.sub2 = void 0;
      this.spillover = void 0;
      this.subject = subject;
      this.sub1 = initialSubscriber;
    }
    /**
     * Checks whether the provided subscriber has been added to this set.
     * @param subscriber - The subscriber to test for inclusion in this set.
     */
    has(subscriber) {
      return this.spillover === void 0 ? this.sub1 === subscriber || this.sub2 === subscriber : this.spillover.indexOf(subscriber) !== -1;
    }
    /**
     * Subscribes to notification of changes in an object's state.
     * @param subscriber - The object that is subscribing for change notification.
     */
    subscribe(subscriber) {
      const spillover = this.spillover;
      if (spillover === void 0) {
        if (this.has(subscriber)) {
          return;
        }
        if (this.sub1 === void 0) {
          this.sub1 = subscriber;
          return;
        }
        if (this.sub2 === void 0) {
          this.sub2 = subscriber;
          return;
        }
        this.spillover = [this.sub1, this.sub2, subscriber];
        this.sub1 = void 0;
        this.sub2 = void 0;
      } else {
        const index = spillover.indexOf(subscriber);
        if (index === -1) {
          spillover.push(subscriber);
        }
      }
    }
    /**
     * Unsubscribes from notification of changes in an object's state.
     * @param subscriber - The object that is unsubscribing from change notification.
     */
    unsubscribe(subscriber) {
      const spillover = this.spillover;
      if (spillover === void 0) {
        if (this.sub1 === subscriber) {
          this.sub1 = void 0;
        } else if (this.sub2 === subscriber) {
          this.sub2 = void 0;
        }
      } else {
        const index = spillover.indexOf(subscriber);
        if (index !== -1) {
          spillover.splice(index, 1);
        }
      }
    }
    /**
     * Notifies all subscribers.
     * @param args - Data passed along to subscribers during notification.
     */
    notify(args) {
      const spillover = this.spillover;
      const subject = this.subject;
      if (spillover === void 0) {
        const sub1 = this.sub1;
        const sub2 = this.sub2;
        if (sub1 !== void 0) {
          sub1.handleChange(subject, args);
        }
        if (sub2 !== void 0) {
          sub2.handleChange(subject, args);
        }
      } else {
        for (let i = 0, ii = spillover.length; i < ii; ++i) {
          spillover[i].handleChange(subject, args);
        }
      }
    }
  };
  var PropertyChangeNotifier = class {
    /**
     * Creates an instance of PropertyChangeNotifier for the specified subject.
     * @param subject - The object that subscribers will receive notifications for.
     */
    constructor(subject) {
      this.subscribers = {};
      this.subjectSubscribers = null;
      this.subject = subject;
    }
    /**
     * Notifies all subscribers, based on the specified property.
     * @param propertyName - The property name, passed along to subscribers during notification.
     */
    notify(propertyName) {
      var _a, _b;
      (_a = this.subscribers[propertyName]) === null || _a === void 0 ? void 0 : _a.notify(propertyName);
      (_b = this.subjectSubscribers) === null || _b === void 0 ? void 0 : _b.notify(propertyName);
    }
    /**
     * Subscribes to notification of changes in an object's state.
     * @param subscriber - The object that is subscribing for change notification.
     * @param propertyToWatch - The name of the property that the subscriber is interested in watching for changes.
     */
    subscribe(subscriber, propertyToWatch) {
      var _a, _b;
      let subscribers;
      if (propertyToWatch) {
        subscribers = (_a = this.subscribers[propertyToWatch]) !== null && _a !== void 0 ? _a : this.subscribers[propertyToWatch] = new SubscriberSet(this.subject);
      } else {
        subscribers = (_b = this.subjectSubscribers) !== null && _b !== void 0 ? _b : this.subjectSubscribers = new SubscriberSet(this.subject);
      }
      subscribers.subscribe(subscriber);
    }
    /**
     * Unsubscribes from notification of changes in an object's state.
     * @param subscriber - The object that is unsubscribing from change notification.
     * @param propertyToUnwatch - The name of the property that the subscriber is no longer interested in watching.
     */
    unsubscribe(subscriber, propertyToUnwatch) {
      var _a, _b;
      if (propertyToUnwatch) {
        (_a = this.subscribers[propertyToUnwatch]) === null || _a === void 0 ? void 0 : _a.unsubscribe(subscriber);
      } else {
        (_b = this.subjectSubscribers) === null || _b === void 0 ? void 0 : _b.unsubscribe(subscriber);
      }
    }
  };

  // ../node_modules/@microsoft/fast-element/dist/esm/observation/observable.js
  var SourceLifetime = Object.freeze({
    /**
     * The source to controller lifetime relationship is unknown.
     */
    unknown: void 0,
    /**
     * The source and controller lifetimes are coupled to one another.
     * They can/will be GC'd together.
     */
    coupled: 1
  });
  var Observable = FAST.getById(KernelServiceId.observable, () => {
    const queueUpdate = Updates.enqueue;
    const volatileRegex = /(:|&&|\|\||if|\?\.)/;
    const notifierLookup = /* @__PURE__ */ new WeakMap();
    let watcher = void 0;
    let createArrayObserver = (array) => {
      throw FAST.error(
        1101
        /* Message.needsArrayObservation */
      );
    };
    function getNotifier(source) {
      var _a;
      let found = (_a = source.$fastController) !== null && _a !== void 0 ? _a : notifierLookup.get(source);
      if (found === void 0) {
        Array.isArray(source) ? found = createArrayObserver(source) : notifierLookup.set(source, found = new PropertyChangeNotifier(source));
      }
      return found;
    }
    const getAccessors = createMetadataLocator();
    class DefaultObservableAccessor {
      constructor(name) {
        this.name = name;
        this.field = `_${name}`;
        this.callback = `${name}Changed`;
      }
      getValue(source) {
        if (watcher !== void 0) {
          watcher.watch(source, this.name);
        }
        return source[this.field];
      }
      setValue(source, newValue) {
        const field = this.field;
        const oldValue = source[field];
        if (oldValue !== newValue) {
          source[field] = newValue;
          const callback = source[this.callback];
          if (isFunction(callback)) {
            callback.call(source, oldValue, newValue);
          }
          getNotifier(source).notify(this.name);
        }
      }
    }
    class ExpressionNotifierImplementation extends SubscriberSet {
      constructor(expression, initialSubscriber, isVolatileBinding = false) {
        super(expression, initialSubscriber);
        this.expression = expression;
        this.isVolatileBinding = isVolatileBinding;
        this.needsRefresh = true;
        this.needsQueue = true;
        this.isAsync = true;
        this.first = this;
        this.last = null;
        this.propertySource = void 0;
        this.propertyName = void 0;
        this.notifier = void 0;
        this.next = void 0;
      }
      setMode(isAsync) {
        this.isAsync = this.needsQueue = isAsync;
      }
      bind(controller) {
        this.controller = controller;
        const value = this.observe(controller.source, controller.context);
        if (!controller.isBound && this.requiresUnbind(controller)) {
          controller.onUnbind(this);
        }
        return value;
      }
      requiresUnbind(controller) {
        return controller.sourceLifetime !== SourceLifetime.coupled || this.first !== this.last || this.first.propertySource !== controller.source;
      }
      unbind(controller) {
        this.dispose();
      }
      observe(source, context) {
        if (this.needsRefresh && this.last !== null) {
          this.dispose();
        }
        const previousWatcher = watcher;
        watcher = this.needsRefresh ? this : void 0;
        this.needsRefresh = this.isVolatileBinding;
        let result;
        try {
          result = this.expression(source, context);
        } finally {
          watcher = previousWatcher;
        }
        return result;
      }
      // backwards compat with v1 kernel
      disconnect() {
        this.dispose();
      }
      dispose() {
        if (this.last !== null) {
          let current = this.first;
          while (current !== void 0) {
            current.notifier.unsubscribe(this, current.propertyName);
            current = current.next;
          }
          this.last = null;
          this.needsRefresh = this.needsQueue = this.isAsync;
        }
      }
      watch(propertySource, propertyName) {
        const prev = this.last;
        const notifier = getNotifier(propertySource);
        const current = prev === null ? this.first : {};
        current.propertySource = propertySource;
        current.propertyName = propertyName;
        current.notifier = notifier;
        notifier.subscribe(this, propertyName);
        if (prev !== null) {
          if (!this.needsRefresh) {
            let prevValue;
            watcher = void 0;
            prevValue = prev.propertySource[prev.propertyName];
            watcher = this;
            if (propertySource === prevValue) {
              this.needsRefresh = true;
            }
          }
          prev.next = current;
        }
        this.last = current;
      }
      handleChange() {
        if (this.needsQueue) {
          this.needsQueue = false;
          queueUpdate(this);
        } else if (!this.isAsync) {
          this.call();
        }
      }
      call() {
        if (this.last !== null) {
          this.needsQueue = this.isAsync;
          this.notify(this);
        }
      }
      *records() {
        let next2 = this.first;
        while (next2 !== void 0) {
          yield next2;
          next2 = next2.next;
        }
      }
    }
    makeSerializationNoop(ExpressionNotifierImplementation);
    return Object.freeze({
      /**
       * @internal
       * @param factory - The factory used to create array observers.
       */
      setArrayObserverFactory(factory) {
        createArrayObserver = factory;
      },
      /**
       * Gets a notifier for an object or Array.
       * @param source - The object or Array to get the notifier for.
       */
      getNotifier,
      /**
       * Records a property change for a source object.
       * @param source - The object to record the change against.
       * @param propertyName - The property to track as changed.
       */
      track(source, propertyName) {
        watcher && watcher.watch(source, propertyName);
      },
      /**
       * Notifies watchers that the currently executing property getter or function is volatile
       * with respect to its observable dependencies.
       */
      trackVolatile() {
        watcher && (watcher.needsRefresh = true);
      },
      /**
       * Notifies subscribers of a source object of changes.
       * @param source - the object to notify of changes.
       * @param args - The change args to pass to subscribers.
       */
      notify(source, args) {
        getNotifier(source).notify(args);
      },
      /**
       * Defines an observable property on an object or prototype.
       * @param target - The target object to define the observable on.
       * @param nameOrAccessor - The name of the property to define as observable;
       * or a custom accessor that specifies the property name and accessor implementation.
       */
      defineProperty(target, nameOrAccessor) {
        if (isString(nameOrAccessor)) {
          nameOrAccessor = new DefaultObservableAccessor(nameOrAccessor);
        }
        getAccessors(target).push(nameOrAccessor);
        Reflect.defineProperty(target, nameOrAccessor.name, {
          enumerable: true,
          get() {
            return nameOrAccessor.getValue(this);
          },
          set(newValue) {
            nameOrAccessor.setValue(this, newValue);
          }
        });
      },
      /**
       * Finds all the observable accessors defined on the target,
       * including its prototype chain.
       * @param target - The target object to search for accessor on.
       */
      getAccessors,
      /**
       * Creates a {@link ExpressionNotifier} that can watch the
       * provided {@link Expression} for changes.
       * @param expression - The binding to observe.
       * @param initialSubscriber - An initial subscriber to changes in the binding value.
       * @param isVolatileBinding - Indicates whether the binding's dependency list must be re-evaluated on every value evaluation.
       */
      binding(expression, initialSubscriber, isVolatileBinding = this.isVolatileBinding(expression)) {
        return new ExpressionNotifierImplementation(expression, initialSubscriber, isVolatileBinding);
      },
      /**
       * Determines whether a binding expression is volatile and needs to have its dependency list re-evaluated
       * on every evaluation of the value.
       * @param expression - The binding to inspect.
       */
      isVolatileBinding(expression) {
        return volatileRegex.test(expression.toString());
      }
    });
  });
  function observable(target, nameOrAccessor) {
    Observable.defineProperty(target, nameOrAccessor);
  }
  var contextEvent = FAST.getById(KernelServiceId.contextEvent, () => {
    let current = null;
    return {
      get() {
        return current;
      },
      set(event) {
        current = event;
      }
    };
  });
  var ExecutionContext = Object.freeze({
    /**
     * A default execution context.
     */
    default: {
      index: 0,
      length: 0,
      get event() {
        return ExecutionContext.getEvent();
      },
      eventDetail() {
        return this.event.detail;
      },
      eventTarget() {
        return this.event.target;
      }
    },
    /**
     * Gets the current event.
     * @returns An event object.
     */
    getEvent() {
      return contextEvent.get();
    },
    /**
     * Sets the current event.
     * @param event - An event object.
     */
    setEvent(event) {
      contextEvent.set(event);
    }
  });

  // ../node_modules/@microsoft/fast-element/dist/esm/observation/arrays.js
  var Splice = class {
    /**
     * Creates a splice.
     * @param index - The index that the splice occurs at.
     * @param removed - The items that were removed.
     * @param addedCount - The  number of items that were added.
     */
    constructor(index, removed, addedCount) {
      this.index = index;
      this.removed = removed;
      this.addedCount = addedCount;
    }
    /**
     * Adjusts the splice index based on the provided array.
     * @param array - The array to adjust to.
     * @returns The same splice, mutated based on the reference array.
     */
    adjustTo(array) {
      let index = this.index;
      const arrayLength = array.length;
      if (index > arrayLength) {
        index = arrayLength - this.addedCount;
      } else if (index < 0) {
        index = arrayLength + this.removed.length + index - this.addedCount;
      }
      this.index = index < 0 ? 0 : index;
      return this;
    }
  };
  var SpliceStrategySupport = Object.freeze({
    /**
     * Only supports resets.
     */
    reset: 1,
    /**
     * Supports tracking splices and resets.
     */
    splice: 2,
    /**
     * Supports tracking splices and resets, while applying some form
     * of optimization, such as merging, to the splices.
     */
    optimized: 3
  });
  var reset = new Splice(0, emptyArray, 0);
  reset.reset = true;
  var resetSplices = [reset];
  function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    const rowCount = oldEnd - oldStart + 1;
    const columnCount = currentEnd - currentStart + 1;
    const distances = new Array(rowCount);
    let north;
    let west;
    for (let i = 0; i < rowCount; ++i) {
      distances[i] = new Array(columnCount);
      distances[i][0] = i;
    }
    for (let j = 0; j < columnCount; ++j) {
      distances[0][j] = j;
    }
    for (let i = 1; i < rowCount; ++i) {
      for (let j = 1; j < columnCount; ++j) {
        if (current[currentStart + j - 1] === old[oldStart + i - 1]) {
          distances[i][j] = distances[i - 1][j - 1];
        } else {
          north = distances[i - 1][j] + 1;
          west = distances[i][j - 1] + 1;
          distances[i][j] = north < west ? north : west;
        }
      }
    }
    return distances;
  }
  function spliceOperationsFromEditDistances(distances) {
    let i = distances.length - 1;
    let j = distances[0].length - 1;
    let current = distances[i][j];
    const edits = [];
    while (i > 0 || j > 0) {
      if (i === 0) {
        edits.push(
          2
          /* Edit.add */
        );
        j--;
        continue;
      }
      if (j === 0) {
        edits.push(
          3
          /* Edit.delete */
        );
        i--;
        continue;
      }
      const northWest = distances[i - 1][j - 1];
      const west = distances[i - 1][j];
      const north = distances[i][j - 1];
      let min;
      if (west < north) {
        min = west < northWest ? west : northWest;
      } else {
        min = north < northWest ? north : northWest;
      }
      if (min === northWest) {
        if (northWest === current) {
          edits.push(
            0
            /* Edit.leave */
          );
        } else {
          edits.push(
            1
            /* Edit.update */
          );
          current = northWest;
        }
        i--;
        j--;
      } else if (min === west) {
        edits.push(
          3
          /* Edit.delete */
        );
        i--;
        current = west;
      } else {
        edits.push(
          2
          /* Edit.add */
        );
        j--;
        current = north;
      }
    }
    return edits.reverse();
  }
  function sharedPrefix(current, old, searchLength) {
    for (let i = 0; i < searchLength; ++i) {
      if (current[i] !== old[i]) {
        return i;
      }
    }
    return searchLength;
  }
  function sharedSuffix(current, old, searchLength) {
    let index1 = current.length;
    let index2 = old.length;
    let count = 0;
    while (count < searchLength && current[--index1] === old[--index2]) {
      count++;
    }
    return count;
  }
  function intersect(start1, end1, start2, end2) {
    if (end1 < start2 || end2 < start1) {
      return -1;
    }
    if (end1 === start2 || end2 === start1) {
      return 0;
    }
    if (start1 < start2) {
      if (end1 < end2) {
        return end1 - start2;
      }
      return end2 - start2;
    }
    if (end2 < end1) {
      return end2 - start1;
    }
    return end1 - start1;
  }
  function calc(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    let prefixCount = 0;
    let suffixCount = 0;
    const minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
    if (currentStart === 0 && oldStart === 0) {
      prefixCount = sharedPrefix(current, old, minLength);
    }
    if (currentEnd === current.length && oldEnd === old.length) {
      suffixCount = sharedSuffix(current, old, minLength - prefixCount);
    }
    currentStart += prefixCount;
    oldStart += prefixCount;
    currentEnd -= suffixCount;
    oldEnd -= suffixCount;
    if (currentEnd - currentStart === 0 && oldEnd - oldStart === 0) {
      return emptyArray;
    }
    if (currentStart === currentEnd) {
      const splice2 = new Splice(currentStart, [], 0);
      while (oldStart < oldEnd) {
        splice2.removed.push(old[oldStart++]);
      }
      return [splice2];
    } else if (oldStart === oldEnd) {
      return [new Splice(currentStart, [], currentEnd - currentStart)];
    }
    const ops = spliceOperationsFromEditDistances(calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
    const splices = [];
    let splice = void 0;
    let index = currentStart;
    let oldIndex = oldStart;
    for (let i = 0; i < ops.length; ++i) {
      switch (ops[i]) {
        case 0:
          if (splice !== void 0) {
            splices.push(splice);
            splice = void 0;
          }
          index++;
          oldIndex++;
          break;
        case 1:
          if (splice === void 0) {
            splice = new Splice(index, [], 0);
          }
          splice.addedCount++;
          index++;
          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
        case 2:
          if (splice === void 0) {
            splice = new Splice(index, [], 0);
          }
          splice.addedCount++;
          index++;
          break;
        case 3:
          if (splice === void 0) {
            splice = new Splice(index, [], 0);
          }
          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
      }
    }
    if (splice !== void 0) {
      splices.push(splice);
    }
    return splices;
  }
  function merge(splice, splices) {
    let inserted = false;
    let insertionOffset = 0;
    for (let i = 0; i < splices.length; i++) {
      const current = splices[i];
      current.index += insertionOffset;
      if (inserted) {
        continue;
      }
      const intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);
      if (intersectCount >= 0) {
        splices.splice(i, 1);
        i--;
        insertionOffset -= current.addedCount - current.removed.length;
        splice.addedCount += current.addedCount - intersectCount;
        const deleteCount = splice.removed.length + current.removed.length - intersectCount;
        if (!splice.addedCount && !deleteCount) {
          inserted = true;
        } else {
          let currentRemoved = current.removed;
          if (splice.index < current.index) {
            const prepend = splice.removed.slice(0, current.index - splice.index);
            prepend.push(...currentRemoved);
            currentRemoved = prepend;
          }
          if (splice.index + splice.removed.length > current.index + current.addedCount) {
            const append = splice.removed.slice(current.index + current.addedCount - splice.index);
            currentRemoved.push(...append);
          }
          splice.removed = currentRemoved;
          if (current.index < splice.index) {
            splice.index = current.index;
          }
        }
      } else if (splice.index < current.index) {
        inserted = true;
        splices.splice(i, 0, splice);
        i++;
        const offset = splice.addedCount - splice.removed.length;
        current.index += offset;
        insertionOffset += offset;
      }
    }
    if (!inserted) {
      splices.push(splice);
    }
  }
  function project(array, changes) {
    let splices = [];
    const initialSplices = [];
    for (let i = 0, ii = changes.length; i < ii; i++) {
      merge(changes[i], initialSplices);
    }
    for (let i = 0, ii = initialSplices.length; i < ii; ++i) {
      const splice = initialSplices[i];
      if (splice.addedCount === 1 && splice.removed.length === 1) {
        if (splice.removed[0] !== array[splice.index]) {
          splices.push(splice);
        }
        continue;
      }
      splices = splices.concat(calc(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
    }
    return splices;
  }
  var defaultSpliceStrategy = Object.freeze({
    support: SpliceStrategySupport.optimized,
    normalize(previous, current, changes) {
      if (previous === void 0) {
        if (changes === void 0) {
          return emptyArray;
        }
        return project(current, changes);
      }
      return resetSplices;
    },
    pop(array, observer, pop, args) {
      const notEmpty = array.length > 0;
      const result = pop.apply(array, args);
      if (notEmpty) {
        observer.addSplice(new Splice(array.length, [result], 0));
      }
      return result;
    },
    push(array, observer, push, args) {
      const result = push.apply(array, args);
      observer.addSplice(new Splice(array.length - args.length, [], args.length).adjustTo(array));
      return result;
    },
    reverse(array, observer, reverse, args) {
      const result = reverse.apply(array, args);
      observer.reset(array);
      return result;
    },
    shift(array, observer, shift, args) {
      const notEmpty = array.length > 0;
      const result = shift.apply(array, args);
      if (notEmpty) {
        observer.addSplice(new Splice(0, [result], 0));
      }
      return result;
    },
    sort(array, observer, sort, args) {
      const result = sort.apply(array, args);
      observer.reset(array);
      return result;
    },
    splice(array, observer, splice, args) {
      const result = splice.apply(array, args);
      observer.addSplice(new Splice(+args[0], result, args.length > 2 ? args.length - 2 : 0).adjustTo(array));
      return result;
    },
    unshift(array, observer, unshift, args) {
      const result = unshift.apply(array, args);
      observer.addSplice(new Splice(0, [], args.length).adjustTo(array));
      return result;
    }
  });
  var SpliceStrategy = Object.freeze({
    /**
     * A set of changes that represent a full array reset.
     */
    reset: resetSplices,
    /**
     * Sets the default strategy to use for array observers.
     * @param strategy - The splice strategy to use.
     */
    setDefaultStrategy(strategy) {
      defaultSpliceStrategy = strategy;
    }
  });
  function setNonEnumerable(target, property, value) {
    Reflect.defineProperty(target, property, {
      value,
      enumerable: false
    });
  }
  var DefaultArrayObserver = class extends SubscriberSet {
    constructor(subject) {
      super(subject);
      this.oldCollection = void 0;
      this.splices = void 0;
      this.needsQueue = true;
      this._strategy = null;
      this._lengthObserver = void 0;
      this.call = this.flush;
      setNonEnumerable(subject, "$fastController", this);
    }
    get strategy() {
      return this._strategy;
    }
    set strategy(value) {
      this._strategy = value;
    }
    get lengthObserver() {
      let observer = this._lengthObserver;
      if (observer === void 0) {
        const array = this.subject;
        this._lengthObserver = observer = {
          length: array.length,
          handleChange() {
            if (this.length !== array.length) {
              this.length = array.length;
              Observable.notify(observer, "length");
            }
          }
        };
        this.subscribe(observer);
      }
      return observer;
    }
    subscribe(subscriber) {
      this.flush();
      super.subscribe(subscriber);
    }
    addSplice(splice) {
      if (this.splices === void 0) {
        this.splices = [splice];
      } else {
        this.splices.push(splice);
      }
      this.enqueue();
    }
    reset(oldCollection) {
      this.oldCollection = oldCollection;
      this.enqueue();
    }
    flush() {
      var _a;
      const splices = this.splices;
      const oldCollection = this.oldCollection;
      if (splices === void 0 && oldCollection === void 0) {
        return;
      }
      this.needsQueue = true;
      this.splices = void 0;
      this.oldCollection = void 0;
      this.notify(((_a = this._strategy) !== null && _a !== void 0 ? _a : defaultSpliceStrategy).normalize(oldCollection, this.subject, splices));
    }
    enqueue() {
      if (this.needsQueue) {
        this.needsQueue = false;
        Updates.enqueue(this);
      }
    }
  };
  var enabled = false;
  var ArrayObserver = Object.freeze({
    /**
     * Enables the array observation mechanism.
     * @remarks
     * Array observation is enabled automatically when using the
     * {@link RepeatDirective}, so calling this API manually is
     * not typically necessary.
     */
    enable() {
      if (enabled) {
        return;
      }
      enabled = true;
      Observable.setArrayObserverFactory((collection) => new DefaultArrayObserver(collection));
      const proto = Array.prototype;
      if (!proto.$fastPatch) {
        setNonEnumerable(proto, "$fastPatch", 1);
        [
          proto.pop,
          proto.push,
          proto.reverse,
          proto.shift,
          proto.sort,
          proto.splice,
          proto.unshift
        ].forEach((method) => {
          proto[method.name] = function(...args) {
            var _a;
            const o = this.$fastController;
            return o === void 0 ? method.apply(this, args) : ((_a = o.strategy) !== null && _a !== void 0 ? _a : defaultSpliceStrategy)[method.name](this, o, method, args);
          };
        });
      }
    }
  });

  // ../node_modules/@microsoft/fast-element/dist/esm/binding/binding.js
  var Binding = class {
    /**
     * Creates a binding.
     * @param evaluate - Evaluates the binding.
     * @param policy - The security policy to associate with this binding.
     * @param isVolatile - Indicates whether the binding is volatile.
     */
    constructor(evaluate, policy, isVolatile = false) {
      this.evaluate = evaluate;
      this.policy = policy;
      this.isVolatile = isVolatile;
    }
  };

  // ../node_modules/@microsoft/fast-element/dist/esm/binding/one-way.js
  var OneWayBinding = class extends Binding {
    createObserver(subscriber) {
      return Observable.binding(this.evaluate, subscriber, this.isVolatile);
    }
  };
  function oneWay(expression, policy, isVolatile = Observable.isVolatileBinding(expression)) {
    return new OneWayBinding(expression, policy, isVolatile);
  }

  // ../node_modules/@microsoft/fast-element/dist/esm/binding/one-time.js
  var OneTimeBinding = class extends Binding {
    createObserver() {
      return this;
    }
    bind(controller) {
      return this.evaluate(controller.source, controller.context);
    }
  };
  makeSerializationNoop(OneTimeBinding);
  function oneTime(expression, policy) {
    return new OneTimeBinding(expression, policy);
  }

  // ../node_modules/@microsoft/fast-element/dist/esm/binding/normalize.js
  function normalizeBinding(value) {
    return isFunction(value) ? oneWay(value) : value instanceof Binding ? value : oneTime(() => value);
  }

  // ../node_modules/@microsoft/fast-element/dist/esm/styles/element-styles.js
  var DefaultStyleStrategy;
  function reduceStyles(styles13) {
    return styles13.map((x) => x instanceof ElementStyles ? reduceStyles(x.styles) : [x]).reduce((prev, curr) => prev.concat(curr), []);
  }
  var ElementStyles = class _ElementStyles {
    /**
     * Creates an instance of ElementStyles.
     * @param styles - The styles that will be associated with elements.
     */
    constructor(styles13) {
      this.styles = styles13;
      this.targets = /* @__PURE__ */ new WeakSet();
      this._strategy = null;
      this.behaviors = styles13.map((x) => x instanceof _ElementStyles ? x.behaviors : null).reduce((prev, curr) => curr === null ? prev : prev === null ? curr : prev.concat(curr), null);
    }
    /**
     * Gets the StyleStrategy associated with these element styles.
     */
    get strategy() {
      if (this._strategy === null) {
        this.withStrategy(DefaultStyleStrategy);
      }
      return this._strategy;
    }
    /** @internal */
    addStylesTo(target) {
      this.strategy.addStylesTo(target);
      this.targets.add(target);
    }
    /** @internal */
    removeStylesFrom(target) {
      this.strategy.removeStylesFrom(target);
      this.targets.delete(target);
    }
    /** @internal */
    isAttachedTo(target) {
      return this.targets.has(target);
    }
    /**
     * Associates behaviors with this set of styles.
     * @param behaviors - The behaviors to associate.
     */
    withBehaviors(...behaviors) {
      this.behaviors = this.behaviors === null ? behaviors : this.behaviors.concat(behaviors);
      return this;
    }
    /**
     * Sets the strategy that handles adding/removing these styles for an element.
     * @param strategy - The strategy to use.
     */
    withStrategy(Strategy) {
      this._strategy = new Strategy(reduceStyles(this.styles));
      return this;
    }
    /**
     * Sets the default strategy type to use when creating style strategies.
     * @param Strategy - The strategy type to construct.
     */
    static setDefaultStrategy(Strategy) {
      DefaultStyleStrategy = Strategy;
    }
    /**
     * Normalizes a set of composable style options.
     * @param styles - The style options to normalize.
     * @returns A singular ElementStyles instance or undefined.
     */
    static normalize(styles13) {
      return styles13 === void 0 ? void 0 : Array.isArray(styles13) ? new _ElementStyles(styles13) : styles13 instanceof _ElementStyles ? styles13 : new _ElementStyles([styles13]);
    }
  };
  ElementStyles.supportsAdoptedStyleSheets = Array.isArray(document.adoptedStyleSheets) && "replace" in CSSStyleSheet.prototype;

  // ../node_modules/@microsoft/fast-element/dist/esm/styles/css-directive.js
  var registry = createTypeRegistry();
  var CSSDirective = Object.freeze({
    /**
     * Gets the directive definition associated with the instance.
     * @param instance - The directive instance to retrieve the definition for.
     */
    getForInstance: registry.getForInstance,
    /**
     * Gets the directive definition associated with the specified type.
     * @param type - The directive type to retrieve the definition for.
     */
    getByType: registry.getByType,
    /**
     * Defines a CSSDirective.
     * @param type - The type to define as a directive.
     */
    define(type) {
      registry.register({ type });
      return type;
    }
  });

  // ../node_modules/@microsoft/fast-element/dist/esm/styles/css-binding-directive.js
  function handleChange(directive, controller, observer) {
    controller.source.style.setProperty(directive.targetAspect, observer.bind(controller));
  }
  var CSSBindingDirective = class {
    /**
     * Creates an instance of CSSBindingDirective.
     * @param dataBinding - The binding to use in CSS.
     * @param targetAspect - The CSS property to target.
     */
    constructor(dataBinding, targetAspect) {
      this.dataBinding = dataBinding;
      this.targetAspect = targetAspect;
    }
    /**
     * Creates a CSS fragment to interpolate into the CSS document.
     * @returns - the string to interpolate into CSS
     */
    createCSS(add) {
      add(this);
      return `var(${this.targetAspect})`;
    }
    /**
     * Executed when this behavior is attached to a controller.
     * @param controller - Controls the behavior lifecycle.
     */
    addedCallback(controller) {
      var _a;
      const element = controller.source;
      if (!element.$cssBindings) {
        element.$cssBindings = /* @__PURE__ */ new Map();
        const setAttribute = element.setAttribute;
        element.setAttribute = (attr2, value) => {
          setAttribute.call(element, attr2, value);
          if (attr2 === "style") {
            element.$cssBindings.forEach((v, k) => handleChange(k, v.controller, v.observer));
          }
        };
      }
      const observer = (_a = controller[this.targetAspect]) !== null && _a !== void 0 ? _a : controller[this.targetAspect] = this.dataBinding.createObserver(this, this);
      observer.controller = controller;
      controller.source.$cssBindings.set(this, { controller, observer });
    }
    /**
     * Executed when this behavior's host is connected.
     * @param controller - Controls the behavior lifecycle.
     */
    connectedCallback(controller) {
      handleChange(this, controller, controller[this.targetAspect]);
    }
    /**
     * Executed when this behavior is detached from a controller.
     * @param controller - Controls the behavior lifecycle.
     */
    removedCallback(controller) {
      if (controller.source.$cssBindings) {
        controller.source.$cssBindings.delete(this);
      }
    }
    /**
     * Called when a subject this instance has subscribed to changes.
     * @param subject - The subject of the change.
     * @param args - The event args detailing the change that occurred.
     *
     * @internal
     */
    handleChange(_, observer) {
      handleChange(this, observer.controller, observer);
    }
  };
  CSSDirective.define(CSSBindingDirective);

  // ../node_modules/@microsoft/fast-element/dist/esm/styles/css.js
  var marker = `${Math.random().toString(36).substring(2, 8)}`;
  var varId = 0;
  var nextCSSVariable = () => `--v${marker}${++varId}`;
  function collectStyles(strings, values) {
    const styles13 = [];
    let cssString = "";
    const behaviors = [];
    const add = (behavior) => {
      behaviors.push(behavior);
    };
    for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
      cssString += strings[i];
      let value = values[i];
      if (isFunction(value)) {
        value = new CSSBindingDirective(oneWay(value), nextCSSVariable()).createCSS(add);
      } else if (value instanceof Binding) {
        value = new CSSBindingDirective(value, nextCSSVariable()).createCSS(add);
      } else if (CSSDirective.getForInstance(value) !== void 0) {
        value = value.createCSS(add);
      }
      if (value instanceof ElementStyles || value instanceof CSSStyleSheet) {
        if (cssString.trim() !== "") {
          styles13.push(cssString);
          cssString = "";
        }
        styles13.push(value);
      } else {
        cssString += value;
      }
    }
    cssString += strings[strings.length - 1];
    if (cssString.trim() !== "") {
      styles13.push(cssString);
    }
    return {
      styles: styles13,
      behaviors
    };
  }
  var css = (strings, ...values) => {
    const { styles: styles13, behaviors } = collectStyles(strings, values);
    const elementStyles = new ElementStyles(styles13);
    return behaviors.length ? elementStyles.withBehaviors(...behaviors) : elementStyles;
  };
  var CSSPartial = class {
    constructor(styles13, behaviors) {
      this.behaviors = behaviors;
      this.css = "";
      const stylesheets = styles13.reduce((accumulated, current) => {
        if (isString(current)) {
          this.css += current;
        } else {
          accumulated.push(current);
        }
        return accumulated;
      }, []);
      if (stylesheets.length) {
        this.styles = new ElementStyles(stylesheets);
      }
    }
    createCSS(add) {
      this.behaviors.forEach(add);
      if (this.styles) {
        add(this);
      }
      return this.css;
    }
    addedCallback(controller) {
      controller.addStyles(this.styles);
    }
    removedCallback(controller) {
      controller.removeStyles(this.styles);
    }
  };
  CSSDirective.define(CSSPartial);
  css.partial = (strings, ...values) => {
    const { styles: styles13, behaviors } = collectStyles(strings, values);
    return new CSSPartial(styles13, behaviors);
  };

  // ../node_modules/@microsoft/fast-element/dist/esm/templating/markup.js
  var marker2 = `fast-${Math.random().toString(36).substring(2, 8)}`;
  var interpolationStart = `${marker2}{`;
  var interpolationEnd = `}${marker2}`;
  var interpolationEndLength = interpolationEnd.length;
  var id = 0;
  var nextId = () => `${marker2}-${++id}`;
  var Markup = Object.freeze({
    /**
     * Creates a placeholder string suitable for marking out a location *within*
     * an attribute value or HTML content.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by binding directives.
     */
    interpolation: (id3) => `${interpolationStart}${id3}${interpolationEnd}`,
    /**
     * Creates a placeholder that manifests itself as an attribute on an
     * element.
     * @param attributeName - The name of the custom attribute.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by attribute directives such as `ref`, `slotted`, and `children`.
     */
    attribute: (id3) => `${nextId()}="${interpolationStart}${id3}${interpolationEnd}"`,
    /**
     * Creates a placeholder that manifests itself as a marker within the DOM structure.
     * @param index - The directive index to create the placeholder for.
     * @remarks
     * Used internally by structural directives such as `repeat`.
     */
    comment: (id3) => `<!--${interpolationStart}${id3}${interpolationEnd}-->`
  });
  var Parser = Object.freeze({
    /**
     * Parses text content or HTML attribute content, separating out the static strings
     * from the directives.
     * @param value - The content or attribute string to parse.
     * @param factories - A list of directives to search for in the string.
     * @returns A heterogeneous array of static strings interspersed with
     * directives or null if no directives are found in the string.
     */
    parse(value, factories2) {
      const parts = value.split(interpolationStart);
      if (parts.length === 1) {
        return null;
      }
      const result = [];
      for (let i = 0, ii = parts.length; i < ii; ++i) {
        const current = parts[i];
        const index = current.indexOf(interpolationEnd);
        let literal;
        if (index === -1) {
          literal = current;
        } else {
          const factoryId = current.substring(0, index);
          result.push(factories2[factoryId]);
          literal = current.substring(index + interpolationEndLength);
        }
        if (literal !== "") {
          result.push(literal);
        }
      }
      return result;
    }
  });

  // ../node_modules/@microsoft/fast-element/dist/esm/templating/html-directive.js
  var registry2 = createTypeRegistry();
  var HTMLDirective = Object.freeze({
    /**
     * Gets the directive definition associated with the instance.
     * @param instance - The directive instance to retrieve the definition for.
     */
    getForInstance: registry2.getForInstance,
    /**
     * Gets the directive definition associated with the specified type.
     * @param type - The directive type to retrieve the definition for.
     */
    getByType: registry2.getByType,
    /**
     * Defines an HTMLDirective based on the options.
     * @param type - The type to define as a directive.
     * @param options - Options that specify the directive's application.
     */
    define(type, options) {
      options = options || {};
      options.type = type;
      registry2.register(options);
      return type;
    },
    /**
     *
     * @param directive - The directive to assign the aspect to.
     * @param value - The value to base the aspect determination on.
     * @remarks
     * If a falsy value is provided, then the content aspect will be assigned.
     */
    assignAspect(directive, value) {
      if (!value) {
        directive.aspectType = DOMAspect.content;
        return;
      }
      directive.sourceAspect = value;
      switch (value[0]) {
        case ":":
          directive.targetAspect = value.substring(1);
          directive.aspectType = directive.targetAspect === "classList" ? DOMAspect.tokenList : DOMAspect.property;
          break;
        case "?":
          directive.targetAspect = value.substring(1);
          directive.aspectType = DOMAspect.booleanAttribute;
          break;
        case "@":
          directive.targetAspect = value.substring(1);
          directive.aspectType = DOMAspect.event;
          break;
        default:
          directive.targetAspect = value;
          directive.aspectType = DOMAspect.attribute;
          break;
      }
    }
  });
  var StatelessAttachedAttributeDirective = class {
    /**
     * Creates an instance of RefDirective.
     * @param options - The options to use in configuring the directive.
     */
    constructor(options) {
      this.options = options;
    }
    /**
     * Creates a placeholder string based on the directive's index within the template.
     * @param index - The index of the directive within the template.
     * @remarks
     * Creates a custom attribute placeholder.
     */
    createHTML(add) {
      return Markup.attribute(add(this));
    }
    /**
     * Creates a behavior.
     * @param targets - The targets available for behaviors to be attached to.
     */
    createBehavior() {
      return this;
    }
  };
  makeSerializationNoop(StatelessAttachedAttributeDirective);

  // ../node_modules/@microsoft/fast-element/dist/esm/templating/html-binding-directive.js
  function updateContent(target, aspect, value, controller) {
    if (value === null || value === void 0) {
      value = "";
    }
    if (value.create) {
      target.textContent = "";
      let view = target.$fastView;
      if (view === void 0) {
        view = value.create();
      } else {
        if (target.$fastTemplate !== value) {
          if (view.isComposed) {
            view.remove();
            view.unbind();
          }
          view = value.create();
        }
      }
      if (!view.isComposed) {
        view.isComposed = true;
        view.bind(controller.source, controller.context);
        view.insertBefore(target);
        target.$fastView = view;
        target.$fastTemplate = value;
      } else if (view.needsBindOnly) {
        view.needsBindOnly = false;
        view.bind(controller.source, controller.context);
      }
    } else {
      const view = target.$fastView;
      if (view !== void 0 && view.isComposed) {
        view.isComposed = false;
        view.remove();
        if (view.needsBindOnly) {
          view.needsBindOnly = false;
        } else {
          view.unbind();
        }
      }
      target.textContent = value;
    }
  }
  function updateTokenList(target, aspect, value) {
    var _a;
    const lookup = `${this.id}-t`;
    const state = (_a = target[lookup]) !== null && _a !== void 0 ? _a : target[lookup] = { v: 0, cv: /* @__PURE__ */ Object.create(null) };
    const classVersions = state.cv;
    let version = state.v;
    const tokenList = target[aspect];
    if (value !== null && value !== void 0 && value.length) {
      const names = value.split(/\s+/);
      for (let i = 0, ii = names.length; i < ii; ++i) {
        const currentName = names[i];
        if (currentName === "") {
          continue;
        }
        classVersions[currentName] = version;
        tokenList.add(currentName);
      }
    }
    state.v = version + 1;
    if (version === 0) {
      return;
    }
    version -= 1;
    for (const name in classVersions) {
      if (classVersions[name] === version) {
        tokenList.remove(name);
      }
    }
  }
  var sinkLookup = {
    [DOMAspect.attribute]: DOM.setAttribute,
    [DOMAspect.booleanAttribute]: DOM.setBooleanAttribute,
    [DOMAspect.property]: (t, a, v) => t[a] = v,
    [DOMAspect.content]: updateContent,
    [DOMAspect.tokenList]: updateTokenList,
    [DOMAspect.event]: () => void 0
  };
  var HTMLBindingDirective = class {
    /**
     * Creates an instance of HTMLBindingDirective.
     * @param dataBinding - The binding configuration to apply.
     */
    constructor(dataBinding) {
      this.dataBinding = dataBinding;
      this.updateTarget = null;
      this.aspectType = DOMAspect.content;
    }
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add) {
      return Markup.interpolation(add(this));
    }
    /**
     * Creates a behavior.
     */
    createBehavior() {
      var _a;
      if (this.updateTarget === null) {
        const sink = sinkLookup[this.aspectType];
        const policy = (_a = this.dataBinding.policy) !== null && _a !== void 0 ? _a : this.policy;
        if (!sink) {
          throw FAST.error(
            1205
            /* Message.unsupportedBindingBehavior */
          );
        }
        this.data = `${this.id}-d`;
        this.updateTarget = policy.protect(this.targetTagName, this.aspectType, this.targetAspect, sink);
      }
      return this;
    }
    /** @internal */
    bind(controller) {
      var _a;
      const target = controller.targets[this.targetNodeId];
      switch (this.aspectType) {
        case DOMAspect.event:
          target[this.data] = controller;
          target.addEventListener(this.targetAspect, this, this.dataBinding.options);
          break;
        case DOMAspect.content:
          controller.onUnbind(this);
        default:
          const observer = (_a = target[this.data]) !== null && _a !== void 0 ? _a : target[this.data] = this.dataBinding.createObserver(this, this);
          observer.target = target;
          observer.controller = controller;
          this.updateTarget(target, this.targetAspect, observer.bind(controller), controller);
          break;
      }
    }
    /** @internal */
    unbind(controller) {
      const target = controller.targets[this.targetNodeId];
      const view = target.$fastView;
      if (view !== void 0 && view.isComposed) {
        view.unbind();
        view.needsBindOnly = true;
      }
    }
    /** @internal */
    handleEvent(event) {
      const controller = event.currentTarget[this.data];
      if (controller.isBound) {
        ExecutionContext.setEvent(event);
        const result = this.dataBinding.evaluate(controller.source, controller.context);
        ExecutionContext.setEvent(null);
        if (result !== true) {
          event.preventDefault();
        }
      }
    }
    /** @internal */
    handleChange(binding, observer) {
      const target = observer.target;
      const controller = observer.controller;
      this.updateTarget(target, this.targetAspect, observer.bind(controller), controller);
    }
  };
  HTMLDirective.define(HTMLBindingDirective, { aspected: true });

  // ../node_modules/@microsoft/fast-element/dist/esm/templating/view.js
  function removeNodeSequence(firstNode, lastNode) {
    const parent = firstNode.parentNode;
    let current = firstNode;
    let next2;
    while (current !== lastNode) {
      next2 = current.nextSibling;
      parent.removeChild(current);
      current = next2;
    }
    parent.removeChild(lastNode);
  }
  var HTMLView = class {
    /**
     * Constructs an instance of HTMLView.
     * @param fragment - The html fragment that contains the nodes for this view.
     * @param behaviors - The behaviors to be applied to this view.
     */
    constructor(fragment, factories2, targets) {
      this.fragment = fragment;
      this.factories = factories2;
      this.targets = targets;
      this.behaviors = null;
      this.unbindables = [];
      this.source = null;
      this.isBound = false;
      this.sourceLifetime = SourceLifetime.unknown;
      this.context = this;
      this.index = 0;
      this.length = 0;
      this.firstChild = fragment.firstChild;
      this.lastChild = fragment.lastChild;
    }
    /**
     * The current event within an event handler.
     */
    get event() {
      return ExecutionContext.getEvent();
    }
    /**
     * Indicates whether the current item within a repeat context
     * has an even index.
     */
    get isEven() {
      return this.index % 2 === 0;
    }
    /**
     * Indicates whether the current item within a repeat context
     * has an odd index.
     */
    get isOdd() {
      return this.index % 2 !== 0;
    }
    /**
     * Indicates whether the current item within a repeat context
     * is the first item in the collection.
     */
    get isFirst() {
      return this.index === 0;
    }
    /**
     * Indicates whether the current item within a repeat context
     * is somewhere in the middle of the collection.
     */
    get isInMiddle() {
      return !this.isFirst && !this.isLast;
    }
    /**
     * Indicates whether the current item within a repeat context
     * is the last item in the collection.
     */
    get isLast() {
      return this.index === this.length - 1;
    }
    /**
     * Returns the typed event detail of a custom event.
     */
    eventDetail() {
      return this.event.detail;
    }
    /**
     * Returns the typed event target of the event.
     */
    eventTarget() {
      return this.event.target;
    }
    /**
     * Appends the view's DOM nodes to the referenced node.
     * @param node - The parent node to append the view's DOM nodes to.
     */
    appendTo(node) {
      node.appendChild(this.fragment);
    }
    /**
     * Inserts the view's DOM nodes before the referenced node.
     * @param node - The node to insert the view's DOM before.
     */
    insertBefore(node) {
      if (this.fragment.hasChildNodes()) {
        node.parentNode.insertBefore(this.fragment, node);
      } else {
        const end = this.lastChild;
        if (node.previousSibling === end)
          return;
        const parentNode = node.parentNode;
        let current = this.firstChild;
        let next2;
        while (current !== end) {
          next2 = current.nextSibling;
          parentNode.insertBefore(current, node);
          current = next2;
        }
        parentNode.insertBefore(end, node);
      }
    }
    /**
     * Removes the view's DOM nodes.
     * The nodes are not disposed and the view can later be re-inserted.
     */
    remove() {
      const fragment = this.fragment;
      const end = this.lastChild;
      let current = this.firstChild;
      let next2;
      while (current !== end) {
        next2 = current.nextSibling;
        fragment.appendChild(current);
        current = next2;
      }
      fragment.appendChild(end);
    }
    /**
     * Removes the view and unbinds its behaviors, disposing of DOM nodes afterward.
     * Once a view has been disposed, it cannot be inserted or bound again.
     */
    dispose() {
      removeNodeSequence(this.firstChild, this.lastChild);
      this.unbind();
    }
    onUnbind(behavior) {
      this.unbindables.push(behavior);
    }
    /**
     * Binds a view's behaviors to its binding source.
     * @param source - The binding source for the view's binding behaviors.
     * @param context - The execution context to run the behaviors within.
     */
    bind(source, context = this) {
      if (this.source === source) {
        return;
      }
      let behaviors = this.behaviors;
      if (behaviors === null) {
        this.source = source;
        this.context = context;
        this.behaviors = behaviors = new Array(this.factories.length);
        const factories2 = this.factories;
        for (let i = 0, ii = factories2.length; i < ii; ++i) {
          const behavior = factories2[i].createBehavior();
          behavior.bind(this);
          behaviors[i] = behavior;
        }
      } else {
        if (this.source !== null) {
          this.evaluateUnbindables();
        }
        this.isBound = false;
        this.source = source;
        this.context = context;
        for (let i = 0, ii = behaviors.length; i < ii; ++i) {
          behaviors[i].bind(this);
        }
      }
      this.isBound = true;
    }
    /**
     * Unbinds a view's behaviors from its binding source.
     */
    unbind() {
      if (!this.isBound || this.source === null) {
        return;
      }
      this.evaluateUnbindables();
      this.source = null;
      this.context = this;
      this.isBound = false;
    }
    evaluateUnbindables() {
      const unbindables = this.unbindables;
      for (let i = 0, ii = unbindables.length; i < ii; ++i) {
        unbindables[i].unbind(this);
      }
      unbindables.length = 0;
    }
    /**
     * Efficiently disposes of a contiguous range of synthetic view instances.
     * @param views - A contiguous range of views to be disposed.
     */
    static disposeContiguousBatch(views) {
      if (views.length === 0) {
        return;
      }
      removeNodeSequence(views[0].firstChild, views[views.length - 1].lastChild);
      for (let i = 0, ii = views.length; i < ii; ++i) {
        views[i].unbind();
      }
    }
  };
  makeSerializationNoop(HTMLView);
  Observable.defineProperty(HTMLView.prototype, "index");
  Observable.defineProperty(HTMLView.prototype, "length");

  // ../node_modules/@microsoft/fast-element/dist/esm/templating/compiler.js
  var targetIdFrom = (parentId, nodeIndex) => `${parentId}.${nodeIndex}`;
  var descriptorCache = {};
  var next = {
    index: 0,
    node: null
  };
  function tryWarn(name) {
    if (!name.startsWith("fast-")) {
      FAST.warn(1204, { name });
    }
  }
  var warningHost = new Proxy(document.createElement("div"), {
    get(target, property) {
      tryWarn(property);
      const value = Reflect.get(target, property);
      return isFunction(value) ? value.bind(target) : value;
    },
    set(target, property, value) {
      tryWarn(property);
      return Reflect.set(target, property, value);
    }
  });
  var CompilationContext = class {
    constructor(fragment, directives, policy) {
      this.fragment = fragment;
      this.directives = directives;
      this.policy = policy;
      this.proto = null;
      this.nodeIds = /* @__PURE__ */ new Set();
      this.descriptors = {};
      this.factories = [];
    }
    addFactory(factory, parentId, nodeId, targetIndex, tagName) {
      var _a, _b;
      if (!this.nodeIds.has(nodeId)) {
        this.nodeIds.add(nodeId);
        this.addTargetDescriptor(parentId, nodeId, targetIndex);
      }
      factory.id = (_a = factory.id) !== null && _a !== void 0 ? _a : nextId();
      factory.targetNodeId = nodeId;
      factory.targetTagName = tagName;
      factory.policy = (_b = factory.policy) !== null && _b !== void 0 ? _b : this.policy;
      this.factories.push(factory);
    }
    freeze() {
      this.proto = Object.create(null, this.descriptors);
      return this;
    }
    addTargetDescriptor(parentId, targetId, targetIndex) {
      const descriptors = this.descriptors;
      if (targetId === "r" || // root
      targetId === "h" || // host
      descriptors[targetId]) {
        return;
      }
      if (!descriptors[parentId]) {
        const index = parentId.lastIndexOf(".");
        const grandparentId = parentId.substring(0, index);
        const childIndex = parseInt(parentId.substring(index + 1));
        this.addTargetDescriptor(grandparentId, parentId, childIndex);
      }
      let descriptor = descriptorCache[targetId];
      if (!descriptor) {
        const field = `_${targetId}`;
        descriptorCache[targetId] = descriptor = {
          get() {
            var _a;
            return (_a = this[field]) !== null && _a !== void 0 ? _a : this[field] = this[parentId].childNodes[targetIndex];
          }
        };
      }
      descriptors[targetId] = descriptor;
    }
    createView(hostBindingTarget) {
      const fragment = this.fragment.cloneNode(true);
      const targets = Object.create(this.proto);
      targets.r = fragment;
      targets.h = hostBindingTarget !== null && hostBindingTarget !== void 0 ? hostBindingTarget : warningHost;
      for (const id3 of this.nodeIds) {
        targets[id3];
      }
      return new HTMLView(fragment, this.factories, targets);
    }
  };
  function compileAttributes(context, parentId, node, nodeId, nodeIndex, includeBasicValues = false) {
    const attributes = node.attributes;
    const directives = context.directives;
    for (let i = 0, ii = attributes.length; i < ii; ++i) {
      const attr2 = attributes[i];
      const attrValue = attr2.value;
      const parseResult = Parser.parse(attrValue, directives);
      let result = null;
      if (parseResult === null) {
        if (includeBasicValues) {
          result = new HTMLBindingDirective(oneTime(() => attrValue, context.policy));
          HTMLDirective.assignAspect(result, attr2.name);
        }
      } else {
        result = Compiler.aggregate(parseResult, context.policy);
      }
      if (result !== null) {
        node.removeAttributeNode(attr2);
        i--;
        ii--;
        context.addFactory(result, parentId, nodeId, nodeIndex, node.tagName);
      }
    }
  }
  function compileContent(context, node, parentId, nodeId, nodeIndex) {
    const parseResult = Parser.parse(node.textContent, context.directives);
    if (parseResult === null) {
      next.node = node.nextSibling;
      next.index = nodeIndex + 1;
      return next;
    }
    let currentNode;
    let lastNode = currentNode = node;
    for (let i = 0, ii = parseResult.length; i < ii; ++i) {
      const currentPart = parseResult[i];
      if (i !== 0) {
        nodeIndex++;
        nodeId = targetIdFrom(parentId, nodeIndex);
        currentNode = lastNode.parentNode.insertBefore(document.createTextNode(""), lastNode.nextSibling);
      }
      if (isString(currentPart)) {
        currentNode.textContent = currentPart;
      } else {
        currentNode.textContent = " ";
        HTMLDirective.assignAspect(currentPart);
        context.addFactory(currentPart, parentId, nodeId, nodeIndex, null);
      }
      lastNode = currentNode;
    }
    next.index = nodeIndex + 1;
    next.node = lastNode.nextSibling;
    return next;
  }
  function compileChildren(context, parent, parentId) {
    let nodeIndex = 0;
    let childNode = parent.firstChild;
    while (childNode) {
      const result = compileNode(context, parentId, childNode, nodeIndex);
      childNode = result.node;
      nodeIndex = result.index;
    }
  }
  function compileNode(context, parentId, node, nodeIndex) {
    const nodeId = targetIdFrom(parentId, nodeIndex);
    switch (node.nodeType) {
      case 1:
        compileAttributes(context, parentId, node, nodeId, nodeIndex);
        compileChildren(context, node, nodeId);
        break;
      case 3:
        return compileContent(context, node, parentId, nodeId, nodeIndex);
      case 8:
        const parts = Parser.parse(node.data, context.directives);
        if (parts !== null) {
          context.addFactory(
            /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
            Compiler.aggregate(parts),
            parentId,
            nodeId,
            nodeIndex,
            null
          );
        }
        break;
    }
    next.index = nodeIndex + 1;
    next.node = node.nextSibling;
    return next;
  }
  function isMarker(node, directives) {
    return node && node.nodeType == 8 && Parser.parse(node.data, directives) !== null;
  }
  var templateTag = "TEMPLATE";
  var Compiler = {
    /**
     * Compiles a template and associated directives into a compilation
     * result which can be used to create views.
     * @param html - The html string or template element to compile.
     * @param factories - The behavior factories referenced by the template.
     * @param policy - The security policy to compile the html with.
     * @remarks
     * The template that is provided for compilation is altered in-place
     * and cannot be compiled again. If the original template must be preserved,
     * it is recommended that you clone the original and pass the clone to this API.
     * @public
     */
    compile(html2, factories2, policy = DOM.policy) {
      let template12;
      if (isString(html2)) {
        template12 = document.createElement(templateTag);
        template12.innerHTML = policy.createHTML(html2);
        const fec = template12.content.firstElementChild;
        if (fec !== null && fec.tagName === templateTag) {
          template12 = fec;
        }
      } else {
        template12 = html2;
      }
      if (!template12.content.firstChild && !template12.content.lastChild) {
        template12.content.appendChild(document.createComment(""));
      }
      const fragment = document.adoptNode(template12.content);
      const context = new CompilationContext(fragment, factories2, policy);
      compileAttributes(
        context,
        "",
        template12,
        /* host */
        "h",
        0,
        true
      );
      if (
        // If the first node in a fragment is a marker, that means it's an unstable first node,
        // because something like a when, repeat, etc. could add nodes before the marker.
        // To mitigate this, we insert a stable first node. However, if we insert a node,
        // that will alter the result of the TreeWalker. So, we also need to offset the target index.
        isMarker(fragment.firstChild, factories2) || // Or if there is only one node and a directive, it means the template's content
        // is *only* the directive. In that case, HTMLView.dispose() misses any nodes inserted by
        // the directive. Inserting a new node ensures proper disposal of nodes added by the directive.
        fragment.childNodes.length === 1 && Object.keys(factories2).length > 0
      ) {
        fragment.insertBefore(document.createComment(""), fragment.firstChild);
      }
      compileChildren(
        context,
        fragment,
        /* root */
        "r"
      );
      next.node = null;
      return context.freeze();
    },
    /**
     * Sets the default compilation strategy that will be used by the ViewTemplate whenever
     * it needs to compile a view preprocessed with the html template function.
     * @param strategy - The compilation strategy to use when compiling templates.
     */
    setDefaultStrategy(strategy) {
      this.compile = strategy;
    },
    /**
     * Aggregates an array of strings and directives into a single directive.
     * @param parts - A heterogeneous array of static strings interspersed with
     * directives.
     * @param policy - The security policy to use with the aggregated bindings.
     * @returns A single inline directive that aggregates the behavior of all the parts.
     */
    aggregate(parts, policy = DOM.policy) {
      if (parts.length === 1) {
        return parts[0];
      }
      let sourceAspect;
      let binding;
      let isVolatile = false;
      let bindingPolicy = void 0;
      const partCount = parts.length;
      const finalParts = parts.map((x) => {
        if (isString(x)) {
          return () => x;
        }
        sourceAspect = x.sourceAspect || sourceAspect;
        binding = x.dataBinding || binding;
        isVolatile = isVolatile || x.dataBinding.isVolatile;
        bindingPolicy = bindingPolicy || x.dataBinding.policy;
        return x.dataBinding.evaluate;
      });
      const expression = (scope, context) => {
        let output = "";
        for (let i = 0; i < partCount; ++i) {
          output += finalParts[i](scope, context);
        }
        return output;
      };
      binding.evaluate = expression;
      binding.isVolatile = isVolatile;
      binding.policy = bindingPolicy !== null && bindingPolicy !== void 0 ? bindingPolicy : policy;
      const directive = new HTMLBindingDirective(binding);
      HTMLDirective.assignAspect(directive, sourceAspect);
      return directive;
    }
  };

  // ../node_modules/@microsoft/fast-element/dist/esm/templating/template.js
  var lastAttributeNameRegex = (
    /* eslint-disable-next-line no-control-regex */
    /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/
  );
  var noFactories = /* @__PURE__ */ Object.create(null);
  var InlineTemplateDirective = class {
    /**
     * Creates an instance of InlineTemplateDirective.
     * @param template - The template to inline.
     */
    constructor(html2, factories2 = noFactories) {
      this.html = html2;
      this.factories = factories2;
    }
    /**
     * Creates HTML to be used within a template.
     * @param add - Can be used to add  behavior factories to a template.
     */
    createHTML(add) {
      const factories2 = this.factories;
      for (const key in factories2) {
        add(factories2[key]);
      }
      return this.html;
    }
  };
  InlineTemplateDirective.empty = new InlineTemplateDirective("");
  HTMLDirective.define(InlineTemplateDirective);
  function createHTML2(value, prevString, add, definition = HTMLDirective.getForInstance(value)) {
    if (definition.aspected) {
      const match = lastAttributeNameRegex.exec(prevString);
      if (match !== null) {
        HTMLDirective.assignAspect(value, match[2]);
      }
    }
    return value.createHTML(add);
  }
  var ViewTemplate = class _ViewTemplate {
    /**
     * Creates an instance of ViewTemplate.
     * @param html - The html representing what this template will instantiate, including placeholders for directives.
     * @param factories - The directives that will be connected to placeholders in the html.
     * @param policy - The security policy to use when compiling this template.
     */
    constructor(html2, factories2 = {}, policy) {
      this.policy = policy;
      this.result = null;
      this.html = html2;
      this.factories = factories2;
    }
    /**
     * Creates an HTMLView instance based on this template definition.
     * @param hostBindingTarget - The element that host behaviors will be bound to.
     */
    create(hostBindingTarget) {
      if (this.result === null) {
        this.result = Compiler.compile(this.html, this.factories, this.policy);
      }
      return this.result.createView(hostBindingTarget);
    }
    /**
     * Returns a directive that can inline the template.
     */
    inline() {
      return new InlineTemplateDirective(isString(this.html) ? this.html : this.html.innerHTML, this.factories);
    }
    /**
     * Sets the DOMPolicy for this template.
     * @param policy - The policy to associated with this template.
     * @returns The modified template instance.
     * @remarks
     * The DOMPolicy can only be set once for a template and cannot be
     * set after the template is compiled.
     */
    withPolicy(policy) {
      if (this.result) {
        throw FAST.error(
          1208
          /* Message.cannotSetTemplatePolicyAfterCompilation */
        );
      }
      if (this.policy) {
        throw FAST.error(
          1207
          /* Message.onlySetTemplatePolicyOnce */
        );
      }
      this.policy = policy;
      return this;
    }
    /**
     * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
     * @param source - The data source to bind the template to.
     * @param host - The Element where the template will be rendered.
     * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
     * host that the template is being attached to.
     */
    render(source, host, hostBindingTarget) {
      const view = this.create(hostBindingTarget);
      view.bind(source);
      view.appendTo(host);
      return view;
    }
    /**
     * Creates a template based on a set of static strings and dynamic values.
     * @param strings - The static strings to create the template with.
     * @param values - The dynamic values to create the template with.
     * @param policy - The DOMPolicy to associated with the template.
     * @returns A ViewTemplate.
     * @remarks
     * This API should not be used directly under normal circumstances because constructing
     * a template in this way, if not done properly, can open up the application to XSS
     * attacks. When using this API, provide a strong DOMPolicy that can properly sanitize
     * and also be sure to manually sanitize all static strings particularly if they can
     * come from user input.
     */
    static create(strings, values, policy) {
      let html2 = "";
      const factories2 = /* @__PURE__ */ Object.create(null);
      const add = (factory) => {
        var _a;
        const id3 = (_a = factory.id) !== null && _a !== void 0 ? _a : factory.id = nextId();
        factories2[id3] = factory;
        return id3;
      };
      for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
        const currentString = strings[i];
        let currentValue = values[i];
        let definition;
        html2 += currentString;
        if (isFunction(currentValue)) {
          currentValue = new HTMLBindingDirective(oneWay(currentValue));
        } else if (currentValue instanceof Binding) {
          currentValue = new HTMLBindingDirective(currentValue);
        } else if (!(definition = HTMLDirective.getForInstance(currentValue))) {
          const staticValue = currentValue;
          currentValue = new HTMLBindingDirective(oneTime(() => staticValue));
        }
        html2 += createHTML2(currentValue, currentString, add, definition);
      }
      return new _ViewTemplate(html2 + strings[strings.length - 1], factories2, policy);
    }
  };
  makeSerializationNoop(ViewTemplate);
  var html = (strings, ...values) => {
    if (Array.isArray(strings) && Array.isArray(strings.raw)) {
      return ViewTemplate.create(strings, values);
    }
    throw FAST.error(
      1206
      /* Message.directCallToHTMLTagNotAllowed */
    );
  };
  html.partial = (html2) => {
    return new InlineTemplateDirective(html2);
  };

  // ../node_modules/@microsoft/fast-element/dist/esm/templating/when.js
  var noTemplate = () => null;
  function normalizeBinding2(value) {
    return value === void 0 ? noTemplate : isFunction(value) ? value : () => value;
  }
  function when(condition, templateOrTemplateBinding, elseTemplateOrTemplateBinding) {
    const dataBinding = isFunction(condition) ? condition : () => condition;
    const templateBinding = normalizeBinding2(templateOrTemplateBinding);
    const elseBinding = normalizeBinding2(elseTemplateOrTemplateBinding);
    return (source, context) => dataBinding(source, context) ? templateBinding(source, context) : elseBinding(source, context);
  }

  // ../node_modules/@microsoft/fast-element/dist/esm/templating/repeat.js
  var defaultRepeatOptions = Object.freeze({
    positioning: false,
    recycle: true
  });
  function bindWithoutPositioning(view, items, index, controller) {
    view.context.parent = controller.source;
    view.context.parentContext = controller.context;
    view.bind(items[index]);
  }
  function bindWithPositioning(view, items, index, controller) {
    view.context.parent = controller.source;
    view.context.parentContext = controller.context;
    view.context.length = items.length;
    view.context.index = index;
    view.bind(items[index]);
  }
  var RepeatBehavior = class {
    /**
     * Creates an instance of RepeatBehavior.
     * @param location - The location in the DOM to render the repeat.
     * @param dataBinding - The array to render.
     * @param isItemsBindingVolatile - Indicates whether the items binding has volatile dependencies.
     * @param templateBinding - The template to render for each item.
     * @param isTemplateBindingVolatile - Indicates whether the template binding has volatile dependencies.
     * @param options - Options used to turn on special repeat features.
     */
    constructor(directive) {
      this.directive = directive;
      this.items = null;
      this.itemsObserver = null;
      this.bindView = bindWithoutPositioning;
      this.views = [];
      this.itemsBindingObserver = directive.dataBinding.createObserver(this, directive);
      this.templateBindingObserver = directive.templateBinding.createObserver(this, directive);
      if (directive.options.positioning) {
        this.bindView = bindWithPositioning;
      }
    }
    /**
     * Bind this behavior.
     * @param controller - The view controller that manages the lifecycle of this behavior.
     */
    bind(controller) {
      this.location = controller.targets[this.directive.targetNodeId];
      this.controller = controller;
      this.items = this.itemsBindingObserver.bind(controller);
      this.template = this.templateBindingObserver.bind(controller);
      this.observeItems(true);
      this.refreshAllViews();
      controller.onUnbind(this);
    }
    /**
     * Unbinds this behavior.
     */
    unbind() {
      if (this.itemsObserver !== null) {
        this.itemsObserver.unsubscribe(this);
      }
      this.unbindAllViews();
    }
    /**
     * Handles changes in the array, its items, and the repeat template.
     * @param source - The source of the change.
     * @param args - The details about what was changed.
     */
    handleChange(source, args) {
      if (args === this.itemsBindingObserver) {
        this.items = this.itemsBindingObserver.bind(this.controller);
        this.observeItems();
        this.refreshAllViews();
      } else if (args === this.templateBindingObserver) {
        this.template = this.templateBindingObserver.bind(this.controller);
        this.refreshAllViews(true);
      } else if (!args[0]) {
        return;
      } else if (args[0].reset) {
        this.refreshAllViews();
      } else {
        this.updateViews(args);
      }
    }
    observeItems(force = false) {
      if (!this.items) {
        this.items = emptyArray;
        return;
      }
      const oldObserver = this.itemsObserver;
      const newObserver = this.itemsObserver = Observable.getNotifier(this.items);
      const hasNewObserver = oldObserver !== newObserver;
      if (hasNewObserver && oldObserver !== null) {
        oldObserver.unsubscribe(this);
      }
      if (hasNewObserver || force) {
        newObserver.subscribe(this);
      }
    }
    updateViews(splices) {
      const views = this.views;
      const bindView = this.bindView;
      const items = this.items;
      const template12 = this.template;
      const controller = this.controller;
      const recycle = this.directive.options.recycle;
      const leftoverViews = [];
      let leftoverIndex = 0;
      let availableViews = 0;
      for (let i = 0, ii = splices.length; i < ii; ++i) {
        const splice = splices[i];
        const removed = splice.removed;
        let removeIndex = 0;
        let addIndex = splice.index;
        const end = addIndex + splice.addedCount;
        const removedViews = views.splice(splice.index, removed.length);
        const totalAvailableViews = availableViews = leftoverViews.length + removedViews.length;
        for (; addIndex < end; ++addIndex) {
          const neighbor = views[addIndex];
          const location = neighbor ? neighbor.firstChild : this.location;
          let view;
          if (recycle && availableViews > 0) {
            if (removeIndex <= totalAvailableViews && removedViews.length > 0) {
              view = removedViews[removeIndex];
              removeIndex++;
            } else {
              view = leftoverViews[leftoverIndex];
              leftoverIndex++;
            }
            availableViews--;
          } else {
            view = template12.create();
          }
          views.splice(addIndex, 0, view);
          bindView(view, items, addIndex, controller);
          view.insertBefore(location);
        }
        if (removedViews[removeIndex]) {
          leftoverViews.push(...removedViews.slice(removeIndex));
        }
      }
      for (let i = leftoverIndex, ii = leftoverViews.length; i < ii; ++i) {
        leftoverViews[i].dispose();
      }
      if (this.directive.options.positioning) {
        for (let i = 0, viewsLength = views.length; i < viewsLength; ++i) {
          const context = views[i].context;
          context.length = viewsLength;
          context.index = i;
        }
      }
    }
    refreshAllViews(templateChanged = false) {
      const items = this.items;
      const template12 = this.template;
      const location = this.location;
      const bindView = this.bindView;
      const controller = this.controller;
      let itemsLength = items.length;
      let views = this.views;
      let viewsLength = views.length;
      if (itemsLength === 0 || templateChanged || !this.directive.options.recycle) {
        HTMLView.disposeContiguousBatch(views);
        viewsLength = 0;
      }
      if (viewsLength === 0) {
        this.views = views = new Array(itemsLength);
        for (let i = 0; i < itemsLength; ++i) {
          const view = template12.create();
          bindView(view, items, i, controller);
          views[i] = view;
          view.insertBefore(location);
        }
      } else {
        let i = 0;
        for (; i < itemsLength; ++i) {
          if (i < viewsLength) {
            const view = views[i];
            bindView(view, items, i, controller);
          } else {
            const view = template12.create();
            bindView(view, items, i, controller);
            views.push(view);
            view.insertBefore(location);
          }
        }
        const removed = views.splice(i, viewsLength - i);
        for (i = 0, itemsLength = removed.length; i < itemsLength; ++i) {
          removed[i].dispose();
        }
      }
    }
    unbindAllViews() {
      const views = this.views;
      for (let i = 0, ii = views.length; i < ii; ++i) {
        views[i].unbind();
      }
    }
  };
  var RepeatDirective = class {
    /**
     * Creates an instance of RepeatDirective.
     * @param dataBinding - The binding that provides the array to render.
     * @param templateBinding - The template binding used to obtain a template to render for each item in the array.
     * @param options - Options used to turn on special repeat features.
     */
    constructor(dataBinding, templateBinding, options) {
      this.dataBinding = dataBinding;
      this.templateBinding = templateBinding;
      this.options = options;
      ArrayObserver.enable();
    }
    /**
     * Creates a placeholder string based on the directive's index within the template.
     * @param index - The index of the directive within the template.
     */
    createHTML(add) {
      return Markup.comment(add(this));
    }
    /**
     * Creates a behavior for the provided target node.
     * @param target - The node instance to create the behavior for.
     */
    createBehavior() {
      return new RepeatBehavior(this);
    }
  };
  HTMLDirective.define(RepeatDirective);
  function repeat(items, template12, options = defaultRepeatOptions) {
    const dataBinding = normalizeBinding(items);
    const templateBinding = normalizeBinding(template12);
    return new RepeatDirective(dataBinding, templateBinding, Object.assign(Object.assign({}, defaultRepeatOptions), options));
  }

  // ../node_modules/@microsoft/fast-element/dist/esm/components/attributes.js
  var booleanMode = "boolean";
  var reflectMode = "reflect";
  var AttributeConfiguration = Object.freeze({
    /**
     * Locates all attribute configurations associated with a type.
     */
    locate: createMetadataLocator()
  });
  var booleanConverter = {
    toView(value) {
      return value ? "true" : "false";
    },
    fromView(value) {
      return value === null || value === void 0 || value === "false" || value === false || value === 0 ? false : true;
    }
  };
  var AttributeDefinition = class _AttributeDefinition {
    /**
     * Creates an instance of AttributeDefinition.
     * @param Owner - The class constructor that owns this attribute.
     * @param name - The name of the property associated with the attribute.
     * @param attribute - The name of the attribute in HTML.
     * @param mode - The {@link AttributeMode} that describes the behavior of this attribute.
     * @param converter - A {@link ValueConverter} that integrates with the property getter/setter
     * to convert values to and from a DOM string.
     */
    constructor(Owner, name, attribute = name.toLowerCase(), mode = reflectMode, converter) {
      this.guards = /* @__PURE__ */ new Set();
      this.Owner = Owner;
      this.name = name;
      this.attribute = attribute;
      this.mode = mode;
      this.converter = converter;
      this.fieldName = `_${name}`;
      this.callbackName = `${name}Changed`;
      this.hasCallback = this.callbackName in Owner.prototype;
      if (mode === booleanMode && converter === void 0) {
        this.converter = booleanConverter;
      }
    }
    /**
     * Sets the value of the attribute/property on the source element.
     * @param source - The source element to access.
     * @param value - The value to set the attribute/property to.
     */
    setValue(source, newValue) {
      const oldValue = source[this.fieldName];
      const converter = this.converter;
      if (converter !== void 0) {
        newValue = converter.fromView(newValue);
      }
      if (oldValue !== newValue) {
        source[this.fieldName] = newValue;
        this.tryReflectToAttribute(source);
        if (this.hasCallback) {
          source[this.callbackName](oldValue, newValue);
        }
        source.$fastController.notify(this.name);
      }
    }
    /**
     * Gets the value of the attribute/property on the source element.
     * @param source - The source element to access.
     */
    getValue(source) {
      Observable.track(source, this.name);
      return source[this.fieldName];
    }
    /** @internal */
    onAttributeChangedCallback(element, value) {
      if (this.guards.has(element)) {
        return;
      }
      this.guards.add(element);
      this.setValue(element, value);
      this.guards.delete(element);
    }
    tryReflectToAttribute(element) {
      const mode = this.mode;
      const guards = this.guards;
      if (guards.has(element) || mode === "fromView") {
        return;
      }
      Updates.enqueue(() => {
        guards.add(element);
        const latestValue = element[this.fieldName];
        switch (mode) {
          case reflectMode:
            const converter = this.converter;
            DOM.setAttribute(element, this.attribute, converter !== void 0 ? converter.toView(latestValue) : latestValue);
            break;
          case booleanMode:
            DOM.setBooleanAttribute(element, this.attribute, latestValue);
            break;
        }
        guards.delete(element);
      });
    }
    /**
     * Collects all attribute definitions associated with the owner.
     * @param Owner - The class constructor to collect attribute for.
     * @param attributeLists - Any existing attributes to collect and merge with those associated with the owner.
     * @internal
     */
    static collect(Owner, ...attributeLists) {
      const attributes = [];
      attributeLists.push(AttributeConfiguration.locate(Owner));
      for (let i = 0, ii = attributeLists.length; i < ii; ++i) {
        const list = attributeLists[i];
        if (list === void 0) {
          continue;
        }
        for (let j = 0, jj = list.length; j < jj; ++j) {
          const config = list[j];
          if (isString(config)) {
            attributes.push(new _AttributeDefinition(Owner, config));
          } else {
            attributes.push(new _AttributeDefinition(Owner, config.property, config.attribute, config.mode, config.converter));
          }
        }
      }
      return attributes;
    }
  };
  function attr(configOrTarget, prop) {
    let config;
    function decorator($target, $prop) {
      if (arguments.length > 1) {
        config.property = $prop;
      }
      AttributeConfiguration.locate($target.constructor).push(config);
    }
    if (arguments.length > 1) {
      config = {};
      decorator(configOrTarget, prop);
      return;
    }
    config = configOrTarget === void 0 ? {} : configOrTarget;
    return decorator;
  }

  // ../node_modules/@microsoft/fast-element/dist/esm/components/fast-definitions.js
  var defaultShadowOptions = { mode: "open" };
  var defaultElementOptions = {};
  var fastElementBaseTypes = /* @__PURE__ */ new Set();
  var fastElementRegistry = FAST.getById(KernelServiceId.elementRegistry, () => createTypeRegistry());
  var FASTElementDefinition = class _FASTElementDefinition {
    constructor(type, nameOrConfig = type.definition) {
      var _a;
      this.platformDefined = false;
      if (isString(nameOrConfig)) {
        nameOrConfig = { name: nameOrConfig };
      }
      this.type = type;
      this.name = nameOrConfig.name;
      this.template = nameOrConfig.template;
      this.registry = (_a = nameOrConfig.registry) !== null && _a !== void 0 ? _a : customElements;
      const proto = type.prototype;
      const attributes = AttributeDefinition.collect(type, nameOrConfig.attributes);
      const observedAttributes = new Array(attributes.length);
      const propertyLookup = {};
      const attributeLookup = {};
      for (let i = 0, ii = attributes.length; i < ii; ++i) {
        const current = attributes[i];
        observedAttributes[i] = current.attribute;
        propertyLookup[current.name] = current;
        attributeLookup[current.attribute] = current;
        Observable.defineProperty(proto, current);
      }
      Reflect.defineProperty(type, "observedAttributes", {
        value: observedAttributes,
        enumerable: true
      });
      this.attributes = attributes;
      this.propertyLookup = propertyLookup;
      this.attributeLookup = attributeLookup;
      this.shadowOptions = nameOrConfig.shadowOptions === void 0 ? defaultShadowOptions : nameOrConfig.shadowOptions === null ? void 0 : Object.assign(Object.assign({}, defaultShadowOptions), nameOrConfig.shadowOptions);
      this.elementOptions = nameOrConfig.elementOptions === void 0 ? defaultElementOptions : Object.assign(Object.assign({}, defaultElementOptions), nameOrConfig.elementOptions);
      this.styles = ElementStyles.normalize(nameOrConfig.styles);
      fastElementRegistry.register(this);
    }
    /**
     * Indicates if this element has been defined in at least one registry.
     */
    get isDefined() {
      return this.platformDefined;
    }
    /**
     * Defines a custom element based on this definition.
     * @param registry - The element registry to define the element in.
     * @remarks
     * This operation is idempotent per registry.
     */
    define(registry3 = this.registry) {
      const type = this.type;
      if (!registry3.get(this.name)) {
        this.platformDefined = true;
        registry3.define(this.name, type, this.elementOptions);
      }
      return this;
    }
    /**
     * Creates an instance of FASTElementDefinition.
     * @param type - The type this definition is being created for.
     * @param nameOrDef - The name of the element to define or a config object
     * that describes the element to define.
     */
    static compose(type, nameOrDef) {
      if (fastElementBaseTypes.has(type) || fastElementRegistry.getByType(type)) {
        return new _FASTElementDefinition(class extends type {
        }, nameOrDef);
      }
      return new _FASTElementDefinition(type, nameOrDef);
    }
    /**
     * Registers a FASTElement base type.
     * @param type - The type to register as a base type.
     * @internal
     */
    static registerBaseType(type) {
      fastElementBaseTypes.add(type);
    }
  };
  FASTElementDefinition.getByType = fastElementRegistry.getByType;
  FASTElementDefinition.getForInstance = fastElementRegistry.getForInstance;

  // ../node_modules/@microsoft/fast-element/dist/esm/components/element-controller.js
  var defaultEventOptions = {
    bubbles: true,
    composed: true,
    cancelable: true
  };
  var isConnectedPropertyName = "isConnected";
  var shadowRoots = /* @__PURE__ */ new WeakMap();
  function getShadowRoot(element) {
    var _a, _b;
    return (_b = (_a = element.shadowRoot) !== null && _a !== void 0 ? _a : shadowRoots.get(element)) !== null && _b !== void 0 ? _b : null;
  }
  var elementControllerStrategy;
  var ElementController = class extends PropertyChangeNotifier {
    /**
     * Creates a Controller to control the specified element.
     * @param element - The element to be controlled by this controller.
     * @param definition - The element definition metadata that instructs this
     * controller in how to handle rendering and other platform integrations.
     * @internal
     */
    constructor(element, definition) {
      super(element);
      this.boundObservables = null;
      this.needsInitialization = true;
      this.hasExistingShadowRoot = false;
      this._template = null;
      this.stage = 3;
      this.guardBehaviorConnection = false;
      this.behaviors = null;
      this._mainStyles = null;
      this.$fastController = this;
      this.view = null;
      this.source = element;
      this.definition = definition;
      const shadowOptions = definition.shadowOptions;
      if (shadowOptions !== void 0) {
        let shadowRoot = element.shadowRoot;
        if (shadowRoot) {
          this.hasExistingShadowRoot = true;
        } else {
          shadowRoot = element.attachShadow(shadowOptions);
          if (shadowOptions.mode === "closed") {
            shadowRoots.set(element, shadowRoot);
          }
        }
      }
      const accessors = Observable.getAccessors(element);
      if (accessors.length > 0) {
        const boundObservables = this.boundObservables = /* @__PURE__ */ Object.create(null);
        for (let i = 0, ii = accessors.length; i < ii; ++i) {
          const propertyName = accessors[i].name;
          const value = element[propertyName];
          if (value !== void 0) {
            delete element[propertyName];
            boundObservables[propertyName] = value;
          }
        }
      }
    }
    /**
     * Indicates whether or not the custom element has been
     * connected to the document.
     */
    get isConnected() {
      Observable.track(this, isConnectedPropertyName);
      return this.stage === 1;
    }
    /**
     * The context the expression is evaluated against.
     */
    get context() {
      var _a, _b;
      return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.context) !== null && _b !== void 0 ? _b : ExecutionContext.default;
    }
    /**
     * Indicates whether the controller is bound.
     */
    get isBound() {
      var _a, _b;
      return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.isBound) !== null && _b !== void 0 ? _b : false;
    }
    /**
     * Indicates how the source's lifetime relates to the controller's lifetime.
     */
    get sourceLifetime() {
      var _a;
      return (_a = this.view) === null || _a === void 0 ? void 0 : _a.sourceLifetime;
    }
    /**
     * Gets/sets the template used to render the component.
     * @remarks
     * This value can only be accurately read after connect but can be set at any time.
     */
    get template() {
      var _a;
      if (this._template === null) {
        const definition = this.definition;
        if (this.source.resolveTemplate) {
          this._template = this.source.resolveTemplate();
        } else if (definition.template) {
          this._template = (_a = definition.template) !== null && _a !== void 0 ? _a : null;
        }
      }
      return this._template;
    }
    set template(value) {
      if (this._template === value) {
        return;
      }
      this._template = value;
      if (!this.needsInitialization) {
        this.renderTemplate(value);
      }
    }
    /**
     * The main set of styles used for the component, independent
     * of any dynamically added styles.
     */
    get mainStyles() {
      var _a;
      if (this._mainStyles === null) {
        const definition = this.definition;
        if (this.source.resolveStyles) {
          this._mainStyles = this.source.resolveStyles();
        } else if (definition.styles) {
          this._mainStyles = (_a = definition.styles) !== null && _a !== void 0 ? _a : null;
        }
      }
      return this._mainStyles;
    }
    set mainStyles(value) {
      if (this._mainStyles === value) {
        return;
      }
      if (this._mainStyles !== null) {
        this.removeStyles(this._mainStyles);
      }
      this._mainStyles = value;
      if (!this.needsInitialization) {
        this.addStyles(value);
      }
    }
    /**
     * Registers an unbind handler with the controller.
     * @param behavior - An object to call when the controller unbinds.
     */
    onUnbind(behavior) {
      var _a;
      (_a = this.view) === null || _a === void 0 ? void 0 : _a.onUnbind(behavior);
    }
    /**
     * Adds the behavior to the component.
     * @param behavior - The behavior to add.
     */
    addBehavior(behavior) {
      var _a, _b;
      const targetBehaviors = (_a = this.behaviors) !== null && _a !== void 0 ? _a : this.behaviors = /* @__PURE__ */ new Map();
      const count = (_b = targetBehaviors.get(behavior)) !== null && _b !== void 0 ? _b : 0;
      if (count === 0) {
        targetBehaviors.set(behavior, 1);
        behavior.addedCallback && behavior.addedCallback(this);
        if (behavior.connectedCallback && !this.guardBehaviorConnection && (this.stage === 1 || this.stage === 0)) {
          behavior.connectedCallback(this);
        }
      } else {
        targetBehaviors.set(behavior, count + 1);
      }
    }
    /**
     * Removes the behavior from the component.
     * @param behavior - The behavior to remove.
     * @param force - Forces removal even if this behavior was added more than once.
     */
    removeBehavior(behavior, force = false) {
      const targetBehaviors = this.behaviors;
      if (targetBehaviors === null) {
        return;
      }
      const count = targetBehaviors.get(behavior);
      if (count === void 0) {
        return;
      }
      if (count === 1 || force) {
        targetBehaviors.delete(behavior);
        if (behavior.disconnectedCallback && this.stage !== 3) {
          behavior.disconnectedCallback(this);
        }
        behavior.removedCallback && behavior.removedCallback(this);
      } else {
        targetBehaviors.set(behavior, count - 1);
      }
    }
    /**
     * Adds styles to this element. Providing an HTMLStyleElement will attach the element instance to the shadowRoot.
     * @param styles - The styles to add.
     */
    addStyles(styles13) {
      var _a;
      if (!styles13) {
        return;
      }
      const source = this.source;
      if (styles13 instanceof HTMLElement) {
        const target = (_a = getShadowRoot(source)) !== null && _a !== void 0 ? _a : this.source;
        target.append(styles13);
      } else if (!styles13.isAttachedTo(source)) {
        const sourceBehaviors = styles13.behaviors;
        styles13.addStylesTo(source);
        if (sourceBehaviors !== null) {
          for (let i = 0, ii = sourceBehaviors.length; i < ii; ++i) {
            this.addBehavior(sourceBehaviors[i]);
          }
        }
      }
    }
    /**
     * Removes styles from this element. Providing an HTMLStyleElement will detach the element instance from the shadowRoot.
     * @param styles - the styles to remove.
     */
    removeStyles(styles13) {
      var _a;
      if (!styles13) {
        return;
      }
      const source = this.source;
      if (styles13 instanceof HTMLElement) {
        const target = (_a = getShadowRoot(source)) !== null && _a !== void 0 ? _a : source;
        target.removeChild(styles13);
      } else if (styles13.isAttachedTo(source)) {
        const sourceBehaviors = styles13.behaviors;
        styles13.removeStylesFrom(source);
        if (sourceBehaviors !== null) {
          for (let i = 0, ii = sourceBehaviors.length; i < ii; ++i) {
            this.removeBehavior(sourceBehaviors[i]);
          }
        }
      }
    }
    /**
     * Runs connected lifecycle behavior on the associated element.
     */
    connect() {
      if (this.stage !== 3) {
        return;
      }
      this.stage = 0;
      if (this.boundObservables !== null) {
        const element = this.source;
        const boundObservables = this.boundObservables;
        const propertyNames = Object.keys(boundObservables);
        for (let i = 0, ii = propertyNames.length; i < ii; ++i) {
          const propertyName = propertyNames[i];
          element[propertyName] = boundObservables[propertyName];
        }
        this.boundObservables = null;
      }
      const behaviors = this.behaviors;
      if (behaviors !== null) {
        this.guardBehaviorConnection = true;
        for (const key of behaviors.keys()) {
          key.connectedCallback && key.connectedCallback(this);
        }
        this.guardBehaviorConnection = false;
      }
      if (this.needsInitialization) {
        this.renderTemplate(this.template);
        this.addStyles(this.mainStyles);
        this.needsInitialization = false;
      } else if (this.view !== null) {
        this.view.bind(this.source);
      }
      this.stage = 1;
      Observable.notify(this, isConnectedPropertyName);
    }
    /**
     * Runs disconnected lifecycle behavior on the associated element.
     */
    disconnect() {
      if (this.stage !== 1) {
        return;
      }
      this.stage = 2;
      Observable.notify(this, isConnectedPropertyName);
      if (this.view !== null) {
        this.view.unbind();
      }
      const behaviors = this.behaviors;
      if (behaviors !== null) {
        for (const key of behaviors.keys()) {
          key.disconnectedCallback && key.disconnectedCallback(this);
        }
      }
      this.stage = 3;
    }
    /**
     * Runs the attribute changed callback for the associated element.
     * @param name - The name of the attribute that changed.
     * @param oldValue - The previous value of the attribute.
     * @param newValue - The new value of the attribute.
     */
    onAttributeChangedCallback(name, oldValue, newValue) {
      const attrDef = this.definition.attributeLookup[name];
      if (attrDef !== void 0) {
        attrDef.onAttributeChangedCallback(this.source, newValue);
      }
    }
    /**
     * Emits a custom HTML event.
     * @param type - The type name of the event.
     * @param detail - The event detail object to send with the event.
     * @param options - The event options. By default bubbles and composed.
     * @remarks
     * Only emits events if connected.
     */
    emit(type, detail, options) {
      if (this.stage === 1) {
        return this.source.dispatchEvent(new CustomEvent(type, Object.assign(Object.assign({ detail }, defaultEventOptions), options)));
      }
      return false;
    }
    renderTemplate(template12) {
      var _a;
      const element = this.source;
      const host = (_a = getShadowRoot(element)) !== null && _a !== void 0 ? _a : element;
      if (this.view !== null) {
        this.view.dispose();
        this.view = null;
      } else if (!this.needsInitialization || this.hasExistingShadowRoot) {
        this.hasExistingShadowRoot = false;
        for (let child = host.firstChild; child !== null; child = host.firstChild) {
          host.removeChild(child);
        }
      }
      if (template12) {
        this.view = template12.render(element, host, element);
        this.view.sourceLifetime = SourceLifetime.coupled;
      }
    }
    /**
     * Locates or creates a controller for the specified element.
     * @param element - The element to return the controller for.
     * @remarks
     * The specified element must have a {@link FASTElementDefinition}
     * registered either through the use of the {@link customElement}
     * decorator or a call to `FASTElement.define`.
     */
    static forCustomElement(element) {
      const controller = element.$fastController;
      if (controller !== void 0) {
        return controller;
      }
      const definition = FASTElementDefinition.getForInstance(element);
      if (definition === void 0) {
        throw FAST.error(
          1401
          /* Message.missingElementDefinition */
        );
      }
      return element.$fastController = new elementControllerStrategy(element, definition);
    }
    /**
     * Sets the strategy that ElementController.forCustomElement uses to construct
     * ElementController instances for an element.
     * @param strategy - The strategy to use.
     */
    static setStrategy(strategy) {
      elementControllerStrategy = strategy;
    }
  };
  makeSerializationNoop(ElementController);
  ElementController.setStrategy(ElementController);
  function normalizeStyleTarget(target) {
    var _a;
    if ("adoptedStyleSheets" in target) {
      return target;
    } else {
      return (_a = getShadowRoot(target)) !== null && _a !== void 0 ? _a : target.getRootNode();
    }
  }
  var AdoptedStyleSheetsStrategy = class _AdoptedStyleSheetsStrategy {
    constructor(styles13) {
      const styleSheetCache = _AdoptedStyleSheetsStrategy.styleSheetCache;
      this.sheets = styles13.map((x) => {
        if (x instanceof CSSStyleSheet) {
          return x;
        }
        let sheet = styleSheetCache.get(x);
        if (sheet === void 0) {
          sheet = new CSSStyleSheet();
          sheet.replaceSync(x);
          styleSheetCache.set(x, sheet);
        }
        return sheet;
      });
    }
    addStylesTo(target) {
      addAdoptedStyleSheets(normalizeStyleTarget(target), this.sheets);
    }
    removeStylesFrom(target) {
      removeAdoptedStyleSheets(normalizeStyleTarget(target), this.sheets);
    }
  };
  AdoptedStyleSheetsStrategy.styleSheetCache = /* @__PURE__ */ new Map();
  var id2 = 0;
  var nextStyleId = () => `fast-${++id2}`;
  function usableStyleTarget(target) {
    return target === document ? document.body : target;
  }
  var StyleElementStrategy = class {
    constructor(styles13) {
      this.styles = styles13;
      this.styleClass = nextStyleId();
    }
    addStylesTo(target) {
      target = usableStyleTarget(normalizeStyleTarget(target));
      const styles13 = this.styles;
      const styleClass = this.styleClass;
      for (let i = 0; i < styles13.length; i++) {
        const element = document.createElement("style");
        element.innerHTML = styles13[i];
        element.className = styleClass;
        target.append(element);
      }
    }
    removeStylesFrom(target) {
      target = usableStyleTarget(normalizeStyleTarget(target));
      const styles13 = target.querySelectorAll(`.${this.styleClass}`);
      for (let i = 0, ii = styles13.length; i < ii; ++i) {
        target.removeChild(styles13[i]);
      }
    }
  };
  var addAdoptedStyleSheets = (target, sheets) => {
    target.adoptedStyleSheets = [...target.adoptedStyleSheets, ...sheets];
  };
  var removeAdoptedStyleSheets = (target, sheets) => {
    target.adoptedStyleSheets = target.adoptedStyleSheets.filter((x) => sheets.indexOf(x) === -1);
  };
  if (ElementStyles.supportsAdoptedStyleSheets) {
    try {
      document.adoptedStyleSheets.push();
      document.adoptedStyleSheets.splice();
      addAdoptedStyleSheets = (target, sheets) => {
        target.adoptedStyleSheets.push(...sheets);
      };
      removeAdoptedStyleSheets = (target, sheets) => {
        for (const sheet of sheets) {
          const index = target.adoptedStyleSheets.indexOf(sheet);
          if (index !== -1) {
            target.adoptedStyleSheets.splice(index, 1);
          }
        }
      };
    } catch (e) {
    }
    ElementStyles.setDefaultStrategy(AdoptedStyleSheetsStrategy);
  } else {
    ElementStyles.setDefaultStrategy(StyleElementStrategy);
  }

  // ../node_modules/@microsoft/fast-element/dist/esm/components/fast-element.js
  function createFASTElement(BaseType) {
    const type = class extends BaseType {
      constructor() {
        super();
        ElementController.forCustomElement(this);
      }
      $emit(type2, detail, options) {
        return this.$fastController.emit(type2, detail, options);
      }
      connectedCallback() {
        this.$fastController.connect();
      }
      disconnectedCallback() {
        this.$fastController.disconnect();
      }
      attributeChangedCallback(name, oldValue, newValue) {
        this.$fastController.onAttributeChangedCallback(name, oldValue, newValue);
      }
    };
    FASTElementDefinition.registerBaseType(type);
    return type;
  }
  function compose(type, nameOrDef) {
    if (isFunction(type)) {
      return FASTElementDefinition.compose(type, nameOrDef);
    }
    return FASTElementDefinition.compose(this, type);
  }
  function define(type, nameOrDef) {
    if (isFunction(type)) {
      return FASTElementDefinition.compose(type, nameOrDef).define().type;
    }
    return FASTElementDefinition.compose(this, type).define().type;
  }
  function from(BaseType) {
    return createFASTElement(BaseType);
  }
  var FASTElement = Object.assign(createFASTElement(HTMLElement), {
    /**
     * Creates a new FASTElement base class inherited from the
     * provided base type.
     * @param BaseType - The base element type to inherit from.
     */
    from,
    /**
     * Defines a platform custom element based on the provided type and definition.
     * @param type - The custom element type to define.
     * @param nameOrDef - The name of the element to define or a definition object
     * that describes the element to define.
     */
    define,
    /**
     * Defines metadata for a FASTElement which can be used to later define the element.
     * @public
     */
    compose
  });
  function customElement(nameOrDef) {
    return function(type) {
      define(type, nameOrDef);
    };
  }

  // ../node_modules/@microsoft/fast-element/dist/esm/metadata.js
  var metadataByTarget = /* @__PURE__ */ new Map();
  if (!("metadata" in Reflect)) {
    Reflect.metadata = function(key, value) {
      return function(target) {
        Reflect.defineMetadata(key, value, target);
      };
    };
    Reflect.defineMetadata = function(key, value, target) {
      let metadata = metadataByTarget.get(target);
      if (metadata === void 0) {
        metadataByTarget.set(target, metadata = /* @__PURE__ */ new Map());
      }
      metadata.set(key, value);
    };
    Reflect.getOwnMetadata = function(key, target) {
      const metadata = metadataByTarget.get(target);
      if (metadata !== void 0) {
        return metadata.get(key);
      }
      return void 0;
    };
  }
  var annotationParamTypesKey = "annotation:paramtypes";
  var designParamTypesKey = "design:paramtypes";
  var Metadata = Object.freeze({
    /**
     * Gets the "design:paramtypes" metadata for the specified type.
     * @param Type - The type to get the metadata for.
     * @returns The metadata array or a frozen empty array if no metadata is found.
     */
    getDesignParamTypes: (Type) => {
      var _a;
      return (_a = Reflect.getOwnMetadata(designParamTypesKey, Type)) !== null && _a !== void 0 ? _a : emptyArray;
    },
    /**
     * Gets the "annotation:paramtypes" metadata for the specified type.
     * @param Type - The type to get the metadata for.
     * @returns The metadata array or a frozen empty array if no metadata is found.
     */
    getAnnotationParamTypes: (Type) => {
      var _a;
      return (_a = Reflect.getOwnMetadata(annotationParamTypesKey, Type)) !== null && _a !== void 0 ? _a : emptyArray;
    },
    /**
     * Gets the "annotation:paramtypes" metadata for the specified type. If none is found,
     * an empty, mutable metadata array is created and added.
     * @param Type - The type to get or create the metadata for.
     * @returns A mutable metadata array.
     */
    getOrCreateAnnotationParamTypes(Type) {
      let types = this.getAnnotationParamTypes(Type);
      if (types === emptyArray) {
        Reflect.defineMetadata(annotationParamTypesKey, types = [], Type);
      }
      return types;
    }
  });

  // ../node_modules/@microsoft/fast-element/dist/esm/context.js
  var contextsByName = /* @__PURE__ */ new Map();
  var contextEventType = "context-request";
  var requestStrategy;
  var Context = Object.freeze({
    /**
     * The event type used for W3C Context Protocol requests.
     */
    eventType: contextEventType,
    /**
     * Returns a FASTContext object from the global context registry matching the given name if found.
     * Otherwise, returns a new FASTContext with this name.
     * @param name - The name of the FASTContext to get or create.
     * @returns A FASTContext object.
     */
    for(name) {
      let c = contextsByName.get(name);
      if (c === void 0) {
        c = Context.create(name);
        contextsByName.set(name, c);
      }
      return c;
    },
    /**
     * Creates a W3C Community Protocol-based Context object to use in requesting/providing
     * context through the DOM.
     * @param name - The name to use for the connext. Useful in debugging.
     * @param initialValue - An optional initial value to use if a context handler isn't found.
     */
    create(name, initialValue) {
      const Interface = function(target, property, index) {
        if (target == null || new.target !== void 0) {
          throw FAST.error(1501, {
            name: Interface.name
          });
        }
        if (property) {
          Context.defineProperty(target, property, Interface);
        } else {
          const types = Metadata.getOrCreateAnnotationParamTypes(target);
          types[index] = Interface;
        }
      };
      Interface.$isInterface = true;
      Interface.initialValue = initialValue;
      Reflect.defineProperty(Interface, "name", { value: name });
      Interface.handle = (target, callback) => Context.handle(target, callback, Interface);
      Interface.provide = (target, value) => Context.provide(target, Interface, value);
      Interface.get = (target) => Context.get(target, Interface);
      Interface.request = (target, callback, multiple) => Context.request(target, Interface, callback, multiple);
      Interface.toString = () => `Context<${Interface.name}>`;
      return Interface;
    },
    /**
     * Sets the strategy used by all FAST-specific context requests made through the
     * Context.request, Context.get, Context.defineProperty, and ContextDecorator APIs.
     * @param strategy - The strategy to use. By default, the strategy is Context.dispatch.
     */
    setDefaultRequestStrategy(strategy) {
      requestStrategy = strategy;
    },
    /**
     * Gets the context value for the target node or returns the initial value if
     * a context handler is not found.
     * @param target - The target to get the context for.
     * @param context - The context to locate.
     * @returns The context value.
     * @remarks
     * Uses the default request strategy to locate the context. If no context is found
     * then the initial value of the context is returned.
     */
    get(target, context) {
      var _a;
      let value;
      requestStrategy(target, context, (found) => value = found, false);
      return (_a = value) !== null && _a !== void 0 ? _a : context.initialValue;
    },
    /**
     * Requests the context value for the target node.
     * @param target - The target to request the context for.
     * @param context - The context to locate.
     * @param callback - A callback to invoke with the context value.
     * @param multiple - Whether the context requestor expects to handle updates
     * to the context value after the initial request.
     * @remarks
     * Uses the default request strategy to locate the context.
     */
    request(target, context, callback, multiple = false) {
      requestStrategy(target, context, callback, multiple);
    },
    /**
     *
     * @param target - The target to dispatch the context event on.
     * @param context - The context to locate.
     * @param callback - The callback to invoke with the context value.
     * @param multiple - Whether the context requestor expects to handle updates
     * to the context value after the initial request.
     * @remarks
     * This API does NOT use the default request strategy. It always dispatches
     * an event through the DOM.
     */
    dispatch(target, context, callback, multiple = false) {
      target.dispatchEvent(new ContextEvent(context, callback, multiple));
    },
    /**
     * Enables an event target to provide a context value.
     * @param target The target to provide the context value for.
     * @param context The context to provide the value for.
     * @param value The value to provide for the context.
     */
    provide(target, context, value) {
      Context.handle(target, (event) => {
        event.stopImmediatePropagation();
        event.callback(value);
      }, context);
    },
    /**
     *
     * @param target - The target on which to handle context requests.
     * @param callback - The callback to invoke when a context request is received.
     * @param context - The context to handle requests for.
     * @remarks
     * If a context is not provided then the callback will be invoked for all context
     * requests that are received on the target.
     */
    handle(target, callback, context) {
      if (context) {
        target.addEventListener(contextEventType, (event) => {
          if (event.context === context) {
            callback(event);
          }
        });
      } else {
        target.addEventListener(contextEventType, callback);
      }
    },
    /**
     * Defines a getter-only property on the target that will return the context
     * value for the target.
     * @param target The target to define the property on.
     * @param propertyName The name of the property to define.
     * @param context The context that will be used to retrieve the property value.
     * @remarks
     * Uses the default request strategy to locate the context and will return the
     * initialValue if the context isn't handled.
     */
    defineProperty(target, propertyName, context) {
      const field = Symbol.for(`fast:di:${propertyName}`);
      Reflect.defineProperty(target, propertyName, {
        get: function() {
          var _a;
          return (_a = this[field]) !== null && _a !== void 0 ? _a : this[field] = Context.get(this, context);
        }
      });
    }
  });
  Context.setDefaultRequestStrategy(Context.dispatch);
  var ContextEvent = class extends Event {
    constructor(context, callback, multiple) {
      super(contextEventType, { bubbles: true, composed: true });
      this.context = context;
      this.callback = callback;
      this.multiple = multiple;
    }
  };

  // ../node_modules/@microsoft/fast-element/dist/esm/di/di.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ResolverBuilder = class {
    /**
     *
     * @param container - The container to create resolvers for.
     * @param key - The key to register resolvers under.
     */
    constructor(container, key) {
      this.container = container;
      this.key = key;
    }
    /**
     * Creates a resolver for an existing object instance.
     * @param value - The instance to resolve.
     * @returns The resolver.
     */
    instance(value) {
      return this.registerResolver(0, value);
    }
    /**
     * Creates a resolver that enforces a singleton lifetime.
     * @param value - The type to create and cache the singleton for.
     * @returns The resolver.
     */
    singleton(value) {
      return this.registerResolver(1, value);
    }
    /**
     * Creates a resolver that creates a new instance for every dependency request.
     * @param value - The type to create instances of.
     * @returns - The resolver.
     */
    transient(value) {
      return this.registerResolver(2, value);
    }
    /**
     * Creates a resolver that invokes a callback function for every dependency resolution
     * request, allowing custom logic to return the dependency.
     * @param value - The callback to call during resolution.
     * @returns The resolver.
     */
    callback(value) {
      return this.registerResolver(3, value);
    }
    /**
     * Creates a resolver that invokes a callback function the first time that a dependency
     * resolution is requested. The returned value is then cached and provided for all
     * subsequent requests.
     * @param value - The callback to call during the first resolution.
     * @returns The resolver.
     */
    cachedCallback(value) {
      return this.registerResolver(3, cacheCallbackResult(value));
    }
    /**
     * Aliases the current key to a different key.
     * @param destinationKey - The key to point the alias to.
     * @returns The resolver.
     */
    aliasTo(destinationKey) {
      return this.registerResolver(5, destinationKey);
    }
    registerResolver(strategy, state) {
      const { container, key } = this;
      this.container = this.key = void 0;
      return container.registerResolver(key, new ResolverImpl(key, strategy, state));
    }
  };
  function cloneArrayWithPossibleProps(source) {
    const clone = source.slice();
    const keys = Object.keys(source);
    const len = keys.length;
    let key;
    for (let i = 0; i < len; ++i) {
      key = keys[i];
      if (!isArrayIndex(key)) {
        clone[key] = source[key];
      }
    }
    return clone;
  }
  var DefaultResolver = Object.freeze({
    /**
     * Disables auto-registration and throws for all un-registered dependencies.
     * @param key - The key to create the resolver for.
     */
    none(key) {
      throw FAST.error(1512, { key });
    },
    /**
     * Provides default singleton resolution behavior during auto-registration.
     * @param key - The key to create the resolver for.
     * @returns The resolver.
     */
    singleton(key) {
      return new ResolverImpl(key, 1, key);
    },
    /**
     * Provides default transient resolution behavior during auto-registration.
     * @param key - The key to create the resolver for.
     * @returns The resolver.
     */
    transient(key) {
      return new ResolverImpl(key, 2, key);
    }
  });
  var ContainerConfiguration = Object.freeze({
    /**
     * The default configuration used when creating a DOM-disconnected container.
     * @remarks
     * The default creates a root container, with no parent container. It does not handle
     * owner requests and it uses singleton resolution behavior for auto-registration.
     */
    default: Object.freeze({
      parentLocator: () => null,
      asyncRegistrationLocator: () => __awaiter(void 0, void 0, void 0, function* () {
        return null;
      }),
      responsibleForOwnerRequests: false,
      defaultResolver: DefaultResolver.singleton
    })
  });
  function createContext(nameConfigOrCallback, configuror) {
    const configure = typeof nameConfigOrCallback === "function" ? nameConfigOrCallback : configuror;
    const friendlyName = typeof nameConfigOrCallback === "string" ? nameConfigOrCallback : nameConfigOrCallback && "friendlyName" in nameConfigOrCallback ? nameConfigOrCallback.friendlyName || defaultFriendlyName : defaultFriendlyName;
    const respectConnection = typeof nameConfigOrCallback === "string" ? false : nameConfigOrCallback && "respectConnection" in nameConfigOrCallback ? nameConfigOrCallback.respectConnection || false : false;
    const Interface = function(target, property, index) {
      if (target == null || new.target !== void 0) {
        throw FAST.error(1501, { name: Interface.name });
      }
      if (property) {
        DI.defineProperty(target, property, Interface, respectConnection);
      } else {
        const annotationParamtypes = Metadata.getOrCreateAnnotationParamTypes(target);
        annotationParamtypes[index] = Interface;
      }
    };
    Interface.$isInterface = true;
    Reflect.defineProperty(Interface, "name", {
      value: friendlyName !== null && friendlyName !== void 0 ? friendlyName : defaultFriendlyName
    });
    if (configure != null) {
      Interface.register = function(container, key) {
        return configure(new ResolverBuilder(container, key !== null && key !== void 0 ? key : Interface));
      };
    }
    Interface.toString = function toString() {
      return `DIContext<${Interface.name}>`;
    };
    return Interface;
  }
  var dependencyLookup = /* @__PURE__ */ new Map();
  var rootDOMContainer = null;
  var nonRootDOMContainerCount = 0;
  var DI = Object.freeze({
    /**
     * Installs dependency injection as the default strategy for handling
     * all calls to Context.request.
     * @param fallback - Creates a container if one cannot be found.
     */
    installAsContextRequestStrategy(fallback) {
      Context.setDefaultRequestStrategy((target, context, callback) => {
        const container = DI.findResponsibleContainer(target, fallback);
        callback(container.get(context));
      });
    },
    /**
     * Creates a new dependency injection container.
     * @param config - The configuration for the container.
     * @returns A newly created dependency injection container.
     */
    createContainer(config) {
      return new ContainerImpl(null, Object.assign({}, ContainerConfiguration.default, config));
    },
    /**
     * Finds the dependency injection container responsible for providing dependencies
     * to the specified node.
     * @param target - The node to find the responsible container for.
     * @param fallback - Creates a container if one cannot be found.
     * @returns The container responsible for providing dependencies to the node.
     * @remarks
     * This will be the same as the parent container if the specified node
     * does not itself host a container configured with responsibleForOwnerRequests.
     */
    findResponsibleContainer(target, fallback) {
      const owned = target.$$container$$;
      if (owned && owned.responsibleForOwnerRequests) {
        return owned;
      }
      return DI.findParentContainer(target, fallback);
    },
    /**
     * Find the dependency injection container up the DOM tree from this node.
     * @param target - The node to find the parent container for.
     * @param fallback - Creates a container if one cannot be found.
     * @returns The parent container of this node.
     * @remarks
     * This will be the same as the responsible container if the specified node
     * does not itself host a container configured with responsibleForOwnerRequests.
     */
    findParentContainer(target, fallback) {
      if (nonRootDOMContainerCount < 1) {
        return fallback ? fallback() : DI.getOrCreateDOMContainer();
      }
      let container;
      Context.dispatch(target, DOMContainer, (value) => container = value);
      return container !== null && container !== void 0 ? container : fallback ? fallback() : DI.getOrCreateDOMContainer();
    },
    /**
     * Returns a dependency injection container if one is explicitly owned by the specified
     * node. If one is not owned, then a new container is created and assigned to the node.
     * @param target - The node to find or create the container for.
     * @param config - The configuration for the container if one needs to be created.
     * @returns The located or created container.
     * @remarks
     * This API does not search for a responsible or parent container. It looks only for a container
     * directly defined on the specified node and creates one at that location if one does not
     * already exist.
     */
    getOrCreateDOMContainer(target, config) {
      if (!target) {
        return rootDOMContainer || (rootDOMContainer = new ContainerImpl(typeof window !== "undefined" ? window : null, Object.assign({}, ContainerConfiguration.default, config, {
          parentLocator: () => null
        })));
      }
      let container = target.$$container$$;
      if (container === void 0) {
        nonRootDOMContainerCount++;
        container = new ContainerImpl(target, Object.assign({}, ContainerConfiguration.default, config, {
          parentLocator: DI.findParentContainer
        }));
      }
      return container;
    },
    /**
     * Gets the dependency keys representing what is needed to instantiate the specified type.
     * @param Type - The type to get the dependencies for.
     * @returns An array of dependency keys.
     */
    getDependencies(Type) {
      let dependencies = dependencyLookup.get(Type);
      if (dependencies === void 0) {
        const inject2 = Type.inject;
        if (inject2 === void 0) {
          const designParamtypes = Metadata.getDesignParamTypes(Type);
          const annotationParamtypes = Metadata.getAnnotationParamTypes(Type);
          if (designParamtypes === emptyArray) {
            if (annotationParamtypes === emptyArray) {
              const Proto = Object.getPrototypeOf(Type);
              if (typeof Proto === "function" && Proto !== Function.prototype) {
                dependencies = cloneArrayWithPossibleProps(DI.getDependencies(Proto));
              } else {
                dependencies = [];
              }
            } else {
              dependencies = cloneArrayWithPossibleProps(annotationParamtypes);
            }
          } else if (annotationParamtypes === emptyArray) {
            dependencies = cloneArrayWithPossibleProps(designParamtypes);
          } else {
            dependencies = cloneArrayWithPossibleProps(designParamtypes);
            let len = annotationParamtypes.length;
            let auAnnotationParamtype;
            for (let i = 0; i < len; ++i) {
              auAnnotationParamtype = annotationParamtypes[i];
              if (auAnnotationParamtype !== void 0) {
                dependencies[i] = auAnnotationParamtype;
              }
            }
            const keys = Object.keys(annotationParamtypes);
            len = keys.length;
            let key;
            for (let i = 0; i < len; ++i) {
              key = keys[i];
              if (!isArrayIndex(key)) {
                dependencies[key] = annotationParamtypes[key];
              }
            }
          }
        } else {
          dependencies = cloneArrayWithPossibleProps(inject2);
        }
        dependencyLookup.set(Type, dependencies);
      }
      return dependencies;
    },
    /**
     * Defines a property on a web component class. The value of this property will
     * be resolved from the dependency injection container responsible for the element
     * instance, based on where it is connected in the DOM.
     * @param target - The target to define the property on.
     * @param propertyName - The name of the property to define.
     * @param key - The dependency injection key.
     * @param respectConnection - Indicates whether or not to update the property value if the
     * hosting component is disconnected and then re-connected at a different location in the DOM.
     * @remarks
     * The respectConnection option is only applicable to elements that descend from FASTElement.
     */
    defineProperty(target, propertyName, key, respectConnection = false) {
      const field = Symbol.for(`fast:di:${propertyName}`);
      Reflect.defineProperty(target, propertyName, {
        get: function() {
          let value = this[field];
          if (value === void 0) {
            const container = this instanceof Node ? DI.findResponsibleContainer(this) : DI.getOrCreateDOMContainer();
            value = container.get(key);
            this[field] = value;
            if (respectConnection) {
              const notifier = this.$fastController;
              if (!notifier) {
                throw FAST.error(
                  1514
                  /* Message.connectUpdateRequiresController */
                );
              }
              const handleChange2 = () => {
                const newContainer = DI.findResponsibleContainer(this);
                const newValue = newContainer.get(key);
                const oldValue = this[field];
                if (newValue !== oldValue) {
                  this[field] = value;
                  notifier.notify(propertyName);
                }
              };
              notifier.subscribe({ handleChange: handleChange2 }, "isConnected");
            }
          }
          return value;
        }
      });
    },
    /**
     * Creates a dependency injection key.
     * @param nameConfigOrCallback - A friendly name for the key or a lambda that configures a
     * default resolution for the dependency.
     * @param configuror - If a friendly name was provided for the first parameter, then an optional
     * lambda that configures a default resolution for the dependency can be provided second.
     * @returns The created key.
     * @remarks
     * The created key can be used as a property decorator or constructor parameter decorator,
     * in addition to its standard use in an inject array or through direct container APIs.
     */
    createContext,
    /**
     * A decorator that specifies what to inject into its target.
     * @param dependencies - The dependencies to inject.
     * @returns The decorator to be applied to the target class.
     * @remarks
     * The decorator can be used to decorate a class, listing all of the classes dependencies.
     * Or it can be used to decorate a constructor parameter, indicating what to inject for that
     * parameter.
     * Or it can be used for a web component property, indicating what that property should resolve to.
     */
    inject(...dependencies) {
      return function(target, key, descriptor) {
        if (typeof descriptor === "number") {
          const annotationParamtypes = Metadata.getOrCreateAnnotationParamTypes(target);
          const dep = dependencies[0];
          if (dep !== void 0) {
            annotationParamtypes[descriptor] = dep;
          }
        } else if (key) {
          DI.defineProperty(target, key, dependencies[0]);
        } else {
          const annotationParamtypes = descriptor ? Metadata.getOrCreateAnnotationParamTypes(descriptor.value) : Metadata.getOrCreateAnnotationParamTypes(target);
          let dep;
          for (let i = 0; i < dependencies.length; ++i) {
            dep = dependencies[i];
            if (dep !== void 0) {
              annotationParamtypes[i] = dep;
            }
          }
        }
      };
    },
    /**
     * Registers the `target` class as a transient dependency; each time the dependency is resolved
     * a new instance will be created.
     *
     * @param target - The class / constructor function to register as transient.
     * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
     *
     * @example
     * On an existing class
     * ```ts
     * class Foo { }
     * DI.transient(Foo);
     * ```
     *
     * @example
     * Inline declaration
     *
     * ```ts
     * const Foo = DI.transient(class { });
     * // Foo is now strongly typed with register
     * Foo.register(container);
     * ```
     *
     * @public
     */
    transient(target) {
      target.register = function register(container) {
        const registration = Registration.transient(target, target);
        return registration.register(container);
      };
      target.registerInRequestor = false;
      return target;
    },
    /**
     * Registers the `target` class as a singleton dependency; the class will only be created once. Each
     * consecutive time the dependency is resolved, the same instance will be returned.
     *
     * @param target - The class / constructor function to register as a singleton.
     * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
     * @example
     * On an existing class
     * ```ts
     * class Foo { }
     * DI.singleton(Foo);
     * ```
     *
     * @example
     * Inline declaration
     * ```ts
     * const Foo = DI.singleton(class { });
     * // Foo is now strongly typed with register
     * Foo.register(container);
     * ```
     *
     * @public
     */
    singleton(target, options = defaultSingletonOptions) {
      target.register = function register(container) {
        const registration = Registration.singleton(target, target);
        return registration.register(container);
      };
      target.registerInRequestor = options.scoped;
      return target;
    }
  });
  var Container = DI.createContext("Container");
  var DOMContainer = Container;
  function createResolver(getter) {
    return function(key) {
      const resolver = function(target, property, descriptor) {
        DI.inject(resolver)(target, property, descriptor);
      };
      resolver.$isResolver = true;
      resolver.resolve = function(handler, requestor) {
        return getter(key, handler, requestor);
      };
      return resolver;
    };
  }
  var inject = DI.inject;
  var defaultSingletonOptions = { scoped: false };
  function createAllResolver(getter) {
    return function(key, searchAncestors) {
      searchAncestors = !!searchAncestors;
      const resolver = function(target, property, descriptor) {
        DI.inject(resolver)(target, property, descriptor);
      };
      resolver.$isResolver = true;
      resolver.resolve = function(handler, requestor) {
        return getter(key, handler, requestor, searchAncestors);
      };
      return resolver;
    };
  }
  var all = createAllResolver((key, handler, requestor, searchAncestors) => requestor.getAll(key, searchAncestors));
  var lazy = createResolver((key, handler, requestor) => {
    return () => requestor.get(key);
  });
  var optional = createResolver((key, handler, requestor) => {
    if (requestor.has(key, true)) {
      return requestor.get(key);
    } else {
      return void 0;
    }
  });
  function ignore(target, property, descriptor) {
    DI.inject(ignore)(target, property, descriptor);
  }
  ignore.$isResolver = true;
  ignore.resolve = () => void 0;
  var newInstanceForScope = createResolver((key, handler, requestor) => {
    const instance = createNewInstance(key, handler);
    const resolver = new ResolverImpl(key, 0, instance);
    requestor.registerResolver(key, resolver);
    return instance;
  });
  var newInstanceOf = createResolver((key, handler, _requestor) => createNewInstance(key, handler));
  function createNewInstance(key, handler) {
    return handler.getFactory(key).construct(handler);
  }
  var ResolverImpl = class {
    constructor(key, strategy, state) {
      this.key = key;
      this.strategy = strategy;
      this.state = state;
      this.resolving = false;
    }
    get $isResolver() {
      return true;
    }
    register(container) {
      return container.registerResolver(this.key, this);
    }
    resolveAsync(handler, requestor) {
      switch (this.strategy) {
        case 1: {
          if (this.resolving) {
            throw FAST.error(1513, { name: this.state.name });
          }
          this.resolving = true;
          return handler.getFactory(this.state).constructAsync(requestor).then((instance) => {
            this.state = instance;
            this.strategy = 0;
            this.resolving = false;
            return instance;
          });
        }
        case 2: {
          const factory = handler.getFactory(this.state);
          if (factory === null) {
            throw FAST.error(1502, { key: this.key });
          }
          return factory.constructAsync(requestor);
        }
        default:
          return Promise.resolve(this.resolve(handler, requestor));
      }
    }
    resolve(handler, requestor) {
      switch (this.strategy) {
        case 0:
          return this.state;
        case 1: {
          if (this.resolving) {
            throw FAST.error(1513, { name: this.state.name });
          }
          this.resolving = true;
          this.state = handler.getFactory(this.state).construct(requestor);
          this.strategy = 0;
          this.resolving = false;
          return this.state;
        }
        case 2: {
          const factory = handler.getFactory(this.state);
          if (factory === null) {
            throw FAST.error(1502, { key: this.key });
          }
          return factory.construct(requestor);
        }
        case 3:
          return this.state(handler, requestor, this);
        case 4:
          return this.state[0].resolve(handler, requestor);
        case 5:
          return requestor.get(this.state);
        default:
          throw FAST.error(1503, {
            strategy: this.strategy
          });
      }
    }
    getFactory(container) {
      var _a, _b, _c;
      switch (this.strategy) {
        case 1:
        case 2:
          return container.getFactory(this.state);
        case 5:
          return (_c = (_b = (_a = container.getResolver(this.state)) === null || _a === void 0 ? void 0 : _a.getFactory) === null || _b === void 0 ? void 0 : _b.call(_a, container)) !== null && _c !== void 0 ? _c : null;
        default:
          return null;
      }
    }
  };
  function containerGetKey(d) {
    return this.get(d);
  }
  function transformInstance(inst, transform) {
    return transform(inst);
  }
  var FactoryImpl = class {
    constructor(Type, dependencies) {
      this.Type = Type;
      this.dependencies = dependencies;
      this.transformers = null;
    }
    constructAsync(container, dynamicDependencies) {
      return __awaiter(this, void 0, void 0, function* () {
        const resolved = yield Promise.all(this.dependencies.map((x) => container.getAsync(x)));
        return this.constructCore(resolved, dynamicDependencies);
      });
    }
    construct(container, dynamicDependencies) {
      const resolved = this.dependencies.map(containerGetKey, container);
      return this.constructCore(resolved, dynamicDependencies);
    }
    constructCore(resolved, dynamicDependencies) {
      let instance;
      if (dynamicDependencies === void 0) {
        instance = new this.Type(...resolved);
      } else {
        instance = new this.Type(...resolved, ...dynamicDependencies);
      }
      if (this.transformers === null) {
        return instance;
      }
      return this.transformers.reduce(transformInstance, instance);
    }
    registerTransformer(transformer) {
      (this.transformers || (this.transformers = [])).push(transformer);
    }
  };
  var containerResolver = {
    $isResolver: true,
    resolve(handler, requestor) {
      return requestor;
    },
    resolveAsync: function(handler, requestor) {
      return Promise.resolve(requestor);
    }
  };
  function isRegistry(obj) {
    return typeof obj.register === "function";
  }
  function isSelfRegistry(obj) {
    return isRegistry(obj) && typeof obj.registerInRequestor === "boolean";
  }
  function isRegisterInRequester(obj) {
    return isSelfRegistry(obj) && obj.registerInRequestor;
  }
  function isClass(obj) {
    return obj.prototype !== void 0;
  }
  var InstrinsicTypeNames = /* @__PURE__ */ new Set([
    "Array",
    "ArrayBuffer",
    "Boolean",
    "DataView",
    "Date",
    "Error",
    "EvalError",
    "Float32Array",
    "Float64Array",
    "Function",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Map",
    "Number",
    "Object",
    "Promise",
    "RangeError",
    "ReferenceError",
    "RegExp",
    "Set",
    "SharedArrayBuffer",
    "String",
    "SyntaxError",
    "TypeError",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "URIError",
    "WeakMap",
    "WeakSet"
  ]);
  var factories = /* @__PURE__ */ new Map();
  var ContainerImpl = class _ContainerImpl {
    constructor(owner, config) {
      this.owner = owner;
      this.config = config;
      this._parent = void 0;
      this.registerDepth = 0;
      this.isHandlingContextRequests = false;
      this.resolvers = /* @__PURE__ */ new Map();
      this.resolvers.set(Container, containerResolver);
      if (owner) {
        owner.$$container$$ = this;
        if ("addEventListener" in owner) {
          Context.handle(owner, (e) => {
            if (this.isHandlingContextRequests) {
              try {
                const value = this.get(e.context);
                e.stopImmediatePropagation();
                e.callback(value);
              } catch (_a) {
              }
            } else if (e.context === Container && e.composedPath()[0] !== this.owner) {
              e.stopImmediatePropagation();
              e.callback(this);
            }
          });
        }
      }
    }
    get parent() {
      if (this._parent === void 0) {
        this._parent = this.config.parentLocator(this.owner);
      }
      return this._parent;
    }
    get depth() {
      return this.parent === null ? 0 : this.parent.depth + 1;
    }
    get responsibleForOwnerRequests() {
      return this.config.responsibleForOwnerRequests;
    }
    handleContextRequests(enable) {
      this.isHandlingContextRequests = enable;
    }
    register(...params) {
      if (++this.registerDepth === 100) {
        throw FAST.error(
          1504
          /* Message.cannotAutoregisterDependency */
        );
      }
      let current;
      let keys;
      let value;
      let j;
      let jj;
      for (let i = 0, ii = params.length; i < ii; ++i) {
        current = params[i];
        if (!isObject(current)) {
          continue;
        }
        if (isRegistry(current)) {
          current.register(this);
        } else if (isClass(current)) {
          Registration.singleton(current, current).register(this);
        } else {
          keys = Object.keys(current);
          j = 0;
          jj = keys.length;
          for (; j < jj; ++j) {
            value = current[keys[j]];
            if (!isObject(value)) {
              continue;
            }
            if (isRegistry(value)) {
              value.register(this);
            } else {
              this.register(value);
            }
          }
        }
      }
      --this.registerDepth;
      return this;
    }
    registerResolver(key, resolver) {
      validateKey(key);
      const resolvers = this.resolvers;
      const result = resolvers.get(key);
      if (result == null) {
        resolvers.set(key, resolver);
      } else if (result instanceof ResolverImpl && result.strategy === 4) {
        result.state.push(resolver);
      } else {
        resolvers.set(key, new ResolverImpl(key, 4, [result, resolver]));
      }
      return resolver;
    }
    registerTransformer(key, transformer) {
      const resolver = this.getResolver(key);
      if (resolver == null) {
        return false;
      }
      if (resolver.getFactory) {
        const factory = resolver.getFactory(this);
        if (factory == null) {
          return false;
        }
        factory.registerTransformer(transformer);
        return true;
      }
      return false;
    }
    getResolver(key, autoRegister = true) {
      validateKey(key);
      if (key.resolve !== void 0) {
        return key;
      }
      let current = this;
      let resolver;
      while (current != null) {
        resolver = current.resolvers.get(key);
        if (resolver == null) {
          if (current.parent == null) {
            const handler = isRegisterInRequester(key) ? this : current;
            return autoRegister ? this.jitRegister(key, handler) : null;
          }
          current = current.parent;
        } else {
          return resolver;
        }
      }
      return null;
    }
    has(key, searchAncestors = false) {
      return this.resolvers.has(key) ? true : searchAncestors && this.parent != null ? this.parent.has(key, true) : false;
    }
    getAsync(key) {
      return __awaiter(this, void 0, void 0, function* () {
        validateKey(key);
        if (key.$isResolver) {
          return key.resolveAsync(this, this);
        }
        let current = this;
        let resolver;
        while (current != null) {
          resolver = current.resolvers.get(key);
          if (resolver == null) {
            if (current.parent == null) {
              const registration = yield this.config.asyncRegistrationLocator(key);
              if (!registration) {
                throw FAST.error(1505, { key });
              }
              const handler = isRegisterInRequester(key) ? this : current;
              resolver = registration.register(handler);
              return resolver.resolveAsync(current, this);
            }
            current = current.parent;
          } else {
            return resolver.resolveAsync(current, this);
          }
        }
        throw FAST.error(1505, { key });
      });
    }
    get(key) {
      validateKey(key);
      if (key.$isResolver) {
        return key.resolve(this, this);
      }
      let current = this;
      let resolver;
      while (current != null) {
        resolver = current.resolvers.get(key);
        if (resolver == null) {
          if (current.parent == null) {
            const handler = isRegisterInRequester(key) ? this : current;
            resolver = this.jitRegister(key, handler);
            return resolver.resolve(current, this);
          }
          current = current.parent;
        } else {
          return resolver.resolve(current, this);
        }
      }
      throw FAST.error(1505, { key });
    }
    getAll(key, searchAncestors = false) {
      validateKey(key);
      const requestor = this;
      let current = requestor;
      let resolver;
      if (searchAncestors) {
        let resolutions = emptyArray;
        while (current != null) {
          resolver = current.resolvers.get(key);
          if (resolver != null) {
            resolutions = resolutions.concat(
              /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
              buildAllResponse(resolver, current, requestor)
            );
          }
          current = current.parent;
        }
        return resolutions;
      } else {
        while (current != null) {
          resolver = current.resolvers.get(key);
          if (resolver == null) {
            current = current.parent;
            if (current == null) {
              return emptyArray;
            }
          } else {
            return buildAllResponse(resolver, current, requestor);
          }
        }
      }
      return emptyArray;
    }
    getFactory(Type) {
      let factory = factories.get(Type);
      if (factory === void 0) {
        if (isNativeFunction(Type)) {
          throw FAST.error(1506, {
            name: Type.name
          });
        }
        factories.set(Type, factory = new FactoryImpl(Type, DI.getDependencies(Type)));
      }
      return factory;
    }
    registerFactory(key, factory) {
      factories.set(key, factory);
    }
    createChild(config) {
      return new _ContainerImpl(null, Object.assign({}, this.config, config, { parentLocator: () => this }));
    }
    jitRegister(keyAsValue, handler) {
      if (typeof keyAsValue !== "function") {
        throw FAST.error(1507, {
          value: keyAsValue
        });
      }
      if (InstrinsicTypeNames.has(keyAsValue.name)) {
        throw FAST.error(1508, {
          value: keyAsValue.name
        });
      }
      if (isRegistry(keyAsValue)) {
        const registrationResolver = keyAsValue.register(handler);
        if (!(registrationResolver instanceof Object) || registrationResolver.resolve == null) {
          const newResolver = handler.resolvers.get(keyAsValue);
          if (newResolver != void 0) {
            return newResolver;
          }
          throw FAST.error(
            1510
            /* Message.invalidResolver */
          );
        }
        return registrationResolver;
      } else if (keyAsValue.$isInterface) {
        throw FAST.error(1509, {
          value: keyAsValue.name
        });
      } else {
        const resolver = this.config.defaultResolver(keyAsValue, handler);
        handler.resolvers.set(keyAsValue, resolver);
        return resolver;
      }
    }
  };
  var cache = /* @__PURE__ */ new WeakMap();
  function cacheCallbackResult(fun) {
    return function(handler, requestor, resolver) {
      if (cache.has(resolver)) {
        return cache.get(resolver);
      }
      const t = fun(handler, requestor, resolver);
      cache.set(resolver, t);
      return t;
    };
  }
  var Registration = Object.freeze({
    /**
     * Allows you to pass an instance.
     * Every time you request this {@link Key} you will get this instance back.
     *
     * @example
     * ```
     * Registration.instance(Foo, new Foo()));
     * ```
     *
     * @param key - The key to register the instance under.
     * @param value - The instance to return when the key is requested.
     */
    instance(key, value) {
      return new ResolverImpl(key, 0, value);
    },
    /**
     * Creates an instance from the class.
     * Every time you request this {@link Key} you will get the same one back.
     *
     * @example
     * ```
     * Registration.singleton(Foo, Foo);
     * ```
     *
     * @param key - The key to register the singleton under.
     * @param value - The class to instantiate as a singleton when first requested.
     */
    singleton(key, value) {
      return new ResolverImpl(key, 1, value);
    },
    /**
     * Creates an instance from a class.
     * Every time you request this {@link Key} you will get a new instance.
     *
     * @example
     * ```
     * Registration.instance(Foo, Foo);
     * ```
     *
     * @param key - The key to register the instance type under.
     * @param value - The class to instantiate each time the key is requested.
     */
    transient(key, value) {
      return new ResolverImpl(key, 2, value);
    },
    /**
     * Delegates to a callback function to provide the dependency.
     * Every time you request this {@link Key} the callback will be invoked to provide
     * the dependency.
     *
     * @example
     * ```
     * Registration.callback(Foo, () => new Foo());
     * Registration.callback(Bar, (c: Container) => new Bar(c.get(Foo)));
     * ```
     *
     * @param key - The key to register the callback for.
     * @param callback - The function that is expected to return the dependency.
     */
    callback(key, callback) {
      return new ResolverImpl(key, 3, callback);
    },
    /**
     * Delegates to a callback function to provide the dependency and then caches the
     * dependency for future requests.
     *
     * @example
     * ```
     * Registration.cachedCallback(Foo, () => new Foo());
     * Registration.cachedCallback(Bar, (c: Container) => new Bar(c.get(Foo)));
     * ```
     *
     * @param key - The key to register the callback for.
     * @param callback - The function that is expected to return the dependency.
     * @remarks
     * If you pass the same Registration to another container, the same cached value will be used.
     * Should all references to the resolver returned be removed, the cache will expire.
     */
    cachedCallback(key, callback) {
      return new ResolverImpl(key, 3, cacheCallbackResult(callback));
    },
    /**
     * Creates an alternate {@link Key} to retrieve an instance by.
     *
     * @example
     * ```
     * Register.singleton(Foo, Foo)
     * Register.aliasTo(Foo, MyFoos);
     *
     * container.getAll(MyFoos) // contains an instance of Foo
     * ```
     *
     * @param originalKey - The original key that has been registered.
     * @param aliasKey - The alias to the original key.
     */
    aliasTo(originalKey, aliasKey) {
      return new ResolverImpl(aliasKey, 5, originalKey);
    }
  });
  function validateKey(key) {
    if (key === null || key === void 0) {
      throw FAST.error(
        1511
        /* Message.invalidKey */
      );
    }
  }
  function buildAllResponse(resolver, handler, requestor) {
    if (resolver instanceof ResolverImpl && resolver.strategy === 4) {
      const state = resolver.state;
      let i = state.length;
      const results = new Array(i);
      while (i--) {
        results[i] = state[i].resolve(handler, requestor);
      }
      return results;
    }
    return [resolver.resolve(handler, requestor)];
  }
  var defaultFriendlyName = "(anonymous)";
  function isObject(value) {
    return typeof value === "object" && value !== null || typeof value === "function";
  }
  var isNativeFunction = /* @__PURE__ */ function() {
    const lookup = /* @__PURE__ */ new WeakMap();
    let isNative = false;
    let sourceText = "";
    let i = 0;
    return function(fn) {
      isNative = lookup.get(fn);
      if (isNative === void 0) {
        sourceText = fn.toString();
        i = sourceText.length;
        isNative = // 29 is the length of 'function () { [native code] }' which is the smallest length of a native function string
        i >= 29 && // 100 seems to be a safe upper bound of the max length of a native function. In Chrome and FF it's 56, in Edge it's 61.
        i <= 100 && // This whole heuristic *could* be tricked by a comment. Do we need to care about that?
        sourceText.charCodeAt(i - 1) === 125 && // }
        // TODO: the spec is a little vague about the precise constraints, so we do need to test this across various browsers to make sure just one whitespace is a safe assumption.
        sourceText.charCodeAt(i - 2) <= 32 && // whitespace
        sourceText.charCodeAt(i - 3) === 93 && // ]
        sourceText.charCodeAt(i - 4) === 101 && // e
        sourceText.charCodeAt(i - 5) === 100 && // d
        sourceText.charCodeAt(i - 6) === 111 && // o
        sourceText.charCodeAt(i - 7) === 99 && // c
        sourceText.charCodeAt(i - 8) === 32 && //
        sourceText.charCodeAt(i - 9) === 101 && // e
        sourceText.charCodeAt(i - 10) === 118 && // v
        sourceText.charCodeAt(i - 11) === 105 && // i
        sourceText.charCodeAt(i - 12) === 116 && // t
        sourceText.charCodeAt(i - 13) === 97 && // a
        sourceText.charCodeAt(i - 14) === 110 && // n
        sourceText.charCodeAt(i - 15) === 88;
        lookup.set(fn, isNative);
      }
      return isNative;
    };
  }();
  var isNumericLookup = {};
  function isArrayIndex(value) {
    switch (typeof value) {
      case "number":
        return value >= 0 && (value | 0) === value;
      case "string": {
        const result = isNumericLookup[value];
        if (result !== void 0) {
          return result;
        }
        const length = value.length;
        if (length === 0) {
          return isNumericLookup[value] = false;
        }
        let ch = 0;
        for (let i = 0; i < length; ++i) {
          ch = value.charCodeAt(i);
          if (i === 0 && ch === 48 && length > 1 || ch < 48 || ch > 57) {
            return isNumericLookup[value] = false;
          }
        }
        return isNumericLookup[value] = true;
      }
      default:
        return false;
    }
  }

  // src/services/prototypeService.ts
  var PrototypeService = class {
    constructor() {
      this.os = "windows";
    }
  };
  __decorateClass([
    observable
  ], PrototypeService.prototype, "os", 2);

  // ../../phoenixui/packages/themes/dist/index.esm.js
  var win11BorderRadius = {
    borderRadiusLayerApp: "8px",
    borderRadiusLayerBase: "8px",
    borderRadiusLayerCard: "8px",
    borderRadiusLayerDialog: "8px",
    borderRadiusLayerFlyout: "8px",
    borderRadiusLayerPill: "99px"
  };
  var win11BorderRadiusOverrides = {
    borderRadiusLarge: "8px"
  };
  var win10BorderRadius = {
    ...win11BorderRadius,
    borderRadiusLayerBase: "0px"
  };
  var win10BorderRadiusOverrides = {
    ...win11BorderRadiusOverrides
  };
  var winNXTBorderRadius = {
    borderRadiusLayerApp: "12px",
    borderRadiusLayerBase: "16px",
    borderRadiusLayerCard: "12px",
    borderRadiusLayerDialog: "12px",
    borderRadiusLayerFlyout: "12px",
    borderRadiusLayerPill: "99px"
  };
  var winNXTBorderRadiusOverrides = {
    borderRadiusMedium: "8px",
    borderRadiusLarge: "8px",
    borderRadiusXLarge: "8px"
  };
  var macBorderRadius = {
    ...win11BorderRadius,
    borderRadiusLayerApp: "12px",
    borderRadiusLayerBase: "16px"
  };
  var macBorderRadiusOverrides = {
    ...win11BorderRadiusOverrides
  };
  var brandVariants = {
    10: "#151B29",
    20: "#1A2338",
    30: "#202E4F",
    40: "#243966",
    50: "#264587",
    60: "#2551A8",
    70: "#235CCF",
    80: "#2169EB",
    // light primary
    90: "#3275F0",
    100: "#4082F5",
    110: "#4D8DFA",
    // dark primary
    120: "#69A1FA",
    130: "#86B3FC",
    140: "#A7C9FC",
    150: "#C4DCFF",
    160: "#E0EDFF"
  };
  var lightThemeColors = {
    colorBrandForeground1Hover: brandVariants[70],
    colorBrandForeground1Pressed: brandVariants[60],
    colorBrandForeground1Selected: brandVariants[80],
    colorBrandForeground2Selected: brandVariants[70],
    colorBrandStroke: brandVariants[80],
    colorBrandStrokeHover: brandVariants[70],
    colorBrandStrokePressed: brandVariants[60],
    colorLabelBerry: "#C239B3",
    colorLabelBlue: "#296EEB",
    colorLabelBrass: "#986F0B",
    colorLabelHotPink: "#E3008C",
    colorLabelMink: "#706D6B",
    colorLabelPumpkin: "#CA5010",
    colorLabelPurple: "#8230FF",
    colorLabelRoyalBlue: "#004E8C",
    colorLabelTeal: "#038387",
    colorLayerBackgroundApp: "#FFFFFF80",
    colorLayerBackgroundBase: "#FFFFFF80",
    colorLayerBackgroundCard: "#FFFFFF80",
    colorLayerBackgroundDialog: "#FFFFFF",
    colorLayerBackgroundTooltip: "#FFFFFF",
    colorLayerBackgroundTooltipStaticInverted: "#333333",
    colorLayerStrokeBase: "#75757566",
    colorLayerStrokeFlyout: "#0000000F",
    colorNeutralBackgroundFloating: "#FFFFFF",
    colorNeutralBackgroundFloatingDisabled: "#F0F0F0",
    colorNeutralBackgroundFloatingHover: "#F5F5F5",
    colorNeutralBackgroundFloatingPressed: "#E0E0E0",
    colorNeutralBackgroundFloatingSelected: "#F0F0F0",
    colorNeutralBackgroundTabActive: "#FFFFFFD9",
    colorNeutralBackgroundTabHover: "#0000000D",
    colorNeutralForegroundDisabledOnBrand: "#FFFFFF85",
    colorNeutralForegroundHint: "#0000008F",
    colorNeutralForegroundOnLabel: "#FFFFFF"
  };
  var lightThemeSolidColors = {
    colorLayerBackgroundApp: "#FAFAFA",
    colorLayerBackgroundBase: "#F0F0F0",
    colorLayerBackgroundCard: "#FFFFFF"
  };
  var lightThemeColorOverrides = {
    colorBrandForeground2Pressed: brandVariants[40],
    colorNeutralBackground1: "#FFFFFFB3",
    colorNeutralBackground1Hover: "#0000000A",
    colorNeutralBackground1Pressed: "#0000001F",
    colorNeutralBackground1Selected: "#00000014",
    colorNeutralBackground2: "#00000005",
    colorNeutralBackground2Hover: "#0000000F",
    colorNeutralBackground2Pressed: "#00000024",
    colorNeutralBackground2Selected: "#00000019",
    colorNeutralBackground3: "#0000000A",
    colorNeutralBackground3Hover: "#00000014",
    colorNeutralBackground3Pressed: "#00000029",
    colorNeutralBackground3Selected: "#0000001F",
    colorNeutralBackground4: "#0000000F",
    colorNeutralBackground5: "#00000014",
    colorNeutralBackgroundDisabled: "#0000000F",
    colorNeutralForeground1: "#000000DB",
    colorNeutralForeground1Hover: "#000000DB",
    colorNeutralForeground1Pressed: "#000000DB",
    colorNeutralForeground1Selected: "#000000DB",
    colorNeutralForeground2: "#000000BD",
    colorNeutralForeground2Hover: "#000000DB",
    colorNeutralForeground2Pressed: "#000000DB",
    colorNeutralForeground2Selected: "#000000DB",
    colorNeutralForeground3: "#0000009e",
    colorNeutralForeground3Hover: "#0000009e",
    colorNeutralForeground3Pressed: "#0000009e",
    colorNeutralForeground3Selected: "#0000009e",
    colorNeutralForeground4: "#0000008F",
    colorNeutralForegroundDisabled: "#00000042",
    colorNeutralForegroundInvertedDisabled: "#FFFFFF66",
    colorNeutralForegroundStaticInverted: "#FFFFFF",
    colorNeutralStroke1: "#0000002E",
    colorNeutralStroke1Hover: "#00000038",
    colorNeutralStroke1Pressed: "#0000004C",
    colorNeutralStroke1Selected: "#00000042",
    colorNeutralStroke2: "#0000001F",
    colorNeutralStroke3: "#0000000F",
    colorNeutralStrokeAccessible: "#0000009E",
    colorNeutralStrokeAccessibleHover: "#000000A8",
    colorNeutralStrokeAccessiblePressed: "#000000B2",
    colorNeutralStrokeDisabled: "#0000001F",
    colorNeutralStrokeInvertedDisabled: "#FFFFFF66",
    colorNeutralStrokeOnBrand: "#FFFFFF",
    colorNeutralStrokeOnBrand2: "#FFFFFF",
    colorNeutralStrokeOnBrand2Hover: "#FFFFFF",
    colorNeutralStrokeOnBrand2Pressed: "#FFFFFF",
    colorNeutralStrokeOnBrand2Selected: "#FFFFFF",
    colorStrokeFocus1: "#FFFFFF",
    colorSubtleBackground: "#00000000",
    colorSubtleBackgroundHover: "#0000000A",
    colorSubtleBackgroundPressed: "#00000006",
    colorSubtleBackgroundSelected: "#00000014"
  };
  var darkThemeColors = {
    colorBrandForeground1Hover: brandVariants[120],
    colorBrandForeground1Pressed: brandVariants[130],
    colorBrandForeground1Selected: brandVariants[110],
    colorBrandForeground2Selected: brandVariants[120],
    colorBrandStroke: brandVariants[110],
    colorBrandStrokeHover: brandVariants[120],
    colorBrandStrokePressed: brandVariants[130],
    colorLabelBerry: "#CF87DA",
    colorLabelBlue: "#69A1FA",
    colorLabelBrass: "#C1A256",
    colorLabelHotPink: "#EE5FB7",
    colorLabelMink: "#84817E",
    colorLabelPumpkin: "#DF8E64",
    colorLabelPurple: "#B696FF",
    colorLabelRoyalBlue: "#4A89BA",
    colorLabelTeal: "#4CB4B7",
    colorLayerBackgroundApp: "#3A3A3A4D",
    colorLayerBackgroundBase: "#3A3A3A5E",
    colorLayerBackgroundCard: "#FFFFFF0D",
    colorLayerBackgroundDialog: "#292929",
    colorLayerBackgroundTooltip: "#292929",
    colorLayerBackgroundTooltipStaticInverted: "#3D3D3D",
    colorLayerStrokeBase: "#75757566",
    colorLayerStrokeFlyout: "#00000033",
    colorNeutralBackgroundTabActive: "#FFFFFF22",
    colorNeutralBackgroundTabHover: "#FFFFFF0F",
    colorNeutralForegroundDisabledOnBrand: "#FFFFFF3D",
    colorNeutralForegroundHint: "#FFFFFF85",
    colorNeutralForegroundOnLabel: "#000000e5",
    colorNeutralBackgroundFloating: "#292929",
    colorNeutralBackgroundFloatingHover: "#3D3D3D",
    colorNeutralBackgroundFloatingPressed: "#1F1F1F",
    colorNeutralBackgroundFloatingSelected: "#1F1F1F",
    colorNeutralBackgroundFloatingDisabled: "#141414"
  };
  var darkThemeSolidColors = {
    colorLayerBackgroundCard: "#292929",
    colorLayerBackgroundApp: "#1F1F1F",
    colorLayerBackgroundBase: "#0A0A0A"
  };
  var darkThemeColorOverrides = {
    colorBrandBackground2: brandVariants[40],
    colorBrandForeground1: brandVariants[110],
    colorBrandForeground2: brandVariants[120],
    colorBrandForeground2Pressed: brandVariants[110],
    colorBrandForegroundLink: brandVariants[110],
    colorBrandForegroundLinkHover: brandVariants[120],
    colorBrandForegroundLinkSelected: brandVariants[110],
    colorNeutralBackground1: "#FFFFFF0B",
    colorNeutralBackground1Hover: "#FFFFFF22",
    colorNeutralBackground1Pressed: "#FFFFFF00",
    colorNeutralBackground1Selected: "#FFFFFF1C",
    colorNeutralBackground2: "#3A3A3A4D",
    colorNeutralBackground2Hover: "#3A3A3ABF",
    colorNeutralBackground2Pressed: "#3A3A3A57",
    colorNeutralBackground2Selected: "#3A3A3AC9",
    colorNeutralBackground3: "#3A3A3A4D",
    colorNeutralBackground3Hover: "#3A3A3AB3",
    colorNeutralBackground3Pressed: "#3A3A3A2E",
    colorNeutralBackground3Selected: "#3A3A3A9E",
    colorNeutralBackground4: "#3A3A3A2E",
    colorNeutralBackgroundDisabled: "#3A3A3A4D",
    colorNeutralForeground1: "#FFFFFF",
    colorNeutralForeground1Hover: "#FFFFFF",
    colorNeutralForeground1Pressed: "#FFFFFF",
    colorNeutralForeground1Selected: "#FFFFFF",
    colorNeutralForeground2: "#FFFFFFD6",
    colorNeutralForeground2Hover: "#FFFFFF",
    colorNeutralForeground2Pressed: "#FFFFFF",
    colorNeutralForeground2Selected: "#FFFFFF",
    colorNeutralForeground3: "#FFFFFFAD",
    colorNeutralForeground3Hover: "#FFFFFFD6",
    colorNeutralForeground3Pressed: "#FFFFFFD6",
    colorNeutralForeground3Selected: "#FFFFFFD6",
    colorNeutralForeground4: "#FFFFFF85",
    colorNeutralForegroundDisabled: "#FFFFFF3D",
    colorNeutralForegroundInvertedDisabled: "#FFFFFF66",
    colorNeutralForegroundStaticInverted: "#FFFFFF",
    colorNeutralStroke1: "#FFFFFF49",
    colorNeutralStroke1Hover: "#FFFFFF75",
    colorNeutralStroke1Pressed: "#FFFFFF6B",
    colorNeutralStroke1Selected: "#FFFFFF70",
    colorNeutralStroke2: "#FFFFFF31",
    colorNeutralStroke3: "#FFFFFF3D",
    colorNeutralStrokeAccessible: "#FFFFFF",
    colorNeutralStrokeAccessibleHover: "#FFFFFF",
    colorNeutralStrokeAccessiblePressed: "#FFFFFF",
    colorNeutralStrokeDisabled: "#FFFFFF42",
    colorNeutralStrokeOnBrand2: "#FFFFFF",
    colorNeutralStrokeOnBrand2Hover: "#FFFFFF",
    colorNeutralStrokeOnBrand2Pressed: "#FFFFFF",
    colorNeutralStrokeOnBrand2Selected: "#FFFFFF",
    colorStrokeFocus2: "#FFFFFF",
    colorSubtleBackground: "#FFFFFF00",
    colorSubtleBackgroundHover: "#FFFFFF10",
    colorSubtleBackgroundPressed: "#FFFFFF0B",
    colorSubtleBackgroundSelected: "#FFFFFF22"
  };
  var lightThemeMaterials = {
    acrylicBackdropFilter: "blur(30px) saturate(150%)",
    acrylicBackgroundBlendMode: "luminosity",
    acrylicBackgroundColor: "#F0F0F0B9",
    acrylicBackgroundImage: "none",
    micaBackdropFilter: "blur(120px) saturate(150%)",
    micaBackgroundBlendMode: "luminosity",
    micaBackgroundColor: "#F0F0F0B9",
    micaBackgroundImage: "none",
    micaInactiveBackgroundColor: "#E5E5E5D9"
  };
  var lightThemeSolidMaterials = {
    acrylicBackdropFilter: "none",
    acrylicBackgroundBlendMode: "normal",
    acrylicBackgroundColor: "#F5F5F5",
    acrylicBackgroundImage: "none",
    micaBackdropFilter: "none",
    micaBackgroundBlendMode: "normal",
    micaBackgroundColor: "#F0F0F0",
    micaBackgroundImage: "none",
    micaInactiveBackgroundColor: "#F3F3F3"
  };
  var darkThemeMaterials = {
    acrylicBackdropFilter: "blur(30px) saturate(150%)",
    acrylicBackgroundBlendMode: "color, luminosity",
    acrylicBackgroundColor: "#141414B9",
    acrylicBackgroundImage: "linear-gradient(0deg, #2C2C2C26, #2C2C2C26), none",
    micaBackdropFilter: "blur(120px) saturate(150%)",
    micaBackgroundBlendMode: "color, luminosity",
    micaBackgroundColor: "#141414B9",
    micaBackgroundImage: "linear-gradient(0deg, #2C2C2C26, #2C2C2C26), none",
    micaInactiveBackgroundColor: "#202020D9"
  };
  var darkThemeSolidMaterials = {
    acrylicBackdropFilter: "none",
    acrylicBackgroundBlendMode: "normal",
    acrylicBackgroundColor: "#141414",
    acrylicBackgroundImage: "none",
    micaBackdropFilter: "none",
    micaBackgroundBlendMode: "normal",
    micaBackgroundColor: "#0A0A0A",
    micaBackgroundImage: "none",
    micaInactiveBackgroundColor: "#202020"
  };
  var lightThemeShadows = {
    shadowBaseX: "0px",
    shadowDiffuseX: "0px",
    shadow2BaseY: "0px",
    shadow2BaseBlur: "2px",
    shadow2DiffuseY: "1px",
    shadow2DiffuseBlur: "2px",
    shadow4BaseY: "0px",
    shadow4BaseBlur: "2px",
    shadow4DiffuseY: "2px",
    shadow4DiffuseBlur: "4px",
    shadow8BaseY: "0px",
    shadow8BaseBlur: "2px",
    shadow8DiffuseY: "4px",
    shadow8DiffuseBlur: "8px",
    shadow16BaseY: "0px",
    shadow16BaseBlur: "8px",
    shadow16DiffuseY: "8px",
    shadow16DiffuseBlur: "16px",
    shadow28BaseY: "0px",
    shadow28BaseBlur: "8px",
    shadow28DiffuseY: "14px",
    shadow28DiffuseBlur: "28px",
    shadow64BaseY: "0px",
    shadow64BaseBlur: "8px",
    shadow64DiffuseY: "32px",
    shadow64DiffuseBlur: "64px",
    shadowBaseLayer: "0px 2px 21px 0px rgba(0, 0, 0, 0.22), 0px 32px 64px 0px rgba(0, 0, 0, 0.28)",
    shadowBaseLayerInactive: "0px 2px 10.67px 0px rgba(0, 0, 0, 0.15), 0px 16px 32px 0px rgba(0, 0, 0, 0.19)",
    shadowBaseLayerBaseY: "2px",
    shadowBaseLayerBaseBlur: "21px",
    shadowBaseLayerDiffuseY: "32px",
    shadowBaseLayerDiffuseBlur: "64px"
  };
  var darkThemeShadows = {
    shadowBaseX: "0px",
    shadowDiffuseX: "0px",
    shadow2BaseY: "0px",
    shadow2BaseBlur: "2px",
    shadow2DiffuseY: "1px",
    shadow2DiffuseBlur: "2px",
    shadow4BaseY: "0px",
    shadow4BaseBlur: "2px",
    shadow4DiffuseY: "2px",
    shadow4DiffuseBlur: "4px",
    shadow8BaseY: "0px",
    shadow8BaseBlur: "2px",
    shadow8DiffuseY: "4px",
    shadow8DiffuseBlur: "8px",
    shadow16BaseY: "0px",
    shadow16BaseBlur: "8px",
    shadow16DiffuseY: "8px",
    shadow16DiffuseBlur: "16px",
    shadow28BaseY: "0px",
    shadow28BaseBlur: "8px",
    shadow28DiffuseY: "14px",
    shadow28DiffuseBlur: "28px",
    shadow64BaseY: "0px",
    shadow64BaseBlur: "8px",
    shadow64DiffuseY: "32px",
    shadow64DiffuseBlur: "64px",
    shadowBaseLayer: "0px 2px 21px 0px rgba(0, 0, 0, 0.55), 0px 32px 64px 0px rgba(0, 0, 0, 0.56)",
    shadowBaseLayerInactive: "0px 2px 10.67px 0px rgba(0, 0, 0, 0.37), 0px 16px 32px 0px rgba(0, 0, 0, 0.37)",
    shadowBaseLayerBaseY: "2px",
    shadowBaseLayerBaseBlur: "21px",
    shadowBaseLayerDiffuseY: "32px",
    shadowBaseLayerDiffuseBlur: "64px"
  };
  var grey = {
    "2": "#050505",
    "4": "#0a0a0a",
    "6": "#0f0f0f",
    "8": "#141414",
    "10": "#1a1a1a",
    "12": "#1f1f1f",
    "14": "#242424",
    "16": "#292929",
    "18": "#2e2e2e",
    "20": "#333333",
    "22": "#383838",
    "24": "#3d3d3d",
    "26": "#424242",
    "28": "#474747",
    "30": "#4d4d4d",
    "32": "#525252",
    "34": "#575757",
    "36": "#5c5c5c",
    "38": "#616161",
    "40": "#666666",
    "42": "#6b6b6b",
    "44": "#707070",
    "46": "#757575",
    "48": "#7a7a7a",
    "50": "#808080",
    "52": "#858585",
    "54": "#8a8a8a",
    "56": "#8f8f8f",
    "58": "#949494",
    "60": "#999999",
    "62": "#9e9e9e",
    "64": "#a3a3a3",
    "66": "#a8a8a8",
    "68": "#adadad",
    "70": "#b3b3b3",
    "72": "#b8b8b8",
    "74": "#bdbdbd",
    "76": "#c2c2c2",
    "78": "#c7c7c7",
    "80": "#cccccc",
    "82": "#d1d1d1",
    "84": "#d6d6d6",
    "86": "#dbdbdb",
    "88": "#e0e0e0",
    "90": "#e6e6e6",
    "92": "#ebebeb",
    "94": "#f0f0f0",
    "96": "#f5f5f5",
    "98": "#fafafa"
  };
  var whiteAlpha = {
    "5": "rgba(255, 255, 255, 0.05)",
    "10": "rgba(255, 255, 255, 0.1)",
    "20": "rgba(255, 255, 255, 0.2)",
    "30": "rgba(255, 255, 255, 0.3)",
    "40": "rgba(255, 255, 255, 0.4)",
    "50": "rgba(255, 255, 255, 0.5)",
    "60": "rgba(255, 255, 255, 0.6)",
    "70": "rgba(255, 255, 255, 0.7)",
    "80": "rgba(255, 255, 255, 0.8)",
    "90": "rgba(255, 255, 255, 0.9)"
  };
  var blackAlpha = {
    "5": "rgba(0, 0, 0, 0.05)",
    "10": "rgba(0, 0, 0, 0.1)",
    "20": "rgba(0, 0, 0, 0.2)",
    "30": "rgba(0, 0, 0, 0.3)",
    "40": "rgba(0, 0, 0, 0.4)",
    "50": "rgba(0, 0, 0, 0.5)",
    "60": "rgba(0, 0, 0, 0.6)",
    "70": "rgba(0, 0, 0, 0.7)",
    "80": "rgba(0, 0, 0, 0.8)",
    "90": "rgba(0, 0, 0, 0.9)"
  };
  var grey10Alpha = {
    "5": "rgba(26, 26, 26, 0.05)",
    "10": "rgba(26, 26, 26, 0.1)",
    "20": "rgba(26, 26, 26, 0.2)",
    "30": "rgba(26, 26, 26, 0.3)",
    "40": "rgba(26, 26, 26, 0.4)",
    "50": "rgba(26, 26, 26, 0.5)",
    "60": "rgba(26, 26, 26, 0.6)",
    "70": "rgba(26, 26, 26, 0.7)",
    "80": "rgba(26, 26, 26, 0.8)",
    "90": "rgba(26, 26, 26, 0.9)"
  };
  var grey12Alpha = {
    "5": "rgba(31, 31, 31, 0.05)",
    "10": "rgba(31, 31, 31, 0.1)",
    "20": "rgba(31, 31, 31, 0.2)",
    "30": "rgba(31, 31, 31, 0.3)",
    "40": "rgba(31, 31, 31, 0.4)",
    "50": "rgba(31, 31, 31, 0.5)",
    "60": "rgba(31, 31, 31, 0.6)",
    "70": "rgba(31, 31, 31, 0.7)",
    "80": "rgba(31, 31, 31, 0.8)",
    "90": "rgba(31, 31, 31, 0.9)"
  };
  var grey14Alpha = {
    "5": "rgba(36, 36, 36, 0.05)",
    "10": "rgba(36, 36, 36, 0.1)",
    "20": "rgba(36, 36, 36, 0.2)",
    "30": "rgba(36, 36, 36, 0.3)",
    "40": "rgba(36, 36, 36, 0.4)",
    "50": "rgba(36, 36, 36, 0.5)",
    "60": "rgba(36, 36, 36, 0.6)",
    "70": "rgba(36, 36, 36, 0.7)",
    "80": "rgba(36, 36, 36, 0.8)",
    "90": "rgba(36, 36, 36, 0.9)"
  };
  var white = "#ffffff";
  var black = "#000000";
  var hcHighlight = "#1aebff";
  var hcCanvas = "#000000";
  var hcCanvasText = "#ffffff";
  var darkRed = {
    shade50: "#130204",
    shade40: "#230308",
    shade30: "#420610",
    shade20: "#590815",
    shade10: "#690a19",
    primary: "#750b1c",
    tint10: "#861b2c",
    tint20: "#962f3f",
    tint30: "#ac4f5e",
    tint40: "#d69ca5",
    tint50: "#e9c7cd",
    tint60: "#f9f0f2"
  };
  var cranberry = {
    shade50: "#200205",
    shade40: "#3b0509",
    shade30: "#6e0811",
    shade20: "#960b18",
    shade10: "#b10e1c",
    primary: "#c50f1f",
    tint10: "#cc2635",
    tint20: "#d33f4c",
    tint30: "#dc626d",
    tint40: "#eeacb2",
    tint50: "#f6d1d5",
    tint60: "#fdf3f4"
  };
  var red = {
    shade50: "#210809",
    shade40: "#3f1011",
    shade30: "#751d1f",
    shade20: "#9f282b",
    shade10: "#bc2f32",
    primary: "#d13438",
    tint10: "#d7494c",
    tint20: "#dc5e62",
    tint30: "#e37d80",
    tint40: "#f1bbbc",
    tint50: "#f8dadb",
    tint60: "#fdf6f6"
  };
  var darkOrange = {
    shade50: "#230900",
    shade40: "#411200",
    shade30: "#7a2101",
    shade20: "#a62d01",
    shade10: "#c43501",
    primary: "#da3b01",
    tint10: "#de501c",
    tint20: "#e36537",
    tint30: "#e9835e",
    tint40: "#f4bfab",
    tint50: "#f9dcd1",
    tint60: "#fdf6f3"
  };
  var pumpkin = {
    shade50: "#200d03",
    shade40: "#3d1805",
    shade30: "#712d09",
    shade20: "#9a3d0c",
    shade10: "#b6480e",
    primary: "#ca5010",
    tint10: "#d06228",
    tint20: "#d77440",
    tint30: "#df8e64",
    tint40: "#efc4ad",
    tint50: "#f7dfd2",
    tint60: "#fdf7f4"
  };
  var orange = {
    shade50: "#271002",
    shade40: "#4a1e04",
    shade30: "#8a3707",
    shade20: "#bc4b09",
    shade10: "#de590b",
    primary: "#f7630c",
    tint10: "#f87528",
    tint20: "#f98845",
    tint30: "#faa06b",
    tint40: "#fdcfb4",
    tint50: "#fee5d7",
    tint60: "#fff9f5"
  };
  var peach = {
    shade50: "#291600",
    shade40: "#4d2a00",
    shade30: "#8f4e00",
    shade20: "#c26a00",
    shade10: "#e67e00",
    primary: "#ff8c00",
    tint10: "#ff9a1f",
    tint20: "#ffa83d",
    tint30: "#ffba66",
    tint40: "#ffddb3",
    tint50: "#ffedd6",
    tint60: "#fffaf5"
  };
  var marigold = {
    shade50: "#251a00",
    shade40: "#463100",
    shade30: "#835b00",
    shade20: "#b27c00",
    shade10: "#d39300",
    primary: "#eaa300",
    tint10: "#edad1c",
    tint20: "#efb839",
    tint30: "#f2c661",
    tint40: "#f9e2ae",
    tint50: "#fcefd3",
    tint60: "#fefbf4"
  };
  var yellow = {
    primary: "#fde300",
    shade10: "#e4cc00",
    shade20: "#c0ad00",
    shade30: "#817400",
    shade40: "#4c4400",
    shade50: "#282400",
    tint10: "#fde61e",
    tint20: "#fdea3d",
    tint30: "#feee66",
    tint40: "#fef7b2",
    tint50: "#fffad6",
    tint60: "#fffef5"
  };
  var gold = {
    shade50: "#1f1900",
    shade40: "#3a2f00",
    shade30: "#6c5700",
    shade20: "#937700",
    shade10: "#ae8c00",
    primary: "#c19c00",
    tint10: "#c8a718",
    tint20: "#d0b232",
    tint30: "#dac157",
    tint40: "#ecdfa5",
    tint50: "#f5eece",
    tint60: "#fdfbf2"
  };
  var brass = {
    shade50: "#181202",
    shade40: "#2e2103",
    shade30: "#553e06",
    shade20: "#745408",
    shade10: "#89640a",
    primary: "#986f0b",
    tint10: "#a47d1e",
    tint20: "#b18c34",
    tint30: "#c1a256",
    tint40: "#e0cea2",
    tint50: "#efe4cb",
    tint60: "#fbf8f2"
  };
  var brown = {
    shade50: "#170e07",
    shade40: "#2b1a0e",
    shade30: "#50301a",
    shade20: "#6c4123",
    shade10: "#804d29",
    primary: "#8e562e",
    tint10: "#9c663f",
    tint20: "#a97652",
    tint30: "#bb8f6f",
    tint40: "#ddc3b0",
    tint50: "#edded3",
    tint60: "#faf7f4"
  };
  var forest = {
    shade50: "#0c1501",
    shade40: "#162702",
    shade30: "#294903",
    shade20: "#376304",
    shade10: "#427505",
    primary: "#498205",
    tint10: "#599116",
    tint20: "#6ba02b",
    tint30: "#85b44c",
    tint40: "#bdd99b",
    tint50: "#dbebc7",
    tint60: "#f6faf0"
  };
  var seafoam = {
    shade50: "#002111",
    shade40: "#003d20",
    shade30: "#00723b",
    shade20: "#009b51",
    shade10: "#00b85f",
    primary: "#00cc6a",
    tint10: "#19d279",
    tint20: "#34d889",
    tint30: "#5ae0a0",
    tint40: "#a8f0cd",
    tint50: "#cff7e4",
    tint60: "#f3fdf8"
  };
  var lightGreen = {
    shade50: "#031a02",
    shade40: "#063004",
    shade30: "#0b5a08",
    shade20: "#0e7a0b",
    shade10: "#11910d",
    primary: "#13a10e",
    tint10: "#27ac22",
    tint20: "#3db838",
    tint30: "#5ec75a",
    tint40: "#a7e3a5",
    tint50: "#cef0cd",
    tint60: "#f2fbf2"
  };
  var green = {
    shade50: "#031403",
    shade40: "#052505",
    shade30: "#094509",
    shade20: "#0c5e0c",
    shade10: "#0e700e",
    primary: "#107c10",
    tint10: "#218c21",
    tint20: "#359b35",
    tint30: "#54b054",
    tint40: "#9fd89f",
    tint50: "#c9eac9",
    tint60: "#f1faf1"
  };
  var darkGreen = {
    shade50: "#021102",
    shade40: "#032003",
    shade30: "#063b06",
    shade20: "#085108",
    shade10: "#0a5f0a",
    primary: "#0b6a0b",
    tint10: "#1a7c1a",
    tint20: "#2d8e2d",
    tint30: "#4da64d",
    tint40: "#9ad29a",
    tint50: "#c6e7c6",
    tint60: "#f0f9f0"
  };
  var lightTeal = {
    shade50: "#001d1f",
    shade40: "#00373a",
    shade30: "#00666d",
    shade20: "#008b94",
    shade10: "#00a5af",
    primary: "#00b7c3",
    tint10: "#18bfca",
    tint20: "#32c8d1",
    tint30: "#58d3db",
    tint40: "#a6e9ed",
    tint50: "#cef3f5",
    tint60: "#f2fcfd"
  };
  var teal = {
    shade50: "#001516",
    shade40: "#012728",
    shade30: "#02494c",
    shade20: "#026467",
    shade10: "#037679",
    primary: "#038387",
    tint10: "#159195",
    tint20: "#2aa0a4",
    tint30: "#4cb4b7",
    tint40: "#9bd9db",
    tint50: "#c7ebec",
    tint60: "#f0fafa"
  };
  var steel = {
    shade50: "#000f12",
    shade40: "#001b22",
    shade30: "#00333f",
    shade20: "#004555",
    shade10: "#005265",
    primary: "#005b70",
    tint10: "#0f6c81",
    tint20: "#237d92",
    tint30: "#4496a9",
    tint40: "#94c8d4",
    tint50: "#c3e1e8",
    tint60: "#eff7f9"
  };
  var blue = {
    shade50: "#001322",
    shade40: "#002440",
    shade30: "#004377",
    shade20: "#005ba1",
    shade10: "#006cbf",
    primary: "#0078d4",
    tint10: "#1a86d9",
    tint20: "#3595de",
    tint30: "#5caae5",
    tint40: "#a9d3f2",
    tint50: "#d0e7f8",
    tint60: "#f3f9fd"
  };
  var royalBlue = {
    shade50: "#000c16",
    shade40: "#00172a",
    shade30: "#002c4e",
    shade20: "#003b6a",
    shade10: "#00467e",
    primary: "#004e8c",
    tint10: "#125e9a",
    tint20: "#286fa8",
    tint30: "#4a89ba",
    tint40: "#9abfdc",
    tint50: "#c7dced",
    tint60: "#f0f6fa"
  };
  var cornflower = {
    shade50: "#0d1126",
    shade40: "#182047",
    shade30: "#2c3c85",
    shade20: "#3c51b4",
    shade10: "#4760d5",
    primary: "#4f6bed",
    tint10: "#637cef",
    tint20: "#778df1",
    tint30: "#93a4f4",
    tint40: "#c8d1fa",
    tint50: "#e1e6fc",
    tint60: "#f7f9fe"
  };
  var navy = {
    shade50: "#00061d",
    shade40: "#000c36",
    shade30: "#001665",
    shade20: "#001e89",
    shade10: "#0023a2",
    primary: "#0027b4",
    tint10: "#173bbd",
    tint20: "#3050c6",
    tint30: "#546fd2",
    tint40: "#a3b2e8",
    tint50: "#ccd5f3",
    tint60: "#f2f4fc"
  };
  var lavender = {
    shade50: "#120f25",
    shade40: "#221d46",
    shade30: "#3f3682",
    shade20: "#5649b0",
    shade10: "#6656d1",
    primary: "#7160e8",
    tint10: "#8172eb",
    tint20: "#9184ee",
    tint30: "#a79cf1",
    tint40: "#d2ccf8",
    tint50: "#e7e4fb",
    tint60: "#f9f8fe"
  };
  var purple = {
    shade50: "#0f0717",
    shade40: "#1c0e2b",
    shade30: "#341a51",
    shade20: "#46236e",
    shade10: "#532982",
    primary: "#5c2e91",
    tint10: "#6b3f9e",
    tint20: "#7c52ab",
    tint30: "#9470bd",
    tint40: "#c6b1de",
    tint50: "#e0d3ed",
    tint60: "#f7f4fb"
  };
  var grape = {
    shade50: "#160418",
    shade40: "#29072e",
    shade30: "#4c0d55",
    shade20: "#671174",
    shade10: "#7a1589",
    primary: "#881798",
    tint10: "#952aa4",
    tint20: "#a33fb1",
    tint30: "#b55fc1",
    tint40: "#d9a7e0",
    tint50: "#eaceef",
    tint60: "#faf2fb"
  };
  var berry = {
    shade50: "#1f091d",
    shade40: "#3a1136",
    shade30: "#6d2064",
    shade20: "#932b88",
    shade10: "#af33a1",
    primary: "#c239b3",
    tint10: "#c94cbc",
    tint20: "#d161c4",
    tint30: "#da7ed0",
    tint40: "#edbbe7",
    tint50: "#f5daf2",
    tint60: "#fdf5fc"
  };
  var lilac = {
    shade50: "#1c0b1f",
    shade40: "#35153a",
    shade30: "#63276d",
    shade20: "#863593",
    shade10: "#9f3faf",
    primary: "#b146c2",
    tint10: "#ba58c9",
    tint20: "#c36bd1",
    tint30: "#cf87da",
    tint40: "#e6bfed",
    tint50: "#f2dcf5",
    tint60: "#fcf6fd"
  };
  var pink = {
    shade50: "#24091b",
    shade40: "#441232",
    shade30: "#80215d",
    shade20: "#ad2d7e",
    shade10: "#cd3595",
    primary: "#e43ba6",
    tint10: "#e750b0",
    tint20: "#ea66ba",
    tint30: "#ef85c8",
    tint40: "#f7c0e3",
    tint50: "#fbddf0",
    tint60: "#fef6fb"
  };
  var magenta = {
    shade50: "#1f0013",
    shade40: "#390024",
    shade30: "#6b0043",
    shade20: "#91005a",
    shade10: "#ac006b",
    primary: "#bf0077",
    tint10: "#c71885",
    tint20: "#ce3293",
    tint30: "#d957a8",
    tint40: "#eca5d1",
    tint50: "#f5cee6",
    tint60: "#fcf2f9"
  };
  var plum = {
    shade50: "#13000c",
    shade40: "#240017",
    shade30: "#43002b",
    shade20: "#5a003b",
    shade10: "#6b0045",
    primary: "#77004d",
    tint10: "#87105d",
    tint20: "#98246f",
    tint30: "#ad4589",
    tint40: "#d696c0",
    tint50: "#e9c4dc",
    tint60: "#faf0f6"
  };
  var beige = {
    shade50: "#141313",
    shade40: "#252323",
    shade30: "#444241",
    shade20: "#5d5958",
    shade10: "#6e6968",
    primary: "#7a7574",
    tint10: "#8a8584",
    tint20: "#9a9594",
    tint30: "#afabaa",
    tint40: "#d7d4d4",
    tint50: "#eae8e8",
    tint60: "#faf9f9"
  };
  var mink = {
    shade50: "#0f0e0e",
    shade40: "#1c1b1a",
    shade30: "#343231",
    shade20: "#474443",
    shade10: "#54514f",
    primary: "#5d5a58",
    tint10: "#706d6b",
    tint20: "#84817e",
    tint30: "#9e9b99",
    tint40: "#cecccb",
    tint50: "#e5e4e3",
    tint60: "#f8f8f8"
  };
  var platinum = {
    shade50: "#111314",
    shade40: "#1f2426",
    shade30: "#3b4447",
    shade20: "#505c60",
    shade10: "#5f6d71",
    primary: "#69797e",
    tint10: "#79898d",
    tint20: "#89989d",
    tint30: "#a0adb2",
    tint40: "#cdd6d8",
    tint50: "#e4e9ea",
    tint60: "#f8f9fa"
  };
  var anchor = {
    shade50: "#090a0b",
    shade40: "#111315",
    shade30: "#202427",
    shade20: "#2b3135",
    shade10: "#333a3f",
    primary: "#394146",
    tint10: "#4d565c",
    tint20: "#626c72",
    tint30: "#808a90",
    tint40: "#bcc3c7",
    tint50: "#dbdfe1",
    tint60: "#f6f7f8"
  };
  var statusSharedColors = {
    red,
    green,
    darkOrange,
    yellow,
    berry,
    lightGreen,
    marigold
  };
  var personaSharedColors = {
    darkRed,
    cranberry,
    pumpkin,
    peach,
    gold,
    brass,
    brown,
    forest,
    seafoam,
    darkGreen,
    lightTeal,
    teal,
    steel,
    blue,
    royalBlue,
    cornflower,
    navy,
    lavender,
    purple,
    grape,
    lilac,
    pink,
    magenta,
    plum,
    beige,
    mink,
    platinum,
    anchor
  };
  var mappedStatusColors = {
    cranberry,
    green,
    orange
  };
  var statusSharedColorNames = [
    "red",
    "green",
    "darkOrange",
    "yellow",
    "berry",
    "lightGreen",
    "marigold"
  ];
  var personaSharedColorNames = [
    "darkRed",
    "cranberry",
    "pumpkin",
    "peach",
    "gold",
    "brass",
    "brown",
    "forest",
    "seafoam",
    "darkGreen",
    "lightTeal",
    "teal",
    "steel",
    "blue",
    "royalBlue",
    "cornflower",
    "navy",
    "lavender",
    "purple",
    "grape",
    "lilac",
    "pink",
    "magenta",
    "plum",
    "beige",
    "mink",
    "platinum",
    "anchor"
  ];
  var statusColorMapping = {
    success: "green",
    warning: "orange",
    danger: "cranberry"
  };
  var statusColorPaletteTokens$2 = statusSharedColorNames.reduce((acc, sharedColor) => {
    const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
    const sharedColorTokens = {
      [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].tint60,
      [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].tint40,
      [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
      [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].shade10,
      [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].shade30,
      [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].primary,
      [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].primary,
      [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].tint40,
      [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].primary
    };
    return Object.assign(acc, sharedColorTokens);
  }, {});
  statusColorPaletteTokens$2.colorPaletteYellowForeground1 = statusSharedColors.yellow.shade30;
  statusColorPaletteTokens$2.colorPaletteRedForegroundInverted = statusSharedColors.red.tint20;
  statusColorPaletteTokens$2.colorPaletteGreenForegroundInverted = statusSharedColors.green.tint20;
  statusColorPaletteTokens$2.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.tint40;
  var personaColorPaletteTokens$2 = personaSharedColorNames.reduce((acc, sharedColor) => {
    const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
    const sharedColorTokens = {
      [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].tint40,
      [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].shade30,
      [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].primary
    };
    return Object.assign(acc, sharedColorTokens);
  }, {});
  var colorPaletteTokens$2 = {
    ...statusColorPaletteTokens$2,
    ...personaColorPaletteTokens$2
  };
  var colorStatusTokens$2 = Object.entries(statusColorMapping).reduce((acc, [statusColor, sharedColor]) => {
    const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);
    const statusColorTokens = {
      [`colorStatus${color}Background1`]: mappedStatusColors[sharedColor].tint60,
      [`colorStatus${color}Background2`]: mappedStatusColors[sharedColor].tint40,
      [`colorStatus${color}Background3`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Foreground1`]: mappedStatusColors[sharedColor].shade10,
      [`colorStatus${color}Foreground2`]: mappedStatusColors[sharedColor].shade30,
      [`colorStatus${color}Foreground3`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}ForegroundInverted`]: mappedStatusColors[sharedColor].tint30,
      [`colorStatus${color}BorderActive`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Border1`]: mappedStatusColors[sharedColor].tint40,
      [`colorStatus${color}Border2`]: mappedStatusColors[sharedColor].primary
    };
    return Object.assign(acc, statusColorTokens);
  }, {});
  colorStatusTokens$2.colorStatusWarningForeground1 = mappedStatusColors[statusColorMapping.warning].shade20;
  colorStatusTokens$2.colorStatusWarningForeground3 = mappedStatusColors[statusColorMapping.warning].shade20;
  colorStatusTokens$2.colorStatusWarningBorder2 = mappedStatusColors[statusColorMapping.warning].shade20;
  var generateColorTokens$2 = (brand) => ({
    colorNeutralForeground1: grey[14],
    colorNeutralForeground1Hover: grey[14],
    colorNeutralForeground1Pressed: grey[14],
    colorNeutralForeground1Selected: grey[14],
    colorNeutralForeground2: grey[26],
    colorNeutralForeground2Hover: grey[14],
    colorNeutralForeground2Pressed: grey[14],
    colorNeutralForeground2Selected: grey[14],
    colorNeutralForeground2BrandHover: brand[80],
    colorNeutralForeground2BrandPressed: brand[70],
    colorNeutralForeground2BrandSelected: brand[80],
    colorNeutralForeground3: grey[38],
    colorNeutralForeground3Hover: grey[26],
    colorNeutralForeground3Pressed: grey[26],
    colorNeutralForeground3Selected: grey[26],
    colorNeutralForeground3BrandHover: brand[80],
    colorNeutralForeground3BrandPressed: brand[70],
    colorNeutralForeground3BrandSelected: brand[80],
    colorNeutralForeground4: grey[44],
    colorNeutralForegroundDisabled: grey[74],
    colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
    colorBrandForegroundLink: brand[70],
    colorBrandForegroundLinkHover: brand[60],
    colorBrandForegroundLinkPressed: brand[40],
    colorBrandForegroundLinkSelected: brand[70],
    colorNeutralForeground2Link: grey[26],
    colorNeutralForeground2LinkHover: grey[14],
    colorNeutralForeground2LinkPressed: grey[14],
    colorNeutralForeground2LinkSelected: grey[14],
    colorCompoundBrandForeground1: brand[80],
    colorCompoundBrandForeground1Hover: brand[70],
    colorCompoundBrandForeground1Pressed: brand[60],
    colorBrandForeground1: brand[80],
    colorBrandForeground2: brand[70],
    colorBrandForeground2Hover: brand[60],
    colorBrandForeground2Pressed: brand[30],
    colorNeutralForeground1Static: grey[14],
    colorNeutralForegroundStaticInverted: white,
    colorNeutralForegroundInverted: white,
    colorNeutralForegroundInvertedHover: white,
    colorNeutralForegroundInvertedPressed: white,
    colorNeutralForegroundInvertedSelected: white,
    colorNeutralForegroundInverted2: white,
    colorNeutralForegroundOnBrand: white,
    colorNeutralForegroundInvertedLink: white,
    colorNeutralForegroundInvertedLinkHover: white,
    colorNeutralForegroundInvertedLinkPressed: white,
    colorNeutralForegroundInvertedLinkSelected: white,
    colorBrandForegroundInverted: brand[100],
    colorBrandForegroundInvertedHover: brand[110],
    colorBrandForegroundInvertedPressed: brand[100],
    colorBrandForegroundOnLight: brand[80],
    colorBrandForegroundOnLightHover: brand[70],
    colorBrandForegroundOnLightPressed: brand[50],
    colorBrandForegroundOnLightSelected: brand[60],
    colorNeutralBackground1: white,
    colorNeutralBackground1Hover: grey[96],
    colorNeutralBackground1Pressed: grey[88],
    colorNeutralBackground1Selected: grey[92],
    colorNeutralBackground2: grey[98],
    colorNeutralBackground2Hover: grey[94],
    colorNeutralBackground2Pressed: grey[86],
    colorNeutralBackground2Selected: grey[90],
    colorNeutralBackground3: grey[96],
    colorNeutralBackground3Hover: grey[92],
    colorNeutralBackground3Pressed: grey[84],
    colorNeutralBackground3Selected: grey[88],
    colorNeutralBackground4: grey[94],
    colorNeutralBackground4Hover: grey[98],
    colorNeutralBackground4Pressed: grey[96],
    colorNeutralBackground4Selected: white,
    colorNeutralBackground5: grey[92],
    colorNeutralBackground5Hover: grey[96],
    colorNeutralBackground5Pressed: grey[94],
    colorNeutralBackground5Selected: grey[98],
    colorNeutralBackground6: grey[90],
    colorNeutralBackgroundInverted: grey[16],
    colorNeutralBackgroundStatic: grey[20],
    colorNeutralBackgroundAlpha: whiteAlpha[50],
    colorNeutralBackgroundAlpha2: whiteAlpha[80],
    colorSubtleBackground: "transparent",
    colorSubtleBackgroundHover: grey[96],
    colorSubtleBackgroundPressed: grey[88],
    colorSubtleBackgroundSelected: grey[92],
    colorSubtleBackgroundLightAlphaHover: whiteAlpha[70],
    colorSubtleBackgroundLightAlphaPressed: whiteAlpha[50],
    colorSubtleBackgroundLightAlphaSelected: "transparent",
    colorSubtleBackgroundInverted: "transparent",
    colorSubtleBackgroundInvertedHover: blackAlpha[10],
    colorSubtleBackgroundInvertedPressed: blackAlpha[30],
    colorSubtleBackgroundInvertedSelected: blackAlpha[20],
    colorTransparentBackground: "transparent",
    colorTransparentBackgroundHover: "transparent",
    colorTransparentBackgroundPressed: "transparent",
    colorTransparentBackgroundSelected: "transparent",
    colorNeutralBackgroundDisabled: grey[94],
    colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
    colorNeutralStencil1: grey[90],
    colorNeutralStencil2: grey[98],
    colorNeutralStencil1Alpha: blackAlpha[10],
    colorNeutralStencil2Alpha: blackAlpha[5],
    colorBackgroundOverlay: blackAlpha[40],
    colorScrollbarOverlay: blackAlpha[50],
    colorBrandBackground: brand[80],
    colorBrandBackgroundHover: brand[70],
    colorBrandBackgroundPressed: brand[40],
    colorBrandBackgroundSelected: brand[60],
    colorCompoundBrandBackground: brand[80],
    colorCompoundBrandBackgroundHover: brand[70],
    colorCompoundBrandBackgroundPressed: brand[60],
    colorBrandBackgroundStatic: brand[80],
    colorBrandBackground2: brand[160],
    colorBrandBackground2Hover: brand[150],
    colorBrandBackground2Pressed: brand[130],
    colorBrandBackgroundInverted: white,
    colorBrandBackgroundInvertedHover: brand[160],
    colorBrandBackgroundInvertedPressed: brand[140],
    colorBrandBackgroundInvertedSelected: brand[150],
    colorNeutralStrokeAccessible: grey[38],
    colorNeutralStrokeAccessibleHover: grey[34],
    colorNeutralStrokeAccessiblePressed: grey[30],
    colorNeutralStrokeAccessibleSelected: brand[80],
    colorNeutralStroke1: grey[82],
    colorNeutralStroke1Hover: grey[78],
    colorNeutralStroke1Pressed: grey[70],
    colorNeutralStroke1Selected: grey[74],
    colorNeutralStroke2: grey[88],
    colorNeutralStroke3: grey[94],
    colorNeutralStrokeSubtle: grey[88],
    colorNeutralStrokeOnBrand: white,
    colorNeutralStrokeOnBrand2: white,
    colorNeutralStrokeOnBrand2Hover: white,
    colorNeutralStrokeOnBrand2Pressed: white,
    colorNeutralStrokeOnBrand2Selected: white,
    colorBrandStroke1: brand[80],
    colorBrandStroke2: brand[140],
    colorBrandStroke2Hover: brand[120],
    colorBrandStroke2Pressed: brand[80],
    colorBrandStroke2Contrast: brand[140],
    colorCompoundBrandStroke: brand[80],
    colorCompoundBrandStrokeHover: brand[70],
    colorCompoundBrandStrokePressed: brand[60],
    colorNeutralStrokeDisabled: grey[88],
    colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
    colorTransparentStroke: "transparent",
    colorTransparentStrokeInteractive: "transparent",
    colorTransparentStrokeDisabled: "transparent",
    colorNeutralStrokeAlpha: blackAlpha[5],
    colorNeutralStrokeAlpha2: whiteAlpha[20],
    colorStrokeFocus1: white,
    colorStrokeFocus2: black,
    colorNeutralShadowAmbient: "rgba(0,0,0,0.12)",
    colorNeutralShadowKey: "rgba(0,0,0,0.14)",
    colorNeutralShadowAmbientLighter: "rgba(0,0,0,0.06)",
    colorNeutralShadowKeyLighter: "rgba(0,0,0,0.07)",
    colorNeutralShadowAmbientDarker: "rgba(0,0,0,0.20)",
    colorNeutralShadowKeyDarker: "rgba(0,0,0,0.24)",
    colorBrandShadowAmbient: "rgba(0,0,0,0.30)",
    colorBrandShadowKey: "rgba(0,0,0,0.25)"
  });
  var borderRadius = {
    borderRadiusNone: "0",
    borderRadiusSmall: "2px",
    borderRadiusMedium: "4px",
    borderRadiusLarge: "6px",
    borderRadiusXLarge: "8px",
    borderRadiusCircular: "10000px"
  };
  var curves = {
    curveAccelerateMax: "cubic-bezier(0.9,0.1,1,0.2)",
    curveAccelerateMid: "cubic-bezier(1,0,1,1)",
    curveAccelerateMin: "cubic-bezier(0.8,0,0.78,1)",
    curveDecelerateMax: "cubic-bezier(0.1,0.9,0.2,1)",
    curveDecelerateMid: "cubic-bezier(0,0,0,1)",
    curveDecelerateMin: "cubic-bezier(0.33,0,0.1,1)",
    curveEasyEaseMax: "cubic-bezier(0.8,0,0.2,1)",
    curveEasyEase: "cubic-bezier(0.33,0,0.67,1)",
    curveLinear: "cubic-bezier(0,0,1,1)"
  };
  var durations = {
    durationUltraFast: "50ms",
    durationFaster: "100ms",
    durationFast: "150ms",
    durationNormal: "200ms",
    durationGentle: "250ms",
    durationSlow: "300ms",
    durationSlower: "400ms",
    durationUltraSlow: "500ms"
  };
  var fontSizes = {
    fontSizeBase100: "10px",
    fontSizeBase200: "12px",
    fontSizeBase300: "14px",
    fontSizeBase400: "16px",
    fontSizeBase500: "20px",
    fontSizeBase600: "24px",
    fontSizeHero700: "28px",
    fontSizeHero800: "32px",
    fontSizeHero900: "40px",
    fontSizeHero1000: "68px"
  };
  var lineHeights = {
    lineHeightBase100: "14px",
    lineHeightBase200: "16px",
    lineHeightBase300: "20px",
    lineHeightBase400: "22px",
    lineHeightBase500: "28px",
    lineHeightBase600: "32px",
    lineHeightHero700: "36px",
    lineHeightHero800: "40px",
    lineHeightHero900: "52px",
    lineHeightHero1000: "92px"
  };
  var fontWeights = {
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemibold: 600,
    fontWeightBold: 700
  };
  var fontFamilies = {
    fontFamilyBase: (
      // eslint-disable-next-line @fluentui/max-len
      "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"
    ),
    fontFamilyMonospace: "Consolas, 'Courier New', Courier, monospace",
    fontFamilyNumeric: (
      // eslint-disable-next-line @fluentui/max-len
      "Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"
    )
  };
  var spacings = {
    none: "0",
    xxs: "2px",
    xs: "4px",
    sNudge: "6px",
    s: "8px",
    mNudge: "10px",
    m: "12px",
    l: "16px",
    xl: "20px",
    xxl: "24px",
    xxxl: "32px"
  };
  var horizontalSpacings = {
    spacingHorizontalNone: spacings.none,
    spacingHorizontalXXS: spacings.xxs,
    spacingHorizontalXS: spacings.xs,
    spacingHorizontalSNudge: spacings.sNudge,
    spacingHorizontalS: spacings.s,
    spacingHorizontalMNudge: spacings.mNudge,
    spacingHorizontalM: spacings.m,
    spacingHorizontalL: spacings.l,
    spacingHorizontalXL: spacings.xl,
    spacingHorizontalXXL: spacings.xxl,
    spacingHorizontalXXXL: spacings.xxxl
  };
  var verticalSpacings = {
    spacingVerticalNone: spacings.none,
    spacingVerticalXXS: spacings.xxs,
    spacingVerticalXS: spacings.xs,
    spacingVerticalSNudge: spacings.sNudge,
    spacingVerticalS: spacings.s,
    spacingVerticalMNudge: spacings.mNudge,
    spacingVerticalM: spacings.m,
    spacingVerticalL: spacings.l,
    spacingVerticalXL: spacings.xl,
    spacingVerticalXXL: spacings.xxl,
    spacingVerticalXXXL: spacings.xxxl
  };
  var strokeWidths = {
    strokeWidthThin: "1px",
    strokeWidthThick: "2px",
    strokeWidthThicker: "3px",
    strokeWidthThickest: "4px"
  };
  var tokens$1 = {
    // Color tokens
    colorNeutralForeground1: "var(--colorNeutralForeground1)",
    colorNeutralForeground1Hover: "var(--colorNeutralForeground1Hover)",
    colorNeutralForeground1Pressed: "var(--colorNeutralForeground1Pressed)",
    colorNeutralForeground1Selected: "var(--colorNeutralForeground1Selected)",
    colorNeutralForeground2: "var(--colorNeutralForeground2)",
    colorNeutralForeground2Hover: "var(--colorNeutralForeground2Hover)",
    colorNeutralForeground2Pressed: "var(--colorNeutralForeground2Pressed)",
    colorNeutralForeground2Selected: "var(--colorNeutralForeground2Selected)",
    colorNeutralForeground2BrandHover: "var(--colorNeutralForeground2BrandHover)",
    colorNeutralForeground2BrandPressed: "var(--colorNeutralForeground2BrandPressed)",
    colorNeutralForeground2BrandSelected: "var(--colorNeutralForeground2BrandSelected)",
    colorNeutralForeground3: "var(--colorNeutralForeground3)",
    colorNeutralForeground3Hover: "var(--colorNeutralForeground3Hover)",
    colorNeutralForeground3Pressed: "var(--colorNeutralForeground3Pressed)",
    colorNeutralForeground3Selected: "var(--colorNeutralForeground3Selected)",
    colorNeutralForeground3BrandHover: "var(--colorNeutralForeground3BrandHover)",
    colorNeutralForeground3BrandPressed: "var(--colorNeutralForeground3BrandPressed)",
    colorNeutralForeground3BrandSelected: "var(--colorNeutralForeground3BrandSelected)",
    colorNeutralForeground4: "var(--colorNeutralForeground4)",
    colorNeutralForegroundDisabled: "var(--colorNeutralForegroundDisabled)",
    colorBrandForegroundLink: "var(--colorBrandForegroundLink)",
    colorBrandForegroundLinkHover: "var(--colorBrandForegroundLinkHover)",
    colorBrandForegroundLinkPressed: "var(--colorBrandForegroundLinkPressed)",
    colorBrandForegroundLinkSelected: "var(--colorBrandForegroundLinkSelected)",
    colorNeutralForeground2Link: "var(--colorNeutralForeground2Link)",
    colorNeutralForeground2LinkHover: "var(--colorNeutralForeground2LinkHover)",
    colorNeutralForeground2LinkPressed: "var(--colorNeutralForeground2LinkPressed)",
    colorNeutralForeground2LinkSelected: "var(--colorNeutralForeground2LinkSelected)",
    colorCompoundBrandForeground1: "var(--colorCompoundBrandForeground1)",
    colorCompoundBrandForeground1Hover: "var(--colorCompoundBrandForeground1Hover)",
    colorCompoundBrandForeground1Pressed: "var(--colorCompoundBrandForeground1Pressed)",
    colorNeutralForegroundOnBrand: "var(--colorNeutralForegroundOnBrand)",
    colorNeutralForegroundInverted: "var(--colorNeutralForegroundInverted)",
    colorNeutralForegroundInvertedHover: "var(--colorNeutralForegroundInvertedHover)",
    colorNeutralForegroundInvertedPressed: "var(--colorNeutralForegroundInvertedPressed)",
    colorNeutralForegroundInvertedSelected: "var(--colorNeutralForegroundInvertedSelected)",
    colorNeutralForegroundInverted2: "var(--colorNeutralForegroundInverted2)",
    colorNeutralForegroundStaticInverted: "var(--colorNeutralForegroundStaticInverted)",
    colorNeutralForegroundInvertedLink: "var(--colorNeutralForegroundInvertedLink)",
    colorNeutralForegroundInvertedLinkHover: "var(--colorNeutralForegroundInvertedLinkHover)",
    colorNeutralForegroundInvertedLinkPressed: "var(--colorNeutralForegroundInvertedLinkPressed)",
    colorNeutralForegroundInvertedLinkSelected: "var(--colorNeutralForegroundInvertedLinkSelected)",
    colorNeutralForegroundInvertedDisabled: "var(--colorNeutralForegroundInvertedDisabled)",
    colorBrandForeground1: "var(--colorBrandForeground1)",
    colorBrandForeground2: "var(--colorBrandForeground2)",
    colorBrandForeground2Hover: "var(--colorBrandForeground2Hover)",
    colorBrandForeground2Pressed: "var(--colorBrandForeground2Pressed)",
    colorNeutralForeground1Static: "var(--colorNeutralForeground1Static)",
    colorBrandForegroundInverted: "var(--colorBrandForegroundInverted)",
    colorBrandForegroundInvertedHover: "var(--colorBrandForegroundInvertedHover)",
    colorBrandForegroundInvertedPressed: "var(--colorBrandForegroundInvertedPressed)",
    colorBrandForegroundOnLight: "var(--colorBrandForegroundOnLight)",
    colorBrandForegroundOnLightHover: "var(--colorBrandForegroundOnLightHover)",
    colorBrandForegroundOnLightPressed: "var(--colorBrandForegroundOnLightPressed)",
    colorBrandForegroundOnLightSelected: "var(--colorBrandForegroundOnLightSelected)",
    colorNeutralBackground1: "var(--colorNeutralBackground1)",
    colorNeutralBackground1Hover: "var(--colorNeutralBackground1Hover)",
    colorNeutralBackground1Pressed: "var(--colorNeutralBackground1Pressed)",
    colorNeutralBackground1Selected: "var(--colorNeutralBackground1Selected)",
    colorNeutralBackground2: "var(--colorNeutralBackground2)",
    colorNeutralBackground2Hover: "var(--colorNeutralBackground2Hover)",
    colorNeutralBackground2Pressed: "var(--colorNeutralBackground2Pressed)",
    colorNeutralBackground2Selected: "var(--colorNeutralBackground2Selected)",
    colorNeutralBackground3: "var(--colorNeutralBackground3)",
    colorNeutralBackground3Hover: "var(--colorNeutralBackground3Hover)",
    colorNeutralBackground3Pressed: "var(--colorNeutralBackground3Pressed)",
    colorNeutralBackground3Selected: "var(--colorNeutralBackground3Selected)",
    colorNeutralBackground4: "var(--colorNeutralBackground4)",
    colorNeutralBackground4Hover: "var(--colorNeutralBackground4Hover)",
    colorNeutralBackground4Pressed: "var(--colorNeutralBackground4Pressed)",
    colorNeutralBackground4Selected: "var(--colorNeutralBackground4Selected)",
    colorNeutralBackground5: "var(--colorNeutralBackground5)",
    colorNeutralBackground5Hover: "var(--colorNeutralBackground5Hover)",
    colorNeutralBackground5Pressed: "var(--colorNeutralBackground5Pressed)",
    colorNeutralBackground5Selected: "var(--colorNeutralBackground5Selected)",
    colorNeutralBackground6: "var(--colorNeutralBackground6)",
    colorNeutralBackgroundInverted: "var(--colorNeutralBackgroundInverted)",
    colorNeutralBackgroundStatic: "var(--colorNeutralBackgroundStatic)",
    colorNeutralBackgroundAlpha: "var(--colorNeutralBackgroundAlpha)",
    colorNeutralBackgroundAlpha2: "var(--colorNeutralBackgroundAlpha2)",
    colorSubtleBackground: "var(--colorSubtleBackground)",
    colorSubtleBackgroundHover: "var(--colorSubtleBackgroundHover)",
    colorSubtleBackgroundPressed: "var(--colorSubtleBackgroundPressed)",
    colorSubtleBackgroundSelected: "var(--colorSubtleBackgroundSelected)",
    colorSubtleBackgroundLightAlphaHover: "var(--colorSubtleBackgroundLightAlphaHover)",
    colorSubtleBackgroundLightAlphaPressed: "var(--colorSubtleBackgroundLightAlphaPressed)",
    colorSubtleBackgroundLightAlphaSelected: "var(--colorSubtleBackgroundLightAlphaSelected)",
    colorSubtleBackgroundInverted: "var(--colorSubtleBackgroundInverted)",
    colorSubtleBackgroundInvertedHover: "var(--colorSubtleBackgroundInvertedHover)",
    colorSubtleBackgroundInvertedPressed: "var(--colorSubtleBackgroundInvertedPressed)",
    colorSubtleBackgroundInvertedSelected: "var(--colorSubtleBackgroundInvertedSelected)",
    colorTransparentBackground: "var(--colorTransparentBackground)",
    colorTransparentBackgroundHover: "var(--colorTransparentBackgroundHover)",
    colorTransparentBackgroundPressed: "var(--colorTransparentBackgroundPressed)",
    colorTransparentBackgroundSelected: "var(--colorTransparentBackgroundSelected)",
    colorNeutralBackgroundDisabled: "var(--colorNeutralBackgroundDisabled)",
    colorNeutralBackgroundInvertedDisabled: "var(--colorNeutralBackgroundInvertedDisabled)",
    colorNeutralStencil1: "var(--colorNeutralStencil1)",
    colorNeutralStencil2: "var(--colorNeutralStencil2)",
    colorNeutralStencil1Alpha: "var(--colorNeutralStencil1Alpha)",
    colorNeutralStencil2Alpha: "var(--colorNeutralStencil2Alpha)",
    colorBackgroundOverlay: "var(--colorBackgroundOverlay)",
    colorScrollbarOverlay: "var(--colorScrollbarOverlay)",
    colorBrandBackground: "var(--colorBrandBackground)",
    colorBrandBackgroundHover: "var(--colorBrandBackgroundHover)",
    colorBrandBackgroundPressed: "var(--colorBrandBackgroundPressed)",
    colorBrandBackgroundSelected: "var(--colorBrandBackgroundSelected)",
    colorCompoundBrandBackground: "var(--colorCompoundBrandBackground)",
    colorCompoundBrandBackgroundHover: "var(--colorCompoundBrandBackgroundHover)",
    colorCompoundBrandBackgroundPressed: "var(--colorCompoundBrandBackgroundPressed)",
    colorBrandBackgroundStatic: "var(--colorBrandBackgroundStatic)",
    colorBrandBackground2: "var(--colorBrandBackground2)",
    colorBrandBackground2Hover: "var(--colorBrandBackground2Hover)",
    colorBrandBackground2Pressed: "var(--colorBrandBackground2Pressed)",
    colorBrandBackgroundInverted: "var(--colorBrandBackgroundInverted)",
    colorBrandBackgroundInvertedHover: "var(--colorBrandBackgroundInvertedHover)",
    colorBrandBackgroundInvertedPressed: "var(--colorBrandBackgroundInvertedPressed)",
    colorBrandBackgroundInvertedSelected: "var(--colorBrandBackgroundInvertedSelected)",
    colorNeutralStrokeAccessible: "var(--colorNeutralStrokeAccessible)",
    colorNeutralStrokeAccessibleHover: "var(--colorNeutralStrokeAccessibleHover)",
    colorNeutralStrokeAccessiblePressed: "var(--colorNeutralStrokeAccessiblePressed)",
    colorNeutralStrokeAccessibleSelected: "var(--colorNeutralStrokeAccessibleSelected)",
    colorNeutralStroke1: "var(--colorNeutralStroke1)",
    colorNeutralStroke1Hover: "var(--colorNeutralStroke1Hover)",
    colorNeutralStroke1Pressed: "var(--colorNeutralStroke1Pressed)",
    colorNeutralStroke1Selected: "var(--colorNeutralStroke1Selected)",
    colorNeutralStroke2: "var(--colorNeutralStroke2)",
    colorNeutralStroke3: "var(--colorNeutralStroke3)",
    colorNeutralStrokeSubtle: "var(--colorNeutralStrokeSubtle)",
    colorNeutralStrokeOnBrand: "var(--colorNeutralStrokeOnBrand)",
    colorNeutralStrokeOnBrand2: "var(--colorNeutralStrokeOnBrand2)",
    colorNeutralStrokeOnBrand2Hover: "var(--colorNeutralStrokeOnBrand2Hover)",
    colorNeutralStrokeOnBrand2Pressed: "var(--colorNeutralStrokeOnBrand2Pressed)",
    colorNeutralStrokeOnBrand2Selected: "var(--colorNeutralStrokeOnBrand2Selected)",
    colorBrandStroke1: "var(--colorBrandStroke1)",
    colorBrandStroke2: "var(--colorBrandStroke2)",
    colorBrandStroke2Hover: "var(--colorBrandStroke2Hover)",
    colorBrandStroke2Pressed: "var(--colorBrandStroke2Pressed)",
    colorBrandStroke2Contrast: "var(--colorBrandStroke2Contrast)",
    colorCompoundBrandStroke: "var(--colorCompoundBrandStroke)",
    colorCompoundBrandStrokeHover: "var(--colorCompoundBrandStrokeHover)",
    colorCompoundBrandStrokePressed: "var(--colorCompoundBrandStrokePressed)",
    colorNeutralStrokeDisabled: "var(--colorNeutralStrokeDisabled)",
    colorNeutralStrokeInvertedDisabled: "var(--colorNeutralStrokeInvertedDisabled)",
    colorTransparentStroke: "var(--colorTransparentStroke)",
    colorTransparentStrokeInteractive: "var(--colorTransparentStrokeInteractive)",
    colorTransparentStrokeDisabled: "var(--colorTransparentStrokeDisabled)",
    colorNeutralStrokeAlpha: "var(--colorNeutralStrokeAlpha)",
    colorNeutralStrokeAlpha2: "var(--colorNeutralStrokeAlpha2)",
    colorStrokeFocus1: "var(--colorStrokeFocus1)",
    colorStrokeFocus2: "var(--colorStrokeFocus2)",
    colorNeutralShadowAmbient: "var(--colorNeutralShadowAmbient)",
    colorNeutralShadowKey: "var(--colorNeutralShadowKey)",
    colorNeutralShadowAmbientLighter: "var(--colorNeutralShadowAmbientLighter)",
    colorNeutralShadowKeyLighter: "var(--colorNeutralShadowKeyLighter)",
    colorNeutralShadowAmbientDarker: "var(--colorNeutralShadowAmbientDarker)",
    colorNeutralShadowKeyDarker: "var(--colorNeutralShadowKeyDarker)",
    colorBrandShadowAmbient: "var(--colorBrandShadowAmbient)",
    colorBrandShadowKey: "var(--colorBrandShadowKey)",
    // Color palette tokens
    // Color palette red tokens
    colorPaletteRedBackground1: "var(--colorPaletteRedBackground1)",
    colorPaletteRedBackground2: "var(--colorPaletteRedBackground2)",
    colorPaletteRedBackground3: "var(--colorPaletteRedBackground3)",
    colorPaletteRedBorderActive: "var(--colorPaletteRedBorderActive)",
    colorPaletteRedBorder1: "var(--colorPaletteRedBorder1)",
    colorPaletteRedBorder2: "var(--colorPaletteRedBorder2)",
    colorPaletteRedForeground1: "var(--colorPaletteRedForeground1)",
    colorPaletteRedForeground2: "var(--colorPaletteRedForeground2)",
    colorPaletteRedForeground3: "var(--colorPaletteRedForeground3)",
    colorPaletteRedForegroundInverted: "var(--colorPaletteRedForegroundInverted)",
    // Color palette green tokens
    colorPaletteGreenBackground1: "var(--colorPaletteGreenBackground1)",
    colorPaletteGreenBackground2: "var(--colorPaletteGreenBackground2)",
    colorPaletteGreenBackground3: "var(--colorPaletteGreenBackground3)",
    colorPaletteGreenBorderActive: "var(--colorPaletteGreenBorderActive)",
    colorPaletteGreenBorder1: "var(--colorPaletteGreenBorder1)",
    colorPaletteGreenBorder2: "var(--colorPaletteGreenBorder2)",
    colorPaletteGreenForeground1: "var(--colorPaletteGreenForeground1)",
    colorPaletteGreenForeground2: "var(--colorPaletteGreenForeground2)",
    colorPaletteGreenForeground3: "var(--colorPaletteGreenForeground3)",
    colorPaletteGreenForegroundInverted: "var(--colorPaletteGreenForegroundInverted)",
    // Color palette dark orange tokens
    colorPaletteDarkOrangeBackground1: "var(--colorPaletteDarkOrangeBackground1)",
    colorPaletteDarkOrangeBackground2: "var(--colorPaletteDarkOrangeBackground2)",
    colorPaletteDarkOrangeBackground3: "var(--colorPaletteDarkOrangeBackground3)",
    colorPaletteDarkOrangeBorderActive: "var(--colorPaletteDarkOrangeBorderActive)",
    colorPaletteDarkOrangeBorder1: "var(--colorPaletteDarkOrangeBorder1)",
    colorPaletteDarkOrangeBorder2: "var(--colorPaletteDarkOrangeBorder2)",
    colorPaletteDarkOrangeForeground1: "var(--colorPaletteDarkOrangeForeground1)",
    colorPaletteDarkOrangeForeground2: "var(--colorPaletteDarkOrangeForeground2)",
    colorPaletteDarkOrangeForeground3: "var(--colorPaletteDarkOrangeForeground3)",
    // Color palette yellow tokens
    colorPaletteYellowBackground1: "var(--colorPaletteYellowBackground1)",
    colorPaletteYellowBackground2: "var(--colorPaletteYellowBackground2)",
    colorPaletteYellowBackground3: "var(--colorPaletteYellowBackground3)",
    colorPaletteYellowBorderActive: "var(--colorPaletteYellowBorderActive)",
    colorPaletteYellowBorder1: "var(--colorPaletteYellowBorder1)",
    colorPaletteYellowBorder2: "var(--colorPaletteYellowBorder2)",
    colorPaletteYellowForeground1: "var(--colorPaletteYellowForeground1)",
    colorPaletteYellowForeground2: "var(--colorPaletteYellowForeground2)",
    colorPaletteYellowForeground3: "var(--colorPaletteYellowForeground3)",
    colorPaletteYellowForegroundInverted: "var(--colorPaletteYellowForegroundInverted)",
    // Color palette berry tokens
    colorPaletteBerryBackground1: "var(--colorPaletteBerryBackground1)",
    colorPaletteBerryBackground2: "var(--colorPaletteBerryBackground2)",
    colorPaletteBerryBackground3: "var(--colorPaletteBerryBackground3)",
    colorPaletteBerryBorderActive: "var(--colorPaletteBerryBorderActive)",
    colorPaletteBerryBorder1: "var(--colorPaletteBerryBorder1)",
    colorPaletteBerryBorder2: "var(--colorPaletteBerryBorder2)",
    colorPaletteBerryForeground1: "var(--colorPaletteBerryForeground1)",
    colorPaletteBerryForeground2: "var(--colorPaletteBerryForeground2)",
    colorPaletteBerryForeground3: "var(--colorPaletteBerryForeground3)",
    // Color palette marigold tokens
    colorPaletteMarigoldBackground1: "var(--colorPaletteMarigoldBackground1)",
    colorPaletteMarigoldBackground2: "var(--colorPaletteMarigoldBackground2)",
    colorPaletteMarigoldBackground3: "var(--colorPaletteMarigoldBackground3)",
    colorPaletteMarigoldBorderActive: "var(--colorPaletteMarigoldBorderActive)",
    colorPaletteMarigoldBorder1: "var(--colorPaletteMarigoldBorder1)",
    colorPaletteMarigoldBorder2: "var(--colorPaletteMarigoldBorder2)",
    colorPaletteMarigoldForeground1: "var(--colorPaletteMarigoldForeground1)",
    colorPaletteMarigoldForeground2: "var(--colorPaletteMarigoldForeground2)",
    colorPaletteMarigoldForeground3: "var(--colorPaletteMarigoldForeground3)",
    // Color palette light green tokens
    colorPaletteLightGreenBackground1: "var(--colorPaletteLightGreenBackground1)",
    colorPaletteLightGreenBackground2: "var(--colorPaletteLightGreenBackground2)",
    colorPaletteLightGreenBackground3: "var(--colorPaletteLightGreenBackground3)",
    colorPaletteLightGreenBorderActive: "var(--colorPaletteLightGreenBorderActive)",
    colorPaletteLightGreenBorder1: "var(--colorPaletteLightGreenBorder1)",
    colorPaletteLightGreenBorder2: "var(--colorPaletteLightGreenBorder2)",
    colorPaletteLightGreenForeground1: "var(--colorPaletteLightGreenForeground1)",
    colorPaletteLightGreenForeground2: "var(--colorPaletteLightGreenForeground2)",
    colorPaletteLightGreenForeground3: "var(--colorPaletteLightGreenForeground3)",
    // Color palette anchor tokens
    colorPaletteAnchorBackground2: "var(--colorPaletteAnchorBackground2)",
    colorPaletteAnchorBorderActive: "var(--colorPaletteAnchorBorderActive)",
    colorPaletteAnchorForeground2: "var(--colorPaletteAnchorForeground2)",
    // Color palette beige tokens
    colorPaletteBeigeBackground2: "var(--colorPaletteBeigeBackground2)",
    colorPaletteBeigeBorderActive: "var(--colorPaletteBeigeBorderActive)",
    colorPaletteBeigeForeground2: "var(--colorPaletteBeigeForeground2)",
    // Color palette blue tokens
    colorPaletteBlueBackground2: "var(--colorPaletteBlueBackground2)",
    colorPaletteBlueBorderActive: "var(--colorPaletteBlueBorderActive)",
    colorPaletteBlueForeground2: "var(--colorPaletteBlueForeground2)",
    // Color palette brass tokens
    colorPaletteBrassBackground2: "var(--colorPaletteBrassBackground2)",
    colorPaletteBrassBorderActive: "var(--colorPaletteBrassBorderActive)",
    colorPaletteBrassForeground2: "var(--colorPaletteBrassForeground2)",
    // Color palette brown tokens
    colorPaletteBrownBackground2: "var(--colorPaletteBrownBackground2)",
    colorPaletteBrownBorderActive: "var(--colorPaletteBrownBorderActive)",
    colorPaletteBrownForeground2: "var(--colorPaletteBrownForeground2)",
    // Color palette cornflower tokens
    colorPaletteCornflowerBackground2: "var(--colorPaletteCornflowerBackground2)",
    colorPaletteCornflowerBorderActive: "var(--colorPaletteCornflowerBorderActive)",
    colorPaletteCornflowerForeground2: "var(--colorPaletteCornflowerForeground2)",
    // Color palette cranberry tokens
    colorPaletteCranberryBackground2: "var(--colorPaletteCranberryBackground2)",
    colorPaletteCranberryBorderActive: "var(--colorPaletteCranberryBorderActive)",
    colorPaletteCranberryForeground2: "var(--colorPaletteCranberryForeground2)",
    // Color palette dark green tokens
    colorPaletteDarkGreenBackground2: "var(--colorPaletteDarkGreenBackground2)",
    colorPaletteDarkGreenBorderActive: "var(--colorPaletteDarkGreenBorderActive)",
    colorPaletteDarkGreenForeground2: "var(--colorPaletteDarkGreenForeground2)",
    // Color palette dark red tokens
    colorPaletteDarkRedBackground2: "var(--colorPaletteDarkRedBackground2)",
    colorPaletteDarkRedBorderActive: "var(--colorPaletteDarkRedBorderActive)",
    colorPaletteDarkRedForeground2: "var(--colorPaletteDarkRedForeground2)",
    // Color palette forest tokens
    colorPaletteForestBackground2: "var(--colorPaletteForestBackground2)",
    colorPaletteForestBorderActive: "var(--colorPaletteForestBorderActive)",
    colorPaletteForestForeground2: "var(--colorPaletteForestForeground2)",
    // Color palette gold tokens
    colorPaletteGoldBackground2: "var(--colorPaletteGoldBackground2)",
    colorPaletteGoldBorderActive: "var(--colorPaletteGoldBorderActive)",
    colorPaletteGoldForeground2: "var(--colorPaletteGoldForeground2)",
    // Color palette grape tokens
    colorPaletteGrapeBackground2: "var(--colorPaletteGrapeBackground2)",
    colorPaletteGrapeBorderActive: "var(--colorPaletteGrapeBorderActive)",
    colorPaletteGrapeForeground2: "var(--colorPaletteGrapeForeground2)",
    // Color palette lavender tokens
    colorPaletteLavenderBackground2: "var(--colorPaletteLavenderBackground2)",
    colorPaletteLavenderBorderActive: "var(--colorPaletteLavenderBorderActive)",
    colorPaletteLavenderForeground2: "var(--colorPaletteLavenderForeground2)",
    // Color palette light teal tokens
    colorPaletteLightTealBackground2: "var(--colorPaletteLightTealBackground2)",
    colorPaletteLightTealBorderActive: "var(--colorPaletteLightTealBorderActive)",
    colorPaletteLightTealForeground2: "var(--colorPaletteLightTealForeground2)",
    // Color palette lilac tokens
    colorPaletteLilacBackground2: "var(--colorPaletteLilacBackground2)",
    colorPaletteLilacBorderActive: "var(--colorPaletteLilacBorderActive)",
    colorPaletteLilacForeground2: "var(--colorPaletteLilacForeground2)",
    // Color palette magenta tokens
    colorPaletteMagentaBackground2: "var(--colorPaletteMagentaBackground2)",
    colorPaletteMagentaBorderActive: "var(--colorPaletteMagentaBorderActive)",
    colorPaletteMagentaForeground2: "var(--colorPaletteMagentaForeground2)",
    // Color palette mink tokens
    colorPaletteMinkBackground2: "var(--colorPaletteMinkBackground2)",
    colorPaletteMinkBorderActive: "var(--colorPaletteMinkBorderActive)",
    colorPaletteMinkForeground2: "var(--colorPaletteMinkForeground2)",
    // Color palette navy tokens
    colorPaletteNavyBackground2: "var(--colorPaletteNavyBackground2)",
    colorPaletteNavyBorderActive: "var(--colorPaletteNavyBorderActive)",
    colorPaletteNavyForeground2: "var(--colorPaletteNavyForeground2)",
    // Color palette peach tokens
    colorPalettePeachBackground2: "var(--colorPalettePeachBackground2)",
    colorPalettePeachBorderActive: "var(--colorPalettePeachBorderActive)",
    colorPalettePeachForeground2: "var(--colorPalettePeachForeground2)",
    // Color palette pink tokens
    colorPalettePinkBackground2: "var(--colorPalettePinkBackground2)",
    colorPalettePinkBorderActive: "var(--colorPalettePinkBorderActive)",
    colorPalettePinkForeground2: "var(--colorPalettePinkForeground2)",
    // Color palette platinum tokens
    colorPalettePlatinumBackground2: "var(--colorPalettePlatinumBackground2)",
    colorPalettePlatinumBorderActive: "var(--colorPalettePlatinumBorderActive)",
    colorPalettePlatinumForeground2: "var(--colorPalettePlatinumForeground2)",
    // Color palette plum tokens
    colorPalettePlumBackground2: "var(--colorPalettePlumBackground2)",
    colorPalettePlumBorderActive: "var(--colorPalettePlumBorderActive)",
    colorPalettePlumForeground2: "var(--colorPalettePlumForeground2)",
    // Color palette pumpkin tokens
    colorPalettePumpkinBackground2: "var(--colorPalettePumpkinBackground2)",
    colorPalettePumpkinBorderActive: "var(--colorPalettePumpkinBorderActive)",
    colorPalettePumpkinForeground2: "var(--colorPalettePumpkinForeground2)",
    // Color palette purple tokens
    colorPalettePurpleBackground2: "var(--colorPalettePurpleBackground2)",
    colorPalettePurpleBorderActive: "var(--colorPalettePurpleBorderActive)",
    colorPalettePurpleForeground2: "var(--colorPalettePurpleForeground2)",
    // Color palette royal blue tokens
    colorPaletteRoyalBlueBackground2: "var(--colorPaletteRoyalBlueBackground2)",
    colorPaletteRoyalBlueBorderActive: "var(--colorPaletteRoyalBlueBorderActive)",
    colorPaletteRoyalBlueForeground2: "var(--colorPaletteRoyalBlueForeground2)",
    // Color palette seafoam tokens
    colorPaletteSeafoamBackground2: "var(--colorPaletteSeafoamBackground2)",
    colorPaletteSeafoamBorderActive: "var(--colorPaletteSeafoamBorderActive)",
    colorPaletteSeafoamForeground2: "var(--colorPaletteSeafoamForeground2)",
    // Color palette steel tokens
    colorPaletteSteelBackground2: "var(--colorPaletteSteelBackground2)",
    colorPaletteSteelBorderActive: "var(--colorPaletteSteelBorderActive)",
    colorPaletteSteelForeground2: "var(--colorPaletteSteelForeground2)",
    // Color palette teal tokens
    colorPaletteTealBackground2: "var(--colorPaletteTealBackground2)",
    colorPaletteTealBorderActive: "var(--colorPaletteTealBorderActive)",
    colorPaletteTealForeground2: "var(--colorPaletteTealForeground2)",
    // Color status success tokens
    colorStatusSuccessBackground1: "var(--colorStatusSuccessBackground1)",
    colorStatusSuccessBackground2: "var(--colorStatusSuccessBackground2)",
    colorStatusSuccessBackground3: "var(--colorStatusSuccessBackground3)",
    colorStatusSuccessForeground1: "var(--colorStatusSuccessForeground1)",
    colorStatusSuccessForeground2: "var(--colorStatusSuccessForeground2)",
    colorStatusSuccessForeground3: "var(--colorStatusSuccessForeground3)",
    colorStatusSuccessForegroundInverted: "var(--colorStatusSuccessForegroundInverted)",
    colorStatusSuccessBorderActive: "var(--colorStatusSuccessBorderActive)",
    colorStatusSuccessBorder1: "var(--colorStatusSuccessBorder1)",
    colorStatusSuccessBorder2: "var(--colorStatusSuccessBorder2)",
    // Color status warning tokens
    colorStatusWarningBackground1: "var(--colorStatusWarningBackground1)",
    colorStatusWarningBackground2: "var(--colorStatusWarningBackground2)",
    colorStatusWarningBackground3: "var(--colorStatusWarningBackground3)",
    colorStatusWarningForeground1: "var(--colorStatusWarningForeground1)",
    colorStatusWarningForeground2: "var(--colorStatusWarningForeground2)",
    colorStatusWarningForeground3: "var(--colorStatusWarningForeground3)",
    colorStatusWarningForegroundInverted: "var(--colorStatusWarningForegroundInverted)",
    colorStatusWarningBorderActive: "var(--colorStatusWarningBorderActive)",
    colorStatusWarningBorder1: "var(--colorStatusWarningBorder1)",
    colorStatusWarningBorder2: "var(--colorStatusWarningBorder2)",
    // Color status danger tokens
    colorStatusDangerBackground1: "var(--colorStatusDangerBackground1)",
    colorStatusDangerBackground2: "var(--colorStatusDangerBackground2)",
    colorStatusDangerBackground3: "var(--colorStatusDangerBackground3)",
    colorStatusDangerForeground1: "var(--colorStatusDangerForeground1)",
    colorStatusDangerForeground2: "var(--colorStatusDangerForeground2)",
    colorStatusDangerForeground3: "var(--colorStatusDangerForeground3)",
    colorStatusDangerForegroundInverted: "var(--colorStatusDangerForegroundInverted)",
    colorStatusDangerBorderActive: "var(--colorStatusDangerBorderActive)",
    colorStatusDangerBorder1: "var(--colorStatusDangerBorder1)",
    colorStatusDangerBorder2: "var(--colorStatusDangerBorder2)",
    // Border radius tokens
    borderRadiusNone: "var(--borderRadiusNone)",
    borderRadiusSmall: "var(--borderRadiusSmall)",
    borderRadiusMedium: "var(--borderRadiusMedium)",
    borderRadiusLarge: "var(--borderRadiusLarge)",
    borderRadiusXLarge: "var(--borderRadiusXLarge)",
    borderRadiusCircular: "var(--borderRadiusCircular)",
    // Font family tokens
    fontFamilyBase: "var(--fontFamilyBase)",
    fontFamilyMonospace: "var(--fontFamilyMonospace)",
    fontFamilyNumeric: "var(--fontFamilyNumeric)",
    // Font size tokens
    fontSizeBase100: "var(--fontSizeBase100)",
    fontSizeBase200: "var(--fontSizeBase200)",
    fontSizeBase300: "var(--fontSizeBase300)",
    fontSizeBase400: "var(--fontSizeBase400)",
    fontSizeBase500: "var(--fontSizeBase500)",
    fontSizeBase600: "var(--fontSizeBase600)",
    fontSizeHero700: "var(--fontSizeHero700)",
    fontSizeHero800: "var(--fontSizeHero800)",
    fontSizeHero900: "var(--fontSizeHero900)",
    fontSizeHero1000: "var(--fontSizeHero1000)",
    // Font weight tokens
    fontWeightRegular: "var(--fontWeightRegular)",
    fontWeightMedium: "var(--fontWeightMedium)",
    fontWeightSemibold: "var(--fontWeightSemibold)",
    fontWeightBold: "var(--fontWeightBold)",
    // Line height tokens
    lineHeightBase100: "var(--lineHeightBase100)",
    lineHeightBase200: "var(--lineHeightBase200)",
    lineHeightBase300: "var(--lineHeightBase300)",
    lineHeightBase400: "var(--lineHeightBase400)",
    lineHeightBase500: "var(--lineHeightBase500)",
    lineHeightBase600: "var(--lineHeightBase600)",
    lineHeightHero700: "var(--lineHeightHero700)",
    lineHeightHero800: "var(--lineHeightHero800)",
    lineHeightHero900: "var(--lineHeightHero900)",
    lineHeightHero1000: "var(--lineHeightHero1000)",
    // Shadow tokens
    shadow2: "var(--shadow2)",
    shadow4: "var(--shadow4)",
    shadow8: "var(--shadow8)",
    shadow16: "var(--shadow16)",
    shadow28: "var(--shadow28)",
    shadow64: "var(--shadow64)",
    // Shadow brand tokens
    shadow2Brand: "var(--shadow2Brand)",
    shadow4Brand: "var(--shadow4Brand)",
    shadow8Brand: "var(--shadow8Brand)",
    shadow16Brand: "var(--shadow16Brand)",
    shadow28Brand: "var(--shadow28Brand)",
    shadow64Brand: "var(--shadow64Brand)",
    // Stroke width tokens
    strokeWidthThin: "var(--strokeWidthThin)",
    strokeWidthThick: "var(--strokeWidthThick)",
    strokeWidthThicker: "var(--strokeWidthThicker)",
    strokeWidthThickest: "var(--strokeWidthThickest)",
    // Spacings
    spacingHorizontalNone: "var(--spacingHorizontalNone)",
    spacingHorizontalXXS: "var(--spacingHorizontalXXS)",
    spacingHorizontalXS: "var(--spacingHorizontalXS)",
    spacingHorizontalSNudge: "var(--spacingHorizontalSNudge)",
    spacingHorizontalS: "var(--spacingHorizontalS)",
    spacingHorizontalMNudge: "var(--spacingHorizontalMNudge)",
    spacingHorizontalM: "var(--spacingHorizontalM)",
    spacingHorizontalL: "var(--spacingHorizontalL)",
    spacingHorizontalXL: "var(--spacingHorizontalXL)",
    spacingHorizontalXXL: "var(--spacingHorizontalXXL)",
    spacingHorizontalXXXL: "var(--spacingHorizontalXXXL)",
    spacingVerticalNone: "var(--spacingVerticalNone)",
    spacingVerticalXXS: "var(--spacingVerticalXXS)",
    spacingVerticalXS: "var(--spacingVerticalXS)",
    spacingVerticalSNudge: "var(--spacingVerticalSNudge)",
    spacingVerticalS: "var(--spacingVerticalS)",
    spacingVerticalMNudge: "var(--spacingVerticalMNudge)",
    spacingVerticalM: "var(--spacingVerticalM)",
    spacingVerticalL: "var(--spacingVerticalL)",
    spacingVerticalXL: "var(--spacingVerticalXL)",
    spacingVerticalXXL: "var(--spacingVerticalXXL)",
    spacingVerticalXXXL: "var(--spacingVerticalXXXL)",
    // Durations
    durationUltraFast: "var(--durationUltraFast)",
    durationFaster: "var(--durationFaster)",
    durationFast: "var(--durationFast)",
    durationNormal: "var(--durationNormal)",
    durationGentle: "var(--durationGentle)",
    durationSlow: "var(--durationSlow)",
    durationSlower: "var(--durationSlower)",
    durationUltraSlow: "var(--durationUltraSlow)",
    // Curves
    curveAccelerateMax: "var(--curveAccelerateMax)",
    curveAccelerateMid: "var(--curveAccelerateMid)",
    curveAccelerateMin: "var(--curveAccelerateMin)",
    curveDecelerateMax: "var(--curveDecelerateMax)",
    curveDecelerateMid: "var(--curveDecelerateMid)",
    curveDecelerateMin: "var(--curveDecelerateMin)",
    curveEasyEaseMax: "var(--curveEasyEaseMax)",
    curveEasyEase: "var(--curveEasyEase)",
    curveLinear: "var(--curveLinear)"
  };
  var typographyStyles = {
    body1: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase300,
      fontWeight: tokens$1.fontWeightRegular,
      lineHeight: tokens$1.lineHeightBase300
    },
    body1Strong: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase300,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightBase300
    },
    body1Stronger: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase300,
      fontWeight: tokens$1.fontWeightBold,
      lineHeight: tokens$1.lineHeightBase300
    },
    body2: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase400,
      fontWeight: tokens$1.fontWeightRegular,
      lineHeight: tokens$1.lineHeightBase400
    },
    caption1: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase200,
      fontWeight: tokens$1.fontWeightRegular,
      lineHeight: tokens$1.lineHeightBase200
    },
    caption1Strong: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase200,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightBase200
    },
    caption1Stronger: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase200,
      fontWeight: tokens$1.fontWeightBold,
      lineHeight: tokens$1.lineHeightBase200
    },
    caption2: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase100,
      fontWeight: tokens$1.fontWeightRegular,
      lineHeight: tokens$1.lineHeightBase100
    },
    caption2Strong: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase100,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightBase100
    },
    subtitle1: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase500,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightBase500
    },
    subtitle2: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase400,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightBase400
    },
    subtitle2Stronger: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase400,
      fontWeight: tokens$1.fontWeightBold,
      lineHeight: tokens$1.lineHeightBase400
    },
    title1: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeHero800,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightHero800
    },
    title2: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeHero700,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightHero700
    },
    title3: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeBase600,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightBase600
    },
    largeTitle: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeHero900,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightHero900
    },
    display: {
      fontFamily: tokens$1.fontFamilyBase,
      fontSize: tokens$1.fontSizeHero1000,
      fontWeight: tokens$1.fontWeightSemibold,
      lineHeight: tokens$1.lineHeightHero1000
    }
  };
  function createShadowTokens(ambientColor, keyColor, tokenSuffix = "") {
    return {
      [`shadow2${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 1px 2px ${keyColor}`,
      [`shadow4${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 2px 4px ${keyColor}`,
      [`shadow8${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 4px 8px ${keyColor}`,
      [`shadow16${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 8px 16px ${keyColor}`,
      [`shadow28${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 14px 28px ${keyColor}`,
      [`shadow64${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 32px 64px ${keyColor}`
    };
  }
  var createLightTheme = (brand) => {
    const colorTokens = generateColorTokens$2(brand);
    return {
      ...borderRadius,
      ...fontSizes,
      ...lineHeights,
      ...fontFamilies,
      ...fontWeights,
      ...strokeWidths,
      ...horizontalSpacings,
      ...verticalSpacings,
      ...durations,
      ...curves,
      ...colorTokens,
      ...colorPaletteTokens$2,
      ...colorStatusTokens$2,
      ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
      ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, "Brand")
    };
  };
  var brandWeb = {
    10: `#061724`,
    20: `#082338`,
    30: `#0a2e4a`,
    40: `#0c3b5e`,
    50: `#0e4775`,
    60: `#0f548c`,
    70: `#115ea3`,
    80: `#0f6cbd`,
    90: `#2886de`,
    100: `#479ef5`,
    110: `#62abf5`,
    120: `#77b7f7`,
    130: `#96c6fa`,
    140: `#b4d6fa`,
    150: `#cfe4fa`,
    160: `#ebf3fc`
  };
  var statusColorPaletteTokens$1 = statusSharedColorNames.reduce((acc, sharedColor) => {
    const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
    const sharedColorTokens = {
      [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].shade40,
      [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].shade30,
      [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
      [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].tint30,
      [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].tint40,
      [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].tint20,
      [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].tint30,
      [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].primary,
      [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].tint20
    };
    return Object.assign(acc, sharedColorTokens);
  }, {});
  statusColorPaletteTokens$1.colorPaletteRedForeground3 = statusSharedColors.red.tint30;
  statusColorPaletteTokens$1.colorPaletteRedBorder2 = statusSharedColors.red.tint30;
  statusColorPaletteTokens$1.colorPaletteGreenForeground3 = statusSharedColors.green.tint40;
  statusColorPaletteTokens$1.colorPaletteGreenBorder2 = statusSharedColors.green.tint40;
  statusColorPaletteTokens$1.colorPaletteDarkOrangeForeground3 = statusSharedColors.darkOrange.tint30;
  statusColorPaletteTokens$1.colorPaletteDarkOrangeBorder2 = statusSharedColors.darkOrange.tint30;
  statusColorPaletteTokens$1.colorPaletteRedForegroundInverted = statusSharedColors.red.primary;
  statusColorPaletteTokens$1.colorPaletteGreenForegroundInverted = statusSharedColors.green.primary;
  statusColorPaletteTokens$1.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.shade30;
  var personaColorPaletteTokens$1 = personaSharedColorNames.reduce((acc, sharedColor) => {
    const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
    const sharedColorTokens = {
      [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].shade30,
      [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].tint40,
      [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].tint30
    };
    return Object.assign(acc, sharedColorTokens);
  }, {});
  personaColorPaletteTokens$1.colorPaletteDarkRedBackground2 = personaSharedColors.darkRed.shade20;
  personaColorPaletteTokens$1.colorPalettePlumBackground2 = personaSharedColors.plum.shade20;
  var colorPaletteTokens$1 = {
    ...statusColorPaletteTokens$1,
    ...personaColorPaletteTokens$1
  };
  var colorStatusTokens$1 = Object.entries(statusColorMapping).reduce((acc, [statusColor, sharedColor]) => {
    const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);
    const statusColorTokens = {
      [`colorStatus${color}Background1`]: mappedStatusColors[sharedColor].shade40,
      [`colorStatus${color}Background2`]: mappedStatusColors[sharedColor].shade30,
      [`colorStatus${color}Background3`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Foreground1`]: mappedStatusColors[sharedColor].tint30,
      [`colorStatus${color}Foreground2`]: mappedStatusColors[sharedColor].tint40,
      [`colorStatus${color}Foreground3`]: mappedStatusColors[sharedColor].tint20,
      [`colorStatus${color}BorderActive`]: mappedStatusColors[sharedColor].tint30,
      [`colorStatus${color}ForegroundInverted`]: mappedStatusColors[sharedColor].shade10,
      [`colorStatus${color}Border1`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Border2`]: mappedStatusColors[sharedColor].tint20
    };
    return Object.assign(acc, statusColorTokens);
  }, {});
  colorStatusTokens$1.colorStatusDangerForeground3 = mappedStatusColors[statusColorMapping.danger].tint30;
  colorStatusTokens$1.colorStatusDangerBorder2 = mappedStatusColors[statusColorMapping.danger].tint30;
  colorStatusTokens$1.colorStatusSuccessForeground3 = mappedStatusColors[statusColorMapping.success].tint40;
  colorStatusTokens$1.colorStatusSuccessBorder2 = mappedStatusColors[statusColorMapping.success].tint40;
  colorStatusTokens$1.colorStatusWarningForegroundInverted = mappedStatusColors[statusColorMapping.warning].shade20;
  var statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
    const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
    const sharedColorTokens = {
      [`colorPalette${color}Background1`]: hcCanvas,
      [`colorPalette${color}Background2`]: hcCanvas,
      [`colorPalette${color}Background3`]: hcCanvasText,
      [`colorPalette${color}Foreground1`]: hcCanvasText,
      [`colorPalette${color}Foreground2`]: hcCanvasText,
      [`colorPalette${color}Foreground3`]: hcCanvasText,
      [`colorPalette${color}BorderActive`]: hcHighlight,
      [`colorPalette${color}Border1`]: hcCanvasText,
      [`colorPalette${color}Border2`]: hcCanvasText
    };
    return Object.assign(acc, sharedColorTokens);
  }, {});
  statusColorPaletteTokens.colorPaletteRedForegroundInverted = hcCanvasText;
  statusColorPaletteTokens.colorPaletteGreenForegroundInverted = hcCanvasText;
  statusColorPaletteTokens.colorPaletteYellowForegroundInverted = hcCanvasText;
  var personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
    const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
    const sharedColorTokens = {
      [`colorPalette${color}Background2`]: hcCanvas,
      [`colorPalette${color}Foreground2`]: hcCanvasText,
      [`colorPalette${color}BorderActive`]: hcHighlight
    };
    return Object.assign(acc, sharedColorTokens);
  }, {});
  var colorPaletteTokens = {
    ...statusColorPaletteTokens,
    ...personaColorPaletteTokens
  };
  var colorStatusTokens = Object.entries(statusColorMapping).reduce((acc, [statusColor, sharedColor]) => {
    const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);
    const statusColorTokens = {
      [`colorStatus${color}Background1`]: hcCanvas,
      [`colorStatus${color}Background2`]: hcCanvas,
      [`colorStatus${color}Background3`]: hcCanvasText,
      [`colorStatus${color}Foreground1`]: hcCanvasText,
      [`colorStatus${color}Foreground2`]: hcCanvasText,
      [`colorStatus${color}Foreground3`]: hcCanvasText,
      [`colorStatus${color}BorderActive`]: hcHighlight,
      [`colorStatus${color}ForegroundInverted`]: hcCanvasText,
      [`colorStatus${color}Border1`]: hcCanvasText,
      [`colorStatus${color}Border2`]: hcCanvasText
    };
    return Object.assign(acc, statusColorTokens);
  }, {});
  var webLightTheme$1 = createLightTheme(brandWeb);
  var generateColorTokens = (brand) => ({
    colorNeutralForeground1: white,
    colorNeutralForeground1Hover: white,
    colorNeutralForeground1Pressed: white,
    colorNeutralForeground1Selected: white,
    colorNeutralForeground2: grey[84],
    colorNeutralForeground2Hover: white,
    colorNeutralForeground2Pressed: white,
    colorNeutralForeground2Selected: white,
    colorNeutralForeground2BrandHover: brand[100],
    colorNeutralForeground2BrandPressed: brand[90],
    colorNeutralForeground2BrandSelected: brand[100],
    colorNeutralForeground3: grey[68],
    colorNeutralForeground3Hover: grey[84],
    colorNeutralForeground3Pressed: grey[84],
    colorNeutralForeground3Selected: grey[84],
    colorNeutralForeground3BrandHover: brand[100],
    colorNeutralForeground3BrandPressed: brand[90],
    colorNeutralForeground3BrandSelected: brand[100],
    colorNeutralForeground4: grey[60],
    colorNeutralForegroundDisabled: grey[36],
    colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
    colorBrandForegroundLink: brand[100],
    colorBrandForegroundLinkHover: brand[110],
    colorBrandForegroundLinkPressed: brand[90],
    colorBrandForegroundLinkSelected: brand[100],
    colorNeutralForeground2Link: grey[84],
    colorNeutralForeground2LinkHover: white,
    colorNeutralForeground2LinkPressed: white,
    colorNeutralForeground2LinkSelected: white,
    colorCompoundBrandForeground1: brand[100],
    colorCompoundBrandForeground1Hover: brand[110],
    colorCompoundBrandForeground1Pressed: brand[90],
    colorBrandForeground1: brand[100],
    colorBrandForeground2: brand[110],
    colorBrandForeground2Hover: brand[130],
    colorBrandForeground2Pressed: brand[160],
    colorNeutralForeground1Static: grey[14],
    colorNeutralForegroundStaticInverted: white,
    colorNeutralForegroundInverted: grey[14],
    colorNeutralForegroundInvertedHover: grey[14],
    colorNeutralForegroundInvertedPressed: grey[14],
    colorNeutralForegroundInvertedSelected: grey[14],
    colorNeutralForegroundInverted2: grey[14],
    colorNeutralForegroundOnBrand: white,
    colorNeutralForegroundInvertedLink: white,
    colorNeutralForegroundInvertedLinkHover: white,
    colorNeutralForegroundInvertedLinkPressed: white,
    colorNeutralForegroundInvertedLinkSelected: white,
    colorBrandForegroundInverted: brand[80],
    colorBrandForegroundInvertedHover: brand[70],
    colorBrandForegroundInvertedPressed: brand[60],
    colorBrandForegroundOnLight: brand[80],
    colorBrandForegroundOnLightHover: brand[70],
    colorBrandForegroundOnLightPressed: brand[50],
    colorBrandForegroundOnLightSelected: brand[60],
    colorNeutralBackground1: grey[16],
    colorNeutralBackground1Hover: grey[24],
    colorNeutralBackground1Pressed: grey[12],
    colorNeutralBackground1Selected: grey[22],
    colorNeutralBackground2: grey[12],
    colorNeutralBackground2Hover: grey[20],
    colorNeutralBackground2Pressed: grey[8],
    colorNeutralBackground2Selected: grey[18],
    colorNeutralBackground3: grey[8],
    colorNeutralBackground3Hover: grey[16],
    colorNeutralBackground3Pressed: grey[4],
    colorNeutralBackground3Selected: grey[14],
    colorNeutralBackground4: grey[4],
    colorNeutralBackground4Hover: grey[12],
    colorNeutralBackground4Pressed: black,
    colorNeutralBackground4Selected: grey[10],
    colorNeutralBackground5: black,
    colorNeutralBackground5Hover: grey[8],
    colorNeutralBackground5Pressed: grey[2],
    colorNeutralBackground5Selected: grey[6],
    colorNeutralBackground6: grey[20],
    colorNeutralBackgroundInverted: white,
    colorNeutralBackgroundStatic: grey[24],
    colorNeutralBackgroundAlpha: grey10Alpha[50],
    colorNeutralBackgroundAlpha2: grey12Alpha[70],
    colorSubtleBackground: "transparent",
    colorSubtleBackgroundHover: grey[22],
    colorSubtleBackgroundPressed: grey[18],
    colorSubtleBackgroundSelected: grey[20],
    colorSubtleBackgroundLightAlphaHover: grey14Alpha[80],
    colorSubtleBackgroundLightAlphaPressed: grey14Alpha[50],
    colorSubtleBackgroundLightAlphaSelected: "transparent",
    colorSubtleBackgroundInverted: "transparent",
    colorSubtleBackgroundInvertedHover: blackAlpha[10],
    colorSubtleBackgroundInvertedPressed: blackAlpha[30],
    colorSubtleBackgroundInvertedSelected: blackAlpha[20],
    colorTransparentBackground: "transparent",
    colorTransparentBackgroundHover: "transparent",
    colorTransparentBackgroundPressed: "transparent",
    colorTransparentBackgroundSelected: "transparent",
    colorNeutralBackgroundDisabled: grey[8],
    colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
    colorNeutralStencil1: grey[34],
    colorNeutralStencil2: grey[20],
    colorNeutralStencil1Alpha: whiteAlpha[10],
    colorNeutralStencil2Alpha: whiteAlpha[5],
    colorBackgroundOverlay: blackAlpha[50],
    colorScrollbarOverlay: whiteAlpha[60],
    colorBrandBackground: brand[70],
    colorBrandBackgroundHover: brand[80],
    colorBrandBackgroundPressed: brand[40],
    colorBrandBackgroundSelected: brand[60],
    colorCompoundBrandBackground: brand[100],
    colorCompoundBrandBackgroundHover: brand[110],
    colorCompoundBrandBackgroundPressed: brand[90],
    colorBrandBackgroundStatic: brand[80],
    colorBrandBackground2: brand[20],
    colorBrandBackground2Hover: brand[40],
    colorBrandBackground2Pressed: brand[10],
    colorBrandBackgroundInverted: white,
    colorBrandBackgroundInvertedHover: brand[160],
    colorBrandBackgroundInvertedPressed: brand[140],
    colorBrandBackgroundInvertedSelected: brand[150],
    colorNeutralStrokeAccessible: grey[68],
    colorNeutralStrokeAccessibleHover: grey[74],
    colorNeutralStrokeAccessiblePressed: grey[70],
    colorNeutralStrokeAccessibleSelected: brand[100],
    colorNeutralStroke1: grey[40],
    colorNeutralStroke1Hover: grey[46],
    colorNeutralStroke1Pressed: grey[42],
    colorNeutralStroke1Selected: grey[44],
    colorNeutralStroke2: grey[32],
    colorNeutralStroke3: grey[24],
    colorNeutralStrokeSubtle: grey[4],
    colorNeutralStrokeOnBrand: grey[16],
    colorNeutralStrokeOnBrand2: white,
    colorNeutralStrokeOnBrand2Hover: white,
    colorNeutralStrokeOnBrand2Pressed: white,
    colorNeutralStrokeOnBrand2Selected: white,
    colorBrandStroke1: brand[100],
    colorBrandStroke2: brand[50],
    colorBrandStroke2Hover: brand[50],
    colorBrandStroke2Pressed: brand[30],
    colorBrandStroke2Contrast: brand[50],
    colorCompoundBrandStroke: brand[100],
    colorCompoundBrandStrokeHover: brand[110],
    colorCompoundBrandStrokePressed: brand[90],
    colorNeutralStrokeDisabled: grey[26],
    colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
    colorTransparentStroke: "transparent",
    colorTransparentStrokeInteractive: "transparent",
    colorTransparentStrokeDisabled: "transparent",
    colorNeutralStrokeAlpha: whiteAlpha[10],
    colorNeutralStrokeAlpha2: whiteAlpha[20],
    colorStrokeFocus1: black,
    colorStrokeFocus2: white,
    colorNeutralShadowAmbient: "rgba(0,0,0,0.24)",
    colorNeutralShadowKey: "rgba(0,0,0,0.28)",
    colorNeutralShadowAmbientLighter: "rgba(0,0,0,0.12)",
    colorNeutralShadowKeyLighter: "rgba(0,0,0,0.14)",
    colorNeutralShadowAmbientDarker: "rgba(0,0,0,0.40)",
    colorNeutralShadowKeyDarker: "rgba(0,0,0,0.48)",
    colorBrandShadowAmbient: "rgba(0,0,0,0.30)",
    colorBrandShadowKey: "rgba(0,0,0,0.25)"
  });
  var createDarkTheme = (brand) => {
    const colorTokens = generateColorTokens(brand);
    return {
      ...borderRadius,
      ...fontSizes,
      ...lineHeights,
      ...fontFamilies,
      ...fontWeights,
      ...strokeWidths,
      ...horizontalSpacings,
      ...verticalSpacings,
      ...durations,
      ...curves,
      ...colorTokens,
      ...colorPaletteTokens$1,
      ...colorStatusTokens$1,
      ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
      ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, "Brand")
    };
  };
  var webDarkTheme$1 = createDarkTheme(brandWeb);
  function themeToTokensObject(theme) {
    const tokens2 = {};
    const keys = Object.keys(theme);
    for (const key of keys) {
      tokens2[key] = `var(--${String(key)})`;
    }
    return tokens2;
  }
  var windowsFontFamilyOverrides = {
    fontFamilyBase: '"Segoe UI Variable Display", "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif'
  };
  var macFontFamilyOverrides = {
    fontFamilyBase: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif'
  };
  var durationTokens = {
    durationSuperFast: "80ms"
  };
  var curveTokens = {
    curveLinearDecelerateMax: "cubic-bezier(0.55, 0.55, 0, 1)"
  };
  var curveTokenOverrides = {
    curveAccelerateMax: "cubic-bezier(1,0,1,1)",
    curveAccelerateMid: "cubic-bezier(0.7,0,1,0.5)",
    curveDecelerateMax: "cubic-bezier(0,0,0,1)",
    curveDecelerateMid: "cubic-bezier(0.1,0.9,0.2,1)",
    curveEasyEaseMax: "cubic-bezier(0.8,0,0.1,1)"
  };
  var lightThemeUtilities = {
    colorScrollbarForeground: "#00000072",
    colorScrollbarForegroundHover: "#0000009b",
    colorScrollbarForegroundPressed: "#0000009e",
    colorScrollbarOverlay: "#00000080",
    colorBackgroundOverlay: "#00000066"
  };
  var darkThemeUtilities = {
    colorScrollbarForeground: "#ffffff8b",
    colorScrollbarForegroundHover: "#ffffff8b",
    colorScrollbarForegroundPressed: "#ffffff8b",
    colorScrollbarOverlay: "#ffffff99",
    colorBackgroundOverlay: "#00000080"
  };
  var phoenixLightThemeWin11 = {
    ...createLightTheme(brandVariants),
    ...lightThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...win11BorderRadiusOverrides,
    ...curveTokenOverrides,
    ...lightThemeMaterials,
    ...lightThemeColors,
    ...lightThemeShadows,
    ...win11BorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...lightThemeUtilities
  };
  var phoenixDarkThemeWin11 = {
    ...createDarkTheme(brandVariants),
    ...darkThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...win11BorderRadiusOverrides,
    ...curveTokenOverrides,
    ...darkThemeMaterials,
    ...darkThemeColors,
    ...darkThemeShadows,
    ...win11BorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...darkThemeUtilities
  };
  var phoenixLightThemeSolidWin11 = {
    ...createLightTheme(brandVariants),
    ...lightThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...win11BorderRadiusOverrides,
    ...curveTokenOverrides,
    ...lightThemeSolidMaterials,
    ...lightThemeColors,
    ...lightThemeSolidColors,
    ...lightThemeShadows,
    ...win11BorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...lightThemeUtilities
  };
  var phoenixDarkThemeSolidWin11 = {
    ...createDarkTheme(brandVariants),
    ...darkThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...win11BorderRadiusOverrides,
    ...curveTokenOverrides,
    ...darkThemeSolidMaterials,
    ...darkThemeColors,
    ...darkThemeSolidColors,
    ...darkThemeShadows,
    ...win11BorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...darkThemeUtilities
  };
  var phoenixLightThemeWinNXT = {
    ...createLightTheme(brandVariants),
    ...lightThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...winNXTBorderRadiusOverrides,
    ...curveTokenOverrides,
    ...lightThemeMaterials,
    ...lightThemeColors,
    ...lightThemeShadows,
    ...winNXTBorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...lightThemeUtilities
  };
  var phoenixDarkThemeWinNXT = {
    ...createDarkTheme(brandVariants),
    ...darkThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...winNXTBorderRadiusOverrides,
    ...curveTokenOverrides,
    ...darkThemeMaterials,
    ...darkThemeColors,
    ...darkThemeShadows,
    ...winNXTBorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...darkThemeUtilities
  };
  var phoenixLightThemeSolidWinNXT = {
    ...createLightTheme(brandVariants),
    ...lightThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...winNXTBorderRadiusOverrides,
    ...curveTokenOverrides,
    ...lightThemeSolidMaterials,
    ...lightThemeColors,
    ...lightThemeSolidColors,
    ...lightThemeShadows,
    ...winNXTBorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...lightThemeUtilities
  };
  var phoenixDarkThemeSolidWinNXT = {
    ...createDarkTheme(brandVariants),
    ...darkThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...winNXTBorderRadiusOverrides,
    ...curveTokenOverrides,
    ...darkThemeSolidMaterials,
    ...darkThemeColors,
    ...darkThemeSolidColors,
    ...darkThemeShadows,
    ...winNXTBorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...darkThemeUtilities
  };
  var phoenixLightThemeSolidWin10 = {
    ...createLightTheme(brandVariants),
    ...lightThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...win10BorderRadiusOverrides,
    ...curveTokenOverrides,
    ...lightThemeSolidMaterials,
    ...lightThemeColors,
    ...lightThemeSolidColors,
    ...lightThemeShadows,
    ...win10BorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...lightThemeUtilities
  };
  var phoenixDarkThemeSolidWin10 = {
    ...createDarkTheme(brandVariants),
    ...darkThemeColorOverrides,
    ...windowsFontFamilyOverrides,
    ...win10BorderRadiusOverrides,
    ...curveTokenOverrides,
    ...darkThemeSolidMaterials,
    ...darkThemeColors,
    ...darkThemeSolidColors,
    ...darkThemeShadows,
    ...win10BorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...darkThemeUtilities
  };
  var phoenixLightThemeMac = {
    ...createLightTheme(brandVariants),
    ...lightThemeColorOverrides,
    ...macFontFamilyOverrides,
    ...macBorderRadiusOverrides,
    ...curveTokenOverrides,
    ...lightThemeMaterials,
    ...lightThemeColors,
    ...lightThemeShadows,
    ...macBorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...lightThemeUtilities
  };
  var phoenixDarkThemeMac = {
    ...createDarkTheme(brandVariants),
    ...darkThemeColorOverrides,
    ...macFontFamilyOverrides,
    ...macBorderRadiusOverrides,
    ...curveTokenOverrides,
    ...darkThemeMaterials,
    ...darkThemeColors,
    ...darkThemeShadows,
    ...macBorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...darkThemeUtilities
  };
  var phoenixLightThemeSolidMac = {
    ...createLightTheme(brandVariants),
    ...lightThemeColorOverrides,
    ...macFontFamilyOverrides,
    ...macBorderRadiusOverrides,
    ...curveTokenOverrides,
    ...lightThemeSolidMaterials,
    ...lightThemeColors,
    ...lightThemeSolidColors,
    ...lightThemeShadows,
    ...macBorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...lightThemeUtilities
  };
  var phoenixDarkThemeSolidMac = {
    ...createDarkTheme(brandVariants),
    ...darkThemeColorOverrides,
    ...macFontFamilyOverrides,
    ...macBorderRadiusOverrides,
    ...curveTokenOverrides,
    ...darkThemeSolidMaterials,
    ...darkThemeColors,
    ...darkThemeSolidColors,
    ...darkThemeShadows,
    ...macBorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...darkThemeUtilities
  };
  var webLightTheme = {
    ...webLightTheme$1,
    ...lightThemeSolidMaterials,
    ...lightThemeColors,
    ...lightThemeSolidColors,
    ...lightThemeShadows,
    ...win11BorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...lightThemeUtilities
  };
  var webDarkTheme = {
    ...webDarkTheme$1,
    ...darkThemeSolidMaterials,
    ...darkThemeColors,
    ...darkThemeSolidColors,
    ...darkThemeShadows,
    ...win11BorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...darkThemeUtilities
  };
  var borderRadiusSmall = "var(--borderRadiusSmall)";
  var borderRadiusMedium = "var(--borderRadiusMedium)";
  var fontSizeBase200 = "var(--fontSizeBase200)";
  var fontSizeBase300 = "var(--fontSizeBase300)";
  var lineHeightBase200 = "var(--lineHeightBase200)";
  var lineHeightBase300 = "var(--lineHeightBase300)";
  var fontFamilyBase = "var(--fontFamilyBase)";
  var fontWeightRegular = "var(--fontWeightRegular)";
  var strokeWidthThin = "var(--strokeWidthThin)";
  var spacingHorizontalXS = "var(--spacingHorizontalXS)";
  var spacingHorizontalS = "var(--spacingHorizontalS)";
  var spacingHorizontalM = "var(--spacingHorizontalM)";
  var spacingHorizontalL = "var(--spacingHorizontalL)";
  var colorNeutralForeground1 = "var(--colorNeutralForeground1)";
  var colorNeutralForeground4 = "var(--colorNeutralForeground4)";
  var colorNeutralStroke1 = "var(--colorNeutralStroke1)";
  var shadow28 = "var(--shadow28)";
  var micaBackdropFilter = "var(--micaBackdropFilter)";
  var micaBackgroundBlendMode = "var(--micaBackgroundBlendMode)";
  var micaBackgroundColor = "var(--micaBackgroundColor)";
  var shadowBaseLayer = "var(--shadowBaseLayer)";
  var tokens = themeToTokensObject(phoenixLightThemeWin11);

  // ../../phoenixui/packages/web-components/dist/index.esm.js
  var setTheme = (theme, element = document.body) => {
    const tokenNames = Object.keys(theme);
    for (const t of tokenNames) {
      element.style.setProperty(`--${t}`, theme[t]);
    }
  };

  // src/windows/designSystem.ts
  var commonThemeOverrides = {
    borderRadiusSmall: "4px",
    borderRadiusMedium: "8px",
    borderRadiusLarge: "16px",
    micaBackdropFilter: "blur(120px) saturate(150%)",
    micaBackgroundBlendMode: "luminosity"
  };
  var windowsLightTheme = {
    ...webLightTheme,
    ...commonThemeOverrides,
    colorShellFillTaksbarItemPrimary: "#FFFFFFB2",
    colorShellFillTaksbarItemSecondary: "#FFFFFF80",
    colorShellFillTaksbarItemTeritary: "#FFFFFF4D",
    colorShellStrokeTaskbarItemSecondary: "#0000000f",
    colorShellStrokeTaskbarItemQuinary: "#00000005",
    colorShellFillTaskbarItemIndicator: "#00000070",
    colorFillAccent: "#005FB8",
    micaBackgroundColor: "rgba(243,243,243,0.7)"
  };
  var windowsDarkTheme = {
    ...webDarkTheme,
    ...commonThemeOverrides,
    colorShellFillTaksbarItemPrimary: "#FFFFFF15",
    colorShellFillTaksbarItemSecondary: "#FFFFFF0F",
    colorShellFillTaksbarItemTeritary: "#FFFFFF0B",
    colorShellStrokeTaskbarItemSecondary: "#FFFFFF1A",
    colorShellStrokeTaskbarItemQuinary: "#FFFFFF0F",
    colorShellFillTaskbarItemIndicator: "#FFFFFF63",
    colorFillAccent: "#005FB8",
    micaBackgroundColor: "rgba(32,32,32,0.7)"
  };
  function setTheme2(theme, element) {
    setTheme(theme === "dark" ? windowsDarkTheme : windowsLightTheme, element);
  }
  var colorShellFillTaksbarItemPrimary = "var(--colorShellFillTaksbarItemPrimary)";
  var colorShellFillTaksbarItemSecondary = "var(--colorShellFillTaksbarItemSecondary)";
  var colorShellFillTaksbarItemTeritary = "var(--colorShellFillTaksbarItemTeritary)";
  var colorShellStrokeTaskbarItemQuinary = "var(--colorShellStrokeTaskbarItemQuinary)";
  var colorShellStrokeTaskbarItemSecondary = "var(--colorShellStrokeTaskbarItemSecondary)";
  var colorShellFillTaskbarItemIndicator = "var(--colorShellFillTaskbarItemIndicator)";
  var colorFillAccent = "var(--colorFillAccent)";

  // src/services/windowsService.ts
  var WindowsService = class {
    constructor() {
      this.theme = "light";
      this.windows = [];
      this.activeWindowId = null;
    }
    openWindow(appName) {
      const id3 = crypto.randomUUID();
      const width = Math.min(window.innerWidth - 48, 1920);
      let height = width * 0.75;
      height = Math.min(height, window.innerHeight - 96);
      this.windows = [
        ...this.windows,
        {
          id: id3,
          appName,
          height,
          maximized: false,
          minHeight: 200,
          minimized: false,
          minWidth: 300,
          width,
          xPos: window.innerWidth - width - 24 + 24 * this.windows.length,
          yPos: (window.innerHeight - 48 - height) / 2 + 24 * this.windows.length,
          zIndex: this.windows.length + 1
        }
      ];
      this.activeWindowId = id3;
      return id3;
    }
    closeWindow(id3) {
      this.windows = this.windows.filter((w) => w.id !== id3);
      this.activateNextWindow(id3);
    }
    activateWindow(id3) {
      this.activeWindowId = id3;
    }
    activateNextWindow(id3) {
      if (this.activeWindowId === id3) {
        this.activeWindowId = this.windows.find((win) => win.id !== id3 && !win.minimized)?.id || null;
      }
    }
    minimizeWindow(id3) {
      this.windows = this.windows.map(
        (w) => w.id === id3 ? { ...w, minimized: true } : w
      );
      this.activateNextWindow(id3);
    }
    restoreWindow(id3) {
      this.windows = this.windows.map(
        (w) => w.id === id3 ? { ...w, minimized: false, maximized: false } : w
      );
      this.activateWindow(id3);
    }
    maximizeWindow(id3) {
      this.windows = this.windows.map(
        (w) => w.id === id3 ? { ...w, maximized: true } : w
      );
    }
  };
  __decorateClass([
    observable
  ], WindowsService.prototype, "theme", 2);
  __decorateClass([
    observable
  ], WindowsService.prototype, "windows", 2);
  __decorateClass([
    observable
  ], WindowsService.prototype, "activeWindowId", 2);

  // src/edge/index.ts
  var template = html`Edge`;
  var styles = `
  :host {
    display: block;
    width: 100%;
    height: 100%;
    background: ${micaBackgroundColor};
    backdrop-filter: ${micaBackdropFilter};
    background-blend-mode: ${micaBackgroundBlendMode};
  }
`;
  var MicrosoftEdge = class extends FASTElement {
    connectedCallback() {
      super.connectedCallback();
      console.log("Microsoft Edge connected");
      setTheme(phoenixLightThemeWin11, this);
    }
  };
  MicrosoftEdge = __decorateClass([
    customElement({
      name: "microsoft-edge",
      template,
      styles
    })
  ], MicrosoftEdge);

  // src/windows/installedApps.ts
  var installedApps_default = [
    {
      name: "Start",
      lightIcon: "img/windows/start-24.svg",
      darkIcon: "img/windows/start-24-dark.svg"
    },
    {
      name: "Search",
      lightIcon: "img/windows/search-24.svg",
      darkIcon: "img/windows/search-24-dark.svg"
    },
    {
      name: "Task View",
      lightIcon: "img/windows/task-view-24.svg",
      darkIcon: "img/windows/task-view-24-dark.svg"
    },
    {
      name: "Chat",
      lightIcon: "img/windows/chat-24.svg",
      darkIcon: "img/windows/chat-24-dark.svg"
    },
    {
      name: "File Explorer",
      lightIcon: "img/windows/file-explorer-24.svg"
    },
    {
      name: "Microsoft Edge",
      lightIcon: "img/windows/edge-24.svg",
      element: html`<microsoft-edge></microsoft-edge>`
    },
    {
      name: "Microsoft Store",
      lightIcon: "img/windows/store-24.svg",
      darkIcon: "img/windows/store-24-dark.svg"
    },
    {
      name: "Settings",
      lightIcon: "img/windows/settings-24.svg"
    }
  ];

  // src/windows/controls/taskbarButton.ts
  var template2 = html`
  <button>
    <slot></slot>
    <div part="backplate"></div>
    <div part="indicator"></div>
  </button>
`;
  var styles2 = css`
  button {
    position: relative;
    width: 44px;
    height: 44px;
    cursor: pointer;
    border: none;
    background: none;
    user-select: none;
  }

  [part='backplate'] {
    position: absolute;
    inset: 2px;
    border-radius: ${borderRadiusSmall};
    overflow: hidden;
    z-index: -1;
  }

  button:hover [part='backplate'],
  :host([running][active]) [part='backplate'] {
    background: ${colorShellFillTaksbarItemSecondary};
    border: ${strokeWidthThin} solid ${colorShellStrokeTaskbarItemSecondary};
  }

  button:hover:active [part='backplate'] {
    background: ${colorShellFillTaksbarItemTeritary};
    border: ${strokeWidthThin} solid ${colorShellStrokeTaskbarItemQuinary};
  }

  :host([running][active]) button:hover [part='backplate'] {
    background: ${colorShellFillTaksbarItemPrimary};
  }

  :host([running][active]) button:hover:active [part='backplate'] {
    background: ${colorShellFillTaksbarItemTeritary};
  }

  :host([running]) [part='indicator'] {
    background: ${colorShellFillTaskbarItemIndicator};
    position: absolute;
    bottom: 2px;
    left: calc(50% - 3px);
    width: 6px;
    height: 3px;
    border-radius: 3px;
  }

  :host([running][active]) [part='indicator'] {
    background: ${colorFillAccent};
    width: 16px;
    left: calc(50% - 8px);
  }

  slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;
  var TaskbarButton = class extends FASTElement {
  };
  TaskbarButton = __decorateClass([
    customElement({
      name: "taskbar-button",
      template: template2,
      styles: styles2
    })
  ], TaskbarButton);

  // src/windows/views/clockWidget.ts
  var template3 = html`
  <button>
    <caption-1>${(x) => x.time}</caption-1>
    <caption-1>${(x) => x.date}</caption-1>
  </button>
`;
  var styles3 = css`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    user-select: none;
    padding: 0 ${spacingHorizontalS};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;
  }
  button:hover {
    background: ${colorShellFillTaksbarItemSecondary};
  }
  button:hover:active {
    background: ${colorShellFillTaksbarItemTeritary};
  }
  caption-1 {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
    white-space: nowrap;
    color: ${colorNeutralForeground1};
  }
`;
  var ClockWidget = class extends FASTElement {
    constructor() {
      super(...arguments);
      this.time = this.formatTime();
      this.date = this.formatDate();
    }
    connectedCallback() {
      super.connectedCallback();
      const timeNow = (/* @__PURE__ */ new Date()).getSeconds();
      const timeUntilNextMinute = 60 - timeNow;
      setTimeout(() => {
        this.time = this.formatTime();
        this.date = this.formatDate();
        setInterval(() => {
          this.time = this.formatTime();
          this.date = this.formatDate();
        }, 6e4);
      }, timeUntilNextMinute * 1e3);
    }
    formatTime() {
      return (/* @__PURE__ */ new Date()).toLocaleTimeString().replace(/:\d+\s/, " ");
    }
    formatDate() {
      return (/* @__PURE__ */ new Date()).toLocaleDateString();
    }
  };
  __decorateClass([
    observable
  ], ClockWidget.prototype, "time", 2);
  __decorateClass([
    observable
  ], ClockWidget.prototype, "date", 2);
  ClockWidget = __decorateClass([
    customElement({
      name: "clock-widget",
      template: template3,
      styles: styles3
    })
  ], ClockWidget);

  // src/windows/views/systemTray.ts
  var template4 = html`
  <button>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#wifi" />
    </svg>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#volume" />
    </svg>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#battery" />
    </svg>
  </button>
`;
  var styles4 = css`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${spacingHorizontalS};
    user-select: none;
    padding: 0 ${spacingHorizontalXS};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;
    color: ${colorNeutralForeground1};
  }

  button:hover {
    background: ${colorShellFillTaksbarItemSecondary};
  }

  button:hover:active {
    background: ${colorShellFillTaksbarItemTeritary};
  }
`;
  var SystemTray = class extends FASTElement {
  };
  SystemTray = __decorateClass([
    customElement({
      name: "system-tray",
      template: template4,
      styles: styles4
    })
  ], SystemTray);

  // src/windows/controls/showDesktopButton.ts
  var styles5 = css`
  button {
    user-select: none;
    width: ${spacingHorizontalM};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;
  }
  button:hover {
    background: ${colorShellFillTaksbarItemSecondary};
  }
  button:hover:active {
    background: ${colorShellFillTaksbarItemTeritary};
  }
`;
  var ShowDesktopButton = class extends FASTElement {
  };
  ShowDesktopButton = __decorateClass([
    customElement({
      name: "show-desktop-button",
      template: html`<button>&NonBreakingSpace;</button>`,
      styles: styles5
    })
  ], ShowDesktopButton);

  // src/windows/controls/showMoreButton.ts
  var template5 = html`
  <button>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#chevron-up"></use>
    </svg>
  </button>
`;
  var styles6 = css`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${spacingHorizontalXS};
    user-select: none;
    padding: 0 ${spacingHorizontalXS};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;
    color: ${colorNeutralForeground1};
  }
  button:hover {
    background: ${colorShellFillTaksbarItemSecondary};
  }
  button:hover:active {
    background: ${colorShellFillTaksbarItemTeritary};
  }
`;
  var ShowMoreButton = class extends FASTElement {
  };
  ShowMoreButton = __decorateClass([
    customElement({
      name: "show-more-button",
      template: template5,
      styles: styles6
    })
  ], ShowMoreButton);

  // src/windows/controls/copilotButton.ts
  var template6 = html`
  <button>
    <img src="img/windows/copilot-24.svg" />
  </button>
`;
  var styles7 = css`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    height: 44px;
    width: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;
    color: ${colorNeutralForeground1};
  }
  button:hover {
    background: ${colorShellFillTaksbarItemSecondary};
  }
  button:hover:active {
    background: ${colorShellFillTaksbarItemTeritary};
  }
`;
  var CopilotButton = class extends FASTElement {
  };
  CopilotButton = __decorateClass([
    customElement({
      name: "copilot-button",
      template: template6,
      styles: styles7
    })
  ], CopilotButton);

  // src/windows/views/weatherWidget.ts
  var weatherIcons = {
    "01": "img/windows/weather-sunny-24.svg",
    "02": "img/windows/weather-partly-sunny-24.svg",
    "03": "img/windows/weather-cloudy-24.svg",
    "04": "img/windows/weather-cloudy-24.svg",
    "09": "img/windows/weather-rain-24.svg",
    "10": "img/windows/weather-rain-24.svg",
    "11": "img/windows/weather-thunder-24.svg",
    "13": "img/windows/weather-snow-24.svg",
    "50": "img/windows/weather-mist-24.svg"
  };
  var template7 = html`
  <button>
    ${when(
    (x) => !x.loaded,
    html`<caption-1>Loading weather...</caption-1>`,
    html` <img src="${(x) => weatherIcons[x.icon]}" />
        <div>
          <caption-1>${(x) => x.temp}ºF</caption-1>
          <caption-1>${(x) => x.condition}</caption-1>
        </div>`
  )}
  </button>
`;
  var styles8 = css`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${spacingHorizontalS};
    user-select: none;
    padding: 0 ${spacingHorizontalS};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;

    & div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
  button:hover {
    background: ${colorShellFillTaksbarItemSecondary};
  }
  button:hover:active {
    background: ${colorShellFillTaksbarItemTeritary};
  }
  caption-1 {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
    white-space: nowrap;
    color: ${colorNeutralForeground1};

    &:nth-of-type(2) {
      color: ${colorNeutralForeground4};
    }
  }
`;
  var WeatherWidget = class extends FASTElement {
    constructor() {
      super(...arguments);
      this.temp = 0;
      this.condition = "";
      this.icon = "01";
      this.loaded = false;
    }
    connectedCallback() {
      super.connectedCallback();
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `http://localhost:4000/api/weather?lat=${latitude}&lon=${longitude}`
        ).then((res) => res.json()).then((data) => {
          this.temp = data.temp;
          this.condition = data.condition;
          this.icon = data.icon;
          this.loaded = true;
        }).catch((err) => {
          console.log(err);
        });
      });
    }
  };
  __decorateClass([
    observable
  ], WeatherWidget.prototype, "temp", 2);
  __decorateClass([
    observable
  ], WeatherWidget.prototype, "condition", 2);
  __decorateClass([
    observable
  ], WeatherWidget.prototype, "icon", 2);
  __decorateClass([
    observable
  ], WeatherWidget.prototype, "loaded", 2);
  WeatherWidget = __decorateClass([
    customElement({
      name: "weather-widget",
      template: template7,
      styles: styles8
    })
  ], WeatherWidget);

  // src/windows/views/taskBar.ts
  var template8 = html`
  <div class="group">
    <weather-widget></weather-widget>
  </div>
  <div class="group">
    <slot></slot>
  </div>
  <div class="group">
    <show-more-button></show-more-button>
    <system-tray></system-tray>
    <clock-widget></clock-widget>
    <copilot-button></copilot-button>
    <show-desktop-button></show-desktop-button>
  </div>
`;
  var styles9 = css`
  :host {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${spacingHorizontalL};
    height: 48px;
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    border-top: ${strokeWidthThin} solid ${colorNeutralStroke1};
    padding-inline-start: ${spacingHorizontalXS};
    /* Mica */
    background: ${micaBackgroundColor};
    backdrop-filter: ${micaBackdropFilter};
    background-blend-mode: ${micaBackgroundBlendMode};
    z-index: 1000;
  }
  .group {
    height: 100%;
    display: flex;
    align-items: center;

    &:first-of-type {
      justify-content: flex-start;
    }

    &:nth-of-type(2) {
      justify-content: center;
    }

    &:last-of-type {
      justify-content: flex-end;
    }
  }
`;
  var TaskBar = class extends FASTElement {
  };
  TaskBar = __decorateClass([
    customElement({
      name: "task-bar",
      template: template8,
      styles: styles9
    })
  ], TaskBar);

  // src/windows/views/appWindow.ts
  var template9 = html`<slot></slot>`;
  var styles10 = css`
  :host {
    display: block;
    position: absolute;
    border-radius: ${borderRadiusMedium};
    z-index: ${(x) => x.zIndex};
    width: ${(x) => x.width};
    height: ${(x) => x.height};
    top: ${(x) => x.yPos};
    left: ${(x) => x.xPos};
    box-shadow: ${shadow28};
    overflow: hidden;
  }

  :host([active]) {
    box-shadow: ${shadowBaseLayer};
  }

  :host([minimized]) {
    display: none;
  }

  :host([maximized]) {
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;
    width: auto;
    height: auto;
    border-radius: 0;
    box-shadow: none;
  }
`;
  var AppWindow = class extends FASTElement {
    constructor() {
      super(...arguments);
      this.width = "800px";
      this.height = "600px";
      this.xPos = "100px";
      this.yPos = "100px";
      this.zIndex = 0;
    }
  };
  __decorateClass([
    attr
  ], AppWindow.prototype, "width", 2);
  __decorateClass([
    attr
  ], AppWindow.prototype, "height", 2);
  __decorateClass([
    attr
  ], AppWindow.prototype, "xPos", 2);
  __decorateClass([
    attr
  ], AppWindow.prototype, "yPos", 2);
  __decorateClass([
    attr
  ], AppWindow.prototype, "zIndex", 2);
  AppWindow = __decorateClass([
    customElement({
      name: "app-window",
      template: template9,
      styles: styles10
    })
  ], AppWindow);

  // src/windows/index.ts
  var styles11 = css`
  :host {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: ${colorNeutralForeground1};
    fill: currentColor;

    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
  }

  #desktop {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-image: ${(x) => x.ws.theme === "dark" ? "url('/img/windows/desktopDark.jpg')" : "url('/img/windows/desktopLight.jpg')"};
    background-size: cover;
    background-position: center;
  }
`;
  var template10 = html`
  <div id="desktop"></div>
  ${repeat(
    (x) => x.ws.windows,
    html`
      <app-window
        width="${(x) => x.width}px"
        height="${(x) => x.height}px"
        xPos="${(x) => x.xPos}px"
        yPos="${(x) => x.yPos}px"
        zIndex="${(x) => x.zIndex}"
        ?minimized="${(x) => x.minimized}"
        ?maximized="${(x) => x.maximized}"
        ?active="${(x, c) => x.id === c.parent.ws.activeWindowId}"
      >
        ${(x) => installedApps_default.filter((app) => app.name === x.appName)[0].element || ""}
      </app-window>
    `
  )}
  <task-bar>
    ${repeat(
    () => installedApps_default,
    html`
        <taskbar-button
          ?running="${(x, c) => c.parent.ws.windows.some((w) => w.appName === x.name)}"
          ?active="${(x, c) => c.parent.ws.windows.find(
      (win) => win.id === c.parent.ws.activeWindowId
    )?.appName === x.name}"
          @click="${(x, c) => x.element ? c.parent.handleTaskbarButtonClick(x.name) : ""}"
        >
          <img
            src="${(x, c) => c.parent.ws.theme === "dark" && x.darkIcon ? x.darkIcon : x.lightIcon}"
          />
        </taskbar-button>
      `
  )}
  </task-bar>
`;
  var WindowsShell = class extends FASTElement {
    connectedCallback() {
      super.connectedCallback();
      setTheme2(this.ws.theme, this);
      this.ws.openWindow("Microsoft Edge");
    }
    handleTaskbarButtonClick(appName) {
      const windows = this.ws.windows.filter((w) => w.appName === appName);
      if (windows.length === 0) {
        this.ws.openWindow(appName);
        return;
      }
      if (windows.length === 1) {
        if (windows[0].minimized) {
          this.ws.restoreWindow(windows[0].id);
          return;
        }
        if (windows[0].id !== this.ws.activeWindowId) {
          this.ws.activateWindow(windows[0].id);
          return;
        }
        this.ws.minimizeWindow(windows[0].id);
        return;
      }
      return;
    }
  };
  __decorateClass([
    inject(WindowsService)
  ], WindowsShell.prototype, "ws", 2);
  WindowsShell = __decorateClass([
    customElement({ name: "windows-shell", template: template10, styles: styles11 })
  ], WindowsShell);

  // src/index.ts
  var template11 = html` ${(x) => x.ps.os === "windows" ? html`<windows-shell></windows-shell>` : ""}`;
  var styles12 = css`
  :host {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`;
  var AppRoot = class extends FASTElement {
  };
  __decorateClass([
    inject(PrototypeService)
  ], AppRoot.prototype, "ps", 2);
  AppRoot = __decorateClass([
    customElement({
      name: "app-root",
      template: template11,
      styles: styles12
    })
  ], AppRoot);
})();
