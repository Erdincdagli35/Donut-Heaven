import React from 'react';
import './App.css';
import Game from './game'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
    this.game = new Game()
  }
  componentDidMount() {
    setInterval(() => {
      this.game.update();
      this.setState({});
    }, 100)
  }

  update = () => {
    this.game.update();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          ED - Donut Heaven
      </header>
        <div style={{ marginBottom: '12px' }}>
          Donut : {Math.floor(this.game.manufacturedObject)} <br />
          <button
            disabled={!this.game.canMakeObject()}
            onClick={() => this.game.makeObject()}
          >
            Make a Donut !
           </button>
        </div>
        <div style={{ marginTop: "16px" }}>
          <div>Business</div>
          <hr />
          <div>
            <table>
              <tr>
                <td style={{ width: "150" }}>Money In Money Case  : </td>
                <td>{Math.floor(this.game.money)}$</td>
              </tr>
              <tr>
                <td>Pieces In Cabinet : </td>
                <td>{Math.floor(this.game.currentObject)} </td>
              </tr>
              <tr>
                <td>Price : </td>
                <td>{this.game.price}$
                <button
                    style={{ marginLeft: "20px" }}
                    onClick={this.game.increasePrice}
                  >
                    +
                </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    disabled={!this.game.canDecreasePrice()}
                    onClick={this.game.decreasePrice}
                  >
                    -
                </button>
                </td>
              </tr>
              <tr>
                <td>Public Demand : </td>
                <td>% {this.game.demandRate}</td>
              </tr>
            </table>
          </div>
          <div style={{ marginTop: "16px" }}>
            <div>Production </div>
            <hr />
            <table>
              <tr>
                <td style={{ width: "150" }} >
                  Donut / Second : </td>
                <td>{this.game.lastManufacturedRate}</td>
              </tr>
              <tr>
                <td>
                  Material :
                  </td>
                <td>{Math.floor(this.game.material)} gr</td>
                <td><button
                  style={{ marginLeft: "10px" }}
                  onClick={this.game.buyMaterial}
                  disabled={!this.game.canBuyMaterial()}
                >
                  Buy it !  ({this.game.materialCost}$)
                  </button>
                </td>
              </tr>
              <tr>
                <td>Purchasing Manager : </td>
                <td>
                  {this.game.hasAutoBuyer ? (
                    <React.Fragment>
                      {this.game.isAutoBuyerActive ? "Active" : "Stoped"}
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={this.game.isAutoBuyerActive
                          ? this.game.stopAutoBuyer
                          : this.game.startAutoBuyer
                        }
                      >
                        {this.game.isAutoBuyerActive ? "Stop" : "Continue"}
                      </button>
                    </React.Fragment>
                  ) : (
                      <span>
                        Null
                      {this.game.didUnlockAutoBuyer() && (
                          <button
                            style={{ marginLeft: "10px" }}
                            disabled={!this.game.canBuyAutoBuyer()}
                            onClick={this.game.buyAutoBuyer}
                          >
                            Hire it ! {this.game.autoBuyerCost}$
                      </button>
                        )}
                      </span>
                    )}
                </td>
              </tr>
            </table>
            <div style={{ marginTop: "16px" }}>
              <div>Employee</div><hr />
              <table>
                <tr>
                  <td>Donut Maker : </td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.errandBoy}</td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.game.buyAutoGenerator('ERRAND_BOY')}
                      disabled={!this.game.canBuyAutoGenerator('ERRAND_BOY')}
                    >
                      Hire it !  ({this.game.autoGenerators.errandBoyCost}$)
                      </button>
                  </td>
                </tr>
                <tr>
                  <td>Waiter : </td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.foreman}</td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.game.buyAutoGenerator('FOREMAN')}
                      disabled={!this.game.canBuyAutoGenerator('FOREMAN')}
                    >
                      Hire it !  ({this.game.autoGenerators.foremanCost}$)
                      </button>
                  </td>
                </tr>
                <tr>
                  <td>Cheff : </td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.master}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.game.buyAutoGenerator('MASTER')}
                      disabled={!this.game.canBuyAutoGenerator('MASTER')}
                    >
                      Hire it !  ({this.game.autoGenerators.masterCost}$)
                      </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div >
      </div>
    );
  }
}
export default App;
