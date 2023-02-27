export function ProcessRequest(work: () => unknown) {
  try {
    return work();
  } catch (error) {
    console.error(`❌ ${error}`);
  }
}

export async function ProcessRequestAsync<T>(work: () => Promise<T>) {
  try {
    return await work();
  } catch (error) {
    console.error(`❌ ${error}`);
  }
}
