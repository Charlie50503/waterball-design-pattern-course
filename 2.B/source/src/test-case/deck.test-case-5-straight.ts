import { mapCardStr } from "./helper";

const cardStr = "D[9] C[J] D[10] S[9] H[6] C[5] S[J] C[7] D[7] C[K] H[2] H[Q] S[8] S[Q] H[4] S[10] S[3] H[A] S[A] H[5] D[Q] C[A] S[4] D[8] C[8] C[9] S[7] S[2] D[6] C[4] D[A] H[8] D[3] C[6] H[10] D[2] H[9] C[2] H[3] H[K] D[5] D[J] C[3] D[K] H[7] S[6] C[Q] S[5] C[10] H[J] S[K] D[4]";
export const Cards = mapCardStr(cardStr);
