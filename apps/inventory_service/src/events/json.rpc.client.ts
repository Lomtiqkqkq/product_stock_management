import { JSONRPCClient } from 'json-rpc-2.0';
import fetch from 'node-fetch';

const rpcClient = new JSONRPCClient((jsonRPCRequest) =>
  fetch('http://localhost:4000/json-rpc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jsonRPCRequest)
  }).then(async (response: any) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 204) {
      return null;
    } else {
      throw new Error('JSON-RPC error');
    }
  })
);
export async function logAction(action: string, data: any) {
  try {
    const result = await rpcClient.request('logAction', { action, data });
    console.log('Action logged:', result);
  } catch (error) {
    console.error('Failed to log action:', error);
  }
}
