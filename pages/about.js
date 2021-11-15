import React from 'react'

import {sanityClient, urlFor, PortableText} from "../lib/sanity";

const aboutDataQuery = `*[_type == "team"] {
    _id,
    name,
    logo,
    teamImage,
    body,
    motto,
    'members': members[] {
        _type == 'reference' => @->,
        _type != 'reference' => @
    }
  }`;

export default function about({aboutData}) {

    console.log(aboutData);

    if(!aboutData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="px-4 max-w-6xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row">
                <div className="order-1 md:order-2 md:w-1/2">
                    <img
                        src={urlFor(aboutData[0]?.teamImage).url()}
                        alt="Team Image"
                        className="rounded-md"
                    />
                </div>
                <div className="order-2 md:order-1 md:w-1/2">
                    <h1 className="text-black mt-4">About {aboutData[0]?.name}</h1>
                    <div className="mt-3 md:pr-10 lg:pr-20">
                        <PortableText blocks={aboutData[0]?.body} />
                    </div>
                </div>
            </div>

            <h1 className="text-black mt-20 mb-8 text-center">Team Members</h1>
            {/* Team Members */}
            <div className="grid grid-cols-2 gap-4 mx-auto max-w-md">
                {aboutData[0]?.members.length > 0 &&
                    aboutData[0]?.members.map(member => (
                        <div
                            key={member._id}
                            className="flex flex-col items-center"
                        >
                            <img
                                src={urlFor(member.image).url()}
                                className="rounded-full w-24 h-24 object-cover"
                            />
                            <p className="font-bold mt-2">{member.name}</p>
                            <p className="font-bold text-gray-500 text-sm">{member.role}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const aboutData = await sanityClient.fetch(aboutDataQuery);

    return {props: {aboutData}};
}
