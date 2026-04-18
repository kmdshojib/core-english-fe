'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function VerifyOTPPage() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            setCanResend(true)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer, canResend])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      router.push('/')
    }, 1000)
  }

  const handleResend = () => {
    setTimer(60)
    setCanResend(false)
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
        <CardDescription>
          Enter the OTP sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium">
              One-Time Password
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
              className="h-10 text-center text-2xl tracking-widest"
            />
            <p className="text-xs text-muted-foreground">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 h-10 text-white"
            disabled={loading || otp.length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </form>

        <div className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            {canResend ? (
              <>
                Didn&apos;t receive the code?{' '}
                <button
                  onClick={handleResend}
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                >
                  Resend
                </button>
              </>
            ) : (
              <>
                Resend OTP in <span className="font-semibold text-foreground">{timer}s</span>
              </>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Back to{' '}
            <Link
              href="/auth/signin"
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
