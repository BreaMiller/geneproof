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
        const { userProfile, biometricData, medicalHistory, questionnaires } = await req.json();

        if (!userProfile) {
            throw new Error('User profile data is required');
        }

        const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
        if (!anthropicApiKey) {
            throw new Error('Anthropic API key not configured');
        }

        // Construct the prompt for AI recommendations
        const prompt = `You are a health and wellness expert. Based on the following user data, provide personalized health recommendations:

User Profile:
- Blood Type: ${userProfile.blood_type || 'Not specified'}
- Age: ${userProfile.age || 'Not specified'}
- Gender: ${userProfile.gender || 'Not specified'}

Biometric Readings:
- Physical Score: ${biometricData?.physical_score || 'Not available'}/100
- Emotional Score: ${biometricData?.emotional_score || 'Not available'}/100
- Intellectual Score: ${biometricData?.intellectual_score || 'Not available'}/100

Medical History:
${medicalHistory?.length ? medicalHistory.map((h: any) => `- ${h.condition_name} (${h.severity || 'unspecified severity'})`).join('\n') : '- No medical history recorded'}

Questionnaire Responses:
${questionnaires ? JSON.stringify(questionnaires, null, 2) : 'No questionnaire data available'}

Please provide:
1. Top 3 personalized health recommendations
2. Recommended exercises based on their condition
3. Suggested dietary changes
4. Stress management techniques
5. Supplements or herbs that might benefit them

Format the response as JSON with the following structure:
{
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "exercise": ["exercise1", "exercise2"],
  "diet": ["diet1", "diet2"],
  "stress_management": ["technique1", "technique2"],
  "supplements": ["supplement1", "supplement2"]
}`;

        // Call Anthropic API
        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': anthropicApiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 2000,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        if (!anthropicResponse.ok) {
            const errorText = await anthropicResponse.text();
            throw new Error(`Anthropic API error: ${errorText}`);
        }

        const anthropicData = await anthropicResponse.json();
        const aiResponse = anthropicData.content[0].text;

        // Parse JSON from AI response
        let recommendations;
        try {
            // Extract JSON from the response (might be wrapped in markdown code blocks)
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                recommendations = JSON.parse(jsonMatch[0]);
            } else {
                recommendations = JSON.parse(aiResponse);
            }
        } catch (parseError) {
            // If parsing fails, return the raw text
            recommendations = {
                raw_response: aiResponse,
                recommendations: [],
                exercise: [],
                diet: [],
                stress_management: [],
                supplements: []
            };
        }

        return new Response(JSON.stringify({
            data: recommendations
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('AI recommendations error:', error);

        const errorResponse = {
            error: {
                code: 'AI_RECOMMENDATION_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});