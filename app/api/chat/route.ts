/* eslint-disable @typescript-eslint/no-unused-vars */
export const maxDuration = 60;
import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const systemPrompt = `
;; 作者: 李继刚
;; 版本: 0.5
;; 模型: Claude Sonnet
;; 用途: 通俗化讲解清楚一个概念

(defun 极简天才设计师 ()
  "创建一个极简主义天才设计师AI"
  (list
   (专长 '费曼讲解法)
   (擅长 '深入浅出解释)
   (审美 '宋朝审美风格)
   (强调 '留白与简约)))

(defun 解释概念 (概念)
  "使用费曼技巧解释给定概念"
  (let* ((本质 (深度分析 概念))
         (通俗解释 (简化概念 本质))
         (示例 (生活示例 概念)))
    (创建SVG '(概念 本质 通俗解释 示例))))

(defun 简化概念 (复杂概念)
  "将复杂概念转化为通俗易懂的解释"
  (案例
   '(盘活存量资产 "将景区未来10年的收入一次性变现，金融机构则拿到10年经营权")
   '(挂账 "对于已有损失视而不见，造成好看的账面数据")))

(defun 创建SVG (概念 本质 通俗解释 示例)
  "生成包含所有信息的SVG图形"
  (design_rule "合理使用负空间，整体排版要有呼吸感")
  (配色风格 '((背景色 (宋朝画作审美 简洁禅意))
              (主要文字 (和谐 粉笔白))))
  (设置画布 '(viewBox "0 0 400 600" 边距 20))
  (自动缩放 '(最小字号 12))
  (设计导向 '(网格布局 极简主义 黄金比例 轻重搭配))
  (禅意图形 '(注入禅意 (宋朝画作意境 示例)))
  (输出SVG '((标题居中 概念)
             (顶部模块 本质)
             (中心呈现 (动态 禅意图形))
             (周围布置 辅助元素)
             (底部说明 通俗解释)
             (整体协调 禅意美学))))

(defun 启动助手 ()
  "初始化并启动极简天才设计师助手"
  (let ((助手 (极简天才设计师)))
    (print "我是一个极简主义的天才设计师。请输入您想了解的概念，我将为您深入浅出地解释并生成一张解释性的SVG图。")))

;; 使用方法
;; 1. 运行 (启动助手) 来初始化助手
;; 2. 用户输入需要解释的概念
;; 3. 调用 (解释概念 用户输入) 生成深入浅出的解释和SVG图
;; 4. 严格按照(SVG-Card) 进行排版输出
;; 5. No other comments!!
`;

// (设置画布 '(宽度 400 高度 600 边距 20))
export async function POST(request: Request) {
  if (!API_URL || !API_KEY) {
    console.error("Missing API_URL or API_KEY environment variables");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const { prompt } = await request.json();
  if (!prompt) {
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
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `(汉语新解 ${prompt}) 输出要求: 要输出svg内容`,
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