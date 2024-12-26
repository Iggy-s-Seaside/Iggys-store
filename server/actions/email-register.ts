'use server';

import { actionClient } from '@/lib/safe-action';
import { RegisterSchema } from '@/types/register-schema';
import bcrypt from 'bcrypt';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '../schema';
import { generatedEmailVerificationToken } from './tokens';
import { sendVerificationEmail } from './email';

export const emailRegister = actionClient()
    .schema(RegisterSchema)
    .action(async ({ parsedInput: { username, email, password } }) => {
        //hashing passwords
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        //check existing user
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        //check if email is already in the database-- then say in use, if not register user but also send verification
        if (existingUser) {
            if (!existingUser.emailVerified) {
                const verificationToken = await generatedEmailVerificationToken(
                    email
                );
                await sendVerificationEmail(
                    verificationToken[0].email,
                    verificationToken[0].token
                );
                return { success: 'Email verification re-sent' };
            }
            return { error: 'Email already in use' };
        }
        //logic for when the user is not registered
        await db.insert(users).values({
            email,
            name: username,
            password: hashedPassword,
        });

        const verificationToken = await generatedEmailVerificationToken(email);

        await sendVerificationEmail(
            verificationToken[0].email,
            verificationToken[0].token
        );

        return { success: 'Confirmation email sent' };
    });
