import { User } from "../types/user.js";

const validateCreateUser = ({ username, age, hobbies }: Partial<User>) => {
  if (!username || typeof username !== "string" || username.trim().length < 0) {
    return false;
  }

  if (
    !age ||
    typeof age !== "number" ||
    age < 0 ||
    !Number.isSafeInteger(age)
  ) {
    return false;
  }

  if (
    !hobbies ||
    !Array.isArray(hobbies) ||
    hobbies.some((hobbie) => typeof hobbie !== "string")
  ) {
    return false;
  }
  return true;
};

const validateUpdateUser = ({ username, age, hobbies }: Partial<User>) => {
  if (
    !(
      typeof username === "undefined" ||
      (typeof username === "string" && username.trim().length > 0)
    )
  ) {
    return false;
  }

  if (
    !(
      typeof age === "undefined" ||
      (typeof age === "number" && age > 0 && Number.isSafeInteger(age))
    )
  ) {
    return false;
  }

  if (
    !(
      typeof hobbies === "undefined" ||
      (Array.isArray(hobbies) &&
        !hobbies.some((hobbie) => typeof hobbie !== "string"))
    )
  ) {
    return false;
  }
  return true;
};

const uuidRegexExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;

const validateUserId = (id) => {
  return uuidRegexExp.test(id);
};

export { validateCreateUser, validateUpdateUser, validateUserId };
