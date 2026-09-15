"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(30, { message: "Username cannot exceed 30 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      }),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password cannot exceed 20 characters" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Must contain at least one special character",
      }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormValues = z.infer<typeof formSchema>

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true)
      const res = await fetch("https://sombobaeb.cheat.casa/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      })

      const resData = await res.json().catch(() => null)

      if (res.ok) {
        toast.success("Registered successfully! Redirecting to login...")
        setTimeout(() => {
          router.push("/auth/login")
        }, 1200)
      } else {
        const errorMsg =
          typeof resData?.detail === "string"
            ? resData.detail
            : Array.isArray(resData?.detail)
            ? resData.detail.map((e: { msg?: string }) => e.msg).join(", ")
            : "Registration failed. Please try again."
        toast.error(errorMsg)
      }
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-register" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-username">Username</FieldLabel>
                  <Input
                    {...field}
                    id="register-username"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="johndoe"
                    autoComplete="username"
                    disabled={loading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="register-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="m@example.com"
                    autoComplete="email"
                    disabled={loading}
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>
                      We will not share your email with anyone else.
                    </FieldDescription>
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <FieldDescription>
                      Must be 8+ characters, with uppercase, lowercase, number, and special character.
                    </FieldDescription>
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-confirm-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
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
            <Button type="submit" form="form-register" disabled={loading} className="w-full">
              {loading ? "Creating account..." : "Create Account"}
            </Button>
            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-primary underline underline-offset-4">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
