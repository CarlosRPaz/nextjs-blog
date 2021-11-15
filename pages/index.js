import Head from "next/head";
import Link from "next/link";
import FeaturedSection from "../components/FeaturedSection";
import RecentSection from "../components/RecentSection";
// Sanity
import {sanityClient, urlFor} from "../lib/sanity";

const postsQuery = `*[_type == "post" && mainfeaturedhome == false && subfeaturedhome == false] | order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  author->{
    name
  }
}`;
const mainFeatPostQuery = `*[_type == "post" && mainfeaturedhome == true] | order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  author->{
    name
  }
}`;
const subFeatPostsQuery = `*[_type == "post" && subfeaturedhome == true]{
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  author->{
    name
  }
}`;



export default function Home({posts, mainFeatPost, subFeatPosts}) {
  if(!posts) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-4 pb-10">
      <Head>
        <title>Game7</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-6xl mx-auto">
        <FeaturedSection mainFeatPost={mainFeatPost} subFeatPosts={subFeatPosts} />
        <RecentSection posts={posts} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await sanityClient.fetch(postsQuery);
  const mainFeatPost = await sanityClient.fetch(mainFeatPostQuery);
  const subFeatPosts = await sanityClient.fetch(subFeatPostsQuery);

  return {props: {posts, mainFeatPost, subFeatPosts}};
}
