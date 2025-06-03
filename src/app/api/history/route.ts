import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user || !user.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
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

    return NextResponse.json(data.map(item => ({
      ...item,
      createdAt: item.createdAt 
        ? new Date(item.createdAt).toISOString() 
        : new Date().toISOString()
    })));

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
