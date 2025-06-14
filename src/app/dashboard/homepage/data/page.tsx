"use client";
import React from "react";
import { Section1 } from "./section1";
import { Section2 } from "./section2";
import { Section3 } from "./section3";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dataSection = [
  { value: "section 1", name: "section 1" },
  { value: "section 2", name: "section 2" },
  { value: "section 3", name: "section 3" },
];

const Page = () => {
  const [section, setSection] = React.useState<string>("section 1");
  return (
    <div>
      <p className="mb-2">Tambah data Home Page</p>
      <Select
        defaultValue={section}
        onValueChange={setSection}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Section" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dataSection?.map((val, idx) => (
              <SelectItem
                key={idx}
                value={val.value}
              >
                {val.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {section === "section 1" && <Section1 />}
      {section === "section 2" && <Section2 />}
      {section === "section 3" && <Section3 />}
    </div>
  );
};

export default Page;
