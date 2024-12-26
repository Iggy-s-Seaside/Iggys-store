'use server';
import getBaseURL from '@/lib/base-url';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseURL();

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    const { data, error } = await resend.emails.send({
        from: '<onboarding@resend.dev>',
        to: email,
        subject: 'Iggys Store - Verify your email',
        html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`,
    });

    if (error) return console.error(error);

    if (data) return data;
};
