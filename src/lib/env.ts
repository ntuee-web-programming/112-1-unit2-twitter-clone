// next loads environment variables automatically from .env.local
if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL must be defined in .env.local");
}

export const env = {
  // non-null assertion is safe here because we throw an error if it's not defined
  POSTGRES_URL: process.env.POSTGRES_URL!,
};

console.log(env);
