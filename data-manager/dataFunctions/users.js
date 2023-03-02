import User from "../schemas/User.js";

/**
 * the reasons for the user not being valid
 */
export const Reasons = {
  USER_NAME_EXISTS: "user name already exists",
  PHONE_NUMBER_EXISTS: "phone number already axists",
  USER_NOT_FOUND: "user not found",
  NO_USER_ID: "no user id",
};

/**
 * add a new user to the database
 * @param {any} user the data of the user to add
 * @returns promise of the user added
 */
export async function addUser(user) {
  const usr = new User(user);
  const isValid = await checkUserValidationForAdd(usr);
  if (isValid.ok) {
    return usr.save().then((dat) => ({ ok: true, data: dat }));
  } else {
    return isValid;
  }
}

/**
 *
 * @param {any} user the user to update with the id of the user to update
 * @returns promise of the userupdated
 */
export async function updateUser(user) {
  if (!user._id) {
    return { ok: false, reason: Reasons.NO_USER_ID };
  }
  const users = await User.find({ _id: user._id });
  if (users.length === 0) {
    return { ok: false, reason: Reasons.USER_NOT_FOUND };
  }
  const usr = new User({ ...users[0], ...user });
  const isValid = await checkUserValidationForAdd(usr);
  if (isValid.ok) {
    return usr.save().then((dat) => ({ ok: true, data: dat }));
  } else {
    return isValid;
  }
}

/**
 * 
 * @param {any} id the user id to delete
 * @returns promise of the user deleted
 */
export async function deleteUser(id) {
  if (!id) {
    return { ok: false, reason: Reasons.NO_USER_ID };
  }
  return await User.remove({ _id: id }).then((dat) => ({
    ok: true,
    data: dat,
  }));
}

/**
 * 
 * @param {any} userName the username to get
 * @returns promise with the right user
 */
export async function getUserByName(userName) {
  return User.find({ name: userName }).then((dat) => {
    if (dat.length === 0) {
      return { ok: false, reason: Reasons.USER_NOT_FOUND };
    }
    return { ok: true, data: dat[0] };
  });
}

/**
 * check if user is valid user
 * @param {User} user the user to check
 */
async function checkUserValidationForAdd(user) {
  let check = await User.find({ name: user.name });
  if (check.length !== 0 && check[0]._id !== user._id) {
    return { ok: false, reason: Reasons.USER_NAME_EXISTS };
  }
  check = await User.find({ phone: user.phone });
  if (check.length !== 0 && check[0]._id !== user._id) {
    return { ok: false, reason: Reasons.PHONE_NUMBER_EXISTS };
  }

  return { ok: true };
}

/**
 * check if user is valid by its id
 * @param {string} id the id of the user
 * @returns is the user id valid
 */
export function getUserById(id) {
  if (!id) {
    return {ok: false, reason: Reasons.NO_USER_ID};
  } 
  const user = User.find({ _id: id });
  if (user.length === 0) {
    return {ok: false, reason: Reasons.USER_NOT_FOUND};
  }
  return {ok: true,data:user[0]};
}
