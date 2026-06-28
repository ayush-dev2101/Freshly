import { and, desc, eq } from "drizzle-orm";
import { db } from "./db/client";
import { groceryItems } from "./db/schema";
import * as crypto from "crypto";

export const listGroceryItems = async (userId: string) => {
  const rows = await db
    .select()
    .from(groceryItems)
    .where(eq(groceryItems.user_id, userId))
    .orderBy(desc(groceryItems.updated_at));

  return rows;
};

export const createGroceryItems = async (
  userId: string,
  input: {
    name: string;
    category: string;
    quantity: number;
    priority: string;
  }
) => {
  const rows = await db
    .insert(groceryItems)
    .values({
      id: crypto.randomUUID(),
      user_id: userId,
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity),
      purchased: false,
      priority: input.priority,
      updated_at: Date.now(),
    })
    .returning(); //Return all the values stored in the rows

  return rows[0];
};

export const setGroceryItemPurchased = async (
  userId: string,
  id: string,
  purchased: boolean,
) => {
  const rows = await db
    .update(groceryItems)
    .set({ purchased, updated_at: Date.now() })
    .where(and(eq(groceryItems.id, id), eq(groceryItems.user_id, userId)))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

export const updateGroceryItemQuantity = async (
  userId: string,
  id: string,
  quantity: number,
) => {
  const rows = await db
    .update(groceryItems)
    .set({
      quantity: Math.max(1, Math.floor(quantity)),
      updated_at: Date.now(),
    })
    .where(and(eq(groceryItems.id, id), eq(groceryItems.user_id, userId)))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

export const deleteGroceryItem = async (userId: string, id: string) => {
  await db
    .delete(groceryItems)
    .where(and(eq(groceryItems.id, id), eq(groceryItems.user_id, userId)));
};

//Insights page delete all the completed items
export const clearPurchasedItems = async (userId: string) => {
  await db
    .delete(groceryItems)
    .where(and(eq(groceryItems.purchased, true), eq(groceryItems.user_id, userId)));
};
