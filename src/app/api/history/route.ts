import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

function safeDateToISOString(date: unknown) {
  let d: Date;
  if (typeof date === "string" || typeof date === "number" || date instanceof Date) {
    d = new Date(date);
  } else {
    d = new Date();
  }
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

export async function GET() {
  try {
    const user = await currentUser();

    if (!user || !user.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db
      .select({
        id: AIOutput.id,
        formData: AIOutput.formData,
        aiResponse: AIOutput.aiResponse,
        createdAt: AIOutput.createdAt,
        templateSlug: AIOutput.templateSlug,
        createdBy: AIOutput.createdBy,
      })
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user.emailAddresses[0].emailAddress))
      .orderBy(desc(AIOutput.createdAt));

    // Safely format dates
    const formattedData = data.map(item => ({
      ...item,
      createdAt: safeDateToISOString(item.createdAt),
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
