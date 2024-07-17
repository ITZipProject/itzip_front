// src/api/saramin/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = 'https://oapi.saramin.co.kr/job-search?access-key=NBaazikxSG5w1HfnfMTecD9RzGIEdtkoJNKGD8vIRusIfik&ind_cd=3&job_mid_cd=2&start=0&count=110';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('네트워크 응답이 실패했습니다.');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
