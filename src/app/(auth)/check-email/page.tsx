'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MoveLeft } from 'lucide-react';

export default function CheckEmail() {
  const handleOpenEmail = () => {
    // This will attempt to open the default email client
    window.location.href = 'mailto:';
  };

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
        <CardDescription className="text-base max-w-sm mx-auto">
          We sent a password reset link to e**@elevate.org
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col gap-4">
          <Button onClick={handleOpenEmail} className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Open email app
          </Button>
          <div className="text-center text-sm text-gray-600">
            <p>
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <Link
                href="/auth/forgot-password"
                className="text-primary hover:underline"
              >
                click to resend
              </Link>
            </p>
          </div>
          <Link
            href="/"
            className="w-full text-center text-sm text-gray-600 hover:text-gray-800 mt-4"
          >
            <MoveLeft className="inline mr-1 size-4" /> Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
