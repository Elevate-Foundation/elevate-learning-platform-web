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
import { useRouter } from 'next/navigation';
import { GoogleButton } from '../_components/google-button/google-button';
import { FacebookButton } from '../_components/facebook-button/facebook-button';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and privacy policy.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Register() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      router.push('/auth');
    }, 1000);
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
        <CardTitle className="text-2xl">Sign up and start learning</CardTitle>
        <CardDescription>Create an account</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
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
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        By signing up you agree to Elevate&apos;s{' '}
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
            <Button type="submit" className="w-full mt-5">
              Get started
            </Button>
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
            <span className="bg-white px-6 text-gray-900">or sign up with</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <GoogleButton mode="signup" />
          <FacebookButton mode="signup" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4 mt-0 px-0">
        <div className="mt-4">
          <p className="text-sm text-gray-500 text-center">
            Already have an account?{' '}
            <Link href="/" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
