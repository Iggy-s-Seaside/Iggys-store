'use client';

import { AuthCard } from './auth-card';

export const LoginForm = () => {
    return (
        <AuthCard
            cardTitle="Welcome Back"
            backButtonHref="/auth/register"
            backButtonLabel="Create a new account"
            showSocials
        >
            <h1>Login Form</h1>
        </AuthCard>
    );
};