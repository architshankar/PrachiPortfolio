

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  image?: string;
  bookTitle?: string;
  isbn?: string;
}

export const SEO = ({
  title = "Prachi Shankar — Author of [Your Book Title], MBA, IIIT Allahabad",
  description = "Personal site and official page of Prachi Shankar, author of [Your Book Title]. Explore her solo debut, writings, background as an MBA at SIBM Pune, Analyst at Accenture, and IIIT Allahabad alumna.",
  type = "website",
  name = "Prachi Shankar",
  image = "https://zmazvdpanavvnfvgbtdq.supabase.co/storage/v1/object/sign/images/IMG-20260119-WA0010.jpg.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZjRjOGM4MS1jOTcwLTQ5ZTAtOGM0NC03ZmEyM2JmM2E1ZDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvSU1HLTIwMjYwMTE5LVdBMDAxMC5qcGcuanBlZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODEzNTI5OTUsImV4cCI6MzE1NTM4MTM1Mjk5NX0.YbdMH0SWxxKhjAdj57sj4jtzVY7vgpeRgGzYhD8sed0",
  bookTitle = "Good but Never Good Enough", 
  isbn = "978-9374260036", 
}: SEOProps) => {

  // JSON-LD Structured Data to explicitly tell Google about the Author and Book
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Prachi Shankar",
    "jobTitle": "Author",
    "knowsAbout": ["Writing, Author, MBA, Web Development"],
    "worksFor": {
      "@type": "Organization",
      "name": "Accenture"
    },
    "alumniOf": "IIIT Allahabad",
    "publishingPrinciples": {
      "@type": "Book",
      "name": bookTitle,
      "author": "Prachi Shankar",
      "description": description
    }
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`Prachi Shankar, ${bookTitle}, Author, Books, Solo Debut, SIBM Pune, IIIT Allahabad`} />
      
      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={window.location.href} />

      {/* Structured Data (JSON-LD) for better SEO ranking on search engines */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};