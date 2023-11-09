import { Wallet } from "./near-wallet";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { nearConfig } from "../data/NEAR_CONFIG";
//functions from https://dev.to/kels_orien/building-a-full-stack-nft-market-place-with-near-protocol-and-reactjs-part-2-5136?preview=a8d5f5fd603996ebb989078c5048a1bceb7ac0d9fe1d94bbaee7951137934554380c39f7d4a61041b3046f24f3f3b291a0abe66b2ddf7aedd49b54b8


const getMinimumStorage = async (wallet: Wallet) => {
    let minimum_balance = await wallet.viewMethod({
        contractId: nearConfig.marketContractName,
        method: "storage_minimum_balance",
        args: {},
    })

    return minimum_balance;
    /* walletConnection
        .account()
        .viewFunction(nearConfig.marketContractName, "storage_minimum_balance");
    setMinimum(minimum_balance); */
};

const sendStorageDeposit = async (wallet: Wallet) => {
    const minimum = await getMinimumStorage(wallet);
    await wallet.callMethod({
        contractId: nearConfig.marketContractName,
        method: "storage_deposit",
        args: {},
        gas: "300000000000000",
        deposit: minimum,
    })
    /* await walletConnection.account().functionCall({
        contractId: nearConfig.marketContractName,
        methodName: "storage_deposit",
        args: {},

        attachedDeposit: minimum,
    }); */
};

export const approveNFTForSale = async (wallet: Wallet, token_id: string, price: string) => {
    sendStorageDeposit(wallet);
    let sale_conditions = {
        sale_conditions: price
    };
    await wallet.callMethod({
        contractId: nearConfig.nftContractName,
        method: "nft_approve",
        args: {
            token_id: token_id,
            account_id: nearConfig.marketContractName,
            msg: JSON.stringify(sale_conditions),
        },
        gas: "300000000000000",
        deposit: "0.01",
    })
    /* await walletConnection.account().functionCall({
        contractId: nearConfig.contractName,
        methodName: "nft_approve",
        args: {
            token_id: token_id,
            account_id: nearConfig.marketContractName,
            msg: JSON.stringify(sale_conditions),
        },
        attachedDeposit: parseNearAmount("0.01"),
    }); */
};


export const OfferPrice = async (wallet: Wallet, token_id: string, price: string) => {
    await wallet.callMethod({
        contractId: nearConfig.marketContractName,
        method: "offer",
        args: {
            nft_contract_id: nearConfig.nftContractName,
            token_id,
        },
        gas: "300000000000000",
        deposit: parseNearAmount(price) ?? "0.01",
    })

    /* await walletConnection.account().functionCall({
      contractId: nearConfig.marketContractName,
      methodName: "offer",
      args: {
        nft_contract_id: nearConfig.contractName,
        token_id,
      },
      attachedDeposit: parseNearAmount(values.assetBid),
      gas: nearConfig.GAS,
    }) */
}