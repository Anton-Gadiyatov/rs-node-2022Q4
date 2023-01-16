import { User } from "../types/user.js";

const validateUser = ({ username, age, hobbies }: User) => {
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
export { validateUser };
