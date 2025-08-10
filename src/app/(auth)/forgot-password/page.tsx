'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { MoveLeft, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  email: z.email({
    message: 'Please enter a valid email address.',
  }),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setTimeout(() => {
      setSubmittedEmail(values.email);
      setEmailSent(true);
    }, 1000);
  }


  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) {
      return `${localPart[0]}*@${domain}`;
    }
    return `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}@${domain}`;
  };

  if (emailSent) {
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
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We sent a password reset link to{' '}
            <span className="font-medium">{maskEmail(submittedEmail)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Button
            className="w-full mb-4"
            onClick={() => window.open('mailto:', '_blank')}
          >
            Open email app
          </Button>
          <p className="text-center text-sm text-gray-600 mb-4">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setEmailSent(false)}
              className="text-primary hover:underline"
            >
              try another email address
            </button>
          </p>
          <Link
            href="/auth"
            className="w-full text-center text-sm flex items-center justify-center"
          >
            <MoveLeft className="inline mr-1 size-4" /> Back to login
          </Link>
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
        <CardTitle className="text-2xl">Forgot Password?</CardTitle>
        <CardDescription>
          No worries, we’ll send you reset instructions.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
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
              <Link href="/auth" className="w-full text-center text-sm">
                <MoveLeft className="inline mr-1 size-4" /> Back to login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
