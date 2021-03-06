// call apply bind 

//call
/**
 * call apply 调用一个具有指定this值和参数列表的函数
 * @param {*} ctx 
 * @param  {...any} params 
 */
Function.prototype.newCall = function (ctx, ...params) {
  let ctx = ctx || window;
  ctx.fn = this;
  var result = ctx.fn(...params);
  delete ctx.fn;
  return result;
}

//bind 
/**
 * 返回一个绑定上下文的函数
 */

Function.prototype.newBind(ctx) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    const bindArgs = Array.prototype.slice.call(arguments, 1);
    return self.apply(ctx, bindArgs.concat(args));
  }
}

// 实现一个神拷贝
function isObject(source) {
  return typeof (source) === 'object' && source !== null;
}

function findCache(source, target) {
  for (item in target) {
    if (item.source == source) {
      return item;
    }
  }
  return null;
}

function deepCopy(source, list = []) {
  if (!isObject(source)) {
    return source
  }
  const target = Array.isArray(source) ? [] : {};
  // 循环引用
  const cacheData = find(source, list);
  if (cacheData) {
    return cacheData.target;
  }
  list.push({
    target,
    source
  })

  for (key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = deepCopy(source[key], list);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}