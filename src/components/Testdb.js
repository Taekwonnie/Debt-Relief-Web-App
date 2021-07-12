import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
export default function Testdb() {
  const { currentUser } = useAuth(); //Get the UUID of current login users
  const [userTransaction, setUserTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTransaction() {
    //setLoading(true);
    const transactionRef = db.collection("UserTransaction");
    const snapshot = await transactionRef
      .where("UserID", "==", currentUser.uid)
      .get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
    //setLoading(false);
  }

  useEffect(() => {
    getTransaction();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Transactions: </h1>
      {userTransaction.map((transaction) => (
        <div key={transaction.id}>
          <h2>{transaction.Type}</h2>
          <p>{transaction.Amount}</p>
        </div>
      ))}
    </div>
  );
}
