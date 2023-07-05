import { mapCardStr } from "./helper";

const cardStr = "S[6] C[9] H[2] H[3] D[7] C[10] C[8] H[J] H[10] D[10] S[3] D[J] C[4] D[9] D[5] S[J] C[5] D[8] D[A] C[3] C[J] D[2] C[7] S[A] S[8] H[A] H[Q] C[K] D[6] C[2] D[3] D[K] C[A] D[Q] S[4] H[6] S[2] H[K] S[5] S[9] H[8] H[5] C[Q] S[Q] S[10] H[4] H[7] S[7] C[6] D[4] H[9] S[K]";
export const Cards = mapCardStr(cardStr);
