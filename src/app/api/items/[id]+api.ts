import { deleteGroceryItem, setGroceryItemPurchased, updateGroceryItemQuantity } from "@/lib/server/db-actions";
import { getUserId } from "@/lib/server/auth";

export async function PATCH(request:Request, {id}: {id: string}) {
  const userId = await getUserId(request);
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const item = body.quantity
    ? await updateGroceryItemQuantity(userId, id, body.quantity) : await setGroceryItemPurchased(userId, id, body.purchased ?? true);

    if(!item) return Response.json({error: "Item not found"}, {status: 404});
    return Response.json({item});
  }catch (error){
    const message = error instanceof Error ? error.message : "Failed to update item";
    return Response.json({error: message}, {status: 500})
  }
}

export async function DELETE(request: Request, { id }:{id: string}) {
  const userId = await getUserId(request);
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteGroceryItem(userId, id);
    return Response.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete item ";
    return Response.json({ error: message }, { status: 500 });
  }
}
