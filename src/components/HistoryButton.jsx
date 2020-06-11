import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  float: left;
  width: ${p => (p.size / 4) * 100}%;
  padding: 5px;
  margin: (0, 0, 0, 10px)
  button {
    :focus {
      outline: none;
    }
    :hover {
      background: #eee;
    }
    :active {
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.4);
    }
    color: #000;
    font-size: 20px;
    line-height: 30px;
    text-align: right;
    cursor: pointer;
    width: 100%;
    background: transparent;
    border-radius: 5px;
    border: 2px solid #000;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);

    &[data-color="gray"] {
      background: #eee;
      :hover {
        background: #ccc;
      }
    }
  }
`;
// font-weight: bold; line-height: 60px;
class Button extends React.Component {
  constructor(props){
    super(props);

    this.clickFomulaButton = this.clickFomulaButton.bind(this);
  }

  clickFomulaButton(data) {
    let firstValue = data.substr(0, 1);
    if(firstValue == "√"){
      firstValue = data.substr(2, data.length - 3);
    }else{
      firstValue = data
    }

    console.log(firstValue);
    this.props.onClickedPastData(firstValue);
  }


  listOfButtons(){
    let listOfData = this.props.formular;
    let index;
    return listOfData.map((data, index) => {
      return <button 
      key={index}
      onClick={() => this.clickFomulaButton(data.formula)}
      >
        {data.formula}
        <br/>
        {"=" + data.result}
      </button>
    })
  }

  render() {
    const { size = 4, color, children } = this.props;
    return (
      <Container size={size}>
        {this.listOfButtons()}
      </Container>
    );
  }
}

export default Button;
