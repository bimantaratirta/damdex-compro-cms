"use client";

import { Button } from "@/components/ui/button";
import { useHome } from "@/swr-hooks/home/useHome";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data: section1id } = useHome({ lang: "id", section: 1 });
  const { data: section2id } = useHome({ lang: "id", section: 2 });
  const { data: section3id } = useHome({ lang: "id", section: 3 });
  const { data: section1en } = useHome({ lang: "eng", section: 1 });
  const { data: section2en } = useHome({ lang: "eng", section: 2 });
  const { data: section3en } = useHome({ lang: "eng", section: 3 });
  return (
    <>
      <h1 className="mb-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Home Page
      </h1>
      <div className="flex flex-row-reverse mb-2">
        <Button onClick={() => router.push("/dashboard/homepage/data")}>Masukkan / Ubah Data Home Page</Button>
      </div>
      <div className="flex flex-col space-y-4">
        <p>
          Section 1 Bahasa Indonesia : {section1id?.data.length !== 0 ? "Data sudah tampil di web" : "Belum ada data"}
        </p>
        <p>
          Section 2 Bahasa Indonesia : {section2id?.data.length !== 0 ? "Data sudah tampil di web" : "Belum ada data"}
        </p>
        <p>
          Section 3 Bahasa Indonesia : {section3id?.data.length !== 0 ? "Data sudah tampil di web" : "Belum ada data"}
        </p>
        <p>
          Section 1 Bahasa Inggris : {section1en?.data.length !== 0 ? "Data sudah tampil di web" : "Belum ada data"}
        </p>
        <p>
          Section 2 Bahasa Inggris : {section2en?.data.length !== 0 ? "Data sudah tampil di web" : "Belum ada data"}
        </p>
        <p>Section 3 Bahasa Inggris: {section3en?.data.length !== 0 ? "Data sudah tampil di web" : "Belum ada data"}</p>
      </div>
    </>
  );
};

export default Page;
