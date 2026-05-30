import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url, isArticle, structuredData }) {
  const siteName = 'Insteel Engineers Pvt Ltd';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || 'Insteel Engineers Ltd has delivered landmark steel structures across India. We are a one-window EPC solution specializing in structural steel, design-build, and fabrication.';

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />

      {/* Dynamic Structured Data for Specific Pages */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
