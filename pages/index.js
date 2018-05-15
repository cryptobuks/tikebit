import React, { Component } from "react";
import icoCoin from "../ethereum/icoCoin";
import { Form, Button, Message, Input } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import { Router, Link } from "../routes.js";
import Head from "next/head";
import Popup from "reactjs-popup";
import scrollToComponent from "react-scroll-to-component";

class IcoIndex extends Component {
  state = {
    value: "",
    addressBuyer: "",
    loading: false,
    errorMessage: "",
    progressValue: "0%",
    textButton: "Buy TBC",
    youWillGet: "0"
  };
  static async getInitialProps() {
    const roundTo = require("round-to");
    // const decimals =
    const unitsOneEthCanBuy = await icoCoin.methods.unitsOneEthCanBuy().call();
    const softCapDate = await icoCoin.methods.softCapDate().call();
    const hardCapDate = await icoCoin.methods.hardCapDate().call();
    let hardCap = await icoCoin.methods.hardCap().call();
    let softCap = await icoCoin.methods.softCap().call();
    const weiCollected = await icoCoin.methods.weiCollected().call();
    const ethCollected = web3.utils.fromWei(weiCollected, "ether");
    let totalSupply = await icoCoin.methods.totalSupply().call();
    hardCap = web3.utils.fromWei(hardCap, "ether");
    softCap = web3.utils.fromWei(softCap, "ether") / 10000;
    totalSupply = web3.utils.fromWei(totalSupply, "ether");
    let progressPer = totalSupply * 100 / hardCap;
    hardCap = hardCap / 10000;
    progressPer = roundTo(progressPer, 1);

    const progress = {
      width: progressPer + "%"
    };

    return {
      totalSupply,
      progress,
      unitsOneEthCanBuy,
      softCapDate,
      hardCapDate,
      ethCollected,
      progressPer,
      hardCap,
      softCap
    };
  }
  getAccounts = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const test = accounts[0];
    this.setState({ addressBuyer: test });
    // return test;
  };

  onSubmit = async event => {
    event.preventDefault();

    const { addressBuyer, value } = this.state;

    this.setState({
      loading: true,
      errorMessage: "",
      textButton: "Loading..."
    });
    try {
      // await web3.eth.sendTransaction({
      //   from: addressBuyer,
      //   to: "0x51f6AFe8841d43e8668b18D7b3144d9D7D302576",
      //   value: web3.toWei(value, "ether")
      // });
      await web3.eth.sendTransaction({
        from: addressBuyer,
        to: "0x51f6AFe8841d43e8668b18D7b3144d9D7D302576",
        value: web3.utils.toWei(value, "ether")
      });
      location.reload();
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({
      loading: false,
      textButton: "Buy TBC",
      value: "",
      addressBuyer: ""
    });
  };
  onChangeValue = event => {
    var re = new RegExp(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/);
    const quantity = event.target.value;
    let willGet = "0";
    if (re.test(quantity)) {
      willGet = quantity * 10000;
    } else {
      willGet = "0";
    }
    this.setState({ value: quantity, youWillGet: willGet });
  };

  render() {
    const Timestamp = require("react-timestamp");
    var QRCode = require("qrcode.react");
    this.state.progressValue = this.props.progressPer + "%";
    return (
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
            integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
            crossOrigin="anonymous"
          />

          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
            integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lato"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Muli"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/test.css" />
          <title>Tikebit coin</title>
        </Head>

        <div className="jumbotron jumbotron-fluid backgroundR">
          <div className="container">
            <div className="row">
              <div className="text-center">
                <img src="/static/logo-tikebit.png" className="logoTikebit" />
                <p className="lead">
                  <br />
                  <br />
                  <br />
                  <br />
                  Well lay all these little funky little things in there. If you
                  dont think every day is a good day - try missing a few. You'll
                  see. Just take out whatever you don't want. Itll change your
                  entire perspective. There is no right or wrong - as long as it
                  makes you happy and doesnt hurt anyone. Everyone wants to
                  enjoy the good parts - but you have to build the framework
                  first. We dont need any guidelines or formats. All we need to
                  do is just let it flow right out of us.
                </p>

                <div className="progress progressTop mx-auto">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={this.props.progress}
                  >
                    {this.state.progressValue}
                  </div>
                </div>
                <a
                  className="btn btn-outline btn-xl js-scroll-trigger"
                  onClick={() =>
                    scrollToComponent(this.contribute, {
                      offset: 0,
                      align: "top",
                      duration: 2000
                    })
                  }
                >
                  Invest!
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="features" id="features">
          <div className="container">
            <div className="section-heading text-center">
              <h2>Unlimited Features, Unlimited Fun</h2>
              <p className="text-muted">
                Check out what you can do with this app theme!
              </p>
              <hr />
            </div>
            <div className="row">
              <div className="col-lg-4 my-auto">
                <div className="device-container">
                  <div className="device-mockup iphone6_plus portrait white">
                    <div className="device">
                      <div className="screen">
                        <i className="fab fa-ethereum logoIcon" />
                      </div>
                      <div className="button" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 my-auto">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="feature-item">
                        <i className="fas fa-check text-primary" />
                        <h3>Happy little tree</h3>
                        <p className="text-muted">
                          Well put some happy little leaves here and there.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="feature-item">
                        <i className="fas fa-bars text-primary" />
                        <h3>It's life. It's interesting.</h3>
                        <p className="text-muted">
                          The least little bit can do so much.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="feature-item">
                        <i className="fas fa-desktop text-primary" />

                        <h3>Free to Use</h3>
                        <p className="text-muted">
                          You better get your coat out, this is going to be a
                          cold painting.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="feature-item">
                        <i className="fas fa-mobile-alt text-primary" />
                        <h3>I like to beat the brush.</h3>
                        <p className="text-muted">
                          This is truly an almighty mountain.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="specs bg-primary text-center" id="contacto">
          <div className="container">
            <div className="section-heading text-center">
              <h2>It's cold, but it's beautiful</h2>
              <p>Only think about one thing at a time. Dont get greedy</p>
              <hr />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="feature-item">
                  <h3>With 1 ETH you get</h3>
                  <p className="featuredData">
                    {this.props.unitsOneEthCanBuy} TBC
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="feature-item">
                  <h3>Tokens sold</h3>
                  <p className="featuredData">{this.props.totalSupply} TBC</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="feature-item">
                  <h3>Soft Cap Date</h3>
                  <Timestamp
                    className="featuredData"
                    time={this.props.softCapDate}
                    format="full"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="feature-item">
                  <h3>Hard Cap Date</h3>
                  <Timestamp
                    className="featuredData"
                    time={this.props.hardCapDate}
                    format="full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="contribute"
          id="contribute"
          ref={section => {
            this.contribute = section;
          }}
        >
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-6 backBlack">
                <h1>Amount of ETH raised:</h1>
                <h2>{this.props.ethCollected} ETH</h2>
                <hr />
                <h3>
                  <span id="left">Soft cap: {this.props.softCap}ETH*</span>
                  <span id="right">Hard cap: {this.props.hardCap}ETH</span>
                </h3>
                <div className="progress progressRaised mx-auto">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={this.props.progress}
                  >
                    {this.state.progressValue}
                  </div>
                </div>
                <h4>
                  *If the softcap isnt completed within the established time,
                  the money will be refund.
                </h4>
              </div>
              <div className="col-6 backBlue mx-auto mv-auto">
                <h1>Contribute:</h1>
                <Form
                  onSubmit={this.onSubmit}
                  error={!!this.state.errorMessage}
                >
                  <Form.Field>
                    <h3>Value in Ether</h3>
                    <Input
                      value={this.state.value}
                      onChange={this.onChangeValue}
                    />
                  </Form.Field>
                  <h3 id="right">You will get: {this.state.youWillGet}BTC</h3>
                  <Form.Field>
                    <h3>Ethereum address</h3>
                    <Input
                      fluid
                      value={this.state.addressBuyer}
                      onChange={event =>
                        this.setState({ addressBuyer: event.target.value })
                      }
                    />
                  </Form.Field>

                  <Message error content={this.state.errorMessage} />
                  <Popup
                    trigger={
                      <button className="btn btn-outline-warning" type="button">
                        Show QR
                      </button>
                    }
                    on="focus"
                    position="top left"
                    closeOnDocumentClick
                  >
                    <span>
                      <QRCode
                        className="testPopup"
                        value="0x51f6AFe8841d43e8668b18D7b3144d9D7D302576"
                      />
                    </span>
                  </Popup>
                  <button
                    className="btn btn-outline-light"
                    type="submit"
                    disabled={this.state.loading}
                  >
                    {this.state.textButton}
                  </button>
                </Form>

                <button
                  className="btn btn-outline-light btn-block btn-sm metamask"
                  id="right"
                  type="button"
                  onClick={this.getAccounts}
                >
                  Get Metamask account
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="contacto bg-primary text-center" id="contacto">
          <div className="container">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <h2 className="section-heading">
                  Keep up with the latest news about Tikebit!
                </h2>
                <p>Subscribe to our newsletter</p>
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default IcoIndex;
