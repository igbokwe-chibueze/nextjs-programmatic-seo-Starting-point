import Header from "@/components/Header";
import RestaurantItem from "@/components/RestaurantItem";
import { getAllTags, locations, searchRestaurants } from "@/data/restaurants";
import { Metadata } from "next";
import { cache } from "react";

interface PageProps {
    params: Promise<{ location: string; q: string}>
}

export const revalidate = 86400; // Refresh cached pages once every 24 hours

export async function generateStaticParams() {
    const allTags = await getAllTags({
      // If you have very many pages, you can only render a subset at compile-time. 
      // The rest will be rendered & cached at first access.
      // So this would only return 10 tags, therefore 10 tags x 3 locations, would return only 30 pages.
      // other pages outside this 30 would be cached and avialable for all users only when they are opened.
      // limit: 10
    });
  
    return allTags.map((tag) => locations.map((location) => ({
        location,
        q: tag,
    }))).flat();
}
// If we do generateStaticParams this way, returning an empty area, 
// it would catch a page (tag * location) the first time that dynamic page is rendered
// export async function generateStaticParams() {
//     return [];
// }

const getRestaurants = cache(searchRestaurants); //get all instances of the searched resturants

export async function generateMetadata({ params,}: PageProps): Promise<Metadata> {
  const { q, location } = await params;

  const qDecoded = decodeURIComponent(q);
  const locationDecoded = decodeURIComponent(location);

  const results = await getRestaurants(qDecoded, locationDecoded);

  return {
    title: `Top ${results.length} ${qDecoded} near ${locationDecoded} - Updated ${new Date().getFullYear()}`,
    description: `Find the best ${qDecoded} near ${locationDecoded}`,
  };
}

const page = async ({params}: PageProps) => {
    const {q, location} = await params;

    const qDecoded = decodeURIComponent(q);
    const locationDecoded = decodeURIComponent(location);

    const results = await getRestaurants(qDecoded, locationDecoded)

  return (
    <div>
        <Header q={qDecoded} location={locationDecoded}/>
        <main className="container mx-auto space-y-8 px-4 py-8">
            <h1 className="text-center text-3xl font-bold">
                Top {results.length} {qDecoded} near {locationDecoded}
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((restaurant) => (
                    <RestaurantItem key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </main>
    </div>
  )
}

export default page