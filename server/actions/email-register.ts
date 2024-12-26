'use server';

import { actionClient } from '@/lib/safe-action';
import { RegisterSchema } from '@/types/register-schema';
import bcrypt from 'bcrypt';

export const emailRegister = actionClient()
    .schema(RegisterSchema)
    .action(async ({ parsedInput: { username, email, password } }) => {});
