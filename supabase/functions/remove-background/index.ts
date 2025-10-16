Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { imageData } = await req.json();

        if (!imageData) {
            throw new Error('Image data is required');
        }

        const removeBgApiKey = Deno.env.get('REMOVE_BG_API_KEY');
        if (!removeBgApiKey) {
            throw new Error('Remove.bg API key not configured');
        }

        // Extract base64 data from data URL
        const base64Data = imageData.split(',')[1];

        // Create form data for Remove.bg API
        const formData = new FormData();
        formData.append('image_file_b64', base64Data);
        formData.append('size', 'auto');

        // Call Remove.bg API
        const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': removeBgApiKey
            },
            body: formData
        });

        if (!removeBgResponse.ok) {
            const errorText = await removeBgResponse.text();
            throw new Error(`Remove.bg API error: ${errorText}`);
        }

        // Get the processed image as array buffer
        const processedImageBuffer = await removeBgResponse.arrayBuffer();
        
        // Convert to base64
        const processedImageBase64 = btoa(
            String.fromCharCode(...new Uint8Array(processedImageBuffer))
        );

        const processedImageDataUrl = `data:image/png;base64,${processedImageBase64}`;

        return new Response(JSON.stringify({
            data: {
                processedImage: processedImageDataUrl
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Background removal error:', error);

        const errorResponse = {
            error: {
                code: 'BACKGROUND_REMOVAL_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});