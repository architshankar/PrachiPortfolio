import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  image?: string;
}

export const SEO = ({
  title = "Prachi Shankar — Author · MBA · IIIT Allahabad",
  description = "Personal site of Prachi Shankar — author, MBA at SIBM Pune, Analyst at Accenture, IIIT Allahabad alumna.",
  type = "website",
  name = "Prachi Shankar",
  image = "https://prachishankar.in/og-image.jpg",
}: SEOProps) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
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
    </Helmet>
  );
};
