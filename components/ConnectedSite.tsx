import { FC, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { signMessage } from "../services/wallet.service";

export const ConnectedSite = (props: { address: string }) => {
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("1");

  const [shortText, setShortText] = useState("");
  const [lastSig, setLastSig] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState<
    "idle" | "approve" | "pending" | "success"
  >("idle");

  const buttonsDisabled = ["approve", "pending"].includes(transactionStatus);

  const handleTransferSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setTransactionStatus("approve");
      setTransactionStatus("pending");
    } catch (e) {
      console.error(e);
      setTransactionStatus("idle");
    }
  };

  const handleSignSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setTransactionStatus("approve");
      const result = await signMessage(props.address, shortText);
      setLastSig(result);
      setTransactionStatus("success");
    } catch (e) {
      console.error(e);
      setTransactionStatus("idle");
    }
  };

  return (
    <>
      <div className="columns">
        <form onSubmit={handleTransferSubmit}>
          <h2 className={styles.title}>Transfer token</h2>
          <label htmlFor="transfer-to">To</label>
          <input
            type="text"
            id="transfer-to"
            name="fname"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
          />
          <label htmlFor="transfer-amount">Amount</label>
          <input
            type="text"
            id="transfer-amount"
            name="fname"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <br />
          <input type="submit" disabled={buttonsDisabled} value="Transfer" />
        </form>
      </div>
      <div className="columns">
        <form onSubmit={handleSignSubmit}>
          <h2 className={styles.title}>Sign Message</h2>
          <label>Short Text</label>
          <input
            type="text"
            id="short-text"
            name="short-text"
            value={shortText}
            onChange={(e) => setShortText(e.target.value)}
          />
          <input type="submit" value="Sign" />
        </form>
        <form>
          <h2 className={styles.title}>Sign results</h2>

          <textarea
            className={styles.textarea}
            id="r"
            name="r"
            value={lastSig}
            readOnly
          />
        </form>
      </div>
    </>
  );
};
