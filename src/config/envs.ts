import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DISCORD_URL: get('DISCORD_URL').required().asUrlString(),
    SECRET_TOKEN: get('SECRET_TOKEN').required().asString(),
};