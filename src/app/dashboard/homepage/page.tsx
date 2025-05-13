"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Home Page
      </h1>
      <div className="flex flex-row-reverse mb-2">
        <Button onClick={() => router.push("/dashboard/homepage/create")}>Masukkan Data Home Page</Button>
      </div>
    </>
  );
};

export default Page;
