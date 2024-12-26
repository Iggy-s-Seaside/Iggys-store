'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';
import { AuthCard } from './auth-card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/types/register-schema';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { emailRegister } from '@/server/actions/email-register';
import { FormSuccess } from './form-success';
import { FormError } from './form-error';

export const RegisterForm = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const [error, setError] = useState<string | null>('');
    const [success, setSuccess] = useState<string | null>('');

    const { execute, status } = useAction(emailRegister, {
        onSuccess({ data }) {
            if (data?.error) setError(data.error);
            if (data?.success) setSuccess(data.success);
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        execute(values);
        console.log(values);
    };
    return (
        <AuthCard
            cardTitle="Create an account 🎉"
            backButtonHref="/auth/login"
            backButtonLabel="Already have an account?"
            showSocials
        >
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="example"
                                                type="username"
                                                autoComplete="Username"
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="example@email.com"
                                                type="email"
                                                autoComplete="email"
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="*******"
                                                type="password"
                                                autoComplete="current-password"
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {success && <FormSuccess message={success} />}
                            {error && <FormError message={error} />}
                        </div>
                        <Button
                            type="submit"
                            className={cn(
                                'w-full',
                                status === 'executing' ? 'animate-pulse' : ''
                            )}
                        >
                            {'Register'}
                        </Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    );
};
