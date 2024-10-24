/* eslint-disable @typescript-eslint/no-unused-vars */
export const maxDuration = 60;
import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// (设置画布 '(宽度 400 高度 600 边距 20))
export async function POST(request: Request) {
  if (!API_URL || !API_KEY) {
    console.error("Missing API_URL or API_KEY environment variables");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const { prompt, text } = await request.json();
  if (!prompt || !text) {
    return NextResponse.json(
      { error: "Missing prompt in request body" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(API_URL, {
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [
        { role: "system", content: prompt},
        {
          role: "user",
          content: `(${text}) 输出要求: 要输出svg内容`,
        },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const assistantMessage = response.data.choices[0].message;
      if (assistantMessage && assistantMessage.content) {
        const svgMatch = assistantMessage.content.match(/<svg[\s\S]*?<\/svg>/);
        const svgContent = svgMatch ? svgMatch[0] : null;
        return NextResponse.json({
          svgContent,
          fullResponse: assistantMessage.content,
        });
      } else {
        console.error("Unexpected message structure in API response");
        return NextResponse.json(
          { error: "Unexpected message structure in API response" },
          { status: 500 }
        );
      }
    } else {
      console.error("Unexpected API response structure");
      return NextResponse.json(
        { error: "Unexpected API response structure" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in chat API:", error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}