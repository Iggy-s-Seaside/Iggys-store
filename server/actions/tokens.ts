'use server';

import { eq } from 'drizzle-orm';
import { db } from '..';
import { emailTokens } from '../schema';

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.query.emailTokens.findFirst({
            where: eq(emailTokens.token, email),
        });
        return verificationToken;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
        return 'An error occurred';
    }
};

export const generatedEmailVerificationToken = async (email: string) => {
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken && typeof existingToken !== 'string') {
        await db
            .delete(emailTokens)
            .where(eq(emailTokens.id, existingToken.id));
    }

    const verificationToken = await db
        .insert(emailTokens)
        .values({
            email,
            token,
            expires,
        })
        .returning();
    return verificationToken;
};
