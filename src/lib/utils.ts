import { faker } from "@faker-js/faker";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// user information is not maintained in this demo project
// so we generate them from the username you enter

export function getHandle(username: string) {
  // seed faker with username so we get consistent results
  faker.seed(getSeed(username));
  const [firstName, lastName] = username.split(" ");
  return faker.internet.userName({
    firstName,
    lastName,
  });
}

export function getAvatar(username: string) {
  faker.seed(getSeed(username));
  return faker.internet.avatar();
}

// convert username to a number for consistent seeding
function getSeed(username: string) {
  const code = new TextEncoder().encode(username);
  return Array.from(code).reduce(
    (acc, curr, i) => (acc + curr * i) % 1_000_000,
    0,
  );
}
