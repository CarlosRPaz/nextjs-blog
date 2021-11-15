import Link from "next/link";
import {urlFor} from "../lib/sanity";
import moment from 'moment';

function RecentSection({posts}) {
    return (
        <section>
            <h1 className="font-Poppins text-lg font-bold mt-4 md:mt-10">Recent</h1>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {posts?.length > 0 &&
                    posts.map(post => (
                        <Link href={`/post/${post.slug.current}`} key={post._id}>
                            <a>
                                <img
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.title}
                                    className="rounded-md h-40 object-cover w-full md:h-36 lg:h-44"
                                />
                                <div className="font-Poppins font-bold">
                                    <div>
                                        <p className="text-blue-500 text-sm mt-1">{post.author.name}</p>
                                        <p className="text-gray-500 text-sm">{moment(post.publishedAt).fromNow()}</p>
                                    </div>
                                    <p className="text-base mt-1">{post.title}</p>
                                </div>
                            </a>
                        </Link>
                    ))}
            </div>
        </section>
    )
}

export default RecentSection
