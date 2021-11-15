import {
    createClient,
    createPreviewSubscriptionHook,
    createImageUrlBuilder,
    createPortableTextComponent,
} from "next-sanity";

const config = {
    projectId: "uww7qnut",
    dataset: "production",
    apiVersion: "v2021-06-07",
    useCdn: true, // set true for production
}

export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
    ...config,
    serializers: {
        // if error, take out everything in these curly brackets
        //container: ({children, className}) => (
        //    <div className={className}>{children}</div>
        //)
    }
});