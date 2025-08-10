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
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import Image from 'next/image';
import { GoogleButton } from './_components/google-button/google-button';
import { FacebookButton } from './_components/facebook-button/facebook-button';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and privacy policy.',
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
        <CardDescription>Login into your account</CardDescription>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="**********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="flex justify-end">
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-[#C56D1A]"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-[13px] text-gray-600 flex flex-wrap">
                        By signing in you agree to Elevate&apos;s{' '}
                        <Link href="#" className="underline hover:no-underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="underline hover:no-underline">
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <div className="relative my-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm/6 font-medium">
            <span className="bg-white px-6 text-gray-900">or sign in with</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <GoogleButton mode="signin" />
          <FacebookButton mode="signin" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4 mt-0 px-0">
        <div className="mt-4">
          <p className="text-sm text-gray-500 text-center">
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="text-[#C56D1A] hover:no-underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
