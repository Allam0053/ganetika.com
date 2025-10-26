// 'use client';
// import { useRouter } from 'next/navigation';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { supabase } from '@/lib/utils';

import { Content } from '@/types/content';

// 1. This is your React component (the page)
// It receives the 'content' data as a prop from getStaticProps
export default async function ContentPage({ params }: PageProps) {
    const { id } = await params;

    // (Replaces getStaticProps) - Fetch data for *this* specific page
    const { data: content, error } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .single<Content>(); // Cast the data to our Content type

    // Handle errors or content not found
    if (error || !content) {
        // This will render the built-in 404 page
        notFound();
    }

    // Render the content
    return (
        <article>
            <h1>{content.title}</h1>
            <p><strong>Tag:</strong> {content.tag}</p>
            {/* If your 'content' field contains HTML: */}
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
            {/* If it's plain text: */}
            {/* <p>{content.content}</p> */}
        </article>
    );
}

export async function generateStaticParams() {
  const { data } = await supabase.from('content').select('id')
  return data?.map(item => ({ id: item.id.toString() })) || []
}

// 2. Define the props for your Page component
// The 'params' are passed automatically by Next.js
interface PageProps {
    params: {
        id: string;
    };
}
// ✅ Generate metadata (optional)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    const { data: content } = await supabase
        .from('content')
        .select('title, content')
        .eq('id', id)
        .single();

    if (!content) {
        return {
            title: 'Content Not Found',
        };
    }

    return {
        title: content.title,
        description: content.content.substring(0, 150), // Create a short description
    };
}

/*
// 3. This function fetches the data for a *single* page
export async function getStaticProps(context) {
    // 'context.params.id' contains the id for the current page (from getStaticPaths)
    const { id } = context.params;

    // Fetch the specific content item using its id
    const { data, error } = await supabase
        .from('content')
        .select('*') // Get all columns for this item
        .eq('id', id)
        .single(); // Get just one record

    if (error || !data) {
        console.error('Error fetching content for id:', id, error);
        return {
            notFound: true, // This will show a 404 page
        };
    }

    return {
        props: {
            content: data, // This 'content' object is passed to your component
        },
        revalidate: 60, // Optional: Re-generate the page every 60 seconds
                        // This is Incremental Static Regeneration (ISR)
    };
}
*/
