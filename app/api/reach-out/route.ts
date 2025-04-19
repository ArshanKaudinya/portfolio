import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contactSchema';
import { clean } from '@/lib/clean';
import { db } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const data = contactSchema.parse(raw);

    // 800 ms minimum dwell‑time
    if (Date.now() - data.ts < 800) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await db.collection('contacts').add({
      name: data.name,
      email: data.email.toLowerCase(),
      message: clean(data.message),
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
