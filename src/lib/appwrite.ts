export interface AboutUsData {
  description: string;
  visi: string;
  misi: string;
  keunggulan: string;
}

export async function fetchAboutUs(): Promise<AboutUsData | null> {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

  if (!endpoint || !projectId || !databaseId) {
    console.error('Appwrite credentials are missing in .env.local');
    return null;
  }

  try {
    const response = await fetch(
      `${endpoint}/databases/${databaseId}/collections/about_us/documents/main`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': projectId,
        },
        // Revalidate every 60 seconds (atau gunakan 'no-store' untuk selalu fresh)
        next: { revalidate: 60 } 
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch from Appwrite:', await response.text());
      return null;
    }

    const data = await response.json();
    return {
      description: data.description || '',
      visi: data.visi || '',
      misi: data.misi || '',
      keunggulan: data.keunggulan || '[]',
    };
  } catch (error) {
    console.error('Error fetching about us data:', error);
    return null;
  }
}
