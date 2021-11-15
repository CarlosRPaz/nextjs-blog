import Link from "next/link";
import {urlFor} from "../lib/sanity";
import moment from 'moment';

function FeaturedSection({mainFeatPost, subFeatPosts}) {
    return (
        <section className="flex flex-col md:flex-row">
            {/* Main-Featured Post */}
            <div>
                <Link href={`/post/${mainFeatPost[0].slug.current}`}>
                    <a>
                        <img
                            src={urlFor(mainFeatPost[0].mainImage).url()}
                            alt={mainFeatPost[0].title}
                            className="rounded-md w-full"
                        />
                        <div className="mt-2 font-Poppins font-bold">
                            <div className="flex space-x-4">
                                <p className="text-blue-500">{mainFeatPost[0].author.name}</p>
                                <p className="text-gray-500">{moment(mainFeatPost[0].publishedAt).fromNow()}</p>
                            </div>
                            <p className="text-2xl">{mainFeatPost[0].title}</p>
                        </div>
                    </a>
                </Link>
            </div>

            {/* Sub-Featured Posts */}
            <div className="md:ml-4">
                <h1 className="font-Poppins text-lg font-bold mt-4 md:mt-0">Featured</h1>
                {subFeatPosts?.length > 0 &&
                    subFeatPosts.map(post => (
                        <Link href={`/post/${post.slug.current}`} key={post._id} >
                            <a>
                                <div className="flex flex-row w-full mb-4">
                                    <div className="w-2/5">
                                        <img
                                            src={urlFor(post.mainImage).url()}
                                            alt={post.title}
                                            className="rounded-md h-28 object-cover w-full"
                                        />
                                    </div>
                                    <div className="font-Poppins font-bold w-3/5 pl-2">
                                        <div className="flex space-x-2">
                                            <p className="text-blue-500 text-sm">{post.author.name}</p>
                                            <p className="text-gray-500 text-sm">{moment(post.publishedAt).fromNow()}</p>
                                        </div>
                                        <p className="text-lg">{post.title}</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
            </div>
        </section>
    )
}

export default FeaturedSection