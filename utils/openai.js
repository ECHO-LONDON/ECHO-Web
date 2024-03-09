import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const getRelevantContent = async (theme, posts) => {

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { "type": "json_object" },
    messages: [
      {
        "role": "system",
        "content": `You are an AI assistant that helps people find relevant content in social media posts.
        You are given some themes and a JSON array of social media posts in the following format: [{"id": int, "content": string}, ...].
        You task is to return a JSON array with the most relevant content to the given themes, in the format: {"relevant_posts": [{"id": int, "content": string}, ...]}.

        Be careful in your selection and ONLY return posts that are relevant to the given theme.
        The themes are "${theme}". The following message will contain the JSON array of posts.`
      },
      { 
        "role": "user", 
        "content": JSON.stringify(posts) 
      }
    ],
  });

  const cleanedData = response.choices[0].message.content.trim();
  return JSON.parse(cleanedData);
}

export { getRelevantContent }