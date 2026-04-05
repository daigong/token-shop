# AGENTS.md

## Overview

本仓库用于搭建一个专业的 AI 基础设施服务平台官方网站，主要面向企业用户。

网站应帮助访客了解公司的产品优势、产品价格、模型能力与背景介绍、公司简介以及商务合作信息。整体内容与用户体验需要体现专业、可信、面向企业客户的品牌形象。

## Tech Stack

- Next.js
- Tailwind CSS
- shadcn/ui

## Rules

### Rule 1: 保持品牌与业务表达风格

所有内容、文案和 UI 呈现都应保持专业、可信、面向企业客户的品牌形象。

### Rule 2: 未经确认，不要改写受保护的业务内容

未经用户明确确认，不要修改以下内容的核心表述：
- 公司介绍
- 商务合作信息

### Rule 3: 产品价格必须来自外部权威来源

产品价格由另一个系统导出。除非用户明确说明要修改，并清楚说明预期的数据来源或更新方式，否则不要手动编造、重定义或随意编辑价格内容。

### Rule 4: 引入新技术前必须确认

未经用户明确批准，不要引入新的 framework、library、component system、styling system、state management tool，或其他重大技术选型。

优先使用现有技术栈解决问题：
- Next.js
- Tailwind CSS
- shadcn/ui
