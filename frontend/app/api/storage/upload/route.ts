import { uploadData } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const blob = await request.blob();
    const file = new File([blob], 'uploaded-file', { type: blob.type });

    // Upload the File object directly
    const result = await uploadData(file);

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ rootHash: result.rootHash, tx: result.tx }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: `Failed to upload data: ${error}` }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}