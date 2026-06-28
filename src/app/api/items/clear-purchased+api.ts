import { clearPurchasedItems } from "@/lib/server/db-actions";
import { getUserId } from "@/lib/server/auth";

export async function POST(request: Request) {
  const userId = await getUserId(request);
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await clearPurchasedItems(userId);
    return Response.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to clear completed items";
    return Response.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
