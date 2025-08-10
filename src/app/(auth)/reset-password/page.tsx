'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { MoveLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const token = searchParams.get('token');
    console.log('Reset password with token:', token, values);
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  }

  if (isSuccess) {
    return (
      <Card className="w-full shadow-none border-0 gap-0 py-0">
        <CardHeader className="text-center mb-8 px-0">
          <Image
            src="/brand/logo.svg"
            alt="Brand Logo"
            width={150}
            height={50}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-2xl">Password reset</CardTitle>
          <CardDescription className="text-base mx-auto">
            Your password has been successfully reset. Click below to log in
            magically.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Button onClick={() =>  router.push('/auth')} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-none border-0 gap-0 py-0">
      <CardHeader className="text-center mb-8 px-0">
        <Image
          src="/brand/logo.svg"
          alt="Brand Logo"
          width={150}
          height={50}
          className="mx-auto mb-4"
        />
        <CardTitle className="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          Enter your new password below to reset your account password.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm new password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Reset password
              </Button>
              <Link 
                href="/auth" 
                className="w-full text-center text-sm text-gray-600 hover:text-gray-800"
              >
                <MoveLeft className="inline mr-1 size-4" /> Back to login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
