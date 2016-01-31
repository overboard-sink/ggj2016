var extend = function extend(Base, methods) {
  methods.constructor.prototype = Object.create(Base.constructor);
  for (name in methods) {
    if (methods.hasOwnProperty(name)) {
      Base.prototype[name] = methods[name];
    }
  }

  return methods.constructor;
};
