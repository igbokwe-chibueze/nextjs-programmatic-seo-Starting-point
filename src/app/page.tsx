import banner from "@/assets/restaurant-banner.jpg";
import Header from "@/components/Header";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto space-y-8 px-4 py-8">
        <div className="relative h-[450px] w-full">
          <Image
            src={banner}
            alt="Restaurant Finder"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end space-y-2 rounded-lg 
            bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white"
          >
            <h1 className="text-center text-3xl font-bold xl:text-4xl">
              Discover top dining spots in your area
            </h1>
            <p className="text-center text-lg">
              Seek out the dining experience, restaurant, or dish you love
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
