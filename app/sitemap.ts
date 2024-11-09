import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${process.env.NEXT_PUBLIC_URL}/uk`,
          en: `${process.env.NEXT_PUBLIC_URL}/en`
        }
      }
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/catalog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${process.env.NEXT_PUBLIC_URL}/uk`,
          en: `${process.env.NEXT_PUBLIC_URL}/en`
        }
      }
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/contact-us`,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${process.env.NEXT_PUBLIC_URL}/uk`,
          en: `${process.env.NEXT_PUBLIC_URL}/en`
        }
      }
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/about-us`,
      lastModified: new Date(),
      alternates: {
        languages: {
          uk: `${process.env.NEXT_PUBLIC_URL}/uk`,
          en: `${process.env.NEXT_PUBLIC_URL}/en`
        }
      }
    }
  ];
}
