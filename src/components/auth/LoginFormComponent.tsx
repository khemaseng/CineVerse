"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// Zod validation schema
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
})

type FormValues = z.infer<typeof formSchema>

export function LoginFormComponent() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true)
      const res = await fetch("https://sombobaeb.cheat.casa/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const resData = await res.json().catch(() => null)

      if (res.ok) {
        if (resData?.access_token) {
          localStorage.setItem("access_token", resData.access_token)
        }
        if (resData?.user) {
          localStorage.setItem("user", JSON.stringify(resData.user))
        }
        toast.success("Login successful! Redirecting to products...")
        setTimeout(() => {
          router.push("/product")
        }, 1200)
      } else {
        const errorMsg =
          typeof resData?.detail === "string"
            ? resData.detail
            : "Incorrect email or password."
        toast.error(errorMsg)
      }
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="login-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="koko@gmail.com"
                    autoComplete="email"
                    disabled={loading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="login-password"
                    placeholder="••••••••"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <FieldGroup className="w-full">
          <Field>
            <Button type="submit" form="form-login" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-primary underline underline-offset-4"
              >
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
