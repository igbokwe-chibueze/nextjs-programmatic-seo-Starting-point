"use client";

import LocationInput from "@/components/LocationInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import soupImage from "@/assets/soup-image.png"

interface HeaderProps {
  q?: string;
  location?: string;
}

export default function Header({ q, location }: HeaderProps) {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const q = formData.get("q") as string;
    const location = formData.get("location") as string;
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("q", q);
    if (location) newSearchParams.set("location", location);
    router.push(`/search?${newSearchParams.toString()}`);
  }

  return (
    <header className="bg-primary py-6">
      <div className="container mx-auto px-4">       

        <div className="flex flex-col items-center gap-4">
          <Link href="/" className=" flex items-end justify-center">
            <div className=" relative w-24 h-20 ">
              <Image
                src={soupImage}
                alt="Restaurant Finder"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className=" text-3xl font-bold text-primary-foreground">
              Your Culinary Compass
            </span>
          </Link>
          <form
            action="/"
            onSubmit={handleSubmit}
            className="flex w-full max-w-2xl flex-wrap gap-2 sm:flex-nowrap"
            key={`${q}-${location}`}
          >
            <Input
              name="q"
              placeholder="Search restaurants..."
              defaultValue={q}
              type="search"
              required
            />
            <LocationInput name="location" defaultValue={location} />
            <Button variant="secondary">
              <Search className="size-4" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
