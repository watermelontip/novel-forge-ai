async function e(e,t=``,n=``,r=``,i=``){let a=n||localStorage.getItem(`novelforge_api_key`)||``,o=r||localStorage.getItem(`novelforge_base_url`)||`https://api.openai.com/v1`,s=i||localStorage.getItem(`novelforge_model`)||`gpt-4o-mini`;if(!a)throw Error(`请先在设置中配置 API Key`);let c=await fetch(`${o}/chat/completions`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${a}`},body:JSON.stringify({model:s,messages:[...t?[{role:`system`,content:t}]:[],{role:`user`,content:e}],temperature:.8,max_tokens:4096,stream:!1})});if(!c.ok){let e=await c.text();throw Error(`API Error: ${c.status} - ${e}`)}return(await c.json()).choices?.[0]?.message?.content||``}async function*t(e,t=``,n=``,r=``,i=``){let a=n||localStorage.getItem(`novelforge_api_key`)||``,o=r||localStorage.getItem(`novelforge_base_url`)||`https://api.openai.com/v1`,s=i||localStorage.getItem(`novelforge_model`)||`gpt-4o-mini`;if(!a)throw Error(`请先在设置中配置 API Key`);let c=await fetch(`${o}/chat/completions`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${a}`},body:JSON.stringify({model:s,messages:[...t?[{role:`system`,content:t}]:[],{role:`user`,content:e}],temperature:.8,max_tokens:4096,stream:!0})});if(!c.ok)throw Error(`API Error: ${c.status}`);let l=c.body.getReader(),u=new TextDecoder,d=``;for(;;){let{done:e,value:t}=await l.read();if(e)break;d+=u.decode(t,{stream:!0});let n=d.split(`
`);d=n.pop()||``;for(let e of n)if(e.startsWith(`data: `)){let t=e.slice(6).trim();if(t===`[DONE]`)return;try{let e=JSON.parse(t).choices?.[0]?.delta?.content;e&&(yield e)}catch{}}}}var n=`你是一位专业的长篇小说写作助手。你的任务是根据提供的世界观、角色设定、剧情大纲和上下文，创作高质量的章节内容。

核心原则：
1. 角色言行必须符合设定，对话要有个性差异
2. 不得违背已建立的世界观规则
3. 伏笔回收要自然，不能生硬
4. 战斗场景有节奏感，不要写成数值比大小
5. 每章必须有章末钩子，让读者想看下一章
6. 避免 AI 味语句（如：嘴角勾起一抹弧度、不禁、竟然、一股强大的气息）

禁止使用的语句：
- 嘴角勾起一抹弧度
- 不禁 XX
- 竟然 XX（过度使用）
- 一股强大的气息
- 眼中闪过一丝 XX
- 他知道，这一切才刚刚开始

章末钩子类型（选择一种，避免与最近5章重复）：
1. 危机悬置：敌人/危险刚出现就断章
2. 信息揭示一半：说出半个真相
3. 抉择悬置：角色面临两难，不写选择
4. 反转预告：局势看似已定，结尾一句颠覆
5. 新人物登场：神秘人现身
6. 目标达成前一刻：宝物/突破触手可及时断章
7. 情感冲击：重要角色出事/真情揭露
8. 倒计时压迫：明确的期限逼近`;async function r(t,r,i,a,o){let s=await e(`你是一位资深网文编辑。用户想写一本${t}小说，核心想法是：${r}

请为这本小说生成完整的世界观设定，包括：
1. 力量体系（修炼等级、突破条件、质变点）
2. 地理设定（主要区域、隐藏秘境）
3. 势力分布（主要门派/家族、关系）
4. 核心规则（世界运行的底层法则）
5. 历史背景（重大事件时间线）

用 JSON 格式输出。`,n,i,a,o);try{return JSON.parse(s)}catch{return{raw:s}}}async function i(t,r,i=5,a,o,s){let c=await e(`基于以下世界观，为${t}小说生成${i}个核心角色。

世界观：${JSON.stringify(r,null,2)}

每个角色需要包含：
- name: 名字
- role: protagonist/antagonist/supporting
- appearance: 外貌描写（50字以内）
- personality: { core_traits: [], speech_style: "", habits: [] }
- background: 背景故事（100字以内）
- abilities: 能力列表
- current_goal: 当前目标
- voice_profile: { catchphrases: [常用语], never_says: [绝不会说的词], sentence_length: short/medium/long }

用 JSON 数组格式输出。`,n,a,o,s);try{return JSON.parse(c)}catch{return[]}}async function a(t,r,i,a,o){let s=await e(`你是一位专业的小说大纲规划师。根据以下上下文，为第${r}章生成详细大纲。

上下文：
${JSON.stringify(t,null,2)}

请生成：
1. 章节标题
2. 本章目标（推进什么剧情、展示什么人物）
3. 主要场景（1-3个）
4. 冲突点
5. 章末钩子（从8种类型中选择，避免与最近5章重复）
6. 节奏定位（慢/正常/快/高潮/过渡）
7. 出场角色
8. 伏笔操作（新埋/推进/回收）

用 JSON 格式输出。`,n,i,a,o);try{return JSON.parse(s)}catch{return{raw:s}}}async function*o(e,r,i,a,o,s){let c=`
写作风格要求：
- 叙事视角：${i.narrative_pov===`first`?`第一人称`:i.narrative_pov===`third_limited`?`第三人称有限视角`:`第三人称全知视角`}
- 时态：${i.tense===`past`?`过去时`:`现在时`}
- 基调：${i.tone}
- 描写密度：${i.description_density}
- 对话占比：约${Math.round(i.dialogue_ratio*100)}%
- 动作风格：${i.action_style}
- 词汇水平：${i.vocabulary_level}`;yield*t(`请根据以下信息创作第${r.chapter_number||`?`}章的完整正文。

【世界观核心】
${e.power_system||``}
境界体系：${(e.cultivation_levels||[]).join(` → `)}

【出场角色】
${(e.characters||[]).map(e=>`${e.name}（${e.role}）：${e.personality}，说话风格：${e.voice}`).join(`
`)}

【最近剧情】
${(e.recent_chapters||[]).join(`

`)}

【活跃伏笔】
${(e.active_foreshadowing||[]).join(`
`)}

【本章大纲】
标题：${r.title||``}
目标：${r.goal||``}
场景：${(r.scenes||[]).join(`、`)}
冲突：${r.conflict||``}
章末钩子：${r.hook||``}（${r.hook_type||``}）
节奏：${r.pacing||`正常`}
${c}

要求：
1. 字数 3000-5000 字
2. 开头要有吸引力，不能平铺直叙
3. 对话要有角色个性，遮住名字能分清是谁说的
4. 场景描写要有画面感
5. 章末必须有钩子，让人想看下一章
6. 不要使用禁止语句列表中的表达

请直接输出正文内容，不要加任何说明。`,n,a,o,s)}async function s(t,r,i,a,o){let s=await e(`请对以下章节内容进行质量审核，从4个维度检查：

【节奏 pass】
- 是否有不推进剧情/人物的段落？
- 铺垫段是否超过800字无冲突？
- 整体节奏是否流畅？

【AI 味 pass】
- 是否有 AI 味黑名单语句？
- 是否有连续相似句式（如连续多段以"他"开头）？
- 是否有过度形容词堆砌？

【对话 pass】
- 所有对话遮住名字能否分清是谁说的？
- 对话是否符合角色性格？

【钩子 pass】
- 章末最后200字是否真的让人想点下一章？
- 钩子类型是什么？是否有效？

章节内容：
${t}

请逐项检查并给出修改建议。用 JSON 格式输出：
{
  "score": 0-100,
  "issues": [
    { "type": "pacing|ai_flavor|dialogue|hook", "location": "段落位置", "problem": "问题描述", "suggestion": "修改建议" }
  ],
  "strengths": ["优点1", "优点2"],
  "summary": "总体评价"
}`,n,i,a,o);try{return JSON.parse(s)}catch{return{raw:s}}}async function c(t,n=`chapter`,r,i,a){return await e(n===`chapter`?`请为以下章节生成一行摘要（80-120字），格式：主要事件 | 状态变化 | 伏笔操作\n\n${t}`:`请为以下卷内容生成总结（300-500字），包括：本卷主线、角色变化、未解决线索\n\n${t}`,``,r,i,a)}async function l(t,n,r,i,a){let o=await e(`请检查以下章节内容是否涉及已埋设的伏笔。

章节内容：
${t}

活跃伏笔：
${n.map(e=>`[${e.id}] ${e.content} (埋设于第${e.planted_chapter}章，预计第${e.expected_resolve}章回收)`).join(`
`)}

请分析：
1. 哪些伏笔在本章被推进或回收了？
2. 是否有新的伏笔被埋设？
3. 是否有伏笔被遗忘（到了预期回收章节但未处理）？

用 JSON 格式输出：
{
  "resolved": [{"fs_id": "xxx", "how": "回收方式"}],
  "advanced": [{"fs_id": "xxx", "how": "推进方式"}],
  "new": [{"content": "新伏笔内容", "expected_resolve": "预期回收"}],
  "missed": [{"fs_id": "xxx", "reason": "为什么应该在本章回收"}]
}`,``,r,i,a);try{return JSON.parse(o)}catch{return{raw:o}}}export{r as a,c as i,a as n,s as o,i as r,o as s,l as t};