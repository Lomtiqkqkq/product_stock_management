import { HistoryEntity } from '../entity/history.entity.js';
import { JSONRPCServer } from 'json-rpc-2.0';

const server = new JSONRPCServer();

server.addMethod("logAction", async ({ action, data }) => {
  try {
    await HistoryEntity.create({
      action,
      plu: data.plu,
      name: data.name,
      shop_id: data.shop_id,
      product_id: data.product_id,
      count_in_the_storage: data.count_in_the_storage,
      count_in_order: data.count_in_order,
      date: new Date(),
    });

    console.log(`Action '${action}' logged successfully.`);
    return { status: "success" };
  } catch (error) {
    console.error("Failed to log action:", error);
    throw new Error("Failed to save log to database.");
  }
});
