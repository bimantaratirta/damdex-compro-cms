"use client";
import Image from "next/image";
import img from "@/../public/damdexlogo.png";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputField } from "@/components/inputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { errorHandling, hasher } from "@/lib/utils";
// import { useRouter } from "next/navigation";
import { login } from "@/repositories/auth";

const formSchema = z.object({
  email: z.string().min(6, { message: "Anda belum memasukkan email!" }),
  password: z.string().min(5, { message: "Anda belum memasukkan password!" }),
});

export default function Home() {
  // const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login({ email: values.email, password: hasher(values.password) });
      toast.success("Login Berhasil", { description: "Anda akan segera diarahkan ke halaman utama." });
      window.location.reload();
    } catch (error) {
      errorHandling(error, "Login gagal");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-[32px] row-start-2 items-center">
            <Image
              className="dark:invert"
              src={img}
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
            <div className="flex flex-col space-y-4 my-2 w-[25vw]">
              <InputField
                formControl={form.control}
                name="email"
                placeholder="E-mail"
                className="w-full"
                label="E-mail"
              />
              <InputField
                formControl={form.control}
                name="password"
                placeholder="Password"
                className="w-full"
                label="Password"
                type="password"
              />
            </div>
            <Button className="mt-10 w-[25vw]">Login</Button>
          </main>
        </div>
      </form>
    </Form>
  );
}
