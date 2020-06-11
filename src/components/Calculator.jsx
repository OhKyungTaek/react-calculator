import * as React from "react";
import styled from "styled-components";

import Panel from "./Panel";
import Display from "./Display";
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import History from "./History";

const Container = styled.div`
  margin: 30px auto;
  text-align: center;
`;

//Box는 HistoryButton.jsx에 있음

// TODO: History 내에서 수식 표시할 때 사용

const evalFunc = function(string) {
  // eslint-disable-next-line no-new-func
  return new Function("return (" + string + ")")();
};

class Calculator extends React.Component {
  // TODO: history 추가
  state = {
    displayValue: "",
    formular: []
  };

  onClickButton = key => {
    let { displayValue = "" } = this.state;
    displayValue = "" + displayValue;
    const lastChar = displayValue.substr(displayValue.length - 1);
    const operatorKeys = ["÷", "×", "-", "+"];
    const proc = {
      AC: () => {
        this.setState({ displayValue: "" });
      },
      BS: () => {
        if (displayValue.length > 0) {
          displayValue = displayValue.substr(0, displayValue.length - 1);
          this.setState({ displayValue: displayValue});
        }
      },
      // TODO: 제곱근 구현
      "√": () => {
        let rootedData = displayValue;
        let firstValue = displayValue.substr(0, 1);
        let isRootFormula = firstValue;
        if(firstValue == "√"){
          do{
            displayValue = displayValue.substr(2, displayValue.length - 3);
            firstValue = displayValue.substr(0, 1);
          }while(firstValue == "√");
          displayValue = Math.sqrt(displayValue);
          displayValue = displayValue + "";
        }else{
          displayValue = displayValue;
        }
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          let rawFomula = ""; // = "√(" + displayValue + ")";
          if(isRootFormula == "√")
            rawFomula = "√(" + rootedData + ")";
          else
            rawFomula = "√(" + displayValue + ")";
          displayValue = displayValue.replace(/×/gi, "*");
          displayValue = displayValue.replace(/÷/gi, "/");
          let result = Math.sqrt(evalFunc(displayValue));
          const innerData = {formula: rawFomula, result: result};
          this.state.formular.unshift(innerData);
          // formular
          this.setState({ displayValue: result});
        }
      },
      // TODO: 사칙연산 구현
      "÷": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "÷" });
        }
      },
      "×": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "×" });
        }
      },
      "-": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "-" });
        }
      },
      "+": () => {
        // + 연산 참고하여 연산 구현
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "+" });
        }
      },
      "=": () => {
        let isRoot = false;
        let beforeRootDeletedData;
        let innerData;
        let firstValue = displayValue.substr(0, 1);
        let count=0, i=0;
        if(firstValue == "√"){
          isRoot = true;
          beforeRootDeletedData = displayValue;

          do{
            displayValue = displayValue.substr(2, displayValue.length - 3);
            firstValue = displayValue.substr(0, 1);
            count++;
          }while(firstValue == "√");

          for(i=0; i<count; i++){
            displayValue = Math.sqrt(displayValue);
            displayValue = displayValue + "";
          }
        }else{
          displayValue = displayValue
        }
        if (lastChar !== "" && operatorKeys.includes(lastChar)) {
          displayValue = displayValue.substr(0, displayValue.length - 1);
          isRoot = false;
        } else if (lastChar !== "") {
          const rawFomula2 = "" + displayValue;
          displayValue = displayValue.replace(/×/gi, "*");
          displayValue = displayValue.replace(/÷/gi, "/");
          displayValue = evalFunc(displayValue);
          innerData = {formula: rawFomula2, result: displayValue};
          this.state.formular.unshift(innerData);
        }
        if(isRoot){
          innerData.formula = beforeRootDeletedData;
        }
        this.setState({ displayValue });
      },
      ".": () => {
        let displayTemp = (displayValue + ".");
        let idx = -1;
        let cnt = 0;

        do  {
            idx = displayTemp.indexOf('.', idx + 1);
            if(idx != -1) {
                cnt++;
            }
        } while(idx != -1);

        if(cnt > 1)
          this.setState({ displayValue: displayValue});
        else
          this.setState({ displayValue: displayTemp});
        
      },
      "0": () => {
        if (Number(displayValue) !== 0) {
          displayValue += "0";
          this.setState({ displayValue });
        }
      }
    };

    if (proc[key]) {
      proc[key]();
    } else {
      // 여긴 숫자
      this.setState({ displayValue: displayValue + key });
    }
  };

  clickedPastData(data){
    this.setState({
      displayValue: data
    });
  }

  render() {
    return (
      <Container>
        <Panel>
          <Display displayValue={this.state.displayValue} />
          <ButtonGroup onClickButton={this.onClickButton}>
            <Button size={1} color="gray">
              AC
            </Button>
            <Button size={1} color="gray">
              BS
            </Button>
            <Button size={1} color="gray">
              √
            </Button>
            <Button size={1} color="gray">
              ÷
            </Button>

            <Button size={1}>7</Button>
            <Button size={1}>8</Button>
            <Button size={1}>9</Button>
            <Button size={1} color="gray">
              ×
            </Button>

            <Button size={1}>4</Button>
            <Button size={1}>5</Button>
            <Button size={1}>6</Button>
            <Button size={1} color="gray">
              -
            </Button>

            <Button size={1}>1</Button>
            <Button size={1}>2</Button>
            <Button size={1}>3</Button>
            <Button size={1} color="gray">
              +
            </Button>

            <Button size={2}>0</Button>
            <Button size={1}>.</Button>
            <Button size={1} color="gray">
              =
            </Button>
          </ButtonGroup>
        </Panel>
        {/* TODO: History componet를 이용해 map 함수와 Box styled div를 이용해 history 표시 */}
        <History
        formular={this.state.formular}
        onClickedPastData = {data => this.clickedPastData(data)}
        >
        </History>
      </Container>
    );
  }
}

export default Calculator;
