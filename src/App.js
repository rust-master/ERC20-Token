import React from "react";
import "./App.css";
import Web3 from "web3";
import contract from "./build/contracts/ERC20Token.json";

class App extends React.Component {
  async componentWillMount() {
    this.loadWeb3();
    this.loadBlockchainData();
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#282c34";
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.sendToken = this.sendToken.bind(this);
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
    this.state = {
      receiver: "",
      amount: "",
      account: "",
      totalSupply: "",
      symbol: "",
      balance: "",
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  async sendToken() {
    const web3 = window.web3;
    const webeProvider = new Web3(Web3.givenProvider);
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Sender :  " + accounts[0]);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[networkId];

    const instance = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await instance.methods
      .transfer(this.state.receiver, this.state.amount)
      .send({
        from: accounts[0],
      });

    const totalSupply = await instance.methods.totalSupply().call();
    this.setState({ totalSupply: totalSupply });
    console.log("Total Supply" + totalSupply);
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const webeProvider = new Web3(Web3.givenProvider);
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Sender :  " + accounts[0]);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[networkId];

    const instance = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    const totalSupply = await instance.methods.totalSupply().call();
    const symbol = await instance.methods.symbol().call();
    const balance = await instance.methods.balanceOf(accounts[0]).call();
    this.setState({ totalSupply: totalSupply });
    this.setState({ symbol: symbol });
    this.setState({ balance: balance });
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1 style={{ color: "#f6a709" }}>ERC-20 Token</h1>

          <span
            style={{
              float: "left",
              color: "#f6a709",
              fontSize: "20px",
              marginLeft: "10px",
            }}
          >
            Total Supply: {this.state.totalSupply + " " + this.state.symbol}
          </span>

          <span
            style={{
              float: "right",
              color: "#f6a709",
              fontSize: "20px",
              marginRight: "10px",
            }}
          >
            Balance: {this.state.balance + " " + this.state.symbol}
          </span>

          <br />
          <hr />

          <input
            style={{
              marginTop: "220px",
              width: "450px",
              height: "25px",
              fontSize: "18px",
            }}
            type="text"
            name="receiver"
            placeholder="Receiver Address"
            value={this.state.receiver}
            onChange={this.handleChange}
          />

          <div>
            <input
              style={{
                marginTop: "10px",
                width: "450px",
                height: "25px",
                fontSize: "18px",
              }}
              type="number"
              name="amount"
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>

          <button
            style={{
              marginTop: "10px",
              borderRadius: "10px",
              backgroundColor: "#f6a709",
              color: "white",
              width: "120px",
              height: "40px",
            }}
            onClick={this.sendToken}
          >
            Send
          </button>
        </div>

        <hr style={{ marginTop: "250px" }} />
        <h3 style={{ color: "#f6a709" }}>
          Developed By: Muhammad Zaryab Rafique
        </h3>
      </div>
    );
  }
}

export default App;
