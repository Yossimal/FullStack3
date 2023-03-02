
/**
 * bind arguments to a function
 * @param {function} func the base function to be called
 * @param  {...any} argsBound the arguments to be bound to the function
 * @returns a function that calls the base function with the bound arguments
 */
function partial(func, ...argsBound) {
  return function (...args) {
    return func.call(this, ...argsBound, ...args);
  };
}

/**
 * call a function if the user is authenticated
 * @param {function} func the function to be called if the user is authenticated
 * @param {Request} req the request object
 * @param {Response} res the response object
 */
function privateFunction(func, req, res) {
  if (!req.body.auth) {
    res.json({ ok: false, reason: "not authenticated" });
    return;
  } else if (!req.body.auth._id) {
    func(req, res);
  }
}

/**
 * call a server function if the user is authenticated
 * @param {function} func the function to be called if the user is authenticated
 */
export function $private(func) {
  return partial(privateFunction, func);
}
