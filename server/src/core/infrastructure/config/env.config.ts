import z from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MYSQL_HOST: z.string().nonempty(),
  MYSQL_PORT: z.coerce.number().default(3306),
  MYSQL_USERNAME: z.string().nonempty(),
  MYSQL_PASSWORD: z.string().nonempty(),
  MYSQL_DATABASE: z.string().nonempty(),
  IS_DEVELOPMENT: z.coerce.boolean()
}).required();

export const envs = envSchema.parse(process.env);