"use client";

import { gradesList } from "@/lib/gradesList";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import Select from "./ui/Select";
import ShopImageCard from "./ui/ShopImageCard";

const ShopPics = () => {
  const [grade, setGrade] = useState<string | null>(null);
  const [letter, setLetter] = useState<string | null>(null);
  const [lettersOptions, setLettersOptions] =
    useState<Record<"value" | "label", string>[]>();

  const gradesOptions = gradesList.map((el) => ({
    value: el.grade,
    label: el.grade,
  }));

  useEffect(() => {
    setLetter(null);

    const newLettersOptions =
      gradesList.find((el) => el.grade === grade)?.letters || [];

    setLettersOptions(newLettersOptions);
  }, [grade]);

  return (
    <div>
      <div className='flex justify-center px-4 mt-5'>
        <div className='flex items-center border border-zinc-700 rounded-lg bg-zinc-800 pr-4'>
          <input
            className='w-full py-2 px-4 bg-transparent outline-none'
            placeholder='Search Pack...'
            type='text'
          />
          <span className='text-lg'>
            <IoIosSearch />
          </span>
        </div>
      </div>
      <div className='w-full grid grid-cols-2 px-4 gap-x-4 mt-4'>
        <Select
          defaultTitle='All Grades'
          options={gradesOptions}
          state={grade}
          setState={setGrade}
        />
        <Select
          defaultTitle='All Letters'
          options={lettersOptions}
          state={letter}
          setState={setLetter}
        />
      </div>
      <div className='flex flex-col px-4 py-5 gap-y-5'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <ShopImageCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default ShopPics;
