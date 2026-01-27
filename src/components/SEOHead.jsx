import { Helmet } from 'react-helmet-async'
import companyData from '../data/company.json'

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  ogImage = '/static/og-image.png',
  schema 
}) {
  const siteUrl = 'https://agua-health.com'
  const fullTitle = title || `${companyData.name} | ${companyData.englishName}`
  const fullDescription = description || companyData.tagline

  return (
    <Helmet>
      {/* 기본 메타태그 */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-8LQ5EY8JB3"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8LQ5EY8JB3');
        `}
      </script>

      {/* Microsoft Clarity */}
      <script type="text/javascript">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "v7twx3zhkw");
        `}
      </script>

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={`${siteUrl}/static/og-image.png`} />

      {/* Canonical */}
      <link rel="canonical" href={siteUrl} />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {/* Organization Schema (기본) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": companyData.name,
          "alternateName": companyData.englishName,
          "url": siteUrl,
          "logo": `${siteUrl}/static/agua-health-logo.png`,
          "description": companyData.description,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "KR",
            "addressRegion": companyData.address.region,
            "addressLocality": companyData.address.city,
            "streetAddress": companyData.address.street
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": companyData.contact.phone,
            "email": companyData.contact.email,
            "contactType": "customer service",
            "availableLanguage": ["ko"]
          },
          "sameAs": [
            companyData.social.linkedin,
            companyData.social.twitter,
            companyData.social.facebook
          ].filter(Boolean)
        })}
      </script>
    </Helmet>
  )
}
