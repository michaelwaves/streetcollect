import { Wallet } from "./near-wallet";
import { nearConfig } from "../data/NEAR_CONFIG";
import { parseNearAmount } from "near-api-js/lib/utils/format";

export const mintPatent = async (wallet: Wallet, token_id: string, metadata: Object) => {
    await wallet.callMethod({
        contractId: nearConfig.nftContractName,
        method: "nft_mint",
        args: {
            token_id,
            metadata,
            receiver_id: wallet.accountId,
        },
        gas: "300000000000000",
        deposit: parseNearAmount("1") as string,
    })
}

export const transferPatent = async (wallet: Wallet, token_id: string, receiver_id: string) => {
    await wallet.callMethod({
        contractId: nearConfig.nftContractName,
        method: "nft_transfer",
        args: {
            token_id,
            receiver_id,
            approval_id: null,
            memo: "transfer",
        },
        gas: "300000000000000",
        deposit: "1",
    })
}