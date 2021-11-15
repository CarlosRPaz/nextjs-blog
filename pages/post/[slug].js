import React, {useState} from "react";
import {useRouter} from "next/router";
import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  PortableText
} from "../../lib/sanity";

import moment from 'moment';

import {HeartIcon} from "@heroicons/react/solid";

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    author->{
        name,
        image {
            asset->{
                _id,
                url
            }
        }
    },
    body,
    publishedAt,
    summary,
    likes,
}`;

function Post({data, preview}) {

  const router = useRouter();

  if(router.isFallback) {
    return <div>Loading...</div>
  }

  const {data: post} = usePreviewSubscription(postQuery, {
    params: {slug: data.post?.slug.current},
    initialData: data,
    enabled: preview
  });

  // If live preview isn't preferred, uncomment this and delete the function above
  // const { post } = data;

  const [likes, setLikes] = useState(data?.post?.likes);

  const addLike = async () => {
    const res = await fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify({_id: post._id})
    }).catch(error => console.log(error));

    const data = await res.json();

    setLikes(data.likes);
  };

  return (
    <article className="max-w-6xl mx-auto px-4">
      <img
        src={urlFor(post?.mainImage).url()}
        alt={post?.title}
        className="rounded-md w-full"
      />
      <div className="font-Poppins font-bold">
        <h1 className="text-2xl mt-2">{post?.title}</h1>
        <div className="flex space-x-4 mt-1">
          <p className="text-blue-500 text-sm">{post?.author?.name}</p>
          <p className="text-gray-500 text-sm">{moment(post?.publishedAt).fromNow()}</p>
        </div>
        <button onClick={addLike} className="flex space-x-2 mt-1">
          <HeartIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          <p>{likes}</p>
        </button>
      </div>
      <main className="mt-3">
        <div className="mt-3">
          <PortableText blocks={post.body} />
        </div>
      </main>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)]{
           "params": {
               "slug": slug.current
           } 
        }`
  );

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({params}) {
  const {slug} = params;

  const post = await sanityClient.fetch(postQuery, {slug});

  return {props: {data: {post}, preview: true}};
}

export default Post;
